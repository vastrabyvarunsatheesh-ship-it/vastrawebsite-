"use client";

import * as React from "react";
import { Container } from "@/components/common/container";
import { AlertTriangle, Package, Layers } from "lucide-react";
import { InventoryItem } from "@/lib/inventory/inventory-service";

const MOCK_INVENTORY: InventoryItem[] = [
  {
    productId: "prod_kanjeevaram_1",
    variantId: "var_1",
    sku: "SAR-KAN-001-RED",
    availableStock: 10,
    reservedStock: 2,
    soldStock: 18,
    lowStockThreshold: 5,
  },
  {
    productId: "prod_banarasi_1",
    variantId: "var_2",
    sku: "SAR-BAN-001-GLD",
    availableStock: 3,
    reservedStock: 1,
    soldStock: 12,
    lowStockThreshold: 5,
  },
];

export default function AdminInventoryPage() {
  return (
    <div className="py-12 bg-ivory min-h-screen">
      <Container>
        <div className="border-b border-obsidian/10 pb-6 mb-8">
          <span className="text-[10px] font-semibold tracking-[0.3em] text-gold-600 uppercase">
            Stock Control
          </span>
          <h1 className="font-serif text-3xl font-bold tracking-wide text-obsidian uppercase mt-1">
            Inventory Management
          </h1>
        </div>

        <div className="border border-obsidian/10 bg-ivory-warm overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-obsidian/10 bg-ivory uppercase tracking-wider text-obsidian/60 font-semibold">
                <th className="p-4">SKU</th>
                <th className="p-4">Available Stock</th>
                <th className="p-4">Reserved</th>
                <th className="p-4">Sold</th>
                <th className="p-4">Stock Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-obsidian/10 text-obsidian">
              {MOCK_INVENTORY.map((item) => {
                const isLow = item.availableStock <= item.lowStockThreshold;
                return (
                  <tr key={item.sku} className="hover:bg-ivory/50">
                    <td className="p-4 font-mono font-bold text-gold-700">{item.sku}</td>
                    <td className="p-4 font-bold text-sm">{item.availableStock}</td>
                    <td className="p-4 text-obsidian/70">{item.reservedStock}</td>
                    <td className="p-4 font-semibold text-green-700">{item.soldStock}</td>
                    <td className="p-4">
                      {isLow ? (
                        <span className="px-2 py-0.5 text-[9px] font-bold uppercase bg-red-100 text-red-700 flex items-center w-fit">
                          <AlertTriangle className="h-3 w-3 mr-1" /> LOW STOCK
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 text-[9px] font-bold uppercase bg-green-100 text-green-700">
                          IN STOCK
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
}
