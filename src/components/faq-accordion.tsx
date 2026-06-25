"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import type { Faq } from "@/types/site";

type FaqAccordionProps = {
  items: Faq[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <Accordion type="single" collapsible className="rounded-lg border border-slate-200 bg-white px-5 shadow-soft">
      {items.map((faq, index) => (
        <AccordionItem key={faq.question} value={`item-${index}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
