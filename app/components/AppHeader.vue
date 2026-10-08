<script setup lang="ts">
const config = useRuntimeConfig()

const nav = [
  { label: 'Услуги', href: '#services' },
  { label: 'Процесс', href: '#process' },
  { label: 'Кейсы', href: '#cases' },
  { label: 'Цены', href: '#pricing' },
  { label: 'Вопросы', href: '#faq' },
]

const sectionIds = ['services', 'process', 'cases', 'pricing', 'faq', 'order']
const { active } = useScrollSpy(sectionIds)

const scrolled = ref(false)
const menuOpen = ref(false)
const menuEl = ref<HTMLElement | null>(null)

const maxHref = computed(() => config.public.contactMax)

function onScroll() {
  scrolled.value = window.scrollY > 16
}

function closeMenu() {
  menuOpen.value = false
}

// Блокируем прокрутку и закрываем по Escape, пока открыто мобильное меню
watch(menuOpen, async (open) => {
  if (!import.meta.client) return
  document.body.style.overflow = open ? 'hidden' : ''
  if (open) {
    await nextTick()
    menuEl.value?.querySelector<HTMLElement>('a, button')?.focus()
  }
})

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && menuOpen.value) closeMenu()
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-500"
    :class="scrolled || menuOpen ? 'glass border-b border-white/[0.07] shadow-card' : ''"
  >
    <div class="container-x">
      <div class="flex h-18 items-center justify-between gap-6 py-4 lg:h-20">
        <!-- Логотип -->
        <NuxtLink to="/" class="group flex items-center gap-3" aria-label="На главную">
          <span
            class="relative inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-aqua-500 text-white shadow-glow transition-transform duration-500 group-hover:scale-105"
          >
            <Icon name="layers" class="size-5" :stroke="1.8" />
          </span>
          <span class="leading-none">
            <span class="block font-display text-[15px] font-extrabold tracking-tight text-ink">
              {{ config.public.companyName }}
            </span>
            <span class="mt-0.5 block text-[11px] text-ink-mute">боты · веб-приложения</span>
          </span>
        </NuxtLink>

        <!-- Навигация (desktop) -->
        <nav class="hidden items-center gap-1 lg:flex" aria-label="Основная навигация">
          <a
            v-for="item in nav"
            :key="item.href"
            :href="item.href"
            class="relative rounded-full px-4 py-2 text-sm transition-colors duration-300"
            :class="active === item.href.slice(1) ? 'text-ink' : 'text-ink-soft hover:text-ink'"
          >
            {{ item.label }}
            <span
              v-if="active === item.href.slice(1)"
              class="absolute inset-x-4 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-aqua-400 to-transparent"
            />
          </a>
        </nav>

        <!-- CTA + бургер -->
        <div class="flex items-center gap-2">
          <a :href="maxHref" target="_blank" rel="noopener" class="btn-ghost btn-sm hidden md:inline-flex">
            <Icon name="max" class="size-4" />
            Написать в Max
          </a>
          <a href="#order" class="btn-primary btn-sm hidden sm:inline-flex">Заказать</a>

          <button
            type="button"
            class="inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-ink lg:hidden"
            :aria-expanded="menuOpen"
            aria-controls="mobile-menu"
            :aria-label="menuOpen ? 'Закрыть меню' : 'Открыть меню'"
            @click="menuOpen = !menuOpen"
          >
            <Icon :name="menuOpen ? 'close' : 'menu'" class="size-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Мобильное меню -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-3"
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="opacity-0 -translate-y-3"
    >
      <div v-if="menuOpen" id="mobile-menu" ref="menuEl" class="lg:hidden">
        <nav class="container-x pb-6" aria-label="Мобильная навигация">
          <ul class="space-y-1 border-t border-white/[0.07] pt-4">
            <li v-for="item in nav" :key="item.href">
              <a
                :href="item.href"
                class="flex items-center justify-between rounded-xl px-4 py-3.5 font-display text-base font-semibold text-ink transition-colors duration-200 hover:bg-white/[0.06]"
                @click="closeMenu"
              >
                {{ item.label }}
                <Icon name="arrow-right" class="size-4 text-ink-mute" />
              </a>
            </li>
          </ul>

          <div class="mt-5 grid gap-2.5">
            <a href="#order" class="btn-primary w-full" @click="closeMenu">Заказать проект</a>
            <a :href="maxHref" target="_blank" rel="noopener" class="btn-ghost w-full">
              <Icon name="max" class="size-4" />
              Написать в Max
            </a>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>
