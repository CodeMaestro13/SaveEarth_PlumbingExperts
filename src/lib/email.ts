import "server-only";

import nodemailer from "nodemailer";
import { company } from "@/data/site";

export type LeadEmailInput = {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  message: string;
  source: "popup" | "contact";
  pagePath?: string;
};

function hasSmtpConfig() {
  return Boolean(
    process.env.SMTP_HOST?.trim() &&
      process.env.SMTP_PORT?.trim() &&
      process.env.SMTP_USER?.trim() &&
      process.env.SMTP_PASSWORD?.trim() &&
      process.env.SMTP_FROM?.trim()
  );
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendLeadNotification(lead: LeadEmailInput) {
  if (!hasSmtpConfig()) {
    return { sent: false, skipped: true };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST?.trim(),
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER?.trim(),
      pass: process.env.SMTP_PASSWORD
    }
  });

  const recipient = process.env.LEAD_NOTIFY_TO?.trim() || company.email;
  const safeEmail = lead.email || "Not provided";
  const safeService = lead.service || "Not selected";
  const safePage = lead.pagePath || "Not captured";
  const htmlLead = {
    name: escapeHtml(lead.name),
    phone: escapeHtml(lead.phone),
    email: escapeHtml(safeEmail),
    service: escapeHtml(safeService),
    source: escapeHtml(lead.source),
    page: escapeHtml(safePage),
    message: escapeHtml(lead.message)
  };

  const info = await transporter.sendMail({
    from: process.env.SMTP_FROM?.trim(),
    to: recipient,
    replyTo: lead.email || undefined,
    subject: `New ${lead.source} enquiry from ${lead.name}`,
    text: [
      "A new lead was submitted on the website.",
      "",
      `Name: ${lead.name}`,
      `Phone: ${lead.phone}`,
      `Email: ${safeEmail}`,
      `Service: ${safeService}`,
      `Source: ${lead.source}`,
      `Page: ${safePage}`,
      "",
      "Message:",
      lead.message
    ].join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; color: #10261d; line-height: 1.6;">
        <h2 style="margin: 0 0 16px;">New website enquiry</h2>
        <table cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
          <tr><td><strong>Name</strong></td><td>${htmlLead.name}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${htmlLead.phone}</td></tr>
          <tr><td><strong>Email</strong></td><td>${htmlLead.email}</td></tr>
          <tr><td><strong>Service</strong></td><td>${htmlLead.service}</td></tr>
          // <tr><td><strong>Source</strong></td><td>${htmlLead.source}</td></tr>
          // <tr><td><strong>Page</strong></td><td>${htmlLead.page}</td></tr>
        </table>
        <h3 style="margin: 20px 0 8px;">Message</h3>
        <p style="white-space: pre-line;">${htmlLead.message}</p>
      </div>
    `
  });

  return {
    sent: true,
    skipped: false,
    messageId: info.messageId,
    accepted: info.accepted,
    rejected: info.rejected
  };
}
