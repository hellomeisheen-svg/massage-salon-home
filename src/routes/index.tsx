import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { QuoteBlock } from "@/components/QuoteBlock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Татьяна Злобина — оздоровительные практики" },
      {
        name: "description",
        content:
          "Кабинет оздоровительных практик Татьяны Злобиной: массаж, банки, гирудотерапия. Спокойный ритм и внимание к каждому состоянию.",
      },
      { property: "og:title", content: "Татьяна Злобина — оздоровительные практики" },
      {
        property: "og:description",
        content:
          "Массаж, банки, гирудотерапия. Место, где можно замедлиться и вернуться к себе без спешки.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-[#EFF6FF]">
      <Header />
      <Hero />
      <QuoteBlock />
    </div>
  );
}
