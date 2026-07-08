"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Reveal, TextLineReveal, EASE, useReducedMotionSafe } from "./Reveal";
import { PIECES, CATEGORIES, type Piece, type PieceCategory } from "../data/pieces";
import { ATELIER } from "../data/atelier";

const DISPLAY_VARIATION = { fontVariationSettings: '"SOFT" 0, "WONK" 0, "opsz" 144' } as const;

type Filter = PieceCategory | "Alle";

const NUMBER_BY_ID = new Map(PIECES.map((p, i) => [p.id, String(i + 1).padStart(2, "0")]));

function PieceCard({ piece, reducedMotion }: { piece: Piece; reducedMotion: boolean }) {
  const nr = NUMBER_BY_ID.get(piece.id);

  return (
    <motion.article
      layout={reducedMotion ? false : "position"}
      initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
      transition={{ duration: 0.55, ease: EASE }}
      className="group flex flex-col"
    >
      <Link
        href={`/unikate/${piece.id}`}
        className="flex flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper/70"
      >
        <span className="relative block aspect-[4/5] w-full overflow-clip bg-surface">
          <Image
            src={piece.image}
            alt={piece.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
          <span className="absolute left-4 top-4 flex items-center gap-2 border border-foreground/15 bg-background/85 px-3 py-1.5 font-sans text-[10px] uppercase tracking-[0.2em] text-foreground backdrop-blur-[2px]">
            <span aria-hidden className="inline-block size-1 rounded-full bg-copper" />
            Unikat · Nº {nr}
          </span>
        </span>

        <h3
          className="mt-6 font-display text-[21px] leading-[1.25] tracking-[-0.01em] text-foreground text-balance transition-colors group-hover:text-copper"
          style={DISPLAY_VARIATION}
        >
          {piece.name}
        </h3>

        {/* Museum etiquette */}
        <dl className="mt-3 flex flex-col gap-1 font-sans text-[11px] uppercase tracking-[0.16em] leading-[1.5] text-foreground/70">
          <div>
            <dt className="sr-only">Material</dt>
            <dd>{piece.material}</dd>
          </div>
          {piece.stone && (
            <div>
              <dt className="sr-only">Stein</dt>
              <dd>
                {piece.stone}
                {piece.carat ? (
                  <span className="whitespace-nowrap tabular-nums"> · {piece.carat}</span>
                ) : null}
              </dd>
            </div>
          )}
          {piece.dimensions && (
            <div>
              <dt className="sr-only">Maße</dt>
              <dd className="tabular-nums">{piece.dimensions}</dd>
            </div>
          )}
        </dl>

        <p className="mt-3 font-serif text-[15px] italic text-copper">
          {piece.price}
        </p>
      </Link>
    </motion.article>
  );
}

export function Unikate() {
  const reducedMotion = useReducedMotionSafe();
  const [filter, setFilter] = useState<Filter>("Alle");

  const visible =
    filter === "Alle" ? PIECES : PIECES.filter((p) => p.category === filter);

  return (
    <section
      id="unikate"
      className="relative bg-background px-6 py-24 sm:px-10 lg:px-[min(10.5vw,152px)] lg:py-[150px]"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
        <div>
          <Reveal y={20}>
            <p className="flex items-center gap-4 font-sans text-[11px] uppercase tracking-[0.24em] text-foreground/70 sm:text-[12px]">
              <span aria-hidden className="punzen w-10 shrink-0 text-copper" />
              Die Unikate
            </p>
          </Reveal>
          <TextLineReveal
            as="h2"
            lines={["Jedes Stück", "genau einmal."]}
            className="mt-7 font-display text-[clamp(38px,5.4vw,72px)] leading-[1.05] tracking-[-0.015em] text-foreground"
            lineClassName=""
          />
        </div>
        <Reveal delay={0.1} className="max-w-[380px]">
          <p className="font-serif text-[16px] leading-[1.65] text-foreground/75 text-pretty sm:text-[17px]">
            Kein Stück wird wiederholt. Was hier gezeigt wird, steht
            stellvertretend für das, was am Werkbrett entsteht — und wieder
            anders sein wird.
          </p>
        </Reveal>
      </div>

      {/* Filter chips */}
      <Reveal delay={0.15} className="mt-14">
        <div
          role="group"
          aria-label="Unikate nach Kategorie filtern"
          className="flex flex-wrap gap-2.5"
        >
          {(["Alle", ...CATEGORIES] as Filter[]).map((cat) => {
            const active = filter === cat;
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(cat)}
                className={`h-11 border px-5 font-sans text-[11px] uppercase tracking-[0.18em] transition-colors ${
                  active
                    ? "border-foreground bg-foreground text-background"
                    : "border-foreground/20 text-foreground/70 hover:border-foreground/50 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Catalog grid */}
      <motion.div
        layout={reducedMotion ? false : "position"}
        className="mt-14 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-20"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((piece) => (
            <PieceCard key={piece.id} piece={piece} reducedMotion={reducedMotion} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Enquiry line */}
      <Reveal className="mt-20 border-t border-foreground/12 pt-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="max-w-[52ch] font-serif text-[16px] leading-[1.6] text-foreground/75 text-pretty sm:text-[17px]">
            Ein Stück spricht Sie an — oder soll eines nur für Sie entstehen?
            Alle Unikate auf Anfrage, persönlich im Atelier.
          </p>
          <a
            href={ATELIER.phoneHref}
            className="group inline-flex min-h-11 shrink-0 items-center gap-2 font-sans text-[12px] uppercase tracking-[0.18em] text-copper"
          >
            {ATELIER.phoneDisplay}
            <span
              aria-hidden
              className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
            >
              →
            </span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
