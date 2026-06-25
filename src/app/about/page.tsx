import type { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck, CheckCircle2 } from "lucide-react";
import { CtaSection } from "@/components/cta-section";
import { MotionReveal } from "@/components/motion-reveal";
import { SectionHeading } from "@/components/section-heading";
import { StatsSection } from "@/components/stats-section";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Save Earth Plumbing Experts, a specialist plumbing, waterproofing, swimming pool, and water body development company serving premium residential and commercial clients.",
  openGraph: {
    title: "About Save Earth Plumbing Experts",
    description:
      "A disciplined engineering partner for waterproofing, plumbing, pools, and water systems."
  }
};

export default function AboutPage() {
  const values = [
    "Technical diagnosis before recommendations",
    "Material selection suited to site conditions",
    "Clean execution with transparent updates",
    "Reliable after-service and maintenance support"
  ];

  return (
    <>
      <section className="bg-navy py-20 text-white md:py-28">
        <div className="container">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-aqua">
            About Save Earth
          </p>
          <h1 className="max-w-4xl text-4xl font-black md:text-6xl">
            Premium water infrastructure, waterproofing, and plumbing expertise.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            We help property owners, builders, facility teams, and hospitality
            businesses solve water-related construction and maintenance challenges
            with practical engineering and dependable workmanship.
          </p>
        </div>
      </section>

      <StatsSection />

      <section className="section-padding bg-white">
        <div className="container grid gap-12 lg:grid-cols-2 lg:items-center">
          <MotionReveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-premium">
              <Image
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
                alt="Save Earth Plumbing Experts team inspecting a project site"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </MotionReveal>
          <MotionReveal delay={0.08}>
            <SectionHeading
              align="left"
              eyebrow="Our approach"
              title="We build solutions that last beyond the handover"
              description="Waterproofing and plumbing failures are rarely solved by guesswork. Our process starts with diagnosis, then moves into system selection, execution planning, supervision, testing, and documented handover."
              className="mb-0"
            />
            <div className="mt-8 grid gap-4">
              {values.map((value) => (
                <div key={value} className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-aqua" />
                  <p className="font-semibold leading-7 text-slate-700">{value}</p>
                </div>
              ))}
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="section-padding bg-cloud">
        <div className="container">
          <SectionHeading
            eyebrow="What defines us"
            title="Engineering discipline with service-company responsiveness"
            description="Our clients choose us when the work needs both technical care and fast, professional coordination."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {["Inspection-led recommendations", "Premium material systems", "Clear schedules and reporting"].map((item) => (
              <div key={item} className="rounded-lg border border-slate-200 bg-white p-7 shadow-soft">
                <BadgeCheck className="mb-5 h-9 w-9 text-aqua" />
                <h2 className="text-xl font-bold text-navy">{item}</h2>
                <p className="mt-3 leading-7 text-slate-600">
                  Structured execution methods help reduce rework, protect budgets,
                  and create confidence for every stakeholder on site.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection title="Ready to discuss your site?" />
    </>
  );
}
