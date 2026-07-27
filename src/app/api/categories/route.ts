import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import { ApiResponse } from "@/types/api";

export async function GET() {
  const response: ApiResponse<typeof siteConfig.navCategories> = {
    success: true,
    data: siteConfig.navCategories,
  };

  return NextResponse.json(response);
}
