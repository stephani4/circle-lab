# Лендинг: чат-боты и веб-приложения

Одностраничный сайт-визитка на **Nuxt 4 (SSR)** + **Tailwind CSS 4**. Тёмная тех-тема,
SSR-разметка, форма заявки с валидацией и серверным эндпоинтом.

## Стек

| Слой | Технологии |
| --- | --- |
| Framework | Nuxt 4 (SSR), Vue 3.5, Vue Router 4 |
| Стили | Tailwind CSS 4 (`@theme` + `@utility`), без UI-кита |
| Валидация | Zod (сервер) + собственная проверка (клиент) |
| Шрифты | Manrope + Inter (Google Fonts) |
| Иконки | Инлайн-SVG (`app/components/Icon.vue`), без зависимостей |

## Запуск

```bash
npm install
npm run dev        # http://localhost:3000
```

| Скрипт | Что делает |
| --- | --- |
| `npm run dev` | Dev-сервер с HMR |
| `npm run build` | Продакшн-сборка в `.output` |
| `npm run preview` | Локальный запуск собранной версии |
| `npm run generate` | Статическая генерация (если SSR не нужен) |
| `npm run typecheck` | Проверка типов (vue-tsc) |
| `npm run check:classes` | Проверяет, что все классы из шаблонов попали в собранный CSS (после `build`) |

## Структура

```
app/
├── app.vue                  # общий каркас: фон, шапка, main, подвал
├── assets/css/main.css      # дизайн-токены (@theme) и компонентные @utility
├── components/
│   ├── AppHeader.vue        # липкая шапка, скролл-спай, мобильное меню
│   ├── AppFooter.vue        # подвал с контактами
│   ├── BackdropDecor.vue    # фоновые свечения, сетка, зерно
│   ├── HeroWidget.vue       # мокап чат-бота в hero
│   ├── Icon.vue             # инлайн-иконки
│   ├── OrderSection.vue     # форма «Заказать» + контакты
│   ├── SectionHeading.vue   # единый заголовок секции
│   └── pages/index.vue      # все секции и контент
├── composables/
│   ├── useOrderForm.ts      # состояние формы, валидация, отправка
│   ├── useScrollSpy.ts      # активная секция в навигации
│   └── useSite.ts           # контакты и ссылки
├── error.vue                # 404 / 500
└── plugins/reveal.client.ts # появление секций при скролле

server/
├── api/order.post.ts        # приём заявки (валидация, лимит, honeypot)
├── utils/mail.ts            # письмо со заявкой по SMTP (nodemailer)
└── routes/sitemap.xml.ts    # карта сайта
```

## Настройка

Все публичные данные — в `nuxt.config.ts` → `runtimeConfig.public`.
Переопределяются переменными окружения (см. `.env.example`):

```bash
NUXT_PUBLIC_COMPANY_NAME=Digital Craft
NUXT_PUBLIC_CONTACT_TELEGRAM=@your_username
NUXT_PUBLIC_CONTACT_MAX=https://max.ru/u/...
NUXT_PUBLIC_CONTACT_PHONE=+7 900 000-00-00
NUXT_PUBLIC_CONTACT_EMAIL=hello@example.com
NUXT_PUBLIC_SITE_URL=https://example.com
```

Контент секций (услуги, кейсы, цены, FAQ) лежит в `app/pages/index.vue` —
это обычные массивы, их легко править.

## Форма «Заказать»

Клиент: `app/composables/useOrderForm.ts`
— валидация полей, состояния `idle / submitting / success / error`,
prefill направления из query-параметра (`/?topic=telegram-bot`).

Сервер: `server/api/order.post.ts`
— схема Zod, лимит 5 заявок в минуту с одного IP, honeypot-поле,
ответ `{ ok: true }`, заявка уходит письмом и пишется в лог сервера.

### Доставка заявок: SMTP mail.ru

