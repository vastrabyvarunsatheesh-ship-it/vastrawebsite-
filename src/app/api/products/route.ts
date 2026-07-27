import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/api";

export const dynamic = "force-static";

const MOCK_PRODUCTS = [
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
  {
    id: "prod_anarkali_1",
    slug: "ivory-gold-embellished-anarkali-suit-set",
    title: "Ivory Gold Embellished Anarkali Suit Set",
    subtitle: "Includes Dupatta & Churidar",
    description: "Floor-length chanderi silk Anarkali featuring hand-embroidered Gota Patti work.",
    category: "kurtis",
    fabric: "Chanderi Silk",
    craftDetails: "Gota Patti",
    basePrice: 14999,
    compareAtPrice: 18999,
    isFeatured: true,
    isNewArrival: true,
    isBestseller: false,
    variants: [
      {
        id: "var_3",
        sku: "KRT-ANK-001-IVR",
        color: "Ivory White",
        size: "M",
        stock: 15,
        price: 14999,
        images: [
          "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800",
        ],
      },
    ],
    tags: ["Kurti", "Anarkali"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod_dress_mat_1",
    slug: "handblock-chanderi-silk-dress-material-set",
    title: "Handblock Chanderi Silk Dress Material Set",
    subtitle: "3-Piece Unstitched Set",
    description: "Unstitched kurta, bottom, and organza handblock printed dupatta.",
    category: "dress-materials",
    fabric: "Chanderi & Organza",
    craftDetails: "Handblock Print",
    basePrice: 6499,
    compareAtPrice: 8999,
    isFeatured: true,
    isNewArrival: false,
    isBestseller: true,
    variants: [
      {
        id: "var_4",
        sku: "MAT-CHN-001-GRN",
        color: "Emerald Green",
        stock: 20,
        price: 6499,
        images: [
          "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800",
        ],
      },
    ],
    tags: ["Dress Material"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function GET() {
  const response: ApiResponse<typeof MOCK_PRODUCTS> = {
    success: true,
    data: MOCK_PRODUCTS,
    meta: {
      total: MOCK_PRODUCTS.length,
      page: 1,
      limit: 10,
    },
  };

  return NextResponse.json(response);
}
