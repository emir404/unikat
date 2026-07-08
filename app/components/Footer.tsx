"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ATELIER } from "../data/atelier";

const DISPLAY_VARIATION = { fontVariationSettings: '"SOFT" 0, "WONK" 0, "opsz" 144' } as const;
const ACCENT_VARIATION = { fontVariationSettings: '"SOFT" 60, "WONK" 1, "opsz" 144' } as const;

const HOURS_SUMMARY = [
  { days: "Donnerstag + Freitag", time: "10:00 – 18:00" },
  { days: "Samstag", time: "10:00 – 14:00" },
  { days: "Mo – Mi & sonst", time: "Nach Vereinbarung" },
];

function FooterLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-ink-foreground/65">
      {children}
    </p>
  );
}

export function Footer({ curtain = true }: { curtain?: boolean }) {
  const footerRef = useRef<HTMLElement>(null);

  // The curtain reveal only works when the whole footer fits in the viewport;
  // otherwise its top (wordmark/legal links) would be unreachable.
  const [fitsViewport, setFitsViewport] = useState(true);

  useEffect(() => {
    const check = () => {
      setFitsViewport(
        (footerRef.current?.offsetHeight ?? 0) <= window.innerHeight,
      );
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const sticky = curtain && fitsViewport;

  return (
    <footer
      ref={footerRef}
      className={`bg-ink text-ink-foreground ${
        sticky ? "sticky bottom-0 z-0 motion-reduce:static" : ""
      }`}
    >
      <div className="px-6 py-14 sm:px-10 lg:px-[min(10.5vw,152px)] lg:py-20">
        {/* Wordmark line */}
        <div className="border-b border-ink-foreground/12 pb-10">
          <p
            className="font-display leading-[1.02] tracking-[-0.02em] text-[clamp(44px,8.5vw,120px)]"
            style={DISPLAY_VARIATION}
          >
            Aura{" "}
            <em className="text-gold" style={ACCENT_VARIATION}>
              Unikatschmuck
            </em>
          </p>
          <p className="mt-5 flex items-center gap-4 font-sans text-[11px] uppercase tracking-[0.24em] text-ink-foreground/55">
            <span aria-hidden className="punzen w-10 shrink-0 text-gold" />
            Außergewöhnlicher Unikatschmuck im Herzen Lübecks
          </p>
        </div>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-x-16">
          {/* Brand */}
          <div>
            <FooterLabel>Atelier</FooterLabel>
            <p className="mt-4 max-w-[36ch] font-serif text-[15.5px] leading-[1.7] text-ink-foreground/75">
              {ATELIER.name}
              <br />
              {ATELIER.ownerTitle} {ATELIER.owner}
              <br />
              <a
                href={ATELIER.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold sm:min-h-0"
              >
                {ATELIER.street}, {ATELIER.zip} {ATELIER.city}
              </a>
            </p>
          </div>

          {/* Kontakt */}
          <div>
            <FooterLabel>Kontakt</FooterLabel>
            <div className="mt-4 flex flex-col gap-1 font-serif text-[15.5px]">
              <a
                href={ATELIER.phoneHref}
                className="min-h-11 py-1.5 tabular-nums transition-colors hover:text-gold sm:min-h-0 sm:py-0.5"
              >
                {ATELIER.phoneDisplay}
              </a>
              <a
                href={`mailto:${ATELIER.email}`}
                className="min-h-11 py-1.5 break-all transition-colors hover:text-gold sm:min-h-0 sm:py-0.5"
              >
                {ATELIER.email}
              </a>
            </div>
            <a
              href={ATELIER.phoneHref}
              className="mt-5 inline-flex h-11 items-center justify-center border border-ink-foreground/30 px-6 font-sans text-[11px] uppercase tracking-[0.18em] text-ink-foreground transition-colors hover:border-gold hover:text-gold"
            >
              Termin vereinbaren
            </a>
          </div>

          {/* Öffnungszeiten */}
          <div>
            <FooterLabel>Öffnungszeiten</FooterLabel>
            <dl className="mt-4 flex flex-col gap-2.5">
              {HOURS_SUMMARY.map((row) => (
                <div key={row.days} className="flex flex-col">
                  <dt className="font-sans text-[12px] uppercase tracking-[0.14em] text-ink-foreground">
                    {row.days}
                  </dt>
                  <dd className="font-serif text-[15px] tabular-nums text-ink-foreground/70">
                    {row.time}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-ink-foreground/12 pt-6 sm:flex-row sm:items-center sm:justify-between lg:mt-16">
          <p
            className="font-sans text-[11px] uppercase tracking-[0.14em] text-ink-foreground/65"
            suppressHydrationWarning
          >
            © {new Date().getFullYear()} {ATELIER.legalName}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/impressum"
              className="min-h-11 py-2 font-sans text-[11px] uppercase tracking-[0.16em] text-ink-foreground/70 transition-colors hover:text-gold sm:min-h-0 sm:py-0"
            >
              Impressum
            </Link>
            <Link
              href="/datenschutz"
              className="min-h-11 py-2 font-sans text-[11px] uppercase tracking-[0.16em] text-ink-foreground/70 transition-colors hover:text-gold sm:min-h-0 sm:py-0"
            >
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
