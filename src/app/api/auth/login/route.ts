import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { generateSessionToken } from "@/lib/auth/session";
import { ApiResponse } from "@/types/api";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = loginSchema.parse(body);

    const token = generateSessionToken();

    const response = NextResponse.json<ApiResponse<{ token: string }>>({
      success: true,
      message: "Logged in successfully.",
      data: { token },
    });

    response.cookies.set("vastra_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });

    return response;
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid login payload",
            details: err.errors,
          },
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: { code: "UNAUTHORIZED", message: "Invalid email or password." },
      },
      { status: 401 }
    );
  }
}
