"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductGalleryZoomProps {
  images: string[];
  title: string;
}

export const ProductGalleryZoom: React.FC<ProductGalleryZoomProps> = ({ images, title }) => {
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const [isZoomed, setIsZoomed] = React.useState(false);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  const activeImage = images[selectedImageIndex] || "/images/placeholder-saree.jpg";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnail Bar */}
      <div className="flex md:flex-col space-x-3 md:space-x-0 md:space-y-3 overflow-x-auto md:overflow-y-auto no-scrollbar shrink-0">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImageIndex(idx)}
            className={cn(
              "relative h-20 w-16 overflow-hidden border transition-all shrink-0 bg-ivory-soft",
              idx === selectedImageIndex
                ? "border-gold-400 ring-1 ring-gold-400"
                : "border-obsidian/10 opacity-70 hover:opacity-100"
            )}
          >
            <Image src={img} alt={`${title} thumbnail ${idx}`} fill className="object-cover" />
          </button>
        ))}
      </div>

      {/* Main Image Display with Magnifier Zoom */}
      <div
        className="relative aspect-[3/4] w-full overflow-hidden border border-obsidian/10 bg-ivory-soft cursor-zoom-in"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={activeImage}
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className={cn(
            "object-cover object-top transition-transform duration-200",
            isZoomed && "scale-150"
          )}
          style={
            isZoomed
              ? {
                  transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                }
              : undefined
          }
        />
      </div>
    </div>
  );
};
