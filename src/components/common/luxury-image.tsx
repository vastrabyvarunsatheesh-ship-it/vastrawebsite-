"use client";

import * as React from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface LuxuryImageProps extends Omit<ImageProps, "onLoad"> {
  fallbackSrc?: string;
}

export const LuxuryImage: React.FC<LuxuryImageProps> = ({
  src,
  alt,
  className,
  fallbackSrc = "/images/placeholder-luxury.jpg",
  ...props
}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [imgSrc, setImgSrc] = React.useState(src);

  return (
    <div className={cn("relative overflow-hidden bg-ivory-soft", className)}>
      <Image
        {...props}
        src={imgSrc}
        alt={alt}
        className={cn(
          "duration-700 ease-in-out transition-all",
          isLoading ? "scale-105 blur-sm opacity-0" : "scale-100 blur-0 opacity-100"
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setImgSrc(fallbackSrc);
          setIsLoading(false);
        }}
      />
    </div>
  );
};
