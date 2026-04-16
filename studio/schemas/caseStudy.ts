import { defineType, defineField } from "sanity";

export default defineType({
  name: "caseStudy",
  title: "Kundcase",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel / Familjenamn",
      type: "string",
      description: "T.ex. 'Familjen Lindström'",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "location",
      title: "Plats",
      type: "string",
      description: "T.ex. 'Östermalm, Stockholm'",
    }),
    defineField({
      name: "style",
      title: "Stil",
      type: "string",
      description: "T.ex. 'Modern valnöt med marmor'",
    }),
    defineField({
      name: "quote",
      title: "Kundcitat",
      type: "text",
      rows: 3,
      description: "Kundens egna ord om upplevelsen",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "budget",
      title: "Budget",
      type: "string",
      description: "T.ex. '250 000 – 350 000 kr'",
    }),
    defineField({
      name: "duration",
      title: "Tidsåtgång",
      type: "string",
      description: "T.ex. '8 veckor'",
    }),
    defineField({
      name: "supplier",
      title: "Leverantör",
      type: "string",
      description: "T.ex. 'Nordiska Kök'",
    }),
    defineField({
      name: "projectType",
      title: "Typ av projekt",
      type: "string",
      description: "T.ex. 'Totalrenovering'",
    }),
    defineField({
      name: "image",
      title: "Bild",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Sorteringsordning",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    { title: "Ordning", name: "order", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "location", media: "image" },
  },
});
