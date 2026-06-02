import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import {
  ArrowUpRight,
  ArrowDown,
  Award,
  ExternalLink,
  Download,
  Linkedin,
  Github,
  Twitter,
  Instagram,
  Mail,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SkillCard } from "@/components/skill-card";
import { SkillPanel } from "@/components/skill-panel";
import { SKILL_ROLES } from "@/data/skill-roles";
import heroPortrait from "@/assets/premansh-hero.png";
import { listProjects } from "@/lib/projects.functions";
import { listFeaturedPhotos } from "@/lib/photos.functions";
import { PhotoSurfer } from "@/components/photo-surfer";
import {
  EMAIL,
  MAILTO,
  LOCATION_CONTACT,
  SOCIALS,
  type SocialKey,
} from "@/data/contact";

const SOCIAL_ICONS: Record<SocialKey, typeof Linkedin> = {
  linkedin: Linkedin,
  github: Github,
  x: Twitter,
  instagram: Instagram,
};

const AVAILABILITY = [
  "Design Projects",
  "Branding Collaborations",
  "UI/UX Consulting",
  "Creative Experiments",
  "Research & Innovation Discussions",
];

const featuredProjectsQueryOptions = queryOptions({
  queryKey: ["projects", "list"],
  queryFn: () => listProjects(),
});

const featuredPhotosQueryOptions = queryOptions({
  queryKey: ["photos", "featured"],
  queryFn: () => listFeaturedPhotos({ data: { limit: 8 } }),
});


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Premansh Panigrahi — Designer & Developer" },
      { name: "description", content: "Portfolio of Premansh Panigrahi — web designer, branding expert, developer, video editor, UI/UX specialist, vibe coder, and future doctor." },
      { property: "og:title", content: "Premansh Panigrahi — Designer & Developer" },
      { property: "og:description", content: "Just making cool things with cool people — design, branding, development, and direction by Premansh Panigrahi." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(featuredProjectsQueryOptions),
      context.queryClient.ensureQueryData(featuredPhotosQueryOptions),
    ]);
  },
  errorComponent: () => (
    <div className="grid min-h-[60vh] place-items-center px-6 text-center">
      <p className="text-muted-foreground">Something went wrong. Please try again later.</p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="grid min-h-[60vh] place-items-center px-6 text-center">
      <p className="text-muted-foreground">Page not found.</p>
    </div>
  ),
  component: Index,
});


// ------------------------------------------------------------
// Certifications — chronological journey, rendered as a
// vertical timeline. Date ↘ title ↘ issuer ↘ thumbnail ↘ CTAs.
// ------------------------------------------------------------
type Cert = {
  date: string;
  title: string;
  issuer: string;
  thumbnail: string;
  viewUrl?: string;
  downloadUrl?: string;
};
const CERTS: Cert[] = [
  {
    date: "2024",
    title: "UX Design Professional Certificate",
    issuer: "Google",
    thumbnail: "https://placehold.co/600x400/1a1a1a/d4a843?text=Google+UX&font=playfair",
    viewUrl: "#",
    downloadUrl: "#",
  },
  {
    date: "2024",
    title: "Front-End Developer Specialization",
    issuer: "Meta",
    thumbnail: "https://placehold.co/600x400/0b0b0b/d4a843?text=Meta+FE&font=playfair",
    viewUrl: "#",
    downloadUrl: "#",
  },
  {
    date: "2023",
    title: "Design Systems & Brand Identity",
    issuer: "Interaction Design Foundation",
    thumbnail: "https://placehold.co/600x400/1f1a14/d4a843?text=IDF&font=playfair",
    viewUrl: "#",
    downloadUrl: "#",
  },
  {
    date: "2023",
    title: "Certified Professional — Visual Design",
    issuer: "Adobe",
    thumbnail: "https://placehold.co/600x400/120c0c/d4a843?text=Adobe&font=playfair",
    viewUrl: "#",
    downloadUrl: "#",
  },
  {
    date: "2022",
    title: "Responsive Web Design & JS Algorithms",
    issuer: "freeCodeCamp",
    thumbnail: "https://placehold.co/600x400/0c1612/d4a843?text=freeCodeCamp&font=playfair",
    viewUrl: "#",
    downloadUrl: "#",
  },
  {
    date: "Dec 2024 — Present",
    title: "MBBS — Current Medical Student",
    issuer: "IIMSAR, Haldia",
    thumbnail: "https://placehold.co/600x400/0b0b0b/d4a843?text=IIMSAR&font=playfair",
  },

];


