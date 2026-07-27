import { NextResponse, type NextRequest } from "next/server";

export const dynamic = "force-static";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, category, basePrice, stock, imageUrl, secretKey } = body;

    // Validate request
    if (!title || !category || !basePrice) {
      return NextResponse.json(
        { success: false, error: { message: "Missing required product parameters" } },
        { status: 400 }
      );
    }

    const createdProduct = {
      id: `prod_ext_${Date.now()}`,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title,
      category,
      basePrice: Number(basePrice),
      stock: Number(stock || 10),
      imageUrl: imageUrl || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800",
      syncedFrom: "admin.varunsatheesh.in",
      syncedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: `Product '${title}' successfully synced from admin.varunsatheesh.in`,
      data: createdProduct,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: { message: "Failed to sync product from admin portal" } },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ACTIVE",
    adminSystem: "admin.varunsatheesh.in",
    supportedCategories: ["sarees", "tshirts"],
  });
}
