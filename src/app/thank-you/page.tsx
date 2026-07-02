import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Home, MessageCircle, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { company } from "@/data/site";

export const metadata: Metadata = {
  title: "Thank You | Save Earth Plumbing Experts",
  description:
    "Thank you for contacting Save Earth Plumbing Experts. Our team will get back to you shortly."
};

export default function ThankYouPage() {
  return (
    <section className="min-h-[70vh] bg-cloud py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl rounded-lg border border-slate-200 bg-white p-6 text-center shadow-soft md:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-700">
            <CheckCircle2 className="h-9 w-9" />
          </div>
          <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-brandBlue">
            Enquiry received
          </p>
          <h1 className="mt-3 text-4xl font-black text-navy md:text-5xl">
            Thank you for contacting us.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-600">
            Your details have been submitted successfully. Our team will review your
            request and call you back soon.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <Button asChild variant="aqua" size="lg">
              <a href={company.phoneHref}>
                <PhoneCall className="h-5 w-5" />
                Call Now
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={company.whatsappHref} target="_blank" rel="noreferrer">
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/">
                <Home className="h-5 w-5" />
                Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
