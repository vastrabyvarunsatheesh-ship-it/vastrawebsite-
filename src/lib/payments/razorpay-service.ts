import crypto from "crypto";

export interface CreateRazorpayOrderOptions {
  amountInPaise: number;
  currency?: string;
  receipt: string;
  notes?: Record<string, string>;
}

export interface RazorpayOrderResponse {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: string;
  created_at: number;
}

export class RazorpayService {
  private keyId: string;
  private keySecret: string;

  constructor() {
    this.keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_vastra2026";
    this.keySecret = process.env.RAZORPAY_KEY_SECRET || "dummy_secret_for_test_mode";
  }

  public getKeyId(): string {
    return this.keyId;
  }

  public async createOrder(options: CreateRazorpayOrderOptions): Promise<RazorpayOrderResponse> {
    // If real keys are present, call Razorpay REST API
    if (process.env.RAZORPAY_KEY_SECRET) {
      const auth = Buffer.from(`${this.keyId}:${this.keySecret}`).toString("base64");
      const res = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: options.amountInPaise,
          currency: options.currency || "INR",
          receipt: options.receipt,
          notes: options.notes,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Razorpay Order API Failed: ${errorText}`);
      }

      return await res.json();
    }

    // Simulated test order response for development
    return {
      id: `rzp_order_${Date.now()}`,
      entity: "order",
      amount: options.amountInPaise,
      amount_paid: 0,
      amount_due: options.amountInPaise,
      currency: options.currency || "INR",
      receipt: options.receipt,
      status: "created",
      created_at: Math.floor(Date.now() / 1000),
    };
  }

  public verifyPaymentSignature(
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string
  ): boolean {
    if (!this.keySecret || this.keySecret === "dummy_secret_for_test_mode") {
      // In test mode without secret key, approve simulated signatures
      return true;
    }

    const body = `${razorpayOrderId}|${razorpayPaymentId}`;
    const expectedSignature = crypto
      .createHmac("sha256", this.keySecret)
      .update(body)
      .digest("hex");

    return expectedSignature === razorpaySignature;
  }

  public verifyWebhookSignature(bodyText: string, webhookSignature: string, webhookSecret: string): boolean {
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(bodyText)
      .digest("hex");

    return expectedSignature === webhookSignature;
  }
}

export const razorpayService = new RazorpayService();
