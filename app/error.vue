<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const site = useSite()

const is404 = computed(() => props.error.statusCode === 404)

useHead({ title: is404.value ? 'Страница не найдена' : 'Ошибка' })

function goHome() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
    <BackdropDecor />

    <div class="relative text-center">
      <p class="eyebrow justify-center">
        <span class="h-px w-8 bg-gradient-to-r from-aqua-400 to-transparent" />
        {{ error.statusCode }}
        <span class="h-px w-8 bg-gradient-to-l from-aqua-400 to-transparent" />
      </p>

      <h1 class="mt-6 text-4xl font-extrabold sm:text-5xl">
        {{ is404 ? 'Такой страницы нет' : 'Что-то пошло не так' }}
      </h1>

      <p class="mx-auto mt-5 max-w-md text-ink-soft">
        {{
          is404
            ? 'Возможно, ссылка устарела. Вернитесь на главную или напишите нам — поможем с задачей.'
            : 'Мы уже знаем о проблеме. Попробуйте обновить страницу или вернуться на главную.'
        }}
      </p>

      <div class="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
        <button type="button" class="btn-primary" @click="goHome">На главную</button>
        <a
          :href="site.contactMax"
          target="_blank"
          rel="noopener"
          class="btn-ghost"
        >
          <Icon name="max" class="size-4" />
          Написать в Max
        </a>
      </div>
    </div>
  </div>
</template>
