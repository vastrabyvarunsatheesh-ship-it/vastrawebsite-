"use client";

import { Product, ProductCategory, FabricType } from "@/types/product";

const STORAGE_KEY = "vastra_admin_products";

export class ProductStore {
  public static getProducts(): Product[] {
    if (typeof window === "undefined") return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public static addProduct(data: {
    title: string;
    subtitle?: string;
    description: string;
    category: string;
    fabric: string;
    craftDetails?: string;
    basePrice: number;
    compareAtPrice?: number;
    color: string;
    size?: string;
    stock: number;
    imageUrl: string;
  }): Product {
    const products = this.getProducts();
    const id = `prod_${Date.now()}`;
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const newProduct: Product = {
      id,
      slug,
      title: data.title,
      subtitle: data.subtitle || "",
      description: data.description,
      category: data.category as ProductCategory,
      fabric: data.fabric as FabricType,
      craftDetails: data.craftDetails || "",
      basePrice: Number(data.basePrice),
      compareAtPrice: data.compareAtPrice ? Number(data.compareAtPrice) : undefined,
      isFeatured: true,
      isNewArrival: true,
      isBestseller: false,
      variants: [
        {
          id: `var_${Date.now()}`,
          sku: `VST-${data.category.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
          color: data.color,
          size: data.size,
          stock: Number(data.stock),
          price: Number(data.basePrice),
          images: [data.imageUrl || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800"],
        },
      ],
      tags: [data.category],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [newProduct, ...products];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newProduct;
  }

  public static deleteProduct(id: string): void {
    const products = this.getProducts();
    const filtered = products.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }

  public static clearAll(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}
