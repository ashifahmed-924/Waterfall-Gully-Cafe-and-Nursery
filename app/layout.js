import { Caveat, Figtree, Fraunces } from "next/font/google";
import { waterfallGully } from "@/data/waterfallGully";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

const { name, address, phone, mapsUrl, links, hours, seo } = waterfallGully;

const siteTitle = seo.title;
const siteDescription = seo.description;

export const metadata = {
  title: {
    default: siteTitle,
    template: `%s | ${waterfallGully.shortName}`,
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: seo.locale,
    siteName: name,
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

function buildJsonLd() {
  const sameAs = [links.linktree, links.facebook].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["CafeOrCoffeeShop", "GardenStore"],
        "@id": "#waterfall-gully-business",
        name,
        description: siteDescription,
        telephone: phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: address.street,
          addressLocality: address.suburb,
          addressRegion: address.state,
          postalCode: address.postcode,
          addressCountry: address.country,
        },
        hasMap: mapsUrl,
        openingHoursSpecification: hours.schema.map((block) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: block.dayOfWeek,
          opens: block.opens,
          closes: block.closes,
        })),
        sameAs,
      },
    ],
  };
}

const jsonLd = buildJsonLd();

export default function RootLayout({ children }) {
  return (
    <html
      lang="en-AU"
      className={`${fraunces.variable} ${figtree.variable} ${caveat.variable}`}
    >
      <body className="font-body antialiased bg-chalk text-basalt">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
