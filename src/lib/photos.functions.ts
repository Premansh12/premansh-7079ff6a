import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export type Photo = {
  id: string;
  title: string;
  image_url: string;
  location: string | null;
  category: string | null;
  story: string | null;
  camera: string | null;
  lens: string | null;
  settings: string | null;
  date_taken: string | null;
  sort_order: number;
};

export const listPhotos = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabaseAdmin
    .from("photos")
    .select("id,title,image_url,location,category,story,camera,lens,settings,date_taken,sort_order")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Photo[];
});
