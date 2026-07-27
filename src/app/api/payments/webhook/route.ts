import { NextResponse, type NextRequest } from "next/server";
import { razorpayService } from "@/lib/payments/razorpay-service";

export const dynamic = "force-static";

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-razorpay-signature");
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "default_webhook_secret";

    if (signature) {
      const isValid = razorpayService.verifyWebhookSignature(rawBody, signature, webhookSecret);
      if (!isValid) {
        return NextResponse.json(
          { success: false, error: { message: "Invalid webhook signature" } },
          { status: 400 }
        );
      }
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;

    if (event === "payment.captured") {
      // Payment Captured Handler
    } else if (event === "payment.failed") {
      // Payment Failed Handler
    } else if (event === "refund.processed") {
      // Refund Processed Handler
    }

    return NextResponse.json({ success: true, message: `Webhook event '${event}' processed` });
  } catch {
    return NextResponse.json(
      { success: false, error: { message: "Webhook handler failed" } },
      { status: 500 }
    );
  }
}
