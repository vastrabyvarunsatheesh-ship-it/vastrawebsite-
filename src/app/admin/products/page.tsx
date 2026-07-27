"use client";

import * as React from "react";
import { Container } from "@/components/common/container";
import { formatCurrency } from "@/lib/utils";
import { Plus, Edit3, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { LuxuryImage } from "@/components/common/luxury-image";

const MOCK_ADMIN_PRODUCTS: Product[] = [
  {
    id: "prod_kanjeevaram_1",
    slug: "royal-crimson-kanjeevaram-pure-silk-saree",
    title: "Royal Crimson Kanjeevaram Pure Silk Saree",
    subtitle: "Artisanal Zari Woven Border",
    description: "Handcrafted pure mulberry silk saree.",
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
        images: ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800"],
      },
    ],
    tags: ["Saree", "Kanjeevaram"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod_banarasi_1",
    slug: "varanasi-gold-brocade-banarasi-silk-saree",
    title: "Varanasi Gold Brocade Banarasi Silk Saree",
    subtitle: "Heritage Mughal Motifs",
    description: "Pure Banarasi Katan silk.",
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
        images: ["https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800"],
      },
    ],
    tags: ["Saree", "Banarasi"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function AdminProductsPage() {
  return (
    <div className="py-12 bg-ivory min-h-screen">
      <Container>
        <div className="flex justify-between items-center border-b border-obsidian/10 pb-6 mb-8">
          <div>
            <span className="text-[10px] font-semibold tracking-[0.3em] text-gold-600 uppercase">
              Product Catalogue
            </span>
            <h1 className="font-serif text-3xl font-bold tracking-wide text-obsidian uppercase mt-1">
              Products Management
            </h1>
          </div>
          <Button variant="gold" size="sm">
            <Plus className="h-4 w-4 mr-1" /> Add New Product
          </Button>
        </div>

        <div className="border border-obsidian/10 bg-ivory-warm overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-obsidian/10 bg-ivory uppercase tracking-wider text-obsidian/60 font-semibold">
                <th className="p-4">Product</th>
                <th className="p-4">SKU</th>
                <th className="p-4">Category</th>
                <th className="p-4">Fabric</th>
                <th className="p-4">Base Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-obsidian/10 text-obsidian">
              {MOCK_ADMIN_PRODUCTS.map((prod) => (
                <tr key={prod.id} className="hover:bg-ivory/50">
                  <td className="p-4 flex items-center space-x-3">
                    <div className="relative h-10 w-8 bg-ivory-soft shrink-0 overflow-hidden">
                      <LuxuryImage
                        src={prod.variants[0]?.images[0] || "/images/placeholder-saree.jpg"}
                        alt={prod.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif font-semibold">{prod.title}</h4>
                      <span className="text-[10px] text-obsidian/50">{prod.subtitle}</span>
                    </div>
                  </td>
                  <td className="p-4 font-mono font-bold text-gold-700">
                    {prod.variants[0]?.sku}
                  </td>
                  <td className="p-4 uppercase text-[10px] tracking-wider font-semibold">
                    {prod.category}
                  </td>
                  <td className="p-4">{prod.fabric}</td>
                  <td className="p-4 font-serif font-bold">{formatCurrency(prod.basePrice)}</td>
                  <td className="p-4 font-semibold text-green-700">{prod.variants[0]?.stock} units</td>
                  <td className="p-4 text-right space-x-2">
                    <button className="p-1.5 hover:text-gold-600">
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button className="p-1.5 hover:text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
}
