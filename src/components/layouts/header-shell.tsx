"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Search, ShoppingBag, User, Heart } from "lucide-react";
import { Container } from "../common/container";

export const HeaderShell: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-obsidian/10 bg-ivory/90 backdrop-blur-md transition-all duration-300">
      {/* Top Luxury Announcement Bar */}
      <div className="bg-obsidian py-1.5 text-center text-[10px] tracking-widest text-gold-300 uppercase">
        Complimentary Express Shipping Across India & Worldwide Couture Delivery
      </div>

      {/* Main Header Container */}
      <Container className="flex h-20 items-center justify-between">
        {/* Navigation Categories Placeholder */}
        <nav className="hidden lg:flex items-center space-x-8">
          {siteConfig.navCategories.slice(0, 4).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs uppercase tracking-widest text-obsidian/80 transition-colors hover:text-gold-500 font-medium"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Brand Logo Identity */}
        <div className="flex flex-col items-center justify-center text-center">
          <Link href="/" className="group flex flex-col items-center">
            <span className="font-serif text-2xl font-semibold tracking-[0.25em] text-obsidian transition-colors group-hover:text-gold-500">
              VASTRA
            </span>
            <span className="text-[9px] tracking-[0.4em] text-gold-500 uppercase -mt-1 font-sans">
              BY VARUN
            </span>
          </Link>
        </div>

        {/* Header Action Icons */}
        <div className="flex items-center space-x-6 text-obsidian/80">
          <button aria-label="Search catalog" className="hover:text-gold-500 transition-colors">
            <Search className="h-5 w-5" />
          </button>
          <button aria-label="Wishlist" className="hidden sm:block hover:text-gold-500 transition-colors">
            <Heart className="h-5 w-5" />
          </button>
          <button aria-label="User Account" className="hover:text-gold-500 transition-colors">
            <User className="h-5 w-5" />
          </button>
          <button aria-label="Shopping Bag" className="relative hover:text-gold-500 transition-colors">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold-400 text-[9px] font-bold text-obsidian">
              0
            </span>
          </button>
        </div>
      </Container>
    </header>
  );
};
