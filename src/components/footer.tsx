import { Mail, MapPin, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { company, navItems, services } from "@/data/site";

export function Footer() {
  const serviceLinks = services.slice(0, 6);

  return (
    <footer className="bg-navy text-white">
      <div className="container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-4">
            <span className="relative h-14 w-48 overflow-hidden rounded-md bg-black/20 shadow-soft">
              <Image
                src="/brand/save-earth-plumbing-experts-logo.jpeg"
                alt={`${company.name} logo`}
                fill
                className="object-cover"
                sizes="192px"
              />
            </span>
          </div>
          <p className="leading-7 text-slate-300">
            Premium plumbing, waterproofing, swimming pool, and water feature
            solutions for homes, builders, facilities, and commercial properties.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-green-200">
            Company
          </h3>
          <div className="grid gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-slate-300 transition hover:text-aqua"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-green-200">
            Services
          </h3>
          <div className="grid gap-3">
            {serviceLinks.map((service) => (
              <Link
                key={service.title}
                href="/services"
                className="text-sm text-slate-300 transition hover:text-aqua"
              >
                {service.title}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-green-200">
            Contact
          </h3>
          <div className="grid gap-4 text-sm text-slate-300">
            <a href={company.phoneHref} className="flex gap-3 hover:text-aqua">
              <PhoneCall className="h-5 w-5 shrink-0 text-aqua" />
              {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className="flex gap-3 hover:text-aqua">
              <Mail className="h-5 w-5 shrink-0 text-aqua" />
              {company.email}
            </a>
            <p className="flex gap-3">
              <MapPin className="h-5 w-5 shrink-0 text-aqua" />
              {company.address}
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="container flex flex-col gap-2 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>Copyright {new Date().getFullYear()} {company.name}.</p>
          <p>Built for reliable water infrastructure and lasting protection.</p>
        </div>
      </div>
    </footer>
  );
}
