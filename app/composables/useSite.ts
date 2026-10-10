/**
 * Общие ссылки и утилиты для контактов.
 * Значения берутся из runtimeConfig.public (переопределяются переменными NUXT_PUBLIC_*).
 */

type PublicConfig = {
  siteUrl: string
  contactMax: string
  contactPhone: string
  contactEmail: string
  workingHours: string
  companyName: string
}

export const SiteConfig = {
  phoneHref(phone: string) {
    return `tel:${phone.replace(/[^\d+]/g, '')}`
  },

  emailHref(email: string) {
    return `mailto:${email}`
  },

  /** Навигация используется и в шапке, и в подвале */
  nav: [
    { label: 'Услуги', href: '#services' },
    { label: 'Процесс', href: '#process' },
    { label: 'Кейсы', href: '#cases' },
    { label: 'Цены', href: '#pricing' },
    { label: 'Вопросы', href: '#faq' },
    { label: 'Заказать', href: '#order' },
  ],
}

export function useSite() {
  const config = useRuntimeConfig()
  return config.public as PublicConfig
}
