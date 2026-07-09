import Link from "next/link";
import { Footer } from "./Footer";
import type { Atelier, FooterContent } from "@/lib/defaults";

const DISPLAY_VARIATION = { fontVariationSettings: '"SOFT" 0, "WONK" 0, "opsz" 144' } as const;

export function LegalPage({
  title,
  atelier,
  footer,
  children,
}: {
  title: string;
  atelier: Atelier;
  footer: FooterContent;
  children: React.ReactNode;
}) {
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
          href="/"
          className="py-2 font-sans text-[11px] uppercase tracking-[0.18em] text-foreground/70 transition-colors hover:text-copper"
        >
          ← Zurück zur Startseite
        </Link>
      </header>

      <main className="flex-1 px-6 py-16 sm:px-10 lg:px-[min(10.5vw,152px)] lg:py-24">
        <h1
          className="font-display leading-[1.08] tracking-[-0.015em] text-foreground text-[clamp(34px,5vw,56px)]"
          style={DISPLAY_VARIATION}
        >
          {title}
        </h1>
        <div className="mt-10 flex max-w-[640px] flex-col gap-8">{children}</div>
      </main>

      <Footer atelier={atelier} footer={footer} curtain={false} />
    </div>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      {heading && (
        <h2 className="mb-3 font-sans text-[13px] uppercase tracking-[0.18em] text-foreground">
          {heading}
        </h2>
      )}
      <div className="font-serif text-[16.5px] leading-[1.75] text-foreground/80">
        {children}
      </div>
    </section>
  );
}
