import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { QuoteBlock } from "@/components/QuoteBlock";
import { Services } from "@/components/Services";

import { ApproachCopy } from "@/components/ApproachCopy";
import { PromoBanner } from "@/components/PromoBanner";
import { ApproachIntro } from "@/components/ApproachIntro";
import { Programs } from "@/components/Programs";
import { Education } from "@/components/Education";


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
    <div className="relative min-h-screen bg-[#EFF6FF] pt-20 xl:pt-[100px]">
      <Header />
      <Hero />
      <QuoteBlock />
      <div aria-hidden className="bg-[#EFF6FF] h-0 sm:h-[90px] xl:h-[100px]" />
      <Services />
      <PromoBanner />
      <ApproachIntro />
      
      <ApproachCopy />
      
      
      <Programs />
      <Education />



    </div>
  );
}
