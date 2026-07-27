"use client";

import * as React from "react";
import { Product, ProductVariant } from "@/types/product";
import { ProductPrice } from "./product-price";
import { Button } from "../ui/button";
import { useCart } from "@/store/cart-context";
import { useWishlist } from "@/store/wishlist-context";
import { useToast } from "../ui/toast";
import { Heart, ShoppingBag, Truck, ShieldCheck, Check } from "lucide-react";
import { Input } from "../ui/input";

interface ProductDetailInfoProps {
  product: Product;
}

export const ProductDetailInfo: React.FC<ProductDetailInfoProps> = ({ product }) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);
  const [pincode, setPincode] = React.useState("");
  const [pincodeStatus, setPincodeStatus] = React.useState<string | null>(null);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { toast } = useToast();

  const selectedVariant: ProductVariant =
    product.variants[selectedVariantIndex] || product.variants[0];

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
    toast("Added to Shopping Bag", `${product.title} has been added to your bag.`, "success");
  };

  const handlePincodeCheck = () => {
    if (!pincode || pincode.length !== 6) {
      setPincodeStatus("Please enter a valid 6-digit PIN code.");
      return;
    }
    setPincodeStatus(`Complimentary Express Shipping available for PIN ${pincode} (Delivery by 2-4 business days).`);
  };

  return (
    <div className="space-y-6 text-left">
      <div>
        <span className="text-xs font-semibold tracking-[0.25em] text-gold-600 uppercase block mb-1">
          {product.category.replace("-", " ")}
        </span>
        <h1 className="font-serif text-2xl sm:text-4xl font-semibold text-obsidian">
          {product.title}
        </h1>
        {product.subtitle && (
          <p className="mt-1 text-xs text-obsidian/60 tracking-wider uppercase font-sans">
            {product.subtitle}
          </p>
        )}
      </div>

      {/* Price */}
      <div className="pt-2 border-t border-obsidian/10">
        <ProductPrice
          price={selectedVariant.price}
          compareAtPrice={product.compareAtPrice}
          size="lg"
        />
        <p className="text-[11px] text-obsidian/50 mt-1">Inclusive of all taxes. Free shipping on orders above ₹2,999.</p>
      </div>

      {/* Fabric & Craft Details */}
      <div className="grid grid-cols-2 gap-4 border-t border-b border-obsidian/10 py-4 text-xs">
        <div>
          <span className="text-obsidian/50 block font-sans">Fabric:</span>
          <span className="font-semibold text-obsidian">{product.fabric || "Pure Silk"}</span>
        </div>
        <div>
          <span className="text-obsidian/50 block font-sans">Craftsmanship:</span>
          <span className="font-semibold text-obsidian">{product.craftDetails || "Handcrafted Zari"}</span>
        </div>
      </div>

      {/* Color Selector */}
      {product.variants.length > 1 && (
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-obsidian block">
            Color: <span className="font-normal text-gold-600">{selectedVariant.color}</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v, idx) => (
              <button
                key={v.id}
                onClick={() => setSelectedVariantIndex(idx)}
                className={`px-3 py-1.5 text-xs border uppercase tracking-wider transition-all ${
                  idx === selectedVariantIndex
                    ? "border-gold-400 bg-gold-400/10 font-semibold text-gold-700"
                    : "border-obsidian/20 text-obsidian/80 hover:border-gold-400"
                }`}
              >
                {v.color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size Selector */}
      {selectedVariant.size && (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs uppercase tracking-wider">
            <span className="font-semibold text-obsidian">
              Size: <span className="font-normal text-gold-600">{selectedVariant.size}</span>
            </span>
            <button className="text-gold-600 hover:underline">Size Guide</button>
          </div>
          <div className="flex gap-2">
            {["S", "M", "L", "XL", "Free Size"].map((s) => (
              <button
                key={s}
                className={`h-10 w-12 text-xs border uppercase tracking-wider transition-all ${
                  selectedVariant.size === s
                    ? "border-gold-400 bg-gold-400 text-obsidian font-bold"
                    : "border-obsidian/20 text-obsidian hover:border-gold-400"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center space-x-4 pt-4">
        <Button variant="gold" size="lg" className="flex-1" onClick={handleAddToCart}>
          <ShoppingBag className="h-5 w-5 mr-2" /> Add to Bag
        </Button>
        <button
          onClick={() => {
            toggleWishlist(product);
            toast(
              isWishlisted ? "Removed from Wishlist" : "Saved to Wishlist",
              product.title,
              "info"
            );
          }}
          className={`flex h-13 w-13 items-center justify-center border transition-all ${
            isWishlisted
              ? "border-red-500 bg-red-50 text-red-500"
              : "border-obsidian/20 text-obsidian hover:border-gold-400"
          }`}
          aria-label="Wishlist toggle"
        >
          <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500" : ""}`} />
        </button>
      </div>

      {/* Delivery Pincode Checker */}
      <div className="border border-obsidian/10 bg-ivory-warm p-4 space-y-3">
        <label className="text-xs font-semibold tracking-wider text-obsidian uppercase flex items-center">
          <Truck className="h-4 w-4 mr-2 text-gold-500" /> Check Delivery Availability
        </label>
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Enter 6-digit PIN Code"
            maxLength={6}
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="text-xs"
          />
          <Button variant="outline" size="sm" onClick={handlePincodeCheck}>
            Check
          </Button>
        </div>
        {pincodeStatus && (
          <p className="text-xs text-gold-700 leading-relaxed font-sans">{pincodeStatus}</p>
        )}
      </div>
    </div>
  );
};
