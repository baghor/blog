<template>
  <NuxtLink v-spotlight :to="`/projects/${project.slug}`" class="card spotlight">
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
    width: 100%;
    height: 100%;
    padding: 28px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    text-decoration: none;
  }

  /* A gradient line sweeps across the top on hover */
  .card::after {
    content: '';
    position: absolute;
    top: -1px;
    left: 24px;
    right: 24px;
    height: 2px;
    border-radius: 2px;
    background: linear-gradient(90deg, var(--accent), var(--indigo));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s var(--ease-out);
  }

  .card:hover::after,
  .card:focus-visible::after {
    transform: scaleX(1);
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
    transition: transform 0.4s var(--spring);
  }

  .card:hover .card__arrow {
    transform: translate(4px, -4px) rotate(-45deg);
  }

  .card__name {
    font-size: 24px;
    transition: color 0.3s ease;
  }

  .card:hover .card__name {
    color: var(--accent);
  }

  .card__tagline {
    flex: 1;
    color: var(--text-muted);
  }
</style>
