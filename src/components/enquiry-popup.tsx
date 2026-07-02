"use client";

import { MessageCircle, PhoneCall, Send, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { company, services } from "@/data/site";

export function EnquiryPopup() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const closePopup = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (pathname === "/thank-you") {
      return;
    }

    const timer = window.setTimeout(() => {
      setOpen(true);
    }, 900);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePopup();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-navy/70 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-popup-title"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close enquiry form"
        onClick={closePopup}
      />
      <div className="relative max-h-[calc(100vh-3rem)] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brandBlue">
              Free site inspection
            </p>
            <h2 id="enquiry-popup-title" className="mt-1 text-2xl font-bold text-navy">
              Need plumbing or waterproofing help?
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Share your details and our team will call you back for a quick consultation.
            </p>
          </div>
          <button
            type="button"
            className="rounded-md p-2 text-slate-500 transition hover:bg-slate-100 hover:text-navy focus-ring"
            aria-label="Close enquiry form"
            onClick={closePopup}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form
          className="grid gap-4 px-5 py-5 sm:px-6"
          onSubmit={async (event) => {
            event.preventDefault();
            setSubmitting(true);
            setError("");

            const formData = new FormData(event.currentTarget);

            try {
              const response = await fetch("/api/leads", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  name: formData.get("name"),
                  phone: formData.get("phone"),
                  service: formData.get("service"),
                  message: formData.get("message"),
                  source: "popup",
                  pagePath: window.location.pathname
                })
              });

              if (!response.ok) {
                const result = await response.json().catch(() => null);
                setError(result?.error || "Something went wrong. Please try again.");
                setSubmitting(false);
                return;
              }

              router.push("/thank-you");
            } catch {
              setError("Network error. Please check your connection and try again.");
              setSubmitting(false);
            }
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-navy">
              Full Name
              <input
                required
                name="name"
                className="h-12 rounded-md border border-slate-300 px-4 text-sm font-normal focus-ring"
                placeholder="Your name"
                autoComplete="name"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-navy">
              Phone Number
              <input
                required
                name="phone"
                type="tel"
                className="h-12 rounded-md border border-slate-300 px-4 text-sm font-normal focus-ring"
                placeholder="+91"
                autoComplete="tel"
              />
            </label>
          </div>

          <label className="grid gap-2 text-sm font-semibold text-navy">
            Service Required
            <select
              name="service"
              className="h-12 rounded-md border border-slate-300 bg-white px-4 text-sm font-normal focus-ring"
              defaultValue=""
            >
              <option value="" disabled>
                Select a service
              </option>
              {services.map((service) => (
                <option key={service.title} value={service.title}>
                  {service.title}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-semibold text-navy">
            Message
            <textarea
              required
              name="message"
              rows={4}
              className="rounded-md border border-slate-300 px-4 py-3 text-sm font-normal focus-ring"
              placeholder="Tell us about the issue, site, or project scope."
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
            <Button type="submit" variant="aqua" size="lg" disabled={submitting}>
              <Send className="h-5 w-5" />
              {submitting ? "Submitting..." : "Submit Enquiry"}
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={company.phoneHref}>
                <PhoneCall className="h-5 w-5" />
                Call
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={company.whatsappHref} target="_blank" rel="noreferrer">
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </a>
            </Button>
          </div>

          {error ? (
            <p className="rounded-md bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
              {error}
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
}
