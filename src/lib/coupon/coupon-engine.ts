export interface Coupon {
  code: string;
  type: "PERCENTAGE" | "FIXED" | "FREE_SHIPPING";
  value: number;
  minSubtotal?: number;
  maxDiscount?: number;
  description: string;
}

export const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: "VASTRA10",
    type: "PERCENTAGE",
    value: 10,
    minSubtotal: 4999,
    maxDiscount: 2000,
    description: "Get 10% OFF on orders above ₹4,999",
  },
  {
    code: "ROYAL2500",
    type: "FIXED",
    value: 2500,
    minSubtotal: 19999,
    description: "Flat ₹2,500 OFF on Couture orders above ₹19,999",
  },
  {
    code: "FREESHIP",
    type: "FREE_SHIPPING",
    value: 0,
    minSubtotal: 0,
    description: "Free Express Shipping across India",
  },
];

export interface CouponValidationResult {
  isValid: boolean;
  coupon?: Coupon;
  discountAmount: number;
  isFreeShipping: boolean;
  message: string;
}

export function validateAndApplyCoupon(
  code: string,
  subtotal: number
): CouponValidationResult {
  const normalizedCode = code.trim().toUpperCase();
  const coupon = AVAILABLE_COUPONS.find((c) => c.code === normalizedCode);

  if (!coupon) {
    return {
      isValid: false,
      discountAmount: 0,
      isFreeShipping: false,
      message: "Invalid coupon code.",
    };
  }

  if (coupon.minSubtotal && subtotal < coupon.minSubtotal) {
    return {
      isValid: false,
      coupon,
      discountAmount: 0,
      isFreeShipping: false,
      message: `Minimum purchase of ₹${coupon.minSubtotal.toLocaleString("en-IN")} required for code ${coupon.code}.`,
    };
  }

  let discountAmount = 0;
  let isFreeShipping = false;

  if (coupon.type === "PERCENTAGE") {
    discountAmount = (subtotal * coupon.value) / 100;
    if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
      discountAmount = coupon.maxDiscount;
    }
  } else if (coupon.type === "FIXED") {
    discountAmount = coupon.value;
  } else if (coupon.type === "FREE_SHIPPING") {
    isFreeShipping = true;
  }

  return {
    isValid: true,
    coupon,
    discountAmount,
    isFreeShipping,
    message: `Coupon '${coupon.code}' applied successfully!`,
  };
}
