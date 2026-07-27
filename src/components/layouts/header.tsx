"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "../common/container";
import { ShoppingBag, Heart, Search, User, Menu, ExternalLink } from "lucide-react";
import { MegaMenu } from "./mega-menu";
import { MobileNav } from "./mobile-nav";
import { useCart } from "@/store/cart-context";
import { useWishlist } from "@/store/wishlist-context";

export const Header: React.FC = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);
  const [activeMegaMenuCategory, setActiveMegaMenuCategory] = React.useState<string | null>(null);

  const { cartItems, openMiniCart } = useCart();
  const { wishlistIds } = useWishlist();

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-obsidian/10 bg-ivory-warm/95 backdrop-blur-md transition-all duration-300">
      {/* Top Utility Announcement Bar */}
      <div className="bg-teal-500 py-1.5 text-center text-[10px] font-bold tracking-widest text-ivory uppercase flex justify-center items-center space-x-2">
        <span>Complimentary Express Delivery Across India • Global Couture Shipping</span>
        <a
          href="https://admin.varunsatheesh.in"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center underline hover:text-teal-100 ml-2"
        >
          Management Portal <ExternalLink className="h-3 w-3 ml-0.5" />
        </a>
      </div>

      <Container className="flex h-20 items-center justify-between relative">
        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileNavOpen(true)}
          className="lg:hidden p-2 text-obsidian hover:text-teal-600 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Desktop Main Navigation Links (Focused on Sarees & T-Shirts) */}
        <nav className="hidden lg:flex items-center space-x-8">
          <div
            onMouseEnter={() => setActiveMegaMenuCategory("sarees")}
            className="py-6 cursor-pointer"
          >
            <Link
              href="/category/sarees"
              className="text-xs uppercase tracking-widest text-obsidian/80 hover:text-teal-600 font-semibold transition-colors"
            >
              Sarees
            </Link>
          </div>

          <div
            onMouseEnter={() => setActiveMegaMenuCategory("tshirts")}
            className="py-6 cursor-pointer"
          >
            <Link
              href="/category/tshirts"
              className="text-xs uppercase tracking-widest text-obsidian/80 hover:text-teal-600 font-semibold transition-colors"
            >
              T-Shirts
            </Link>
          </div>

          <div className="py-6">
            <Link
              href="/category/all"
              className="text-xs uppercase tracking-widest text-obsidian/80 hover:text-teal-600 font-semibold transition-colors"
            >
              All Products
            </Link>
          </div>
        </nav>

        {/* Center Brand Logo */}
        <div className="flex flex-col items-center justify-center text-center">
          <Link href="/" className="group flex flex-col items-center">
            <span className="font-serif text-2xl font-bold tracking-[0.25em] text-obsidian transition-colors group-hover:text-teal-600">
              VASTRA
            </span>
            <span className="text-[9px] tracking-[0.4em] text-teal-600 uppercase -mt-1 font-sans font-bold">
              BY VARUN
            </span>
          </Link>
        </div>

        {/* Right Icon Actions */}
        <div className="flex items-center space-x-5 text-obsidian/80">
          <Link
            href="/search"
            aria-label="Search"
            className="hover:text-teal-600 transition-colors p-1"
          >
            <Search className="h-5 w-5" />
          </Link>

          <Link
            href="/account/wishlist"
            aria-label="Wishlist"
            className="hidden sm:block hover:text-teal-600 transition-colors p-1 relative"
          >
            <Heart className="h-5 w-5" />
            {wishlistIds.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-teal-500 text-[9px] font-bold text-ivory">
                {wishlistIds.length}
              </span>
            )}
          </Link>

          <Link
            href="/account/dashboard"
            aria-label="Account"
            className="hover:text-teal-600 transition-colors p-1"
          >
            <User className="h-5 w-5" />
          </Link>

          <button
            onClick={openMiniCart}
            aria-label="Shopping Bag"
            className="relative hover:text-teal-600 transition-colors p-1"
          >
            <ShoppingBag className="h-5 w-5" />
            {totalCartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-teal-500 text-[9px] font-bold text-ivory shadow-sm">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mega Menu Dropdown */}
        {activeMegaMenuCategory && (
          <div
            onMouseLeave={() => setActiveMegaMenuCategory(null)}
            className="absolute top-full left-0 w-full"
          >
            <MegaMenu categorySlug={activeMegaMenuCategory} />
          </div>
        )}
      </Container>

      {/* Mobile Drawer Navigation */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
    </header>
  );
};
