"use client";

import { Menu, PhoneCall, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { company, navItems } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-green-950/10 bg-white/95 backdrop-blur">
      <nav className="container flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex min-w-0 items-center focus-ring">
          <span className="relative h-12 w-[210px] shrink-0 overflow-hidden rounded-md bg-navy shadow-soft sm:w-[280px] lg:h-14 lg:w-[340px]">
            <Image
              src="/brand/save-earth-plumbing-experts-logo.jpeg"
              alt={`${company.name} logo`}
              fill
              priority
              className="object-contain"
              sizes="(min-width: 1024px) 340px, (min-width: 640px) 280px, 210px"
            />
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-green-50 hover:text-navy focus-ring",
                pathname === item.href && "bg-green-50 text-navy"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild variant="outline">
            <a href={company.phoneHref}>
              <PhoneCall className="h-4 w-4" />
              {company.phone}
            </a>
          </Button>
          <Button asChild variant="aqua">
            <Link href="/contact">Get Free Quote</Link>
          </Button>
        </div>

        <button
          className="rounded-md p-2 text-navy focus-ring lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-green-950/10 bg-white lg:hidden">
          <div className="container grid gap-2 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-3 text-sm font-semibold text-slate-700 focus-ring",
                  pathname === item.href && "bg-green-50 text-navy"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild variant="aqua" className="mt-2">
              <Link href="/contact" onClick={() => setOpen(false)}>
                Get Free Quote
              </Link>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
