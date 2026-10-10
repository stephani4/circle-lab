<script setup lang="ts">
const site = useSite()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="relative mt-24 border-t border-white/[0.07] pt-16 pb-10">
    <div class="container-x">
      <div class="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <!-- Бренд -->
        <div class="max-w-sm">
          <div class="flex items-center gap-3">
            <span
              class="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-aqua-500 text-white"
            >
              <Icon name="layers" class="size-5" :stroke="1.8" />
            </span>
            <span class="font-display text-[15px] font-extrabold tracking-tight text-ink">
              {{ site.companyName }}
            </span>
          </div>

          <p class="mt-5 text-sm leading-relaxed text-ink-soft">
            Разработка чат-ботов для Telegram и MAX и веб-приложений для бизнеса.
            От аналитики до продакшена — с договором, сроками и передачей кода.
          </p>

          <a
            :href="site.contactMax"
            target="_blank"
            rel="noopener"
            class="btn-ghost btn-sm mt-6"
          >
            <Icon name="max" class="size-4" />
            Написать в Max
          </a>
        </div>

        <!-- Навигация -->
        <nav aria-label="Навигация в подвале">
          <h2 class="text-[11px] font-semibold tracking-[0.18em] text-ink-mute uppercase">Разделы</h2>
          <ul class="mt-5 space-y-3">
            <li v-for="item in SiteConfig.nav" :key="item.href">
              <a :href="item.href" class="link-underline text-sm text-ink-soft hover:text-ink">{{ item.label }}</a>
            </li>
          </ul>
        </nav>

        <!-- Контакты -->
        <div>
          <h2 class="text-[11px] font-semibold tracking-[0.18em] text-ink-mute uppercase">Контакты</h2>
          <ul class="mt-5 space-y-3.5 text-sm">
            <li>
              <a :href="SiteConfig.phoneHref(site.contactPhone)" class="link-underline text-ink-soft hover:text-ink">
                {{ site.contactPhone }}
              </a>
            </li>
            <li>
              <a :href="SiteConfig.emailHref(site.contactEmail)" class="link-underline text-ink-soft hover:text-ink">
                {{ site.contactEmail }}
              </a>
            </li>
            <li class="flex items-center gap-2 text-ink-mute">
              <Icon name="clock" class="size-4" />
              {{ site.workingHours }}
            </li>
          </ul>
        </div>
      </div>

      <div
        class="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] pt-7 text-xs text-ink-mute sm:flex-row"
      >
        <p>© {{ year }} {{ site.companyName }}. Все права защищены.</p>
        <p class="flex items-center gap-2">
          <Icon name="shield" class="size-4" />
          NDA · доступы и код передаём клиенту
        </p>
      </div>
    </div>
  </footer>
</template>
