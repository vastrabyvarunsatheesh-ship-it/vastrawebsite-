"use client";

import * as React from "react";
import { Container } from "@/components/common/container";
import { ProductGalleryZoom } from "@/components/product/product-gallery-zoom";
import { ProductDetailInfo } from "@/components/product/product-detail-info";
import { Tabs } from "@/components/ui/tabs";
import { ProductSection } from "@/components/home/product-section";
import { Product } from "@/types/product";

const SAMPLE_PDP_PRODUCT: Product = {
  id: "prod_kanjeevaram_1",
  slug: "royal-crimson-kanjeevaram-pure-silk-saree",
  title: "Royal Crimson Kanjeevaram Pure Silk Saree",
  subtitle: "Artisanal Zari Woven Border",
  description: "Handcrafted pure mulberry silk saree featuring intricate pure zari brocade weave inspired by South Indian temple architecture.",
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
  tags: ["Saree", "Kanjeevaram", "Silk"],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export function ProductDetailView({ slug }: { slug: string }) {
  const product = SAMPLE_PDP_PRODUCT;

  const pdpTabs = [
    {
      id: "description",
      label: "Description & Craft",
      content: (
        <div className="space-y-3 text-xs leading-relaxed text-obsidian/80">
          <p>{product.description}</p>
          <p>Each saree is individually hand-woven on traditional pit looms by master weavers in Kanchipuram. Due to the handcrafted nature of artisanal silk weaving, subtle variations in thread texture and zari sheen are natural characteristics of genuine silk mark certified sarees.</p>
        </div>
      ),
    },
    {
      id: "specs",
      label: "Specifications",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="border border-obsidian/10 p-3">
            <span className="text-obsidian/50 block font-sans">Saree Length:</span>
            <span className="font-semibold text-obsidian">5.5 Meters</span>
          </div>
          <div className="border border-obsidian/10 p-3">
            <span className="text-obsidian/50 block font-sans">Blouse Piece:</span>
            <span className="font-semibold text-obsidian">Included (0.8 Meters Unstitched)</span>
          </div>
          <div className="border border-obsidian/10 p-3">
            <span className="text-obsidian/50 block font-sans">Zari Quality:</span>
            <span className="font-semibold text-obsidian">Half Fine Tested Gold Zari</span>
          </div>
          <div className="border border-obsidian/10 p-3">
            <span className="text-obsidian/50 block font-sans">Silk Certification:</span>
            <span className="font-semibold text-obsidian">100% Silk Mark Certified</span>
          </div>
        </div>
      ),
    },
    {
      id: "care",
      label: "Fabric Care & Policy",
      content: (
        <div className="space-y-2 text-xs text-obsidian/80 leading-relaxed">
          <p>• Dry Clean Only. Store wrapped in pure muslin cloth in a cool, dry place.</p>
          <p>• Avoid direct contact with perfumes or deodorants on zari borders.</p>
          <p>• 7-Day Easy Return & Exchange policy applies to all unworn items with original security tags attached.</p>
        </div>
      ),
    },
  ];

  return (
    <div className="py-12 bg-ivory">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <ProductGalleryZoom
            images={product.variants[0]?.images || []}
            title={product.title}
          />
          <ProductDetailInfo product={product} />
        </div>

        <div className="border-t border-obsidian/10 pt-12 mb-16">
          <Tabs tabs={pdpTabs} />
        </div>

        <ProductSection
          title="YOU MAY ALSO ADMIRE"
          subtitle="Curated Recommendations"
          products={[SAMPLE_PDP_PRODUCT]}
          bgVariant="warm"
        />
      </Container>
    </div>
  );
}
