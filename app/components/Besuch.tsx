"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Reveal,
  TextLineReveal,
  EASE,
  useReducedMotionSafe,
} from "./Reveal";
import { HOURS, DISPLAY_ORDER, HOURS_NOTE, useOpenState } from "../data/openingHours";
import { ATELIER } from "../data/atelier";

const DISPLAY_VARIATION = { fontVariationSettings: '"SOFT" 0, "WONK" 0, "opsz" 144' } as const;
const ACCENT_VARIATION = { fontVariationSettings: '"SOFT" 60, "WONK" 1, "opsz" 144' } as const;

export function Besuch() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotionSafe();
  const openState = useOpenState();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const ghostY = useTransform(scrollYProgress, [0, 1], [110, -110]);

  return (
    <section
      id="besuch"
      ref={ref}
      className="relative overflow-clip bg-background px-6 py-24 sm:px-10 lg:px-[min(10.5vw,152px)] lg:py-[150px]"
    >
      {/* Ghost wordmark */}
      <motion.p
        aria-hidden
        className="pointer-events-none absolute -right-[3vw] top-6 select-none font-display leading-none text-transparent text-[clamp(140px,26vw,400px)]"
        style={{
          ...DISPLAY_VARIATION,
          WebkitTextStroke: "1.5px rgba(32,29,26,0.07)",
          y: reducedMotion ? 0 : ghostY,
        }}
      >
        Aura
      </motion.p>

      <div className="relative">
        <Reveal y={20}>
          <p className="flex items-center gap-4 font-sans text-[11px] uppercase tracking-[0.24em] text-foreground/70 sm:text-[12px]">
            <span aria-hidden className="punzen w-10 shrink-0 text-copper" />
            Besuch & Termin
          </p>
        </Reveal>

        <TextLineReveal
          as="h2"
          lines={["Im Herzen", "Lübecks."]}
          className="mt-7 font-display text-[clamp(38px,5.4vw,72px)] leading-[1.05] tracking-[-0.015em] text-foreground"
        />

        {/* Giant dial number */}
        <div className="mt-14 lg:mt-20">
          <Reveal y={24}>
            <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-foreground/70 sm:text-[12px]">
              Termin vereinbaren — rufen Sie an
            </p>
          </Reveal>
          <motion.span
            className="mt-3 block overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.a
              href={ATELIER.phoneHref}
              className="group block w-fit max-w-full"
              variants={{
                hidden: reducedMotion ? { opacity: 0 } : { y: "105%" },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { duration: 1.1, delay: 0.1, ease: EASE },
                },
              }}
            >
              <span
                className="block whitespace-nowrap font-display leading-[1.05] tracking-[-0.01em] text-foreground transition-colors duration-500 group-hover:text-copper text-[clamp(38px,7.6vw,110px)] tabular-nums"
                style={DISPLAY_VARIATION}
              >
                0451&nbsp;–&nbsp;706&nbsp;38&nbsp;74
              </span>
              <span
                aria-hidden
                className="mt-2 block h-[3px] w-full origin-left scale-x-0 bg-copper transition-transform duration-700 ease-out group-hover:scale-x-100"
              />
            </motion.a>
          </motion.span>

          <Reveal delay={0.15} className="mt-7">
            <p className="flex flex-wrap items-center gap-x-8 gap-y-3 font-serif text-[16px] text-foreground/75 sm:text-[17px]">
              <a
                href={`mailto:${ATELIER.email}`}
                className="group inline-flex min-h-11 items-center gap-2 text-foreground transition-colors hover:text-copper sm:min-h-0"
              >
                {ATELIER.email}
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
                >
                  →
                </span>
              </a>
              <span className="hidden text-foreground/30 sm:inline" aria-hidden>
                ·
              </span>
              <a
                href={ATELIER.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center text-foreground underline decoration-copper/40 underline-offset-4 transition-colors hover:text-copper sm:min-h-0"
              >
                {ATELIER.street}, {ATELIER.zip} {ATELIER.city}
              </a>
            </p>
          </Reveal>
        </div>

        {/* Hours + street mood */}
        <div className="mt-20 grid gap-14 lg:mt-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,42%)] lg:gap-20">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Reveal>
                <h3 className="font-sans text-[14px] uppercase tracking-[0.22em] text-foreground">
                  Öffnungszeiten
                </h3>
              </Reveal>
              {openState && (
                <motion.p
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className={`flex items-center gap-2.5 border px-4 py-2 font-sans text-[11px] uppercase tracking-[0.16em] ${
                    openState.isOpen
                      ? "border-copper/40 text-copper"
                      : "border-foreground/20 text-foreground/70"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`inline-block size-2 rounded-full ${
                      openState.isOpen
                        ? "animate-pulse bg-copper"
                        : "bg-foreground/40"
                    }`}
                  />
                  {openState.isOpen ? "Jetzt geöffnet" : "Derzeit geschlossen"}
                </motion.p>
              )}
            </div>

            <div className="mt-8 [perspective:900px]">
              {DISPLAY_ORDER.map((dayIndex, i) => {
                const { day, time } = HOURS[dayIndex];
                const isToday = openState?.day === dayIndex;
                const isClosed = HOURS[dayIndex].open === null;
                return (
                  <motion.div
                    key={day}
                    initial={
                      reducedMotion
                        ? { opacity: 0 }
                        : { opacity: 0, rotateX: -70, y: 24 }
                    }
                    whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.7, delay: i * 0.07, ease: EASE }}
                    className={`relative flex items-baseline justify-between gap-4 border-b border-foreground/10 px-4 py-4 [transform-origin:top] sm:px-6 ${
                      isToday ? "bg-surface" : ""
                    }`}
                  >
                    {isToday && (
                      <motion.span
                        aria-hidden
                        className="absolute bottom-0 left-0 top-0 w-1 bg-copper"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
                      />
                    )}
                    <span className="flex items-baseline gap-3 font-sans text-[13px] uppercase tracking-[0.16em] text-foreground">
                      {day}
                      {isToday && (
                        <span className="font-sans text-[10px] tracking-[0.16em] text-copper">
                          Heute
                        </span>
                      )}
                    </span>
                    <span
                      className={`font-serif text-[16px] tabular-nums ${
                        isClosed ? "text-foreground/65" : "text-foreground/90"
                      }`}
                    >
                      {time}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            <Reveal delay={0.2} className="mt-6">
              <p className="font-serif text-[15px] italic leading-[1.6] text-foreground/65">
                {HOURS_NOTE}
              </p>
            </Reveal>
          </div>

          <Reveal y={50} amount={0.2}>
            <div className="relative aspect-[3/2] w-full overflow-clip lg:aspect-[4/4.1]">
              <Image
                src="/images/besuch/schaufenster.jpg"
                alt="Abendstimmung in der Hüxstraße: warm beleuchtetes Schaufenster des Ateliers in der Lübecker Altstadt"
                fill
                sizes="(max-width: 1024px) 100vw, 38vw"
                className="object-cover"
              />
            </div>
            <p className="mt-5 flex items-center justify-between font-sans text-[11px] uppercase tracking-[0.2em] text-foreground/70">
              <span>Die Hüxstraße</span>
              <span>Lübecker Altstadt</span>
            </p>
          </Reveal>
        </div>
      </div>

      {/* Map with floating card */}
      <div className="relative mt-16 lg:mt-24">
        <Reveal y={60} amount={0.15}>
          <div className="relative aspect-[4/3] w-full overflow-clip sm:aspect-[16/9] lg:aspect-[21/9]">
            <iframe
              src={ATELIER.mapsEmbedUrl}
              title="AURA – Unikatschmuck auf Google Maps – Hüxstraße 32, 23552 Lübeck"
              className="absolute inset-0 h-full w-full border-0 grayscale-[0.35] contrast-[0.95]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>

        <motion.div
          className="relative -mt-8 ml-4 mr-4 border-l-4 border-copper bg-surface p-6 shadow-xl sm:absolute sm:bottom-8 sm:left-8 sm:ml-0 sm:mr-0 sm:mt-0 sm:max-w-[360px]"
          initial={{
            opacity: 0,
            y: reducedMotion ? 0 : 60,
            x: reducedMotion ? 0 : -24,
          }}
          whileInView={{ opacity: 1, y: 0, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ type: "spring", stiffness: 90, damping: 16, delay: 0.2 }}
        >
          <p
            className="font-display text-[20px] leading-tight text-foreground"
            style={DISPLAY_VARIATION}
          >
            Aura{" "}
            <em className="text-copper" style={ACCENT_VARIATION}>
              Unikatschmuck
            </em>
          </p>
          <a
            href={ATELIER.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2.5 block font-serif text-[15.5px] leading-[1.6] text-foreground/80 underline decoration-copper/40 underline-offset-4 transition-colors hover:text-copper"
          >
            {ATELIER.street}
            <br />
            {ATELIER.zip} {ATELIER.city} · Altstadt
          </a>
          <a
            href={ATELIER.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-4 inline-flex min-h-11 items-center gap-2 font-sans text-[11px] uppercase tracking-[0.18em] text-copper sm:min-h-0"
          >
            Route planen
            <span
              aria-hidden
              className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
            >
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
