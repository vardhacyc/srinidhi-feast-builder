-- Add SKU column if missing and unique index
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'products' AND column_name = 'sku'
  ) THEN
    ALTER TABLE public.products ADD COLUMN sku TEXT;
  END IF;
EXCEPTION WHEN others THEN
  RAISE NOTICE 'Column sku may already exist: %', SQLERRM;
END$$;

-- Ensure unique index on sku
DO $$
BEGIN
  CREATE UNIQUE INDEX IF NOT EXISTS products_sku_key ON public.products (sku);
EXCEPTION WHEN others THEN
  RAISE NOTICE 'Index products_sku_key may already exist: %', SQLERRM;
END$$;

-- Upsert products from Diwali menu using SKU codes
INSERT INTO public.products (sku, name, price, category, description, hard_enabled, soft_enabled, gst_percentage, image_url)
VALUES
  ('SN202501','Cashew Cake',1400,'Dry Fruit Sweets','Premium cashew-based cake with rich, creamy texture', true, true, 5, '/lovable-uploads/CashewCake.webp'),
  ('SN202502','Pista Roll',1400,'Dry Fruit Sweets','Delicate pistachio rolls with authentic taste', true, true, 5, '/lovable-uploads/pista-roll.png'),
  ('SN202503','Kaju Cassata',1400,'Dry Fruit Sweets','Layered cashew dessert with exotic flavors', true, true, 5, '/lovable-uploads/kaju-katli.png'),
  ('SN202504','Fig Roll',1400,'Dry Fruit Sweets','Sweet fig rolls with natural fruit flavors', true, true, 5, '/figroll.png'),
  ('SN202505','Badam Halwa',1400,'Dry Fruit Sweets','Rich almond halwa made with premium ingredients', true, true, 5, '/lovable-uploads/coconut-burfi.png'),
  ('SN202506','Strawberry Kaju Katli',1400,'Dry Fruit Sweets','Traditional kaju katli with strawberry flavor', true, true, 5, '/lovable-uploads/Strawberry-pista-Roll.webp'),
  ('SN202507','Laddu',600,'Ghee Sweets','Traditional round sweets made with flour, ghee and sugar', true, true, 5, '/lovable-uploads/ladoo.png'),
  ('SN202508','Mysurpa',600,'Ghee Sweets','Rich, buttery sweet from Karnataka made with ghee', true, true, 5, '/lovable-uploads/MysorePak.png'),
  ('SN202509','Badusha',600,'Ghee Sweets','Flaky, layered sweet pastry soaked in sugar syrup', true, true, 5, '/lovable-uploads/badusha.jpg'),
  ('SN202510','Bombay Halwa',600,'Ghee Sweets','Colorful, translucent sweet made with corn flour', true, true, 5, '/lovable-uploads/bombay_halwa.webp'),
  ('SN202511','Spl. Laddu',650,'Ghee Sweets','Premium laddus made with pure ghee and finest ingredients', true, true, 5, '/lovable-uploads/ladoo.png'),
  ('SN202512','Carrot Mysurpa',650,'Ghee Sweets','Traditional Mysore Pak enhanced with fresh carrots', true, true, 5, '/lovable-uploads/CarrotMysorePak.webp'),
  ('SN202513','Soan Papdi',650,'Ghee Sweets','Flaky, crispy sweet with ghee and cardamom', true, true, 5, '/lovable-uploads/soan-papdi.png'),
  ('SN202514','Dry Fruit Halwa',650,'Ghee Sweets','Rich halwa loaded with assorted dry fruits and ghee', true, true, 5, '/dryfruitHalwa.png'),
  ('SN202549','Dry Fruits Gift Box',1199,'Bites','Premium gift box with assorted dry fruits and sweets', true, true, 5, '/lovable-uploads/soan-papdi.png'),
  ('SN202525','Gulkand Burfi',600,'Milk Sweets','Rose petal preserve flavored milk fudge squares', true, true, 5, '/lovable-uploads/3f9c1eba-d27c-4ca8-bff6-452efdb026dd.png'),
  ('SN202526','Dry Jamun',600,'Milk Sweets','Traditional dried gulab jamun', true, true, 5, '/gulab-jamun.png'),
  ('SN202527','Chocolate Burfi',650,'Milk Sweets','Rich chocolate burfi with premium cocoa', true, true, 5, '/lovable-uploads/coconut-burfi.png'),
  ('SN202528','Badam Mas Cake',650,'Milk Sweets','Premium almond-based traditional cake', true, true, 5, '/lovable-uploads/CashewCake.webp'),
  ('SN202529','Classic Mixture',450,'Savouries','Traditional South Indian mixture with various ingredients', true, true, 5, '/lovable-uploads/ribbon-pakoda.jpg'),
  ('SN202530','Butter Murukku',450,'Savouries','Crispy spiral snacks made with butter', true, true, 5, '/lovable-uploads/butter-murukku.webp'),
  ('SN202531','Ribbon Pakoda',450,'Savouries','Ribbon-shaped crispy savory snacks', true, true, 5, '/lovable-uploads/ribbon-pakoda.jpg'),
  ('SN202532','Ragi Ribbon Pakoda',450,'Savouries','Healthy finger millet ribbon-shaped fritters', true, true, 5, '/lovable-uploads/RagiPakoda.jpg'),
  ('SN202536','Royal Collection (1/4kg)',150,'Assorted & Combo Gift Boxes','Royal selection: Laddu, Mysurpa, Badusha, Bombay Halwa, Gulkand Burfi, Dry Jamun - 1/4 kg', true, true, 5, '/royal.png'),
  ('SN202537','Royal Collection (1/2kg)',300,'Assorted & Combo Gift Boxes','Royal selection: Laddu, Mysurpa, Badusha, Bombay Halwa, Gulkand Burfi, Dry Jamun - 1/2 kg', true, true, 5, '/royal.png'),
  ('SN202538','Royal Collection (1kg)',600,'Assorted & Combo Gift Boxes','Royal selection: Laddu, Mysurpa, Badusha, Bombay Halwa, Gulkand Burfi, Dry Jamun - 1 kg', true, true, 5, '/royal.png'),
  ('SN202539','Supreme Collection (1/4kg)',170,'Assorted & Combo Gift Boxes','Supreme selection: Spl. Laddu, Carrot Mysurpa, Soan Papdi, Chocolate Burfi, Dry Fruit Halwa, Badam Mas Cake - 1/4 kg', true, true, 5, '/supreme.png'),
  ('SN202540','Supreme Collection (1/2kg)',330,'Assorted & Combo Gift Boxes','Supreme selection: Spl. Laddu, Carrot Mysurpa, Soan Papdi, Chocolate Burfi, Dry Fruit Halwa, Badam Mas Cake - 1/2 kg', true, true, 5, '/supreme.png'),
  ('SN202541','Supreme Collection (1kg)',650,'Assorted & Combo Gift Boxes','Supreme selection: Spl. Laddu, Carrot Mysurpa, Soan Papdi, Chocolate Burfi, Dry Fruit Halwa, Badam Mas Cake - 1 kg', true, true, 5, '/supreme.png'),
  ('SN202542','Grandeur Collection (1/4kg)',350,'Assorted & Combo Gift Boxes','Grandeur dry fruit selection: Cashew Cake, Pista Roll, Kaju Cassata, Fig Roll, Badam Halwa, Strawberry Kaju Katli - 1/4 kg', true, true, 5, '/grandeur.png'),
  ('SN202543','Grandeur Collection (1/2kg)',700,'Assorted & Combo Gift Boxes','Grandeur dry fruit selection: Cashew Cake, Pista Roll, Kaju Cassata, Fig Roll, Badam Halwa, Strawberry Kaju Katli - 1/2 kg', true, true, 5, '/grandeur.png'),
  ('SN202546','Grandeur Collection (1kg)',1400,'Assorted & Combo Gift Boxes','Grandeur dry fruit selection: Cashew Cake, Pista Roll, Kaju Cassata, Fig Roll, Badam Halwa, Strawberry Kaju Katli - 1 kg', true, true, 5, '/grandeur.png'),
  ('SN202544','Premium Assorted Bites (12pcs)',499,'Assorted & Combo Gift Boxes','Delicious assorted premium bite-sized sweets - perfect for gifting', true, true, 5, '/premiumbites.png'),
  ('SN202545','Premium Assorted Bites (25pcs)',999,'Assorted & Combo Gift Boxes','Delicious assorted premium bite-sized sweets - perfect for gifting', true, true, 5, '/premiumbites.png'),
  ('SN202547','Premium Collection (12pcs)',600,'Assorted & Combo Gift Boxes','Premium selection: Badam Chocolate Cake, Kaju Gulkand Ball, Blueberry Kaju Cake, Biscoff Kaju Cake - 12 pieces', true, true, 5, '/lovable-uploads/90e0608c-b5fa-480e-9dfa-0a8173cd3f7e.png'),
  ('SN202548','Premium Collection (25pcs)',1200,'Assorted & Combo Gift Boxes','Premium selection: Badam Chocolate Cake, Kaju Gulkand Ball, Blueberry Kaju Cake, Biscoff Kaju Cake - 25 pieces', true, true, 5, '/lovable-uploads/soan-papdi.png')
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  hard_enabled = true,
  soft_enabled = true,
  gst_percentage = COALESCE(EXCLUDED.gst_percentage, public.products.gst_percentage),
  image_url = EXCLUDED.image_url,
  updated_at = now();