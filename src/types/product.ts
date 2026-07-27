export type ProductCategory =
  | "sarees"
  | "tshirts"
  | "kurtis"
  | "dress-materials"
  | "womens-fashion"
  | "all";

export type FabricType =
  | "Kanjeevaram Silk"
  | "Banarasi Silk"
  | "Chanderi Silk"
  | "Cotton"
  | "Georgette"
  | "Organza"
  | "Chanderi & Organza"
  | "T-Shirt Cotton";

export interface ProductVariant {
  id: string;
  sku: string;
  color: string;
  size?: string; // S, M, L, XL, XXL, Free Size
  stock: number;
  price: number;
  images: string[];
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  category: ProductCategory;
  fabric?: FabricType;
  craftDetails?: string;
  basePrice: number;
  compareAtPrice?: number;
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestseller: boolean;
  variants: ProductVariant[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
