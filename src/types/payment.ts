export interface RazorpayOrderResponse {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: "created" | "attempted" | "paid";
  attempts: number;
  created_at: number;
}

export interface RazorpayVerificationPayload {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface PaymentTransaction {
  id: string;
  orderId: string;
  gateway: "RAZORPAY";
  transactionId: string;
  amount: number;
  currency: "INR";
  status: "SUCCESS" | "FAILURE" | "PENDING";
  createdAt: string;
}
