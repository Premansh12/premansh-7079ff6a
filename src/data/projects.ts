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
export const projects: Project[] = [
  {
    slug: "mascara-skincare",
    title: "Mascara Skincare",
    category: "Brand Identity Design",
    year: "2024",
    cover: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/969f18198875963.66482933311e8.png",
    tagline: "A premium skincare identity built on restraint, elegance, and editorial clarity.",
    role: "Brand Designer · Visual Designer",
    stack: ["Adobe Photoshop", "Adobe Illustrator", "Figma"],
    overview:
      "Mascara Skincare is a premium skincare brand identity project focused on creating a refined, modern, and luxurious visual experience. The goal was to establish a brand that communicates elegance, trust, and self-care while maintaining a contemporary aesthetic suitable for today's beauty market. The project explores how thoughtful typography, sophisticated layouts, and minimal visual elements can create a memorable skincare brand that feels both aspirational and approachable.",
    challenge:
      "The beauty and skincare industry is highly competitive, with countless brands competing for attention through similar visual languages and messaging. The challenge was to create a distinctive identity that feels premium without appearing inaccessible, appeals to a modern design-conscious audience, maintains clarity across every touchpoint, earns strong shelf presence and digital recognition, and reflects the values of quality, confidence, and self-care.",
    solution:
      "A luxury-inspired brand system was developed using a clean and minimalist design approach. The identity combines elegant typography, generous whitespace, and carefully balanced compositions to create a premium visual presence. The design system was built to flex across packaging, social media, marketing materials, and digital experiences while maintaining a consistent brand voice — anchored by sophisticated hierarchy, minimal yet memorable branding, premium product presentation, and strong visual storytelling.",
    process:
      "The project began with research into contemporary skincare brands, luxury packaging systems, and beauty industry trends — focused on how premium brands communicate trust, quality, and exclusivity. From there, a visual direction was established around luxury, simplicity, elegance, modern beauty culture, and premium self-care. The identity system was then refined through typography exploration, layout experimentation, and branding applications to guarantee consistency and recognizability across every touchpoint.",
    results: [
      "A polished skincare brand concept that elevates the product's perceived value through strategic visual storytelling.",
      "A premium identity that extends seamlessly across packaging, marketing campaigns, and digital platforms.",
      "A scalable visual system ready to support future product lines while staying cohesive and memorable.",
      "Demonstrated how restraint, clarity, and thoughtful typography can outperform complexity in luxury branding.",
    ],
    gallery: [
      { src: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?auto=format&fit=crop&w=1600&q=80", alt: "Mascara Skincare packaging composition", caption: "Packaging system" },
      { src: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1600&q=80", alt: "Editorial brand layout", caption: "Editorial layout" },
      { src: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1600&q=80", alt: "Minimal product still life", caption: "Product still life" },
      { src: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1600&q=80", alt: "Typography and logo system", caption: "Typography system" },
    ],
    behanceUrl: "https://www.behance.net/gallery/198875963/Mascara-Skincare",
  },
];

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
