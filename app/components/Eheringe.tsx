"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { Reveal, Stagger, StaggerItem, EASE, useReducedMotionSafe } from "./Reveal";
import { ATELIER } from "../data/atelier";

const DISPLAY_VARIATION = { fontVariationSettings: '"SOFT" 0, "WONK" 0, "opsz" 144' } as const;
const ACCENT_VARIATION = { fontVariationSettings: '"SOFT" 60, "WONK" 1, "opsz" 144' } as const;

const STEPS = [
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
];

export function Eheringe() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotionSafe();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const photoLargeY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const photoSmallY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      id="eheringe"
      ref={ref}
      className="relative overflow-clip bg-surface px-6 py-24 sm:px-10 lg:px-[min(10.5vw,152px)] lg:py-[150px]"
    >
      <div className="grid gap-14 lg:grid-cols-[minmax(0,46%)_minmax(0,1fr)] lg:gap-20">
        {/* Photo column */}
        <div className="relative order-2 lg:order-1">
          <motion.div
            className="relative aspect-[4/5] w-full max-w-[560px] overflow-clip"
            style={reducedMotion ? undefined : { y: photoLargeY }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: reducedMotion ? 1 : 1.15, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.4, ease: EASE }}
            >
              <Image
                src="/images/eheringe/eheringe-paar.jpg"
                alt="Zwei zweifarbige Eheringe aus strichmattiertem Silber mit innenliegendem Gold, aneinandergelehnt"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="relative -mt-14 ml-auto aspect-[4/3] w-[72%] max-w-[400px] overflow-clip shadow-xl lg:absolute lg:-right-14 lg:bottom-4 lg:mt-0 lg:w-[62%]"
            style={reducedMotion ? undefined : { y: photoSmallY }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: reducedMotion ? 1 : 1.15, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.4, delay: 0.15, ease: EASE }}
            >
              <Image
                src="/images/eheringe/anfertigung-detail.jpg"
                alt="Auf dem Werkbrett: Entwurfsskizze, Ringrohling und loser Edelstein einer Anfertigung"
                fill
                sizes="(max-width: 1024px) 72vw, 28vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Text column */}
        <div className="order-1 flex flex-col items-start lg:order-2">
          <Reveal y={20}>
            <p className="flex items-center gap-4 font-sans text-[11px] uppercase tracking-[0.24em] text-foreground/70 sm:text-[12px]">
              <span aria-hidden className="punzen w-10 shrink-0 text-copper" />
              Eheringe & Anfertigungen
            </p>
          </Reveal>

          <h2
            className="mt-7 font-display text-[clamp(38px,5.4vw,72px)] leading-[1.05] tracking-[-0.015em] text-foreground"
            style={DISPLAY_VARIATION}
          >
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={reducedMotion ? { opacity: 0 } : { y: "110%" }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1, ease: EASE }}
              >
                Zwei Ringe,
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={reducedMotion ? { opacity: 0 } : { y: "110%" }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1, delay: 0.12, ease: EASE }}
              >
                <em className="text-copper" style={ACCENT_VARIATION}>
                  eine
                </em>{" "}
                Geschichte.
              </motion.span>
            </span>
          </h2>

          <Reveal delay={0.15} className="mt-9 max-w-[440px]">
            <p className="font-serif text-[17px] leading-[1.7] text-foreground/85 text-pretty sm:text-[18px]">
              Eheringe in der charakteristischen Zweifarbigkeit des Hauses —
              und Anfertigungen nach eigenem Entwurf: Was am Werkbrett
              entsteht, beginnt immer mit einem Gespräch.
            </p>
          </Reveal>

          <Stagger className="mt-10 flex w-full max-w-[440px] flex-col" stagger={0.12}>
            {STEPS.map((step, i) => (
              <StaggerItem key={step.title} y={24}>
                <div className="grid grid-cols-[56px_1fr] items-baseline gap-4 border-t border-foreground/12 py-6 sm:grid-cols-[64px_1fr]">
                  <span
                    className="font-display text-[26px] italic leading-none text-copper tabular-nums"
                    style={ACCENT_VARIATION}
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-sans text-[12px] uppercase tracking-[0.2em] text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-2 font-serif text-[15.5px] leading-[1.6] text-foreground/70 text-pretty">
                      {step.text}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.2} className="mt-8">
            <a
              href={ATELIER.phoneHref}
              className="flex h-[46px] items-center justify-center bg-foreground px-7 font-sans text-[12px] uppercase tracking-[0.18em] text-background transition-colors hover:bg-copper"
            >
              Termin vereinbaren
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
