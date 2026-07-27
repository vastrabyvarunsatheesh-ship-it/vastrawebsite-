import { NextResponse, type NextRequest } from "next/server";
import { OrderStatus } from "@/types/order";

export const dynamic = "force-static";

export function generateStaticParams() {
  return [
    { id: "ord_1001" },
    { id: "ord_1002" },
  ];
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const orderId = resolvedParams.id;
    const body = await request.json();
    const { newStatus, trackingNumber } = body as {
      newStatus: OrderStatus;
      trackingNumber?: string;
    };

    return NextResponse.json({
      success: true,
      message: `Order ${orderId} updated to ${newStatus}.`,
      data: {
        orderId,
        newStatus,
        trackingNumber: trackingNumber || "AWB-99882211-IN",
        updatedAt: new Date().toISOString(),
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: { message: "Failed to update order status" } },
      { status: 500 }
    );
  }
}
