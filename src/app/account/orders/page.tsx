"use client";

import * as React from "react";
import { Container } from "@/components/common/container";
import { formatCurrency } from "@/lib/utils";
import { Package, Download, Truck, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateGSTInvoiceHTML } from "@/lib/invoices/invoice-generator";
import { Order } from "@/types/order";
import { LuxuryImage } from "@/components/common/luxury-image";

const MOCK_CUSTOMER_ORDERS: Order[] = [
  {
    id: "ord_1001",
    userId: "usr_1",
    orderNumber: "VST-2026-884910",
    subtotal: 28999,
    discountAmount: 0,
    shippingFee: 0,
    taxAmount: 1450,
    totalAmount: 28999,
    orderStatus: "SHIPPED",
    paymentStatus: "PAID",
    paymentMethod: "RAZORPAY_UPI",
    trackingNumber: "AWB-99882211-IN",
    carrierName: "Blue Dart Express",
    createdAt: "2026-07-25T10:30:00Z",
    updatedAt: "2026-07-26T14:00:00Z",
    orderItems: [
      {
        id: "item_1",
        orderId: "ord_1001",
        productId: "prod_kanjeevaram_1",
        productTitle: "Royal Crimson Kanjeevaram Pure Silk Saree",
        productSlug: "royal-crimson-kanjeevaram-pure-silk-saree",
        productImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800",
        sku: "SAR-KAN-001-RED",
        color: "Crimson Red",
        unitPrice: 28999,
        quantity: 1,
        totalPrice: 28999,
      },
    ],
  },
];

export default function CustomerOrdersPage() {
  const handleDownloadInvoice = (order: Order) => {
    const htmlContent = generateGSTInvoiceHTML(order);
    const win = window.open("", "_blank");
    if (win) {
      win.document.write(htmlContent);
      win.document.close();
      win.print();
    }
  };

  return (
    <div className="py-16 bg-ivory min-h-screen">
      <Container>
        <div className="mb-10 border-b border-obsidian/10 pb-6">
          <span className="text-[10px] font-semibold tracking-[0.3em] text-gold-600 uppercase">
            Order History
          </span>
          <h1 className="font-serif text-3xl font-bold tracking-wide text-obsidian uppercase mt-1">
            My Orders ({MOCK_CUSTOMER_ORDERS.length})
          </h1>
        </div>

        <div className="space-y-8">
          {MOCK_CUSTOMER_ORDERS.map((order) => (
            <div
              key={order.id}
              className="border border-obsidian/10 bg-ivory-warm p-6 space-y-6"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-obsidian/10 pb-4 gap-4">
                <div>
                  <div className="flex items-center space-x-3">
                    <span className="font-serif text-base font-bold text-obsidian">
                      {order.orderNumber}
                    </span>
                    <span className="px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-gold-400/20 text-gold-700 border border-gold-400/40">
                      {order.orderStatus}
                    </span>
                  </div>
                  <p className="text-[11px] text-obsidian/60 mt-1">
                    Placed on {new Date(order.createdAt).toLocaleDateString("en-IN")} • Payment: {order.paymentMethod.replace("_", " ")}
                  </p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownloadInvoice(order)}
                >
                  <Download className="h-4 w-4 mr-2 text-gold-500" /> Download GST Invoice
                </Button>
              </div>

              {/* Order Items */}
              <div className="space-y-4">
                {order.orderItems?.map((item) => (
                  <div key={item.id} className="flex space-x-4 items-center">
                    <div className="relative aspect-[3/4] w-16 shrink-0 bg-ivory-soft overflow-hidden">
                      <LuxuryImage
                        src={item.productImage}
                        alt={item.productTitle}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-serif text-xs font-semibold text-obsidian">
                        {item.productTitle}
                      </h4>
                      <p className="text-[11px] text-obsidian/60 mt-0.5">
                        Color: {item.color} • Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="font-serif text-xs font-bold text-obsidian">
                      {formatCurrency(item.totalPrice)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Progress Timeline Bar */}
              <div className="border-t border-obsidian/10 pt-4 space-y-2">
                <div className="flex justify-between text-[11px] font-semibold text-obsidian uppercase tracking-wider">
                  <span className="flex items-center text-gold-600">
                    <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Order Placed
                  </span>
                  <span className="flex items-center text-gold-600">
                    <Package className="h-3.5 w-3.5 mr-1" /> Packed
                  </span>
                  <span className="flex items-center text-gold-600">
                    <Truck className="h-3.5 w-3.5 mr-1" /> Dispatched ({order.trackingNumber})
                  </span>
                  <span className="flex items-center text-obsidian/40">
                    <Clock className="h-3.5 w-3.5 mr-1" /> Delivered
                  </span>
                </div>
                <div className="h-1.5 w-full bg-obsidian/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gold-400 w-3/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
