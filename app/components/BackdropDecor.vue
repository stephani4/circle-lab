<script setup lang="ts">
/** Декоративный фон: свечения, сетка и лёгкое зерно. Скрыт от скринридеров. */
</script>

<template>
  <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
    <!-- Базовые свечения -->
    <div class="absolute inset-0 bg-void" />

    <!-- inset-x-0 + mx-auto центрирует без transform, который перезаписывает анимацию -->
    <div
      class="absolute inset-x-0 -top-40 mx-auto h-[42rem] w-[42rem] rounded-full opacity-60 blur-[120px] animate-drift"
      style="background: radial-gradient(circle, rgb(109 94 252 / 0.55), transparent 65%)"
    />
    <div
      class="absolute top-1/3 -right-40 h-[34rem] w-[34rem] rounded-full opacity-40 blur-[130px]"
      style="background: radial-gradient(circle, rgb(6 182 212 / 0.45), transparent 65%)"
    />
    <div
      class="absolute bottom-0 -left-32 h-[30rem] w-[30rem] rounded-full opacity-30 blur-[120px]"
      style="background: radial-gradient(circle, rgb(91 61 245 / 0.5), transparent 70%)"
    />

    <!-- Сетка с затуханием к краям -->
    <div
      class="absolute inset-0 bg-grid opacity-60"
      style="mask-image: radial-gradient(ellipse 90% 60% at 50% 0%, #000 20%, transparent 78%)"
    />

    <!-- Зерно поверх всего -->
    <div class="absolute inset-0 bg-noise opacity-[0.028] mix-blend-overlay" />
  </div>
</template>
