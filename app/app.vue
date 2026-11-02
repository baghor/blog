<template>
  <div class="site">
    <SiteHeader />

    <main id="main">
      <NuxtPage />
    </main>

    <SiteFooter />
  </div>
</template>

<style>
  .site {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
  }
</style>
