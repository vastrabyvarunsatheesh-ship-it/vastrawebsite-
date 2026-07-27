"use client";

import * as React from "react";
import { Container } from "@/components/common/container";
import { Plus, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AVAILABLE_COUPONS } from "@/lib/coupon/coupon-engine";

export default function AdminCouponsPage() {
  return (
    <div className="py-12 bg-ivory min-h-screen">
      <Container>
        <div className="flex justify-between items-center border-b border-obsidian/10 pb-6 mb-8">
          <div>
            <span className="text-[10px] font-semibold tracking-[0.3em] text-gold-600 uppercase">
              Promotions Engine
            </span>
            <h1 className="font-serif text-3xl font-bold tracking-wide text-obsidian uppercase mt-1">
              Coupons Management
            </h1>
          </div>
          <Button variant="gold" size="sm">
            <Plus className="h-4 w-4 mr-1" /> Create New Coupon
          </Button>
        </div>

        <div className="border border-obsidian/10 bg-ivory-warm overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-obsidian/10 bg-ivory uppercase tracking-wider text-obsidian/60 font-semibold">
                <th className="p-4">Coupon Code</th>
                <th className="p-4">Type</th>
                <th className="p-4">Discount Value</th>
                <th className="p-4">Min Subtotal</th>
                <th className="p-4">Description</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-obsidian/10 text-obsidian">
              {AVAILABLE_COUPONS.map((c) => (
                <tr key={c.code} className="hover:bg-ivory/50">
                  <td className="p-4 font-mono font-bold text-gold-700">{c.code}</td>
                  <td className="p-4 uppercase text-[10px] tracking-wider font-semibold">{c.type}</td>
                  <td className="p-4 font-bold">{c.type === "PERCENTAGE" ? `${c.value}%` : `₹${c.value}`}</td>
                  <td className="p-4">₹{c.minSubtotal?.toLocaleString("en-IN") || 0}</td>
                  <td className="p-4 text-obsidian/70">{c.description}</td>
                  <td className="p-4 text-right">
                    <span className="px-2 py-0.5 text-[9px] font-bold uppercase bg-green-100 text-green-700">
                      ACTIVE
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
}
