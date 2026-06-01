// Skill roles — the eleven hats. Shape mirrors a future Supabase
// `skill_roles` table (array fields as jsonb) so swapping the
// source from this file to a server fn is a one-file change.
import webDesigner from "@/assets/skills/web-designer.jpg";
import brandingExpert from "@/assets/skills/branding-expert.jpg";
import websiteDeveloper from "@/assets/skills/website-developer.jpg";
import uiUxDesigner from "@/assets/skills/ui-ux-designer.jpg";
import graphicDesigner from "@/assets/skills/graphic-designer.jpg";
import videoEditor from "@/assets/skills/video-editor.jpg";
import vibeCoder from "@/assets/skills/vibe-coder.jpg";
import futureDoctor from "@/assets/skills/future-doctor.jpg";
import hobbyist from "@/assets/skills/hobbyist.jpg";
import tinkerer from "@/assets/skills/tinkerer.jpg";
import hobbyPhotographer from "@/assets/skills/hobby-photographer.jpg";

export type SkillRole = {
  slug: string;
  index: number;
  title: string;
  tagline: string;
  image: string;
  expertise: string[];
  tools: string[];
  selectedWork: { label: string; href?: string }[];
  highlights: string[];
};

export const SKILL_ROLES: SkillRole[] = [
  {
    slug: "web-designer",
    index: 1,
    title: "Web Designer",
    tagline: "Editorial layouts, considered type, deliberate whitespace.",
    image: webDesigner,
    expertise: [
      "Editorial grids & typographic hierarchy",
      "Luxury portfolio & brand websites",
      "Art direction for digital products",
      "Motion-led storytelling",
    ],
    tools: ["Figma", "Illustrator", "Photoshop", "Lovable"],
    selectedWork: [
      { label: "This portfolio", href: "/" },
      { label: "Selected projects", href: "/projects" },
    ],
    highlights: [
      "Magazine-grade restraint translated to the browser",
      "Whitespace treated as a load-bearing material",
    ],
  },
  {
    slug: "branding-expert",
    index: 2,
    title: "Branding Expert",
    tagline: "Identities built from a single defensible idea.",
    image: brandingExpert,
    expertise: [
      "Concept-first identity systems",
      "Packaging & print collateral",
      "Type specimens & visual language",
      "Brand guidelines & rollout",
    ],
    tools: ["Illustrator", "InDesign", "Photoshop", "Figma"],
    selectedWork: [
      { label: "Mascara Skincare", href: "/projects/mascara-skincare" },
    ],
    highlights: [
      "Editorial restraint as a brand voice",
      "Systems designed to scale without losing their idea",
    ],
  },
  {
    slug: "website-developer",
    index: 3,
    title: "Website Developer",
    tagline: "Front-end engineering with a designer's hand.",
    image: websiteDeveloper,
    expertise: [
      "React, TanStack Start, Tailwind",
      "Performance-minded, accessible front-ends",
      "Design-system implementation",
      "Server functions & data integration",
    ],
    tools: ["VS Code", "Cursor", "Git", "GitHub", "Tailwind", "Lovable"],
    selectedWork: [
      { label: "Portfolio system", href: "/" },
      { label: "Album — interactive gallery", href: "/album" },
    ],
    highlights: [
      "Builds where pixel and code converge",
      "Ships polish that survives the inspector",
    ],
  },
  {
    slug: "ui-ux-designer",
    index: 4,
    title: "UI/UX Designer",
    tagline: "Calm, opinionated products that earn attention by spending it well.",
    image: uiUxDesigner,
    expertise: [
      "Product information architecture",
      "Interaction & micro-state design",
      "Design systems & component libraries",
      "Usability & accessibility review",
    ],
    tools: ["Figma", "Notion", "Lovable"],
    selectedWork: [
      { label: "Selected projects", href: "/projects" },
    ],
    highlights: [
      "Clarity before cleverness",
      "Interfaces that hold up under daily use",
    ],
  },
  {
    slug: "graphic-designer",
    index: 5,
    title: "Graphic Designer",
    tagline: "Posters, decks, print, social — the supporting cast.",
    image: graphicDesigner,
    expertise: [
      "Posters & print layouts",
      "Pitch decks & investor narratives",
      "Social systems & campaign assets",
      "Typographic compositions",
    ],
    tools: ["Illustrator", "Photoshop", "InDesign", "Canva"],
    selectedWork: [
      { label: "Mascara Skincare", href: "/projects/mascara-skincare" },
    ],
    highlights: [
      "Composition over decoration",
      "Each piece a single confident idea",
    ],
  },
  {
    slug: "video-editor",
    index: 6,
    title: "Video Editor",
    tagline: "Cuts that breathe. Color that flatters. Sound that does half the work.",
    image: videoEditor,
    expertise: [
      "Narrative editing & pacing",
      "Color grading & finishing",
      "Sound design & mix",
      "Brand films & social cutdowns",
    ],
    tools: ["Premiere Pro", "After Effects", "Photoshop"],
    selectedWork: [
      { label: "Selected projects", href: "/projects" },
    ],
    highlights: [
      "Edits paced like sentences, not clips",
      "Grading borrowed from photography, not filters",
    ],
  },
  {
    slug: "vibe-coder",
    index: 7,
    title: "Vibe Coder",
    tagline: "Prototypes built at the speed of conversation.",
    image: vibeCoder,
    expertise: [
      "AI-assisted product prototyping",
      "Generative interface experiments",
      "Rapid concept-to-build cycles",
      "Tool-chaining across LLMs",
    ],
    tools: ["Lovable", "Cursor", "ChatGPT", "Claude", "OpenRouter"],
    selectedWork: [
      { label: "This portfolio", href: "/" },
      { label: "Album experiment", href: "/album" },
    ],
    highlights: [
      "From sketch to live URL in one sitting",
      "AI as a co-author, not a crutch",
    ],
  },
  {
    slug: "future-doctor",
    index: 8,
    title: "Future Doctor",
    tagline: "Currently in medical school — clinical thinking applied to design.",
    image: futureDoctor,
    expertise: [
      "Clinical reasoning & differential thinking",
      "Anatomy & physiology fundamentals",
      "Evidence-based decision making",
      "Patient-centred communication",
    ],
    tools: ["Notion", "Research notebooks", "Anatomy atlases"],
    selectedWork: [
      { label: "MBBS — IIMSAR, Haldia", href: "/#certifications" },
    ],
    highlights: [
      "MBBS at IIMSAR, Haldia — Dec 2024 to present",
      "The same diagnostic instinct guides design critique",
    ],
  },
  {
    slug: "hobbyist",
    index: 9,
    title: "Hobbyist",
    tagline: "Always with three side-projects in the kitchen.",
    image: hobbyist,
    expertise: [
      "Self-directed learning loops",
      "Cross-craft experimentation",
      "Building for the love of the build",
      "Documenting works in progress",
    ],
    tools: ["Notion", "Sketchbook", "Workbench"],
    selectedWork: [
      { label: "Ongoing experiments", href: "/album" },
    ],
    highlights: [
      "Curiosity as a daily practice",
      "Finished isn't the only success metric",
    ],
  },
  {
    slug: "tinkerer",
    index: 10,
    title: "Tinkerer",
    tagline: "Pulls things apart to see why they work.",
    image: tinkerer,
    expertise: [
      "Reverse-engineering interfaces",
      "Mechanical & electronics curiosity",
      "Prototype-first problem solving",
      "Spotting the seams of a system",
    ],
    tools: ["Hand tools", "Multimeter", "Sketchbook"],
    selectedWork: [
      { label: "Selected projects", href: "/projects" },
    ],
    highlights: [
      "Understanding beats memorising",
      "Every artefact is a lesson disguised as an object",
    ],
  },
  {
    slug: "hobby-photographer",
    index: 11,
    title: "Hobby Photographer",
    tagline: "Light, geometry, and the long quiet hours.",
    image: hobbyPhotographer,
    expertise: [
      "Available-light & travel photography",
      "Composition & geometry",
      "Editorial sequencing",
      "Quiet, observational storytelling",
    ],
    tools: ["Rangefinder", "Lightroom", "Contact sheets"],
    selectedWork: [
      { label: "Album — photo journal", href: "/album" },
    ],
    highlights: [
      "Documenting experiences, not just images",
      "A frame earns its place when nothing else could replace it",
    ],
  },
];
