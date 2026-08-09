import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { QuoteBlock } from "@/components/QuoteBlock";
import { Services } from "@/components/Services";

import { ApproachCopy } from "@/components/ApproachCopy";
import { PromoBanner } from "@/components/PromoBanner";
import { StatsSection } from "@/components/StatsSection";
import { Programs } from "@/components/Programs";
import { Education } from "@/components/Education";
import { Faq } from "@/components/Faq";
import Gallery from "@/components/Gallery";
import { GalleryIntro } from "@/components/GalleryIntro";
import { Footer } from "@/components/Footer";
import { BookingProvider } from "@/components/BookingModal";


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
    <BookingProvider>
    <div className="relative min-h-screen bg-[#EFF6FF] pt-20 xl:pt-[100px]">
      <Header />
      <Hero />
      <QuoteBlock />
      <Services />
      <PromoBanner />
      <ApproachIntro />
      <StatsSection />
      <ApproachCopy />
      
      
      <Programs />
      <PromoBanner
        title={
          <>
            С 1 сентября часть курсов подорожает, а пока
            <br />
            можно купить их по прежней цене
          </>
        }
        subtitle={
          <>
            До этой даты действует прежняя цена: можно купить курс сейчас
            <br />
            и приходить на сеансы позже.
          </>
        }
      />
      <Education />
      <GalleryIntro />
      <Gallery />
      <Faq />
      <Footer />



    </div>
    </BookingProvider>
  );
}
