import "server-only";
import { getCms, toImg } from "@/lib/cms";
import {
  DEFAULTS,
  type Img,
  type Piece,
  type PieceCategory,
  type SiteContent,
} from "@/lib/defaults";
import type {
  Homepage as HomepageDoc,
  SiteSetting as SiteSettingDoc,
  Piece as PieceDoc,
} from "@/payload-types";

const str = (v: unknown, d: string): string =>
  typeof v === "string" && v.trim().length > 0 ? v : d;

const arr = <T,>(v: unknown, d: T[]): T[] =>
  Array.isArray(v) && v.length > 0 ? (v as T[]) : d;

const img = (v: unknown, d: Img): Img =>
  toImg(v as never) ?? d;

function mapPieces(docs: PieceDoc[]): Piece[] {
  if (docs.length === 0) return DEFAULTS.pieces;
  return docs.map((d) => {
    const image = toImg(d.image, d.name) ?? { src: "", alt: d.name };
    const inHero = Boolean(d.inHero);
    return {
      id: d.slug,
      name: d.name,
      category: d.category as PieceCategory,
      image,
      material: d.material,
      dimensions: d.dimensions ?? undefined,
      stone: d.stone ?? undefined,
      carat: d.carat ?? undefined,
      surface: d.surface ?? undefined,
      price: str(d.price, "Preis auf Anfrage"),
      provenance: (d.provenance as "real" | "illustrative") ?? "illustrative",
      inHero,
      hero: inHero
        ? {
            image: toImg(d.heroImage) ?? image,
            shortName: str(d.heroShortName, d.name),
            spec: str(d.heroSpec, ""),
            objectPosition: str(d.heroObjectPosition, "center"),
            tint: str(d.heroTint, "bg-ink/55 sm:bg-ink/30"),
          }
        : undefined,
    };
  });
}

/**
 * Read all site content from the CMS, falling back to `DEFAULTS` for any
 * missing field so the site always renders (even with an empty database).
 */
