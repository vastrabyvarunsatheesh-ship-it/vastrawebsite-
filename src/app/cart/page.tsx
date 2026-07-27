"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/common/container";
import { useCart } from "@/store/cart-context";
import { LuxuryImage } from "@/components/common/luxury-image";
import { formatCurrency } from "@/lib/utils";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/ui/empty-state";
import { useToast } from "@/components/ui/toast";

export default function CartPage() {
  const {
    cartItems,
    savedForLaterItems,
    removeFromCart,
    updateQuantity,
    saveForLater,
    moveToCartFromSaved,
    removeFromSaved,
    subtotal,
    discountAmount,
    shippingFee,
    totalAmount,
    appliedCoupon,
    couponCodeInput,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [inputCode, setInputCode] = React.useState(couponCodeInput);
  const { toast } = useToast();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode) return;
    applyCoupon(inputCode);
  };

  return (
    <div className="py-16 bg-ivory min-h-screen">
      <Container>
        <div className="mb-10 border-b border-obsidian/10 pb-6">
          <span className="text-[10px] font-semibold tracking-[0.3em] text-gold-600 uppercase">
            Order Review
          </span>
          <h1 className="font-serif text-3xl font-bold tracking-wide text-obsidian uppercase mt-1">
            Shopping Bag ({cartItems.length})
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <EmptyState
            icon={<ShoppingBag className="h-12 w-12 text-gold-400" />}
            title="Your Shopping Bag is Empty"
            description="Explore our handwoven sarees, designer kurtis, and artisanal dress materials."
            actionLabel="Explore Collections"
            onAction={() => {
              window.location.href = "/category/sarees";
            }}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Cart Items & Saved For Later */}
            <div className="lg:col-span-2 space-y-8">
              <div className="divide-y divide-obsidian/10 border-t border-b border-obsidian/10">
                {cartItems.map((item) => (
                  <div key={item.id} className="py-6 flex space-x-6 items-start">
                    <div className="relative aspect-[3/4] w-24 shrink-0 overflow-hidden bg-ivory-warm">
                      <LuxuryImage
                        src={item.variant.images[0] || "/images/placeholder-saree.jpg"}
                        alt={item.product.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between space-y-3">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-serif text-sm font-semibold text-obsidian">
                            {item.product.title}
                          </h3>
                          <span className="font-serif text-sm font-bold text-obsidian">
                            {formatCurrency(item.variant.price * item.quantity)}
                          </span>
                        </div>
                        <p className="text-xs text-obsidian/60 mt-1">
                          Color: {item.variant.color} {item.variant.size && `• Size: ${item.variant.size}`}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-obsidian/20 bg-ivory">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 hover:bg-obsidian/5 transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-3 text-xs font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 hover:bg-obsidian/5 transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <div className="flex space-x-4 text-xs">
                          <button
                            onClick={() => {
                              saveForLater(item.id);
                              toast("Saved for Later", item.product.title, "info");
                            }}
                            className="text-obsidian/60 hover:text-gold-600 flex items-center"
                          >
                            <Bookmark className="h-3.5 w-3.5 mr-1" /> Save for Later
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-obsidian/60 hover:text-red-500 flex items-center"
                          >
                            <Trash2 className="h-3.5 w-3.5 mr-1" /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Saved For Later Section */}
              {savedForLaterItems.length > 0 && (
                <div className="pt-8 border-t border-obsidian/10">
                  <h3 className="font-serif text-lg font-semibold text-obsidian uppercase mb-4">
                    Saved For Later ({savedForLaterItems.length})
                  </h3>
                  <div className="divide-y divide-obsidian/10">
                    {savedForLaterItems.map((item) => (
                      <div key={item.id} className="py-4 flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <div className="relative aspect-[3/4] w-16 overflow-hidden bg-ivory-warm">
                            <LuxuryImage
                              src={item.variant.images[0] || "/images/placeholder-saree.jpg"}
                              alt={item.product.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-serif text-xs font-semibold text-obsidian">
                              {item.product.title}
                            </h4>
                            <span className="text-xs text-gold-600 font-bold block mt-1">
                              {formatCurrency(item.variant.price)}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => moveToCartFromSaved(item.id)}
                          >
                            Move to Bag
                          </Button>
                          <button
                            onClick={() => removeFromSaved(item.id)}
                            className="text-obsidian/40 hover:text-red-500 p-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Summary & Coupon */}
            <div className="space-y-6">
              {/* Coupon Input Form */}
              <div className="border border-obsidian/10 bg-ivory-warm p-6 space-y-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-obsidian flex items-center">
                  <Tag className="h-4 w-4 mr-2 text-gold-500" /> Apply Coupon Code
                </h4>

                {appliedCoupon?.isValid ? (
                  <div className="flex justify-between items-center bg-gold-400/10 border border-gold-400/30 p-3 text-xs">
                    <div>
                      <span className="font-bold text-gold-700 block">
                        {appliedCoupon.coupon?.code} APPLIED
                      </span>
                      <span className="text-[10px] text-obsidian/60">
                        {appliedCoupon.message}
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs font-semibold text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex space-x-2">
                    <Input
                      type="text"
                      placeholder="e.g. VASTRA10"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                      className="text-xs uppercase"
                    />
                    <Button type="submit" variant="gold" size="sm">
                      Apply
                    </Button>
                  </form>
                )}
                {appliedCoupon && !appliedCoupon.isValid && (
                  <p className="text-[11px] text-red-500 mt-1">{appliedCoupon.message}</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="border border-obsidian/10 bg-ivory-warm p-6 space-y-4">
                <h4 className="font-serif text-sm font-semibold tracking-wider uppercase border-b border-obsidian/10 pb-3">
                  Order Summary
                </h4>

                <div className="space-y-2 text-xs text-obsidian/80">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold">{formatCurrency(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-gold-600 font-semibold">
                      <span>Coupon Discount</span>
                      <span>-{formatCurrency(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span>{shippingFee === 0 ? "FREE" : formatCurrency(shippingFee)}</span>
                  </div>
                </div>

                <div className="border-t border-obsidian/10 pt-4 flex justify-between items-center text-sm font-bold">
                  <span>Grand Total</span>
                  <span className="font-serif text-lg text-gold-600">
                    {formatCurrency(totalAmount)}
                  </span>
                </div>

                <Link href="/checkout">
                  <Button variant="gold" size="lg" className="w-full mt-4">
                    Proceed to Checkout <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
