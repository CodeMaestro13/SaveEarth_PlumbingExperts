import type { Metadata } from "next";
import { CtaSection } from "@/components/cta-section";
import { GalleryFilter } from "@/components/gallery-filter";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Projects & Gallery",
  description:
    "View selected waterproofing, plumbing, swimming pool, water feature, and commercial project work from Save Earth Plumbing Experts.",
  openGraph: {
    title: "Projects & Gallery",
    description:
      "Project gallery for waterproofing, plumbing, pools, fountains, and commercial water systems."
  }
};

export default function GalleryPage() {
  return (
    <>
      <section className="bg-navy py-20 text-white md:py-28">
        <div className="container">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-aqua">
            Projects & Gallery
          </p>
          <h1 className="max-w-4xl text-4xl font-black md:text-6xl">
            Completed work across premium residential and commercial sites.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Browse representative waterproofing, plumbing, pool, fountain, and
            commercial water infrastructure projects.
          </p>
        </div>
      </section>

      <section className="section-padding bg-cloud">
        <div className="container">
          <SectionHeading
            eyebrow="Our work"
            title="Filter projects by category"
            description="Every project is planned around the site condition, usage pattern, and long-term maintenance requirement."
          />
          <GalleryFilter />
        </div>
      </section>

      <CtaSection title="Have a similar project in mind?" />
    </>
  );
}
