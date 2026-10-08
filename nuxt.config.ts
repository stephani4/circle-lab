import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'

// Nuxt по умолчанию читает только `.env` — явно подключаем режимный файл:
// `nuxt dev` → .env.development, сборка/preview → .env.production.
// Существующие переменные окружения не перезаписываются.
const envFile = fileURLToPath(
  new URL(`.env.${process.env.NODE_ENV === 'development' ? 'development' : 'production'}`, import.meta.url),
)
if (existsSync(envFile)) process.loadEnvFile(envFile)

// Яндекс.Метрика: id счётчика нужен и в <head>, и в плагине
// app/plugins/metrika.client.ts (учёт SPA-переходов) — держим в одном месте.
const yandexMetrikaId = '113565912'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  // Server-side rendering (включён по умолчанию) — важен для SEO визитки
  ssr: true,

  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      title: 'Чат-боты и веб-приложения для бизнеса — разработка под ключ',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#05070d' },
        {
          name: 'description',
          content:
            'Разработка чат-ботов для Telegram и MAX, веб-приложений на современных стеках (Nuxt, Node, TypeScript) для бизнеса. Аналитика, прототип, запуск и поддержка под ключ.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'ru_RU' },
        { property: 'og:site_name', content: 'Digital Craft' },
        { property: 'og:title', content: 'Чат-боты и веб-приложения для бизнеса' },
        {
          property: 'og:description',
          content: 'Чат-боты для Telegram и MAX, SPA/SSR-приложения и интеграции. От брифа до продакшена.',
        },
        { property: 'og:image', content: '/og-image.svg' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap',
        },
      ],
      script: [
        {
          // Включает анимации появления только когда JS действительно работает
          innerHTML: 'document.documentElement.classList.add("js")',
          tagPosition: 'head',
        },
        {
          // Яндекс.Метрика. Ставим в <head> SSR-рендера: сниппет сам
          // проверяет document.scripts и не подключает tag.js повторно
          // при гидрации/повторном рендере.
          key: 'yandex-metrika',
          innerHTML: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=${yandexMetrikaId}','ym');ym(${yandexMetrikaId},'init',{ssr:true,webvisor:true,clickmap:true,ecommerce:'dataLayer',referrer:document.referrer,url:location.href,accurateTrackBounce:true,trackLinks:true});`,
          tagPosition: 'head',
        },
      ],
      noscript: [
        {
          // Фолбэк для браузеров без JS (картинка-пиксель)
          children: `<div><img src="https://mc.yandex.ru/watch/${yandexMetrikaId}" style="position:absolute; left:-9999px;" alt="" /></div>`,
        },
      ],
    },
  },

  runtimeConfig: {
    // ─────────────────────────────────────────────────────────────
    //  Доставка заявок (server/api/order.post.ts → server/utils/mail.ts)
    //  через SMTP mail.ru. Значения берутся из .env.development /
    //  .env.production (файл читается в начале этого конфига) либо из
    //  переменных окружения:
    //    NUXT_SMTP_HOST, NUXT_SMTP_PORT, NUXT_SMTP_USER,
    //    NUXT_SMTP_PASS, NUXT_ORDER_EMAIL
    //  Секреты server-only: в клиентскую часть не попадают.
    // ─────────────────────────────────────────────────────────────
    smtp: {
      host: process.env.NUXT_SMTP_HOST || 'smtp.mail.ru',
      port: process.env.NUXT_SMTP_PORT || '465',
      user: process.env.NUXT_SMTP_USER || '',
      pass: process.env.NUXT_SMTP_PASS || '',
    },
    orderEmail: process.env.NUXT_ORDER_EMAIL || '',
    // Опциональная доставка в Telegram (см. комментарии в order.post.ts)
    telegramBotToken: '',
    telegramChatId: '',
    public: {
      siteUrl: 'http://localhost:3000',
      // id счётчика Яндекс.Метрики — для плагина metrika.client.ts
      yandexMetrikaId,
      contactTelegram: '@your_username',
      contactMax: 'https://max.ru/u/f9LHodD0cOKB82KF4PDM_WwmoY-xK7FMpDJUSww8AKZDvCpuC-SS9LBymD0',
      contactPhone: '+7-903-993-36-26',
      contactEmail: 'digital.craft@inbox.ru',
      workingHours: 'Пн–Пт, 10:00–19:00 (МСК)',
      companyName: 'Digital Craft',
    },
  },
})
