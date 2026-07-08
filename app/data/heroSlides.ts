// Hero campaign slides — one per catalog piece with provenance "real"
// (pieces.ts is the single source of truth; captions pull material/specs
// from there so the hero can never drift from the catalog).
// Images: dark-slate campaign renditions of the catalog pieces
// (public/images/hero/), generated in the same set/light as hero-atmo.jpg.

import { PIECES, type Piece } from "./pieces";

export type HeroSlide = {
  piece: Piece;
  image: string;
  alt: string;
  /** Short display name — a factual fragment of piece.name. */
  shortName: string;
  /** One measurable spec, verbatim from the catalog data. */
  spec: string;
  /** CSS object-position — keeps the piece clear of the headline per crop. */
  objectPosition: string;
  /** Flat legibility tint, tuned per image brightness under the caption. */
  tint: string;
};

function pieceById(id: string): Piece {
  const piece = PIECES.find((p) => p.id === id);
  if (!piece) throw new Error(`Hero slide references unknown piece "${id}"`);
  return piece;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    piece: pieceById("ring-turmalin"),
    image: "/images/hero/hero-atmo.jpg",
    alt: "Unikat von Petra Hübner: strichmattierter Ring aus Silber und Gold mit indigoblauem Turmalin, auf dunklem Schiefer im warmen Licht",
    shortName: "Ring mit Turmalin",
    spec: "3,51 ct",
    objectPosition: "68% center",
    tint: "bg-ink/55 sm:bg-ink/30",
  },
  {
    piece: pieceById("halsreif-zehnreihig"),
    image: "/images/hero/hero-halsreif.jpg",
    alt: "Unikat von Petra Hübner: zehnreihiger Halsreif aus Silber mit punziertem Goldelement, auf dunklem Schiefer im warmen Licht",
    shortName: "Zehnreihiger Halsreif",
    spec: "42 / 45 cm",
    objectPosition: "60% center",
    tint: "bg-ink/60 sm:bg-ink/40",
  },
  {
    piece: pieceById("ohrstecker-dreieck"),
    image: "/images/hero/hero-ohrstecker.jpg",
    alt: "Unikat von Petra Hübner: punzierte Ohrstecker in Dreiecksform aus Gold und Silber, auf dunklem Schiefer im warmen Licht",
    shortName: "Punzierter Ohrstecker",
    spec: "16 × 13 mm",
    objectPosition: "62% 45%",
    tint: "bg-ink/60 sm:bg-ink/40",
  },
];
