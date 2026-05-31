// ============================================================
// Project data source
// ------------------------------------------------------------
// The `projects` array is intentionally EMPTY. The detail page
// at /projects/$slug renders from this shape, so adding a new
// project anywhere (here, a CMS, or Supabase) will produce a
// fully styled case study with zero template changes.
//
// To wire a database later, replace `projects` with a loader that
// returns the same `Project[]` shape (see getProject/getAdjacent
// helpers below — keep them in sync).
// ============================================================

export type ProjectGalleryItem = {
  src: string;
  alt?: string;
  caption?: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;            // e.g. "Brand Identity", "Web Design"
  year: string;                // e.g. "2025"
  cover: string;               // hero / cover image URL
  tagline: string;             // short editorial subtitle
  role: string;                // pipe / dot separated list
  stack: string[];             // tools & technologies
  overview: string;            // intro paragraph
  challenge: string;           // the problem
  solution: string;            // the answer
  process: string;             // approach / methodology
  results: string[];           // bullet outcomes
  gallery: ProjectGalleryItem[];
  behanceUrl?: string;         // external case study link
};

// ------------------------------------------------------------
// Live projects — populate this array (or swap for a Supabase
// loader) when real case studies are ready to ship.
// ------------------------------------------------------------
export const projects: Project[] = [];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const getAdjacentProjects = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1 || projects.length === 0) return { prev: null, next: null };
  return {
    prev: projects[(i - 1 + projects.length) % projects.length] ?? null,
    next: projects[(i + 1) % projects.length] ?? null,
  };
};

export const getRelatedProjects = (slug: string, limit = 3) => {
  const current = getProject(slug);
  if (!current) return [];
  const sameCategory = projects.filter(
    (p) => p.slug !== slug && p.category === current.category,
  );
  const others = projects.filter(
    (p) => p.slug !== slug && p.category !== current.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
};
