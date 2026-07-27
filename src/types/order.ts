import { Address } from "./user";

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "RETURNED";

export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export interface OrderItem {
  id: string;
  productId: string;
  variantId: string;
  productTitle: string;
  color: string;
  size?: string;
  image: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  shippingAddress: Address;
  subtotal: number;
  taxAmount: number;
  shippingFee: number;
  discountAmount: number;
  totalAmount: number;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: "RAZORPAY_CARD" | "RAZORPAY_UPI" | "RAZORPAY_NETBANKING" | "COD";
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}
