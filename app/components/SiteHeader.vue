<template>
  <header class="header" :class="{ 'header--scrolled': scrolled, 'header--open': menuOpen }">
    <div class="header__bar">
      <NuxtLink to="/" class="logo" aria-label="Ineza Irene Baghor, home" @click="closeMenu">
        <span class="logo__mark">IB</span>
        <span class="logo__text">
          <span class="logo__name">Ineza Irene Baghor</span>
          <span class="logo__role">Software Engineer</span>
        </span>
      </NuxtLink>

      <!-- Desktop: links with a highlight that slides to the hovered or current section -->
      <nav ref="navRef" class="nav" aria-label="Main" @mouseleave="hovered = null">
        <span class="nav__pill" :style="pillStyle" aria-hidden="true"></span>

        <NuxtLink
          v-for="link in links"
          :key="link.id"
          :ref="(el) => setLinkRef(link.id, el)"
          :to="`/#${link.id}`"
          class="nav__link"
          :class="{ 'nav__link--active': active === link.id }"
          :aria-current="active === link.id ? 'location' : undefined"
          @mouseenter="hovered = link.id"
          @focus="onLinkFocus(link.id, $event)"
          @blur="hovered = null"
          @click.prevent="goTo(link.id)"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <!-- Sun that turns into a moon -->
      <button
        ref="themeButton"
        class="theme"
        type="button"
        :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
        :aria-pressed="theme === 'dark'"
        @click="toggle(themeButton)"
      >
        <svg class="theme__icon" viewBox="0 0 24 24" aria-hidden="true">
          <mask id="theme-moon">
            <rect width="24" height="24" fill="#fff" />
            <circle class="theme__cut" cx="24" cy="8" r="6" fill="#000" />
          </mask>
          <circle class="theme__core" cx="12" cy="12" r="5" fill="currentColor" mask="url(#theme-moon)" />
          <g class="theme__rays" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M12 1.5v2M12 20.5v2M1.5 12h2M20.5 12h2M4.6 4.6 6 6M18 18l1.4 1.4M4.6 19.4 6 18M18 6l1.4-1.4" />
          </g>
        </svg>
      </button>

      <NuxtLink to="/#contact" class="cta" @click.prevent="goTo('contact')">
        Let’s talk
        <span class="cta__dot" aria-hidden="true"></span>
      </NuxtLink>

      <button
        class="burger"
        :aria-expanded="menuOpen"
        aria-controls="mobile-menu"
        :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
        @click="menuOpen = !menuOpen"
      >
        <span class="burger__line"></span>
        <span class="burger__line"></span>
      </button>

      <!-- How far down the page you are -->
      <span class="progress" :style="{ transform: `scaleX(${progress})` }" aria-hidden="true"></span>
    </div>

    <!-- Phone: full-screen menu -->
    <Transition name="menu">
      <div v-if="menuOpen" id="mobile-menu" class="menu" role="dialog" aria-modal="true" aria-label="Menu">
        <nav class="menu__nav" aria-label="Main">
          <NuxtLink
            v-for="(link, index) in links"
            :key="link.id"
            :ref="index === 0 ? 'firstMenuLink' : undefined"
            :to="`/#${link.id}`"
            class="menu__link"
            :class="{ 'menu__link--active': active === link.id }"
            :style="{ '--i': index }"
            @click.prevent="goTo(link.id)"
          >
            <span class="menu__num">0{{ index + 1 }}</span>
            <span class="menu__label">{{ link.label }}</span>
            <span class="menu__arrow" aria-hidden="true">→</span>
          </NuxtLink>
        </nav>

        <div class="menu__footer" :style="{ '--i': links.length }">
          <NuxtLink to="/#contact" class="btn btn--primary menu__cta" @click.prevent="goTo('contact')">Let’s talk</NuxtLink>

          <div class="menu__contacts">
            <a :href="`mailto:${email}`">{{ email }}</a>
            <a href="https://github.com/baghor" target="_blank" rel="noopener">GitHub ↗</a>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
  import type { ComponentPublicInstance } from 'vue'

  const links = [
    { id: 'about', label: 'About' },
    { id: 'work', label: 'Work' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ]

  const email = 'inezairene30@gmail.com'

  const route = useRoute()

  const menuOpen = ref(false)
  const scrolled = ref(false)

  // The section on screen (home page), and the link under the pointer
  const active = ref<string | null>(null)
  const hovered = ref<string | null>(null)

  const closeMenu = () => {
    menuOpen.value = false
  }

  /*
   * Links: close the menu and let the page scroll again first, otherwise the
   * jump to the section is lost while the page is locked.
   */
  const goToSection = useGoToSection()

  const goTo = (id: string) => {
    closeMenu()
    document.documentElement.style.overflow = ''

    return goToSection(id)
  }

  const { theme, sync: syncTheme, toggle, followSystem } = useTheme()
  const themeButton = ref<HTMLElement | null>(null)

  let stopFollowingSystem: (() => void) | null = null

  // 0 at the top of the page, 1 at the bottom
  const progress = ref(0)

  /*
   * Sliding highlight: sits under the hovered link, else the current
   * section's link, else hides.
   */
  const navRef = ref<HTMLElement | null>(null)
  const linkEls = new Map<string, HTMLElement>()

  const setLinkRef = (id: string, el: Element | ComponentPublicInstance | null) => {
    const node = (el as ComponentPublicInstance | null)?.$el ?? el

    if (node instanceof HTMLElement) linkEls.set(id, node)
    else linkEls.delete(id)
  }

  // Keyboard focus moves the highlight; a click's focus would pin it to that link
  const onLinkFocus = (id: string, event: FocusEvent) => {
    if ((event.target as HTMLElement).matches(':focus-visible')) hovered.value = id
  }

  const pillTarget = computed(() => hovered.value ?? active.value)
  const pillBox = ref({ left: 0, width: 0 })

  const measurePill = () => {
    const el = pillTarget.value ? linkEls.get(pillTarget.value) : null

    if (el) pillBox.value = { left: el.offsetLeft, width: el.offsetWidth }
  }

  const pillStyle = computed(() => ({
    transform: `translateX(${pillBox.value.left}px)`,
    width: `${pillBox.value.width}px`,
    opacity: pillTarget.value ? 1 : 0,
  }))

  watch(pillTarget, () => nextTick(measurePill))

  /*
   * Current section (home page only): the last one whose top has passed the
   * upper third of the window. At the very bottom it is the last one, so a
   * short section like Contact still lights up.
   */
  const updateActive = () => {
    if (route.path !== '/') {
      active.value = null
      return
    }

    const line = window.innerHeight * 0.35
    let current: string | null = null

    links.forEach((link) => {
      const top = document.getElementById(link.id)?.getBoundingClientRect().top

      if (top !== undefined && top <= line) current = link.id
    })

    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4

    active.value = atBottom ? links[links.length - 1]!.id : current
  }

  let frame = 0

  const onScroll = () => {
    scrolled.value = window.scrollY > 12

    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(() => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight

      progress.value = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0
      updateActive()
    })
  }

  const onResize = () => {
    measurePill()
    updateActive()
  }

  const onKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') closeMenu()
  }

  // The menu covers the page: stop it scrolling underneath, and move focus in
  const firstMenuLink = ref<ComponentPublicInstance[] | null>(null)

  watch(menuOpen, (open) => {
    document.documentElement.style.overflow = open ? 'hidden' : ''

    if (open) nextTick(() => (firstMenuLink.value?.[0]?.$el as HTMLElement | undefined)?.focus({ focusVisible: false } as FocusOptions))
  })

  watch(
    () => route.path,
    () => {
      closeMenu()
      nextTick(updateActive)
    }
  )

  onMounted(() => {
    syncTheme()
    stopFollowingSystem = followSystem()

    onScroll()
    measurePill()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    window.addEventListener('keydown', onKey)
  })

  onBeforeUnmount(() => {
    cancelAnimationFrame(frame)
    stopFollowingSystem?.()
    document.documentElement.style.overflow = ''

    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onResize)
    window.removeEventListener('keydown', onKey)
  })
