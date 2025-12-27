import type { Metadata } from "next";
import { Roboto, Poppins } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import { StructuredData } from "./StructuredData";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
});

// SEO Metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://aashirsiddiqui.vercel.app"),

  title: {
    default:
      "Aashir Siddiqui - Full-Stack Developer | React, Next.js, Node.js Expert",
    template: "%s | Aashir Siddiqui",
  },

  description:
    "Full-Stack Developer specializing in React, Next.js, Node.js, and AI integration. Building modern, scalable web applications with clean architecture and powerful performance. Available for freelance projects in Karachi, Pakistan.",

  keywords: [
    "Aashir Siddiqui",
    "Full-Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "MERN Stack",
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "JavaScript Developer",
    "TypeScript Developer",
    "Python Developer",
    "AI Integration",
    "Web Development",
    "Karachi Pakistan",
    "Software Engineer",
    "UI/UX Developer",
    "API Development",
    "MongoDB",
    "Express.js",
    "GraphQL",
    "Portfolio Website",
    "Freelance Developer",
    "Web3 Developer",
    "REST API",
    "Microservices",
  ],

  authors: [
    { name: "Aashir Siddiqui", url: "https://aashirsiddiqui.vercel.app" },
  ],
  creator: "Aashir Siddiqui",
  publisher: "Aashir Siddiqui",

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

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aashirsiddiqui.vercel.app",
    title: "Aashir Siddiqui - Full-Stack Developer & Creative Engineer",
    description:
      "Full-Stack Developer specializing in React, Next.js, Node.js, and AI integration. Building modern, scalable web applications with clean architecture.",
    siteName: "Aashir Siddiqui Portfolio",
    images: [
      {
        url: "/hero-screenshot.png",
        width: 1200,
        height: 630,
        alt: "Aashir Siddiqui - Full-Stack Developer Portfolio",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Aashir Siddiqui - Full-Stack Developer & Creative Engineer",
    description:
      "Full-Stack Developer specializing in React, Next.js, Node.js, and AI integration.",
    creator: "@AashirSiddiquiX",
    images: ["/logo.png"],
  },

  alternates: {
    canonical: "https://aashirsiddiqui.vercel.app",
  },

  category: "technology",

  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data */}
        <StructuredData />

        {/* Additional SEO Meta Tags */}
        <link rel="canonical" href="https://aashirsiddiqui.vercel.app" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Theme Color */}
        <meta
          name="theme-color"
          content="#006a75"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#f5c246"
          media="(prefers-color-scheme: dark)"
        />

        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${roboto.variable} ${poppins.variable} antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
