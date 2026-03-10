
-- Create reservations table
CREATE TABLE public.reservations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  guests INTEGER NOT NULL DEFAULT 2,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to INSERT a reservation (public booking form)
CREATE POLICY "Anyone can create a reservation"
  ON public.reservations
  FOR INSERT
  WITH CHECK (true);

-- Only authenticated users (admins) can view all reservations
CREATE POLICY "Authenticated users can view all reservations"
  ON public.reservations
  FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated users (admins) can update reservations
CREATE POLICY "Authenticated users can update reservations"
  ON public.reservations
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated users (admins) can delete reservations
CREATE POLICY "Authenticated users can delete reservations"
  ON public.reservations
  FOR DELETE
  TO authenticated
  USING (true);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_reservations_updated_at
  BEFORE UPDATE ON public.reservations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
