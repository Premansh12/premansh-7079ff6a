export type Project = {
  slug: string;
  title: string;
  tagline: string;
  role: string;
  year: string;
  cover: string;
  stack: string[];
  overview: string;
  problem: string;
  process: string;
  outcome: string;
  gallery: string[];
};

export const projects: Project[] = [
  {
    slug: "lumen-atelier",
    title: "Lumen Atelier",
    tagline: "A full identity rebrand and editorial digital flagship for a Paris-based boutique lighting studio specialising in hand-blown glass.",
    role: "Brand · UI/UX · Web Development",
    year: "2025",
    cover: "https://picsum.photos/seed/lumen-cover/1600/1000",
    stack: ["Figma", "React", "GSAP", "Sanity"],
    overview:
      "A full rebrand and digital flagship for a boutique lighting atelier — translating hand-blown glass craftsmanship into a cinematic editorial web experience.",
    problem:
      "The studio's old site looked like a catalogue. The work deserved a museum. We had to rebuild the brand from the wordmark up while keeping production timelines intact.",
    process:
      "Three weeks of identity exploration, a custom serif lockup, and a modular content system. Every page is a frame: oversized type, restrained motion, and photography that breathes.",
    outcome:
      "412% increase in average session duration. Picked up by Sight Unseen and Dezeen within the first month of launch.",
    gallery: [
      "https://picsum.photos/seed/lumen-1/1400/900",
      "https://picsum.photos/seed/lumen-2/900/1200",
      "https://picsum.photos/seed/lumen-3/1400/900",
      "https://picsum.photos/seed/lumen-4/1400/900",
    ],
  },
  {
    slug: "nocturne-fm",
    title: "Nocturne FM",
    tagline: "After-hours radio platform with live waveform rituals.",
    role: "Product Design · Front-end · Motion",
    year: "2025",
    cover: "https://picsum.photos/seed/nocturne-cover/1600/1000",
    stack: ["Next.js", "WebAudio", "Framer Motion", "Supabase"],
    overview:
      "An independent late-night radio platform built for headphone hours. Live shows, archive crates, and a real-time waveform that pulses to the broadcast.",
    problem:
      "Hosts wanted a home that felt like the show — quiet, intimate, deliberate. Existing streaming UIs felt like dashboards.",
    process:
      "I prototyped the audio engine first. Visuals followed the signal. The interface fades, listens, and gets out of the way.",
    outcome:
      "Launched with 14 resident shows. Crossed 9,000 weekly listeners by month three.",
    gallery: [
      "https://picsum.photos/seed/nocturne-1/1400/900",
      "https://picsum.photos/seed/nocturne-2/1400/900",
      "https://picsum.photos/seed/nocturne-3/900/1200",
    ],
  },
  {
    slug: "salt-and-stone",
    title: "Salt & Stone",
    tagline: "Cinematic brand film for a coastal ceramics house.",
    role: "Direction · Edit · Color",
    year: "2024",
    cover: "https://picsum.photos/seed/salt-cover/1600/1000",
    stack: ["DaVinci Resolve", "Premiere", "After Effects"],
    overview:
      "A two-minute brand film shot over four days on the Konkan coast. Hands, clay, salt air, and the slow theatre of the kiln.",
    problem:
      "Translate a craft that takes weeks into two minutes — without losing the patience that defines it.",
    process:
      "Locked frames. Slow cuts. A score built from the studio's ambient sound. Color graded to match unfired stoneware.",
    outcome:
      "Featured by It's Nice That. Drove a 3-month waitlist on the studio's commission slots.",
    gallery: [
      "https://picsum.photos/seed/salt-1/1400/900",
      "https://picsum.photos/seed/salt-2/1400/900",
      "https://picsum.photos/seed/salt-3/1400/900",
      "https://picsum.photos/seed/salt-4/900/1200",
    ],
  },
  {
    slug: "vitals-dashboard",
    title: "Vitals",
    tagline: "Clinical-grade dashboard for solo medical practices.",
    role: "Product · UI/UX · Front-end",
    year: "2024",
    cover: "https://picsum.photos/seed/vitals-cover/1600/1000",
    stack: ["React", "TypeScript", "D3", "FHIR"],
    overview:
      "A patient-vitals dashboard designed with two practising physicians. Built for one-handed use in clinic, optimised for the three numbers that actually matter.",
    problem:
      "Existing EMRs bury signal under chrome. Doctors were missing trends because the UI made them.",
    process:
      "Shadowed clinics. Cut every non-essential element. Built a focus mode that hides everything except the active patient's trajectory.",
    outcome:
      "Cut average chart-review time from 4m12s to 47s in pilot clinics.",
    gallery: [
      "https://picsum.photos/seed/vitals-1/1400/900",
      "https://picsum.photos/seed/vitals-2/1400/900",
      "https://picsum.photos/seed/vitals-3/1400/900",
    ],
  },
  {
    slug: "maison-noire",
    title: "Maison Noire",
    tagline: "A bespoke Shopify Hydrogen e-commerce flagship for a Lisbon slow-fashion atelier, treating every garment like a published editorial piece.",
    role: "Brand · UI/UX · Shopify Hydrogen",
    year: "2024",
    cover: "https://picsum.photos/seed/maison-cover/1600/1000",
    stack: ["Hydrogen", "Shopify", "GSAP", "Figma"],
    overview:
      "A fully bespoke storefront for a Lisbon-based slow-fashion house. Every page treats a garment like a published piece.",
    problem:
      "The previous Shopify theme flattened the product story. Conversion was healthy, but average order value was capped.",
    process:
      "Editorial PDPs, a lookbook-driven home, and a quietly opinionated checkout. Performance budget held under 90KB JS first paint.",
    outcome:
      "+38% AOV, +22% repeat purchase rate in the first quarter.",
    gallery: [
      "https://picsum.photos/seed/maison-1/1400/900",
      "https://picsum.photos/seed/maison-2/900/1200",
      "https://picsum.photos/seed/maison-3/1400/900",
    ],
  },
  {
    slug: "kintsugi-os",
    title: "Kintsugi OS",
    tagline: "A reflective journaling system for medical students.",
    role: "Founder · Design · Engineering",
    year: "2026",
    cover: "https://picsum.photos/seed/kintsugi-cover/1600/1000",
    stack: ["React", "TanStack Start", "Postgres", "AI Gateway"],
    overview:
      "A personal project — a daily reflection system built for the long, strange shape of medical training. Prompts, mood mapping, and a private AI confidant.",
    problem:
      "Burnout in medical school is not a productivity problem. It's a meaning problem. No tool was treating it that way.",
    process:
      "Designed quietly. Wrote the prompts myself. Built the AI layer to listen, not solve. Currently in closed beta with 60 students across three colleges.",
    outcome:
      "Featured in the AIIMS student wellbeing report, 2026. Launching publicly later this year.",
    gallery: [
      "https://picsum.photos/seed/kintsugi-1/1400/900",
      "https://picsum.photos/seed/kintsugi-2/1400/900",
      "https://picsum.photos/seed/kintsugi-3/900/1200",
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const getAdjacentProjects = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
  };
};