export async function getSiteContent(): Promise<SiteContent> {
  const payload = await getCms();

  let home: Partial<HomepageDoc> = {};
  let settings: Partial<SiteSettingDoc> = {};
  let pieceDocs: PieceDoc[] = [];

  try {
    const [h, s, p] = await Promise.all([
      payload.findGlobal({ slug: "homepage", depth: 1 }),
      payload.findGlobal({ slug: "site-settings", depth: 1 }),
      payload.find({ collection: "pieces", sort: "_order", depth: 1, limit: 100 }),
    ]);
    home = h ?? {};
    settings = s ?? {};
    pieceDocs = (p?.docs ?? []) as PieceDoc[];
  } catch {
    // DB not migrated / unavailable — fall back entirely to defaults.
    return DEFAULTS;
  }

  const d = DEFAULTS;
  const a = settings.atelier ?? {};
  const hero = home.hero ?? {};
  const zwei = home.zweifarbigkeit ?? {};
  const unik = home.unikate ?? {};
  const werk = home.werkstatt ?? {};
  const meis = home.meisterin ?? {};
  const ehe = home.eheringe ?? {};
  const bes = home.besuch ?? {};
  const footer = settings.footer ?? {};

  return {
    meta: {
      title: str(settings.meta?.title, d.meta.title),
      description: str(settings.meta?.description, d.meta.description),
    },
    atelier: {
      name: str(a.name, d.atelier.name),
      shortName: str(a.shortName, d.atelier.shortName),
      legalName: str(a.legalName, d.atelier.legalName),
      owner: str(a.owner, d.atelier.owner),
      ownerTitle: str(a.ownerTitle, d.atelier.ownerTitle),
      street: str(a.street, d.atelier.street),
      zip: str(a.zip, d.atelier.zip),
      city: str(a.city, d.atelier.city),
      district: str(a.district, d.atelier.district),
      phoneDisplay: str(a.phoneDisplay, d.atelier.phoneDisplay),
      phoneHref: str(a.phoneHref, d.atelier.phoneHref),
      email: str(a.email, d.atelier.email),
      mapsUrl: str(a.mapsUrl, d.atelier.mapsUrl),
      mapsEmbedUrl: str(a.mapsEmbedUrl, d.atelier.mapsEmbedUrl),
    },
    nav: arr(
      (settings.navLinks ?? []).map((n) => ({ label: n.label, href: n.href })),
      d.nav,
    ),
    timeline: arr(
      (settings.timeline ?? []).map((t) => ({ year: t.year, event: t.event })),
      d.timeline,
    ),
    hours: arr(
      (settings.hours ?? []).map((h) => ({
        weekday: h.weekday,
        day: h.day,
        time: h.time,
        openStart: h.openStart ?? null,
        openEnd: h.openEnd ?? null,
      })),
      d.hours,
    ),
    hoursNote: str(settings.hoursNote, d.hoursNote),
    footer: {
      strapline: str(footer.strapline, d.footer.strapline),
      hoursSummary: arr(
        (footer.hoursSummary ?? []).map((r) => ({ days: r.days, time: r.time })),
        d.footer.hoursSummary,
      ),
    },
    hero: {
      eyebrow: str(hero.eyebrow, d.hero.eyebrow),
      headline: str(hero.headline, d.hero.headline),
      ctaPrimary: str(hero.ctaPrimary, d.hero.ctaPrimary),
      ctaSecondary: str(hero.ctaSecondary, d.hero.ctaSecondary),
      hoursShort: str(hero.hoursShort, d.hero.hoursShort),
      footnote: str(hero.footnote, d.hero.footnote),
    },
    zweifarbigkeit: {
      eyebrow: str(zwei.eyebrow, d.zweifarbigkeit.eyebrow),
      heading: str(zwei.heading, d.zweifarbigkeit.heading),
      paragraphs: arr(
        (zwei.paragraphs ?? []).map((p) => p.text),
        d.zweifarbigkeit.paragraphs,
      ),
      techniques: arr(
        (zwei.techniques ?? []).map((t) => ({ name: t.name, text: t.text })),
        d.zweifarbigkeit.techniques,
      ),
      imageGold: img(zwei.imageGold, d.zweifarbigkeit.imageGold),
      imageKupfer: img(zwei.imageKupfer, d.zweifarbigkeit.imageKupfer),
      imageBand: img(zwei.imageBand, d.zweifarbigkeit.imageBand),
      bandCaptionLeft: str(zwei.bandCaptionLeft, d.zweifarbigkeit.bandCaptionLeft),
      bandCaptionRight: str(zwei.bandCaptionRight, d.zweifarbigkeit.bandCaptionRight),
    },
    unikate: {
      eyebrow: str(unik.eyebrow, d.unikate.eyebrow),
      heading: str(unik.heading, d.unikate.heading),
      intro: str(unik.intro, d.unikate.intro),
      enquiry: str(unik.enquiry, d.unikate.enquiry),
    },
    werkstatt: {
      eyebrow: str(werk.eyebrow, d.werkstatt.eyebrow),
      heading: str(werk.heading, d.werkstatt.heading),
      intro: str(werk.intro, d.werkstatt.intro),
      steps: arr(
        (werk.steps ?? []).map((s) => ({ title: s.title, text: s.text })),
        d.werkstatt.steps,
      ),
      quote: str(werk.quote, d.werkstatt.quote),
      quoteAttribution: str(werk.quoteAttribution, d.werkstatt.quoteAttribution),
      imageWerkbank: img(werk.imageWerkbank, d.werkstatt.imageWerkbank),
      imageHaende: img(werk.imageHaende, d.werkstatt.imageHaende),
    },
    meisterin: {
      eyebrow: str(meis.eyebrow, d.meisterin.eyebrow),
      heading: str(meis.heading, d.meisterin.heading),
      paragraphs: arr(
        (meis.paragraphs ?? []).map((p) => p.text),
        d.meisterin.paragraphs,
      ),
      image: img(meis.image, d.meisterin.image),
      imageCaptionLeft: str(meis.imageCaptionLeft, d.meisterin.imageCaptionLeft),
      imageCaptionRight: str(meis.imageCaptionRight, d.meisterin.imageCaptionRight),
      stats: arr(
        (meis.stats ?? []).map((s) => ({ value: s.value, label: s.label })),
        d.meisterin.stats,
      ),
    },
    eheringe: {
      eyebrow: str(ehe.eyebrow, d.eheringe.eyebrow),
      heading: str(ehe.heading, d.eheringe.heading),
      intro: str(ehe.intro, d.eheringe.intro),
      steps: arr(
        (ehe.steps ?? []).map((s) => ({ title: s.title, text: s.text })),
        d.eheringe.steps,
      ),
      ctaLabel: str(ehe.ctaLabel, d.eheringe.ctaLabel),
      imagePair: img(ehe.imagePair, d.eheringe.imagePair),
      imageDetail: img(ehe.imageDetail, d.eheringe.imageDetail),
    },
    besuch: {
      eyebrow: str(bes.eyebrow, d.besuch.eyebrow),
      heading: str(bes.heading, d.besuch.heading),
      phoneEyebrow: str(bes.phoneEyebrow, d.besuch.phoneEyebrow),
      hoursHeading: str(bes.hoursHeading, d.besuch.hoursHeading),
      image: img(bes.image, d.besuch.image),
      imageCaptionLeft: str(bes.imageCaptionLeft, d.besuch.imageCaptionLeft),
      imageCaptionRight: str(bes.imageCaptionRight, d.besuch.imageCaptionRight),
    },
    pieces: mapPieces(pieceDocs),
  };
}
