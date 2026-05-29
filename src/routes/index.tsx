import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, ArrowDown, Send, Sparkles } from "lucide-react";
import { HeroCanvas } from "@/components/hero-canvas";
import { Reveal } from "@/components/reveal";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Premansh Panigrahi — Just making cool things with cool people." },
      { name: "description", content: "Web designer, branding expert, developer, video editor, UI/UX specialist, vibe coder, future doctor." },
      { property: "og:title", content: "Premansh Panigrahi — Portfolio" },
      { property: "og:description", content: "Just making cool things with cool people." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const ROLES = [
  { k: "01", t: "Web Designer", d: "Pages composed like editorial spreads — every line of type and field of whitespace deliberate." },
  { k: "02", t: "Branding Expert", d: "Identities built from a single, defensible idea. Wordmarks, tone, and a system that survives contact with the real world." },
  { k: "03", t: "Website Developer", d: "Front-end engineering with a designer's hand. Performance budgets, accessibility, and motion that respects the content." },
  { k: "04", t: "Video Editor", d: "Cuts that breathe. Color that flatters the material. Sound that does half the work." },
  { k: "05", t: "Graphic Designer", d: "Posters, decks, print, social — the supporting cast that makes the headline performance possible." },
  { k: "06", t: "UI/UX Specialist", d: "Products that earn the user's attention by spending it carefully. Research-led, opinionated, calm." },
  { k: "07", t: "Vibe Coder", d: "Prototypes built at the speed of conversation. The right tool for the right hour of the night." },
  { k: "08", t: "Future Doctor", d: "Currently in medical school. Bringing the discipline of clinical thinking back to everything I design." },
];

const CERTS = [
  { issuer: "Google", title: "UX Design Professional Certificate", year: "2024" },
  { issuer: "Meta", title: "Front-End Developer Specialization", year: "2024" },
  { issuer: "Interaction Design Foundation", title: "Design Systems & Brand Identity", year: "2023" },
  { issuer: "Adobe", title: "Certified Professional — Visual Design", year: "2023" },
  { issuer: "freeCodeCamp", title: "Responsive Web Design & JS Algorithms", year: "2022" },
  { issuer: "AIIMS Bhubaneswar", title: "MBBS — In Progress", year: "2023 — 2028" },
];

function Index() {
  return (
    <>
      <Hero />
      <About />
      <Certifications />
      <FeaturedProjects />
      <Contact />
    </>
  );
}

function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden px-6 md:px-12">
      <HeroCanvas />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background" />
      <div className="relative mx-auto w-full max-w-7xl pt-32 md:pt-0">
        <p className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-muted-foreground">
          <Sparkles className="h-3 w-3 text-gold" /> Premansh Panigrahi
        </p>
        <h1 className="font-serif text-[clamp(2.75rem,8vw,8.5rem)] leading-[0.95] tracking-tight">
          Just making <em className="italic text-gold">cool</em> things
          <br />
          with cool people.
        </h1>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Designer, developer, and future doctor — building work that's quiet on the outside,
          ambitious underneath.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link to="/projects" className="group inline-flex items-center gap-3 rounded-full bg-foreground px-6 py-3 text-sm text-background transition-transform hover:-translate-y-0.5">
            View selected work
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm hover:border-gold hover:text-gold transition-colors">
            Start a conversation
          </a>
        </div>
      </div>
      <a href="#about" aria-label="Scroll" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Scroll
        <ArrowDown className="h-4 w-4 animate-bounce text-gold" />
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
            Eight crafts.
            <br /> One <em className="italic">throughline</em>.
          </h2>
          <p className="mt-8 max-w-sm text-muted-foreground">
            I move between disciplines on purpose. The work gets sharper when the
            edges of one craft inform the centre of another.
          </p>
        </div>
        <ol className="space-y-12 md:space-y-16">
          {ROLES.map((r, i) => (
            <Reveal key={r.k} delay={i * 60}>
              <li className="grid grid-cols-[auto_1fr] gap-6 border-t border-border pt-8">
                <span className="font-serif text-2xl text-gold">{r.k}</span>
                <div>
                  <h3 className="font-serif text-3xl md:text-4xl">{r.t}</h3>
                  <p className="mt-3 max-w-xl text-muted-foreground">{r.d}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section id="certifications" className="bg-muted/40 px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex items-end justify-between gap-8">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-gold">Credentials</p>
            <h2 className="font-serif text-5xl leading-[1] md:text-6xl">
              Studied, certified, <em className="italic">curious</em>.
            </h2>
          </div>
        </div>
        <div className="grid gap-px bg-border md:grid-cols-2">
          {CERTS.map((c, i) => (
            <Reveal key={c.title} delay={i * 50}>
              <article className="group relative flex h-full flex-col justify-between gap-8 bg-background p-8 md:p-12 transition-colors hover:bg-card">
                <header className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{c.issuer}</p>
                    <h3 className="mt-3 font-serif text-2xl md:text-3xl">{c.title}</h3>
                  </div>
                  <span className="text-sm text-gold">{c.year}</span>
                </header>
                <div className="hairline" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProjects() {
  const featured = projects.slice(0, 4);
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
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    (e.currentTarget as HTMLFormElement).reset();
    setTimeout(() => setSent(false), 4000);
  };
  return (
    <section id="contact" className="bg-foreground px-6 py-32 text-background md:px-12 md:py-48">
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-[1.2fr_1fr] md:gap-24">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-gold">Contact</p>
          <h2 className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95]">
            Have an idea
            <br /> worth <em className="italic text-gold">obsessing</em> over?
          </h2>
          <p className="mt-8 max-w-md text-background/70">
            I take on a small, deliberate number of projects each year. If yours
            sounds like one of them, write to me — I read every message.
          </p>
          <div className="mt-10 space-y-2 text-sm">
            <a href="mailto:hello@premansh.dev" className="block gold-link">hello@premansh.dev</a>
            <p className="text-background/60">Bhubaneswar / Remote · Available Q3 onward</p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <Field label="Your name" name="name" required />
          <Field label="Email" name="email" type="email" required />
          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-background/60">Tell me about the project</label>
            <textarea
              name="message"
              required
              rows={5}
              className="w-full resize-none border-b border-background/20 bg-transparent py-2 text-background placeholder:text-background/30 focus:border-gold focus:outline-none"
              placeholder="What are we making?"
            />
          </div>
          <button type="submit" className="group inline-flex items-center gap-3 rounded-full bg-gold px-6 py-3 text-sm text-accent-foreground transition-transform hover:-translate-y-0.5">
            {sent ? "Message sent ✓" : "Send message"}
            <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-background/60">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full border-b border-background/20 bg-transparent py-2 text-background placeholder:text-background/30 focus:border-gold focus:outline-none"
      />
    </div>
  );
}
