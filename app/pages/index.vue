<template>
  <div>
    <!-- Intro -->
    <section class="hero">
      <div class="hero__glow" aria-hidden="true">
        <span class="hero__orb hero__orb--teal"></span>
        <span class="hero__orb hero__orb--indigo"></span>
      </div>

      <div class="container">
        <span v-reveal class="eyebrow">Software Engineer · Founder of Invaincu Ltd · Kigali</span>

        <h1 v-reveal="80" class="hero__title">
          Salut, I’m Ineza Irene Baghor.
          <span class="hero__accent">I build fast, dependable software.</span>
        </h1>

        <p v-reveal="160" class="hero__lead">
          Software engineer at RwBuild and founder of Invaincu Ltd. I design and ship complete products with Laravel,
          Vue and Nuxt, from APIs and real-time systems to the interfaces people rely on every day.
        </p>

        <div v-reveal="240" class="hero__actions">
          <NuxtLink to="/#work" class="btn btn--primary" @click.prevent="goTo('work')">
            View my work
            <span class="btn__arrow" aria-hidden="true">→</span>
          </NuxtLink>
          <NuxtLink to="/#contact" class="btn btn--ghost" @click.prevent="goTo('contact')">Get in touch</NuxtLink>
        </div>

        <dl class="stats">
          <div v-for="(stat, index) in stats" :key="stat.label" v-reveal="320 + index * 90" class="stat">
            <dt class="stat__label">{{ stat.label }}</dt>
            <dd class="stat__value">
              <span :data-count="stat.value">{{ stat.value }}</span>{{ stat.suffix }}
            </dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- About -->
    <section id="about" class="section section--soft">
      <div class="container about">
        <div>
          <span v-reveal class="eyebrow">About</span>
          <h2 v-reveal="80" class="section-title">Engineer, team lead and founder</h2>
        </div>

        <div class="about__body">
          <p v-reveal>
            I have been building for the web since 2017. What began as frontend work grew into ownership of the whole
            product: designing APIs, modelling data, wiring real-time features and shipping interfaces that stay fast
            under real-world use.
          </p>
          <p v-reveal="90">
            I joined RwBuild, a Kigali-based startup, in November 2019 as a frontend developer. Over the years I grew
            into a software engineer, working across the stack on systems that cannot afford to fail, among them the
            dispatch platform behind Rwanda’s 912 emergency line. RwBuild’s yearly workshop trainings shaped much of
            that growth: I lead the frontend team through them, and guiding others has sharpened my own engineering as
            much as theirs.
          </p>
          <p v-reveal="180">
            In July 2024 I founded Invaincu Ltd, a software company built on one promise: fast, robust software. Under
            a working contract with Rwanda Printing Company (RPC), Invaincu is revamping the complete digital products
            of two national newspapers, Imvaho Nshya and La Nouvelle Relève.
          </p>
        </div>
      </div>
    </section>

    <!-- What I do -->
    <section class="section">
      <div class="container">
        <span v-reveal class="eyebrow">What I do</span>
        <h2 v-reveal="80" class="section-title">How I help teams ship</h2>

        <div class="skills">
          <div v-for="(skill, index) in skills" :key="skill.title" v-reveal="index * 90" class="skills__item">
            <article v-spotlight class="skill spotlight">
              <span class="skill__icon" aria-hidden="true">{{ skill.icon }}</span>
              <h3 class="skill__title">{{ skill.title }}</h3>
              <p class="skill__text">{{ skill.text }}</p>
              <ul class="tags">
                <li v-for="item in skill.tools" :key="item" class="tag">{{ item }}</li>
              </ul>
            </article>
          </div>
        </div>

        <p v-reveal class="flexible">
          <strong>Beyond my core stack.</strong> Laravel, Vue and Nuxt are home, but I choose tools for the problem:
          React and Next.js on the web, and Flutter when a product needs a mobile app.
        </p>
      </div>
    </section>

    <!-- Work -->
    <section id="work" class="section section--soft">
      <div class="container">
        <span v-reveal class="eyebrow">Selected work</span>
        <h2 v-reveal="80" class="section-title">Products I’ve built</h2>
        <p v-reveal="160" class="section-lead">
          A selection of products delivered through Invaincu Ltd and RwBuild. Open any project for the details of my
          role.
        </p>

        <div class="projects">
          <div v-for="(project, index) in projects" :key="project.slug" v-reveal="(index % 2) * 110" class="projects__item">
            <ProjectCard :project="project" />
          </div>
        </div>
      </div>
    </section>

    <!-- Experience -->
    <section id="experience" class="section">
      <div class="container">
        <span v-reveal class="eyebrow">Experience</span>
        <h2 v-reveal="80" class="section-title">Career so far</h2>

        <ol v-reveal class="timeline">
          <li v-for="(job, index) in jobs" :key="job.company" v-reveal="index * 120" class="timeline__item">
            <span class="timeline__dot" aria-hidden="true"></span>

            <article v-spotlight class="job spotlight">
              <div class="job__head">
                <div>
                  <h3 class="job__role">{{ job.role }}</h3>
                  <p class="job__company">{{ job.company }} · Kigali, Rwanda</p>
                </div>
                <span class="job__years">{{ job.years }}</span>
              </div>

              <ul class="job__list">
                <li v-for="item in job.points" :key="item">{{ item }}</li>
              </ul>
            </article>
          </li>
        </ol>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { projects } from '~/data/projects'

  useHead({ title: 'Software Engineer', titleTemplate: 'Ineza Irene Baghor · %s' })

  const goTo = useGoToSection()

  // Worked out from the dates, so they stay right on every rebuild
  const now = new Date()
  const monthsAtRwBuild = (now.getFullYear() - 2019) * 12 + now.getMonth() - 10

  const stats = [
    { value: now.getFullYear() - 2017, suffix: '+', label: 'Years building for the web' },
    { value: Math.floor(monthsAtRwBuild / 12), suffix: '+', label: 'Years engineering at RwBuild' },
    { value: 2, suffix: '', label: 'National newspapers being rebuilt' },
  ]

  const skills = [
    {
      icon: '◆',
      title: 'Full-stack products',
      text: 'End-to-end ownership: API design and data modelling on the server, a polished interface on top, and the integrations that tie them together.',
      tools: ['Laravel', 'PHP', 'MySQL', 'REST APIs'],
    },
    {
      icon: '◐',
      title: 'Frontend architecture',
      text: 'Fast, accessible interfaces with considered loading, empty and error states, and forms that guide people to the finish.',
      tools: ['VueJs 3', 'React JS', 'Nuxt', 'Next.js', 'TypeScript'],
    },
    {
      icon: '◎',
      title: 'Real-time systems & maps',
      text: 'Live data that keeps every screen current, and mapping for locations, routes and units in motion, proven in emergency dispatch.',
      tools: ['Pusher', 'Mapbox', 'Charts'],
    },
    {
      icon: '✦',
      title: 'Technical leadership',
      text: 'Taking projects from scoping to launch, and leading the frontend team through RwBuild’s yearly workshop trainings.',
      tools: ['Planning', 'Code review', 'Training'],
    },
  ]

  const jobs = [
    {
      role: 'Founder & CEO',
      company: 'Invaincu Ltd',
      years: 'July 2024 – Present',
      points: [
        'Founded and lead a software company delivering fast, robust products for organisations in Rwanda.',
        'Secured a working contract with Rwanda Printing Company (RPC) to revamp the complete digital products of Imvaho Nshya and La Nouvelle Relève.',
        'Own delivery end to end, from scoping and architecture (Next.js, TypeScript and a Laravel API) to launch.',
      ],
    },
    {
      role: 'Software Engineer',
      company: 'RwBuild',
      years: 'November 2019 – Present',
      points: [
        'Joined as a frontend developer and grew into a software engineer, taking on APIs, data and architecture alongside the interface.',
        'Lead the frontend team through RwBuild’s yearly workshop trainings, which have shaped my own growth as an engineer too.',
        'Build and maintain 912Rwanda, the emergency medical dispatch platform: call intake, live dispatch maps, incident tracking, patient records, billing and analytics.',
        'Rebuilt the Candidate job platform frontend in Nuxt 4 and TypeScript, adding hiring pipelines, interview scheduling and real-time notifications.',
        'Deliver across the stack: Laravel APIs, Vue and Nuxt frontends, real-time updates over Pusher and map-based features.',
      ],
    },
  ]
