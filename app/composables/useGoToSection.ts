// Waits for a smooth scroll to finish, or gives up after a moment
const scrollSettled = () =>
  new Promise<void>((resolve) => {
    const done = () => {
      clearTimeout(timer)
      window.removeEventListener('scrollend', done)
      resolve()
    }

    const timer = setTimeout(done, 900)

    window.addEventListener('scrollend', done, { once: true })
  })

// Replays the "arrived" bounce on a section's heading
const arrive = (section: HTMLElement) => {
  section.classList.remove('arrive')
  void section.offsetWidth
  section.classList.add('arrive')

  setTimeout(() => section.classList.remove('arrive'), 1400)
}

/*
 * Scrolls to a home page section (going home first from other pages), then
 * greets it with a small bounce so it is clear where you landed.
 */
export const useGoToSection = () => {
  const route = useRoute()
  const router = useRouter()

  return async (id: string) => {
    if (route.path !== '/') {
      await navigateTo(`/#${id}`)
      return
    }

    if (route.hash !== `#${id}`) await router.replace({ hash: `#${id}` })

    const section = document.getElementById(id)

    if (!section) return

    section.scrollIntoView({ behavior: 'smooth' })
    await scrollSettled()
    arrive(section)
  }
}
