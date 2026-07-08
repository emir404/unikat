import type { Metadata, Viewport } from "next";
import { Fraunces, EB_Garamond, Jost } from "next/font/google";
import { Agentation } from "agentation";
import "./globals.css";
import { SmoothScroll } from "./components/SmoothScroll";

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

export const metadata: Metadata = {
  title: "AURA – Unikatschmuck · Goldschmiedemeisterin Petra Hübner, Lübeck",
  description:
    "Außergewöhnlicher Unikatschmuck im Herzen Lübecks. Eigenwillige Einzelstücke in Silber + Gold oder Silber + Kupfer, punziert und fast bildhauerisch gearbeitet — Goldschmiedemeisterin Petra Hübner, Hüxstraße 32.",
};

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
      </body>
    </html>
  );
}
