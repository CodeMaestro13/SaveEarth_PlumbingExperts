import { PhoneCall } from "lucide-react";
import { company } from "@/data/site";

export function StickyMobileCall() {
  return (
    <a
      href={company.phoneHref}
      className="fixed inset-x-0 bottom-0 z-40 flex h-14 items-center justify-center gap-2 bg-navy text-sm font-bold text-white shadow-premium md:hidden"
    >
      <PhoneCall className="h-5 w-5 text-aqua" />
      Call Now for Site Inspection
    </a>
  );
}