function Index() {
  return (
    <>
      <Hero />
      <About />
      <Skills />

      <FeaturedProjects />
      <FeaturedFrames />
      <Certifications />
      <Contact />
    </>
  );
}


function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#050505] text-[#F5F5F5]"
    >
      {/* Portrait as full background */}
      <img
        src={heroPortrait}
        alt="Premansh Panigrahi portrait"
        className="absolute inset-0 h-full w-full object-cover object-center animate-[heroFade_1.6s_ease-out_both]"
        loading="eager"
        fetchPriority="high"
      />

      {/* Cinematic overlays */}
      <div className="pointer-events-none absolute inset-0 bg-black/45" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/10" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
      <div className="pointer-events-none absolute left-[5%] top-1/2 h-[60vh] w-[60vh] -translate-y-1/2 rounded-full bg-[#D4A54A]/10 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-screen [background:radial-gradient(1px_1px_at_20%_30%,#fff,transparent_60%),radial-gradient(1px_1px_at_70%_60%,#fff,transparent_60%),radial-gradient(1.5px_1.5px_at_85%_20%,#D4A54A,transparent_60%),radial-gradient(1px_1px_at_40%_80%,#fff,transparent_60%),radial-gradient(1px_1px_at_55%_15%,#D4A54A,transparent_60%)]" />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 px-6 pt-32 md:grid-cols-12 md:px-12 md:pt-0">
        <div className="md:col-span-7 md:col-start-1 md:pr-6">
          <p className="mb-6 text-[11px] uppercase tracking-[0.45em] text-[#D4A54A] animate-[fadeUp_900ms_ease-out_300ms_both]">
            Premansh Panigrahi
          </p>
          <h1 className="font-serif font-light text-[clamp(2.75rem,7.5vw,7rem)] leading-[0.98] tracking-tight text-[#F5F5F5]">
            <span className="sr-only">Premansh Panigrahi — </span>
            <span className="inline-block animate-[fadeUp_900ms_ease-out_500ms_both]">Just</span>{" "}
            <span className="inline-block animate-[fadeUp_900ms_ease-out_600ms_both]">making</span>{" "}
            <span className="inline-block italic text-[#D4A54A] animate-[fadeUp_900ms_ease-out_700ms_both]">cool</span>{" "}
            <span className="inline-block animate-[fadeUp_900ms_ease-out_800ms_both]">things</span>
            <br />
            <span className="inline-block animate-[fadeUp_900ms_ease-out_900ms_both]">with</span>{" "}
            <span className="inline-block italic text-[#D4A54A] animate-[fadeUp_900ms_ease-out_1000ms_both]">cool</span>{" "}
            <span className="inline-block animate-[fadeUp_900ms_ease-out_1100ms_both]">people.</span>
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-[#D8D8D8] md:text-lg animate-[fadeUp_900ms_ease-out_1300ms_both]">
            Designer, developer, and future doctor — building work that's quiet on the outside,
            ambitious underneath.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4 animate-[fadeUp_900ms_ease-out_1500ms_both]">
            <Link
              to="/projects"
              className="group inline-flex items-center gap-3 rounded-full bg-[#F5F5F5] px-7 py-3.5 text-sm font-medium text-[#0B0B0B] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_0_40px_-8px_rgba(212,165,74,0.65)]"
            >
              View Selected Work
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-[#F5F5F5]/25 bg-white/[0.03] px-7 py-3.5 text-sm text-[#F5F5F5] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D4A54A] hover:text-[#D4A54A] hover:shadow-[0_0_30px_-10px_rgba(212,165,74,0.5)]"
            >
              Start a Conversation
            </a>
          </div>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 rounded-md text-[10px] uppercase tracking-[0.4em] text-[#D8D8D8]/70 animate-[fadeUp_900ms_ease-out_1800ms_both] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Scroll
        <ArrowDown className="h-4 w-4 animate-bounce text-[#D4A54A]" />
      </a>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-[1fr_2fr] md:gap-24">
        <div className="md:sticky md:top-32 self-start">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-gold">About</p>
          <h2 className="font-serif text-5xl leading-[1] md:text-6xl">
            A practice between <em className="italic">crafts</em>.
          </h2>
        </div>
        <div className="space-y-8 text-lg leading-relaxed text-muted-foreground">
          <Reveal>
            <p>
              I'm Premansh — a designer, developer, and medical student building work
              at the intersection of editorial restraint and modern engineering. I
              move between disciplines on purpose; the work gets sharper when the
              edges of one craft inform the centre of another.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <p>
              Most weeks I'm rotating through brand systems, product UI, motion,
              and the occasional clinical rotation. The throughline is the same:
              quiet on the outside, ambitious underneath.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// Skills section — cinematic editorial role cards. Two-column
// grid; each card click-expands an editorial detail layer
// (expertise, tools, selected work, highlights).
// ------------------------------------------------------------
function Skills() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const activeRole = SKILL_ROLES.find((r) => r.slug === activeSlug) ?? null;
  return (
    <section id="skills" className="bg-muted/40 px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-gold">Skills & Curiosities</p>
            <h2 className="font-serif text-5xl leading-[1] md:text-6xl">
              Eleven hats, <em className="italic">one wardrobe</em>.
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            A collection of visual identities — the roles I keep cycling
            through. Open any card to step inside the practice.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {SKILL_ROLES.map((role, i) => (
            <Reveal key={role.slug} delay={i * 20}>

              <SkillCard
                role={role}
                total={SKILL_ROLES.length}
                onOpen={() => setActiveSlug(role.slug)}
              />
            </Reveal>
          ))}
        </div>

        <SkillPanel
          role={activeRole}
          total={SKILL_ROLES.length}
          open={!!activeSlug}
          onOpenChange={(o: boolean) => !o && setActiveSlug(null)}
        />
      </div>
    </section>
  );
}



function FeaturedProjects() {
  const { data: allProjects } = useSuspenseQuery(featuredProjectsQueryOptions);
  const featured = allProjects.slice(0, 4);
  return (
    <section id="work" className="px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-gold">Selected Work</p>
            <h2 className="font-serif text-5xl leading-[1] md:text-6xl">
              Recent <em className="italic">case studies</em>.
            </h2>
          </div>
          <Link to="/projects" className="gold-link text-sm text-muted-foreground hover:text-foreground">
            View all projects →
          </Link>
        </div>

        {featured.length === 0 ? (
          <div className="border-y border-border py-20 text-center md:py-28">
            <p className="text-xs uppercase tracking-[0.4em] text-gold">In production</p>
            <h3 className="mt-6 font-serif text-3xl md:text-4xl">
              New case studies are being prepared.
            </h3>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground">
              Polished write-ups land here as they ship. Want an early look?
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-3 rounded-full border border-gold px-6 py-3 text-sm text-gold transition-colors hover:bg-gold hover:text-accent-foreground"
            >
              Get in touch <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        ) : (
          <div className="grid gap-16 md:grid-cols-2 md:gap-20">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <Link to="/projects/$slug" params={{ slug: p.slug }} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={p.cover}
                      alt={p.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-background/90 text-foreground opacity-0 transition-opacity group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="mt-6 flex items-end justify-between gap-6">
                    <div>
                      <h3 className="font-serif text-3xl md:text-4xl">{p.title}</h3>
                      <p className="mt-2 max-w-md text-muted-foreground">{p.tagline}</p>
                    </div>
                    <span className="shrink-0 text-xs uppercase tracking-[0.3em] text-muted-foreground">{p.year}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// Featured Frames — a compact photo-surfer strip on the home
// page that previews the photography journal. Pulls only
// featured = true rows from Supabase.
// ------------------------------------------------------------
function FeaturedFrames() {
  const { data: frames } = useSuspenseQuery(featuredPhotosQueryOptions);
  if (frames.length === 0) return null;
  return (
    <section id="frames" className="bg-[#fbf9f4] py-32 text-[#222] md:py-44">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-gold">
              Featured Frames
            </p>
            <h2 className="font-serif text-5xl leading-[1] text-[#1a1a1a] md:text-6xl">
              From the <em className="italic">journal</em>.
            </h2>
          </div>
          <Link
            to="/album"
            className="gold-link text-sm text-[#555] hover:text-[#1a1a1a]"
          >
            Explore Photography Journal →
          </Link>
        </div>
      </div>
      <PhotoSurfer photos={frames} variant="compact" />
    </section>
  );
}


// ------------------------------------------------------------
// Certifications — vertical timeline. Center spine on desktop,
// left rail on mobile. Each entry reveals on scroll with a
// thumbnail, issuer, date, and view/download CTAs.
// ------------------------------------------------------------
function Certifications() {
  return (
    <section id="certifications" className="bg-muted/40 px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto max-w-6xl">
        <div className="mb-20 text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-gold">The Journey</p>
          <h2 className="font-serif text-5xl leading-[1] md:text-6xl">
            Studied, certified, <em className="italic">curious</em>.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
            A chronological record of the courses, certifications, and ongoing
            training that shape the work.
          </p>
        </div>

        <ol className="relative">
          {/* Spine — left on mobile, center on desktop */}
          <span
            aria-hidden
            className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-gold/0 via-gold/40 to-gold/0 md:left-1/2 md:-translate-x-1/2"
          />
          {CERTS.map((c, i) => {
            const onRight = i % 2 === 1;
            return (
              <li key={c.title + i} className="relative pl-12 md:pl-0 md:pb-20">
                {/* Node dot */}
                <span
                  aria-hidden
                  className="absolute left-4 top-2 grid h-3 w-3 -translate-x-1/2 place-items-center rounded-full bg-gold shadow-[0_0_0_4px_hsl(var(--background))] md:left-1/2"
                />
                <div
                  className={[
                    "md:grid md:grid-cols-2 md:gap-12",
                    onRight ? "md:[&>*:first-child]:col-start-2 md:[&>*:first-child]:pl-12" : "md:[&>*:first-child]:text-right md:[&>*:first-child]:pr-12",
                  ].join(" ")}
                >
                  <Reveal delay={i * 60}>
                    <article className="group rounded-2xl border border-border bg-background p-6 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_25px_60px_-30px_rgba(212,168,67,0.4)] md:p-8">
                      <div className={`flex items-center gap-3 ${onRight ? "" : "md:justify-end"}`}>
                        <Award className="h-4 w-4 text-gold" />
                        <span className="text-xs uppercase tracking-[0.3em] text-gold">{c.date}</span>
                      </div>
                      <h3 className="mt-4 font-serif text-2xl leading-tight md:text-3xl">{c.title}</h3>
                      <p className="mt-2 text-sm uppercase tracking-[0.25em] text-muted-foreground">
                        {c.issuer}
                      </p>

                      <div className="mt-6 overflow-hidden rounded-lg border border-border bg-muted/40">
                        <img
                          src={c.thumbnail}
                          alt={`${c.title} certificate preview`}
                          loading="lazy"
                          className="h-40 w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-48"
                        />
                      </div>

                      {(c.viewUrl || c.downloadUrl) && (
                        <div className={`mt-6 flex flex-wrap gap-3 ${onRight ? "" : "md:justify-end"}`}>
                          {c.viewUrl && (
                            <a
                              href={c.viewUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:border-gold hover:text-gold"
                            >
                              View <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                          {c.downloadUrl && (
                            <a
                              href={c.downloadUrl}
                              download
                              className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs uppercase tracking-[0.2em] text-background transition-colors hover:bg-gold hover:text-accent-foreground"
                            >
                              Download <Download className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      )}
                    </article>
                  </Reveal>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-foreground px-6 py-32 text-background md:px-12 md:py-48"
    >
      {/* subtle gold ambient */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-gold/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-6 text-xs uppercase tracking-[0.4em] text-gold">— Contact</p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="font-serif text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.95] tracking-tight">
            Let's Build Something
            <br />
            <em className="italic text-gold">Together</em>.
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-10 max-w-2xl text-base text-background/70 md:text-lg">
            Whether it's design, branding, product experiences, creative
            experiments, research, or ambitious ideas — I'm always open to
            meaningful conversations and interesting collaborations.
          </p>
        </Reveal>

        {/* Availability */}
        <Reveal delay={300}>
          <div className="mt-20 border-t border-background/10 pt-12">
            <p className="text-[10px] uppercase tracking-[0.4em] text-background/50">
              Currently Open For
            </p>
            <ul className="mt-6 flex flex-wrap gap-3">
              {AVAILABILITY.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-gold/40 px-4 py-2 text-xs uppercase tracking-[0.18em] text-background/85 transition-colors hover:border-gold hover:bg-gold/10 hover:text-gold"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Social directory + email CTA */}
        <div className="mt-20 grid gap-16 border-t border-background/10 pt-12 md:grid-cols-[1.1fr_1fr] md:gap-20">
          <Reveal delay={350}>
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-background/50">
                Find Me Elsewhere
              </p>
              <ul className="mt-8 divide-y divide-background/10">
                {SOCIALS.map((s) => {
                  const Icon = SOCIAL_ICONS[s.key];
                  return (
                    <li key={s.key}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center justify-between gap-6 py-5 transition-colors hover:text-gold"
                      >
                        <span className="flex items-center gap-4">
                          <Icon className="h-4 w-4 text-gold" />
                          <span className="font-serif text-2xl md:text-3xl">{s.label}</span>
                        </span>
                        <span className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-background/50 transition-colors group-hover:text-gold">
                          {s.handle}
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </span>
                      </a>
                    </li>
                  );
                })}
                <li>
                  <a
                    href={MAILTO}
                    className="group flex items-center justify-between gap-6 py-5 transition-colors hover:text-gold"
                  >
                    <span className="flex items-center gap-4">
                      <Mail className="h-4 w-4 text-gold" />
                      <span className="font-serif text-2xl md:text-3xl">Email</span>
                    </span>
                    <span className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-background/50 transition-colors group-hover:text-gold">
                      {EMAIL}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={420}>
            <div className="flex h-full flex-col justify-between gap-12">
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-background/50">
                  Write to me
                </p>
                <p className="mt-6 font-serif text-3xl leading-tight md:text-4xl">
                  I read every message — and reply to the ones worth obsessing over.
                </p>
              </div>
              <div>
                <a
                  href={MAILTO}
                  className="group inline-flex items-center gap-4 rounded-full bg-gold px-7 py-4 text-sm uppercase tracking-[0.2em] text-accent-foreground transition-transform hover:-translate-y-0.5"
                >
                  {EMAIL}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <p className="mt-6 text-xs uppercase tracking-[0.3em] text-background/50">
                  {LOCATION_CONTACT}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

