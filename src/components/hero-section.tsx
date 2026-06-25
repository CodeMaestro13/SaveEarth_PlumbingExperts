import { ArrowRight, MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { HeroBackgroundSlider } from "@/components/hero-background-slider";
import { MotionReveal } from "@/components/motion-reveal";
import { Button } from "@/components/ui/button";
import { company, stats } from "@/data/site";

type HeroSectionProps = {
  title?: string;
  description?: string;
  image?: string;
  eyebrow?: string;
};

const backgroundSlides = [
  {
    title: "Professional plumbing installation",
    image: "/images/india-projects/indian-apartment-plumbing.png"
  },
  {
    title: "Swimming pool construction and design",
    image: "/images/india-projects/indian-pool-construction.png"
  },
  {
    title: "Terrace waterproofing project",
    image: "/images/india-projects/indian-terrace-waterproofing.png"
  },
  {
    title: "Water body and fountain development",
    image: "/images/india-projects/indian-water-feature-installation.png"
  },
  {
    title: "Commercial water infrastructure work",
    image: "/images/india-projects/indian-pump-room-maintenance.png"
  }
];

export function HeroSection({
  eyebrow = "Save water. Protect property.",
  title = "Professional Plumbing & Waterproofing Solutions",
  description = "Save Earth Plumbing Experts delivers premium waterproofing, plumbing, swimming pool construction, and water body development services with disciplined execution and dependable after-service.",
  image
}: HeroSectionProps) {
  const slides = image ? [{ title: "Project background", image }] : backgroundSlides;

  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <HeroBackgroundSlider slides={slides} />
      <div className="container relative grid min-h-[calc(100vh-5rem)] items-center gap-10 py-16 md:min-h-[720px] lg:grid-cols-[1.08fr_0.92fr]">
        <MotionReveal>
          <p className="mb-5 inline-flex rounded-md bg-white/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.18em] text-green-200">
            {eyebrow}
          </p>
          <h1 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl">
            {description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="aqua" size="lg">
              <Link href="/contact">
                Get Free Quote
                <ArrowRight className="h-5 w-5" />
              </Link>
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
        </MotionReveal>

        <MotionReveal delay={0.12} className="grid grid-cols-2 gap-3 md:gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur"
            >
              <p className="text-3xl font-black text-aqua md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-200">
                {stat.label}
              </p>
            </div>
          ))}
        </MotionReveal>
      </div>
    </section>
  );
}
