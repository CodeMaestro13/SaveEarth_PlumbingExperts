import type { Metadata } from "next";

export const siteUrl = "https://saveearthplumbingexperts.com";
export const siteName = "Save Earth Plumbing Experts";
export const logoPath =
  "https://apis.saveearthplumbing.com/uploads/static/brand/save-earth-plumbing-experts-logo.jpeg";

export const absoluteUrl = (path = "/") => {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalizedPath}`;
};

type SeoMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  image = logoPath
}: SeoMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${siteName} project work`
        }
      ],
      locale: "en_IN",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image]
    }
  };
}

export const seoRoutes = [
  {
    path: "/",
    priority: 1,
    changeFrequency: "weekly" as const
  },
  {
    path: "/about",
    priority: 0.75,
    changeFrequency: "monthly" as const
  },
  {
    path: "/services",
    priority: 0.95,
    changeFrequency: "weekly" as const
  },
  {
    path: "/gallery",
    priority: 0.8,
    changeFrequency: "monthly" as const
  },
  {
    path: "/faq",
    priority: 0.7,
    changeFrequency: "monthly" as const
  },
  {
    path: "/contact",
    priority: 0.85,
    changeFrequency: "monthly" as const
  }
];
