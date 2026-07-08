// Transcribed from knowledge-base/data/pieces.json — the single source of truth.
// provenance "real" = verbatim from the old site's catalog pages.
// provenance "illustrative" = representative demo piece within the house's
// documented material/technique vocabulary — to be replaced with real pieces
// before launch (knowledge-base/GAPS.md #6).

export type PieceCategory =
  | "Ringe"
  | "Ohrschmuck"
  | "Halsschmuck"
  | "Armschmuck"
  | "Broschen";

export type Piece = {
  id: string;
  name: string;
  category: PieceCategory;
  image: string;
  alt: string;
  material: string;
  dimensions?: string;
  stone?: string;
  carat?: string;
  surface?: string;
  price: string;
  provenance: "real" | "illustrative";
};

export const CATEGORIES: PieceCategory[] = [
  "Ringe",
  "Ohrschmuck",
  "Halsschmuck",
  "Armschmuck",
  "Broschen",
];

export const PIECES: Piece[] = [
  {
    id: "ring-turmalin",
    name: "Strichmattierter Ring mit Turmalin",
    category: "Ringe",
    image: "/images/unikate/ring-turmalin.jpg",
    alt: "Strichmattierter Ring aus 900er Gold und 925 Silber mit indigoblauem Turmalin im Kissenschliff",
    material: "900er Gold + 925 Silber",
    dimensions: "Schiene 10 mm breit, 3 mm stark",
    stone: "Turmalin Indigo, Kissenschliff, 8 × 8 mm",
    carat: "3,51 ct",
    surface: "strichmattiert",
    price: "Preis auf Anfrage",
    provenance: "real",
  },
  {
    id: "ohrstecker-dreieck",
    name: "Punzierter Ohrstecker in Dreiecksform",
    category: "Ohrschmuck",
    image: "/images/unikate/ohrstecker-dreieck.jpg",
    alt: "Punzierte Ohrstecker in Dreiecksform aus 900 Gold und 925 Silber",
    material: "900 Gold + 925 Silber",
    dimensions: "16 × 13 mm",
    surface: "punziert",
    price: "Preis auf Anfrage",
    provenance: "real",
  },
  {
    id: "halsreif-zehnreihig",
    name: "Zehnreihiger Halsreif mit punzierten Strukturen",
    category: "Halsschmuck",
    image: "/images/unikate/halsreif-zehnreihig.jpg",
    alt: "Zehnreihiger Halsreif aus 925er Silber und 900er Gold mit punzierten Strukturen",
    material: "925er Silber + 900er Gold",
    dimensions: "45 × 42 mm · Längen 42 / 45 cm",
    surface: "punzierte Strukturen",
    price: "Preis auf Anfrage",
    provenance: "real",
  },
  {
    id: "ring-opal",
    name: "Punzierter Ring mit Opal",
    category: "Ringe",
    image: "/images/unikate/ring-opal.jpg",
    alt: "Punzierter Ring aus 925 Silber und 900 Gold mit Opal-Cabochon",
    material: "925 Silber + 900 Gold",
    dimensions: "Schiene 8 mm breit",
    stone: "Opal, Cabochon",
    surface: "punziert",
    price: "Preis auf Anfrage",
    provenance: "illustrative",
  },
  {
    id: "collier-lapislazuli",
    name: "Collier mit Lapislazuli",
    category: "Halsschmuck",
    image: "/images/unikate/collier-lapislazuli.jpg",
    alt: "Collier aus 925 Silber und 900 Gold mit tiefblauem Lapislazuli",
    material: "925 Silber + 900 Gold",
    dimensions: "Länge 45 cm",
    stone: "Lapislazuli",
    surface: "strichmattiert, punzierte Glieder",
    price: "Preis auf Anfrage",
    provenance: "illustrative",
  },
  {
    id: "ohrhaenger-perle",
    name: "Ohrhänger mit Süßwasserperlen",
    category: "Ohrschmuck",
    image: "/images/unikate/ohrhaenger-perle.jpg",
    alt: "Ohrhänger aus 925 Silber und Kupfer mit weißen Süßwasserperlen",
    material: "925 Silber + Kupfer",
    dimensions: "Länge 38 mm",
    stone: "Süßwasserperle",
    surface: "punziert",
    price: "Preis auf Anfrage",
    provenance: "illustrative",
  },
  {
    id: "armreif-kupfer",
    name: "Strichmattierter Armreif",
    category: "Armschmuck",
    image: "/images/unikate/armreif-kupfer.jpg",
    alt: "Strichmattierter Armreif aus 925 Silber und Kupfer mit punzierter Kante",
    material: "925 Silber + Kupfer",
    dimensions: "Innenmaß 60 × 55 mm",
    surface: "strichmattiert, punzierte Kante",
    price: "Preis auf Anfrage",
    provenance: "illustrative",
  },
  {
    id: "brosche-chrysopras",
    name: "Brosche mit Chrysopras",
    category: "Broschen",
    image: "/images/unikate/brosche-chrysopras.jpg",
    alt: "Punzierte Brosche aus 925 Silber und 900 Gold mit grünem Chrysopras",
    material: "925 Silber + 900 Gold",
    dimensions: "42 × 28 mm",
    stone: "Chrysopras",
    surface: "punziert, fast bildhauerisch bearbeitet",
    price: "Preis auf Anfrage",
    provenance: "illustrative",
  },
];
