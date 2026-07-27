"use client";

import * as React from "react";
import { Product } from "@/types/product";

interface WishlistContextType {
  wishlistIds: string[];
  wishlistProducts: Product[];
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
}

const WishlistContext = React.createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistProducts, setWishlistProducts] = React.useState<Product[]>([]);

  // Load from localStorage on mount
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("vastra_wishlist");
      if (saved) setWishlistProducts(JSON.parse(saved));
    } catch {}
  }, []);

  // Sync to localStorage
  React.useEffect(() => {
    try {
      localStorage.setItem("vastra_wishlist", JSON.stringify(wishlistProducts));
    } catch {}
  }, [wishlistProducts]);

  const wishlistIds = wishlistProducts.map((p) => p.id);

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  const toggleWishlist = (product: Product) => {
    setWishlistProducts((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearWishlist = () => setWishlistProducts([]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistProducts,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = React.useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
};
