import { NextResponse, type NextRequest } from "next/server";
import { razorpayClient } from "@/lib/razorpay";
import { ApiResponse } from "@/types/api";

export async function POST(request: NextRequest) {
  try {
    const { amount, receipt } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "INVALID_AMOUNT", message: "Order amount must be greater than zero." },
        },
        { status: 400 }
      );
    }

    const order = await razorpayClient.createOrder(amount, receipt || `rcpt_${Date.now()}`);

    const response: ApiResponse<typeof order> = {
      success: true,
      data: order,
    };

    return NextResponse.json(response);
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: { code: "PAYMENT_INIT_FAILED", message: "Failed to initiate Razorpay order." },
      },
      { status: 500 }
    );
  }
}
