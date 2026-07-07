"use client";

import { Check, ChevronDown, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

type ContactServiceOption = {
  id?: number;
  title: string;
  slug?: string;
  category?: string;
};

export function ContactForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [services, setServices] = useState<ContactServiceOption[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadServices() {
      try {
        const response = await fetch("/api/services", { cache: "no-store" });
        const result = await response.json().catch(() => null);

        if (!isMounted) {
          return;
        }

        const options = Array.isArray(result?.services)
          ? result.services.map((service: ContactServiceOption) => ({
              id: service.id,
              title: service.title,
              slug: service.slug,
              category: service.category
            }))
          : [];

        setServices(options);
      } catch {
        if (isMounted) {
          setServices([]);
        }
      } finally {
        if (isMounted) {
          setLoadingServices(false);
        }
      }
    }

    loadServices();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <form
      className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-soft md:p-7"
      onSubmit={async (event) => {
        event.preventDefault();
        setSubmitting(true);
        setError("");

        const formData = new FormData(event.currentTarget);

        try {
          const response = await fetch("/api/leads", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              name: formData.get("name"),
              phone: formData.get("phone"),
              email: formData.get("email"),
              service: selectedServices.join(", "),
              message: formData.get("message"),
              source: "contact",
              pagePath: window.location.pathname
            })
          });

          if (!response.ok) {
            const result = await response.json().catch(() => null);
            setError(result?.error || "Something went wrong. Please try again.");
            setSubmitting(false);
            return;
          }

          router.push("/thank-you");
        } catch {
          setError("Network error. Please check your connection and try again.");
          setSubmitting(false);
        }
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
      <div className="grid gap-2 text-sm font-semibold text-navy" ref={dropdownRef}>
        <span>Service Required</span>
        <button
          type="button"
          className="flex min-h-12 items-center justify-between rounded-md border border-slate-300 bg-white px-4 py-3 text-left text-sm font-normal text-slate-700 focus-ring"
          onClick={() => setDropdownOpen((current) => !current)}
          disabled={loadingServices}
        >
          <span className={selectedServices.length ? "text-slate-800" : "text-slate-500"}>
            {selectedServices.length ? selectedServices.join(", ") : "Select services"}
          </span>
          <ChevronDown className={`h-4 w-4 transition ${dropdownOpen ? "rotate-180" : ""}`} />
        </button>

        {dropdownOpen ? (
          <div className="rounded-md border border-slate-200 bg-white p-2 shadow-soft">
            {loadingServices ? (
              <p className="px-2 py-2 text-sm font-normal text-slate-500">Loading services...</p>
            ) : services.length ? (
              services.map((service) => {
                const checked = selectedServices.includes(service.title);

                return (
                  <label key={service.id ?? service.title} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm font-normal text-slate-700 hover:bg-slate-50">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {
                        setSelectedServices((current) =>
                          current.includes(service.title)
                            ? current.filter((item) => item !== service.title)
                            : [...current, service.title]
                        );
                      }}
                    />
                    <span>{service.title}</span>
                    {checked ? <Check className="ml-auto h-4 w-4 text-brandBlue" /> : null}
                  </label>
                );
              })
            ) : (
              <p className="px-2 py-2 text-sm font-normal text-slate-500">No services available.</p>
            )}
          </div>
        ) : null}
      </div>
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
      <Button type="submit" variant="aqua" size="lg" disabled={submitting}>
        <Send className="h-5 w-5" />
        {submitting ? "Submitting..." : "Submit Enquiry"}
      </Button>
      {error ? (
        <p className="rounded-md bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
          {error}
        </p>
      ) : null}
    </form>
  );
}
