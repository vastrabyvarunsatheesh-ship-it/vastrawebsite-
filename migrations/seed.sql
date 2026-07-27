-- ==============================================================================
-- VASTRA BY VARUN 2.0 - PRODUCTION SEED DATA
-- ==============================================================================

-- 1. SEED CATEGORIES
INSERT OR IGNORE INTO categories (id, name, slug, description, image_url) VALUES
('cat_sarees', 'Sarees', 'sarees', 'Handwoven Kanjeevaram, Banarasi Silk, and Artisanal Sarees.', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800'),
('cat_kurtis', 'Kurtis & Suits', 'kurtis', 'Designer Anarkali Suits, Straight Kurtis, and Ethnic Co-Ords.', 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800'),
('cat_dress_materials', 'Dress Materials', 'dress-materials', 'Unstitched Artisanal Suit Pieces in Pure Silk & Cotton.', 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800'),
('cat_womens_fashion', 'Women''s Fashion', 'womens-fashion', 'Contemporary Indian Fusion Wear & Dupattas.', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800');

-- 2. SEED SAMPLE PRODUCTS
INSERT OR IGNORE INTO products (id, category_id, title, slug, subtitle, description, fabric, craft_details, base_price, compare_at_price, is_featured, is_new_arrival, is_bestseller) VALUES
(
  'prod_kanjeevaram_1',
  'cat_sarees',
  'Royal Crimson Kanjeevaram Pure Silk Saree',
  'royal-crimson-kanjeevaram-pure-silk-saree',
  'Artisanal Zari Woven Border',
  'Handcrafted pure mulberry silk saree featuring intricate pure zari brocade weave inspired by South Indian temple architecture.',
  'Kanjeevaram Silk',
  'Pure Zari Weave',
  28999.00,
  35999.00,
  1, 1, 1
),
(
  'prod_banarasi_1',
  'cat_sarees',
  'Varanasi Gold Brocade Banarasi Silk Saree',
  'varanasi-gold-brocade-banarasi-silk-saree',
  'Heritage Mughal Motifs',
  'Pure Banarasi Katan silk woven with silver and gold zari kadwa technique.',
  'Banarasi Silk',
  'Kadwa Weave',
  24499.00,
  29999.00,
  1, 0, 1
),
(
  'prod_anarkali_1',
  'cat_kurtis',
  'Ivory Gold Embellished Anarkali Suit Set',
  'ivory-gold-embellished-anarkali-suit-set',
  'Includes Dupatta & Churidar',
  'Floor-length chanderi silk Anarkali featuring hand-embroidered Gota Patti work.',
  'Chanderi Silk',
  'Gota Patti & Zardozi',
  14999.00,
  18999.00,
  1, 1, 0
),
(
  'prod_dress_mat_1',
  'cat_dress_materials',
  'Handblock Chanderi Silk Dress Material Set',
  'handblock-chanderi-silk-dress-material-set',
  '3-Piece Unstitched Set',
  'Unstitched kurta, bottom, and organza handblock printed dupatta.',
  'Chanderi & Organza',
  'Bagru Handblock Print',
  6499.00,
  8999.00,
  1, 0, 1
);

-- 3. SEED PRODUCT VARIANTS
INSERT OR IGNORE INTO product_variants (id, product_id, sku, color, size, price, stock) VALUES
('var_kanjeevaram_1_red', 'prod_kanjeevaram_1', 'SAR-KAN-001-RED', 'Crimson Red', 'Free Size', 28999.00, 10),
('var_banarasi_1_gold', 'prod_banarasi_1', 'SAR-BAN-001-GLD', 'Royal Gold', 'Free Size', 24499.00, 8),
('var_anarkali_1_ivory_m', 'prod_anarkali_1', 'KRT-ANK-001-IVR-M', 'Ivory White', 'M', 14999.00, 15),
('var_anarkali_1_ivory_l', 'prod_anarkali_1', 'KRT-ANK-001-IVR-L', 'Ivory White', 'L', 14999.00, 12),
('var_dress_mat_1_green', 'prod_dress_mat_1', 'MAT-CHN-001-GRN', 'Emerald Green', 'Unstitched', 6499.00, 20);
