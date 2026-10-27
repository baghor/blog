<template>
  <div class="site">
    <SiteHeader />

    <main class="error container">
      <span class="eyebrow">{{ error?.statusCode ?? 'Error' }}</span>
      <h1 class="error__title">{{ error?.statusCode === 404 ? 'This page doesn’t exist.' : 'Something went wrong.' }}</h1>
      <button class="btn btn--primary" @click="clearError({ redirect: '/' })">Back to home</button>
    </main>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
  import type { NuxtError } from '#app'

  defineProps<{ error: NuxtError }>()
</script>

<style scoped>
  .site {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .error {
    flex: 1;
    padding-top: 120px;
    padding-bottom: 120px;
  }

  .error__title {
    font-size: clamp(30px, 5vw, 44px);
    margin-bottom: 28px;
  }

  .error .btn {
    cursor: pointer;
    font-family: inherit;
  }
</style>
