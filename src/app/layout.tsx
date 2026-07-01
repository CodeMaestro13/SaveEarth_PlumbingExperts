import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { RouteChrome } from "@/components/route-chrome";
import { StickyMobileCall } from "@/components/sticky-mobile-call";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { company, serviceAreas } from "@/data/site";
import { getPublicServices } from "@/lib/content";
import { absoluteUrl, logoPath, siteName, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Plumbing, Waterproofing & Pool Construction`,
    template: `%s | ${siteName}`
  },
  description:
    "Save Earth Plumbing Experts provides plumbing, waterproofing, swimming pool construction, water body development, leak detection, and maintenance services across Hyderabad and Telangana.",
  keywords: [
    "Save Earth Plumbing Experts",
    "plumbing contractor",
    "plumbing contractor in Hyderabad",
    "waterproofing contractor",
    "waterproofing contractor in Hyderabad",
    "swimming pool construction",
    "swimming pool construction in Hyderabad",
    "terrace waterproofing",
    "leak detection",
    "water body development"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: siteName,
    description:
      "Professional plumbing, waterproofing, swimming pool construction, water body development, and maintenance services across Hyderabad and Telangana.",
    url: siteUrl,
    siteName,
    images: [
      {
        url: logoPath,
        width: 1200,
        height: 630,
        alt: `${siteName} logo`
      }
    ],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description:
      "Premium plumbing, waterproofing, pool construction, and water system services.",
    images: [logoPath]
  }
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const services = await getPublicServices();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Plumber",
    "@id": absoluteUrl("/#business"),
    name: company.name,
    url: siteUrl,
    logo: absoluteUrl(logoPath),
    image: absoluteUrl(logoPath),
    telephone: company.phone,
    email: company.email,
    priceRange: "INR",
    address: {
      "@type": "PostalAddress",
      streetAddress: "4-614, Prem Nagar, New Hafeezpet",
      postalCode: "500049",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      addressCountry: "IN"
    },
    areaServed: serviceAreas.map((area) => ({
      "@type": "Place",
      name: area
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "19:00"
      }
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Plumbing, waterproofing, pool, and water system services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          serviceType: service.category,
          areaServed: "Hyderabad and Telangana"
        }
      }))
    }
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: siteName,
    url: siteUrl,
    publisher: {
      "@id": absoluteUrl("/#business")
    }
  };

  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <RouteChrome
          publicChrome={
            <>
              <Navbar />
              <main>{children}</main>
              <Footer />
              <WhatsAppButton />
              <StickyMobileCall />
            </>
          }
        >
          {children}
        </RouteChrome>
      </body>
    </html>
  );
}
