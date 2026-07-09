"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import {
  AccentHeading,
  Reveal,
  Stagger,
  StaggerItem,
  EASE,
  useReducedMotionSafe,
} from "./Reveal";
import type { ZweifarbigkeitContent } from "@/lib/defaults";

export function Zweifarbigkeit({ content }: { content: ZweifarbigkeitContent }) {
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
      id="zweifarbigkeit"
      ref={ref}
      className="relative overflow-clip bg-background px-6 py-24 sm:px-10 lg:px-[min(10.5vw,152px)] lg:py-[150px]"
    >
      <div className="grid gap-14 lg:grid-cols-[minmax(0,46%)_minmax(0,1fr)] lg:gap-20">
        {/* Text column */}
        <div className="flex flex-col items-start">
          <Reveal y={20}>
            <p className="flex items-center gap-4 font-sans text-[11px] uppercase tracking-[0.24em] text-foreground/70 sm:text-[12px]">
              <span aria-hidden className="punzen w-10 shrink-0 text-copper" />
              {content.eyebrow}
            </p>
          </Reveal>

          <AccentHeading
            text={content.heading}
            accentClassName="text-copper"
            className="mt-7 font-display text-[clamp(38px,5.4vw,72px)] leading-[1.05] tracking-[-0.015em] text-foreground"
            style={{ fontVariationSettings: '"SOFT" 0, "WONK" 0, "opsz" 144' }}
          />

          <Reveal delay={0.15} className="mt-9 max-w-[440px]">
            {content.paragraphs.map((text, i) => (
              <p
                key={i}
                className={`font-serif text-[17px] leading-[1.7] text-foreground/85 text-pretty sm:text-[18px] ${i > 0 ? "mt-5" : ""}`}
              >
                {text}
              </p>
            ))}
          </Reveal>

          {/* Technique etiquettes */}
          <Stagger className="mt-12 flex w-full max-w-[440px] flex-col" stagger={0.12}>
            {content.techniques.map((t) => (
              <StaggerItem key={t.name} y={24}>
                <div className="border-t border-foreground/12 py-5">
                  <h3 className="font-sans text-[12px] uppercase tracking-[0.2em] text-foreground">
                    {t.name}
                  </h3>
                  <p className="mt-2 font-serif text-[15.5px] leading-[1.6] text-foreground/70 text-pretty">
                    {t.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Photo column — overlapping parallax pair */}
        <div className="relative">
          <motion.div
            className="relative ml-auto aspect-[4/5] w-full max-w-[560px] overflow-clip"
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
                src={content.imageGold.src}
                alt={content.imageGold.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="relative -mt-14 mr-auto aspect-[4/3] w-[76%] max-w-[420px] overflow-clip shadow-xl lg:absolute lg:-left-20 lg:bottom-2 lg:mt-0 lg:w-[64%]"
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
                src={content.imageKupfer.src}
                alt={content.imageKupfer.alt}
                fill
                sizes="(max-width: 1024px) 76vw, 30vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Full-bleed band */}
      <Reveal y={60} amount={0.2} className="mt-20 lg:mt-28">
        <div className="relative aspect-[16/7] w-full overflow-clip sm:aspect-[21/9]">
          <Image
            src={content.imageBand.src}
            alt={content.imageBand.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 79vw"
            className="object-cover"
          />
        </div>
        <p className="mt-4 flex items-center justify-between font-sans text-[11px] uppercase tracking-[0.2em] text-foreground/70">
          <span>{content.bandCaptionLeft}</span>
          <span>{content.bandCaptionRight}</span>
        </p>
      </Reveal>
    </section>
  );
}
