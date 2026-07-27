"use client";

import * as React from "react";
import Link from "next/link";
import { Search, ShoppingBag, User, Heart, Menu } from "lucide-react";
import { Container } from "../common/container";
import { MegaMenu } from "./mega-menu";
import { MobileNav } from "./mobile-nav";
import { Dialog } from "../ui/dialog";
import { Input } from "../ui/input";

export const Header: React.FC = () => {
  const [activeMegaCategory, setActiveMegaCategory] = React.useState<string | null>(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <header className="sticky top-0 z-40 w-full border-b border-obsidian/10 bg-ivory/95 backdrop-blur-md transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-obsidian py-1.5 text-center text-[10px] tracking-widest text-gold-300 uppercase">
        Complimentary Express Delivery Across India • Global Couture Shipping
      </div>

      {/* Main Header Bar */}
      <Container className="flex h-20 items-center justify-between relative">
        {/* Mobile Hamburger Menu */}
        <button
          onClick={() => setIsMobileNavOpen(true)}
          className="lg:hidden p-2 text-obsidian hover:text-gold-600 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8">
          <div
            onMouseEnter={() => setActiveMegaCategory("sarees")}
            className="py-6 cursor-pointer"
          >
            <Link
              href="/category/sarees"
              className="text-xs uppercase tracking-widest text-obsidian/80 hover:text-gold-600 font-medium transition-colors"
            >
              Sarees
            </Link>
          </div>

          <div
            onMouseEnter={() => setActiveMegaCategory("kurtis")}
            className="py-6 cursor-pointer"
          >
            <Link
              href="/category/kurtis"
              className="text-xs uppercase tracking-widest text-obsidian/80 hover:text-gold-600 font-medium transition-colors"
            >
              Kurtis & Suits
            </Link>
          </div>

          <div
            onMouseEnter={() => setActiveMegaCategory("dress-materials")}
            className="py-6 cursor-pointer"
          >
            <Link
              href="/category/dress-materials"
              className="text-xs uppercase tracking-widest text-obsidian/80 hover:text-gold-600 font-medium transition-colors"
            >
              Dress Materials
            </Link>
          </div>

          <div className="py-6">
            <Link
              href="/category/womens-fashion"
              className="text-xs uppercase tracking-widest text-obsidian/80 hover:text-gold-600 font-medium transition-colors"
            >
              Women&apos;s Fashion
            </Link>
          </div>
        </nav>

        {/* Brand Logo Identity */}
        <div className="flex flex-col items-center justify-center text-center">
          <Link href="/" className="group flex flex-col items-center">
            <span className="font-serif text-2xl font-semibold tracking-[0.25em] text-obsidian transition-colors group-hover:text-gold-500">
              VASTRA
            </span>
            <span className="text-[9px] tracking-[0.4em] text-gold-500 uppercase -mt-1 font-sans font-medium">
              BY VARUN
            </span>
          </Link>
        </div>

        {/* Action Icons */}
        <div className="flex items-center space-x-5 text-obsidian/80">
          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search"
            className="hover:text-gold-600 transition-colors p-1"
          >
            <Search className="h-5 w-5" />
          </button>
          <Link
            href="/account/wishlist"
            aria-label="Wishlist"
            className="hidden sm:block hover:text-gold-600 transition-colors p-1"
          >
            <Heart className="h-5 w-5" />
          </Link>
          <Link
            href="/auth/login"
            aria-label="Account"
            className="hover:text-gold-600 transition-colors p-1"
          >
            <User className="h-5 w-5" />
          </Link>
          <Link
            href="/cart"
            aria-label="Shopping Bag"
            className="relative hover:text-gold-600 transition-colors p-1"
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold-400 text-[9px] font-bold text-obsidian shadow-sm">
              0
            </span>
          </Link>
        </div>
      </Container>

      {/* Mega Menu Dropdown */}
      <MegaMenu
        activeCategoryKey={activeMegaCategory}
        onClose={() => setActiveMegaCategory(null)}
      />

      {/* Mobile Drawer */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />

      {/* Search Dialog Modal */}
      <Dialog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        title="SEARCH COUTURE CATALOG"
      >
        <div className="space-y-4">
          <Input
            type="search"
            placeholder="Search Sarees, Kanjeevaram Silk, Anarkalis, Handblock..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-base py-3"
            autoFocus
          />
          <div className="text-xs text-obsidian/60 pt-2">
            <span className="font-semibold uppercase text-gold-600 block mb-2">Popular Searches:</span>
            <div className="flex flex-wrap gap-2">
              {["Kanjeevaram Saree", "Banarasi Silk", "Anarkali Suit", "Chanderi Material"].map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchQuery(term)}
                  className="border border-obsidian/10 px-2.5 py-1 text-[11px] hover:border-gold-400 hover:text-gold-600 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Dialog>
    </header>
  );
};
