type Theme = 'light' | 'dark'

const themeColors: Record<Theme, string> = { light: '#ffffff', dark: '#0b1220' }

/*
 * Light / dark theme. The head script in nuxt.config.ts sets the first one;
 * this reads it, switches it and remembers the choice.
 */
export const useTheme = () => {
  const theme = useState<Theme>('theme', () => 'light')

  const apply = (next: Theme, save = true) => {
    document.documentElement.dataset.theme = next
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColors[next])
    theme.value = next

    if (!save) return

    try {
      localStorage.setItem('theme', next)
    } catch {
      // Storage blocked: the theme still changes for this visit
    }
  }

  const sync = () => {
    apply(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light', false)
  }

  // Until someone picks a theme, follow the system one
  const followSystem = () => {
    const query = matchMedia('(prefers-color-scheme: dark)')

    const onChange = (event: MediaQueryListEvent) => {
      let saved: string | null = null

      try {
        saved = localStorage.getItem('theme')
      } catch {
        // No storage: treat as not saved
      }

      if (!saved) apply(event.matches ? 'dark' : 'light', false)
    }

    query.addEventListener('change', onChange)

    return () => query.removeEventListener('change', onChange)
  }

  // The new theme spreads in a circle from the button that was pressed
  const toggle = (origin?: HTMLElement | null) => {
    const next: Theme = theme.value === 'dark' ? 'light' : 'dark'
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!document.startViewTransition || reduceMotion) {
      apply(next)
      return
    }

    const box = origin?.getBoundingClientRect()
    const x = box ? box.left + box.width / 2 : innerWidth / 2
    const y = box ? box.top + box.height / 2 : 0
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

    const transition = document.startViewTransition(() => apply(next))

    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' }
      )
    })
  }

  return { theme, sync, toggle, followSystem }
}
