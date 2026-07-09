/**
 * One-time seed: migrates the previously hardcoded site content and the
 * images from public/images into Payload. Run with:
 *
 *   bun run seed
 *
 * Safe to re-run: skips content seeding if pieces already exist (but always
 * ensures an admin user exists).
 */
import path from "path";
import { fileURLToPath } from "url";
import { getPayload } from "payload";
import config from "../payload.config";
import { DEFAULTS, type Img } from "../lib/defaults";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const ADMIN_EMAIL = "admin@aura-unikatschmuck.de";
const ADMIN_PASSWORD = "aura2026";

/* --- Lexical rich-text builders (for the Legal global) --- */
type LexNode = Record<string, unknown>;

const txt = (text: string): LexNode => ({
  type: "text",
  detail: 0,
  format: 0,
  mode: "normal",
  style: "",
  text,
  version: 1,
});

const lineBreak = (): LexNode => ({ type: "linebreak", version: 1 });

const paragraph = (children: LexNode[]): LexNode => ({
  type: "paragraph",
  children,
  direction: "ltr",
  format: "",
  indent: 0,
  textFormat: 0,
  textStyle: "",
  version: 1,
});

const para = (text: string): LexNode => paragraph([txt(text)]);

const paraLines = (lines: string[]): LexNode => {
  const children: LexNode[] = [];
  lines.forEach((l, i) => {
    if (i > 0) children.push(lineBreak());
    children.push(txt(l));
  });
  return paragraph(children);
};

const heading = (text: string): LexNode => ({
  type: "heading",
  tag: "h2",
  children: [txt(text)],
  direction: "ltr",
  format: "",
  indent: 0,
  version: 1,
});

const lexical = (children: LexNode[]) => ({
  root: {
    type: "root",
    children,
    direction: "ltr" as const,
    format: "" as const,
    indent: 0,
    version: 1,
  },
});

