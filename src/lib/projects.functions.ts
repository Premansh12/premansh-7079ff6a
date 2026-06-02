import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import type { Project, ProjectGalleryItem } from "./projects.types";

const SELECT_COLS =
  "slug,title,category,year,cover,tagline,role,stack,overview,challenge,solution,process,results,gallery,behance_url,sort_order,created_at";

type Row = {
  slug: string;
  title: string;
  category: string;
  year: string;
  cover: string;
  tagline: string;
  role: string;
  stack: string[] | null;
  overview: string;
  challenge: string;
  solution: string;
  process: string;
  results: string[] | null;
  gallery: ProjectGalleryItem[] | null;
  behance_url: string | null;
};

function rowToProject(r: Row): Project {
  return {
    slug: r.slug,
    title: r.title,
    category: r.category,
    year: r.year,
    cover: r.cover,
    tagline: r.tagline,
    role: r.role,
    stack: r.stack ?? [],
    overview: r.overview,
    challenge: r.challenge,
    solution: r.solution,
    process: r.process,
    results: r.results ?? [],
    gallery: r.gallery ?? [],
    behanceUrl: r.behance_url ?? undefined,
  };
}

export const listProjects = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabaseAdmin
    .from("projects")
    .select(SELECT_COLS)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) {
    console.error("listProjects failed:", error);
    throw new Error("Failed to load projects. Please try again later.");
  }
  return ((data ?? []) as unknown as Row[]).map(rowToProject);
});

export const getProjectBySlug = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) =>
    z.object({ slug: z.string().min(1).max(255) }).parse(input),
  )
  .handler(async ({ data }) => {
    const { data: rows, error } = await supabaseAdmin
      .from("projects")
      .select(SELECT_COLS)
      .eq("slug", data.slug)
      .limit(1);
    if (error) {
      console.error("getProjectBySlug failed:", error);
      throw new Error("Failed to load this project. Please try again later.");
    }
    const row = (rows ?? [])[0] as unknown as Row | undefined;
    return row ? rowToProject(row) : null;
  });

export const getProjectDetail = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) =>
    z.object({ slug: z.string().min(1).max(255) }).parse(input),
  )
  .handler(async ({ data }) => {
    const { data: rows, error } = await supabaseAdmin
      .from("projects")
      .select(SELECT_COLS)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) {
      console.error("getProjectDetail failed:", error);
      throw new Error("Failed to load this project. Please try again later.");
    }
    const list = ((rows ?? []) as unknown as Row[]).map(rowToProject);
    const i = list.findIndex((p) => p.slug === data.slug);
    if (i === -1) return null;
    const project = list[i];
    const prev = list.length > 1 ? list[(i - 1 + list.length) % list.length] : null;
    const next = list.length > 1 ? list[(i + 1) % list.length] : null;
    const sameCategory = list.filter((p) => p.slug !== project.slug && p.category === project.category);
    const others = list.filter((p) => p.slug !== project.slug && p.category !== project.category);
    const related = [...sameCategory, ...others].slice(0, 3);
    return { project, prev, next, related };
  });
