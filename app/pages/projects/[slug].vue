<template>
  <article v-if="project" class="project">
    <div class="container">
      <NuxtLink to="/#work" class="project__back">← All projects</NuxtLink>

      <span class="eyebrow">{{ project.company }} · {{ project.years }}</span>
      <h1 class="project__title">{{ project.name }}</h1>
      <p class="project__tagline">{{ project.tagline }}</p>

      <dl class="project__facts">
        <div>
          <dt>Role</dt>
          <dd>{{ project.role }}</dd>
        </div>
        <div>
          <dt>Company</dt>
          <dd>{{ project.company }}, a Kigali-based startup</dd>
        </div>
        <div>
          <dt>Years</dt>
          <dd>{{ project.years }}</dd>
        </div>
      </dl>

      <ul class="tags">
        <li v-for="item in project.stack" :key="item" class="tag">{{ item }}</li>
      </ul>

      <section class="project__section">
        <h2>Overview</h2>
        <p>{{ project.summary }}</p>
      </section>

      <section class="project__section">
        <h2>What I worked on</h2>
        <ul class="project__list">
          <li v-for="item in project.highlights" :key="item">{{ item }}</li>
        </ul>
      </section>

      <a v-if="project.url" :href="project.url" class="btn btn--primary" target="_blank" rel="noopener">
        Visit {{ project.name }}
      </a>

      <nav v-if="others.length" class="project__more" aria-label="More projects">
        <span class="eyebrow">More work</span>
        <div class="project__others">
          <ProjectCard v-for="other in others" :key="other.slug" :project="other" />
        </div>
      </nav>
    </div>
  </article>
</template>

<script setup lang="ts">
  import { findProject, projects } from '~/data/projects'

  const route = useRoute()

  const project = computed(() => findProject(String(route.params.slug)))

  if (!project.value) {
    throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
  }

  const others = computed(() => projects.filter((item) => item.slug !== project.value?.slug))

  useHead(() => ({ title: project.value?.name ?? 'Project' }))

  useSeoMeta({
    description: () => project.value?.tagline ?? '',
  })
</script>

<style scoped>
  .project {
    padding: 56px 0 96px;
  }

  .project .container {
    max-width: 820px;
  }

  .project__back {
    display: block;
    width: fit-content;
    margin-bottom: 32px;
    color: var(--text-muted);
    font-size: 15px;
    text-decoration: none;
  }

  .project__back:hover {
    color: var(--accent);
  }

  .project__title {
    font-size: clamp(36px, 6vw, 52px);
    margin-bottom: 14px;
  }

  .project__tagline {
    color: var(--text-muted);
    font-size: 19px;
  }

  .project__facts {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px;
    margin: 36px 0 24px;
    padding: 20px 0;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .project__facts dt {
    color: var(--text-muted);
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .project__facts dd {
    margin: 4px 0 0;
    font-weight: 500;
  }

  .project__section {
    margin: 48px 0;
  }

  .project__section h2 {
    font-size: 24px;
    margin-bottom: 14px;
  }

  .project__section p,
  .project__list {
    color: var(--text-muted);
    font-size: 17px;
  }

  .project__list {
    display: grid;
    gap: 12px;
    margin: 0;
    padding-left: 20px;
  }

  .project__more {
    margin-top: 72px;
  }

  .project__others {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 20px;
  }
</style>
