/*
 * Projects shown on the home page and on /projects/<slug>.
 * To add one, copy an entry: it shows up in the list and gets its own page.
 */
export interface Project {
  slug: string
  name: string
  // One line for the card
  tagline: string
  company: string
  // Shown with the company, e.g. "Invaincu Ltd · 2024 – Present"
  years?: string
  role: string
  stack?: string[]
  summary: string
  highlights: string[]
  // Public address, when the product has one
  url?: string
}

export const projects: Project[] = [
  {
    slug: 'imvaho-nshya',
    name: 'Imvaho Nshya',
    tagline: 'Revamping the digital product of Imvaho Nshya, one of Rwanda’s best-known newspapers.',
    company: 'Invaincu Ltd',
    role: 'Founder & CEO',
    stack: ['Next.js', 'React', 'TypeScript', 'Laravel'],
    summary:
      'Invaincu Ltd won the opportunity to revamp the whole Imvaho Nshya product and signed a working contract with Rwanda Printing Company (RPC), the organisation that manages the newspaper.',
    highlights: [
      'Won the revamp of the full Imvaho Nshya product, under a working contract with Rwanda Printing Company (RPC).',
      'Lead the project for Invaincu Ltd, from planning the new product to delivering it.',
      'A Next.js and TypeScript frontend on a Laravel API.',
      'Focus on what Invaincu stands for: a fast, robust platform that readers and the newsroom can rely on.',
    ],
    url: 'https://imvahonshya.co.rw/',
  },
  {
    slug: 'la-nouvelle-releve',
    name: 'La Nouvelle Relève',
    tagline: 'Revamping the digital product of La Nouvelle Relève, Rwanda’s French-language newspaper.',
    company: 'Invaincu Ltd',
    role: 'Founder & CEO',
    stack: ['Next.js', 'React', 'TypeScript', 'Laravel'],
    summary:
      'Alongside Imvaho Nshya, Invaincu Ltd is revamping the whole La Nouvelle Relève product, under the same working contract with Rwanda Printing Company (RPC).',
    highlights: [
      'Won the revamp of the full La Nouvelle Relève product, under a working contract with Rwanda Printing Company (RPC).',
      'Lead the project for Invaincu Ltd, from planning the new product to delivering it.',
      'A Next.js and TypeScript frontend on a Laravel API.',
      'Focus on a fast, robust platform that readers and the newsroom can rely on.',
    ],
    url: 'https://lanouvellereleve.co.rw/',
  },
  {
    slug: '912rwanda',
    name: '912Rwanda',
    tagline: 'Emergency medical dispatch for Rwanda’s 912 ambulance service.',
    company: 'RwBuild',
    years: '2022 – 2026',
    role: 'Software engineer',
    stack: ['Laravel', 'Vue 3', 'Vuex', 'Pusher', 'Maps', 'ApexCharts'],
    summary:
      'The system dispatchers use to take emergency calls, send ambulances and follow each incident until the patient is handed over. I worked across the call flow, the live map, patient records, billing and reporting.',
    highlights: [
      'Redesigned the new-call flow so dispatchers capture urgency, location and patient details in fewer steps.',
      'Built the live dispatch map: ambulance units and incidents as clustered markers, collision handling and proximity search, updated in real time over Pusher.',
      'Added the incident timeline, active incidents and transfers, and the patient handoff between crews and hospitals.',
      'Built patient demographics and extra details, and the billing and insurance flow with invoice preview.',
      'Built analytics and reports with stacked charts, and sped up loading by lazy-loading heavy guideline data and components.',
    ],
  },
  {
    slug: 'candidate',
    name: 'Candidate',
    tagline: 'A job platform connecting job seekers with employers, from application to hire.',
    company: 'RwBuild',
    years: '2026',
    role: 'Software engineer',
    stack: ['Nuxt 4', 'Vue 3', 'TypeScript', 'Ant Design Vue', 'Pusher', 'Mapbox'],
    summary:
      'Rebuilt the Candidate frontend in Nuxt 4 on top of the Laravel API: job seekers find and apply for jobs and book interviews; employers post jobs and move applicants through hiring; admins review jobs and organisations.',
    highlights: [
      'Built the hiring pipeline: applicants move through stages, with notes and decisions the job seeker sees.',
      'Built interview scheduling: employers open time slots, job seekers pick one, with clear messages when booking is paused or full.',
      'Added real-time notifications over Pusher that open the exact job, application or admin review they refer to.',
      'Built job posting and organisation forms with inline help, and interview locations picked on a Mapbox map.',
      'Built the admin side: reviewing posted jobs and employer applications, with live counts.',
    ],
  },
]

export const findProject = (slug: string) => projects.find((project) => project.slug === slug)
