"use client";

import * as React from "react";
import { Container } from "@/components/common/container";
import { useCart } from "@/store/cart-context";
import { CheckoutProvider, useCheckout, CheckoutStep } from "@/store/checkout-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Check, ShieldCheck, Truck, CreditCard, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/toast";

function CheckoutWizard() {
  const { cartItems, subtotal, discountAmount, shippingFee, totalAmount, clearCart } = useCart();
  const {
    currentStep,
    setStep,
    customerInfo,
    setCustomerInfo,
    shippingAddress,
    setShippingAddress,
    selectedShippingMethod,
    paymentMethod,
    setPaymentMethod,
  } = useCheckout();

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [orderCreatedNumber, setOrderCreatedNumber] = React.useState<string | null>(null);

  // Address local form state
  const [streetAddress, setStreetAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [postalCode, setPostalCode] = React.useState("");

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerInfo.email || !customerInfo.phone || !customerInfo.fullName) {
      toast("Incomplete Info", "Please fill in all customer information fields.", "error");
      return;
    }
    setStep("address");
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!streetAddress || !city || !state || !postalCode) {
      toast("Incomplete Address", "Please fill in all address fields.", "error");
      return;
    }
    setShippingAddress({
      id: `addr_${Date.now()}`,
      userId: "guest",
      fullName: customerInfo.fullName,
      phone: customerInfo.phone,
      streetAddress,
      city,
      state,
      postalCode,
      country: "India",
      isDefault: true,
    });
    setStep("shipping");
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerInfo,
          shippingAddress,
          paymentMethod,
          subtotal,
          totalAmount,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setOrderCreatedNumber(data.data.orderNumber);
        clearCart();
        toast("Order Generated", `Order ${data.data.orderNumber} created in PENDING state.`, "success");
      } else {
        toast("Order Error", data.error?.message || "Failed to create order.", "error");
      }
    } catch {
      toast("Error", "Network request failed.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderCreatedNumber) {
    return (
      <div className="py-24 bg-ivory">
        <Container className="max-w-lg text-center space-y-6">
          <div className="h-16 w-16 bg-gold-400/20 text-gold-600 rounded-full flex items-center justify-center mx-auto">
            <Check className="h-8 w-8 text-gold-600" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-obsidian uppercase">Order Placed Successfully</h1>
          <p className="text-xs text-obsidian/70">
            Order Number: <strong className="text-gold-600 font-serif">{orderCreatedNumber}</strong>
          </p>
          <p className="text-xs text-obsidian/60 leading-relaxed">
            Your order has been registered in PENDING status. Proceed to Chapter 9 for Razorpay payment integration & processing.
          </p>
          <Button variant="gold" onClick={() => (window.location.href = "/")}>
            Return to Atelier
          </Button>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-12 bg-ivory min-h-screen">
      <Container>
        {/* Step Indicator Header */}
        <div className="mb-10 border-b border-obsidian/10 pb-6">
          <div className="flex justify-between items-center max-w-xl mx-auto text-xs uppercase tracking-widest font-semibold">
            <span className={currentStep === "info" ? "text-gold-600 font-bold border-b-2 border-gold-400 pb-1" : "text-obsidian/40"}>
              1. Customer Info
            </span>
            <span className={currentStep === "address" ? "text-gold-600 font-bold border-b-2 border-gold-400 pb-1" : "text-obsidian/40"}>
              2. Shipping Address
            </span>
            <span className={currentStep === "shipping" ? "text-gold-600 font-bold border-b-2 border-gold-400 pb-1" : "text-obsidian/40"}>
              3. Shipping Method
            </span>
            <span className={currentStep === "review" ? "text-gold-600 font-bold border-b-2 border-gold-400 pb-1" : "text-obsidian/40"}>
              4. Order Review
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Wizard Content */}
          <div className="lg:col-span-2">
            {/* STEP 1: CUSTOMER INFO */}
            {currentStep === "info" && (
              <form onSubmit={handleInfoSubmit} className="space-y-6 max-w-lg">
                <h3 className="font-serif text-xl font-semibold text-obsidian uppercase">
                  Customer Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider font-semibold text-obsidian block mb-1">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      value={customerInfo.fullName}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, fullName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider font-semibold text-obsidian block mb-1">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="e.g. name@example.com"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider font-semibold text-obsidian block mb-1">
                      Mobile Number
                    </label>
                    <Input
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" variant="gold" size="lg" className="w-full">
                  Continue to Shipping Address
                </Button>
              </form>
            )}

            {/* STEP 2: SHIPPING ADDRESS */}
            {currentStep === "address" && (
              <form onSubmit={handleAddressSubmit} className="space-y-6 max-w-lg">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl font-semibold text-obsidian uppercase">
                    Shipping Address
                  </h3>
                  <button
                    type="button"
                    onClick={() => setStep("info")}
                    className="text-xs text-gold-600 flex items-center"
                  >
                    <ArrowLeft className="h-3 w-3 mr-1" /> Back
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider font-semibold text-obsidian block mb-1">
                      Street Address & Landmark
                    </label>
                    <Input
                      type="text"
                      placeholder="House/Flat No., Street, Landmark"
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-wider font-semibold text-obsidian block mb-1">
                        City
                      </label>
                      <Input
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider font-semibold text-obsidian block mb-1">
                        State
                      </label>
                      <Input
                        type="text"
                        placeholder="State"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider font-semibold text-obsidian block mb-1">
                      Postal Code (PIN Code)
                    </label>
                    <Input
                      type="text"
                      placeholder="6-digit PIN code"
                      maxLength={6}
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" variant="gold" size="lg" className="w-full">
                  Continue to Shipping Method
                </Button>
              </form>
            )}

            {/* STEP 3: SHIPPING METHOD */}
            {currentStep === "shipping" && (
              <div className="space-y-6 max-w-lg">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl font-semibold text-obsidian uppercase">
                    Shipping Method
                  </h3>
                  <button
                    onClick={() => setStep("address")}
                    className="text-xs text-gold-600 flex items-center"
                  >
                    <ArrowLeft className="h-3 w-3 mr-1" /> Back
                  </button>
                </div>
                <div className="border border-obsidian/10 bg-ivory-warm p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Truck className="h-5 w-5 text-gold-500" />
                      <div>
                        <h4 className="text-xs font-semibold uppercase">{selectedShippingMethod.title}</h4>
                        <p className="text-[10px] text-obsidian/60">{selectedShippingMethod.deliveryEstimate}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-obsidian">
                      {shippingFee === 0 ? "FREE" : formatCurrency(shippingFee)}
                    </span>
                  </div>
                </div>
                <Button variant="gold" size="lg" className="w-full" onClick={() => setStep("review")}>
                  Continue to Order Review
                </Button>
              </div>
            )}

            {/* STEP 4: ORDER REVIEW & PAYMENT SELECTION */}
            {currentStep === "review" && (
              <div className="space-y-6 max-w-lg">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl font-semibold text-obsidian uppercase">
                    Payment Method & Review
                  </h3>
                  <button
                    onClick={() => setStep("shipping")}
                    className="text-xs text-gold-600 flex items-center"
                  >
                    <ArrowLeft className="h-3 w-3 mr-1" /> Back
                  </button>
                </div>

                {/* Payment Selection Stub */}
                <div className="border border-obsidian/10 bg-ivory-warm p-6 space-y-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-obsidian flex items-center">
                    <CreditCard className="h-4 w-4 mr-2 text-gold-500" /> Select Payment Option
                  </h4>
                  <div className="space-y-3 text-xs">
                    <label className="flex items-center space-x-3 p-3 border border-gold-400/40 bg-ivory cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "RAZORPAY_UPI"}
                        onChange={() => setPaymentMethod("RAZORPAY_UPI")}
                        className="accent-gold-500"
                      />
                      <span className="font-semibold text-obsidian">Razorpay Instant UPI / QR (Recommended)</span>
                    </label>
                    <label className="flex items-center space-x-3 p-3 border border-obsidian/10 bg-ivory cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "RAZORPAY_CARD"}
                        onChange={() => setPaymentMethod("RAZORPAY_CARD")}
                        className="accent-gold-500"
                      />
                      <span className="font-semibold text-obsidian">Credit / Debit Card (Razorpay)</span>
                    </label>
                    <label className="flex items-center space-x-3 p-3 border border-obsidian/10 bg-ivory cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "COD"}
                        onChange={() => setPaymentMethod("COD")}
                        className="accent-gold-500"
                      />
                      <span className="font-semibold text-obsidian">Cash on Delivery (COD)</span>
                    </label>
                  </div>
                </div>

                <Button
                  variant="gold"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                  onClick={handlePlaceOrder}
                >
                  {isSubmitting ? "Creating Order..." : "Place Order & Proceed"}
                </Button>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary Recap */}
          <div className="border border-obsidian/10 bg-ivory-warm p-6 space-y-4 h-fit">
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase border-b border-obsidian/10 pb-3">
              Order Summary ({cartItems.length} items)
            </h4>

            <div className="divide-y divide-obsidian/10 max-h-60 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.id} className="py-2 flex justify-between items-center text-xs">
                  <div>
                    <h5 className="font-semibold text-obsidian line-clamp-1">{item.product.title}</h5>
                    <span className="text-[10px] text-obsidian/60">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-semibold text-obsidian">
                    {formatCurrency(item.variant.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-obsidian/10 pt-3 space-y-2 text-xs text-obsidian/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-gold-600 font-semibold">
                  <span>Discount</span>
                  <span>-{formatCurrency(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? "FREE" : formatCurrency(shippingFee)}</span>
              </div>
            </div>

            <div className="border-t border-obsidian/10 pt-4 flex justify-between items-center text-sm font-bold">
              <span>Total Payable</span>
              <span className="font-serif text-lg text-gold-600">
                {formatCurrency(totalAmount)}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <CheckoutProvider>
      <CheckoutWizard />
    </CheckoutProvider>
  );
}
