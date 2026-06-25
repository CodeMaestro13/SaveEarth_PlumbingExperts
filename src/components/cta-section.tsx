import { CalendarCheck, MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { company } from "@/data/site";

type CtaSectionProps = {
  title?: string;
  description?: string;
};

export function CtaSection({
  title = "Need a reliable water systems partner?",
  description = "Book a site inspection for waterproofing, plumbing, pool construction, water bodies, or maintenance. Our team will assess the issue and share a practical execution plan."
}: CtaSectionProps) {
  return (
    <section className="bg-navy py-16 text-white md:py-20">
      <div className="container grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-aqua">
            <CalendarCheck className="h-4 w-4" />
            Request inspection
          </p>
          <h2 className="max-w-3xl text-3xl font-black md:text-5xl">{title}</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            {description}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <Button asChild variant="aqua" size="lg">
            <Link href="/contact">Get Free Quote</Link>
          </Button>
          <Button asChild variant="white" size="lg">
            <a href={company.phoneHref}>
              <PhoneCall className="h-5 w-5" />
              Call Now
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white/30 bg-white/10 text-white hover:bg-white hover:text-navy">
            <a href={company.whatsappHref} target="_blank" rel="noreferrer">
              <MessageCircle className="h-5 w-5" />
              WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
