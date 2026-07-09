/**
 * Default site content — the single fallback source used when the CMS has no
 * value for a field (e.g. an empty database). Mirrors the shape returned by
 * `getSiteContent()` so the frontend always renders, CMS or not.
 *
 * Heading strings use an accent convention: wrap accent word(s) in *asterisks*
 * (e.g. "Silber + *Gold.*"); newlines separate animated lines.
 */

export type Img = { src: string; alt: string };

export type PieceCategory =
  | "Ringe"
  | "Ohrschmuck"
  | "Halsschmuck"
  | "Armschmuck"
  | "Broschen";

export const CATEGORIES: PieceCategory[] = [
  "Ringe",
  "Ohrschmuck",
  "Halsschmuck",
  "Armschmuck",
  "Broschen",
];

export type PieceHero = {
  image: Img;
  shortName: string;
  spec: string;
  objectPosition: string;
  tint: string;
};

export type Piece = {
  id: string;
  name: string;
  category: PieceCategory;
  image: Img;
  material: string;
  dimensions?: string;
  stone?: string;
  carat?: string;
  surface?: string;
  price: string;
  provenance: "real" | "illustrative";
  inHero: boolean;
  hero?: PieceHero;
};

export type HeroSlide = {
  id: string;
  image: Img;
  shortName: string;
  spec: string;
  objectPosition: string;
  tint: string;
  material: string;
  surface?: string;
};

/** Build the hero carousel slides from the catalog pieces flagged for the hero. */
export function toHeroSlides(pieces: Piece[]): HeroSlide[] {
  return pieces
    .filter((p) => p.inHero && p.hero)
    .map((p) => ({
      id: p.id,
      image: p.hero!.image,
      shortName: p.hero!.shortName,
      spec: p.hero!.spec,
      objectPosition: p.hero!.objectPosition,
      tint: p.hero!.tint,
      material: p.material,
      surface: p.surface,
    }));
}

export type Atelier = {
  name: string;
  shortName: string;
  legalName: string;
  owner: string;
  ownerTitle: string;
  street: string;
  zip: string;
  city: string;
  district: string;
  phoneDisplay: string;
  phoneHref: string;
  email: string;
  mapsUrl: string;
  mapsEmbedUrl: string;
};

export type NavLink = { label: string; href: string };
export type TimelineEntry = { year: string; event: string };
export type HourEntry = {
  weekday: number;
  day: string;
  time: string;
  openStart: number | null;
  openEnd: number | null;
};

export type HeroContent = {
  eyebrow: string;
  headline: string;
  ctaPrimary: string;
  ctaSecondary: string;
  hoursShort: string;
  footnote: string;
};

export type ZweifarbigkeitContent = {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  techniques: { name: string; text: string }[];
  imageGold: Img;
  imageKupfer: Img;
  imageBand: Img;
  bandCaptionLeft: string;
  bandCaptionRight: string;
};

export type UnikateContent = {
  eyebrow: string;
  heading: string;
  intro: string;
  enquiry: string;
};

export type WerkstattContent = {
  eyebrow: string;
  heading: string;
  intro: string;
  steps: { title: string; text: string }[];
  quote: string;
  quoteAttribution: string;
  imageWerkbank: Img;
  imageHaende: Img;
};

export type MeisterinContent = {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  image: Img;
  imageCaptionLeft: string;
  imageCaptionRight: string;
  stats: { value: string; label: string }[];
};

export type EheringeContent = {
  eyebrow: string;
  heading: string;
  intro: string;
  steps: { title: string; text: string }[];
  ctaLabel: string;
  imagePair: Img;
  imageDetail: Img;
};

export type BesuchContent = {
  eyebrow: string;
  heading: string;
  phoneEyebrow: string;
  hoursHeading: string;
  image: Img;
  imageCaptionLeft: string;
  imageCaptionRight: string;
};

export type FooterContent = {
  strapline: string;
  hoursSummary: { days: string; time: string }[];
};

export type SiteContent = {
  meta: { title: string; description: string };
  atelier: Atelier;
  nav: NavLink[];
  timeline: TimelineEntry[];
  hours: HourEntry[];
  hoursNote: string;
  footer: FooterContent;
  hero: HeroContent;
  zweifarbigkeit: ZweifarbigkeitContent;
  unikate: UnikateContent;
  werkstatt: WerkstattContent;
  meisterin: MeisterinContent;
  eheringe: EheringeContent;
  besuch: BesuchContent;
  pieces: Piece[];
};

