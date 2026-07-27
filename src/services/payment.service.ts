import { RazorpayOrderResponse, RazorpayVerificationPayload } from "@/types/payment";

export interface IPaymentService {
  initiatePayment(orderId: string, amount: number): Promise<RazorpayOrderResponse>;
  verifyPayment(payload: RazorpayVerificationPayload): Promise<boolean>;
}

export class PaymentService implements IPaymentService {
  async initiatePayment(): Promise<RazorpayOrderResponse> {
    throw new Error("PaymentService not implemented in Chapter 1.");
  }

  async verifyPayment(): Promise<boolean> {
    return false;
  }
}

export const paymentService = new PaymentService();
