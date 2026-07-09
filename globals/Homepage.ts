import type { GlobalConfig } from "payload";

/**
 * All editable content of the homepage, grouped by section.
 * Headings support an accent convention: wrap the accent word(s) in
 * *asterisks* (e.g. "Silber + *Gold.*") and newlines separate animated lines.
 */
export const Homepage: GlobalConfig = {
  slug: "homepage",
  label: "Startseite",
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          name: "hero",
          description:
            "Die Bilder im Hero kommen aus der Sammlung „Unikate“ — die Stücke mit „Im Hero anzeigen“, in ihrer Reihenfolge.",
          fields: [
            { name: "eyebrow", label: "Überzeile", type: "text" },
            {
              name: "headline",
              label: "Überschrift (Zeilen per Enter, Akzent in *Sternchen*)",
              type: "textarea",
            },
            { name: "ctaPrimary", label: "Button 1 (Unikate)", type: "text" },
            {
              name: "ctaSecondary",
              label: "Button 2 (Termin, Telefon wird angehängt)",
              type: "text",
            },
            {
              name: "hoursShort",
              label: "Kurz-Öffnungszeiten (Info-Zeile unten)",
              type: "text",
            },
            {
              name: "footnote",
              label: "Fußnote (Info-Zeile unten rechts)",
              type: "text",
            },
          ],
        },
        {
          label: "Zweifarbigkeit",
          name: "zweifarbigkeit",
          fields: [
            { name: "eyebrow", label: "Überzeile", type: "text" },
            {
              name: "heading",
              label: "Überschrift (Akzent in *Sternchen*)",
              type: "textarea",
            },
            {
              name: "paragraphs",
              label: "Absätze",
              type: "array",
              fields: [
                { name: "text", label: "Text", type: "textarea", required: true },
              ],
            },
            {
              name: "techniques",
              label: "Techniken",
              type: "array",
              fields: [
                { name: "name", label: "Name", type: "text", required: true },
                { name: "text", label: "Text", type: "textarea", required: true },
              ],
            },
            {
              name: "imageGold",
              label: "Bild: Silber + Gold (Detail)",
              type: "upload",
              relationTo: "media",
            },
            {
              name: "imageKupfer",
              label: "Bild: Silber + Kupfer (Detail)",
              type: "upload",
              relationTo: "media",
            },
            {
              name: "imageBand",
              label: "Bild: Band (breit)",
              type: "upload",
              relationTo: "media",
            },
            { name: "bandCaptionLeft", label: "Band-Bildunterschrift links", type: "text" },
            { name: "bandCaptionRight", label: "Band-Bildunterschrift rechts", type: "text" },
          ],
        },
        {
          label: "Unikate",
          name: "unikate",
          description:
            "Die Stücke selbst werden in der Sammlung „Unikate“ gepflegt. Hier nur die Texte der Sektion.",
          fields: [
            { name: "eyebrow", label: "Überzeile", type: "text" },
            {
              name: "heading",
              label: "Überschrift (Zeilen per Enter)",
              type: "textarea",
            },
            { name: "intro", label: "Einleitung", type: "textarea" },
            { name: "enquiry", label: "Anfrage-Text", type: "textarea" },
          ],
        },
        {
          label: "Werkstatt",
          name: "werkstatt",
          fields: [
            { name: "eyebrow", label: "Überzeile", type: "text" },
            {
              name: "heading",
              label: "Überschrift (Akzent in *Sternchen*)",
              type: "textarea",
            },
            { name: "intro", label: "Einleitung", type: "textarea" },
            {
              name: "steps",
              label: "Schritte (nummeriert nach Reihenfolge)",
              type: "array",
              fields: [
                { name: "title", label: "Titel", type: "text", required: true },
                { name: "text", label: "Text", type: "textarea", required: true },
              ],
            },
            { name: "quote", label: "Zitat", type: "textarea" },
            { name: "quoteAttribution", label: "Zitat-Quelle", type: "text" },
            {
              name: "imageWerkbank",
              label: "Bild: Werkbank",
              type: "upload",
              relationTo: "media",
            },
            {
              name: "imageHaende",
              label: "Bild: Hände beim Feilen",
              type: "upload",
              relationTo: "media",
            },
          ],
        },
        {
          label: "Meisterin",
          name: "meisterin",
          fields: [
            { name: "eyebrow", label: "Überzeile", type: "text" },
            {
              name: "heading",
              label: "Überschrift (Zeilen per Enter)",
              type: "textarea",
            },
            {
              name: "paragraphs",
              label: "Absätze",
              type: "array",
              fields: [
                { name: "text", label: "Text", type: "textarea", required: true },
              ],
            },
            {
              name: "image",
              label: "Bild: Atelier",
              type: "upload",
              relationTo: "media",
            },
            { name: "imageCaptionLeft", label: "Bildunterschrift links", type: "text" },
            { name: "imageCaptionRight", label: "Bildunterschrift rechts", type: "text" },
            {
              name: "stats",
              label: "Eckdaten",
              type: "array",
              maxRows: 3,
              fields: [
                { name: "value", label: "Wert", type: "text", required: true },
                { name: "label", label: "Beschriftung", type: "text", required: true },
              ],
            },
          ],
        },
        {
          label: "Eheringe",
          name: "eheringe",
          fields: [
            { name: "eyebrow", label: "Überzeile", type: "text" },
            {
              name: "heading",
              label: "Überschrift (Akzent in *Sternchen*)",
              type: "textarea",
            },
            { name: "intro", label: "Einleitung", type: "textarea" },
            {
              name: "steps",
              label: "Schritte (nummeriert nach Reihenfolge)",
              type: "array",
              fields: [
                { name: "title", label: "Titel", type: "text", required: true },
                { name: "text", label: "Text", type: "textarea", required: true },
              ],
            },
            { name: "ctaLabel", label: "Button-Text", type: "text" },
            {
              name: "imagePair",
              label: "Bild: Eheringe-Paar",
              type: "upload",
              relationTo: "media",
            },
            {
              name: "imageDetail",
              label: "Bild: Anfertigung (Detail)",
              type: "upload",
              relationTo: "media",
            },
          ],
        },
        {
          label: "Besuch",
          name: "besuch",
          fields: [
            { name: "eyebrow", label: "Überzeile", type: "text" },
            {
              name: "heading",
              label: "Überschrift (Zeilen per Enter)",
              type: "textarea",
            },
            { name: "phoneEyebrow", label: "Telefon-Überzeile", type: "text" },
            { name: "hoursHeading", label: "Überschrift Öffnungszeiten", type: "text" },
            {
              name: "image",
              label: "Bild: Schaufenster",
              type: "upload",
              relationTo: "media",
            },
            { name: "imageCaptionLeft", label: "Bildunterschrift links", type: "text" },
            { name: "imageCaptionRight", label: "Bildunterschrift rechts", type: "text" },
          ],
        },
      ],
    },
  ],
};
