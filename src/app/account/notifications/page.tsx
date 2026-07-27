"use client";

import * as React from "react";
import { Container } from "@/components/common/container";
import { Bell, Tag, Truck } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="py-16 bg-ivory min-h-screen">
      <Container>
        <div className="border-b border-obsidian/10 pb-6 mb-10">
          <span className="text-[10px] font-semibold tracking-[0.3em] text-gold-600 uppercase">
            Communication Center
          </span>
          <h1 className="font-serif text-3xl font-bold tracking-wide text-obsidian uppercase mt-1">
            Notifications (2)
          </h1>
        </div>

        <div className="space-y-4 max-w-2xl">
          <div className="border border-obsidian/10 bg-ivory-warm p-4 flex space-x-4 items-start">
            <div className="p-2 rounded bg-gold-400/20 text-gold-600 shrink-0">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-serif text-xs font-semibold text-obsidian">Order VST-2026-884910 Dispatched</h4>
              <p className="text-xs text-obsidian/60 mt-0.5">
                Your Kanjeevaram pure silk saree has been handed over to Blue Dart Express (AWB-99882211-IN).
              </p>
              <span className="text-[10px] text-obsidian/40 mt-1 block">2 hours ago</span>
            </div>
          </div>

          <div className="border border-obsidian/10 bg-ivory-warm p-4 flex space-x-4 items-start">
            <div className="p-2 rounded bg-gold-400/20 text-gold-600 shrink-0">
              <Tag className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-serif text-xs font-semibold text-obsidian">Exclusive VIP Coupon Unlocked</h4>
              <p className="text-xs text-obsidian/60 mt-0.5">
                Use code <strong>ROYAL2500</strong> for flat ₹2,500 OFF on Couture orders above ₹19,999.
              </p>
              <span className="text-[10px] text-obsidian/40 mt-1 block">1 day ago</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
