import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";
import { CtaSection } from "@/components/cta-section";
import { FaqAccordion } from "@/components/faq-accordion";
import { SectionHeading } from "@/components/section-heading";
import { faqs } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about waterproofing, plumbing, leak detection, swimming pool construction, maintenance contracts, warranties, and site inspections.",
  path: "/faq"
});

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "FAQ", href: "/faq" }
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className="bg-navy py-20 text-white md:py-28">
        <div className="container">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-aqua">
            FAQ
          </p>
          <h1 className="max-w-4xl text-4xl font-black md:text-6xl">
            Clear answers before you book an inspection.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Learn how we inspect, recommend, execute, test, and maintain plumbing,
            waterproofing, swimming pools, and water systems.
          </p>
        </div>
      </section>

      <section className="section-padding bg-cloud">
        <div className="container max-w-4xl">
          <SectionHeading
            eyebrow="Questions"
            title="Frequently asked questions"
            description="If your site has a unique leakage, plumbing, or water body challenge, our team can inspect and recommend the correct next step."
          />
          <FaqAccordion items={faqs} />
        </div>
      </section>

      <CtaSection title="Still deciding? Speak with a specialist." />
    </>
  );
}
