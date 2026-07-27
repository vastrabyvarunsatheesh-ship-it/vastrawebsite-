"use client";

import * as React from "react";
import Link from "next/link";
import { Sheet } from "../ui/sheet";
import { useCart } from "@/store/cart-context";
import { LuxuryImage } from "../common/luxury-image";
import { formatCurrency } from "@/lib/utils";
import { Trash2, Plus, Minus, ShoppingBag, Truck } from "lucide-react";
import { Button } from "../ui/button";
import { EmptyState } from "../ui/empty-state";

export const MiniCartDrawer: React.FC = () => {
  const {
    cartItems,
    isMiniCartOpen,
    closeMiniCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    freeShippingThreshold,
    freeShippingRemaining,
  } = useCart();

  const progressPercent = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );

  return (
    <Sheet
      isOpen={isMiniCartOpen}
      onClose={closeMiniCart}
      side="right"
      title={`SHOPPING BAG (${cartItems.length})`}
    >
      {cartItems.length === 0 ? (
        <EmptyState
          icon={<ShoppingBag className="h-12 w-12 text-gold-400" />}
          title="Your Bag is Empty"
          description="Explore our Kanjeevaram sarees, designer kurtis, and artisanal dress materials."
          actionLabel="Explore Collections"
          onAction={() => {
            closeMiniCart();
          }}
        />
      ) : (
        <div className="flex flex-col justify-between h-full space-y-6">
          {/* Free Shipping Progress Bar */}
          <div className="border border-gold-400/20 bg-ivory-warm p-4 rounded space-y-2">
            <div className="flex items-center space-x-2 text-xs font-semibold text-obsidian uppercase">
              <Truck className="h-4 w-4 text-gold-500" />
              <span>
                {freeShippingRemaining === 0
                  ? "You have unlocked Free Express Shipping!"
                  : `Add ${formatCurrency(freeShippingRemaining)} more for FREE Express Shipping`}
              </span>
            </div>
            <div className="h-1.5 w-full bg-obsidian/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gold-400 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Line Items */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex space-x-4 border-b border-obsidian/10 pb-4"
              >
                <div className="relative aspect-[3/4] w-20 shrink-0 overflow-hidden bg-ivory-soft">
                  <LuxuryImage
                    src={item.variant.images[0] || "/images/placeholder-saree.jpg"}
                    alt={item.product.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between text-left">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-serif text-xs font-semibold text-obsidian line-clamp-1">
                        {item.product.title}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-obsidian/40 hover:text-red-500 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <p className="text-[10px] text-obsidian/60 mt-0.5">
                      Color: {item.variant.color} {item.variant.size && `• Size: ${item.variant.size}`}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-obsidian/20 bg-ivory">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-obsidian/5 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-obsidian/5 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    <span className="font-serif text-xs font-semibold text-obsidian">
                      {formatCurrency(item.variant.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Subtotal Footer */}
          <div className="border-t border-obsidian/10 pt-4 space-y-4">
            <div className="flex items-center justify-between text-sm font-semibold uppercase tracking-wider">
              <span>Subtotal</span>
              <span className="font-serif text-base text-gold-600 font-bold">
                {formatCurrency(subtotal)}
              </span>
            </div>
            <p className="text-[10px] text-obsidian/50">
              Taxes and shipping calculated at checkout.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <Link href="/cart" onClick={closeMiniCart}>
                <Button variant="outline" size="default" className="w-full">
                  View Bag
                </Button>
              </Link>
              <Link href="/checkout" onClick={closeMiniCart}>
                <Button variant="gold" size="default" className="w-full">
                  Checkout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </Sheet>
  );
};
