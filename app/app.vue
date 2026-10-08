<script setup lang="ts">
const site = useSite()

useHead({
  link: [{ rel: 'canonical', href: computed(() => `${site.siteUrl}/`) }],
})
</script>

<template>
  <div class="relative overflow-x-clip">
    <NuxtRouteAnnouncer />

    <!-- Ссылка для клавиатурной навигации -->
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
    >
      Перейти к содержимому
    </a>

    <BackdropDecor />

    <AppHeader />

    <main id="main">
      <NuxtPage />
    </main>

    <AppFooter />
  </div>
</template>
