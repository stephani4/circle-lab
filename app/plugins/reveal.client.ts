/**
 * Появление секций при прокрутке.
 *
 * Скрывает элементы только если JS работает: класс `js` ставит инлайн-скрипт
 * в <head>. Без скриптов контент виден сразу — и для краулеров без рендеринга.
 */
export default defineNuxtPlugin((nuxtApp) => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) return

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    },
    { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
  )

  const scan = () => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)')
    // Элементы в зоне видимости при загрузке показываем сразу, без ожидания скролла
    for (const element of elements) {
      const rect = element.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.92) element.classList.add('is-visible')
      else observer.observe(element)
    }
  }

  scan()
  nuxtApp.hook('page:finish', () => {
    requestAnimationFrame(scan)
  })
})
