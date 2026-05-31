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
      { src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/34be3e198875963.6648293330d33.png", alt: "Mascara Skincare brand identity", caption: "Brand identity" },
      { src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/e3d9e8198875963.664829333160d.png", alt: "Packaging system", caption: "Packaging system" },
      { src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/e3f4b4198875963.6648293331a26.png", alt: "Editorial layout", caption: "Editorial layout" },
      { src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/4dfbf1198875963.6648293332157.png", alt: "Product still life", caption: "Product still life" },
      { src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/20b3d6198875963.6648293332877.png", alt: "Typography system", caption: "Typography system" },
      { src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/9d99fb198875963.6648293332c88.png", alt: "Brand applications", caption: "Brand applications" },
      { src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/45b8b0198875963.664829333452b.png", alt: "Marketing collateral", caption: "Marketing collateral" },
      { src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/ff09a9198875963.66482933340e4.png", alt: "Campaign visuals", caption: "Campaign visuals" },
      { src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/055dc1198875963.66482933334f6.png", alt: "Detail study", caption: "Detail study" },
      { src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/0e2ba5198875963.66482933349ad.png", alt: "Closing frame", caption: "Closing frame" },
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