`server/utils/mail.ts` отправляет письмо через nodemailer
(`smtp.mail.ru:465`, SSL) на адрес `NUXT_ORDER_EMAIL`. Настройки лежат
в `.env.development` (команда `nuxt dev`) и `.env.production`
(команда `nuxt build`) — Nuxt по умолчанию читает только `.env`,
режимный файл подключается в начале `nuxt.config.ts`. После правки
env-файла перезапустите dev-сервер.

```bash
NUXT_SMTP_HOST=smtp.mail.ru
NUXT_SMTP_PORT=465
NUXT_SMTP_USER=...        # логин = адрес почты mail.ru
NUXT_SMTP_PASS=...        # пароль почты / пароль приложения
NUXT_ORDER_EMAIL=...      # куда доставлять заявки
```

`.env.production` исключён из git — на сервер деплоя положите его
отдельно (или задайте те же переменные окружения). Если SMTP недоступен,
сервер отвечает `502`, и в форме показывается сообщение об ошибке.

Опционально можно включить доставку в Telegram — `NUXT_TELEGRAM_BOT_TOKEN`,
`NUXT_TELEGRAM_CHAT_ID` (см. комментарии в `server/api/order.post.ts`).

## Запуск в Docker

```bash
docker build -t landing .
docker run -d --name landing -p 3000:3000 --env-file .env.production landing
# → http://localhost:3000
```

Образ многостадийный (`node:24-alpine`): сборка в одном слое, в финальный
попадает только `.output`, приложение работает от пользователя `node`.
`.env.*` исключены из контекста сборки (`.dockerignore`), поэтому секреты
**не зашиваются в слои образа** — один и тот же образ переносится между
окружениями без пересборки.

### Как прокидывать переменные окружения

Значения `NUXT_*` подставляются Nitro в runtimeConfig при **старте**
контейнера — тремя способами:

**1. Файл окружения** (готовый `.env.production` подходит как есть —
формат `KEY=VALUE` построчно, комментарии игнорируются):

```bash
docker run -d --name landing -p 3000:3000 --env-file .env.production landing
```

**2. Явные переменные** (`-e` можно повторять):

```bash
docker run -d --name landing -p 3000:3000 \
  -e NUXT_SMTP_HOST=smtp.mail.ru \
  -e NUXT_SMTP_PORT=465 \
  -e NUXT_SMTP_USER=you@mail.ru \
  -e NUXT_SMTP_PASS=... \
  -e NUXT_ORDER_EMAIL=you@mail.ru \
  landing
```

**3. docker-compose:**

```yaml
services:
  landing:
    build: .
    image: landing:latest
    ports:
      - '3000:3000'
    env_file: .env.production
    restart: unless-stopped
```

Правила именования: ключ runtimeConfig `smtp.host` → `NUXT_SMTP_HOST`,
`orderEmail` → `NUXT_ORDER_EMAIL`; публичные настройки → `NUXT_PUBLIC_*`.
Порт по умолчанию 3000 — меняется через `-e PORT=8080`.

⚠️ Не прокидывайте секреты через `ARG`/`ENV` в Dockerfile — они останутся
в слоях (`docker history`). Только рантайм, как описано выше.

## SEO

- SSR-разметка, `lang="ru"`, canonical, description, Open Graph.
- `public/robots.txt`, `server/routes/sitemap.xml.ts`.
- Замените `public/og-image.svg` на PNG 1200×630 — часть соцсетей не читает SVG.

## Заметки по реализации

- **Tailwind 4:** всё, что используется через `@apply`, объявлено как `@utility`
  (обычные классы в `@layer components` в `@apply` не подставляются).
- **Анимации появления** включаются инлайн-скриптом в `<head>` (класс `js` на `<html>`).
  Без JS весь контент виден — нет «пустого» экрана и проблем с SEO.
- **`prefers-reduced-motion: reduce`** отключает анимации.
- **Иконки** — инлайн-SVG, чтобы не тянуть icon-font или внешний набор.
