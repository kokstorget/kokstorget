import { defineType, defineField } from "sanity";

export default defineType({
  name: "caseStudy",
  title: "Kundcase",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "family",
      title: "Familj / Kund",
      type: "string",
      description: "T.ex. 'Familjen Lindström'",
    }),
    defineField({
      name: "location",
      title: "Plats",
      type: "string",
      description: "T.ex. 'Stockholm'",
    }),
    defineField({
      name: "description",
      title: "Beskrivning",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "budget",
      title: "Budget",
      type: "string",
      description: "T.ex. '285 000 kr'",
    }),
    defineField({
      name: "duration",
      title: "Tidsåtgång",
      type: "string",
      description: "T.ex. '8 veckor'",
    }),
    defineField({
      name: "style",
      title: "Stil",
      type: "string",
      description: "T.ex. 'Skandinavisk modern'",
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
    select: { title: "title", subtitle: "family", media: "image" },
  },
});
