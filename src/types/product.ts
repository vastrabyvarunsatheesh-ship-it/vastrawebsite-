export type ProductCategory =
  | "sarees"
  | "kurtis"
  | "dress-materials"
  | "womens-fashion"
  | "mens-wear"
  | "jewellery"
  | "kids-wear"
  | "accessories";

export type FabricType =
  | "Silk"
  | "Kanjeevaram"
  | "Kanjeevaram Silk"
  | "Banarasi"
  | "Banarasi Silk"
  | "Cotton"
  | "Georgette"
  | "Chiffon"
  | "Organza"
  | "Velvet"
  | "Chanderi"
  | "Chanderi Silk"
  | "Chanderi & Organza";

export interface ProductVariant {
  id: string;
  sku: string;
  color: string;
  size?: string;
  stock: number;
  price: number;
  discountPrice?: number;
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
