<template>
  <div>
    <!-- Intro -->
    <section class="hero">
      <div class="container">
        <span class="eyebrow">Software Engineer · Founder of Invaincu Ltd · Kigali</span>

        <h1 class="hero__title">
          Hi, I’m Ineza Irene Baghor.<br />
          <span class="hero__accent">I build web products end to end.</span>
        </h1>

        <p class="hero__lead">
          Software engineer at RwBuild and founder of Invaincu Ltd. I work across the stack with Laravel, Vue and Nuxt,
          from APIs and real-time features to interfaces people rely on every day.
        </p>

        <div class="hero__actions">
          <NuxtLink to="/#work" class="btn btn--primary">See my work</NuxtLink>
          <NuxtLink to="/#contact" class="btn btn--ghost">Get in touch</NuxtLink>
        </div>
      </div>
    </section>

    <!-- About -->
    <section id="about" class="section section--soft">
      <div class="container about">
        <div>
          <span class="eyebrow">About</span>
          <h2 class="section-title">From frontend to the whole product</h2>
        </div>

        <div class="about__body">
          <p>
            I have been building for the web since 2017. I started on the frontend, and over the years my work grew to
            cover the whole product: designing APIs, modelling data, wiring real-time updates and shipping the
            interfaces on top.
          </p>
          <p>
            I joined RwBuild, a Kigali-based startup, in November 2019. There I build software that has to work under
            pressure, like the dispatch system behind Rwanda’s 912 emergency line and a job platform that takes people
            from application to hire. Leading the team through RwBuild’s yearly workshop trainings taught me how to
            guide other engineers, not only write code.
          </p>
          <p>
            That experience led me to found Invaincu Ltd in July 2024, a software company focused on fast, robust
            software. Invaincu has since won the revamp of two of Rwanda’s best-known newspaper products, Imvaho Nshya
            and La Nouvelle Relève, under a working contract with Rwanda Printing Company (RPC).
          </p>
        </div>
      </div>
    </section>

    <!-- What I do -->
    <section class="section">
      <div class="container">
        <span class="eyebrow">What I do</span>
        <h2 class="section-title">How I can help</h2>

        <div class="skills">
          <article v-for="skill in skills" :key="skill.title" class="skill">
            <h3 class="skill__title">{{ skill.title }}</h3>
            <p class="skill__text">{{ skill.text }}</p>
            <ul class="tags">
              <li v-for="item in skill.tools" :key="item" class="tag">{{ item }}</li>
            </ul>
          </article>
        </div>

        <p class="flexible">
          <strong>Flexible on stack.</strong> Laravel, Vue and Nuxt are my main tools, but I pick up what a project
          needs, including Flutter for mobile apps.
        </p>
      </div>
    </section>

    <!-- Work -->
    <section id="work" class="section section--soft">
      <div class="container">
        <span class="eyebrow">Selected work</span>
        <h2 class="section-title">Projects</h2>
        <p class="section-lead">Products from Invaincu Ltd and RwBuild. Open one to see what I worked on.</p>

        <div class="projects">
          <ProjectCard v-for="project in projects" :key="project.slug" :project="project" />
        </div>
      </div>
    </section>

    <!-- Experience -->
    <section id="experience" class="section">
      <div class="container">
        <span class="eyebrow">Experience</span>
        <h2 class="section-title">Where I work</h2>

        <div class="job">
          <div class="job__head">
            <div>
              <h3 class="job__role">Founder & CEO</h3>
              <p class="job__company">Invaincu Ltd · Kigali, Rwanda</p>
            </div>
            <span class="job__years">July 2024 – Present</span>
          </div>

          <ul class="job__list">
            <li>Founded a software company focused on fast, robust software for organisations in Rwanda.</li>
            <li>Won the revamp of the whole Imvaho Nshya and La Nouvelle Relève products, and signed a working contract with Rwanda Printing Company (RPC), which manages both newspapers.</li>
            <li>Lead the projects from planning to delivery.</li>
          </ul>
        </div>

        <div class="job">
          <div class="job__head">
            <div>
              <h3 class="job__role">Software Engineer</h3>
              <p class="job__company">RwBuild · Kigali, Rwanda</p>
            </div>
            <span class="job__years">November 2019 – Present</span>
          </div>

          <ul class="job__list">
            <li>Lead the team through the workshop trainings RwBuild runs every year.</li>
            <li>Build and maintain 912Rwanda, the emergency medical dispatch system: call intake, live maps, incidents, patient records, billing and reports.</li>
            <li>Rebuilt the Candidate job platform frontend in Nuxt 4 and TypeScript, with hiring stages, interview scheduling and real-time notifications.</li>
            <li>Work across Laravel APIs and Vue/Nuxt frontends, with real-time updates over Pusher and map features.</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { projects } from '~/data/projects'

  useHead({ title: 'Software Engineer', titleTemplate: 'Ineza Irene Baghor · %s' })

  const skills = [
    {
      title: 'Full-stack web apps',
      text: 'Products built end to end: the API and data model on the server, the interface on top, and everything that connects them.',
      tools: ['Laravel', 'PHP', 'MySQL', 'REST APIs'],
    },
    {
      title: 'Frontend engineering',
      text: 'Fast, accessible interfaces with clear states for loading, empty and error, and forms that guide people through.',
      tools: ['Vue 3', 'Nuxt', 'TypeScript', 'CSS'],
    },
    {
      title: 'Real-time and maps',
      text: 'Live updates that keep every screen current, and map features for locations, routes and units on the move.',
      tools: ['Pusher', 'Mapbox', 'Charts'],
    },
  ]
