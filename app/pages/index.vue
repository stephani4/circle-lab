<script setup lang="ts">
/**
 * Контентные данные лендинга в одном месте — легко редактировать копирайт.
 */

const heroFacts = [
  'Работаем по договору и смет',
  'Репозиторий и доступы — ваши',
  'Демо каждые 1–2 недели',
]

const services = [
  {
    icon: 'telegram',
    title: 'Чат-боты для Telegram',
    text: 'Боты для продаж, поддержки, записи и рассылок: диалоговые сценарии, админ-панель, платежи, интеграция с CRM.',
    tags: ['Продажи', 'Поддержка 24/7', 'WebApp'],
    accent: 'from-aqua-400/25 to-brand-500/10',
  },
  {
    icon: 'message',
    title: 'Боты для MAX',
    text: 'Разработка ботов и Mini Apps под MAX, вебхуки, авторизация, шаблоны и единый SDK-слой поверх нескольких каналов.',
    tags: ['Mini Apps', 'Вебхуки', 'Мультиканал'],
    accent: 'from-brand-400/25 to-aqua-400/10',
  },
  {
    icon: 'code',
    title: 'Веб-приложения',
    text: 'SPA и SSR-приложения на Nuxt / Next.js: кабинеты, личные кабинеты клиентов, дашборды, SaaS-платформы с авторизацией и ролями.',
    tags: ['Nuxt', 'TypeScript', 'SSR'],
    accent: 'from-brand-400/25 to-brand-600/10',
  },
  {
    icon: 'link',
    title: 'Интеграции и API',
    text: 'Связываем ботов и приложения с вашей инфраструктурой: CRM, 1С, платёжные системы, почта, склад, 1С:УТ, BI.',
    tags: ['CRM', '1С', 'Платежи'],
    accent: 'from-mint-400/20 to-aqua-400/10',
  },
  {
    icon: 'life-buoy',
    title: 'Поддержка и развитие',
    text: 'Сопровождение после запуска: мониторинг, обновления, доработки по спринтам, SLA и прозрачная отчётность.',
    tags: ['SLA', 'Мониторинг', 'Спринты'],
    accent: 'from-aqua-300/20 to-brand-500/10',
  },
]

const stats = [
  { value: '8+', label: 'лет в разработке' },
  { value: '120+', label: 'запущенных проектов' },
  { value: '30', label: 'отраслей бизнеса' },
  { value: '4.9', label: 'средняя оценка' },
]

const stack = [
  {
    title: 'Frontend',
    items: ['Nuxt 3/4', 'Next.js', 'Vue 3', 'React', 'TypeScript', 'Tailwind CSS', 'Vite'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'NestJS', 'Fastify', 'PostgreSQL', 'Redis', 'Prisma', 'REST / GraphQL'],
  },
  {
    title: 'Мессенджеры',
    items: ['Telegraf', 'grammY', 'Telegram Bot API', 'TDLib', 'MAX API', 'WebApp SDK'],
  },
  {
    title: 'Инфраструктура',
    items: ['Docker', 'GitHub Actions', 'GitLab CI', 'Nginx', 'Vercel', 'Мониторинг Sentry'],
  },
]

const steps = [
  {
    num: '01',
    title: 'Бриф и аналитика',
    text: 'Разбираем задачу, процессы и метрики. Отсекаем лишнее, фиксируем объём и сроки.',
    duration: '1–3 дня',
  },
  {
    num: '02',
    title: 'Прототип',
    text: 'Сценарии диалогов или клики в прототипе интерфейса. Вы видите результат до написания кода.',
    duration: '3–7 дней',
  },
  {
    num: '03',
    title: 'Дизайн и архитектура',
    text: 'UI-kit, структура данных, схема интеграций и план releases.',
    duration: '1–2 недели',
  },
  {
    num: '04',
    title: 'Разработка',
    text: 'Итерации по спринтам, демо каждые 1–2 недели, доступ к репозиторию.',
    duration: '3–10 недель',
  },
  {
    num: '05',
    title: 'Тест и запуск',
    text: 'Нагрузочные и сценарные тесты, деплой, настройка мониторинга и обучение команды.',
    duration: '3–7 дней',
  },
  {
    num: '06',
    title: 'Поддержка',
    text: 'Сопровождение, обновления и развитие продукта по SLA.',
    duration: 'постоянно',
  },
]

