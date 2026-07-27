import { NextResponse, type NextRequest } from "next/server";
import { razorpayService } from "@/lib/payments/razorpay-service";

export const dynamic = "force-static";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId } = body;

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json(
        { success: false, error: { message: "Missing Razorpay verification parameters" } },
        { status: 400 }
      );
    }

    const isValid = razorpayService.verifyPaymentSignature(
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    );

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: { message: "Invalid payment signature verification failed" } },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
      data: {
        orderId,
        razorpayPaymentId,
        paymentStatus: "PAID",
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: { message: "Payment verification error" } },
      { status: 500 }
    );
  }
}
