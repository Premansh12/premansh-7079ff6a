
ALTER TABLE public.photos
  ADD COLUMN IF NOT EXISTS slug text,
  ADD COLUMN IF NOT EXISTS storage_path text,
  ADD COLUMN IF NOT EXISTS country text,
  ADD COLUMN IF NOT EXISTS featured boolean NOT NULL DEFAULT false;

-- Backfill slug from title for existing rows
UPDATE public.photos
SET slug = regexp_replace(lower(trim(title)), '[^a-z0-9]+', '-', 'g')
WHERE slug IS NULL;

-- De-duplicate any slug collisions by appending short id suffix
UPDATE public.photos p
SET slug = p.slug || '-' || substr(p.id::text, 1, 6)
WHERE p.slug IN (
  SELECT slug FROM public.photos
  WHERE slug IS NOT NULL
  GROUP BY slug HAVING count(*) > 1
);

CREATE UNIQUE INDEX IF NOT EXISTS photos_slug_key ON public.photos (slug);
CREATE INDEX IF NOT EXISTS photos_featured_idx ON public.photos (featured) WHERE featured = true;
