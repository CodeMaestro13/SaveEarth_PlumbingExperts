import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { CtaSection } from "@/components/cta-section";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { serviceScopes, services } from "@/data/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore plumbing works, drainage and sanitary works, pump installation, water tank works, bathroom and kitchen plumbing, waterproofing, swimming pools, fountains, and AMC services.",
  openGraph: {
    title: "Plumbing, Waterproofing, Pool & Water Body Services",
    description:
      "Detailed professional services for residential, commercial, and industrial properties."
  }
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-navy py-20 text-white md:py-28">
        <div className="container">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-aqua">
            Services
          </p>
          <h1 className="max-w-4xl text-4xl font-black md:text-6xl">
            Complete water systems, waterproofing, and pool development services.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Choose a specialist team for diagnosis, installation, repair,
            construction, and maintenance across the full lifecycle of your property.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container">
          <SectionHeading
            eyebrow="Plumbing service list"
            title="Complete plumbing, drainage, pump, tank, bathroom, and kitchen works"
            description="Our plumbing team handles new installations, upgrades, repairs, and utility connections with proper material selection, pressure testing, and clean handover."
          />
          <div className="grid gap-5 lg:grid-cols-2">
            {serviceScopes.map((scope) => (
              <article
                key={scope.title}
                className="rounded-lg border border-slate-200 bg-cloud p-6 shadow-soft"
              >
                <h2 className="text-2xl font-black text-navy">{scope.title}</h2>
                <p className="mt-3 leading-7 text-slate-600">{scope.description}</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {scope.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm font-semibold leading-6 text-slate-700"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-aqua" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-cloud">
        <div className="container">
          <SectionHeading
            eyebrow="Detailed scope"
            title="Professional services tailored to site conditions"
            description="Each service is delivered with inspection, material planning, execution supervision, testing, and clear communication."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} detailed />
            ))}
          </div>
        </div>
      </section>

      <CtaSection title="Request a site visit for the right service recommendation" />
    </>
  );
}