</script>

<style scoped>
  .hero {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    padding: 132px 0 96px;
  }

  /* Two soft lights drifting behind the intro; they also give the glass navbar something to blur */
  .hero__glow {
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
  }

  .hero__orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(70px);
    opacity: 0.55;
    animation: drift 18s ease-in-out infinite alternate;
  }

  .hero__orb--teal {
    top: -120px;
    right: -60px;
    width: 460px;
    height: 460px;
    background: color-mix(in srgb, var(--accent) 35%, transparent);
  }

  .hero__orb--indigo {
    top: 120px;
    right: 260px;
    width: 320px;
    height: 320px;
    background: color-mix(in srgb, var(--indigo) 22%, transparent);
    animation-duration: 22s;
    animation-direction: alternate-reverse;
  }

  @keyframes drift {
    from {
      transform: translate(0, 0) scale(1);
    }

    to {
      transform: translate(-80px, 60px) scale(1.15);
    }
  }

  .hero__title {
    max-width: 1000px;
    font-size: clamp(36px, 6vw, 62px);
    margin-bottom: 24px;
  }

  .hero__accent {
    display: block;
    background: linear-gradient(90deg, var(--accent), var(--indigo));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-wrap: balance;
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

  .btn__arrow {
    transition: transform 0.3s var(--spring);
  }

  .btn:hover .btn__arrow {
    transform: translateX(4px);
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
    max-width: 720px;
    margin: 64px 0 0;
    padding-top: 28px;
    border-top: 1px solid var(--border);
  }

  .stat {
    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-end;
    gap: 6px;
  }

  .stat__value {
    margin: 0;
    font-family: var(--font-heading);
    font-size: clamp(30px, 4vw, 40px);
    font-weight: 700;
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }

  .stat__label {
    color: var(--text-muted);
    font-size: 14px;
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

  /* Two across: four in a row left each card too narrow */
  .skills {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
    margin-top: 40px;
  }

  .projects {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-top: 40px;
  }

  .skills__item,
  .projects__item {
    display: flex;
  }

  .skill {
    display: flex;
    flex-direction: column;
    gap: 14px;
    width: 100%;
    padding: 32px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
  }

  .skill__icon {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: var(--accent-soft);
    color: var(--accent);
    font-size: 18px;
    transition: transform 0.5s var(--spring);
  }

  .skill:hover .skill__icon {
    transform: rotate(-12deg) scale(1.12);
  }

  .skill__title {
    font-size: 20px;
  }

  .skill__text {
    flex: 1;
    color: var(--text-muted);
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

  /* Experience as a timeline: the line draws down as it scrolls in */
  .timeline {
    position: relative;
    display: grid;
    gap: 20px;
    margin: 40px 0 0;
    padding: 0 0 0 36px;
    list-style: none;
  }

  /* The list itself only draws its line; its items do the rising */
  .js .timeline[data-reveal]:not([data-in]) {
    opacity: 1;
    translate: none;
    scale: none;
    filter: none;
  }

  .timeline::before {
    content: '';
    position: absolute;
    top: 8px;
    bottom: 8px;
    left: 7px;
    width: 2px;
    border-radius: 2px;
    background: linear-gradient(var(--accent), var(--indigo), transparent);
    transform-origin: top;
    transition: transform 1.4s var(--ease-out) 0.2s;
  }

  .js .timeline:not([data-in])::before {
    transform: scaleY(0);
  }

  .timeline__item {
    position: relative;
  }

  .timeline__dot {
    position: absolute;
    top: 36px;
    left: -36px;
    width: 16px;
    height: 16px;
    border: 3px solid var(--accent);
    border-radius: 50%;
    background: var(--bg);
    box-shadow: 0 0 0 6px var(--accent-soft);
    transition: scale 0.6s var(--spring) calc(var(--reveal-delay, 0ms) + 300ms);
  }

  .js .timeline__item:not([data-in]) .timeline__dot {
    scale: 0;
  }

  .job {
    padding: 32px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
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

  .job__company {
    color: var(--text-muted);
  }

  .job__years {
    align-self: flex-start;
    padding: 4px 12px;
    border-radius: 999px;
    background: var(--accent-soft);
    color: var(--accent-strong);
    font-size: 14px;
    font-weight: 600;
  }

  .job__list {
    display: grid;
    gap: 10px;
    margin: 0;
    padding-left: 20px;
    color: var(--text-muted);
  }

  .job__list li::marker {
    color: var(--accent);
  }

  @media (max-width: 800px) {
    .about {
      grid-template-columns: 1fr;
      gap: 8px;
    }

    .hero {
      padding: 96px 0 72px;
    }

    .section {
      padding: 64px 0;
    }

    .job {
      padding: 22px;
    }

    .timeline {
      padding-left: 28px;
    }

    .timeline::before {
      left: 5px;
    }

    .timeline__dot {
      top: 28px;
      left: -28px;
      width: 12px;
      height: 12px;
      border-width: 2px;
    }
  }

  @media (max-width: 640px) {
    .skills {
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .skill {
      padding: 24px;
    }
  }

  @media (max-width: 560px) {
    .stats {
      grid-template-columns: 1fr;
      gap: 18px;
    }

    .stat {
      flex-direction: row-reverse;
      justify-content: flex-end;
      align-items: baseline;
      gap: 12px;
    }

    .stat__value {
      min-width: 56px;
    }

    .hero__orb--teal {
      width: 300px;
      height: 300px;
    }

    .hero__orb--indigo {
      right: 40px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero__orb {
      animation: none;
    }
  }
</style>
