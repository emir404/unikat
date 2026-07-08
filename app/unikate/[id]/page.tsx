import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "../../components/Footer";
import { Reveal } from "../../components/Reveal";
import { PIECES } from "../../data/pieces";
import { ATELIER } from "../../data/atelier";

const DISPLAY_VARIATION = { fontVariationSettings: '"SOFT" 0, "WONK" 0, "opsz" 144' } as const;
const ACCENT_VARIATION = { fontVariationSettings: '"SOFT" 60, "WONK" 1, "opsz" 144' } as const;

const NUMBER_BY_ID = new Map(
  PIECES.map((p, i) => [p.id, String(i + 1).padStart(2, "0")]),
);

export const dynamicParams = false;

export function generateStaticParams() {
  return PIECES.map((piece) => ({ id: piece.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const piece = PIECES.find((p) => p.id === id);
  if (!piece) return {};
  return {
    title: `${piece.name} – AURA Unikatschmuck, Lübeck`,
    description: `Unikat aus dem Goldschmiede-Atelier von Petra Hübner: ${piece.name}. ${piece.material}${piece.stone ? `, ${piece.stone}` : ""}. ${piece.price}.`,
    openGraph: {
      images: [{ url: piece.image }],
    },
  };
}

function SpecRow({
  label,
  value,
  numeric,
}: {
  label: string;
  value?: string;
  numeric?: boolean;
}) {
  if (!value) return null;
  return (
    <div className="grid grid-cols-[110px_minmax(0,1fr)] items-baseline gap-4 border-t border-foreground/12 py-4 sm:grid-cols-[140px_minmax(0,1fr)]">
      <dt className="font-sans text-[11px] uppercase tracking-[0.18em] text-foreground/60">
        {label}
      </dt>
      <dd
        className={`font-serif text-[16px] leading-[1.6] text-foreground/85 ${numeric ? "tabular-nums" : ""}`}
      >
        {value}
      </dd>
    </div>
  );
}

export default async function UnikatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const piece = PIECES.find((p) => p.id === id);
  if (!piece) notFound();

  const nr = NUMBER_BY_ID.get(piece.id);
  const related = [
    ...PIECES.filter((p) => p.id !== piece.id && p.category === piece.category),
    ...PIECES.filter((p) => p.id !== piece.id && p.category !== piece.category),
  ].slice(0, 3);

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="flex items-center justify-between px-6 pt-7 sm:px-10 lg:px-[min(10.5vw,152px)] lg:pt-10">
        <Link href="/" className="flex items-baseline gap-2 py-2">
          <span
            className="font-display text-[20px] leading-none text-foreground"
            style={DISPLAY_VARIATION}
          >
            Aura
          </span>
          <span className="hidden font-sans text-[10px] uppercase tracking-[0.22em] text-foreground/60 sm:inline">
            Unikatschmuck
          </span>
        </Link>
        <Link
          href="/#unikate"
          className="py-2 font-sans text-[11px] uppercase tracking-[0.18em] text-foreground/70 transition-colors hover:text-copper"
        >
          ← Alle Unikate
        </Link>
      </header>

      <main className="flex-1 px-6 py-14 sm:px-10 lg:px-[min(10.5vw,152px)] lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,54%)_minmax(0,1fr)] lg:gap-20">
          {/* Piece */}
          <Reveal y={30} amount={0.1}>
            <div className="relative">
              <div
                aria-hidden
                className="absolute -bottom-3 -left-3 h-full w-full border border-copper/35"
              />
              <div className="relative aspect-[4/5] w-full overflow-clip bg-surface">
                <Image
                  src={piece.image}
                  alt={piece.alt}
                  fill
                  preload
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <span className="absolute left-4 top-4 flex items-center gap-2 border border-foreground/15 bg-background/85 px-3 py-1.5 font-sans text-[10px] uppercase tracking-[0.2em] text-foreground backdrop-blur-[2px]">
                  <span
                    aria-hidden
                    className="inline-block size-1 rounded-full bg-copper"
                  />
                  Unikat · Nº {nr}
                </span>
              </div>
            </div>
          </Reveal>

          {/* Catalog sheet */}
          <div className="flex flex-col lg:pt-2">
            <Reveal y={20}>
              <p className="flex items-center gap-4 font-sans text-[11px] uppercase tracking-[0.24em] text-foreground/70 sm:text-[12px]">
                <span aria-hidden className="punzen w-10 shrink-0 text-copper" />
                {piece.category}
              </p>
            </Reveal>

            <Reveal delay={0.08} y={26}>
              <h1
                className="mt-6 font-display text-[clamp(30px,3.6vw,52px)] leading-[1.12] tracking-[-0.015em] text-foreground text-balance"
                style={{ ...DISPLAY_VARIATION, fontWeight: 380 }}
              >
                {piece.name}
              </h1>
            </Reveal>

            <Reveal delay={0.14}>
              <p
                className="mt-4 font-display text-[19px] italic text-copper"
                style={ACCENT_VARIATION}
              >
                {piece.price}
              </p>
            </Reveal>

            <Reveal delay={0.2} className="mt-10">
              <dl>
                <SpecRow label="Material" value={piece.material} />
                <SpecRow label="Stein" value={piece.stone} />
                <SpecRow label="Karat" value={piece.carat} numeric />
                <SpecRow label="Maße" value={piece.dimensions} numeric />
                <SpecRow label="Oberfläche" value={piece.surface} />
                <SpecRow label="Anfertigung" value="Von Hand im Atelier, Hüxstraße 32, Lübeck" />
              </dl>
            </Reveal>

            <Reveal delay={0.26} className="mt-10 border-t border-foreground/12 pt-8">
              <p className="max-w-[46ch] font-serif text-[16px] leading-[1.65] text-foreground/75 text-pretty">
                Kein Stück wird wiederholt. Alle Unikate auf Anfrage —
                persönlich im Atelier in der Lübecker Altstadt.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
                <a
                  href={ATELIER.phoneHref}
                  className="flex h-[46px] items-center justify-center border border-foreground px-7 font-sans text-[11.5px] uppercase tracking-[0.18em] text-foreground transition-colors hover:border-copper hover:text-copper"
                >
                  Termin — {ATELIER.phoneDisplay}
                </a>
                <a
                  href={`mailto:${ATELIER.email}?subject=${encodeURIComponent(`Anfrage: ${piece.name} (Unikat Nº ${nr})`)}`}
                  className="group inline-flex min-h-11 items-center gap-2 font-sans text-[11.5px] uppercase tracking-[0.18em] text-copper"
                >
                  Anfrage per E-Mail
                  <span
                    aria-hidden
                    className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
                  >
                    →
                  </span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Related pieces */}
        {related.length > 0 && (
          <section className="mt-24 lg:mt-32">
            <Reveal y={20}>
              <div className="flex items-baseline justify-between gap-8 border-t border-foreground/12 pt-8">
                <h2 className="font-sans text-[13px] uppercase tracking-[0.22em] text-foreground">
                  Weitere Unikate
                </h2>
                <Link
                  href="/#unikate"
                  className="group inline-flex min-h-11 items-center gap-2 font-sans text-[11px] uppercase tracking-[0.18em] text-foreground/70 transition-colors hover:text-copper"
                >
                  Alle ansehen
                  <span
                    aria-hidden
                    className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
                  >
                    →
                  </span>
                </Link>
              </div>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rel, i) => (
                <Reveal key={rel.id} delay={0.08 * i} y={24}>
                  <Link
                    href={`/unikate/${rel.id}`}
                    className="group flex flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper/70"
                  >
                    <span className="relative block aspect-[4/5] w-full overflow-clip bg-surface">
                      <Image
                        src={rel.image}
                        alt={rel.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      />
                    </span>
                    <span
                      className="mt-5 block font-display text-[19px] leading-[1.3] tracking-[-0.01em] text-foreground text-balance"
                      style={DISPLAY_VARIATION}
                    >
                      {rel.name}
                    </span>
                    <span className="mt-2 block font-sans text-[11px] uppercase tracking-[0.16em] text-foreground/70">
                      {rel.material}
                    </span>
                    <span className="mt-2 block font-serif text-[15px] italic text-copper">
                      {rel.price}
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer curtain={false} />
    </div>
  );
}
