import { Order } from "@/types/order";

export interface IOrderService {
  createOrder(userId: string, items: unknown[], addressId: string): Promise<Order>;
  getOrderById(orderId: string): Promise<Order | null>;
  getUserOrders(userId: string): Promise<Order[]>;
}

export class OrderService implements IOrderService {
  async createOrder(): Promise<Order> {
    throw new Error("OrderService not implemented in Chapter 1.");
  }

  async getOrderById(): Promise<Order | null> {
    return null;
  }

  async getUserOrders(): Promise<Order[]> {
    return [];
  }
}

export const orderService = new OrderService();
