import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { ApiResponse } from "@/types/api";
import { Order } from "@/types/order";

export const dynamic = "force-static";

const createOrderSchema = z.object({
  customerInfo: z.object({
    email: z.string().email(),
    phone: z.string().min(10),
    fullName: z.string().min(2),
  }),
  shippingAddress: z.object({
    streetAddress: z.string().min(5),
    city: z.string().min(2),
    state: z.string().min(2),
    postalCode: z.string().min(6),
    country: z.string().default("India"),
  }),
  paymentMethod: z.enum(["RAZORPAY_CARD", "RAZORPAY_UPI", "RAZORPAY_NETBANKING", "COD"]),
  subtotal: z.number().positive(),
  totalAmount: z.number().positive(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = createOrderSchema.parse(body);

    const orderNumber = `VST-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderId = `ord_${Date.now()}`;

    const createdOrder: Partial<Order> = {
      id: orderId,
      orderNumber,
      subtotal: validated.subtotal,
      totalAmount: validated.totalAmount,
      orderStatus: "PENDING",
      paymentStatus: "PENDING",
      paymentMethod: validated.paymentMethod,
      createdAt: new Date().toISOString(),
    };

    const response: ApiResponse<typeof createdOrder> = {
      success: true,
      message: "Order placed successfully in PENDING state.",
      data: createdOrder,
    };

    return NextResponse.json(response, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid checkout payload",
            details: err.errors,
          },
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: { code: "ORDER_CREATION_FAILED", message: "Failed to create order." },
      },
      { status: 500 }
    );
  }
}
