import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/types/site";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ServiceCardProps = {
  service: Service;
  detailed?: boolean;
};

export function ServiceCard({ service, detailed = false }: ServiceCardProps) {
  return (
    <div className="h-full transition duration-200 hover:-translate-y-1.5">
      <Card className="h-full overflow-hidden">
        <div className="relative aspect-[16/10]">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
          <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-md bg-white text-brandBlue shadow-soft">
            <service.icon className="h-5 w-5" />
          </div>
        </div>
        <CardContent className="flex h-full flex-col">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-brandBlue">
            {service.category}
          </p>
          <h3 className="text-xl font-bold text-navy">{service.title}</h3>
          <p className="mt-3 flex-1 leading-7 text-slate-600">{service.description}</p>
          {detailed ? (
            <ul className="mt-5 grid gap-2">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-brandBlue" />
                  {feature}
                </li>
              ))}
            </ul>
          ) : null}
          <Button asChild variant="outline" className="mt-6 w-full">
            <Link href="/contact">
              Request Inspection
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
