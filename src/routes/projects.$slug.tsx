import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { getAdjacentProjects, getProject } from "@/data/projects";
import { Lightbox } from "@/components/lightbox";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ params, loaderData }) => {
    const p = loaderData?.project;
    const title = p ? `${p.title} — Premansh Panigrahi` : "Project — Premansh Panigrahi";
    const desc = p?.tagline ?? "Case study.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/projects/${params.slug}` },
        ...(p ? [{ property: "og:image", content: p.cover }] : []),
      ],
      links: [{ rel: "canonical", href: `/projects/${params.slug}` }],
    };
  },
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <h1 className="font-serif text-5xl">Project not found</h1>
        <Link to="/projects" className="mt-6 inline-flex gold-link text-gold">Back to archive</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <h1 className="font-serif text-3xl">Couldn't load this project.</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      </div>
    </div>
  ),
  component: ProjectPage,
});

function ProjectPage() {
  const { project } = Route.useLoaderData();
  const { prev, next } = getAdjacentProjects(project.slug);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <article className="pt-32 md:pt-40">
      {/* Hero */}
      <header className="px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          <Link to="/projects" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-gold">
            <ArrowLeft className="h-3 w-3" /> Archive
          </Link>
          <h1 className="mt-10 font-serif text-[clamp(2.75rem,8vw,8rem)] leading-[0.95]">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-2xl text-muted-foreground md:text-3xl">
            {project.tagline}
          </p>
          <dl className="mt-16 grid grid-cols-2 gap-8 border-y border-border py-8 md:grid-cols-4">
            <Meta label="Role" value={project.role} />
            <Meta label="Year" value={project.year} />
            <Meta label="Stack" value={project.stack.join(", ")} />
            <Meta label="Status" value="Shipped" />
          </dl>
        </div>
      </header>

      {/* Cover */}
      <div className="mt-16 px-6 md:mt-24 md:px-12">
        <div className="mx-auto max-w-7xl overflow-hidden">
          <img src={project.cover} alt={project.title} className="w-full" />
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-[1fr_2fr] md:gap-24">
          <h2 className="font-serif text-3xl md:text-4xl">Overview</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">{project.overview}</p>
        </div>

        <Section title="The Problem" body={project.problem} />
        <Section title="The Process" body={project.process} />
        <Section title="The Outcome" body={project.outcome} />
      </div>

      {/* Gallery */}
      <div className="bg-muted/40 px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-gold">Gallery</p>
          <h2 className="mb-12 font-serif text-4xl md:text-5xl">Selected frames.</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {project.gallery.map((src: string, i: number) => (
              <Reveal key={src} delay={i * 60}>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className="group block w-full overflow-hidden bg-background"
                >
                  <img
                    src={src}
                    alt={`${project.title} — ${i + 1}`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination */}
      <nav className="grid grid-cols-1 border-y border-border md:grid-cols-2">
        {prev && (
          <Link to="/projects/$slug" params={{ slug: prev.slug }} className="group flex flex-col gap-3 border-b border-border p-10 md:border-b-0 md:border-r md:p-16 hover:bg-muted/40">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <ArrowLeft className="h-3 w-3" /> Previous
            </span>
            <span className="font-serif text-3xl group-hover:text-gold transition-colors">{prev.title}</span>
          </Link>
        )}
        {next && (
          <Link to="/projects/$slug" params={{ slug: next.slug }} className="group flex flex-col items-end gap-3 p-10 md:p-16 hover:bg-muted/40">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Next <ArrowRight className="h-3 w-3" />
            </span>
            <span className="font-serif text-3xl group-hover:text-gold transition-colors">{next.title}</span>
          </Link>
        )}
      </nav>

      <div className="px-6 py-24 text-center md:px-12 md:py-32">
        <a href="/#contact" className="inline-flex items-center gap-3 rounded-full border border-gold px-6 py-3 text-sm text-gold hover:bg-gold hover:text-accent-foreground transition-colors">
          Start a project together <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      <Lightbox
        images={project.gallery}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{label}</dt>
      <dd className="mt-2 text-sm">{value}</dd>
    </div>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-[1fr_2fr] md:gap-24">
      <Reveal>
        <h2 className="font-serif text-3xl md:text-4xl">{title}</h2>
      </Reveal>
      <Reveal delay={80}>
        <p className="text-lg leading-relaxed text-muted-foreground">{body}</p>
      </Reveal>
    </div>
  );
}
