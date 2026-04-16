import { defineType, defineField } from "sanity";

export default defineType({
  name: "faq",
  title: "Vanlig fråga",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Fråga",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "answer",
      title: "Svar",
      type: "text",
      rows: 4,
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
    select: { title: "question" },
  },
});
