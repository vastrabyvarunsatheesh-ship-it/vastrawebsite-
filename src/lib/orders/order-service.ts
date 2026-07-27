import { Order, OrderStatus, PaymentStatus } from "@/types/order";

export interface OrderStateTransitionResult {
  success: boolean;
  message: string;
  order?: Order;
}

export const VALID_ORDER_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  PENDING: ["PROCESSING", "CANCELLED", "FAILED"],
  PROCESSING: ["PACKED", "CANCELLED"],
  PACKED: ["SHIPPED", "CANCELLED"],
  SHIPPED: ["DELIVERED", "RETURNED"],
  DELIVERED: ["RETURNED", "REFUNDED"],
  CANCELLED: [],
  RETURNED: ["REFUNDED"],
  REFUNDED: [],
  FAILED: [],
};

export class OrderService {
  public static isValidTransition(currentStatus: OrderStatus, targetStatus: OrderStatus): boolean {
    const allowed = VALID_ORDER_TRANSITIONS[currentStatus];
    return allowed ? allowed.includes(targetStatus) : false;
  }

  public static transitionOrder(order: Order, newStatus: OrderStatus): OrderStateTransitionResult {
    if (!this.isValidTransition(order.orderStatus, newStatus)) {
      return {
        success: false,
        message: `Cannot transition order status from ${order.orderStatus} to ${newStatus}.`,
      };
    }

    let updatedPaymentStatus: PaymentStatus = order.paymentStatus;
    if (newStatus === "PROCESSING" && order.paymentStatus === "PENDING") {
      updatedPaymentStatus = "PAID";
    } else if (newStatus === "REFUNDED") {
      updatedPaymentStatus = "REFUNDED";
    }

    const updatedOrder: Order = {
      ...order,
      orderStatus: newStatus,
      paymentStatus: updatedPaymentStatus,
      updatedAt: new Date().toISOString(),
    };

    return {
      success: true,
      message: `Order status updated to ${newStatus}.`,
      order: updatedOrder,
    };
  }
}
