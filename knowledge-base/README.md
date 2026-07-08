# Knowledge Base — AURA – Unikatschmuck (Petra Hübner, Lübeck)

Single source of truth for the website. Captured **2026-07-08** from the live site
`http://www.aura-unikatschmuck.de/` (HTTP-only, pre-2007 static HTML) plus cross-checked
business-directory listings. Treat everything in this folder as authoritative; anything
not in here is unknown.

> ## ⚠️ Copy rule
> Use ONLY the copy stored in this knowledge base as factual basis. Do not invent facts,
> services, prices, awards, or testimonials. Piece specifications (materials, dimensions,
> carat) must match `data/pieces.json` exactly. Open questions live in `GAPS.md` — content
> written for unconfirmed areas must stay within the verified positioning and be flagged
> there. Prices are never shown: the house convention is **„Preis auf Anfrage“**.

## Quick facts

| | |
|---|---|
| Brand | **AURA – Unikatschmuck** |
| Legal | Aura Schmuck Design, Inh. Petra Hübner (Einzelunternehmen) |
| Owner | **Petra Hübner, Goldschmiedemeisterin** (Meisterprüfung 1997) |
| Address | Hüxstraße 32, 23552 Lübeck (Altstadt) |
| Phone / Fax | 0451 – 706 38 74 |
| E-Mail | info@aura-unikatschmuck.de |
| Hours | Do + Fr 10–18 Uhr, Sa 10–14 Uhr, und nach telefonischer oder persönlicher Vereinbarung |
| Strapline | „AURA – außergewöhnlicher Unikatschmuck im Herzen Lübecks." |
| Signature | Zweifarbigkeit Silber + Gold / Silber + Kupfer · Punzieren · Strichmattierung · fast bildhauerische Bearbeitung |
| Pricing | Keine Preise online → „Preis auf Anfrage" |
| Socials | **Keine** (kein Instagram/Facebook/Etsy gefunden) |
| Reviews | **Keine** online (Google/Yelp leer — keine Testimonials erfinden!) |

## Timeline (verified, from profil.htm)

- Ausbildung zur Goldschmiedin (formale Lehre; danach verschiedene Werkstätten)
- **1991** — Schritt in die Selbstständigkeit (zunächst in Zusammenarbeit mit anderen Goldschmieden)
- **1997** — Meisterprüfung im Goldschmiedehandwerk
- **2001** — Eröffnung des eigenen Ateliers in der Hüxstraße 32, Lübeck

## Files

- `content/profil.md` — verbatim bio/positioning copy (German) from the old site
- `content/kontakt.md` — verbatim contact/hours copy
- `content/impressum.md` — verbatim legal data + known issues
- `content/unikate.md` — the three documented pieces, verbatim specs
- `data/atelier.json` — structured business data (standard schema of our vertical templates)
- `data/pieces.json` — structured piece catalog incl. provenance flags (real vs. illustrative)
- `images/MANIFEST.md` — image provenance (old-site URLs + generated-image records)
- `GAPS.md` — open questions for the client (services, prices, portrait, USt-ID, Datenschutz)

## Sources

- `http://www.aura-unikatschmuck.de/index.htm` (home)
- `http://www.aura-unikatschmuck.de/pages/mainpages/profil.htm` (bio)
- `http://www.aura-unikatschmuck.de/pages/mainpages/kontakt.htm` (contact/hours)
- `http://www.aura-unikatschmuck.de/pages/mainpages/impressum.htm` (legal)
- `http://www.aura-unikatschmuck.de/pages/secpages/ringschm.htm` (Ringe)
- `http://www.aura-unikatschmuck.de/pages/secpages/ohrschm.htm` (Ohrschmuck)
- `http://www.aura-unikatschmuck.de/pages/secpages/halsschm.htm` (Halsschmuck)
- Directory cross-checks: gelbeseiten.de, 11880.com, cylex.de, stadtbranche.de, yelp.de u. a.

Note: the site is served over plain HTTP (no valid TLS) and was read through a rendering
proxy; original image files could not be mirrored. See `images/MANIFEST.md`.
