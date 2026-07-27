import * as React from "react";
import { formatCurrency, cn } from "@/lib/utils";

interface ProductPriceProps {
  price: number;
  compareAtPrice?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const ProductPrice: React.FC<ProductPriceProps> = ({
  price,
  compareAtPrice,
  className,
  size = "md",
}) => {
  const hasDiscount = compareAtPrice && compareAtPrice > price;
  const discountPercent = hasDiscount
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : 0;

  return (
    <div className={cn("flex items-center space-x-2 font-medium", className)}>
      <span
        className={cn(
          "text-obsidian font-semibold",
          size === "sm" && "text-xs",
          size === "md" && "text-sm sm:text-base",
          size === "lg" && "text-lg sm:text-xl font-serif"
        )}
      >
        {formatCurrency(price)}
      </span>

      {hasDiscount && (
        <>
          <span
            className={cn(
              "text-obsidian/40 line-through font-normal",
              size === "sm" && "text-[10px]",
              size === "md" && "text-xs",
              size === "lg" && "text-sm"
            )}
          >
            {formatCurrency(compareAtPrice)}
          </span>
          <span className="text-[10px] font-bold tracking-wider text-gold-600 uppercase">
            ({discountPercent}% OFF)
          </span>
        </>
      )}
    </div>
  );
};
