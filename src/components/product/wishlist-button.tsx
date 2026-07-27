"use client";

import * as React from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  productId: string;
  isWishlisted?: boolean;
  onToggle?: (id: string, state: boolean) => void;
  className?: string;
}

export const WishlistButton: React.FC<WishlistButtonProps> = ({
  productId,
  isWishlisted: initial = false,
  onToggle,
  className,
}) => {
  const [isWishlisted, setIsWishlisted] = React.useState(initial);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = !isWishlisted;
    setIsWishlisted(newState);
    if (onToggle) onToggle(productId, newState);
  };

  return (
    <button
      onClick={handleToggle}
      aria-label="Add to Wishlist"
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full bg-ivory/80 backdrop-blur-md shadow-sm transition-all duration-300 hover:scale-110 hover:bg-ivory",
        className
      )}
    >
      <Heart
        className={cn(
          "h-4 w-4 transition-colors duration-300",
          isWishlisted
            ? "fill-red-500 text-red-500"
            : "text-obsidian/70 hover:text-gold-500"
        )}
      />
    </button>
  );
};
