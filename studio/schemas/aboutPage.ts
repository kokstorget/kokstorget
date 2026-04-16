import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "aboutPage",
  title: "Om oss — Sida",
  type: "document",
  fields: [
    defineField({
      name: "heroTitle",
      title: "Rubrik",
      type: "string",
      initialValue: "Vi gör det enklare att hitta rätt kök",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Underrubrik",
      type: "text",
      rows: 2,
      initialValue:
        "Kökstorget är Sveriges oberoende plattform som kopplar samman köksdrömmare med kvalitetssäkrade köksföretag — helt kostnadsfritt.",
    }),
    defineField({
      name: "image",
      title: "Huvudbild",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "storyLeft",
      title: "Berättelse — vänster kolumn",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "storyRight",
      title: "Berättelse — höger kolumn",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "values",
      title: "Våra värderingar",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "value",
          fields: [
            defineField({ name: "title", title: "Rubrik", type: "string" }),
            defineField({ name: "text", title: "Beskrivning", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "title" } },
        }),
      ],
    }),
    defineField({
      name: "stats",
      title: "Statistik",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "stat",
          fields: [
            defineField({ name: "value", title: "Värde", type: "string", description: "T.ex. '2 500+'" }),
            defineField({ name: "label", title: "Etikett", type: "string", description: "T.ex. 'Nöjda kunder'" }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Om oss" }),
  },
});
