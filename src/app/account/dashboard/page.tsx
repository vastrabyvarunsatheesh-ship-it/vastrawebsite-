"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/common/container";
import { ShoppingBag, Heart, MapPin, Bell, ChevronRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CustomerDashboardPage() {
  return (
    <div className="py-16 bg-ivory min-h-screen">
      <Container>
        {/* Welcome Banner */}
        <div className="mb-10 border-b border-obsidian/10 pb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <span className="text-[10px] font-semibold tracking-[0.3em] text-gold-600 uppercase">
              Customer Atelier Portal
            </span>
            <h1 className="font-serif text-3xl font-bold tracking-wide text-obsidian uppercase mt-1">
              Welcome, Varun Satheesh
            </h1>
            <p className="text-xs text-obsidian/60 mt-1">
              Manage your couture orders, saved addresses, and atelier preferences.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-2 text-xs font-semibold text-gold-700 bg-gold-400/10 border border-gold-400/30 px-3 py-1.5 rounded">
            <User className="h-4 w-4 text-gold-500" />
            <span>VIP Royal Tier</span>
          </div>
        </div>

        {/* Overview Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Link
            href="/account/orders"
            className="border border-obsidian/10 bg-ivory-warm p-6 space-y-2 hover:border-gold-400 transition-all group"
          >
            <div className="flex justify-between items-center text-gold-500">
              <ShoppingBag className="h-6 w-6" />
              <ChevronRight className="h-4 w-4 text-obsidian/40 group-hover:text-gold-500 transition-colors" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-obsidian">3</h3>
            <p className="text-xs text-obsidian/60 font-semibold uppercase tracking-wider">
              Total Orders
            </p>
          </Link>

          <Link
            href="/account/wishlist"
            className="border border-obsidian/10 bg-ivory-warm p-6 space-y-2 hover:border-gold-400 transition-all group"
          >
            <div className="flex justify-between items-center text-gold-500">
              <Heart className="h-6 w-6" />
              <ChevronRight className="h-4 w-4 text-obsidian/40 group-hover:text-gold-500 transition-colors" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-obsidian">5</h3>
            <p className="text-xs text-obsidian/60 font-semibold uppercase tracking-wider">
              Wishlist Items
            </p>
          </Link>

          <Link
            href="/account/addresses"
            className="border border-obsidian/10 bg-ivory-warm p-6 space-y-2 hover:border-gold-400 transition-all group"
          >
            <div className="flex justify-between items-center text-gold-500">
              <MapPin className="h-6 w-6" />
              <ChevronRight className="h-4 w-4 text-obsidian/40 group-hover:text-gold-500 transition-colors" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-obsidian">2</h3>
            <p className="text-xs text-obsidian/60 font-semibold uppercase tracking-wider">
              Saved Addresses
            </p>
          </Link>

          <Link
            href="/account/notifications"
            className="border border-obsidian/10 bg-ivory-warm p-6 space-y-2 hover:border-gold-400 transition-all group"
          >
            <div className="flex justify-between items-center text-gold-500">
              <Bell className="h-6 w-6" />
              <ChevronRight className="h-4 w-4 text-obsidian/40 group-hover:text-gold-500 transition-colors" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-obsidian">2</h3>
            <p className="text-xs text-obsidian/60 font-semibold uppercase tracking-wider">
              Notifications
            </p>
          </Link>
        </div>

        {/* Quick Links Section */}
        <div className="border border-obsidian/10 bg-ivory-warm p-8 text-center space-y-4">
          <h3 className="font-serif text-xl font-bold text-obsidian uppercase">
            Explore Handcrafted Couture
          </h3>
          <p className="text-xs text-obsidian/60 max-w-md mx-auto">
            Discover our latest arrivals in pure Kanjeevaram silk sarees, Banarasi brocades, and designer suits.
          </p>
          <Link href="/category/sarees">
            <Button variant="gold">Browse Collection</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
