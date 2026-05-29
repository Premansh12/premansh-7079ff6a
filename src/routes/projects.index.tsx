import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Premansh Panigrahi" },
      { name: "description", content: "Selected case studies in design, branding, development, and direction." },
      { property: "og:title", content: "Projects — Premansh Panigrahi" },
      { property: "og:description", content: "Selected case studies in design, branding, development, and direction." },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsHub,
});

function ProjectsHub() {
  return (
    <section className="px-6 pb-24 pt-40 md:px-12 md:pb-32 md:pt-48">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-gold">Projects</p>
        <h1 className="font-serif text-[clamp(2.75rem,7vw,7rem)] leading-[0.95]">
          The <em className="italic">archive</em>.
        </h1>
        <p className="mt-8 max-w-xl text-muted-foreground">
          A working record of the things I've made — branding, products, films, and the
          occasional late-night experiment. Click anything to go deeper.
        </p>

        <div className="mt-20 grid gap-16 md:grid-cols-2 md:gap-20">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 60}>
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
                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    <span>{p.role.split(" · ")[0]}</span>
                    <span>{p.year}</span>
                  </div>
                  <h2 className="mt-3 font-serif text-3xl md:text-4xl">{p.title}</h2>
                  <p className="mt-2 max-w-md text-muted-foreground">{p.tagline}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
