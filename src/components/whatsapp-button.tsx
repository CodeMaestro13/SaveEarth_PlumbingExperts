import { MessageCircle } from "lucide-react";
import { company } from "@/data/site";

export function WhatsAppButton() {
  return (
    <a
      href={company.whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-premium transition hover:scale-105 hover:bg-emerald-600 focus-ring md:bottom-6"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