const cases = [
  {
    type: 'Чат-бот · Telegram',
    title: 'Магазин техники: бот-консультант',
    text: 'Подбор товара по параметрам, наличие на складе, бронирование и онлайн-оплата внутри Telegram.',
    metrics: [
      { value: '−38%', label: 'время ответа' },
      { value: '+24%', label: 'конверсия в заказ' },
    ],
    tags: ['Telegraf', 'PostgreSQL', 'Платежи'],
  },
  {
    type: 'Веб-приложение',
    title: 'B2B-кабинет клиента для дистрибьютора',
    text: 'Личный кабинет с заказами, остатками, документами и историей поставок на Nuxt SSR.',
    metrics: [
      { value: '40%', label: 'меньше рутины' },
      { value: 'x1.7', label: 'частота заказов' },
    ],
    tags: ['Nuxt', 'Node.js', 'PostgreSQL'],
  },
]

const pricing = [
  {
    name: 'Чат-бот',
    price: 'от 10 000 ₽',
    period: 'от 3 недель',
    text: 'Бот под одну задачу: консультации, запись, заявки, платежи.',
    features: [
      'Сценарии диалога и кнопки',
      'База ответов и медиафайлы',
      'Админ-панель и аналитика',
      'Вебхуки и интеграция с 1 сервисом',
      'Размещение и запуск',
    ],
    featured: false,
  },
  {
    name: 'Веб-приложение',
    price: 'от 20 000 ₽',
    period: 'от 6 недель',
    text: 'Полноценный продукт: кабинет, дашборд, роли, платежи, интеграции.',
    features: [
      'SSR-приложение на Nuxt / Next',
      'Авторизация, роли и доступы',
      'Админ-панель и отчётность',
      'Интеграции с CRM / 1С / платежами',
      'CI/CD, мониторинг, документация',
    ],
    featured: true,
  },
  {
    name: 'Комплексно',
    price: 'по оценке',
    period: 'от 10 недель',
    text: 'Бот + приложение + интеграции в единую экосистему.',
    features: [
      'Аудит и стратегия развития',
      'Дизайн-система и брендинг',
      'База знаний и медиатека',
      'Нагрузочные тесты и SLA 24/7',
      'Обучение команды, передача прав',
    ],
    featured: false,
  },
]

const faq = [
  {
    q: 'Сколько времени занимает запуск?',
    a: 'Простой бот сценариев — 3–4 недели. Бот с платежами, интеграциями и веб-интерфейсом — 6–10 недель. Веб-приложение средней сложности — 8–14 недель. Точные сроки фиксируем после брифа и не меняем без согласования.',
  },
  {
    q: 'Можно ли доработать бота после запуска?',
    a: 'Да. Любой проект передаётся в ваш репозиторий и документацию. Сопровождение можно взять по SLA с фиксированным числом часов в месяц либо развивать продукт спринтами.',
  },
  {
    q: 'Какие платежи вы интегрируете?',
    a: 'Telegram Payments, ЮKassa, Тинькофф, СБП и другие провайдеры. Для веб-приложений — подписочные модели, счета для юрлиц, чеки и закрывающие документы.',
  },
  {
    q: 'Что с данными и безопасностью?',
    a: 'Данные хранятся в вашей инфраструктуре или в проверенных хостингах, доступы по ролям, секреты в переменных окружения. Подписываем NDA и передаём все доступы и репозиторий по завершении проекта.',
  },
  {
    q: 'Работаете с другими мессенджерами?',
    a: 'Да, архитектура мультиканальная: делаем слой абстракции, чтобы одна логика работала в Telegram и MAX, а при необходимости — в других каналах.',
  },
  {
    q: 'Как происходит оплата и что входит в смету?',
    a: 'Работаем по этапам с фиксированной сметой после брифа: предоплата, затем рассрочка по этапам. В смету входят аналитика, дизайн, разработка, тестирование и запуск. Скрытых доплат нет.',
  },
]

