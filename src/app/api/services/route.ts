import { NextResponse } from "next/server";
import { backendRequest } from "@/lib/backend-api";

export async function GET() {
  try {
    const data = await backendRequest<{ services: Array<Record<string, unknown>> }>("/services");

    return NextResponse.json({ services: data.services });
  } catch (error) {
    console.error("Failed to load services for popup", error);

    return NextResponse.json(
      { error: "Backend services API is unavailable.", services: [] },
      { status: 502 }
    );
  }
}
