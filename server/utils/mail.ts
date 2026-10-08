import nodemailer from 'nodemailer'

/** Поле письма: подпись и значение из формы */
export interface EmailField {
  label: string
  value: string
}

function escapeHtml(value: string): string {
  const entities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }
  return value.replace(/[&<>"']/g, (char) => entities[char] ?? char)
}

function buildText(subject: string, fields: EmailField[], meta: string[]): string {
  const body = fields.map((field) => `${field.label}: ${field.value}`).join('\n')
  return [subject, '', body, ...meta.length ? ['', ...meta] : []].join('\n')
}

function buildHtml(subject: string, fields: EmailField[], meta: string[]): string {
  const rows = fields
    .map(
      (field) => `
        <tr>
          <td valign="top" style="padding:0 16px 10px 0;color:#7f89a6;white-space:nowrap">${escapeHtml(field.label)}</td>
          <td valign="top" style="padding:0 0 10px;color:#111">${escapeHtml(field.value).replace(/\n/g, '<br/>')}</td>
        </tr>`,
    )
    .join('')

  const metaBlock = meta.length
    ? `<hr style="border:none;border-top:1px solid #e6e8ef;margin:14px 0"/>
       <p style="margin:0;color:#9aa2b8;font-size:12px">${meta.map(escapeHtml).join('<br/>')}</p>`
    : ''

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5">
    <h2 style="margin:0 0 14px;font-size:18px">${escapeHtml(subject)}</h2>
    <table cellpadding="0" cellspacing="0" style="border-collapse:collapse">${rows}</table>
    ${metaBlock}
  </div>`
}

/**
 * Отправляет письмо с заявкой через SMTP из runtimeConfig.smtp
 * (NUXT_SMTP_HOST / NUXT_SMTP_PORT / NUXT_SMTP_USER / NUXT_SMTP_PASS),
 * получатель — runtimeConfig.orderEmail (NUXT_ORDER_EMAIL).
 *
 * Бросает исключение при любой ошибке — обрабатывается в order.post.ts.
 */
export async function sendOrderEmail(subject: string, fields: EmailField[], meta: string[] = []) {
  const config = useRuntimeConfig()

  if (!config.smtp.user || !config.smtp.pass) {
    throw new Error('SMTP не настроен: задайте NUXT_SMTP_USER и NUXT_SMTP_PASS (см. .env.development / .env.production)')
  }
  if (!config.orderEmail) {
    throw new Error('Не задан получатель: укажите NUXT_ORDER_EMAIL')
  }

  const port = Number(config.smtp.port)
  const transport = nodemailer.createTransport({
    host: config.smtp.host,
    port,
    // 465 — SSL, остальные порты (587) — STARTTLS
    secure: port === 465,
    auth: { user: config.smtp.user, pass: config.smtp.pass },
  })

  await transport.sendMail({
    // mail.ru разрешает отправлять только от адреса авторизованного пользователя
    from: `"${config.public.companyName}" <${config.smtp.user}>`,
    to: config.orderEmail,
    subject,
    text: buildText(subject, fields, meta),
    html: buildHtml(subject, fields, meta),
  })
}
