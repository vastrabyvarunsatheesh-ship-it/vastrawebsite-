"use client";

import * as React from "react";
import { Product, ProductVariant } from "@/types/product";
import { CouponValidationResult, validateAndApplyCoupon } from "@/lib/coupon/coupon-engine";

export interface CartItem {
  id: string; // unique item key: productId_variantId
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  savedForLaterItems: CartItem[];
  isMiniCartOpen: boolean;
  appliedCoupon: CouponValidationResult | null;
  couponCodeInput: string;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  totalAmount: number;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
  openMiniCart: () => void;
  closeMiniCart: () => void;
  addToCart: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  saveForLater: (itemId: string) => void;
  moveToCartFromSaved: (itemId: string) => void;
  removeFromSaved: (itemId: string) => void;
  applyCoupon: (code: string) => void;
  removeCoupon: () => void;
  clearCart: () => void;
}

const CartContext = React.createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 2999;
const STANDARD_SHIPPING_FEE = 150;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [savedForLaterItems, setSavedForLaterItems] = React.useState<CartItem[]>([]);
  const [isMiniCartOpen, setIsMiniCartOpen] = React.useState(false);
  const [appliedCoupon, setAppliedCoupon] = React.useState<CouponValidationResult | null>(null);
  const [couponCodeInput, setCouponCodeInput] = React.useState("");

  // Load from localStorage on mount
  React.useEffect(() => {
    try {
      const savedCart = localStorage.getItem("vastra_cart");
      if (savedCart) setCartItems(JSON.parse(savedCart));

      const savedLater = localStorage.getItem("vastra_saved_later");
      if (savedLater) setSavedForLaterItems(JSON.parse(savedLater));
    } catch {
      // Ignore SSR / parsing errors
    }
  }, []);

  // Save to localStorage on change
  React.useEffect(() => {
    try {
      localStorage.setItem("vastra_cart", JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  React.useEffect(() => {
    try {
      localStorage.setItem("vastra_saved_later", JSON.stringify(savedForLaterItems));
    } catch {}
  }, [savedForLaterItems]);

  const openMiniCart = () => setIsMiniCartOpen(true);
  const closeMiniCart = () => setIsMiniCartOpen(false);

  const addToCart = (product: Product, variant: ProductVariant, quantity = 1) => {
    const itemId = `${product.id}_${variant.id}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: itemId, product, variant, quantity }];
    });
    openMiniCart();
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const saveForLater = (itemId: string) => {
    const item = cartItems.find((i) => i.id === itemId);
    if (!item) return;
    removeFromCart(itemId);
    setSavedForLaterItems((prev) => [...prev, item]);
  };

  const moveToCartFromSaved = (itemId: string) => {
    const item = savedForLaterItems.find((i) => i.id === itemId);
    if (!item) return;
    setSavedForLaterItems((prev) => prev.filter((i) => i.id !== itemId));
    addToCart(item.product, item.variant, item.quantity);
  };

  const removeFromSaved = (itemId: string) => {
    setSavedForLaterItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const applyCoupon = (code: string) => {
    setCouponCodeInput(code);
    const result = validateAndApplyCoupon(code, subtotal);
    setAppliedCoupon(result);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCodeInput("");
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
    setCouponCodeInput("");
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.variant.price * item.quantity,
    0
  );

  const discountAmount = appliedCoupon?.isValid ? appliedCoupon.discountAmount : 0;
  const isFreeShipping =
    subtotal >= FREE_SHIPPING_THRESHOLD || (appliedCoupon?.isValid && appliedCoupon.isFreeShipping);

  const shippingFee = subtotal > 0 && !isFreeShipping ? STANDARD_SHIPPING_FEE : 0;
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee);

  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        savedForLaterItems,
        isMiniCartOpen,
        appliedCoupon,
        couponCodeInput,
        subtotal,
        discountAmount,
        shippingFee,
        totalAmount,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        freeShippingRemaining,
        openMiniCart,
        closeMiniCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        saveForLater,
        moveToCartFromSaved,
        removeFromSaved,
        applyCoupon,
        removeCoupon,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
