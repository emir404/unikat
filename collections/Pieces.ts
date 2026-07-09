import type { CollectionConfig } from "payload";

/**
 * The catalog of Unikate (one-of-a-kind pieces). Drag-and-drop orderable —
 * that order drives both the catalog grid and the homepage hero carousel
 * (the pieces flagged "Im Hero anzeigen", in order).
 */
export const Pieces: CollectionConfig = {
  slug: "pieces",
  labels: { singular: "Unikat", plural: "Unikate" },
  orderable: true,
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "inHero", "image"],
    description:
      "Der Katalog der Unikate. Die Reihenfolge (Drag & Drop) bestimmt die Reihenfolge im Katalog und im Hero.",
  },
  fields: [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      label: "Slug (URL, z.B. ring-turmalin)",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        description: "Wird für die Detail-Seite verwendet: /unikate/<slug>.",
      },
    },
    {
      name: "category",
      label: "Kategorie",
      type: "select",
      required: true,
      options: [
        { label: "Ringe", value: "Ringe" },
        { label: "Ohrschmuck", value: "Ohrschmuck" },
        { label: "Halsschmuck", value: "Halsschmuck" },
        { label: "Armschmuck", value: "Armschmuck" },
        { label: "Broschen", value: "Broschen" },
      ],
    },
    {
      name: "image",
      label: "Katalog-Bild",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    { name: "material", label: "Material", type: "text", required: true },
    { name: "dimensions", label: "Maße", type: "text" },
    { name: "stone", label: "Stein", type: "text" },
    { name: "carat", label: "Karat", type: "text" },
    { name: "surface", label: "Oberfläche", type: "text" },
    {
      name: "price",
      label: "Preis",
      type: "text",
      required: true,
      defaultValue: "Preis auf Anfrage",
    },
    {
      name: "provenance",
      label: "Herkunft",
      type: "select",
      required: true,
      defaultValue: "illustrative",
      options: [
        { label: "Reales Stück", value: "real" },
        { label: "Illustrativ", value: "illustrative" },
      ],
    },
    {
      type: "collapsible",
      label: "Hero-Darstellung",
      admin: {
        description:
          "Die im Hero angezeigten Unikate. Ohne eigenes Hero-Bild wird das Katalog-Bild verwendet.",
      },
      fields: [
        {
          name: "inHero",
          label: "Im Hero anzeigen",
          type: "checkbox",
          defaultValue: false,
        },
        {
          name: "heroImage",
          label: "Hero-Bild (optional)",
          type: "upload",
          relationTo: "media",
        },
        { name: "heroShortName", label: "Hero-Kurzname", type: "text" },
        { name: "heroSpec", label: "Hero-Spezifikation", type: "text" },
        {
          name: "heroObjectPosition",
          label: "Hero-Bildausschnitt (CSS object-position)",
          type: "text",
          defaultValue: "center",
        },
        {
          name: "heroTint",
          label: "Hero-Abdunklung (CSS-Klassen)",
          type: "text",
          defaultValue: "bg-ink/55 sm:bg-ink/30",
        },
      ],
    },
  ],
};
