import { createFileRoute } from "@tanstack/react-router";

// Strona jest zwykłym dokumentem HTML (public/site/index.html) ze swoim
// arkuszem stylów i skryptem — serwer oddaje ją bez żadnej warstwy aplikacji.
import page from "../../public/site/index.html?raw";

export const Route = createFileRoute("/")({
  server: {
    handlers: {
      GET: () =>
        new Response(page, {
          headers: { "content-type": "text/html; charset=utf-8" },
        }),
    },
  },
});
