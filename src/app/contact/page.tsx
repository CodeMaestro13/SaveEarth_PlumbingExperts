import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { CtaSection } from "@/components/cta-section";
import { SectionHeading } from "@/components/section-heading";
import { contactCards } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Save Earth Plumbing Experts for plumbing, waterproofing, swimming pool construction, water body development, leak detection, and maintenance quotations.",
  openGraph: {
    title: "Contact Save Earth Plumbing Experts",
    description: "Request a free quote or site inspection for your water systems project."
  }
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-navy py-20 text-white md:py-28">
        <div className="container">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-aqua">
            Contact us
          </p>
          <h1 className="max-w-4xl text-4xl font-black md:text-6xl">
            Request a quote, inspection, or technical consultation.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Share your site details and our team will connect with a practical
            next step for plumbing, waterproofing, pools, or water features.
          </p>
        </div>
      </section>

      <section className="section-padding bg-cloud">
        <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Reach us"
              title="Talk to our project team"
              description="Call for urgent issues, WhatsApp photos or videos for quick context, or submit the form for a structured quotation request."
              className="mb-8"
            />
            <div className="grid gap-4">
              {contactCards.map((card) => (
                <div key={card.label} className="flex gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-green-50 text-aqua">
                    <card.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
                      {card.label}
                    </p>
                    <p className="mt-1 font-semibold leading-7 text-navy">{card.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="container">
          <div className="grid min-h-[360px] place-items-center rounded-lg border border-slate-200 bg-cloud p-8 text-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-aqua">
                Google Map
              </p>
              <h2 className="mt-3 text-3xl font-black text-navy">Office location map</h2>
              <p className="mt-4 max-w-xl leading-8 text-slate-600">
                Embed your verified Google Business Profile map here for stronger
                local trust and easier directions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaSection title="Need urgent leakage or plumbing support?" />
    </>
  );
}
