import type { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type Service = {
  title: string;
  description: string;
  icon?: LucideIcon;
  iconKey?: string;
  image: string;
  features: string[];
  category: string;
  slug?: string;
  sortOrder?: number;
  isActive?: boolean;
};

export type Project = {
  title: string;
  category: string;
  location: string;
  image: string;
  description: string;
  slug?: string;
  sortOrder?: number;
  isActive?: boolean;
};

export type Faq = {
  question: string;
  answer: string;
};
