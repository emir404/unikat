import type { GlobalConfig } from "payload";

/** Legal pages (Impressum & Datenschutz) as editable rich text. */
export const Legal: GlobalConfig = {
  slug: "legal",
  label: "Rechtliches",
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Impressum",
          fields: [
            {
              name: "impressumTitle",
              label: "Titel",
              type: "text",
              defaultValue: "Impressum",
            },
            { name: "impressum", label: "Inhalt", type: "richText" },
          ],
        },
        {
          label: "Datenschutz",
          fields: [
            {
              name: "datenschutzTitle",
              label: "Titel",
              type: "text",
              defaultValue: "Datenschutzerklärung",
            },
            { name: "datenschutz", label: "Inhalt", type: "richText" },
          ],
        },
      ],
    },
  ],
};