</script>

<style scoped>
  .hero {
    padding: 120px 0 104px;
    background:
      radial-gradient(60% 60% at 85% 0%, var(--accent-soft), transparent 70%),
      var(--bg);
  }

  .hero__title {
    max-width: 820px;
    font-size: clamp(36px, 6vw, 60px);
    margin-bottom: 24px;
  }

  .hero__accent {
    color: var(--accent);
  }

  .hero__lead {
    max-width: 620px;
    margin-bottom: 36px;
    color: var(--text-muted);
    font-size: 18px;
  }

  .hero__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .about {
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    gap: 48px;
  }

  .about__body {
    display: grid;
    gap: 18px;
    color: var(--text-muted);
    font-size: 17px;
  }

  .skills,
  .projects {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-top: 40px;
  }

  .skill {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 28px;
    border: 1px solid var(--border);
    border-radius: var(--radius);
  }

  .skill__title {
    font-size: 20px;
  }

  .skill__text {
    flex: 1;
    color: var(--text-muted);
  }

  .job {
    margin-top: 32px;
    padding: 32px;
    border: 1px solid var(--border);
    border-radius: var(--radius);
  }

  .job + .job {
    margin-top: 20px;
  }

  .flexible {
    max-width: 720px;
    margin-top: 28px;
    padding: 16px 20px;
    border-left: 3px solid var(--accent);
    background: var(--accent-soft);
    border-radius: 0 10px 10px 0;
    color: var(--text-muted);
  }

  .flexible strong {
    color: var(--text);
  }

  .job__head {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 8px 24px;
    margin-bottom: 20px;
  }

  .job__role {
    font-size: 22px;
  }

  .job__company,
  .job__years {
    color: var(--text-muted);
  }

  .job__years {
    font-weight: 500;
  }

  .job__list {
    display: grid;
    gap: 10px;
    margin: 0;
    padding-left: 20px;
    color: var(--text-muted);
  }

  @media (max-width: 800px) {
    .about {
      grid-template-columns: 1fr;
      gap: 8px;
    }

    .hero {
      padding: 80px 0 72px;
    }

    .section {
      padding: 64px 0;
    }

    .job {
      padding: 22px;
    }
  }
</style>
