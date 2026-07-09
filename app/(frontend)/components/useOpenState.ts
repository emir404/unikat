"use client";

import { useEffect, useState } from "react";
import type { HourEntry } from "@/lib/defaults";

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

export function useOpenState(hours: HourEntry[]) {
  const [state, setState] = useState<{ day: number; isOpen: boolean } | null>(
    null,
  );

  useEffect(() => {
    const update = () => {
      const { day, minutes } = berlinNow();
      const entry = hours.find((h) => h.weekday === day);
      const isOpen =
        !!entry &&
        entry.openStart != null &&
        entry.openEnd != null &&
        minutes >= entry.openStart &&
        minutes < entry.openEnd;
      setState({ day, isOpen });
    };
    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, [hours]);

  return state;
}
