"use client";

import * as React from "react";
import Link from "next/link";
import { Sheet } from "../ui/sheet";
import { siteConfig } from "@/config/site";
import { Accordion } from "../ui/accordion";
import { User, ShoppingBag, Heart, Phone, Mail } from "lucide-react";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const categoryAccordionItems = [
    {
      id: "sarees",
      title: "Sarees Collection",
      content: (
        <ul className="space-y-2 pl-2">
          <li><Link href="/category/sarees?fabric=kanjeevaram" onClick={onClose} className="hover:text-gold-600">Pure Kanjeevaram Silk</Link></li>
          <li><Link href="/category/sarees?fabric=banarasi" onClick={onClose} className="hover:text-gold-600">Banarasi Silk Sarees</Link></li>
          <li><Link href="/category/sarees?fabric=chanderi" onClick={onClose} className="hover:text-gold-600">Chanderi & Organza</Link></li>
          <li><Link href="/category/sarees?occasion=bridal" onClick={onClose} className="hover:text-gold-600">Bridal Couture Sarees</Link></li>
        </ul>
      ),
    },
    {
      id: "kurtis",
      title: "Kurtis & Suits",
      content: (
        <ul className="space-y-2 pl-2">
          <li><Link href="/category/kurtis?style=anarkali" onClick={onClose} className="hover:text-gold-600">Anarkali Suit Sets</Link></li>
          <li><Link href="/category/kurtis?style=straight" onClick={onClose} className="hover:text-gold-600">Straight Cut Kurtis</Link></li>
          <li><Link href="/category/kurtis?type=co-ord" onClick={onClose} className="hover:text-gold-600">Ethnic Co-Ord Sets</Link></li>
        </ul>
      ),
    },
    {
      id: "dress-materials",
      title: "Dress Materials",
      content: (
        <ul className="space-y-2 pl-2">
          <li><Link href="/category/dress-materials?craft=handblock" onClick={onClose} className="hover:text-gold-600">Handblock Suit Sets</Link></li>
          <li><Link href="/category/dress-materials?craft=chanderi" onClick={onClose} className="hover:text-gold-600">Chanderi Unstitched</Link></li>
        </ul>
      ),
    },
  ];

  return (
    <Sheet isOpen={isOpen} onClose={onClose} side="left" title="VASTRA BY VARUN">
      <div className="flex flex-col justify-between h-full space-y-6">
        <div className="space-y-6">
          {/* Quick Account Links */}
          <div className="grid grid-cols-3 gap-2 border-b border-obsidian/10 pb-4 text-center text-xs font-medium uppercase tracking-wider">
            <Link href="/auth/login" onClick={onClose} className="flex flex-col items-center p-2 hover:text-gold-600">
              <User className="h-5 w-5 mb-1 text-gold-500" /> Account
            </Link>
            <Link href="/account/wishlist" onClick={onClose} className="flex flex-col items-center p-2 hover:text-gold-600">
              <Heart className="h-5 w-5 mb-1 text-gold-500" /> Wishlist
            </Link>
            <Link href="/cart" onClick={onClose} className="flex flex-col items-center p-2 hover:text-gold-600">
              <ShoppingBag className="h-5 w-5 mb-1 text-gold-500" /> Bag
            </Link>
          </div>

          {/* Categories Accordion */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-widest text-gold-600 uppercase mb-2">
              Explore Collections
            </h4>
            <Accordion items={categoryAccordionItems} />
          </div>
        </div>

        {/* Support & Contact */}
        <div className="border-t border-obsidian/10 pt-4 space-y-2 text-xs text-obsidian/70">
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-gold-500" />
            <span>{siteConfig.contact.phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-gold-500" />
            <span>{siteConfig.contact.email}</span>
          </div>
        </div>
      </div>
    </Sheet>
  );
};
