"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/common/container";
import { formatCurrency } from "@/lib/utils";
import { DollarSign, ShoppingBag, Users, AlertTriangle, TrendingUp, Package, Tag, Settings } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="py-12 bg-ivory min-h-screen">
      <Container>
        {/* Executive Header */}
        <div className="mb-10 border-b border-obsidian/10 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <span className="text-[10px] font-semibold tracking-[0.3em] text-gold-600 uppercase">
              Vastra Executive Suite
            </span>
            <h1 className="font-serif text-3xl font-bold tracking-wide text-obsidian uppercase mt-1">
              Admin Overview
            </h1>
          </div>
          <div className="flex space-x-3 mt-4 sm:mt-0">
            <Link
              href="/admin/products"
              className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider bg-gold-400 text-obsidian hover:bg-gold-500 transition-colors"
            >
              Manage Products
            </Link>
            <Link
              href="/admin/orders"
              className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border border-obsidian/20 text-obsidian hover:bg-obsidian/5 transition-colors"
            >
              Manage Orders
            </Link>
          </div>
        </div>

        {/* Executive KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="border border-obsidian/10 bg-ivory-warm p-6 space-y-2">
            <div className="flex justify-between items-center text-gold-500">
              <span className="text-xs font-bold uppercase tracking-wider text-obsidian/60">Total Revenue</span>
              <DollarSign className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-3xl font-bold text-obsidian">{formatCurrency(488990)}</h3>
            <span className="text-[10px] text-green-600 font-semibold flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> +18.4% from last month
            </span>
          </div>

          <div className="border border-obsidian/10 bg-ivory-warm p-6 space-y-2">
            <div className="flex justify-between items-center text-gold-500">
              <span className="text-xs font-bold uppercase tracking-wider text-obsidian/60">Total Orders</span>
              <ShoppingBag className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-3xl font-bold text-obsidian">142</h3>
            <span className="text-[10px] text-obsidian/60 font-semibold">98.2% Fulfillment Rate</span>
          </div>

          <div className="border border-obsidian/10 bg-ivory-warm p-6 space-y-2">
            <div className="flex justify-between items-center text-gold-500">
              <span className="text-xs font-bold uppercase tracking-wider text-obsidian/60">Active Clients</span>
              <Users className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-3xl font-bold text-obsidian">840</h3>
            <span className="text-[10px] text-green-600 font-semibold">+42 New VIP Clients</span>
          </div>

          <div className="border border-red-500/30 bg-red-50/50 p-6 space-y-2">
            <div className="flex justify-between items-center text-red-500">
              <span className="text-xs font-bold uppercase tracking-wider text-red-700">Low Stock Alert</span>
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-3xl font-bold text-red-700">2 Items</h3>
            <span className="text-[10px] text-red-600 font-semibold">Stock &lt; 5 units remaining</span>
          </div>
        </div>

        {/* Quick Admin Navigation Modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/admin/products"
            className="border border-obsidian/10 bg-ivory-warm p-6 space-y-3 hover:border-gold-400 transition-all group"
          >
            <Package className="h-8 w-8 text-gold-500" />
            <h3 className="font-serif text-lg font-bold text-obsidian uppercase group-hover:text-gold-600">
              Product Catalogue
            </h3>
            <p className="text-xs text-obsidian/60">
              Add new Kanjeevaram sarees, update prices, manage variants and images.
            </p>
          </Link>

          <Link
            href="/admin/orders"
            className="border border-obsidian/10 bg-ivory-warm p-6 space-y-3 hover:border-gold-400 transition-all group"
          >
            <ShoppingBag className="h-8 w-8 text-gold-500" />
            <h3 className="font-serif text-lg font-bold text-obsidian uppercase group-hover:text-gold-600">
              Order Fulfillment
            </h3>
            <p className="text-xs text-obsidian/60">
              Process orders, assign AWB tracking numbers, and generate GST invoices.
            </p>
          </Link>

          <Link
            href="/admin/coupons"
            className="border border-obsidian/10 bg-ivory-warm p-6 space-y-3 hover:border-gold-400 transition-all group"
          >
            <Tag className="h-8 w-8 text-gold-500" />
            <h3 className="font-serif text-lg font-bold text-obsidian uppercase group-hover:text-gold-600">
              Promotional Coupons
            </h3>
            <p className="text-xs text-obsidian/60">
              Create percentage or flat discount coupon codes and monitor usage metrics.
            </p>
          </Link>
        </div>
      </Container>
    </div>
  );
}
