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
  icon: LucideIcon;
  image: string;
  features: string[];
  category: string;
};

export type Project = {
  title: string;
  category: string;
  location: string;
  image: string;
  description: string;
};

export type Faq = {
  question: string;
  answer: string;
};
