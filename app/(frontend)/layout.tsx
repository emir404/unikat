import type { Metadata, Viewport } from "next";
import { Fraunces, EB_Garamond, Jost } from "next/font/google";
import Script from "next/script";
import { Agentation } from "agentation";
import "./globals.css";
import { SmoothScroll } from "./components/SmoothScroll";
import { getSiteContent } from "@/lib/content";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  style: ["normal", "italic"],
});

const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const c = await getSiteContent();
  return {
    title: c.meta.title,
    description: c.meta.description,
  };
}

export const viewport: Viewport = {
  themeColor: "#f4f1ea",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${garamond.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
        {process.env.NODE_ENV === "development" && <Agentation />}
        {/* Phillip, the preview agent. The dashboard is blind without this tag. */}
        <Script
          src="https://phillip-dashboard-eight.vercel.app/phillip.js"
          data-preview-id="prv_nK-6Nrfvg_nFKO9iuJ6i8"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
