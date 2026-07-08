"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Reveal, TextLineReveal, EASE, useReducedMotionSafe } from "./Reveal";
import { TIMELINE } from "../data/atelier";

const DISPLAY_VARIATION = { fontVariationSettings: '"SOFT" 0, "WONK" 0, "opsz" 144' } as const;
const ACCENT_VARIATION = { fontVariationSettings: '"SOFT" 60, "WONK" 1, "opsz" 144' } as const;

const STATS = [
  { value: "1991", label: "Selbstständig seit" },
  { value: "1997", label: "Meisterprüfung im Goldschmiedehandwerk" },
  { value: "2001", label: "Eigenes Atelier, Hüxstraße 32" },
];

export function Meisterin() {
  const reducedMotion = useReducedMotionSafe();

  return (
    <section
      id="meisterin"
      className="relative overflow-clip bg-background px-6 py-24 sm:px-10 lg:px-[min(10.5vw,152px)] lg:py-[150px]"
    >
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,44%)] lg:gap-20">
        {/* Text column */}
        <div>
          <Reveal y={20}>
            <p className="flex items-center gap-4 font-sans text-[11px] uppercase tracking-[0.24em] text-foreground/70 sm:text-[12px]">
              <span aria-hidden className="punzen w-10 shrink-0 text-copper" />
              Die Meisterin
            </p>
          </Reveal>

          <TextLineReveal
            as="h2"
            lines={["Petra Hübner,", "Goldschmiedemeisterin."]}
            className="mt-7 font-display text-[clamp(30px,4.6vw,60px)] leading-[1.08] tracking-[-0.015em] text-foreground"
          />

          <Reveal delay={0.15} className="mt-9 max-w-[480px]">
            <p className="font-serif text-[17px] leading-[1.7] text-foreground/85 text-pretty sm:text-[18px]">
              Der Spaß an der kreativen Modellation und Bildhauerei führte
              Petra Hübner in die Ausbildung zur Goldschmiedin — und über
              verschiedene Werkstätten, Serienarbeit und hochwertige Unikate
              schließlich zu eigenen Entwürfen.
            </p>
            <p className="mt-5 font-serif text-[17px] leading-[1.7] text-foreground/85 text-pretty sm:text-[18px]">
              1991 wagte sie den Schritt in die Selbstständigkeit, 1997 legte
              sie die Meisterprüfung im Goldschmiedehandwerk ab. Seit 2001
              arbeitet sie in ihrem eigenen Atelier in der Hüxstraße 32 —
              mitten in der Lübecker Altstadt.
            </p>
          </Reveal>

          {/* Timeline — departure board */}
          <div className="mt-12 max-w-[480px] [perspective:900px]">
            {TIMELINE.map((entry, i) => (
              <motion.div
                key={entry.year}
                initial={
                  reducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, rotateX: -70, y: 24 }
                }
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, delay: i * 0.09, ease: EASE }}
                className="grid grid-cols-[76px_1fr] items-baseline gap-5 border-t border-foreground/12 py-5 [transform-origin:top] sm:grid-cols-[92px_1fr]"
              >
                <span
                  className="font-display text-[clamp(24px,2.6vw,32px)] italic leading-none text-copper tabular-nums"
                  style={ACCENT_VARIATION}
                >
                  {entry.year}
                </span>
                <p className="font-serif text-[15.5px] leading-[1.55] text-foreground/75 text-pretty">
                  {entry.event}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Photo column */}
        <div className="flex flex-col">
          <Reveal y={50} amount={0.2}>
            <div className="relative">
              <div
                aria-hidden
                className="absolute -bottom-3 -left-3 h-full w-full border border-copper/35"
              />
              <div className="relative aspect-[4/3] w-full overflow-clip lg:aspect-[4/4.4]">
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: reducedMotion ? 1 : 1.12, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 1.4, ease: EASE }}
                >
                  <Image
                    src="/images/meisterin/atelier.jpg"
                    alt="Das Atelier in der Hüxstraße: Vitrine mit Unikatschmuck, dahinter das Werkbrett im Tageslicht"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </div>
            <p className="mt-5 flex items-center justify-between font-sans text-[11px] uppercase tracking-[0.2em] text-foreground/70">
              <span>Das Atelier, Hüxstraße 32</span>
              <span>Lübecker Altstadt</span>
            </p>
          </Reveal>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-foreground/12 pt-8">
            {STATS.map((stat, i) => (
              <Reveal key={stat.value} delay={0.1 + i * 0.08} y={20}>
                <p
                  className="font-display text-[clamp(26px,3vw,38px)] leading-none text-foreground tabular-nums"
                  style={DISPLAY_VARIATION}
                >
                  {stat.value}
                </p>
                <p className="mt-2.5 font-sans text-[10.5px] uppercase tracking-[0.16em] leading-[1.5] text-foreground/70">
                  {stat.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
