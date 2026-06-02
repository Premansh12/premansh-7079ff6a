import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import { getProjectDetail } from "@/lib/projects.functions";
import type { Project } from "@/lib/projects.types";
import { Lightbox } from "@/components/lightbox";
import { Reveal } from "@/components/reveal";

// ============================================================
// Reusable Project Detail Template
// ------------------------------------------------------------
// Data-driven from Supabase via getProjectDetail (server fn).
// Adding a new row in the projects table produces a fully
// styled case study with zero template changes.
// ============================================================

const projectDetailQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ["projects", "detail", slug],
    queryFn: () => getProjectDetail({ data: { slug } }),
  });

export const Route = createFileRoute("/projects/$slug")({
  loader: async ({ params, context }) => {
    const detail = await context.queryClient.ensureQueryData(
      projectDetailQueryOptions(params.slug),
    );
    if (!detail) throw notFound();
    return detail;
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
      ...(p
        ? {
            scripts: [
              {
                type: "application/ld+json",
                children: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Article",
                  headline: p.title,
                  description: p.tagline,
                  image: p.cover,
                  author: { "@type": "Person", name: "Premansh Panigrahi" },
                  datePublished: p.year,
                }),
              },
            ],
          }
        : {}),
    };
  },
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-gold">404</p>
        <h1 className="mt-4 font-serif text-5xl">Project not found</h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          This case study isn't published yet — or it has moved. Head back to the archive.
        </p>
        <Link to="/projects" className="mt-8 inline-flex gold-link text-gold">
          Back to archive
        </Link>
      </div>
    </div>
  ),
  errorComponent: () => (
    <div className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <h1 className="font-serif text-3xl">Couldn't load this project.</h1>
        <p className="mt-2 text-sm text-muted-foreground">Please try again later.</p>
      </div>
    </div>
  ),
  component: ProjectPage,
});

