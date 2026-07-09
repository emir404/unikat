import type { GlobalConfig } from "payload";

/** Shared site data: atelier details, navigation, hours, timeline, footer, SEO. */
export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Einstellungen",
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "group",
      name: "meta",
      label: "SEO & Metadaten",
      fields: [
        { name: "title", label: "Seitentitel", type: "text" },
        { name: "description", label: "Beschreibung", type: "textarea" },
      ],
    },
    {
      type: "group",
      name: "atelier",
      label: "Atelier & Kontakt",
      fields: [
        { name: "name", label: "Name (z.B. AURA – Unikatschmuck)", type: "text" },
        { name: "shortName", label: "Kurzname (z.B. AURA)", type: "text" },
        { name: "legalName", label: "Rechtlicher Name", type: "text" },
        { name: "owner", label: "Inhaberin", type: "text" },
        { name: "ownerTitle", label: "Titel (z.B. Goldschmiedemeisterin)", type: "text" },
        { name: "street", label: "Straße", type: "text" },
        { name: "zip", label: "PLZ", type: "text" },
        { name: "city", label: "Ort", type: "text" },
        { name: "district", label: "Stadtteil", type: "text" },
        { name: "phoneDisplay", label: "Telefon (Anzeige)", type: "text" },
        {
          name: "phoneHref",
          label: "Telefon (Link, z.B. tel:+494517063874)",
          type: "text",
        },
        { name: "email", label: "E-Mail", type: "text" },
        { name: "mapsUrl", label: "Google Maps Link", type: "text" },
        { name: "mapsEmbedUrl", label: "Google Maps Embed-URL", type: "text" },
      ],
    },
    {
      name: "navLinks",
      label: "Navigation",
      type: "array",
      labels: { singular: "Link", plural: "Links" },
      fields: [
        { name: "label", label: "Beschriftung", type: "text", required: true },
        { name: "href", label: "Ziel (z.B. #unikate)", type: "text", required: true },
      ],
    },
    {
      name: "timeline",
      label: "Werdegang (Meisterin)",
      type: "array",
      labels: { singular: "Eintrag", plural: "Einträge" },
      fields: [
        { name: "year", label: "Jahr", type: "text", required: true },
        { name: "event", label: "Ereignis", type: "textarea", required: true },
      ],
    },
    {
      name: "hours",
      label: "Öffnungszeiten",
      type: "array",
      labels: { singular: "Tag", plural: "Tage" },
      admin: {
        description:
          "Reihenfolge = Anzeigereihenfolge. Öffnung von/bis in Minuten ab Mitternacht (z.B. 600 = 10:00, 1080 = 18:00) treibt die „Jetzt geöffnet“-Anzeige; für „nach Vereinbarung“/geschlossen leer lassen.",
      },
      fields: [
        {
          name: "weekday",
          label: "Wochentag (0 = So, 1 = Mo, … 6 = Sa)",
          type: "number",
          required: true,
          min: 0,
          max: 6,
        },
        { name: "day", label: "Tag (Anzeige)", type: "text", required: true },
        { name: "time", label: "Zeit (Anzeige)", type: "text", required: true },
        { name: "openStart", label: "Öffnung von (Minuten)", type: "number" },
        { name: "openEnd", label: "Öffnung bis (Minuten)", type: "number" },
      ],
    },
    { name: "hoursNote", label: "Öffnungszeiten-Hinweis", type: "textarea" },
    {
      type: "group",
      name: "footer",
      label: "Footer",
      fields: [
        { name: "strapline", label: "Strapline", type: "text" },
        {
          name: "hoursSummary",
          label: "Öffnungszeiten (Kurzfassung)",
          type: "array",
          fields: [
            { name: "days", label: "Tage", type: "text", required: true },
            { name: "time", label: "Zeit", type: "text", required: true },
          ],
        },
      ],
    },
  ],
};
