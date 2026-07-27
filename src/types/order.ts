export type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "PACKED"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "RETURNED"
  | "REFUNDED"
  | "FAILED";

export type PaymentStatus =
  | "PENDING"
  | "PAID"
  | "FAILED"
  | "REFUNDED"
  | "PARTIALLY_REFUNDED";

export type PaymentMethod =
  | "RAZORPAY_CARD"
  | "RAZORPAY_UPI"
  | "RAZORPAY_NETBANKING"
  | "COD";

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productTitle: string;
  productSlug: string;
  productImage: string;
  sku: string;
  color: string;
  size?: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  taxAmount: number;
  totalAmount: number;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  trackingNumber?: string;
  carrierName?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  orderItems?: OrderItem[];
}
