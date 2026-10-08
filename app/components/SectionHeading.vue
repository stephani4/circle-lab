<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow: string
    title: string
    description?: string
    align?: 'center' | 'left'
  }>(),
  { description: '', align: 'center' },
)
</script>

<template>
  <header
    class="max-w-2xl"
    :class="align === 'center' ? 'mx-auto text-center' : 'text-left'"
    data-reveal
  >
    <p class="eyebrow">
      <span class="h-px w-8 bg-gradient-to-r from-aqua-400/80 to-transparent" />
      {{ eyebrow }}
    </p>

    <h2 class="mt-5 text-3xl leading-tight font-extrabold sm:text-4xl lg:text-[2.75rem]">
      {{ title }}
    </h2>

    <p v-if="description" class="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">
      {{ description }}
    </p>
  </header>
</template>
