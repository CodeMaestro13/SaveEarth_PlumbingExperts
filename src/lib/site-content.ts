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

const emptyCompany: CompanyContent = {
  name: "Save Earth Plumbing Experts",
  shortName: "Save Earth",
  contactPerson: "",
  phone: "",
  phoneHref: "tel:",
  whatsappHref: "#",
  email: "",
  address: "",
  hours: ""
};

function arrayOrEmpty<T>(value: unknown): T[] {
  return Array.isArray(value) ? value : [];
}

export async function getSiteContent(): Promise<SiteContent> {
  const result = await backendRequest<{ content?: Partial<SiteContent> | null }>(
    "/site-content"
  );
  const content =
    result.content && typeof result.content === "object" && !Array.isArray(result.content)
      ? result.content
      : {};
  const company =
    content.company && typeof content.company === "object"
      ? { ...emptyCompany, ...content.company }
      : emptyCompany;

  return {
    company,
    navItems: arrayOrEmpty<NavItem>(content.navItems),
    stats: arrayOrEmpty<Stat>(content.stats),
    trustItems: arrayOrEmpty(content.trustItems),
    serviceScopes: arrayOrEmpty(content.serviceScopes),
    whyChooseUs: arrayOrEmpty(content.whyChooseUs),
    serviceAreas: arrayOrEmpty<string>(content.serviceAreas),
    testimonials: arrayOrEmpty(content.testimonials),
    faqs: arrayOrEmpty<Faq>(content.faqs),
    galleryCategories: arrayOrEmpty<string>(content.galleryCategories),
    contactCards: arrayOrEmpty(content.contactCards)
  };
}
