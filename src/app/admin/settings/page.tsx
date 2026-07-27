"use client";

import * as React from "react";
import { Container } from "@/components/common/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreditCard, Lock, Settings as SettingsIcon, Save } from "lucide-react";
import { useToast } from "@/components/ui/toast";

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const [razorpayKeyId, setRazorpayKeyId] = React.useState("");
  const [razorpayKeySecret, setRazorpayKeySecret] = React.useState("");
  const [currency, setCurrency] = React.useState("INR (₹)");
  const [taxRate, setTaxRate] = React.useState("5");
  const [freeShippingThreshold, setFreeShippingThreshold] = React.useState("2999");

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem("vastra_razorpay_key_id", razorpayKeyId);
      localStorage.setItem("vastra_razorpay_key_secret", razorpayKeySecret);
    } catch {}
    toast("Settings Saved", "Razorpay keys and store settings updated successfully.", "success");
  };

  return (
    <div className="py-12 bg-ivory min-h-screen">
      <Container className="max-w-3xl">
        <div className="border-b border-obsidian/10 pb-6 mb-8">
          <span className="text-[10px] font-semibold tracking-[0.3em] text-gold-600 uppercase">
            Store Configuration
          </span>
          <h1 className="font-serif text-3xl font-bold tracking-wide text-obsidian uppercase mt-1">
            Admin Settings & Payment Keys
          </h1>
        </div>

        <form onSubmit={handleSaveSettings} className="space-y-8">
          {/* Razorpay Gateway Keys */}
          <div className="border border-gold-400/30 bg-ivory-warm p-6 space-y-4">
            <h3 className="font-serif text-base font-semibold text-obsidian uppercase flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-gold-500" /> Razorpay Integration Keys
            </h3>
            <p className="text-xs text-obsidian/60">
              Enter your live or test Razorpay API credentials from your Razorpay Dashboard (Dashboard &gt; Settings &gt; API Keys).
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase text-obsidian block mb-1">
                  Razorpay Key ID (NEXT_PUBLIC_RAZORPAY_KEY_ID)
                </label>
                <Input
                  type="text"
                  placeholder="rzp_live_xxxxxxxxxxxx or rzp_test_xxxxxxxxxxxx"
                  value={razorpayKeyId}
                  onChange={(e) => setRazorpayKeyId(e.target.value)}
                  className="font-mono text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-obsidian block mb-1">
                  Razorpay Key Secret (RAZORPAY_KEY_SECRET)
                </label>
                <Input
                  type="password"
                  placeholder="••••••••••••••••••••••••"
                  value={razorpayKeySecret}
                  onChange={(e) => setRazorpayKeySecret(e.target.value)}
                  className="font-mono text-xs"
                />
              </div>
            </div>
          </div>

          {/* Store Rules */}
          <div className="border border-obsidian/10 bg-ivory-warm p-6 space-y-4">
            <h3 className="font-serif text-base font-semibold text-obsidian uppercase flex items-center">
              <SettingsIcon className="h-5 w-5 mr-2 text-gold-500" /> General Store Settings
            </h3>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase text-obsidian block mb-1">
                  Store Currency
                </label>
                <Input type="text" value={currency} onChange={(e) => setCurrency(e.target.value)} readOnly />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase text-obsidian block mb-1">
                  Apparel GST Tax Rate (%)
                </label>
                <Input type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase text-obsidian block mb-1">
                  Free Shipping Min (₹)
                </label>
                <Input
                  type="number"
                  value={freeShippingThreshold}
                  onChange={(e) => setFreeShippingThreshold(e.target.value)}
                />
              </div>
            </div>
          </div>

          <Button type="submit" variant="gold" size="lg">
            <Save className="h-4 w-4 mr-2" /> Save Store Settings
          </Button>
        </form>
      </Container>
    </div>
  );
}