export const DEFAULT_ATELIER: Atelier = {
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
};

export const DEFAULT_NAV: NavLink[] = [
  { label: "UNIKATE", href: "#unikate" },
  { label: "WERKSTATT", href: "#werkstatt" },
  { label: "MEISTERIN", href: "#meisterin" },
  { label: "EHERINGE", href: "#eheringe" },
  { label: "BESUCH", href: "#besuch" },
];

export const DEFAULT_TIMELINE: TimelineEntry[] = [
  {
    year: "1991",
    event:
      "Schritt in die Selbstständigkeit — zunächst in Zusammenarbeit mit anderen Goldschmieden",
  },
  { year: "1997", event: "Meisterprüfung im Goldschmiedehandwerk" },
  {
    year: "2001",
    event: "Eröffnung des eigenen Ateliers in der Hüxstraße 32, Lübeck",
  },
];

export const DEFAULT_HOURS: HourEntry[] = [
  { weekday: 1, day: "Montag", time: "Nach Vereinbarung", openStart: null, openEnd: null },
  { weekday: 2, day: "Dienstag", time: "Nach Vereinbarung", openStart: null, openEnd: null },
  { weekday: 3, day: "Mittwoch", time: "Nach Vereinbarung", openStart: null, openEnd: null },
  { weekday: 4, day: "Donnerstag", time: "10:00 – 18:00", openStart: 600, openEnd: 1080 },
  { weekday: 5, day: "Freitag", time: "10:00 – 18:00", openStart: 600, openEnd: 1080 },
  { weekday: 6, day: "Samstag", time: "10:00 – 14:00", openStart: 600, openEnd: 840 },
  { weekday: 0, day: "Sonntag", time: "Geschlossen", openStart: null, openEnd: null },
];

export const DEFAULT_HOURS_NOTE =
  "… und jederzeit nach telefonischer oder persönlicher Vereinbarung.";