const marqueeItems = [
  'Telegram',
  'MAX',
  'Nuxt',
  'TypeScript',
  'Node.js',
  'PostgreSQL',
  'Docker',
  'WebApp',
  'Интеграции',
  '1С',
  'CI/CD',
]
</script>

<template>
  <!-- ────────────────────────────── HERO ────────────────────────────── -->
  <section class="relative pt-32 pb-20 sm:pt-40 sm:pb-28">
    <div class="container-x">
      <div class="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div>
          <p class="eyebrow" data-reveal>
            <span class="relative flex size-1.5">
              <span class="absolute inline-flex size-full animate-pulse-ring rounded-full bg-mint-400" />
              <span class="relative inline-flex size-1.5 rounded-full bg-mint-400" />
            </span>
            Telegram · MAX · Web
          </p>

          <h1
            class="mt-6 text-[2.6rem] leading-[1.05] font-extrabold sm:text-6xl lg:text-[4.1rem]"
            data-reveal
            style="--reveal-delay: 80ms"
          >
            Чат-боты и веб-приложения,
            <span class="text-gradient">которые работают на бизнес</span>
          </h1>

          <p class="mt-6 max-w-xl text-base text-ink-soft sm:text-lg" data-reveal style="--reveal-delay: 160ms">
            Разрабатываем чат-ботов для Telegram и MAX и современные веб-приложения на Nuxt / Node.js. От аналитики
            и прототипа до продакшена и поддержки — под ключ и с ответственностью за результат.
          </p>

          <div
            class="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            data-reveal
            style="--reveal-delay: 240ms"
          >
            <a href="#order" class="btn-primary group">
              Заказать проект
              <Icon name="arrow-right" class="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href="#services" class="btn-ghost">Смотреть услуги</a>
          </div>

          <ul
            class="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-ink-mute"
            data-reveal
            style="--reveal-delay: 320ms"
          >
            <li v-for="item in heroFacts" :key="item" class="flex items-center gap-2">
              <Icon name="check" class="size-4 text-mint-400" />
              {{ item }}
            </li>
          </ul>
        </div>

        <HeroWidget />
      </div>
    </div>

    <!-- Бегущая строка технологий -->
    <div class="mask-fade-x relative mt-20 border-y border-white/[0.06] py-5" data-reveal>
      <div class="flex w-max animate-marquee items-center gap-10 pr-10">
        <template v-for="n in 2" :key="n">
          <div v-for="item in marqueeItems" :key="`${n}-${item}`" class="flex items-center gap-3">
            <span class="font-display text-sm font-semibold tracking-wide whitespace-nowrap text-ink-mute">{{ item }}</span>
            <span class="size-1 rounded-full bg-brand-400/60" />
          </div>
        </template>
      </div>
    </div>
  </section>

  <!-- ────────────────────────────── STATS ───────────────────────────── -->
  <section class="relative py-16 sm:py-20">
    <div class="container-x">
      <dl class="grid grid-cols-2 gap-px overflow-hidden rounded-xl2 border border-white/[0.08] bg-white/[0.05] lg:grid-cols-4">
        <div
          v-for="(stat, i) in stats"
          :key="stat.label"
          class="group relative bg-void-2/90 px-6 py-8 text-center transition-colors duration-500 hover:bg-void-3"
          data-reveal
          :style="{ '--reveal-delay': `${i * 70}ms` }"
        >
          <dt class="sr-only">{{ stat.label }}</dt>
          <dd class="font-display text-3xl font-extrabold text-gradient sm:text-4xl">{{ stat.value }}</dd>
          <p class="mt-2 text-sm text-ink-mute">{{ stat.label }}</p>
        </div>
      </dl>
    </div>
  </section>

    <!-- ───────────────────────────── SERVICES ─────────────────────────── -->
    <section id="services" class="relative scroll-mt-28 py-20 sm:py-28">
      <div class="container-x">
        <SectionHeading
          eyebrow="Что мы делаем"
          title="Пять направлений, одна команда"
          description="Берём на себя весь цикл — от идеи и исследования до продакшена и развития продукта."
        />

        <div class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="(service, i) in services"
            :key="service.title"
            class="card card-hover card-sheen group p-7"
            data-reveal
            :style="{ '--reveal-delay': `${(i % 3) * 90}ms` }"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              :class="service.accent"
            />
            <div class="relative">
              <span class="inline-flex size-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]">
                <Icon :name="service.icon" class="size-6 text-aqua-300" />
              </span>

              <h3 class="mt-6 text-lg font-bold">{{ service.title }}</h3>
              <p class="mt-3 text-[15px] leading-relaxed text-ink-soft">{{ service.text }}</p>

              <ul class="mt-6 flex flex-wrap gap-2">
                <li v-for="tag in service.tags" :key="tag" class="chip px-3 py-1 text-xs">{{ tag }}</li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ────────────────────────────── STACK ────────────────────────────── -->
    <section class="relative overflow-hidden py-20 sm:py-28">
      <div class="absolute inset-0 bg-grid opacity-[0.35]" aria-hidden="true" />
      <div class="container-x relative">
        <SectionHeading
          eyebrow="Стек"
          title="Современный и предсказуемый"
          description="Подбираем технологии под задачу: быстрый старт для MVP и надёжная основа для роста нагрузки."
        />

        <div class="mt-14 grid gap-5 lg:grid-cols-2">
          <div
            v-for="(group, i) in stack"
            :key="group.title"
            class="card card-hover p-7"
            data-reveal
            :style="{ '--reveal-delay': `${(i % 2) * 100}ms` }"
          >
            <h3 class="flex items-center gap-3 font-display text-sm font-bold tracking-[0.16em] text-aqua-300 uppercase">
              <span class="h-px w-8 bg-gradient-to-r from-aqua-400 to-transparent" />
              {{ group.title }}
            </h3>
            <ul class="mt-5 flex flex-wrap gap-2.5">
              <li
                v-for="item in group.items"
                :key="item"
                class="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 font-mono text-[13px] text-ink-soft transition-colors duration-300 hover:border-brand-400/40 hover:text-ink"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ───────────────────────────── PROCESS ───────────────────────────── -->
    <section id="process" class="scroll-mt-28 py-20 sm:py-28">
      <div class="container-x">
        <SectionHeading
          eyebrow="Процесс"
          title="Прозрачно от брифа до релиза"
          description="Каждый этап заканчивается результатом, который можно посмотреть и проверить."
        />

        <ol class="relative mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <li
            v-for="(step, i) in steps"
            :key="step.num"
            class="card card-hover card-sheen relative p-7"
            data-reveal
            :style="{ '--reveal-delay': `${(i % 3) * 90}ms` }"
          >
            <div class="flex items-start justify-between gap-4">
              <span
                class="font-display text-4xl font-extrabold text-transparent"
                style="-webkit-text-stroke: 1px rgb(129 140 248 / 0.5)"
              >
                {{ step.num }}
              </span>
              <span class="chip shrink-0 px-3 py-1 text-xs">{{ step.duration }}</span>
            </div>

            <h3 class="mt-5 text-lg font-bold">{{ step.title }}</h3>
            <p class="mt-3 text-[15px] leading-relaxed text-ink-soft">{{ step.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- ────────────────────────────── CASES ────────────────────────────── -->
    <section id="cases" class="scroll-mt-28 py-20 sm:py-28">
      <div class="container-x">
        <SectionHeading
          eyebrow="Кейсы"
          title="Примеры решенных задач"
          description="Показаны типовые сценарии из нашей практики — детали и цифры замените на свои по договорённости с клиентом."
        />

        <div class="mt-14 grid gap-5 sm:grid-cols-2">
          <article
            v-for="(item, i) in cases"
            :key="item.title"
            class="card card-hover card-sheen flex flex-col p-7"
            data-reveal
            :style="{ '--reveal-delay': `${i * 100}ms` }"
          >
            <p class="eyebrow text-[10px]">{{ item.type }}</p>
            <h3 class="mt-4 text-lg font-bold leading-snug">{{ item.title }}</h3>
            <p class="mt-3 grow text-[15px] leading-relaxed text-ink-soft">{{ item.text }}</p>

            <dl class="mt-7 grid grid-cols-2 gap-4 border-t border-white/[0.07] pt-6">
              <div v-for="metric in item.metrics" :key="metric.label">
                <dt class="sr-only">{{ metric.label }}</dt>
                <dd class="font-display text-2xl font-extrabold text-gradient-brand">{{ metric.value }}</dd>
                <p class="mt-1 text-xs text-ink-mute">{{ metric.label }}</p>
              </div>
            </dl>

            <ul class="mt-6 flex flex-wrap gap-2">
              <li v-for="tag in item.tags" :key="tag" class="chip px-3 py-1 text-xs">{{ tag }}</li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- ───────────────────────────── PRICING ───────────────────────────── -->
    <section id="pricing" class="scroll-mt-28 py-20 sm:py-28">
      <div class="container-x">
        <SectionHeading
          eyebrow="Пакеты"
          title="Прозрачные точки старта"
          description="Цены ориентировочные: точную смету фиксируем после короткого брифа и демонстрируем на созвоне."
        />

        <div class="mt-14 grid gap-5 lg:grid-cols-3">
          <article
            v-for="(plan, i) in pricing"
            :key="plan.name"
            class="card card-hover card-sheen flex flex-col p-8"
            :class="plan.featured ? 'border-brand-400/40 shadow-glow lg:-my-3 lg:py-11' : ''"
            data-reveal
            :style="{ '--reveal-delay': `${i * 100}ms` }"
          >
            <div v-if="plan.featured" class="absolute right-6 top-6">
              <span class="chip border-brand-400/40 bg-brand-500/15 px-3 py-1 text-[11px] font-semibold text-brand-300">
                Популярный
              </span>
            </div>

            <h3 class="text-sm font-semibold tracking-[0.14em] text-aqua-300 uppercase">{{ plan.name }}</h3>

            <p class="mt-5 font-display text-3xl font-extrabold text-ink sm:text-4xl">{{ plan.price }}</p>
            <p class="mt-1.5 text-sm text-ink-mute">{{ plan.period }}</p>

            <p class="mt-5 text-[15px] leading-relaxed text-ink-soft">{{ plan.text }}</p>

            <ul class="mt-7 grow space-y-3">
              <li v-for="feature in plan.features" :key="feature" class="flex gap-3 text-[15px] text-ink-soft">
                <Icon name="check" class="mt-0.5 size-4.5 shrink-0 text-mint-400" />
                {{ feature }}
              </li>
            </ul>

            <a href="#order" class="mt-8 w-full" :class="plan.featured ? 'btn-primary' : 'btn-ghost'">
              Заказать
            </a>
          </article>
        </div>
      </div>
    </section>

    <!-- ─────────────────────────────── FAQ ─────────────────────────────── -->
    <section id="faq" class="scroll-mt-28 py-20 sm:py-28">
      <div class="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div class="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="Вопросы"
            title="Частые вопросы"
            description="Если ответа нет — напишите, разберём вашу задачу на созвоне."
            align="left"
          />
          <a href="#order" class="btn-ghost mt-8">Задать свой вопрос</a>
        </div>

        <div class="space-y-3">
          <details
            v-for="(item, i) in faq"
            :key="item.q"
            class="card card-sheen group px-6 py-1 open:bg-white/[0.06] [&_summary::-webkit-details-marker]:hidden"
            data-reveal
            :style="{ '--reveal-delay': `${i * 50}ms` }"
          >
            <summary class="flex cursor-pointer list-none items-center justify-between gap-5 py-5 font-display text-[15px] font-semibold text-ink transition-colors duration-200 hover:text-aqua-300 sm:text-base">
              {{ item.q }}
              <span
                class="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] transition-transform duration-300 group-open:rotate-180"
              >
                <Icon name="chevron-down" class="size-4" />
              </span>
            </summary>
            <p class="pb-6 text-[15px] leading-relaxed text-ink-soft">{{ item.a }}</p>
          </details>
        </div>
      </div>
    </section>

    <!-- ────────────────────── ORDER FORM + CONTACTS ───────────────────── -->
    <OrderSection id="order" class="scroll-mt-24 py-20 sm:py-28" />
</template>
