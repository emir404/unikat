"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { Reveal, Stagger, StaggerItem, EASE, useReducedMotionSafe } from "./Reveal";

const DISPLAY_VARIATION = { fontVariationSettings: '"SOFT" 0, "WONK" 0, "opsz" 144' } as const;
const ACCENT_VARIATION = { fontVariationSettings: '"SOFT" 60, "WONK" 1, "opsz" 144' } as const;

const STEPS = [
  {
    nr: "01",
    title: "Gespräch & Idee",
    text: "Am Anfang steht ein Gedanke — ein Stein, ein Anlass, eine Form. Im Atelier wird daraus eine Richtung.",
  },
  {
    nr: "02",
    title: "Entwurf & Modellation",
    text: "Aus Skizze und Modell entsteht der eigene Entwurf — mit dem Blick der Bildhauerei, aus der diese Arbeit kommt.",
  },
  {
    nr: "03",
    title: "Schmelzen & Verbinden",
    text: "Silber und Gold — oder Silber und Kupfer — werden gegossen, geschmiedet und zu einem Stück gefügt.",
  },
  {
    nr: "04",
    title: "Punzieren",
    text: "Punze um Punze, von Hand gesetzt: die Oberfläche bekommt ihre Struktur, das Licht seinen Rhythmus.",
  },
  {
    nr: "05",
    title: "Fassen & Vollendung",
    text: "Der Stein wird gefasst, die Flächen strichmattiert oder poliert — bis das Unikat fertig ist. Und einmalig bleibt.",
  },
];

export function Werkstatt() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotionSafe();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const photoLargeY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const photoSmallY = useTransform(scrollYProgress, [0, 1], [90, -90]);

  return (
    <section
      id="werkstatt"
      ref={ref}
      className="relative overflow-clip bg-ink px-6 py-24 text-ink-foreground sm:px-10 lg:px-[min(10.5vw,152px)] lg:py-[150px]"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
        <div>
          <Reveal y={20}>
            <p className="flex items-center gap-4 font-sans text-[11px] uppercase tracking-[0.24em] text-ink-foreground/70 sm:text-[12px]">
              <span aria-hidden className="punzen w-10 shrink-0 text-gold" />
              Die Werkstatt
            </p>
          </Reveal>
          <h2
            className="mt-7 font-display text-[clamp(38px,5.4vw,72px)] leading-[1.05] tracking-[-0.015em]"
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
                Wie ein{" "}
                <em className="text-gold" style={ACCENT_VARIATION}>
                  Unikat
                </em>
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
                entsteht.
              </motion.span>
            </span>
          </h2>
        </div>

        <Reveal delay={0.1} className="max-w-[380px]">
          <p className="font-serif text-[16px] leading-[1.65] text-ink-foreground/75 text-pretty sm:text-[17px]">
            Vom ersten Strich bis zur letzten Punze entsteht jedes Stück in
            einer Hand — am Werkbrett in der Hüxstraße.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-16 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,44%)] lg:gap-20">
        {/* Steps */}
        <Stagger className="flex flex-col" stagger={0.1}>
          {STEPS.map((step) => (
            <StaggerItem key={step.nr} y={28}>
              <div className="grid grid-cols-[64px_1fr] items-baseline gap-5 border-t border-ink-foreground/12 py-7 sm:grid-cols-[88px_1fr] sm:gap-8">
                <span
                  className="font-display text-[clamp(30px,3.4vw,44px)] italic leading-none text-gold tabular-nums"
                  style={ACCENT_VARIATION}
                  aria-hidden
                >
                  {step.nr}
                </span>
                <div>
                  <h3 className="font-sans text-[13px] uppercase tracking-[0.2em] text-ink-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 max-w-[52ch] font-serif text-[16px] leading-[1.65] text-ink-foreground/70 text-pretty sm:text-[16.5px]">
                    {step.text}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Photos */}
        <div className="relative">
          <motion.div
            className="relative ml-auto aspect-[3/2] w-full overflow-clip lg:aspect-[4/5]"
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
                src="/images/werkstatt/werkbank.jpg"
                alt="Werkbank der Goldschmiede: Feilen, Sägebogen und Punzen im warmen Licht"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="relative -mt-12 mr-auto aspect-[4/5] w-[62%] max-w-[340px] overflow-clip shadow-2xl lg:absolute lg:-left-16 lg:bottom-10 lg:mt-0 lg:w-[56%]"
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
                src="/images/werkstatt/haende-feile.jpg"
                alt="Hände der Goldschmiedin beim Feilen eines silbernen Ringrohlings am Werkbrett"
                fill
                sizes="(max-width: 1024px) 62vw, 25vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Pull quote — verbatim from the house */}
      <Reveal y={40} amount={0.4} className="mx-auto mt-20 max-w-[820px] text-center lg:mt-28">
        <p aria-hidden className="punzen mx-auto w-16 text-gold" />
        <blockquote
          className="mt-8 font-display text-[clamp(24px,3.2vw,40px)] leading-[1.3] tracking-[-0.01em] text-ink-foreground"
          style={ACCENT_VARIATION}
        >
          „…die fast bildhauerische Bearbeitung der Schmuckstücke in Form des
          Punzierens.“
        </blockquote>
        <p className="mt-6 font-sans text-[11px] uppercase tracking-[0.22em] text-ink-foreground/70">
          Über die Arbeit von Petra Hübner
        </p>
      </Reveal>
    </section>
  );
}
