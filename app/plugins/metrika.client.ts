/**
 * Яндекс.Метрика: учёт переходов между страницами.
 *
 * Счётчик подключён в <head> через nuxt.config.ts (app.head.script).
 * Инициализация сама отправляет первый hit, а вот клиентские переходы
 * (history-роутинг Nuxt) Метрика не видит — дёргаем ym('hit') вручную.
 */

declare global {
  interface Window {
    /** Глобальная функция Яндекс.Метрики (объявляется счётчиком в <head>). */
    ym?: (id: number, method: string, ...args: unknown[]) => void
  }
}
export default defineNuxtPlugin((nuxtApp) => {
  const id = useRuntimeConfig().public.yandexMetrikaId
  if (!id) return

  const router = useRouter()
  // Первый переход = загрузка страницы, её уже посчитал init — не задваиваем.
  let firstNavigation = true

  router.afterEach((to) => {
    if (firstNavigation) {
      firstNavigation = false
      return
    }
    // ym определён синхронно в <head>, до загрузки tag.js — вызовы буферизуются
    window.ym?.(Number(id), 'hit', to.fullPath)
  })
})
