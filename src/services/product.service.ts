import { Product, ProductCategory } from "@/types/product";
import { PaginationParams } from "@/types/api";

export interface IProductService {
  getProducts(params?: PaginationParams & { category?: ProductCategory }): Promise<{ products: Product[]; total: number }>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getFeaturedProducts(): Promise<Product[]>;
}

export class ProductService implements IProductService {
  async getProducts(): Promise<{ products: Product[]; total: number }> {
    return { products: [], total: 0 };
  }

  async getProductBySlug(): Promise<Product | null> {
    return null;
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return [];
  }
}

export const productService = new ProductService();
