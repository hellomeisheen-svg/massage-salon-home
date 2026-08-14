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
      { title: "Седьмое небо — массаж и гирудотерапия, Владивосток" },
      {
        name: "description",
        content:
          "Кабинет оздоровительных практик Седьмое небо: массаж, банки, гирудотерапия, акупунктурный кетгут. Посёлок Трудовое, Владивосток. Запись онлайн.",
      },
      { property: "og:title", content: "Седьмое небо — массаж и гирудотерапия, Владивосток" },
      {
        property: "og:description",
        content:
          "Массаж, банки, гирудотерапия в кабинете Седьмое небо. Место, где можно замедлиться и вернуться к себе без спешки.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://7heavenmassage.ru/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "google-site-verification", content: "eaff785ed39953fb" },
    ],
    links: [{ rel: "canonical", href: "https://7heavenmassage.ru/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HealthAndBeautyBusiness",
          name: "Седьмое небо",
          description:
            "Кабинет оздоровительных практик Татьяны Злобиной: массаж, банки, гирудотерапия, акупунктурный кетгут.",
          url: "https://7heavenmassage.ru/",
          address: {
            "@type": "PostalAddress",
            addressLocality: "посёлок Трудовое, Владивосток",
            addressCountry: "RU",
          },
          areaServed: "Владивосток",
          makesOffer: [
            "Гирудотерапия",
            "Акупунктурный кетгут",
            "Массаж банками",
            "Классический массаж",
            "Лимфатический массаж",
            "Лимфодренажный массаж",
            "Векторный массаж",
          ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
        }),
      },
    ],
  }),
  component: Index,
});


function Index() {
  return (
    <BookingProvider>
    <div className="accent-noto-serif relative min-h-screen bg-[#EFF6FF] pt-20 xl:pt-[100px]">
      <Header />
      <Hero />
      <QuoteBlock />
      <Services />
      <PromoBanner />
      
      <StatsSection />
      <ApproachCopy />
      
      
      <Programs />
      <PromoBanner
        title={
          <>
            <span className="xl:hidden">До&nbsp;1&nbsp;сентября покупайте программы по&nbsp;прежней цене</span>
            <span className="hidden xl:inline">
              С&nbsp;1&nbsp;сентября часть курсов подорожает, а&nbsp;пока
              <br />
              можно купить их по&nbsp;прежней цене
            </span>
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
      
      <Gallery />
      <Faq />
      <Footer />



    </div>
    </BookingProvider>
  );
}
