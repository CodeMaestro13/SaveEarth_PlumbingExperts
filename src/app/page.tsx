import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MapPin } from "lucide-react";
import { CtaSection } from "@/components/cta-section";
import { HeroSection } from "@/components/hero-section";
import { MotionReveal } from "@/components/motion-reveal";
import { ProjectsGrid } from "@/components/projects-grid";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { StatsSection } from "@/components/stats-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { Button } from "@/components/ui/button";
import { serviceAreas, whyChooseUs } from "@/data/site";
import { getPublicProjects, getPublicServices } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Plumbing, Waterproofing & Pool Contractor in Hyderabad",
  description:
    "Save Earth Plumbing Experts provides plumbing, waterproofing, swimming pool construction, water body development, leak detection, and maintenance for homes and commercial properties in Hyderabad.",
  path: "/",
  image: "/images/india-projects/indian-apartment-plumbing.png"
});

export default async function HomePage() {
  const [services, projects] = await Promise.all([getPublicServices(), getPublicProjects()]);

  return (
    <>
      <HeroSection />
      <StatsSection />

      <section className="section-padding bg-cloud">
        <div className="container">
          <SectionHeading
            eyebrow="Core services"
            title="Specialist solutions for water, leakage, and infrastructure needs"
            description="From preventive waterproofing to complex plumbing networks and premium pools, our execution process is built around durability, clean workmanship, and clear communication."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="default" size="lg">
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container">
          <SectionHeading
            eyebrow="Why choose us"
            title="Professional project delivery from inspection to handover"
            description="Every project begins with site understanding, practical planning, and the right materials for the environment. That discipline is what protects the finished work."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item, index) => (
              <MotionReveal key={item.title} delay={index * 0.04}>
                <div className="flex h-full gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-blue-50 text-brandBlue">
                    <item.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-navy">{item.title}</h3>
                    <p className="mt-2 leading-7 text-slate-600">
                      Reliable teams, careful supervision, and execution focused on lasting results.
                    </p>
                  </div>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-cloud">
        <div className="container">
          <SectionHeading
            eyebrow="Featured projects"
            title="Built for homes, facilities, builders, and premium properties"
            description="A selection of completed work across pool construction, waterproofing, plumbing upgrades, and water system development."
          />
          <ProjectsGrid projects={projects} />
        </div>
      </section>

      <TestimonialsSection />

      <section className="section-padding bg-white">
        <div className="container grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <SectionHeading
            align="left"
            eyebrow="Service areas"
            title="Responsive local execution across major project zones"
            description="We serve residential, commercial, hospitality, and industrial clients across Hyderabad, Secunderabad, and nearby Telangana development corridors."
            className="mb-0"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {serviceAreas.map((area) => (
              <div
                key={area}
                className="flex items-center gap-3 rounded-lg border border-slate-200 bg-cloud p-4 font-semibold text-navy"
              >
                <MapPin className="h-5 w-5 text-brandBlue" />
                {area}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cloud py-12">
        <div className="container grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {["Site inspection", "Clear quotation", "Planned execution", "Quality handover"].map((step) => (
            <div key={step} className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-soft">
              <CheckCircle2 className="h-5 w-5 text-aqua" />
              <p className="font-bold text-navy">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
