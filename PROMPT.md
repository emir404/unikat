You're reskinning our jewelry template for a new client. The knowledge base has just been updated with the new house's details — treat it as the single source of truth. Read it fully before touching any code.

Our house standard is LUXURY / HIGH-END. Every site we ship is upscale, refined, and expensive-feeling — restrained, not loud. This is non-negotiable. The knowledge base decides *how* that luxury is expressed for this specific jeweler; it never lowers the bar to casual or playful.

1. UNDERSTAND THE HOUSE FIRST
Extract from the KB: name, type (heritage maison / contemporary designer / bespoke jeweler / gemstone specialist), positioning, price tier and whether pricing is shown or "price on request," origin & heritage story, hero collections, signature materials (metals, stones, techniques), craftsmanship/atelier story, bespoke or commission offering, care/warranty/provenance details, hours, contact, appointment/private-viewing flow, and any brand cues (existing colors, voice, personality). Form a clear picture of who this house is and how it should *feel* before designing anything.

2. SET THE DESIGN DIRECTION (luxury, shaped by the house)
The mood always sits in the high-end register — the house's identity decides the *flavor* of that luxury. A timeless heritage maison, a minimal gallery-like contemporary designer, and a warm hand-wrought artisanal jeweler should all feel precious, but look distinct. Decide:
- Mood in one sentence, always within luxury (e.g. "timeless, ornate restraint, heritage" vs "minimal, architectural, gallery-like" vs "organic, artisanal, hand-wrought warmth").
- Typography — high-end pairings only; editorial serifs tend to carry jewelry especially well. High-contrast display serifs for heritage and elegance; refined grotesk sans for contemporary. No generic system fonts, nothing playful. Type carries most of the luxury signal, so treat it as the centerpiece.
- Color — sophisticated, muted, considered. Precious-metal neutrals (champagne, warm grey, ivory, near-black), a single disciplined accent that can echo a signature gemstone. Avoid bright saturated palettes. Define as OKLCH design tokens (background, foreground, primary, accent, muted, border). Keep contrast accessible.
- Space, radii, shadows — jewelry needs room to breathe: generous, gallery-like whitespace, tight intentional hierarchy, subtle shadows. Never cramped, never busy. Let the pieces be the focus.
Update the actual token definitions (Tailwind v4 @theme / CSS variables). Don't override inline.

3. REPLACE ALL CONTENT
Nothing from the previous house may survive. Rewrite:
- Hero headline + subcopy in the new brand's voice
- About / heritage / craftsmanship story
- Collections — names and narratives
- Individual pieces — materials, specs (metal, carat, stone), and price OR "price on request." Respect the KB's convention exactly; never invent prices and never force a number where the house uses "on request"
- Bespoke / commission process
- Materials & craftsmanship
- Care / warranty / provenance
- Appointment / private-viewing CTA, wired to the KB's booking flow
- Hours, location, contact, socials
- Testimonials (use real ones from the KB; if none, leave a clearly marked placeholder — do NOT invent quotes)
- Metadata: page title, description, OG tags
- Image alt text
Then grep for the old house's name and any old-specific strings to confirm nothing slipped through.

4. LAYOUT IS YOURS TO CHANGE
Start from the existing structure since it's proven, but you have full freedom to restructure when the house calls for it — a collection-led maison, a single-hero-piece designer, and an atelier-story-led craftsman want different emphasis. Reorder, add, or cut sections, rethink the hero, foreground collections or the bespoke story if that's the draw. The goal: this should look like a bespoke site built *for this house*, not a recognizable reskin — while still reading as unmistakably high-end. If a section doesn't serve this place, cut it. If the story needs a section the template lacks, build it.

5. IMAGERY
Use client photos from the KB when provided and they meet the bar. When photos are missing, low-quality, don't fit a section, or you have a stronger visual idea, generate new ones with the genmedia CLI (check its --help for exact usage/flags before running).
Quality bar — read this carefully: jewelry is the hardest subject to generate convincingly, and bad jewelry imagery instantly reads as fake and cheap. Metal reflections, gemstone facets and sparkle, and scale are exactly where generators fail. Hold this brutally. Direct the generations deliberately:
- Match the house's established mood, palette, and materials (warm gold heritage vs. cool platinum minimal vs. artisanal textured metal).
- Macro/product shots: accurate metal (gold vs. platinum vs. silver reads correctly), believable gemstone refraction, clean seamless or softly-lit backgrounds, correct sense of scale, studio-grade lighting with controlled reflections.
- On-model/context shots and atelier shots where the layout calls for them — editorial, not catalog.
- Editorial composition: generous negative space, considered crops, no clutter.
- Keep aspect ratios and placeholder slots consistent with the layout so nothing breaks.
Reject and regenerate anything with warped metal, muddy or plastic-looking stones, impossible reflections, wrong scale, or mangled hands where a piece is worn. A weak generated image is worse than a clean placeholder — if you can't get it to the standard, leave a marked placeholder instead.
