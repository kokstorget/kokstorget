import { defineType, defineField } from "sanity";

export default defineType({
  name: "inspirationProject",
  title: "Inspirationsprojekt",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "style",
      title: "Stil",
      type: "string",
      options: {
        list: [
          { title: "Modern", value: "Modern" },
          { title: "Klassisk", value: "Klassisk" },
          { title: "Lantlig", value: "Lantlig" },
          { title: "Skandinavisk", value: "Skandinavisk" },
          { title: "Industriell", value: "Industriell" },
          { title: "Japandi", value: "Japandi" },
        ],
      },
    }),
    defineField({
      name: "description",
      title: "Beskrivning",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
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
    select: { title: "title", subtitle: "style", media: "image" },
  },
});
