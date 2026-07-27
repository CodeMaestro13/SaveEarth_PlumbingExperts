import { NextResponse } from "next/server";
import { z } from "zod";
import { backendRequest } from "@/lib/backend-api";

const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(160),
  phone: z.string().trim().min(6, "Please enter a valid phone number.").max(40),
  email: z
    .string()
    .trim()
    .optional()
    .transform((value) => value || undefined)
    .pipe(z.email("Please enter a valid email address.").optional()),
  service: z
    .string()
    .trim()
    .optional()
    .transform((value) => value || undefined),
  message: z.string().trim().min(5, "Please enter a short message.").max(5000),
  source: z.enum(["popup", "contact"]),
  pagePath: z
    .string()
    .trim()
    .optional()
    .transform((value) => value || undefined)
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = leadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error:
          parsed.error.issues[0]?.message ||
          "Please check the form details and try again."
      },
      { status: 400 }
    );
  }

  const lead = parsed.data;

  try {
    await backendRequest("/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead)
    });
  } catch (error) {
    console.error("Lead save failed", error);
    return NextResponse.json(
      { error: "We could not save your enquiry right now. Please call or WhatsApp us directly." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
