import { NextResponse } from "next/server";
import { z } from "zod";
import { ensureLeadTables, getPool } from "@/lib/db";
import { sendLeadNotification } from "@/lib/email";

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

  const ready = await ensureLeadTables().catch((error) => {
    console.error("Lead table setup failed", error);
    return false;
  });
  const pool = getPool();

  if (!ready || !pool) {
    return NextResponse.json(
      { error: "Lead storage is not configured. Please call or WhatsApp us directly." },
      { status: 503 }
    );
  }

  const lead = parsed.data;
  const userAgent = request.headers.get("user-agent") || undefined;

  try {
    await pool.query(
      `INSERT INTO leads
        (name, phone, email, service, message, source, page_path, user_agent)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        lead.name,
        lead.phone,
        lead.email ?? null,
        lead.service ?? null,
        lead.message,
        lead.source,
        lead.pagePath ?? null,
        userAgent ?? null
      ]
    );
  } catch (error) {
    console.error("Lead save failed", error);
    return NextResponse.json(
      { error: "We could not save your enquiry right now. Please call or WhatsApp us directly." },
      { status: 500 }
    );
  }

  let emailStatus:
    | Awaited<ReturnType<typeof sendLeadNotification>>
    | { sent: false; skipped: false; error: string } = {
    sent: false,
    skipped: true
  };

  try {
    emailStatus = await sendLeadNotification(lead);
    if (emailStatus.sent) {
      console.log("Lead notification email sent", {
        messageId: emailStatus.messageId,
        accepted: emailStatus.accepted,
        rejected: emailStatus.rejected
      });
    } else {
      console.log("Lead notification email skipped: SMTP is not fully configured.");
    }
  } catch (error) {
    console.error("Lead notification email failed", error);
    emailStatus = {
      sent: false,
      skipped: false,
      error: error instanceof Error ? error.message : "Email failed"
    };
  }

  return NextResponse.json({
    ok: true,
    email:
      process.env.NODE_ENV === "production"
        ? undefined
        : {
            sent: emailStatus.sent,
            skipped: emailStatus.skipped,
            error: "error" in emailStatus ? emailStatus.error : undefined
          }
  });
}
