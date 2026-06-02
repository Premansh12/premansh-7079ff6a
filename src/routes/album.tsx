import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { z } from "zod";
import { listPhotos } from "@/lib/photos.functions";
import { PhotoDraggable } from "@/components/photo-draggable";
import { PhotoStory } from "@/components/photo-story";
import { Reveal } from "@/components/reveal";
import { INSTAGRAM_PHOTO_URL } from "@/data/contact";

const photosQueryOptions = queryOptions({
  queryKey: ["photos"],
  queryFn: () => listPhotos(),
});

const searchSchema = z.object({
  photo: z.string().optional(),
});

export const Route = createFileRoute("/album")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Photography Journal — Premansh Panigrahi" },
      { name: "description", content: "Moments & Frames — a visual archive of places, experiments, observations, and stories." },
      { property: "og:title", content: "Photography Journal — Premansh Panigrahi" },
      { property: "og:description", content: "Moments & Frames — a visual archive of places, experiments, observations, and stories." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(photosQueryOptions),
  component: AlbumPage,
  errorComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-40 text-center" role="alert">
      <h1 className="font-serif text-3xl">Couldn't load the journal</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Something went wrong. Please try again later.
      </p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="px-6 py-40 text-center">No photos yet.</div>
  ),
});

function AlbumPage() {
  const { data: photos } = useSuspenseQuery(photosQueryOptions);
  const { photo: selectedSlug } = Route.useSearch();
  const navigate = useNavigate({ from: "/album" });

  const selected = photos.find((p) => p.slug === selectedSlug) ?? null;
  const open = (slug: string) =>
    navigate({ search: { photo: slug }, replace: false });
  const close = () => navigate({ search: {}, replace: false });

  return (
    <div className="min-h-screen bg-[#fbf9f4] text-[#222]">
      {/* Editorial header */}
      <section className="px-6 pb-10 pt-32 md:px-14 md:pb-14 md:pt-40">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.35em] text-gold">
              Photography Journal
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[1.02] text-[#1a1a1a] md:text-7xl">
              Moments &amp; <em className="italic">Frames</em>.
              <span className="ml-3 inline-block align-baseline font-sans text-base font-normal not-italic text-[#888] md:text-lg">
                ({photos.length} {photos.length === 1 ? "Frame" : "Frames"})
              </span>
            </h1>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-5 max-w-xl text-sm text-[#555] md:text-base">
              A visual archive of places, experiments, observations, and stories.
              Drag the frames around the canvas. Click one to open the journal
              entry behind it.
            </p>
          </Reveal>
          <Reveal delay={320}>
            <a
              href={INSTAGRAM_PHOTO_URL}
              target="_blank"
              rel="noreferrer"
              className="group mt-7 inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold transition-colors hover:text-[#1a1a1a]"
            >
              Follow My Photography Journey
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* Draggable moodboard */}
      <section className="pb-24 md:pb-32">
        <PhotoDraggable photos={photos} onSelect={open} />
      </section>

      {selected && <PhotoStory photo={selected} onClose={close} />}
    </div>
  );
}
