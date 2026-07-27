import * as React from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { Container } from "../common/container";
import { ProductCard } from "../product/product-card";
import { Button } from "../ui/button";

interface ProductSectionProps {
  title: string;
  subtitle: string;
  products: Product[];
  viewAllHref?: string;
  bgVariant?: "ivory" | "warm";
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  title,
  subtitle,
  products,
  viewAllHref = "/category/sarees",
  bgVariant = "ivory",
}) => {
  return (
    <section className={`py-20 ${bgVariant === "warm" ? "bg-ivory-warm" : "bg-ivory"}`}>
      <Container>
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-obsidian/10 pb-6">
          <div>
            <span className="text-[10px] font-semibold tracking-[0.3em] text-gold-600 uppercase block mb-1">
              {subtitle}
            </span>
            <h2 className="font-serif text-3xl font-semibold tracking-wide text-obsidian uppercase">
              {title}
            </h2>
          </div>
          {viewAllHref && (
            <Link href={viewAllHref} className="mt-4 md:mt-0">
              <Button variant="ghost" className="text-xs tracking-widest uppercase hover:text-gold-600">
                View Collection →
              </Button>
            </Link>
          )}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
};
