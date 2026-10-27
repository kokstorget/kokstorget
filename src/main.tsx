import { createRoot } from "react-dom/client";
import { QueryClient, hydrate } from "@tanstack/react-query";
import App from "./App.tsx";
import "./index.css";

declare global {
  interface Window {
    __QUERY_STATE__?: unknown;
  }
}

const queryClient = new QueryClient();

// Sanity data fetched during prerender, so the first client render matches the static HTML
if (window.__QUERY_STATE__) {
  hydrate(queryClient, window.__QUERY_STATE__);
}

createRoot(document.getElementById("root")!).render(<App queryClient={queryClient} />);
