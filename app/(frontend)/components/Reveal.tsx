"use client";

import { useSyncExternalStore } from "react";
import { motion, type Variants } from "motion/react";

export const EASE = [0.22, 1, 0.36, 1] as const;

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void): () => void {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getReducedMotionSnapshot(): boolean {
  return typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia(REDUCED_MOTION_QUERY).matches
    : false;
}

/**
 * Hydration-safe reduced-motion hook. Framer's `useReducedMotion()` reads the
 * media query synchronously on the client, diverging from the server's `false`
 * and triggering a hydration mismatch. `useSyncExternalStore` uses the server
 * snapshot during hydration and swaps to the real preference afterwards.
 */
export function useReducedMotionSafe(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 40,
  duration = 1,
  once = true,
  amount = 0.3,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
}) {
  const reducedMotion = useReducedMotionSafe();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reducedMotion ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const staggerContainer: Variants = {
  hidden: {},
  visible: (stagger: number = 0.08) => ({
    transition: { staggerChildren: stagger },
  }),
};

export function Stagger({
  children,
  className,
  stagger = 0.08,
  amount = 0.2,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  amount?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      custom={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 32,
  duration = 0.9,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  duration?: number;
}) {
  const reducedMotion = useReducedMotionSafe();

  const item: Variants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : y },
    visible: { opacity: 1, y: 0, transition: { duration, ease: EASE } },
  };

  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}

const ACCENT_VARIATION = {
  fontVariationSettings: '"SOFT" 60, "WONK" 1, "opsz" 144',
} as const;

type AccentPart = { text: string; accent: boolean };

/** Split a line into plain/accent parts using the *asterisk* convention. */
function parseAccentLine(line: string): AccentPart[] {
  const parts: AccentPart[] = [];
  const regex = /\*([^*]+)\*/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(line)) !== null) {
    if (match.index > last) {
      parts.push({ text: line.slice(last, match.index), accent: false });
    }
    parts.push({ text: match[1], accent: true });
    last = match.index + match[0].length;
  }
  if (last < line.length) parts.push({ text: line.slice(last), accent: false });
  return parts.length > 0 ? parts : [{ text: line, accent: false }];
}

function AccentParts({
  parts,
  accentClassName,
}: {
  parts: AccentPart[];
  accentClassName: string;
}) {
  return (
    <>
      {parts.map((p, i) =>
        p.accent ? (
          <em key={i} className={accentClassName} style={ACCENT_VARIATION}>
            {p.text}
          </em>
        ) : (
          <span key={i}>{p.text}</span>
        ),
      )}
    </>
  );
}

/**
 * Animated heading built from a plain string: newlines become masked,
 * line-by-line reveals and *asterisk*-wrapped words become accent spans.
 * `trigger="mount"` animates on load (hero), `"inView"` animates on scroll.
 */
export function AccentHeading({
  text,
  className,
  style,
  accentClassName = "",
  trigger = "inView",
  baseDelay = 0,
  lineDelay = 0.12,
  duration = 1,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  accentClassName?: string;
  trigger?: "mount" | "inView";
  baseDelay?: number;
  lineDelay?: number;
  duration?: number;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const reducedMotion = useReducedMotionSafe();
  const lines = text.split("\n");

  return (
    <Tag className={className} style={style}>
      {lines.map((line, i) => {
        const parts = parseAccentLine(line);
        const delay = baseDelay + i * lineDelay;
        const inner = (
          <AccentParts parts={parts} accentClassName={accentClassName} />
        );

        if (trigger === "mount") {
          return (
            <span key={i} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={reducedMotion ? { opacity: 0 } : { y: "110%" }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration, delay, ease: EASE }}
              >
                {inner}
              </motion.span>
            </span>
          );
        }

        return (
          <motion.span
            key={i}
            className="block overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
          >
            <motion.span
              className="block"
              variants={{
                hidden: reducedMotion ? { opacity: 0 } : { y: "110%" },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { duration, delay, ease: EASE },
                },
              }}
            >
              {inner}
            </motion.span>
          </motion.span>
        );
      })}
    </Tag>
  );
}

export function TextLineReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
  as: Tag = "h2",
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const reducedMotion = useReducedMotionSafe();

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        // whileInView must observe the untransformed wrapper: the inner span's
        // own initial translate would push it out of the viewport and the
        // reveal would never trigger.
        <motion.span
          key={i}
          className="block overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
        >
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            variants={{
              hidden: reducedMotion ? { opacity: 0 } : { y: "110%" },
              visible: {
                y: 0,
                opacity: 1,
                transition: { duration: 1, delay: delay + i * 0.12, ease: EASE },
              },
            }}
          >
            {line}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  );
}
