"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { AccentHeading, Reveal, EASE, useReducedMotionSafe } from "./Reveal";
import type { MeisterinContent, TimelineEntry } from "@/lib/defaults";

const DISPLAY_VARIATION = { fontVariationSettings: '"SOFT" 0, "WONK" 0, "opsz" 144' } as const;
const ACCENT_VARIATION = { fontVariationSettings: '"SOFT" 60, "WONK" 1, "opsz" 144' } as const;

export function Meisterin({
  content,
  timeline,
}: {
  content: MeisterinContent;
  timeline: TimelineEntry[];
}) {
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
              {content.eyebrow}
            </p>
          </Reveal>

          <AccentHeading
            text={content.heading}
            className="mt-7 font-display text-[clamp(30px,4.6vw,60px)] leading-[1.08] tracking-[-0.015em] text-foreground"
            style={DISPLAY_VARIATION}
          />

          <Reveal delay={0.15} className="mt-9 max-w-[480px]">
            {content.paragraphs.map((text, i) => (
              <p
                key={i}
                className={`font-serif text-[17px] leading-[1.7] text-foreground/85 text-pretty sm:text-[18px] ${i > 0 ? "mt-5" : ""}`}
              >
                {text}
              </p>
            ))}
          </Reveal>

          {/* Timeline — departure board */}
          <div className="mt-12 max-w-[480px] [perspective:900px]">
            {timeline.map((entry, i) => (
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
                    src={content.image.src}
                    alt={content.image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </div>
            <p className="mt-5 flex items-center justify-between font-sans text-[11px] uppercase tracking-[0.2em] text-foreground/70">
              <span>{content.imageCaptionLeft}</span>
              <span>{content.imageCaptionRight}</span>
            </p>
          </Reveal>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-foreground/12 pt-8">
            {content.stats.map((stat, i) => (
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
