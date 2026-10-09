<script setup lang="ts">
/** Визуальный блок hero: мокап чат-бота + плавающие карточки. */
const messages = [
  { from: 'bot', text: 'Здравствуйте! Я бот-консультант. Подберу товар и оформлю заказ прямо здесь 👇' },
  { from: 'user', text: 'Нужен ноутбук до 120 000 ₽ для работы с 1С и видео' },
  { from: 'bot', text: 'Нашёл 3 подходящие модели. Актуальные цены и наличие — в подборке ниже.' },
]

const picks = [
  { title: 'Бизнес 14″ · i7 · 16 ГБ', price: '114 900 ₽' },
  { title: 'Про 16″ · Ryzen 7 · 32 ГБ', price: '119 400 ₽' },
]
</script>

<template>
  <div class="relative animate-float-slow" data-reveal style="--reveal-delay: 200ms">
    <!-- Свечение под карточкой -->
    <div
      class="absolute -inset-10 -z-10 rounded-[3rem] opacity-70 blur-3xl"
      style="background: radial-gradient(circle at 60% 30%, rgb(109 94 252 / 0.45), transparent 62%), radial-gradient(circle at 30% 80%, rgb(6 182 212 / 0.35), transparent 60%)"
      aria-hidden="true"
    />

    <!-- Мокап чата -->
    <div class="card card-sheen mx-auto max-w-md p-0">
      <!-- Шапка -->
      <div class="flex items-center gap-3 border-b border-white/[0.07] px-5 py-4">
        <span class="inline-flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-aqua-500 text-white">
          <Icon name="telegram" class="size-5" />
        </span>
        <div class="min-w-0">
          <p class="truncate font-display text-sm font-bold text-ink">Бот · Circle Lab</p>
          <p class="flex items-center gap-1.5 text-xs text-mint-400">
            <span class="size-1.5 rounded-full bg-mint-400" />
            online · отвечает за 1.2 с
          </p>
        </div>
        <span class="ml-auto chip px-2.5 py-1 font-mono text-[11px]">webApp</span>
      </div>

      <!-- Сообщения -->
      <div class="space-y-3 px-5 py-6">
        <div
          v-for="(message, i) in messages"
          :key="i"
          class="flex"
          :class="message.from === 'user' ? 'justify-end' : 'justify-start'"
          :style="{ animation: `float 0.7s ease-out ${i * 0.12}s both` }"
        >
          <p
            class="max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed"
            :class="
              message.from === 'user'
                ? 'rounded-br-sm bg-gradient-to-br from-brand-600 to-brand-500 text-white'
                : 'rounded-bl-sm border border-white/[0.07] bg-white/[0.05] text-ink-soft'
            "
          >
            {{ message.text }}
          </p>
        </div>

        <!-- Карточка подборки внутри бота -->
        <div class="rounded-2xl rounded-bl-sm border border-white/[0.07] bg-white/[0.05] p-4">
          <p class="text-[11px] font-semibold tracking-[0.14em] text-aqua-300 uppercase">Подборка · 2 из 3</p>

          <ul class="mt-3 space-y-2">
            <li
              v-for="pick in picks"
              :key="pick.title"
              class="flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.04] px-3 py-2.5"
            >
              <span class="text-[13px] text-ink">{{ pick.title }}</span>
              <span class="font-display text-[13px] font-bold whitespace-nowrap text-mint-400">{{ pick.price }}</span>
            </li>
          </ul>

          <div class="mt-3.5 flex gap-2">
            <span class="rounded-full bg-white/10 px-3 py-1.5 text-[12px] text-ink">Оформить заказ</span>
            <span class="rounded-full border border-white/10 px-3 py-1.5 text-[12px] text-ink-mute">Все модели</span>
          </div>
        </div>

        <!-- Индикатор набора текста -->
        <div class="flex justify-start">
          <span class="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-white/[0.07] bg-white/[0.05] px-4 py-3">
            <span
              v-for="n in 3"
              :key="n"
              class="size-1.5 rounded-full bg-ink-mute"
              :style="{ animation: `float 1.1s ease-in-out ${n * 0.14}s infinite` }"
            />
          </span>
        </div>
      </div>

      <!-- Поле ввода (декоративное) -->
      <div class="border-t border-white/[0.07] px-5 py-4">
        <div class="flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2.5">
          <span class="text-[13px] text-ink-mute">Написать сообщение…</span>
          <span class="ml-auto inline-flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-aqua-500 text-white">
            <Icon name="arrow-right" class="size-4" />
          </span>
        </div>
      </div>
    </div>

    <!-- Плавающая карточка: метрики -->
    <div
      class="card card-hover absolute -top-6 -left-4 hidden w-52 p-4 sm:block lg:-left-12"
      data-reveal
      style="--reveal-delay: 420ms"
    >
      <p class="text-[11px] tracking-[0.14em] text-ink-mute uppercase">Заявок сегодня</p>
      <p class="mt-1.5 font-display text-2xl font-extrabold text-gradient-brand">128</p>
      <div class="mt-3 flex h-8 items-end gap-1">
        <span
          v-for="(h, i) in [38, 62, 45, 78, 55, 92, 70, 100]"
          :key="i"
          class="w-full rounded-sm bg-gradient-to-t from-brand-500/40 to-aqua-400/80"
          :style="{ height: `${h}%` }"
        />
      </div>
    </div>

    <!-- Плавающая карточка: стек -->
    <div
      class="card card-hover absolute -right-4 -bottom-8 hidden p-4 sm:block lg:-right-10"
      data-reveal
      style="--reveal-delay: 520ms"
    >
      <div class="flex items-center gap-2">
        <Icon name="zap" class="size-4 text-aqua-300" />
        <p class="font-display text-[13px] font-bold text-ink">Nuxt · SSR</p>
      </div>
      <p class="mt-1.5 text-xs text-ink-mute">LCP 0.9 с · 98/100 Lighthouse</p>
    </div>
  </div>
</template>
