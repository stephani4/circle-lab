import { z } from 'zod'
import type { H3Event } from 'h3'

/**
 * Приём заявки с формы «Заказать».
 *
 * Валидация, лимит запросов и honeypot → письмо на почту через SMTP
 * (mail.ru, см. server/utils/mail.ts). При сбое отправки отвечаем 502,
 * чтобы заявка не «потерялась» молча.
 */

const OrderSchema = z.object({
  name: z.string().trim().min(2, 'Укажите имя').max(80),
  contact: z.string().trim().min(3, 'Укажите контакт').max(80),
  email: z.string().trim().email('Некорректный e-mail').max(120).optional(),
  topic: z.enum(['telegram-bot', 'max-bot', 'web-app', 'integration', 'support', 'other']),
  budget: z.string().trim().max(40).optional(),
  message: z.string().trim().max(1500).optional(),
  /** Honeypot: не валидируем, заполненное значение обрабатывается в хендлере */
  website: z.string().optional().default(''),
})

const topicLabels: Record<string, string> = {
  'telegram-bot': 'Чат-бот для Telegram',
  'max-bot': 'Чат-бот для MAX',
  'web-app': 'Веб-приложение',
  integration: 'Интеграции и API',
  support: 'Поддержка',
  other: 'Другое',
}

/** Зеркало ORDER_BUDGETS из app/composables/useOrderForm.ts (сервер не подключает app-композаблы) */
const budgetLabels: Record<string, string> = {
  '': 'Не определён',
  '50-100k': '50 000 – 100 000 ₽',
  '100-300k': '100 000 – 300 000 ₽',
  '300k+': 'от 300 000 ₽',
  discuss: 'Хочу обсудить',
}

/**
 * Простой лимитер в памяти процесса: не больше 5 заявок в минуту с одного IP.
 * Для нескольких инстансов замените на Redis/Nitro storage.
 */
const hits = new Map<string, number[]>()

function rateLimit(event: H3Event, max = 5, windowMs = 60_000) {
  const key = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs)

  if (recent.length >= max) {
    throw createError({ statusCode: 429, message: 'Слишком много заявок, попробуйте через минуту' })
  }

  recent.push(now)
  hits.set(key, recent)
}

export default defineEventHandler(async (event) => {
  rateLimit(event)

  const raw = await readBody(event)
  const parsed = OrderSchema.safeParse(raw)

  if (!parsed.success) {
    throw createError({
      statusCode: 422,
      message: 'Проверьте заполнение полей',
      data: { issues: parsed.error.issues.map((issue) => issue.message) },
    })
  }

  const order = parsed.data

  // Honeypot: отвечаем успехом, но ничего не отправляем
  if (order.website) return { ok: true }

  const fields: EmailField[] = [
    { label: 'Имя', value: order.name },
    { label: 'Контакт', value: order.contact },
    { label: 'Направление', value: topicLabels[order.topic] ?? order.topic },
  ]
  if (order.email) fields.push({ label: 'E-mail', value: order.email })
  if (order.budget) fields.push({ label: 'Бюджет', value: budgetLabels[order.budget] ?? order.budget })
  if (order.message) fields.push({ label: 'Сообщение', value: order.message })

  const meta = [
    `Страница: ${getHeader(event, 'referer') ?? '—'}`,
    `IP: ${getRequestIP(event, { xForwardedFor: true }) ?? '—'}`,
    `Получено: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })} (МСК)`,
    `User-Agent: ${getHeader(event, 'user-agent') ?? '—'}`,
  ]

  console.info('[order] Новая заявка', {
    ...order,
    topicLabel: topicLabels[order.topic],
    createdAt: new Date().toISOString(),
  })

  // ── Доставка: письмо по SMTP (NUXT_SMTP_* / NUXT_ORDER_EMAIL) ────────────
  try {
    await sendOrderEmail(`Заявка с сайта — ${topicLabels[order.topic]}`, fields, meta)
  } catch (error) {
    console.error('[order] Ошибка отправки письма', error)
    throw createError({
      statusCode: 502,
      message: 'Не удалось отправить заявку. Попробуйте позже или напишите нам напрямую.',
    })
  }
  // Опционально можно добавить Telegram (см. telegramBotToken в nuxt.config)
  // или CRM-вебхук в этот же блок.
  // -------------------------------------------------------------------------

  return { ok: true, message: 'Заявка принята' }
})
