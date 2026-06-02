
CREATE TABLE public.projects (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  category text NOT NULL,
  year text NOT NULL,
  cover text NOT NULL,
  tagline text NOT NULL,
  role text NOT NULL DEFAULT '',
  stack text[] NOT NULL DEFAULT '{}',
  overview text NOT NULL DEFAULT '',
  challenge text NOT NULL DEFAULT '',
  solution text NOT NULL DEFAULT '',
  process text NOT NULL DEFAULT '',
  results text[] NOT NULL DEFAULT '{}',
  gallery jsonb NOT NULL DEFAULT '[]'::jsonb,
  behance_url text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.projects TO anon;
GRANT SELECT ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Projects are publicly readable"
  ON public.projects FOR SELECT
  USING (true);

CREATE INDEX idx_projects_sort ON public.projects (sort_order, created_at DESC);
