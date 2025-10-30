-- Update Cashew Cake entries to add SKU and proper naming
-- Run this in Supabase SQL Editor

-- The products table has a 'sku' column (TEXT, UNIQUE) for product codes
-- This matches the IDs used in the static menu (src/data/diwaliMenu.ts)
-- Products already exist from previous insert, now we need to add SKU values

-- Update the 3 Cashew Cake entries to add proper SKU codes
-- Note: The screenshot showed id 36.993899+00 has SKU 'SN202501' already
-- The other two entries (58.056295+00) have NULL SKU values

-- First, let's check which products need updating
SELECT id, sku, name, price FROM public.products WHERE name LIKE 'Cashew Cake%' ORDER BY price;

-- Now update each entry with the correct SKU
-- Update 1/4 kg Cashew Cake (price 350)
UPDATE public.products 
SET sku = 'SN202501-250g',
    name = 'Cashew Cake (1/4kg)',
    description = 'Premium cashew-based cake with rich, creamy texture - 1/4 kg',
    updated_at = NOW()
WHERE name LIKE 'Cashew Cake%' AND price = 350;

-- Update 1/2 kg Cashew Cake (price 700)
UPDATE public.products 
SET sku = 'SN202501-500g',
    name = 'Cashew Cake (1/2kg)',
    description = 'Premium cashew-based cake with rich, creamy texture - 1/2 kg',
    updated_at = NOW()
WHERE name LIKE 'Cashew Cake%' AND price = 700;

-- Update 1 kg Cashew Cake (price 1400) - should already have SKU but update name
UPDATE public.products 
SET name = 'Cashew Cake (1kg)',
    description = 'Premium cashew-based cake with rich, creamy texture - 1 kg',
    updated_at = NOW()
WHERE sku = 'SN202501' OR (name LIKE 'Cashew Cake%' AND price = 1400);

-- Verify the inserts
SELECT id, sku, name, price, category 
FROM public.products 
WHERE sku LIKE 'SN202501%'
ORDER BY price ASC;

-- Expected result:
-- <uuid> | SN202501-250g | Cashew Cake (1/4kg) | 350  | Dry Fruit Sweets
-- <uuid> | SN202501-500g | Cashew Cake (1/2kg) | 700  | Dry Fruit Sweets
-- <uuid> | SN202501      | Cashew Cake (1kg)   | 1400 | Dry Fruit Sweets

-- ==================================================================================
-- IMPORTANT: SKU Column Matches Static Menu
-- ==================================================================================
-- ✅ The products table has a 'sku' column that perfectly matches the IDs in your
--    static menu (src/data/diwaliMenu.ts)
--
-- ✅ SKU is UNIQUE and indexed, perfect for product lookups
--
-- ✅ This maintains consistency between:
--    - Static menu (used for current order flow)
--    - Database (used for admin or future features)
--
-- 📝 If you want to query products from database in the future instead of 
--    the static menu, you can easily match by SKU!
-- ==================================================================================
