"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "motion/react";
import { useLenis } from "lenis/react";
import { EASE, useReducedMotionSafe } from "./Reveal";
import { ATELIER, NAV_LINKS } from "../data/atelier";
import { HERO_SLIDES } from "../data/heroSlides";

const DISPLAY_VARIATION = { fontVariationSettings: '"SOFT" 0, "WONK" 0, "opsz" 144' } as const;
const ACCENT_VARIATION = { fontVariationSettings: '"SOFT" 60, "WONK" 1, "opsz" 144' } as const;

/** How long each piece holds the frame before the next crossfade begins. */
const SLIDE_MS = 7000;
/** Crossfade duration — incoming slide fades in over the outgoing one. */
const FADE_S = 1.5;
/** Ken Burns drift while a slide is front-of-stack. */
const KB_SCALE = 1.06;
const KB_S = SLIDE_MS / 1000 + FADE_S + 0.5;

/** Masked line reveal that allows rich JSX per line (two-tone accent words). */
function HeadlineLine({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  const reducedMotion = useReducedMotionSafe();
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={reducedMotion ? { opacity: 0 } : { y: "110%" }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotionSafe();
  const [menuOpen, setMenuOpen] = useState(false);

  // Carousel: `prev` stays mounted at full opacity beneath the incoming
  // slide so the crossfade never dips to the dark base between images.
  const [{ active, prev }, setIndices] = useState({ active: 0, prev: -1 });
  const [autoplaying, setAutoplaying] = useState(true);
  // Non-LCP slides mount their images shortly after load so they don't
  // compete with the first slide's paint but are decoded well before the
  // first crossfade.
  const [warm, setWarm] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const inView = useInView(ref, { amount: 0.2 });

  useEffect(() => {
    const onVisibility = () =>
      setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Open mobile menu: freeze page scroll so the overlay can't scroll away.
  // Lock the root element too — window scroll targets <html>, not <body>.
  const lenis = useLenis();
  useEffect(() => {
    if (!menuOpen) return;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [menuOpen, lenis]);

  useEffect(() => {
    const timer = setTimeout(() => setWarm(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const canAutoplay =
    autoplaying &&
    inView &&
    pageVisible &&
    !menuOpen &&
    !reducedMotion &&
    HERO_SLIDES.length > 1;

  useEffect(() => {
    if (!canAutoplay) return;
    const timer = setTimeout(() => {
      setIndices(({ active: current }) => ({
        active: (current + 1) % HERO_SLIDES.length,
        prev: current,
      }));
    }, SLIDE_MS);
    return () => clearTimeout(timer);
    // `active` restarts the countdown after every advance/selection.
  }, [canAutoplay, active]);

  const selectSlide = (index: number) => {
    setAutoplaying(false);
    setWarm(true);
    setIndices((current) =>
      index === current.active
        ? current
        : { active: index, prev: current.active },
    );
  };

  const slide = HERO_SLIDES[active];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex h-svh min-h-[620px] flex-col overflow-clip bg-ink text-ink-foreground"
    >
      {/* Full-bleed campaign carousel — one slide per real catalog piece.
          `isolate` contains the slide/tint z-indices even when Motion drops
          the settled transform (no stacking context otherwise). */}
      <motion.div
        className="absolute inset-0 isolate"
        style={reducedMotion ? undefined : { scale: photoScale }}
        initial={reducedMotion ? { opacity: 0 } : { scale: 1.06, opacity: 0 }}
        animate={reducedMotion ? { opacity: 1 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: EASE }}
      >
        {HERO_SLIDES.map((heroSlide, index) => {
          const isActive = index === active;
          const isPrev = index === prev;
          const kenBurns = !reducedMotion && inView && (isActive || isPrev);
          return (
            <motion.div
              key={heroSlide.image}
              aria-hidden={!isActive}
              className="absolute inset-0"
              style={{ zIndex: isActive ? 2 : isPrev ? 1 : 0 }}
              initial={false}
              animate={{ opacity: isActive || isPrev ? 1 : 0 }}
              transition={{
                duration: isActive ? FADE_S : isPrev ? 0.4 : 0,
                ease: EASE,
              }}
            >
              <motion.div
                className="absolute inset-0"
                initial={false}
                animate={{ scale: kenBurns ? KB_SCALE : 1 }}
                transition={
                  kenBurns
                    ? { duration: KB_S, ease: "linear" }
                    : { duration: 0 }
                }
              >
                {(index === 0 || warm) && (
                  <Image
                    src={heroSlide.image}
                    alt={heroSlide.alt}
                    fill
                    preload={index === 0 ? true : undefined}
                    loading={index === 0 ? undefined : "eager"}
                    sizes="100vw"
                    className="object-cover"
                    style={{ objectPosition: heroSlide.objectPosition }}
                  />
                )}
              </motion.div>
              {/* Flat legibility tint — per slide (stronger where the caption
                  sits over bright metal), stronger on small screens */}
              <div className={`absolute inset-0 ${heroSlide.tint}`} />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Nav */}
      <motion.header
        className="relative z-20 flex items-center justify-between px-6 pt-9 sm:px-10 lg:px-[min(10.5vw,152px)] lg:pt-14"
        initial={{ opacity: 0, y: reducedMotion ? 0 : -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.1, ease: EASE }}
      >
        <a href="#" className="flex items-baseline gap-2">
          <span
            className="font-display text-[22px] leading-none text-ink-foreground"
            style={DISPLAY_VARIATION}
          >
            Aura
          </span>
          <span className="hidden font-sans text-[11px] uppercase tracking-[0.22em] text-ink-foreground/80 sm:inline">
            Unikatschmuck
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="py-2 font-sans text-[12px] uppercase tracking-[0.18em] text-ink-foreground/90 transition-colors hover:text-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <motion.a
          href={ATELIER.phoneHref}
          className="hidden h-[42px] items-center justify-center border border-ink-foreground/35 px-6 font-sans text-[12px] uppercase tracking-[0.18em] text-ink-foreground transition-colors hover:border-gold hover:text-gold lg:flex"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          Termin vereinbaren
        </motion.a>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <motion.span
            className="block h-[1.5px] w-6 bg-ink-foreground"
            animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
          />
          <motion.span
            className="block h-[1.5px] w-6 bg-ink-foreground"
            animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
          />
        </button>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 bg-ink lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-11 items-center py-2 font-sans text-[15px] uppercase tracking-[0.22em] text-ink-foreground"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.06, ease: EASE }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href={ATELIER.phoneHref}
              onClick={() => setMenuOpen(false)}
              className="mt-4 flex h-12 items-center justify-center border border-ink-foreground/40 px-8 font-sans text-[13px] uppercase tracking-[0.2em] text-ink-foreground"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45, ease: EASE }}
            >
              Termin vereinbaren
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Campaign copy — one quiet editorial row over the dark field:
          headline left, catalog-card column right */}
      <motion.div
        className="relative z-0 flex flex-1 flex-col justify-end px-6 pb-10 sm:px-10 lg:px-[min(10.5vw,152px)] lg:pb-16"
        style={reducedMotion ? undefined : { opacity: contentOpacity }}
      >
        <motion.p
          className="flex items-center gap-4 font-sans text-[11px] uppercase tracking-[0.24em] text-ink-foreground/90 sm:text-[12px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: EASE }}
        >
          <span aria-hidden className="punzen w-10 shrink-0 text-gold" />
          Goldschmiedemeisterin Petra Hübner · Lübeck
        </motion.p>

        <div className="mt-7 flex w-full flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-20">
          <h1
            className="font-display text-[clamp(38px,4.9vw,78px)] leading-[1.08] tracking-[-0.015em] text-ink-foreground"
            style={{ ...DISPLAY_VARIATION, fontWeight: 370 }}
          >
            <HeadlineLine delay={0.2}>Schmuck, den es</HeadlineLine>
            <HeadlineLine delay={0.32}>
              nur <em style={ACCENT_VARIATION}>einmal</em> gibt.
            </HeadlineLine>
          </h1>

          <motion.div
            className="flex max-w-[400px] shrink-0 flex-col items-start gap-6 lg:pb-2"
            initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: EASE }}
          >
            <div className="flex w-full flex-col gap-2.5">
              {HERO_SLIDES.length > 1 && (
                <div
                  role="group"
                  aria-label="Unikat wählen"
                  className="-my-2.5 -ml-1.5 flex items-center"
                >
                  {HERO_SLIDES.map((heroSlide, index) => {
                    const isActive = index === active;
                    return (
                      <button
                        key={heroSlide.piece.id}
                        type="button"
                        onClick={() => selectSlide(index)}
                        aria-label={`Unikat anzeigen: ${heroSlide.shortName}`}
                        aria-current={isActive || undefined}
                        className="group/bar flex h-10 w-12 items-center px-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold/70"
                      >
                        <span className="relative block h-px w-full overflow-hidden bg-ink-foreground/25 transition-colors duration-300 group-hover/bar:bg-ink-foreground/50">
                          <motion.span
                            key={String(canAutoplay)}
                            className="absolute inset-0 origin-left bg-gold"
                            initial={
                              isActive && canAutoplay ? { scaleX: 0 } : false
                            }
                            animate={{ scaleX: isActive ? 1 : 0 }}
                            transition={
                              isActive && canAutoplay
                                ? { duration: SLIDE_MS / 1000, ease: "linear" }
                                : { duration: 0.4, ease: EASE }
                            }
                          />
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              <span className="relative block overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.p
                    key={slide.piece.id}
                    className="flex items-center gap-3 font-sans text-[11px] uppercase tracking-[0.2em] text-ink-foreground/90"
                    initial={reducedMotion ? { opacity: 0 } : { y: "120%" }}
                    animate={{
                      y: 0,
                      opacity: 1,
                      transition: { duration: 0.75, delay: 0.15, ease: EASE },
                    }}
                    exit={
                      reducedMotion
                        ? { opacity: 0, transition: { duration: 0.3 } }
                        : {
                            y: "-120%",
                            transition: { duration: 0.6, ease: EASE },
                          }
                    }
                  >
                    <span className="min-w-0 truncate">
                      <span className="hidden sm:inline">Unikat · </span>
                      {slide.shortName}
                    </span>
                    <span aria-hidden className="h-px min-w-6 flex-1 bg-gold/60" />
                    <span className="shrink-0 tabular-nums">{slide.spec}</span>
                  </motion.p>
                </AnimatePresence>
              </span>

              <span className="relative block overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.p
                    key={slide.piece.id}
                    className="font-serif text-[14px] leading-normal text-ink-foreground/70"
                    initial={reducedMotion ? { opacity: 0 } : { y: "130%" }}
                    animate={{
                      y: 0,
                      opacity: 1,
                      transition: { duration: 0.75, delay: 0.22, ease: EASE },
                    }}
                    exit={
                      reducedMotion
                        ? { opacity: 0, transition: { duration: 0.3 } }
                        : {
                            y: "-130%",
                            transition: { duration: 0.6, delay: 0.05, ease: EASE },
                          }
                    }
                  >
                    {[slide.piece.material, slide.piece.surface]
                      .filter(Boolean)
                      .join(" · ")}
                  </motion.p>
                </AnimatePresence>
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <a
                href="#unikate"
                className="group inline-flex min-h-11 items-center gap-2 font-sans text-[11.5px] uppercase tracking-[0.2em] text-ink-foreground transition-colors hover:text-gold"
              >
                Unikate entdecken
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
                >
                  →
                </span>
              </a>
              <a
                href={ATELIER.phoneHref}
                className="group inline-flex min-h-11 items-center gap-2 font-sans text-[11.5px] uppercase tracking-[0.2em] text-ink-foreground/80 transition-colors hover:text-gold"
              >
                Termin — {ATELIER.phoneDisplay}
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
                >
                  →
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom info row */}
      <motion.div
        className="relative z-0 flex flex-col gap-2 border-t border-ink-foreground/15 px-6 py-5 font-sans text-[11px] uppercase tracking-[0.2em] text-ink-foreground/90 sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:text-[12px] lg:px-[min(10.5vw,152px)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.35, ease: EASE }}
      >
        <p>Do + Fr 10–18 · Sa 10–14 · n. Vereinbarung</p>
        <a
          href={ATELIER.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold sm:min-h-0"
        >
          {ATELIER.street}, {ATELIER.city}
        </a>
        <p>Goldschmiede-Atelier seit 2001</p>
      </motion.div>
    </section>
  );
}
