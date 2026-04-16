import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "kokstorget",
  title: "Kökstorget CMS",
  projectId: "xyfcrpp0",
  dataset: "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Innehåll")
          .items([
            S.divider(),
            S.listItem()
              .title("Om oss — Sida")
              .child(
                S.document()
                  .schemaType("aboutPage")
                  .documentId("aboutPage")
                  .title("Om oss — Sida")
              ),
            S.divider(),
            S.listItem()
              .title("Partners")
              .child(S.documentTypeList("partner").title("Partners")),
            S.listItem()
              .title("Inspiration")
              .child(
                S.documentTypeList("inspirationProject").title("Inspiration")
              ),
            S.listItem()
              .title("Kundcase")
              .child(S.documentTypeList("caseStudy").title("Kundcase")),
            S.listItem()
              .title("Vanliga frågor")
              .child(S.documentTypeList("faq").title("Vanliga frågor")),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
