// Transcribed from knowledge-base/data/atelier.json — the single source of truth.
// Never edit values here without updating the knowledge base first.

export const ATELIER = {
  name: "AURA – Unikatschmuck",
  shortName: "AURA",
  legalName: "Aura Schmuck Design, Inh. Petra Hübner",
  owner: "Petra Hübner",
  ownerTitle: "Goldschmiedemeisterin",
  street: "Hüxstraße 32",
  zip: "23552",
  city: "Lübeck",
  district: "Lübecker Altstadt",
  phoneDisplay: "0451 – 706 38 74",
  phoneHref: "tel:+494517063874",
  email: "info@aura-unikatschmuck.de",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=H%C3%BCxstra%C3%9Fe+32%2C+23552+L%C3%BCbeck",
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=H%C3%BCxstra%C3%9Fe%2032%2C%2023552%20L%C3%BCbeck&z=16&output=embed",
} as const;

export const NAV_LINKS = [
  { label: "UNIKATE", href: "#unikate" },
  { label: "WERKSTATT", href: "#werkstatt" },
  { label: "MEISTERIN", href: "#meisterin" },
  { label: "EHERINGE", href: "#eheringe" },
  { label: "BESUCH", href: "#besuch" },
] as const;

export const TIMELINE = [
  {
    year: "1991",
    event:
      "Schritt in die Selbstständigkeit — zunächst in Zusammenarbeit mit anderen Goldschmieden",
  },
  {
    year: "1997",
    event: "Meisterprüfung im Goldschmiedehandwerk",
  },
  {
    year: "2001",
    event: "Eröffnung des eigenen Ateliers in der Hüxstraße 32, Lübeck",
  },
] as const;
