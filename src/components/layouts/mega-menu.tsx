"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "../common/container";
import { LuxuryImage } from "../common/luxury-image";

interface SubCategory {
  title: string;
  href: string;
}

interface MegaCategory {
  title: string;
  href: string;
  subcategories: {
    columnTitle: string;
    items: SubCategory[];
  }[];
  teaserImage?: {
    src: string;
    alt: string;
    caption: string;
    href: string;
  };
}

const MEGA_MENU_DATA: Record<string, MegaCategory> = {
  sarees: {
    title: "Sarees",
    href: "/category/sarees",
    subcategories: [
      {
        columnTitle: "By Fabric",
        items: [
          { title: "Pure Kanjeevaram Silk", href: "/category/sarees?fabric=kanjeevaram" },
          { title: "Banarasi Silk Sarees", href: "/category/sarees?fabric=banarasi" },
          { title: "Chanderi & Organza", href: "/category/sarees?fabric=chanderi" },
          { title: "Georgette & Chiffon", href: "/category/sarees?fabric=georgette" },
          { title: "Handloom Cotton", href: "/category/sarees?fabric=cotton" },
        ],
      },
      {
        columnTitle: "By Occasion",
        items: [
          { title: "Bridal Couture", href: "/category/sarees?occasion=bridal" },
          { title: "Festive Collections", href: "/category/sarees?occasion=festive" },
          { title: "Party Wear Sarees", href: "/category/sarees?occasion=party" },
          { title: "Daily Classic Sarees", href: "/category/sarees?occasion=daily" },
        ],
      },
    ],
    teaserImage: {
      src: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800",
      alt: "Heritage Kanjeevaram Silk Sarees",
      caption: "Royal Heritage Kanjeevaram Collection",
      href: "/category/sarees?collection=royal-heritage",
    },
  },
  kurtis: {
    title: "Kurtis",
    href: "/category/kurtis",
    subcategories: [
      {
        columnTitle: "Styles",
        items: [
          { title: "Anarkali Suits", href: "/category/kurtis?style=anarkali" },
          { title: "Straight Cut Kurtis", href: "/category/kurtis?style=straight" },
          { title: "A-Line & Flare Kurtis", href: "/category/kurtis?style=a-line" },
          { title: "Angrakha Kurtis", href: "/category/kurtis?style=angrakha" },
        ],
      },
      {
        columnTitle: "Sets & Co-Ords",
        items: [
          { title: "Kurta Dupatta Sets", href: "/category/kurtis?type=dupatta-set" },
          { title: "Palazzo Suit Sets", href: "/category/kurtis?type=palazzo-set" },
          { title: "Ethnic Co-Ord Sets", href: "/category/kurtis?type=co-ord" },
        ],
      },
    ],
    teaserImage: {
      src: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800",
      alt: "Designer Kurtis & Sets",
      caption: "Artisanal Printed Anarkali Sets",
      href: "/category/kurtis?collection=artisan-prints",
    },
  },
  "dress-materials": {
    title: "Dress Materials",
    href: "/category/dress-materials",
    subcategories: [
      {
        columnTitle: "Craftsmanship",
        items: [
          { title: "Handblock Print Sets", href: "/category/dress-materials?craft=handblock" },
          { title: "Chanderi Silk Unstitched", href: "/category/dress-materials?craft=chanderi" },
          { title: "Embroidered Suit Pieces", href: "/category/dress-materials?craft=embroidery" },
          { title: "Pure Cotton Unstitched", href: "/category/dress-materials?craft=cotton" },
        ],
      },
    ],
    teaserImage: {
      src: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800",
      alt: "Artisanal Dress Materials",
      caption: "Unstitched Luxury Fabrics",
      href: "/category/dress-materials",
    },
  },
};

interface MegaMenuProps {
  activeCategoryKey: string | null;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ activeCategoryKey, onClose }) => {
  if (!activeCategoryKey || !MEGA_MENU_DATA[activeCategoryKey]) return null;

  const category = MEGA_MENU_DATA[activeCategoryKey];

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full border-b border-obsidian/10 bg-ivory/95 backdrop-blur-lg shadow-luxury transition-all duration-300 animate-fade-in z-50"
    >
      <Container className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Subcategory Columns */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.subcategories.map((col, idx) => (
              <div key={idx} className="space-y-3">
                <h4 className="text-xs font-semibold tracking-widest text-gold-600 uppercase border-b border-gold-400/20 pb-2">
                  {col.columnTitle}
                </h4>
                <ul className="space-y-2">
                  {col.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="text-xs text-obsidian/80 hover:text-gold-600 hover:pl-1 transition-all duration-200 block"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Visual Teaser Card */}
          {category.teaserImage && (
            <div className="md:col-span-1 border border-gold-400/20 bg-ivory-warm p-3">
              <Link href={category.teaserImage.href} onClick={onClose} className="group block">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <LuxuryImage
                    src={category.teaserImage.src}
                    alt={category.teaserImage.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="mt-3 text-center font-serif text-xs font-medium text-obsidian group-hover:text-gold-600 transition-colors uppercase tracking-wider">
                  {category.teaserImage.caption} →
                </p>
              </Link>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};