function ProjectPage() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(projectDetailQueryOptions(slug));
  // ensureQueryData + notFound guarantees data here, but guard for types.
  if (!data) return null;
  const { project, prev, next, related } = data;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const galleryUrls = project.gallery.map((g: { src: string }) => g.src);


  return (
    <article className="pt-32 md:pt-40">
      {/* ── Back link + Title block ───────────────────────────── */}
      <header className="px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-gold"
          >
            <ArrowLeft className="h-3 w-3" /> Archive
          </Link>

          <Reveal>
            <div className="mt-10 flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.35em] text-gold">
              <span>{project.category}</span>
              <span className="h-px w-8 bg-gold/40" />
              <span className="text-muted-foreground">{project.year}</span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 font-serif text-[clamp(2.75rem,8vw,8rem)] leading-[0.95]">
              {project.title}
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-6 max-w-2xl font-serif text-2xl text-muted-foreground md:text-3xl">
              {project.tagline}
            </p>
          </Reveal>

          <dl className="mt-16 grid grid-cols-2 gap-8 border-y border-border py-8 md:grid-cols-4">
            <Meta label="Role" value={project.role} />
            <Meta label="Year" value={project.year} />
            <Meta label="Category" value={project.category} />
            <Meta label="Tools" value={project.stack.join(", ")} />
          </dl>
        </div>
      </header>

      {/* ── Cover ─────────────────────────────────────────────── */}
      <div className="mt-16 px-6 md:mt-24 md:px-12">
        <div className="mx-auto max-w-7xl overflow-hidden">
          <Reveal>
            <img
              src={project.cover}
              alt={project.title}
              className="w-full"
              loading="eager"
            />
          </Reveal>
        </div>
      </div>

      {/* ── Overview ──────────────────────────────────────────── */}
      <div className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-[1fr_2fr] md:gap-24">
          <Reveal>
            <h2 className="font-serif text-3xl md:text-4xl">Overview</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-muted-foreground">{project.overview}</p>
          </Reveal>
        </div>

        <Section title="The Challenge" body={project.challenge} />
        <Section title="The Solution" body={project.solution} />
        <Section title="Design Process" body={project.process} />
      </div>

      {/* ── Gallery ───────────────────────────────────────────── */}
      {galleryUrls.length > 0 && (
        <div className="bg-muted/40 px-6 py-24 md:px-12 md:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="mb-4 text-xs uppercase tracking-[0.35em] text-gold">Gallery</p>
              <h2 className="mb-12 font-serif text-4xl md:text-5xl">Selected frames.</h2>
            </Reveal>
            <div className="grid gap-4 md:grid-cols-2">
              {project.gallery.map((g: { src: string; alt?: string; caption?: string }, i: number) => (
                <Reveal key={g.src + i} delay={i * 60}>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(i)}
                    aria-label={`View image ${i + 1} of ${project.title} in full size`}
                    className="group block w-full overflow-hidden bg-background"
                  >
                    <img
                      src={g.src}
                      alt={g.alt ?? `${project.title} — ${i + 1}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {g.caption && (
                      <p className="mt-3 text-left text-xs uppercase tracking-[0.25em] text-muted-foreground">
                        {g.caption}
                      </p>
                    )}
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Tools & Results ───────────────────────────────────── */}
      <div className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2 md:gap-24">
          {project.stack.length > 0 && (
            <Reveal>
              <p className="text-xs uppercase tracking-[0.35em] text-gold">Tools & Technologies</p>
              <h3 className="mt-3 font-serif text-3xl md:text-4xl">The kit.</h3>
              <ul className="mt-8 flex flex-wrap gap-3">
                {project.stack.map((s: string) => (
                  <li
                    key={s}
                    className="rounded-full border border-border px-4 py-2 text-sm text-foreground/80"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {project.results.length > 0 && (
            <Reveal delay={80}>
              <p className="text-xs uppercase tracking-[0.35em] text-gold">Key Outcomes</p>
              <h3 className="mt-3 font-serif text-3xl md:text-4xl">Results.</h3>
              <ul className="mt-8 space-y-4">
                {project.results.map((r: string, i: number) => (
                  <li key={i} className="grid grid-cols-[auto_1fr] gap-5 border-t border-border pt-4">
                    <span className="font-serif text-lg text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-muted-foreground">{r}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>

        {project.behanceUrl && (
          <div className="mx-auto mt-20 max-w-7xl text-center">
            <a
              href={project.behanceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-3.5 text-sm text-background transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold hover:text-accent-foreground"
            >
              View full case study on Behance
              <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        )}
      </div>

      {/* ── Prev / Next ───────────────────────────────────────── */}
      {(prev || next) && (
        <nav className="grid grid-cols-1 border-y border-border md:grid-cols-2">
          {prev && (
            <Link
              to="/projects/$slug"
              params={{ slug: prev.slug }}
              className="group flex flex-col gap-3 border-b border-border p-10 md:border-b-0 md:border-r md:p-16 hover:bg-muted/40"
            >
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                <ArrowLeft className="h-3 w-3" /> Previous
              </span>
              <span className="font-serif text-3xl transition-colors group-hover:text-gold">{prev.title}</span>
            </Link>
          )}
          {next && (
            <Link
              to="/projects/$slug"
              params={{ slug: next.slug }}
              className="group flex flex-col items-end gap-3 p-10 md:p-16 hover:bg-muted/40"
            >
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Next <ArrowRight className="h-3 w-3" />
              </span>
              <span className="font-serif text-3xl transition-colors group-hover:text-gold">{next.title}</span>
            </Link>
          )}
        </nav>
      )}

      {/* ── Related ───────────────────────────────────────────── */}
      {related.length > 0 && <RelatedProjects items={related} />}

      <div className="px-6 py-24 text-center md:px-12 md:py-32">
        <a
          href="/#contact"
          className="inline-flex items-center gap-3 rounded-full border border-gold px-6 py-3 text-sm text-gold transition-colors hover:bg-gold hover:text-accent-foreground"
        >
          Start a project together <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      <Lightbox
        images={galleryUrls}
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
  if (!body) return null;
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

function RelatedProjects({ items }: { items: Project[] }) {
  return (
    <section className="bg-muted/30 px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-gold">Keep exploring</p>
          <h2 className="mb-12 font-serif text-4xl md:text-5xl">Related work.</h2>
        </Reveal>
        <div className="grid gap-10 md:grid-cols-3">
          {items.map((p, i) => (
            <Reveal key={p.slug} delay={i * 70}>
              <Link to="/projects/$slug" params={{ slug: p.slug }} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={p.cover}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{p.category}</p>
                  <h3 className="mt-2 font-serif text-2xl transition-colors group-hover:text-gold">{p.title}</h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
