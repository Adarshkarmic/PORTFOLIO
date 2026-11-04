import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://adarshkarmic.trendypixel.de"),
  title: "Adarsh Karmic — Independent Creative Technologist",
  description:
    "Explore the work of Adarsh Karmic across interactive web experiences, AI-assisted creative projects, automation, and experimental browser technology.",
  keywords: [
    "Adarsh Karmic",
    "Creative Technologist",
    "Independent Creative Technologist",
    "Trendy Pixel",
    "3D WebGL",
    "Next.js 16",
    "AI Campaigns",
    "Automation Systems",
    "AI Agents",
    "Creative Experiments",
    "Darbhanga",
    "Bihar",
    "India",
  ],
  authors: [{ name: "Adarsh Karmic", url: "https://adarshkarmic.trendypixel.de" }],
  creator: "Adarsh Karmic",
  publisher: "Adarsh Karmic",
  alternates: {
    canonical: "https://adarshkarmic.trendypixel.de",
  },
  openGraph: {
    title: "Adarsh Karmic — Independent Creative Technologist",
    description:
      "Explore the work of Adarsh Karmic across interactive web experiences, AI-assisted creative projects, automation, and experimental browser technology.",
    url: "https://adarshkarmic.trendypixel.de",
    siteName: "Adarsh Karmic — Founder's Lab",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adarsh Karmic — Independent Creative Technologist",
    description:
      "Explore the work of Adarsh Karmic across interactive web experiences, AI-assisted creative projects, automation, and experimental browser technology.",
    creator: "@adarshkarmic",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/brand/trendy_pixel_tp_symbol_vector.svg",
    shortcut: "/favicon.ico",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://adarshkarmic.trendypixel.de/#person",
      name: "Adarsh Karmic",
      jobTitle: "Independent Creative Technologist",
      description:
        "Explore the work of Adarsh Karmic across interactive web experiences, AI-assisted creative projects, automation, and experimental browser technology.",
      url: "https://adarshkarmic.trendypixel.de",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Darbhanga",
        addressRegion: "Bihar",
        addressCountry: "India",
      },
      worksFor: {
        "@type": "Organization",
        name: "Trendy Pixel",
        url: "https://trendypixel.de",
      },
      knowsAbout: [
        "Interactive 3D WebGL",
        "Next.js Architecture",
        "Generative AI Campaigns",
        "n8n Workflow Automation",
        "Conversational AI Agents",
        "Creative Technology",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://adarshkarmic.trendypixel.de/#website",
      url: "https://adarshkarmic.trendypixel.de",
      name: "Adarsh Karmic — Independent Creative Technologist",
      description:
        "Explore the work of Adarsh Karmic across interactive web experiences, AI-assisted creative projects, automation, and experimental browser technology.",
      publisher: {
        "@id": "https://adarshkarmic.trendypixel.de/#person",
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Sacramento&family=Playfair+Display:ital,wght@0,700;1,700&family=Great+Vibes&family=Inter:wght@300;400;500;600;700;800&family=Oswald:wght@500;600;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
