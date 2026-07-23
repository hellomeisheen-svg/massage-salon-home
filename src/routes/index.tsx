import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Пустая страница" },
      { name: "description", content: "Пустая страница." },
      { property: "og:title", content: "Пустая страница" },
      { property: "og:description", content: "Пустая страница." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  return <div className="min-h-screen bg-background" />;
}
