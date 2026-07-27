import * as React from "react";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { CategoryGrid } from "@/components/home/category-grid";
import { ProductSection } from "@/components/home/product-section";
import { PromoBanner } from "@/components/home/promo-banner";
import { TrustFeatures } from "@/components/home/trust-features";
import { TestimonialSlider } from "@/components/home/testimonial-slider";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { Product } from "@/types/product";

const FEATURED_PRODUCTS: Product[] = [
  {
    id: "prod_kanjeevaram_1",
    slug: "royal-crimson-kanjeevaram-pure-silk-saree",
    title: "Royal Crimson Kanjeevaram Pure Silk Saree",
    subtitle: "Artisanal Zari Woven Border",
    description: "Handcrafted pure mulberry silk saree featuring intricate pure zari brocade weave.",
    category: "sarees",
    fabric: "Kanjeevaram Silk",
    craftDetails: "Pure Zari Weave",
    basePrice: 28999,
    compareAtPrice: 35999,
    isFeatured: true,
    isNewArrival: true,
    isBestseller: true,
    variants: [
      {
        id: "var_1",
        sku: "SAR-KAN-001-RED",
        color: "Crimson Red",
        stock: 10,
        price: 28999,
        images: [
          "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800",
          "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800",
        ],
      },
    ],
    tags: ["Saree", "Kanjeevaram"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod_tshirt_1",
    slug: "minimal-oversized-heavyweight-cotton-tshirt",
    title: "Minimal Oversized Heavyweight Cotton T-Shirt",
    subtitle: "240 GSM Combed Cotton",
    description: "Relaxed drop-shoulder fit crafted from 100% premium combed cotton.",
    category: "tshirts",
    fabric: "T-Shirt Cotton",
    craftDetails: "240 GSM Heavyweight",
    basePrice: 1499,
    compareAtPrice: 1999,
    isFeatured: true,
    isNewArrival: true,
    isBestseller: true,
    variants: [
      {
        id: "var_ts_1",
        sku: "TSH-BLK-001-M",
        color: "Obsidian Black",
        size: "M",
        stock: 25,
        price: 1499,
        images: [
          "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800",
        ],
      },
    ],
    tags: ["T-Shirt", "Oversized"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod_banarasi_1",
    slug: "varanasi-gold-brocade-banarasi-silk-saree",
    title: "Varanasi Gold Brocade Banarasi Silk Saree",
    subtitle: "Heritage Mughal Motifs",
    description: "Pure Banarasi Katan silk woven with silver and gold zari kadwa technique.",
    category: "sarees",
    fabric: "Banarasi Silk",
    craftDetails: "Kadwa Weave",
    basePrice: 24499,
    compareAtPrice: 29999,
    isFeatured: true,
    isNewArrival: false,
    isBestseller: true,
    variants: [
      {
        id: "var_2",
        sku: "SAR-BAN-001-GLD",
        color: "Royal Gold",
        stock: 8,
        price: 24499,
        images: [
          "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800",
        ],
      },
    ],
    tags: ["Saree", "Banarasi"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-ivory">
      {/* 1. Pantaloons-Style Hero Banner Carousel */}
      <HeroCarousel />

      {/* 2. Visual Category Tiles (Sarees & T-Shirts) */}
      <CategoryGrid />

      {/* 3. Featured Sarees & T-Shirts Product Section */}
      <ProductSection
        title="ROYAL COUTURE & MODERN TEES"
        subtitle="Sarees & T-Shirts Collection"
        products={FEATURED_PRODUCTS}
        viewAllHref="/category/all"
        bgVariant="ivory"
      />

      {/* 4. Heritage Story & Promotional Banner */}
      <PromoBanner />

      {/* 5. Brand Guarantee & Trust Features Bar */}
      <TrustFeatures />

      {/* 6. Client Reflections & Testimonials */}
      <TestimonialSlider />

      {/* 7. VIP Newsletter Subscription Section */}
      <NewsletterSection />
    </div>
  );
}
