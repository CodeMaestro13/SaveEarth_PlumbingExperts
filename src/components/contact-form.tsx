"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { services } from "@/data/site";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-soft md:p-7"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-navy">
          Full Name
          <input
            required
            name="name"
            className="h-12 rounded-md border border-slate-300 px-4 text-sm font-normal focus-ring"
            placeholder="Your name"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-navy">
          Phone Number
          <input
            required
            name="phone"
            type="tel"
            className="h-12 rounded-md border border-slate-300 px-4 text-sm font-normal focus-ring"
            placeholder="+91"
          />
        </label>
      </div>
      <label className="grid gap-2 text-sm font-semibold text-navy">
        Email
        <input
          name="email"
          type="email"
          className="h-12 rounded-md border border-slate-300 px-4 text-sm font-normal focus-ring"
          placeholder="you@example.com"
        />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-navy">
        Service Required
        <select
          name="service"
          className="h-12 rounded-md border border-slate-300 bg-white px-4 text-sm font-normal focus-ring"
          defaultValue=""
        >
          <option value="" disabled>
            Select a service
          </option>
          {services.map((service) => (
            <option key={service.title} value={service.title}>
              {service.title}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-2 text-sm font-semibold text-navy">
        Message
        <textarea
          required
          name="message"
          rows={5}
          className="rounded-md border border-slate-300 px-4 py-3 text-sm font-normal focus-ring"
          placeholder="Tell us about the site, issue, or project scope."
        />
      </label>
      <Button type="submit" variant="aqua" size="lg">
        <Send className="h-5 w-5" />
        Submit Enquiry
      </Button>
      {sent ? (
        <p className="rounded-md bg-cyan-50 px-4 py-3 text-sm font-semibold text-cyan-800">
          Thank you. Your enquiry has been captured for this demo website.
        </p>
      ) : null}
    </form>
  );
}
