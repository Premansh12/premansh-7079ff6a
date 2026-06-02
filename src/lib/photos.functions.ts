import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { z } from "zod";

export type Photo = {
  id: string;
  slug: string;
  title: string;
  image: string;
  location: string | null;
  country: string | null;
  category: string | null;
  story: string | null;
  camera: string | null;
  lens: string | null;
  settings: string | null;
  date_taken: string | null;
  featured: boolean;
  sort_order: number;
};

type Row = {
  id: string;
  slug: string | null;
  title: string;
  image_url: string | null;
  storage_path: string | null;
  location: string | null;
  country: string | null;
  category: string | null;
  story: string | null;
  camera: string | null;
  lens: string | null;
  settings: string | null;
  date_taken: string | null;
  featured: boolean | null;
  sort_order: number | null;
};

const SELECT =
  "id,slug,title,image_url,storage_path,location,country,category,story,camera,lens,settings,date_taken,featured,sort_order";

function resolveImage(row: Row): string {
  if (row.storage_path) {
    const { data } = supabaseAdmin.storage
      .from("photography")
      .getPublicUrl(row.storage_path);
    if (data?.publicUrl) return data.publicUrl;
  }
  return row.image_url ?? "";
}

function toDto(row: Row): Photo {
  return {
    id: row.id,
    slug: row.slug ?? row.id,
    title: row.title,
    image: resolveImage(row),
    location: row.location,
    country: row.country,
    category: row.category,
    story: row.story,
    camera: row.camera,
    lens: row.lens,
    settings: row.settings,
    date_taken: row.date_taken,
    featured: row.featured ?? false,
    sort_order: row.sort_order ?? 0,
  };
}

export const listPhotos = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabaseAdmin
    .from("photos")
    .select(SELECT)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) {
    console.error("listPhotos failed:", error);
    throw new Error("Failed to load photos. Please try again later.");
  }
  return ((data ?? []) as Row[]).map(toDto);
});

export const listFeaturedPhotos = createServerFn({ method: "GET" })
  .inputValidator((input: { limit?: number } | undefined) =>
    z
      .object({ limit: z.number().int().positive().max(20).optional() })
      .parse(input ?? {}),
  )
  .handler(async ({ data }) => {
    const limit = data.limit ?? 6;
    const { data: rows, error } = await supabaseAdmin
      .from("photos")
      .select(SELECT)
      .eq("featured", true)
      .order("sort_order", { ascending: true })
      .limit(limit);
    if (error) {
      console.error("listFeaturedPhotos failed:", error);
      throw new Error("Failed to load featured photos.");
    }
    return ((rows ?? []) as Row[]).map(toDto);
  });
