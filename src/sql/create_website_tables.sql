
-- Website Content Table
CREATE TABLE IF NOT EXISTS public.website_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  content JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Publish History Table
CREATE TABLE IF NOT EXISTS public.publish_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  publish_type TEXT DEFAULT 'full',
  published_at TIMESTAMPTZ DEFAULT now(),
  published_by UUID REFERENCES auth.users(id),
  changes JSONB
);

-- Pages Table
CREATE TABLE IF NOT EXISTS public.pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  content JSONB,
  meta JSONB,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Create Row Level Security (RLS) policies
ALTER TABLE public.website_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.publish_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

-- Website Content Policies
CREATE POLICY "Allow select for all users" 
  ON public.website_content 
  FOR SELECT USING (true);

CREATE POLICY "Allow insert/update for authenticated users" 
  ON public.website_content 
  FOR ALL 
  TO authenticated 
  USING (true) WITH CHECK (true);

-- Publish History Policies
CREATE POLICY "Allow select for all users" 
  ON public.publish_history 
  FOR SELECT USING (true);

CREATE POLICY "Allow insert for authenticated users" 
  ON public.publish_history 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

-- Pages Policies
CREATE POLICY "Allow select for all users" 
  ON public.pages 
  FOR SELECT USING (true);

CREATE POLICY "Allow insert/update/delete for authenticated users" 
  ON public.pages 
  FOR ALL 
  TO authenticated 
  USING (true) WITH CHECK (true);

-- Create trigger function for updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at columns
CREATE TRIGGER update_website_content_updated_at
  BEFORE UPDATE ON public.website_content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_pages_updated_at
  BEFORE UPDATE ON public.pages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
