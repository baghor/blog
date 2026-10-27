import type { Directive } from 'vue'

/*
 * v-reveal="delayMs": the element rises into place, with a small bounce, the
 * first time it scrolls into view. Numbers marked data-count inside it count up.
 *
 * v-spotlight: a soft light follows the mouse across a card and the card tilts
 * slightly towards it. Mouse only; touch and pen are left alone.
 */
export default defineNuxtPlugin((nuxtApp) => {
  let observer: IntersectionObserver | null = null

  const countUp = (el: HTMLElement) => {
    const target = Number(el.dataset.count)
    const start = performance.now()
    const duration = 1400

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(2, -10 * progress)

      el.textContent = String(Math.round(target * (progress === 1 ? 1 : eased)))

      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }

  const show = (el: HTMLElement) => {
    el.dataset.in = ''
    el.querySelectorAll<HTMLElement>('[data-count]').forEach(countUp)
  }

  const getObserver = () =>
    (observer ??= new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          show(entry.target as HTMLElement)
          observer?.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.04 }
    ))

  const reveal: Directive<HTMLElement, number | undefined> = {
    getSSRProps: () => ({ 'data-reveal': '' }),

    mounted(el, binding) {
      el.dataset.reveal = ''

      if (binding.value) el.style.setProperty('--reveal-delay', `${binding.value}ms`)

      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.dataset.in = ''
        return
      }

      el.querySelectorAll<HTMLElement>('[data-count]').forEach((counter) => (counter.textContent = '0'))
      getObserver().observe(el)
    },

    unmounted(el) {
      observer?.unobserve(el)
    },
  }

  type SpotlightEl = HTMLElement & { _spotlight?: { move: (event: PointerEvent) => void; leave: () => void } }

  const spotlight: Directive<SpotlightEl> = {
    getSSRProps: () => ({}),

    mounted(el) {
      const move = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse') return

        const box = el.getBoundingClientRect()
        const x = (event.clientX - box.left) / box.width
        const y = (event.clientY - box.top) / box.height

        el.style.setProperty('--mx', `${x * 100}%`)
        el.style.setProperty('--my', `${y * 100}%`)
        el.style.setProperty('--rx', `${(0.5 - y) * 5}deg`)
        el.style.setProperty('--ry', `${(x - 0.5) * 5}deg`)
      }

      const leave = () => {
        el.style.setProperty('--rx', '0deg')
        el.style.setProperty('--ry', '0deg')
      }

      el._spotlight = { move, leave }
      el.addEventListener('pointermove', move)
      el.addEventListener('pointerleave', leave)
    },

    unmounted(el) {
      if (!el._spotlight) return

      el.removeEventListener('pointermove', el._spotlight.move)
      el.removeEventListener('pointerleave', el._spotlight.leave)
    },
  }

  nuxtApp.vueApp.directive('reveal', reveal)
  nuxtApp.vueApp.directive('spotlight', spotlight)

  // Tells the head script the app started, so revealed content stays hidden until it scrolls in
  if (import.meta.client) (window as Window & { __motion?: boolean }).__motion = true
})
