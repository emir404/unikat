import { getPayload } from "payload";
import config from "@payload-config";
import type { Media } from "@/payload-types";
import type { Img } from "@/lib/defaults";

/** Cached Payload instance (getPayload memoizes per config). */
export function getCms() {
  return getPayload({ config });
}

/** Resolve an upload relation to a plain { src, alt } object, or null. */
export function toImg(
  media: number | Media | null | undefined,
  fallbackAlt = "",
): Img | null {
  if (media && typeof media === "object" && media.url) {
    return { src: media.url, alt: media.alt || fallbackAlt };
  }
  return null;
}
