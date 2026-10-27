<template>
  <header class="header" :class="{ 'header--open': menuOpen }">
    <div class="container header__inner">
      <NuxtLink to="/" class="header__logo" aria-label="Ineza Irene Baghor, home" @click="menuOpen = false">
        <span class="header__mark">IB</span>
        <span class="header__name">Ineza Irene Baghor</span>
      </NuxtLink>

      <button
        class="header__toggle"
        :aria-expanded="menuOpen"
        aria-controls="site-nav"
        aria-label="Menu"
        @click="menuOpen = !menuOpen"
      >
        <span class="header__bar"></span>
      </button>

      <nav id="site-nav" class="header__nav" aria-label="Main">
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="header__link" @click="menuOpen = false">
          {{ link.label }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
  const links = [
    { label: 'About', to: '/#about' },
    { label: 'Work', to: '/#work' },
    { label: 'Experience', to: '/#experience' },
    { label: 'Contact', to: '/#contact' },
  ]

  const menuOpen = ref(false)

  // A route change (back button, a project link) closes the menu
  const route = useRoute()

  watch(
    () => route.fullPath,
    () => {
      menuOpen.value = false
    }
  )
</script>

<style scoped>
  .header {
    position: sticky;
    top: 0;
    z-index: 20;
    background: color-mix(in srgb, var(--bg) 88%, transparent);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border);
  }

  .header__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
  }

  .header__logo {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    font-family: var(--font-heading);
    font-weight: 600;
  }

  .header__mark {
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    border-radius: 9px;
    background: var(--text);
    color: var(--bg);
    font-size: 14px;
  }

  .header__nav {
    display: flex;
    gap: 28px;
  }

  .header__link {
    color: var(--text-muted);
    font-size: 15px;
    font-weight: 500;
    text-decoration: none;
  }

  .header__link:hover {
    color: var(--accent);
  }

  .header__toggle {
    display: none;
    width: 40px;
    height: 40px;
    padding: 0;
    border: 0;
    background: none;
    color: var(--text);
    cursor: pointer;
  }

  .header__bar,
  .header__bar::before,
  .header__bar::after {
    display: block;
    width: 22px;
    height: 2px;
    margin: 0 auto;
    border-radius: 2px;
    background: currentColor;
    transition: transform 0.2s;
  }

  .header__bar {
    position: relative;
  }

  .header__bar::before,
  .header__bar::after {
    content: '';
    position: absolute;
    left: 0;
  }

  .header__bar::before {
    top: -7px;
  }

  .header__bar::after {
    top: 7px;
  }

  @media (max-width: 720px) {
    .header__name {
      display: none;
    }

    .header__toggle {
      display: block;
    }

    .header__nav {
      position: absolute;
      top: 64px;
      left: 0;
      right: 0;
      flex-direction: column;
      gap: 0;
      padding: 8px var(--gutter) 16px;
      background: var(--bg);
      border-bottom: 1px solid var(--border);
      display: none;
    }

    .header--open .header__nav {
      display: flex;
    }

    .header__link {
      padding: 12px 0;
      font-size: 17px;
    }

    .header--open .header__bar {
      background: transparent;
    }

    .header--open .header__bar::before {
      transform: translateY(7px) rotate(45deg);
    }

    .header--open .header__bar::after {
      transform: translateY(-7px) rotate(-45deg);
    }
  }
</style>