async function main() {
  const payload = await getPayload({ config });

  // --- Admin user ---
  const existingUsers = await payload.find({ collection: "users", limit: 1 });
  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: "users",
      data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
    });
    payload.logger.info(`Admin user created: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);
  }

  const existingPieces = await payload.find({ collection: "pieces", limit: 1 });
  if (existingPieces.totalDocs > 0) {
    payload.logger.info("Pieces already exist — skipping content seed.");
    return;
  }

  // --- Media uploader (memoized by path) ---
  const uploaded = new Map<string, number>();
  const upload = async (image: Img): Promise<number> => {
    const relPath = image.src.replace(/^\//, "");
    const cached = uploaded.get(relPath);
    if (cached) return cached;
    const doc = await payload.create({
      collection: "media",
      data: { alt: image.alt },
      filePath: path.join(root, "public", relPath),
    });
    uploaded.set(relPath, doc.id as number);
    return doc.id as number;
  };

  // --- Pieces (catalog + hero) ---
  for (const p of DEFAULTS.pieces) {
    const imageId = await upload(p.image);
    const heroImageId = p.inHero && p.hero ? await upload(p.hero.image) : undefined;
    await payload.create({
      collection: "pieces",
      data: {
        name: p.name,
        slug: p.id,
        category: p.category,
        image: imageId,
        material: p.material,
        dimensions: p.dimensions,
        stone: p.stone,
        carat: p.carat,
        surface: p.surface,
        price: p.price,
        provenance: p.provenance,
        inHero: p.inHero,
        heroImage: heroImageId,
        heroShortName: p.hero?.shortName,
        heroSpec: p.hero?.spec,
        heroObjectPosition: p.hero?.objectPosition,
        heroTint: p.hero?.tint,
      },
    });
  }
  payload.logger.info("Pieces seeded.");

  const z = DEFAULTS.zweifarbigkeit;
  const w = DEFAULTS.werkstatt;
  const m = DEFAULTS.meisterin;
  const e = DEFAULTS.eheringe;
  const b = DEFAULTS.besuch;

  await payload.updateGlobal({
    slug: "homepage",
    data: {
      hero: {
        eyebrow: DEFAULTS.hero.eyebrow,
        headline: DEFAULTS.hero.headline,
        ctaPrimary: DEFAULTS.hero.ctaPrimary,
        ctaSecondary: DEFAULTS.hero.ctaSecondary,
        hoursShort: DEFAULTS.hero.hoursShort,
        footnote: DEFAULTS.hero.footnote,
      },
      zweifarbigkeit: {
        eyebrow: z.eyebrow,
        heading: z.heading,
        paragraphs: z.paragraphs.map((text) => ({ text })),
        techniques: z.techniques,
        imageGold: await upload(z.imageGold),
        imageKupfer: await upload(z.imageKupfer),
        imageBand: await upload(z.imageBand),
        bandCaptionLeft: z.bandCaptionLeft,
        bandCaptionRight: z.bandCaptionRight,
      },
      unikate: {
        eyebrow: DEFAULTS.unikate.eyebrow,
        heading: DEFAULTS.unikate.heading,
        intro: DEFAULTS.unikate.intro,
        enquiry: DEFAULTS.unikate.enquiry,
      },
      werkstatt: {
        eyebrow: w.eyebrow,
        heading: w.heading,
        intro: w.intro,
        steps: w.steps,
        quote: w.quote,
        quoteAttribution: w.quoteAttribution,
        imageWerkbank: await upload(w.imageWerkbank),
        imageHaende: await upload(w.imageHaende),
      },
      meisterin: {
        eyebrow: m.eyebrow,
        heading: m.heading,
        paragraphs: m.paragraphs.map((text) => ({ text })),
        image: await upload(m.image),
        imageCaptionLeft: m.imageCaptionLeft,
        imageCaptionRight: m.imageCaptionRight,
        stats: m.stats,
      },
      eheringe: {
        eyebrow: e.eyebrow,
        heading: e.heading,
        intro: e.intro,
        steps: e.steps,
        ctaLabel: e.ctaLabel,
        imagePair: await upload(e.imagePair),
        imageDetail: await upload(e.imageDetail),
      },
      besuch: {
        eyebrow: b.eyebrow,
        heading: b.heading,
        phoneEyebrow: b.phoneEyebrow,
        hoursHeading: b.hoursHeading,
        image: await upload(b.image),
        imageCaptionLeft: b.imageCaptionLeft,
        imageCaptionRight: b.imageCaptionRight,
      },
    },
  });
  payload.logger.info("Homepage global seeded.");

  await payload.updateGlobal({
    slug: "site-settings",
    data: {
      meta: DEFAULTS.meta,
      atelier: DEFAULTS.atelier,
      navLinks: DEFAULTS.nav,
      timeline: DEFAULTS.timeline,
      hours: DEFAULTS.hours,
      hoursNote: DEFAULTS.hoursNote,
      footer: DEFAULTS.footer,
    },
  });
  payload.logger.info("Site settings seeded.");

  await payload.updateGlobal({
    slug: "legal",
    data: {
      impressumTitle: "Impressum",
      impressum: lexical([
        heading("Angaben gemäß § 5 TMG"),
        paraLines([
          "Aura Schmuck Design",
          "Inhaberin: Petra Hübner",
          "Hüxstraße 32",
          "23552 Lübeck",
        ]),
        heading("Kontakt"),
        paraLines([
          "Telefon / Fax: 0451 – 706 38 74",
          "E-Mail: info@aura-unikatschmuck.de",
        ]),
        heading("Umsatzsteuer"),
        paraLines([
          "Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:",
          "DE 2213200726",
        ]),
        heading("Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV"),
        paraLines(["Petra Hübner", "Hüxstraße 32, 23552 Lübeck"]),
        heading("Berufsbezeichnung"),
        para(
          "Goldschmiedemeisterin (Meisterprüfung im Goldschmiedehandwerk, verliehen in Deutschland).",
        ),
        heading("EU-Streitschlichtung"),
        para(
          "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/ . Unsere E-Mail-Adresse finden Sie oben im Impressum.",
        ),
        heading("Verbraucherstreitbeilegung / Universalschlichtungsstelle"),
        para(
          "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
        ),
      ]),
      datenschutzTitle: "Datenschutzerklärung",
      datenschutz: lexical([
        para(
          "Entwurf auf Grundlage der Standardformulierungen für statische Websites — vor Veröffentlichung rechtlich zu prüfen.",
        ),
        heading("1. Verantwortliche Stelle"),
        para("Verantwortlich für die Datenverarbeitung auf dieser Website ist:"),
        paraLines([
          "Aura Schmuck Design, Inh. Petra Hübner",
          "Hüxstraße 32, 23552 Lübeck",
          "Telefon: 0451 – 706 38 74",
          "E-Mail: info@aura-unikatschmuck.de",
        ]),
        heading("2. Allgemeines zur Datenverarbeitung"),
        para(
          "Diese Website dient ausschließlich der Information über das Atelier und seine Arbeiten. Es bestehen keine Nutzerkonten, kein Onlineshop und keine Kontaktformulare. Personenbezogene Daten werden nur in dem hier beschriebenen, technisch notwendigen Umfang verarbeitet.",
        ),
        heading("3. Server-Logdateien"),
        para(
          "Beim Aufruf dieser Website erhebt der Hosting-Anbieter automatisch Informationen in sogenannten Server-Logdateien, die Ihr Browser übermittelt (z. B. IP-Adresse, Datum und Uhrzeit der Anfrage, Browsertyp, Referrer-URL). Diese Daten dienen der Sicherstellung eines störungsfreien Betriebs und der Verbesserung der Stabilität und Sicherheit (Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO). Eine Zusammenführung mit anderen Datenquellen findet nicht statt.",
        ),
        heading("4. Schriftarten"),
        para(
          "Die verwendeten Schriftarten sind lokal auf dem Server dieser Website eingebunden. Beim Aufruf der Seite werden keine Verbindungen zu Servern von Schriftanbietern (z. B. Google Fonts) hergestellt.",
        ),
        heading("5. Google Maps"),
        para(
          "Diese Website bindet zur Anfahrtsbeschreibung eine Karte des Dienstes Google Maps ein (Anbieter: Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland). Beim Laden der Karte werden Daten — darunter Ihre IP-Adresse — an Server von Google übertragen. Die Einbindung erfolgt im Interesse einer leichten Auffindbarkeit des Ateliers (Art. 6 Abs. 1 lit. f DSGVO). Weitere Informationen finden Sie in der Datenschutzerklärung von Google: https://policies.google.com/privacy",
        ),
        heading("6. Kontaktaufnahme per Telefon oder E-Mail"),
        para(
          "Wenn Sie uns telefonisch oder per E-Mail kontaktieren, werden Ihre Angaben zur Bearbeitung der Anfrage und für mögliche Anschlussfragen gespeichert (Art. 6 Abs. 1 lit. b DSGVO). Diese Daten geben wir nicht ohne Ihre Einwilligung weiter und löschen sie, sobald sie für die Bearbeitung nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.",
        ),
        heading("7. Ihre Rechte"),
        para(
          "Sie haben im Rahmen der DSGVO jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Außerdem steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu — in Schleswig-Holstein ist dies das Unabhängige Landeszentrum für Datenschutz (ULD), Holstenstraße 98, 24103 Kiel.",
        ),
        heading("8. Stand"),
        para(
          "Diese Datenschutzerklärung wird bei Änderungen der Website oder der Rechtslage angepasst.",
        ),
      ]),
    },
  });
  payload.logger.info("Legal global seeded.");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
