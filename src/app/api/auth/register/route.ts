import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { hashPassword } from "@/lib/auth/password";
import { ApiResponse } from "@/types/api";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
  phone: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = registerSchema.parse(body);

    const hashedPassword = await hashPassword(validated.password);

    const response: ApiResponse<{ id: string; email: string; name: string }> = {
      success: true,
      message: "Account registered successfully.",
      data: {
        id: `usr_${Date.now()}`,
        email: validated.email,
        name: validated.name,
      },
    };

    return NextResponse.json(response, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid input payload",
            details: err.errors,
          },
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: { code: "SERVER_ERROR", message: "Failed to register account." },
      },
      { status: 500 }
    );
  }
}
