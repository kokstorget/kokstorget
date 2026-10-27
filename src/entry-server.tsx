import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { HelmetServerState } from "react-helmet-async";
import { AppProviders, AppRoutes } from "./App.tsx";
import {
  aboutPageQuery,
  caseStudiesQuery,
  faqsQuery,
  guidesQuery,
  inspirationProjectsQuery,
  partnersQuery,
} from "./hooks/useSanityData";

const QUERIES: { queryKey: string[]; queryFn: () => Promise<unknown> }[] = [
  partnersQuery,
  inspirationProjectsQuery,
  caseStudiesQuery,
  aboutPageQuery,
  faqsQuery,
  guidesQuery,
];

/** Fetches all Sanity content once per build. A failed query is skipped so the page falls back to static content. */
export async function prefetch() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 1 } } });
  await Promise.all(QUERIES.map((q) => queryClient.prefetchQuery(q)));
  const guides = queryClient.getQueryData<{ slug: string; _updatedAt?: string }[]>(guidesQuery.queryKey) ?? [];
  return { queryClient, guides };
}

export function render(url: string, queryClient: QueryClient) {
  const helmetContext: { helmet?: HelmetServerState } = {};
  const html = renderToString(
    <AppProviders queryClient={queryClient} helmetContext={helmetContext}>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </AppProviders>
  );
  const { helmet } = helmetContext;
  const head = helmet
    ? [helmet.title, helmet.meta, helmet.link, helmet.script].map((t) => t.toString()).join("\n    ")
    : "";
  return { html, head, state: dehydrate(queryClient) };
}

export { fallbackGuides } from "./lib/guides";
