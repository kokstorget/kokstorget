import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "guide",
  title: "Guider & Tips",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "URL-slug",
      type: "slug",
      description: "Genereras från titeln. Blir adressen kokstorget.se/guider/<slug>",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "string",
      options: {
        list: [
          { title: "Planering", value: "Planering" },
          { title: "Budget", value: "Budget" },
          { title: "Material", value: "Material" },
          { title: "Design", value: "Design" },
          { title: "Skötsel", value: "Skötsel" },
        ],
      },
    }),
    defineField({
      name: "author",
      title: "Författare",
      type: "string",
    }),
    defineField({
      name: "publishedAt",
      title: "Publiceringsdatum",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Ingress",
      type: "text",
      rows: 3,
      description: "Kort sammanfattning som visas på listsidan och i sökresultat",
      validation: (r) => r.required().max(220),
    }),
    defineField({
      name: "mainImage",
      title: "Huvudbild",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alternativtext", type: "string" }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      title: "Brödtext",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Rubrik 2", value: "h2" },
            { title: "Rubrik 3", value: "h3" },
            { title: "Citat", value: "blockquote" },
          ],
          lists: [
            { title: "Punktlista", value: "bullet" },
            { title: "Numrerad lista", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Fet", value: "strong" },
              { title: "Kursiv", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                title: "Länk",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (r) =>
                      r.uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }),
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alternativtext", type: "string" }),
            defineField({ name: "caption", title: "Bildtext", type: "string" }),
          ],
        }),
      ],
      validation: (r) => r.required(),
    }),
  ],
  orderings: [
    {
      title: "Senast publicerad",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "mainImage" },
  },
});
