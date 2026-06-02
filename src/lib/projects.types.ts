export type ProjectGalleryItem = {
  src: string;
  alt?: string;
  caption?: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  cover: string;
  tagline: string;
  role: string;
  stack: string[];
  overview: string;
  challenge: string;
  solution: string;
  process: string;
  results: string[];
  gallery: ProjectGalleryItem[];
  behanceUrl?: string;
};
