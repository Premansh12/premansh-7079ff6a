import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { listPhotos } from "@/lib/photos.functions";
import { PhotoStrip } from "@/components/photo-strip";
import { PhotoChapter } from "@/components/photo-chapter";
import { Reveal } from "@/components/reveal";

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
      { title: "Album — Premansh Panigrahi" },
      { name: "description", content: "A photography journal — frames, places, and the stories behind them." },
      { property: "og:title", content: "Album — Premansh Panigrahi" },
      { property: "og:description", content: "A photography journal — frames, places, and the stories behind them." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(photosQueryOptions),
  component: AlbumPage,
  errorComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-40 text-center" role="alert">
      <h1 className="font-serif text-3xl">Couldn't load the album</h1>
      <p className="mt-2 text-sm text-muted-foreground">Something went wrong. Please try again later.</p>
    </div>
  ),
  notFoundComponent: () => <div className="px-6 py-40 text-center">No photos yet.</div>,
});

function AlbumPage() {
  const { data: photos } = useSuspenseQuery(photosQueryOptions);
  const { photo: selectedId } = Route.useSearch();
  const navigate = useNavigate({ from: "/album" });

  const selected = photos.find((p) => p.id === selectedId) ?? null;

  const select = (id: string) =>
    navigate({ search: { photo: id }, replace: false });
  const close = () => navigate({ search: {}, replace: false });

  return (
    <div className="bg-background">
      {/* Header */}
      <section className="px-6 pb-12 pt-32 md:px-12 md:pb-20 md:pt-40">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
              Photography Journal
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[1.05] md:text-7xl">
              Frames from a slow walk through places worth remembering.
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 max-w-2xl text-sm text-muted-foreground md:text-base">
              Hover a frame to bring it forward. Click to step into the story behind it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Exhibition wall */}
      <section className="px-2 pb-24 md:px-6 md:pb-32">
        <div className="mx-auto max-w-[1600px]">
          <PhotoStrip photos={photos} selectedId={selectedId ?? null} onSelect={select} />
        </div>
      </section>

      {/* Chapter */}
      {selected && <PhotoChapter photo={selected} onClose={close} />}
    </div>
  );
}
