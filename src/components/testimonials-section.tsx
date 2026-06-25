import { Quote } from "lucide-react";
import { MotionReveal } from "@/components/motion-reveal";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { testimonials } from "@/data/site";

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-cloud">
      <div className="container">
        <SectionHeading
          eyebrow="Client confidence"
          title="Trusted by homeowners, builders, and facility teams"
          description="Our work is measured by leak-free spaces, reliable systems, clean execution, and clients who call us again for the next property."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <MotionReveal key={testimonial.name} delay={index * 0.06}>
              <Card className="h-full">
                <CardContent>
                  <Quote className="mb-5 h-8 w-8 text-aqua" />
                  <p className="leading-8 text-slate-700">"{testimonial.quote}"</p>
                  <div className="mt-6 border-t border-slate-200 pt-5">
                    <p className="font-bold text-navy">{testimonial.name}</p>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
