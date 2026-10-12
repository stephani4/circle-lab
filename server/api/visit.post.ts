import type { H3Event } from 'h3'

/**
 * Уведомление о визите: вызывается при каждом заходе на сайт
 * (app/plugins/visit.client.ts) и шлёт письмо «Новый клиент: {IP}»
 * на NUXT_ORDER_EMAIL тем же SMTP, что и форма заявки.
 *
 * Это телеметрия, а не заявка: сбой отправки не должен ломать страницу,
 * поэтому ответ всегда `{ ok: true }`, а детали пишутся в лог сервера.
 */

/**
 * Простой лимитер в памяти процесса: не больше 10 уведомлений в минуту
 * с одного IP — боты и частые перезагрузки не зафлодят почтовый ящик.
 * Для нескольких инстансов замените на Redis/Nitro storage.
 */
const hits = new Map<string, number[]>()

/** true — уведомление можно отправлять, false — превышен лимит */
function rateLimit(event: H3Event, max = 10, windowMs = 60_000): boolean {
  const key = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs)

  if (recent.length >= max) return false

  recent.push(now)
  hits.set(key, recent)
  return true
}

export default defineEventHandler(async (event) => {
  // За прокси/балансировщиком реальный клиентский IP лежит в X-Forwarded-For
  const ip = getRequestIP(event, { xForwardedFor: true }) ?? '—'

  // За лимитом молча пропускаем: уведомление не приносит вреда пользователю
  if (!rateLimit(event)) return { ok: true }

  console.info('[visit] Новый клиент', { ip, createdAt: new Date().toISOString() })

  const meta = [
    `Страница: ${getHeader(event, 'referer') ?? '—'}`,
    `Получено: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })} (МСК)`,
    `User-Agent: ${getHeader(event, 'user-agent') ?? '—'}`,
  ]

  try {
    await sendOrderEmail(`Новый клиент: ${ip}`, [], meta)
  } catch (error) {
    console.error('[visit] Ошибка отправки письма', error)
  }

  return { ok: true }
})