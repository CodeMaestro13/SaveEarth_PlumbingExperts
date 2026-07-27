import "server-only";

import { backendRequest } from "@/lib/backend-api";
import type { Faq, NavItem, Stat } from "@/types/site";

export type CompanyContent = {
  name: string;
  shortName: string;
  contactPerson: string;
  phone: string;
  phoneHref: string;
  whatsappHref: string;
  email: string;
  address: string;
  hours: string;
};

export type SiteContent = {
  company: CompanyContent;
  navItems: NavItem[];
  stats: Stat[];
  trustItems: Array<{ title: string; iconKey: string }>;
  serviceScopes: Array<{ title: string; description: string; items: string[] }>;
  whyChooseUs: Array<{ title: string; iconKey: string }>;
  serviceAreas: string[];
  testimonials: Array<{ name: string; role: string; quote: string }>;
  faqs: Faq[];
  galleryCategories: string[];
  contactCards: Array<{ label: string; value: string; iconKey: string }>;
};

export async function getSiteContent(): Promise<SiteContent> {
  const result = await backendRequest<{ content: SiteContent }>("/site-content");
  return result.content;
}
