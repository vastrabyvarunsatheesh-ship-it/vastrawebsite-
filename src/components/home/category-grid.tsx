import * as React from "react";
import Link from "next/link";
import { Container } from "../common/container";
import { LuxuryImage } from "../common/luxury-image";

interface CategoryTile {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  imageUrl: string;
  colSpan?: string;
}

const CATEGORY_TILES: CategoryTile[] = [
  {
    id: "sarees",
    title: "SAREES",
    subtitle: "Kanjeevaram, Banarasi & Silk Sarees",
    href: "/category/sarees",
    imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800",
    colSpan: "md:col-span-2 lg:col-span-2",
  },
  {
    id: "kurtis",
    title: "KURTIS & SUITS",
    subtitle: "Designer Anarkalis & Palazzo Sets",
    href: "/category/kurtis",
    imageUrl: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800",
    colSpan: "md:col-span-1 lg:col-span-1",
  },
  {
    id: "dress_materials",
    title: "DRESS MATERIALS",
    subtitle: "Unstitched Chanderi & Cotton Fabrics",
    href: "/category/dress-materials",
    imageUrl: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800",
    colSpan: "md:col-span-1 lg:col-span-1",
  },
  {
    id: "womens_fashion",
    title: "WOMEN'S FASHION",
    subtitle: "Contemporary Indian Wear & Dupattas",
    href: "/category/womens-fashion",
    imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800",
    colSpan: "md:col-span-2 lg:col-span-2",
  },
];

export const CategoryGrid: React.FC = () => {
  return (
    <section className="py-20 bg-ivory">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-[10px] font-semibold tracking-[0.3em] text-gold-600 uppercase">
            Curated Collections
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-wide text-obsidian uppercase">
            Explore Categories
          </h2>
          <div className="h-0.5 w-12 bg-gold-400 mx-auto mt-3" />
        </div>

        {/* Grid Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORY_TILES.map((tile) => (
            <Link
              key={tile.id}
              href={tile.href}
              className={`group relative overflow-hidden aspect-[4/5] bg-obsidian ${tile.colSpan || ""}`}
            >
              <LuxuryImage
                src={tile.imageUrl}
                alt={tile.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top opacity-80 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/30 to-transparent transition-opacity duration-300 group-hover:opacity-80" />

              <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end text-left z-10 space-y-1">
                <span className="text-[10px] tracking-[0.25em] font-semibold text-gold-300 uppercase">
                  {tile.subtitle}
                </span>
                <h3 className="font-serif text-2xl font-bold tracking-widest text-ivory uppercase group-hover:text-gold-400 transition-colors">
                  {tile.title}
                </h3>
                <span className="inline-flex items-center text-xs font-semibold tracking-widest text-gold-400 uppercase pt-2 opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  Shop Now →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};
