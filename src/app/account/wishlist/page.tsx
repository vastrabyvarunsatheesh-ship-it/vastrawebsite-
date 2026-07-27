"use client";

import * as React from "react";
import { Container } from "@/components/common/container";
import { useWishlist } from "@/store/wishlist-context";
import { ProductCard } from "@/components/product/product-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  const { wishlistProducts, clearWishlist } = useWishlist();

  return (
    <div className="py-16 bg-ivory min-h-screen">
      <Container>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-obsidian/10 pb-6 mb-10">
          <div>
            <span className="text-[10px] font-semibold tracking-[0.3em] text-gold-600 uppercase">
              Saved Collection
            </span>
            <h1 className="font-serif text-3xl font-bold tracking-wide text-obsidian uppercase mt-1">
              My Wishlist ({wishlistProducts.length})
            </h1>
          </div>
          {wishlistProducts.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-xs text-obsidian/60 hover:text-red-500 mt-4 sm:mt-0 flex items-center"
            >
              <Trash2 className="h-3.5 w-3.5 mr-1" /> Clear Wishlist
            </button>
          )}
        </div>

        {wishlistProducts.length === 0 ? (
          <EmptyState
            icon={<Heart className="h-12 w-12 text-gold-400" />}
            title="Your Wishlist is Empty"
            description="Save your favorite Kanjeevaram sarees, Anarkali suit sets, and artisanal fabrics to your wishlist."
            actionLabel="Explore Collections"
            onAction={() => {
              window.location.href = "/category/sarees";
            }}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