export const DEFAULT_PIECES: Piece[] = [
  {
    id: "ring-turmalin",
    name: "Strichmattierter Ring mit Turmalin",
    category: "Ringe",
    image: {
      src: "/images/unikate/ring-turmalin.jpg",
      alt: "Strichmattierter Ring aus 900er Gold und 925 Silber mit indigoblauem Turmalin im Kissenschliff",
    },
    material: "900er Gold + 925 Silber",
    dimensions: "Schiene 10 mm breit, 3 mm stark",
    stone: "Turmalin Indigo, Kissenschliff, 8 × 8 mm",
    carat: "3,51 ct",
    surface: "strichmattiert",
    price: "Preis auf Anfrage",
    provenance: "real",
    inHero: true,
    hero: {
      image: {
        src: "/images/hero/hero-atmo.jpg",
        alt: "Unikat von Petra Hübner: strichmattierter Ring aus Silber und Gold mit indigoblauem Turmalin, auf dunklem Schiefer im warmen Licht",
      },
      shortName: "Ring mit Turmalin",
      spec: "3,51 ct",
      objectPosition: "68% center",
      tint: "bg-ink/55 sm:bg-ink/30",
    },
  },
  {
    id: "ohrstecker-dreieck",
    name: "Punzierter Ohrstecker in Dreiecksform",
    category: "Ohrschmuck",
    image: {
      src: "/images/unikate/ohrstecker-dreieck.jpg",
      alt: "Punzierte Ohrstecker in Dreiecksform aus 900 Gold und 925 Silber",
    },
    material: "900 Gold + 925 Silber",
    dimensions: "16 × 13 mm",
    surface: "punziert",
    price: "Preis auf Anfrage",
    provenance: "real",
    inHero: true,
    hero: {
      image: {
        src: "/images/hero/hero-ohrstecker.jpg",
        alt: "Unikat von Petra Hübner: punzierte Ohrstecker in Dreiecksform aus Gold und Silber, auf dunklem Schiefer im warmen Licht",
      },
      shortName: "Punzierter Ohrstecker",
      spec: "16 × 13 mm",
      objectPosition: "62% 45%",
      tint: "bg-ink/60 sm:bg-ink/40",
    },
  },
  {
    id: "halsreif-zehnreihig",
    name: "Zehnreihiger Halsreif mit punzierten Strukturen",
    category: "Halsschmuck",
    image: {
      src: "/images/unikate/halsreif-zehnreihig.jpg",
      alt: "Zehnreihiger Halsreif aus 925er Silber und 900er Gold mit punzierten Strukturen",
    },
    material: "925er Silber + 900er Gold",
    dimensions: "45 × 42 mm · Längen 42 / 45 cm",
    surface: "punzierte Strukturen",
    price: "Preis auf Anfrage",
    provenance: "real",
    inHero: true,
    hero: {
      image: {
        src: "/images/hero/hero-halsreif.jpg",
        alt: "Unikat von Petra Hübner: zehnreihiger Halsreif aus Silber mit punziertem Goldelement, auf dunklem Schiefer im warmen Licht",
      },
      shortName: "Zehnreihiger Halsreif",
      spec: "42 / 45 cm",
      objectPosition: "60% center",
      tint: "bg-ink/60 sm:bg-ink/40",
    },
  },
  {
    id: "ring-opal",
    name: "Punzierter Ring mit Opal",
    category: "Ringe",
    image: {
      src: "/images/unikate/ring-opal.jpg",
      alt: "Punzierter Ring aus 925 Silber und 900 Gold mit Opal-Cabochon",
    },
    material: "925 Silber + 900 Gold",
    dimensions: "Schiene 8 mm breit",
    stone: "Opal, Cabochon",
    surface: "punziert",
    price: "Preis auf Anfrage",
    provenance: "illustrative",
    inHero: false,
  },
  {
    id: "collier-lapislazuli",
    name: "Collier mit Lapislazuli",
    category: "Halsschmuck",
    image: {
      src: "/images/unikate/collier-lapislazuli.jpg",
      alt: "Collier aus 925 Silber und 900 Gold mit tiefblauem Lapislazuli",
    },
    material: "925 Silber + 900 Gold",
    dimensions: "Länge 45 cm",
    stone: "Lapislazuli",
    surface: "strichmattiert, punzierte Glieder",
    price: "Preis auf Anfrage",
    provenance: "illustrative",
    inHero: false,
  },
  {
    id: "ohrhaenger-perle",
    name: "Ohrhänger mit Süßwasserperlen",
    category: "Ohrschmuck",
    image: {
      src: "/images/unikate/ohrhaenger-perle.jpg",
      alt: "Ohrhänger aus 925 Silber und Kupfer mit weißen Süßwasserperlen",
    },
    material: "925 Silber + Kupfer",
    dimensions: "Länge 38 mm",
    stone: "Süßwasserperle",
    surface: "punziert",
    price: "Preis auf Anfrage",
    provenance: "illustrative",
    inHero: false,
  },
  {
    id: "armreif-kupfer",
    name: "Strichmattierter Armreif",
    category: "Armschmuck",
    image: {
      src: "/images/unikate/armreif-kupfer.jpg",
      alt: "Strichmattierter Armreif aus 925 Silber und Kupfer mit punzierter Kante",
    },
    material: "925 Silber + Kupfer",
    dimensions: "Innenmaß 60 × 55 mm",
    surface: "strichmattiert, punzierte Kante",
    price: "Preis auf Anfrage",
    provenance: "illustrative",
    inHero: false,
  },
  {
    id: "brosche-chrysopras",
    name: "Brosche mit Chrysopras",
    category: "Broschen",
    image: {
      src: "/images/unikate/brosche-chrysopras.jpg",
      alt: "Punzierte Brosche aus 925 Silber und 900 Gold mit grünem Chrysopras",
    },
    material: "925 Silber + 900 Gold",
    dimensions: "42 × 28 mm",
    stone: "Chrysopras",
    surface: "punziert, fast bildhauerisch bearbeitet",
    price: "Preis auf Anfrage",
    provenance: "illustrative",
    inHero: false,
  },
];

