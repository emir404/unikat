"use client";

import { useEffect, useState } from "react";

export type HourEntry = {
  day: string;
  time: string;
  open: [number, number] | null;
};

// index 0 = Sonntag (matches Date.getDay()).
// Quelle: knowledge-base/content/kontakt.md — „do + fr 10.00 – 18.00 Uhr,
// sa 10.00 – 14.00 Uhr und nach telefonischer oder persönlicher Vereinbarung."
export const HOURS: HourEntry[] = [
  { day: "Sonntag", time: "Geschlossen", open: null },
  { day: "Montag", time: "Nach Vereinbarung", open: null },
  { day: "Dienstag", time: "Nach Vereinbarung", open: null },
  { day: "Mittwoch", time: "Nach Vereinbarung", open: null },
  { day: "Donnerstag", time: "10:00 – 18:00", open: [10 * 60, 18 * 60] },
  { day: "Freitag", time: "10:00 – 18:00", open: [10 * 60, 18 * 60] },
  { day: "Samstag", time: "10:00 – 14:00", open: [10 * 60, 14 * 60] },
];

export const DISPLAY_ORDER = [1, 2, 3, 4, 5, 6, 0];

export const HOURS_NOTE =
  "… und jederzeit nach telefonischer oder persönlicher Vereinbarung.";

/** Current weekday + minutes in the atelier's timezone (Europe/Berlin). */
export function berlinNow(): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Berlin",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? "";
  const dayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(
    get("weekday"),
  );
  return {
    day: dayIndex,
    minutes: parseInt(get("hour"), 10) * 60 + parseInt(get("minute"), 10),
  };
}

export function useOpenState() {
  const [state, setState] = useState<{ day: number; isOpen: boolean } | null>(
    null,
  );

  useEffect(() => {
    const update = () => {
      const { day, minutes } = berlinNow();
      const range = HOURS[day].open;
      setState({
        day,
        isOpen: range !== null && minutes >= range[0] && minutes < range[1],
      });
    };
    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, []);

  return state;
}
