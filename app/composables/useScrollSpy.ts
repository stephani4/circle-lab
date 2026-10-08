/**
 * Отслеживает активную секцию страницы (скролл-спай).
 * Работает только на клиенте и не влияет на SSR-разметку.
 */
export function useScrollSpy(ids: string[], offset = 140) {
  const active = ref('')

  if (import.meta.client) {
    let observer: IntersectionObserver | undefined

    const setup = () => {
      observer?.disconnect()
      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]

          if (visible) active.value = visible.target.id
        },
        { rootMargin: `-${offset}px 0px -55% 0px`, threshold: 0 },
      )

      ids.forEach((id) => {
        const el = document.getElementById(id)
        if (el) observer!.observe(el)
      })
    }

    onMounted(setup)
    onBeforeUnmount(() => observer?.disconnect())
  }

  return { active: readonly(active) }
}
