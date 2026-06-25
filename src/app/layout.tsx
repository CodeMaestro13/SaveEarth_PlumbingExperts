import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { StickyMobileCall } from "@/components/sticky-mobile-call";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { company } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://saveearthplumbingexperts.com"),
  title: {
    default: "Save Earth Plumbing Experts | Plumbing, Waterproofing & Pool Construction",
    template: "%s | Save Earth Plumbing Experts"
  },
  description:
    "Premium plumbing, waterproofing, swimming pool construction, water body development, leak detection, and maintenance services for homes and businesses.",
  keywords: [
    "plumbing contractor",
    "waterproofing contractor",
    "swimming pool construction",
    "terrace waterproofing",
    "leak detection",
    "water body development"
  ],
  openGraph: {
    title: "Save Earth Plumbing Experts",
    description:
      "Professional plumbing, waterproofing, swimming pool construction, and water body development services.",
    url: "https://saveearthplumbingexperts.com",
    siteName: "Save Earth Plumbing Experts",
    images: [
      {
        url: "/brand/save-earth-plumbing-experts-logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Save Earth Plumbing Experts logo"
      }
    ],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Save Earth Plumbing Experts",
    description:
      "Premium plumbing, waterproofing, pool construction, and water system services."
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: company.name,
    telephone: company.phone,
    email: company.email,
    address: company.address,
    areaServed: "Maharashtra, Goa",
    serviceType:
      "Plumbing, Waterproofing, Swimming Pool Construction, Water Body Development"
  };

  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <StickyMobileCall />
      </body>
    </html>
  );
}
