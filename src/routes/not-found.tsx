import { createFileRoute } from "@tanstack/react-router";
import { NotFoundPage } from "@/components/NotFoundPage";

export const Route = createFileRoute("/not-found")({
  head: () => ({
    meta: [
      { title: "404 — Страница не найдена" },
      {
        name: "description",
        content:
          "Запрашиваемая страница не существует или была перемещена. Вернитесь на главную кабинета Татьяны Злобиной.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "404 — Страница не найдена" },
      {
        property: "og:description",
        content:
          "Запрашиваемая страница не существует или была перемещена. Вернитесь на главную.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: NotFoundPage,
});
