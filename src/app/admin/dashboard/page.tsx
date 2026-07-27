"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/common/container";
import { formatCurrency } from "@/lib/utils";
import { DollarSign, ShoppingBag, Users, AlertTriangle, TrendingUp, Package, Tag, ExternalLink, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  return (
    <div className="py-12 bg-ivory min-h-screen">
      <Container>
        {/* Executive Header */}
        <div className="mb-8 border-b border-obsidian/10 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <span className="text-[10px] font-semibold tracking-[0.3em] text-teal-600 uppercase">
              Vastra Executive Suite
            </span>
            <h1 className="font-serif text-3xl font-bold tracking-wide text-obsidian uppercase mt-1">
              Admin Overview
            </h1>
          </div>
          <div className="flex space-x-3 mt-4 sm:mt-0">
            <a
              href="https://admin.varunsatheesh.in"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-teal-500 text-ivory hover:bg-teal-600 transition-colors flex items-center shadow-luxury"
            >
              Open admin.varunsatheesh.in <ExternalLink className="h-4 w-4 ml-1.5" />
            </a>
          </div>
        </div>

        {/* External Admin System Integration Banner */}
        <div className="mb-10 border border-teal-500/30 bg-teal-500/10 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center space-x-2 text-teal-700 font-bold text-sm uppercase">
              <RefreshCw className="h-4 w-4 text-teal-600" />
              <span>Vastra External Management System (`admin.varunsatheesh.in`) Sync</span>
            </div>
            <p className="text-xs text-obsidian/70 mt-1">
              When you add Sarees or T-Shirts inside <strong>admin.varunsatheesh.in</strong>, products automatically appear live on your Vastra website.
            </p>
            <p className="text-[10px] font-mono text-teal-700 mt-1">
              Webhook Sync Endpoint: <code>https://vastrawebsite.pages.dev/api/products/sync</code>
            </p>
          </div>
          <a
            href="https://admin.varunsatheesh.in"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="gold" size="sm">
              Add Products on admin.varunsatheesh.in <ExternalLink className="h-4 w-4 ml-1" />
            </Button>
          </a>
        </div>

        {/* Executive KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="border border-obsidian/10 bg-ivory-warm p-6 space-y-2">
            <div className="flex justify-between items-center text-teal-600">
              <span className="text-xs font-bold uppercase tracking-wider text-obsidian/60">Total Revenue</span>
              <DollarSign className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-3xl font-bold text-obsidian">{formatCurrency(488990)}</h3>
            <span className="text-[10px] text-green-600 font-semibold flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> +18.4% from last month
            </span>
          </div>

          <div className="border border-obsidian/10 bg-ivory-warm p-6 space-y-2">
            <div className="flex justify-between items-center text-teal-600">
              <span className="text-xs font-bold uppercase tracking-wider text-obsidian/60">Total Orders</span>
              <ShoppingBag className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-3xl font-bold text-obsidian">142</h3>
            <span className="text-[10px] text-obsidian/60 font-semibold">98.2% Fulfillment Rate</span>
          </div>

          <div className="border border-obsidian/10 bg-ivory-warm p-6 space-y-2">
            <div className="flex justify-between items-center text-teal-600">
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
            <h3 className="font-serif text-3xl font-bold text-red-700">0 Items</h3>
            <span className="text-[10px] text-red-600 font-semibold">Stock &lt; 5 units remaining</span>
          </div>
        </div>

        {/* Quick Admin Navigation Modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/admin/products"
            className="border border-obsidian/10 bg-ivory-warm p-6 space-y-3 hover:border-teal-500 transition-all group"
          >
            <Package className="h-8 w-8 text-teal-600" />
            <h3 className="font-serif text-lg font-bold text-obsidian uppercase group-hover:text-teal-600">
              Product Catalogue
            </h3>
            <p className="text-xs text-obsidian/60">
              Add Sarees or T-Shirts directly or view products synced from admin.varunsatheesh.in.
            </p>
          </Link>

          <Link
            href="/admin/orders"
            className="border border-obsidian/10 bg-ivory-warm p-6 space-y-3 hover:border-teal-500 transition-all group"
          >
            <ShoppingBag className="h-8 w-8 text-teal-600" />
            <h3 className="font-serif text-lg font-bold text-obsidian uppercase group-hover:text-teal-600">
              Order Fulfillment
            </h3>
            <p className="text-xs text-obsidian/60">
              Process orders, assign AWB tracking numbers, and generate GST invoices.
            </p>
          </Link>

          <Link
            href="/admin/coupons"
            className="border border-obsidian/10 bg-ivory-warm p-6 space-y-3 hover:border-teal-500 transition-all group"
          >
            <Tag className="h-8 w-8 text-teal-600" />
            <h3 className="font-serif text-lg font-bold text-obsidian uppercase group-hover:text-teal-600">
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