export const DEFAULTS: SiteContent = {
  meta: {
    title:
      "AURA – Unikatschmuck · Goldschmiedemeisterin Petra Hübner, Lübeck",
    description:
      "Außergewöhnlicher Unikatschmuck im Herzen Lübecks. Eigenwillige Einzelstücke in Silber + Gold oder Silber + Kupfer, punziert und fast bildhauerisch gearbeitet — Goldschmiedemeisterin Petra Hübner, Hüxstraße 32.",
  },
  atelier: DEFAULT_ATELIER,
  nav: DEFAULT_NAV,
  timeline: DEFAULT_TIMELINE,
  hours: DEFAULT_HOURS,
  hoursNote: DEFAULT_HOURS_NOTE,
  footer: {
    strapline: "Außergewöhnlicher Unikatschmuck im Herzen Lübecks",
    hoursSummary: [
      { days: "Donnerstag + Freitag", time: "10:00 – 18:00" },
      { days: "Samstag", time: "10:00 – 14:00" },
      { days: "Mo – Mi & sonst", time: "Nach Vereinbarung" },
    ],
  },
  hero: {
    eyebrow: "Goldschmiedemeisterin Petra Hübner · Lübeck",
    headline: "Schmuck, den es\nnur *einmal* gibt.",
    ctaPrimary: "Unikate entdecken",
    ctaSecondary: "Termin",
    hoursShort: "Do + Fr 10–18 · Sa 10–14 · n. Vereinbarung",
    footnote: "Goldschmiede-Atelier seit 2001",
  },
  zweifarbigkeit: {
    eyebrow: "Die Signatur",
    heading: "Silber + *Gold.*\nSilber + *Kupfer.*",
    paragraphs: [
      "Die charakteristische Zweifarbigkeit ist die Handschrift des Hauses: eigenwillige Schmuckstücke, in denen zwei Metalle zueinanderfinden — verbunden in einer fast bildhauerischen Bearbeitung.",
      "Geprägt wird jede Oberfläche vom Punzieren: von Hand gesetzte Schlagmarken, Feld um Feld, bis das Metall lebt. Dazu hochwertige Edelsteine — Turmalin, Opal, Lapislazuli — gefasst in Gold.",
    ],
    techniques: [
      {
        name: "Zweifarbigkeit",
        text: "Silber trifft Gold oder Kupfer — zwei Metalle, in einem Stück verbunden. Die Naht ist kein Übergang, sondern die Zeichnung.",
      },
      {
        name: "Punzieren",
        text: "Punze um Punze von Hand gesetzt: Felder kleiner Schlagmarken, die das Licht brechen und jeder Oberfläche ihren eigenen Rhythmus geben.",
      },
      {
        name: "Strichmattierung",
        text: "Fein gebürstete, seidenmatte Flächen — ruhig neben dem Glanz des polierten Metalls, Struktur statt Spiegel.",
      },
    ],
    imageGold: {
      src: "/images/zweifarbigkeit/detail-gold.jpg",
      alt: "Makroaufnahme der Naht zwischen strichmattiertem Silber und poliertem Gold",
    },
    imageKupfer: {
      src: "/images/zweifarbigkeit/detail-kupfer.jpg",
      alt: "Punzierte Silberoberfläche mit warm glänzendem Kupfer",
    },
    imageBand: {
      src: "/images/zweifarbigkeit/band.jpg",
      alt: "Fünf zweifarbige Schmuckstücke auf dunklem Schiefer, von oben fotografiert",
    },
    bandCaptionLeft: "Aus dem Atelier — fünf Unikate",
    bandCaptionRight: "Silber · Gold · Kupfer",
  },
  unikate: {
    eyebrow: "Die Unikate",
    heading: "Jedes Stück\ngenau einmal.",
    intro:
      "Kein Stück wird wiederholt. Was hier gezeigt wird, steht stellvertretend für das, was am Werkbrett entsteht — und wieder anders sein wird.",
    enquiry:
      "Ein Stück spricht Sie an — oder soll eines nur für Sie entstehen? Alle Unikate auf Anfrage, persönlich im Atelier.",
  },
  werkstatt: {
    eyebrow: "Die Werkstatt",
    heading: "Wie ein *Unikat*\nentsteht.",
    intro:
      "Vom ersten Strich bis zur letzten Punze entsteht jedes Stück in einer Hand — am Werkbrett in der Hüxstraße.",
    steps: [
      {
        title: "Gespräch & Idee",
        text: "Am Anfang steht ein Gedanke — ein Stein, ein Anlass, eine Form. Im Atelier wird daraus eine Richtung.",
      },
      {
        title: "Entwurf & Modellation",
        text: "Aus Skizze und Modell entsteht der eigene Entwurf — mit dem Blick der Bildhauerei, aus der diese Arbeit kommt.",
      },
      {
        title: "Schmelzen & Verbinden",
        text: "Silber und Gold — oder Silber und Kupfer — werden gegossen, geschmiedet und zu einem Stück gefügt.",
      },
      {
        title: "Punzieren",
        text: "Punze um Punze, von Hand gesetzt: die Oberfläche bekommt ihre Struktur, das Licht seinen Rhythmus.",
      },
      {
        title: "Fassen & Vollendung",
        text: "Der Stein wird gefasst, die Flächen strichmattiert oder poliert — bis das Unikat fertig ist. Und einmalig bleibt.",
      },
    ],
    quote:
      "„…die fast bildhauerische Bearbeitung der Schmuckstücke in Form des Punzierens.“",
    quoteAttribution: "Über die Arbeit von Petra Hübner",
    imageWerkbank: {
      src: "/images/werkstatt/werkbank.jpg",
      alt: "Werkbank der Goldschmiede: Feilen, Sägebogen und Punzen im warmen Licht",
    },
    imageHaende: {
      src: "/images/werkstatt/haende-feile.jpg",
      alt: "Hände der Goldschmiedin beim Feilen eines silbernen Ringrohlings am Werkbrett",
    },
  },
  meisterin: {
    eyebrow: "Die Meisterin",
    heading: "Petra Hübner,\nGoldschmiedemeisterin.",
    paragraphs: [
      "Der Spaß an der kreativen Modellation und Bildhauerei führte Petra Hübner in die Ausbildung zur Goldschmiedin — und über verschiedene Werkstätten, Serienarbeit und hochwertige Unikate schließlich zu eigenen Entwürfen.",
      "1991 wagte sie den Schritt in die Selbstständigkeit, 1997 legte sie die Meisterprüfung im Goldschmiedehandwerk ab. Seit 2001 arbeitet sie in ihrem eigenen Atelier in der Hüxstraße 32 — mitten in der Lübecker Altstadt.",
    ],
    image: {
      src: "/images/meisterin/atelier.jpg",
      alt: "Das Atelier in der Hüxstraße: Vitrine mit Unikatschmuck, dahinter das Werkbrett im Tageslicht",
    },
    imageCaptionLeft: "Das Atelier, Hüxstraße 32",
    imageCaptionRight: "Lübecker Altstadt",
    stats: [
      { value: "1991", label: "Selbstständig seit" },
      { value: "1997", label: "Meisterprüfung im Goldschmiedehandwerk" },
      { value: "2001", label: "Eigenes Atelier, Hüxstraße 32" },
    ],
  },
  eheringe: {
    eyebrow: "Eheringe & Anfertigungen",
    heading: "Zwei Ringe,\n*eine* Geschichte.",
    intro:
      "Eheringe in der charakteristischen Zweifarbigkeit des Hauses — und Anfertigungen nach eigenem Entwurf: Was am Werkbrett entsteht, beginnt immer mit einem Gespräch.",
    steps: [
      {
        title: "Gespräch",
        text: "Im Atelier, ohne Eile: Welche Metalle, welche Breite, welche Oberfläche — und welche Geschichte sollen die Ringe erzählen?",
      },
      {
        title: "Entwurf",
        text: "Aus dem Gespräch wird ein eigener Entwurf — zweifarbig, punziert, strichmattiert. So eigen wie die beiden, die sie tragen.",
      },
      {
        title: "Anfertigung",
        text: "Von Hand gefertigt am Werkbrett in der Hüxstraße. Zwei Ringe, die es so kein zweites Mal gibt.",
      },
    ],
    ctaLabel: "Termin vereinbaren",
    imagePair: {
      src: "/images/eheringe/eheringe-paar.jpg",
      alt: "Zwei zweifarbige Eheringe aus strichmattiertem Silber mit innenliegendem Gold, aneinandergelehnt",
    },
    imageDetail: {
      src: "/images/eheringe/anfertigung-detail.jpg",
      alt: "Auf dem Werkbrett: Entwurfsskizze, Ringrohling und loser Edelstein einer Anfertigung",
    },
  },
  besuch: {
    eyebrow: "Besuch & Termin",
    heading: "Im Herzen\nLübecks.",
    phoneEyebrow: "Termin vereinbaren — rufen Sie an",
    hoursHeading: "Öffnungszeiten",
    image: {
      src: "/images/besuch/schaufenster.jpg",
      alt: "Abendstimmung in der Hüxstraße: warm beleuchtetes Schaufenster des Ateliers in der Lübecker Altstadt",
    },
    imageCaptionLeft: "Die Hüxstraße",
    imageCaptionRight: "Lübecker Altstadt",
  },
  pieces: DEFAULT_PIECES,
};