</script>

<style scoped>
  /* No filter or transform here: the full-screen menu is fixed to the window */
  .header {
    position: sticky;
    top: 0;
    z-index: 50;
    padding: 14px var(--gutter) 0;
    transition: padding 0.3s ease;
  }

  .header--scrolled {
    padding-top: 10px;
  }

  /*
   * Frosted glass capsule: see-through fill, strong blur, a light edge on top
   * like the rim of a glass, and a soft shadow that grows once the page scrolls.
   */
  .header__bar {
    --glass: rgba(255, 255, 255, 0.36);
    --glass-edge: rgba(255, 255, 255, 0.75);
    --glass-line: rgba(11, 18, 32, 0.07);

    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 16px;
    max-width: var(--page);
    height: 62px;
    margin: 0 auto;
    padding: 0 8px 0 10px;
    background: linear-gradient(180deg, var(--glass-edge) -60%, var(--glass) 50%);
    backdrop-filter: blur(18px) saturate(190%);
    -webkit-backdrop-filter: blur(18px) saturate(190%);
    border-radius: 999px;
    box-shadow:
      inset 0 1px 0 var(--glass-edge),
      0 0 0 1px var(--glass-line),
      0 8px 24px -16px rgba(11, 18, 32, 0.2);
    transition:
      box-shadow 0.4s ease,
      background 0.4s ease;
  }

  .header--scrolled .header__bar {
    --glass: rgba(255, 255, 255, 0.46);

    box-shadow:
      inset 0 1px 0 var(--glass-edge),
      0 0 0 1px var(--glass-line),
      0 18px 40px -18px rgba(11, 18, 32, 0.28);
  }

  /*
   * Logo: IB on a calm deep teal, the site's accent toned down, with a sage dot.
   * To go back to the black one: --logo-bg: var(--text); --logo-ink: var(--bg); --logo-dot: var(--accent).
   */
  .logo {
    --logo-bg: #1f4e4a;
    --logo-ink: #e3f1ed;
    --logo-dot: #8fbfb3;

    display: flex;
    align-items: center;
    gap: 12px;
    margin-right: auto;
    border-radius: 999px;
    text-decoration: none;
  }

  .logo__mark {
    position: relative;
    display: grid;
    place-items: center;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: var(--logo-bg);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
    color: var(--logo-ink);
    font-family: var(--font-heading);
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.01em;
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .logo__mark::after {
    content: '';
    position: absolute;
    right: 1px;
    bottom: 1px;
    width: 9px;
    height: 9px;
    border: 2px solid var(--bg);
    border-radius: 50%;
    background: var(--logo-dot);
  }

  .logo:hover .logo__mark {
    transform: rotate(-10deg);
  }

  .logo__text {
    display: flex;
    flex-direction: column;
    line-height: 1.2;
  }

  .logo__name {
    font-family: var(--font-heading);
    font-size: 15px;
    font-weight: 600;
  }

  .logo__role {
    color: var(--text-muted);
    font-size: 12px;
  }

  /* Desktop links */
  .nav {
    position: relative;
    display: flex;
    gap: 2px;
    padding: 4px;
  }

  /* A small pane of brighter glass that slides between links */
  .nav__pill {
    position: absolute;
    top: 4px;
    bottom: 4px;
    left: 0;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.85);
    box-shadow:
      inset 0 1px 0 #fff,
      0 0 0 1px rgba(11, 18, 32, 0.05),
      0 4px 14px -6px rgba(11, 18, 32, 0.18);
    transition:
      transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
      width 0.35s cubic-bezier(0.22, 1, 0.36, 1),
      opacity 0.2s ease;
    pointer-events: none;
  }

  .nav__link {
    position: relative;
    z-index: 1;
    padding: 8px 16px;
    border-radius: 999px;
    color: var(--text-muted);
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .nav__link:hover {
    color: var(--text);
  }

  /* Current section: teal text and a dot under it */
  .nav__link--active {
    color: var(--accent-strong);
  }

  .nav__link--active::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 2px;
    width: 4px;
    height: 4px;
    margin-left: -2px;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 8px var(--accent);
  }

  /* Theme button: a sun whose rays tuck away as a shadow slides over it */
  .theme {
    display: grid;
    place-items: center;
    flex: none;
    width: 40px;
    height: 40px;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    box-shadow: 0 0 0 1px rgba(11, 18, 32, 0.06);
    color: var(--text);
    cursor: pointer;
    transition: transform 0.4s var(--spring);
  }

  .theme:hover {
    transform: rotate(-15deg) scale(1.06);
  }

  .theme:active {
    transform: scale(0.92);
  }

  .theme__icon {
    width: 20px;
    height: 20px;
    overflow: visible;
  }

  .theme__core,
  .theme__cut,
  .theme__rays {
    transform-box: fill-box;
    transform-origin: center;
  }

  .theme__core {
    transition: transform 0.6s var(--spring);
  }

  .theme__cut {
    transition: transform 0.6s var(--ease-out);
  }

  .theme__rays {
    transition:
      transform 0.6s var(--spring),
      opacity 0.3s ease;
  }

  :root[data-theme='dark'] .theme__core {
    transform: scale(1.7);
  }

  :root[data-theme='dark'] .theme__cut {
    transform: translate(-9px, 0);
  }

  :root[data-theme='dark'] .theme__rays {
    opacity: 0;
    transform: rotate(-90deg) scale(0.5);
  }

  /* Reading progress: a thin line along the bottom of the bar */
  .progress {
    position: absolute;
    left: 32px;
    right: 32px;
    bottom: 0;
    height: 2px;
    border-radius: 2px;
    background: linear-gradient(90deg, var(--accent), var(--indigo));
    transform-origin: left;
    transition: transform 0.12s linear;
    pointer-events: none;
  }

  .header--open .progress {
    opacity: 0;
  }

  /* Call to action */
  .cta {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 11px 20px;
    border-radius: 999px;
    background: var(--text);
    color: var(--bg);
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  .cta:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 24px -10px rgba(11, 18, 32, 0.5);
  }

  /* "Available" dot with a soft pulse */
  .cta__dot {
    position: relative;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #22c55e;
  }

  .cta__dot::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: #22c55e;
    animation: pulse 2s ease-out infinite;
  }

  @keyframes pulse {
    from {
      transform: scale(1);
      opacity: 0.7;
    }

    to {
      transform: scale(2.6);
      opacity: 0;
    }
  }

  /* Burger: two lines that turn into an X */
  .burger {
    display: none;
    position: relative;
    width: 44px;
    height: 44px;
    border: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    box-shadow: 0 0 0 1px rgba(11, 18, 32, 0.06);
    color: var(--text);
    cursor: pointer;
  }

  .burger__line {
    position: absolute;
    left: 13px;
    width: 18px;
    height: 2px;
    border-radius: 2px;
    background: currentColor;
    transition:
      transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
      width 0.35s ease;
  }

  .burger__line:first-child {
    top: 17px;
  }

  .burger__line:last-child {
    top: 25px;
    width: 12px;
  }

  .header--open .burger__line:first-child {
    transform: translateY(4px) rotate(45deg);
  }

  .header--open .burger__line:last-child {
    width: 18px;
    transform: translateY(-4px) rotate(-45deg);
  }

  /* Full-screen menu */
  .menu {
    position: fixed;
    inset: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 108px var(--gutter) 32px;
    overflow-y: auto;
    background:
      radial-gradient(80% 50% at 100% 0%, var(--accent-soft), transparent 70%),
      radial-gradient(60% 40% at 0% 100%, rgba(79, 70, 229, 0.1), transparent 70%),
      var(--bg);
  }

  .menu__nav {
    display: flex;
    flex-direction: column;
  }

  .menu__link {
    display: flex;
    align-items: baseline;
    gap: 16px;
    padding: 16px 4px;
    border-bottom: 1px solid var(--border);
    text-decoration: none;
    animation: rise 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
    animation-delay: calc(var(--i) * 60ms + 80ms);
  }

  .menu__num {
    color: var(--accent);
    font-size: 13px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }

  .menu__label {
    flex: 1;
    font-family: var(--font-heading);
    font-size: 34px;
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.1;
  }

  .menu__arrow {
    color: var(--text-muted);
    font-size: 22px;
    transition: transform 0.2s ease;
  }

  .menu__link:hover .menu__arrow,
  .menu__link--active .menu__arrow {
    color: var(--accent);
    transform: translateX(4px);
  }

  .menu__link--active .menu__label {
    color: var(--accent);
  }

  .menu__footer {
    display: grid;
    gap: 20px;
    margin-top: 40px;
    animation: rise 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
    animation-delay: calc(var(--i) * 60ms + 80ms);
  }

  .menu__cta {
    justify-content: center;
    padding: 16px;
    font-size: 16px;
  }

  .menu__contacts {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 8px 16px;
    color: var(--text-muted);
    font-size: 14px;
  }

  .menu__contacts a {
    text-decoration: none;
  }

  .menu__contacts a:hover {
    color: var(--accent);
  }

  @keyframes rise {
    from {
      opacity: 0;
      transform: translateY(16px);
    }

    to {
      opacity: 1;
      transform: none;
    }
  }

  .menu-enter-active,
  .menu-leave-active {
    transition:
      opacity 0.3s ease,
      clip-path 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .menu-enter-from,
  .menu-leave-to {
    opacity: 0;
    clip-path: circle(0% at calc(100% - 44px) 46px);
  }

  .menu-enter-to,
  .menu-leave-from {
    clip-path: circle(150% at calc(100% - 44px) 46px);
  }

  /* Dark: smoky glass with a faint light edge */
  :root[data-theme='dark'] .header__bar {
    --glass: rgba(17, 26, 46, 0.5);
    --glass-edge: rgba(255, 255, 255, 0.08);
    --glass-line: rgba(255, 255, 255, 0.06);
  }

  :root[data-theme='dark'] .header--scrolled .header__bar {
    --glass: rgba(17, 26, 46, 0.68);

    box-shadow:
      inset 0 1px 0 var(--glass-edge),
      0 0 0 1px var(--glass-line),
      0 18px 40px -18px rgba(0, 0, 0, 0.7);
  }

  /* Dark: a touch lighter so the tile still stands off the background */
  :root[data-theme='dark'] .logo {
    --logo-bg: #2a5c57;
    --logo-ink: #e6f4f0;
    --logo-dot: #7fb3a7;
  }

  :root[data-theme='dark'] .nav__pill {
    background: rgba(255, 255, 255, 0.08);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }

  :root[data-theme='dark'] .burger,
  :root[data-theme='dark'] .theme {
    background: rgba(255, 255, 255, 0.06);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08);
  }

  /* Tablet: drop the role line to make room */
  @media (max-width: 960px) {
    .logo__role {
      display: none;
    }
  }

  /* Phone */
  @media (max-width: 760px) {
    .nav,
    .cta {
      display: none;
    }

    .burger {
      display: block;
    }

    .header__bar {
      gap: 8px;
      height: 58px;
      padding: 0 7px 0 10px;
    }

    .progress {
      left: 24px;
      right: 24px;
    }

    .header--open .header__bar {
      background: transparent;
      box-shadow: none;
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
    }

    .logo__role {
      display: block;
    }
  }

  @media (max-width: 360px) {
    .logo__text {
      display: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .cta__dot::after,
    .menu__link,
    .menu__footer {
      animation: none;
    }

    .menu-enter-active,
    .menu-leave-active {
      transition: opacity 0.15s ease;
    }
  }
</style>
