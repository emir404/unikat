# unikat — Schmuck-Vertical-Template

Vertical website template for **jewelry ateliers / goldsmith studios** (Goldschmieden), sibling of the
`trattoria` (restaurants) and `kleinundfeincafe` (cafés) templates. Currently seeded as a complete site
for **AURA – Unikatschmuck, Petra Hübner, Lübeck**.

## Stack

- Next.js 16 (App Router, Turbopack), React 19
- Tailwind CSS v4 — CSS-first, tokens in `app/globals.css` (`:root` + `@theme inline`), no config file
- `motion` (motion/react) + `lenis` for restrained, reduced-motion-safe animation
- Bun as package manager and runner
- No CMS, no forms, no e-commerce — phone/visit-first, `Preis auf Anfrage` register

## Develop

```bash
bun install
bun run dev     # http://localhost:3000
bun run build
bun run lint
```

## Reskinning workflow

1. Crawl the new house's site → fill `knowledge-base/` (single source of truth; see its README and Copy rule).
2. Follow `PROMPT.md` — it defines the luxury house standard and how the KB drives design decisions.
3. All content lives in `app/data/*.ts` and section components under `app/components/` — transcribed
   from the knowledge base, never invented.
4. Imagery: `public/images/<section>/…`, generated with the `genmedia` CLI where client photos are
   missing (quality bar in `PROMPT.md`; provenance in `knowledge-base/images/MANIFEST.md`).

## Content notes for this seed (Aura)

- Open questions for the client are collected in `knowledge-base/GAPS.md`.
- `/datenschutz` is standard boilerplate and marked for legal review; the old site had none.
- The Meisterin portrait slot intentionally awaits a real photograph — no generated portrait is used.
