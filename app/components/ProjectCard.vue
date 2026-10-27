<template>
  <NuxtLink :to="`/projects/${project.slug}`" class="card">
    <div class="card__top">
      <span class="card__company">{{ [project.company, project.years].filter(Boolean).join(' · ') }}</span>
      <span class="card__arrow" aria-hidden="true">→</span>
    </div>

    <h3 class="card__name">{{ project.name }}</h3>
    <p class="card__tagline">{{ project.tagline }}</p>

    <ul v-if="project.stack?.length" class="tags">
      <li v-for="item in project.stack.slice(0, 4)" :key="item" class="tag">{{ item }}</li>
    </ul>
  </NuxtLink>
</template>

<script setup lang="ts">
  import type { Project } from '~/data/projects'

  defineProps<{ project: Project }>()
</script>

<style scoped>
  .card {
    display: flex;
    flex-direction: column;
    gap: 14px;
    height: 100%;
    padding: 28px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    text-decoration: none;
    transition:
      border-color 0.2s,
      transform 0.2s;
  }

  .card:hover {
    border-color: var(--accent);
    transform: translateY(-2px);
  }

  .card__top {
    display: flex;
    justify-content: space-between;
    color: var(--text-muted);
    font-size: 14px;
  }

  .card__arrow {
    color: var(--accent);
    font-size: 18px;
    transition: transform 0.2s;
  }

  .card:hover .card__arrow {
    transform: translateX(4px);
  }

  .card__name {
    font-size: 24px;
  }

  .card__tagline {
    flex: 1;
    color: var(--text-muted);
  }
</style>
