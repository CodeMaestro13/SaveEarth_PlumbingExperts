import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { StickyMobileCall } from "@/components/sticky-mobile-call";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { company } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://aquabuildengineering.com"),
  title: {
    default: "AquaBuild Engineering | Plumbing, Waterproofing & Pool Construction",
    template: "%s | AquaBuild Engineering"
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
    title: "AquaBuild Engineering",
    description:
      "Professional plumbing, waterproofing, swimming pool construction, and water body development services.",
    url: "https://aquabuildengineering.com",
    siteName: "AquaBuild Engineering",
    images: [
      {
        url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "AquaBuild Engineering project site"
      }
    ],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "AquaBuild Engineering",
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
