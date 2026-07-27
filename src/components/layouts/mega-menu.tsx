"use client";

import * as React from "react";
import Link from "next/link";

interface MegaMenuProps {
  categorySlug: string;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ categorySlug }) => {
  if (categorySlug === "sarees") {
    return (
      <div className="border-t border-obsidian/10 bg-ivory-warm p-8 shadow-luxury text-left">
        <div className="mx-auto w-full max-w-7xl grid grid-cols-4 gap-8">
          <div>
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-teal-600 mb-3 border-b border-teal-500/20 pb-1">
              Silk Sarees
            </h4>
            <ul className="space-y-2 text-xs text-obsidian/70">
              <li><Link href="/category/sarees?fabric=Kanjeevaram+Silk" className="hover:text-teal-600">Kanjeevaram Pure Silk</Link></li>
              <li><Link href="/category/sarees?fabric=Banarasi+Silk" className="hover:text-teal-600">Banarasi Brocade Silk</Link></li>
              <li><Link href="/category/sarees?fabric=Chanderi+Silk" className="hover:text-teal-600">Chanderi Tissue Silk</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-teal-600 mb-3 border-b border-teal-500/20 pb-1">
              Handcrafted Weaves
            </h4>
            <ul className="space-y-2 text-xs text-obsidian/70">
              <li><Link href="/category/sarees?craft=Pure+Zari" className="hover:text-teal-600">Pure Gold Zari Sarees</Link></li>
              <li><Link href="/category/sarees?craft=Kadwa" className="hover:text-teal-600">Kadwa Weave Motifs</Link></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (categorySlug === "tshirts") {
    return (
      <div className="border-t border-obsidian/10 bg-ivory-warm p-8 shadow-luxury text-left">
        <div className="mx-auto w-full max-w-7xl grid grid-cols-4 gap-8">
          <div>
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-teal-600 mb-3 border-b border-teal-500/20 pb-1">
              Men & Women T-Shirts
            </h4>
            <ul className="space-y-2 text-xs text-obsidian/70">
              <li><Link href="/category/tshirts?style=Oversized" className="hover:text-teal-600">Oversized Fit T-Shirts</Link></li>
              <li><Link href="/category/tshirts?style=Classic Cotton" className="hover:text-teal-600">100% Premium Cotton Tees</Link></li>
              <li><Link href="/category/tshirts?style=Graphic Printed" className="hover:text-teal-600">Graphic Printed T-Shirts</Link></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
