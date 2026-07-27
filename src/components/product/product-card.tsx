"use client";

import * as React from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { LuxuryImage } from "../common/luxury-image";
import { ProductPrice } from "./product-price";
import { WishlistButton } from "./wishlist-button";
import { Badge } from "../ui/badge";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const primaryImage = product.variants[0]?.images[0] || "/images/placeholder-saree.jpg";
  const hoverImage = product.variants[0]?.images[1] || primaryImage;

  return (
    <div className={`group relative flex flex-col overflow-hidden border border-obsidian/5 bg-ivory transition-all duration-300 hover:shadow-luxury ${className || ""}`}>
      {/* Product Image & Badges */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-ivory-soft">
        <Link href={`/product/${product.slug}`} className="block h-full w-full">
          <LuxuryImage
            src={primaryImage}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col space-y-1">
          {product.isNewArrival && <Badge variant="gold">New</Badge>}
          {product.isBestseller && <Badge variant="obsidian">Bestseller</Badge>}
        </div>

        {/* Quick Wishlist Action */}
        <div className="absolute top-3 right-3 z-10">
          <WishlistButton productId={product.id} />
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col justify-between p-4 text-left">
        <div>
          <span className="text-[10px] tracking-[0.2em] font-semibold text-gold-600 uppercase block">
            {product.category.replace("-", " ")}
          </span>

          <Link href={`/product/${product.slug}`}>
            <h3 className="mt-1 font-serif text-sm font-medium tracking-wide text-obsidian line-clamp-1 group-hover:text-gold-600 transition-colors">
              {product.title}
            </h3>
          </Link>

          {product.fabric && (
            <p className="mt-0.5 text-[11px] text-obsidian/50 font-sans">
              Fabric: {product.fabric}
            </p>
          )}
        </div>

        <div className="mt-3 pt-2 border-t border-obsidian/5 flex items-center justify-between">
          <ProductPrice price={product.basePrice} compareAtPrice={product.compareAtPrice} size="sm" />
        </div>
      </div>
    </div>
  );
};
