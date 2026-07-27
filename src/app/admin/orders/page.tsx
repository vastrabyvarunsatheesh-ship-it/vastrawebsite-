"use client";

import * as React from "react";
import { Container } from "@/components/common/container";
import { formatCurrency } from "@/lib/utils";
import { ShoppingBag, Truck, Check, RefreshCw } from "lucide-react";
import { Select } from "@/components/ui/select";
import { useToast } from "@/components/ui/toast";

export default function AdminOrdersPage() {
  const { toast } = useToast();
  const [orderStatus, setOrderStatus] = React.useState("SHIPPED");

  const handleStatusChange = (newStatus: string) => {
    setOrderStatus(newStatus);
    toast("Order Status Updated", `Order status updated to ${newStatus}.`, "success");
  };

  return (
    <div className="py-12 bg-ivory min-h-screen">
      <Container>
        <div className="border-b border-obsidian/10 pb-6 mb-8">
          <span className="text-[10px] font-semibold tracking-[0.3em] text-gold-600 uppercase">
            Fulfillment Center
          </span>
          <h1 className="font-serif text-3xl font-bold tracking-wide text-obsidian uppercase mt-1">
            Order Management
          </h1>
        </div>

        <div className="border border-obsidian/10 bg-ivory-warm overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-obsidian/10 bg-ivory uppercase tracking-wider text-obsidian/60 font-semibold">
                <th className="p-4">Order No</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Total</th>
                <th className="p-4">Tracking AWB</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-obsidian/10 text-obsidian">
              <tr className="hover:bg-ivory/50">
                <td className="p-4 font-serif font-bold text-gold-700">VST-2026-884910</td>
                <td className="p-4">
                  <span className="font-semibold block">Varun Satheesh</span>
                  <span className="text-[10px] text-obsidian/50">Kochi, Kerala</span>
                </td>
                <td className="p-4 font-semibold text-green-700">PAID (UPI)</td>
                <td className="p-4 font-serif font-bold">{formatCurrency(28999)}</td>
                <td className="p-4 font-mono">AWB-99882211-IN</td>
                <td className="p-4">
                  <Select
                    value={orderStatus}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="w-36 text-xs"
                    options={[
                      { label: "PROCESSING", value: "PROCESSING" },
                      { label: "PACKED", value: "PACKED" },
                      { label: "SHIPPED", value: "SHIPPED" },
                      { label: "DELIVERED", value: "DELIVERED" },
                      { label: "CANCELLED", value: "CANCELLED" },
                    ]}
                  />
                </td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => toast("Refund Initiated", "Refund process triggered.", "info")}
                    className="text-xs font-semibold text-gold-600 hover:underline"
                  >
                    Refund
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
}
