import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HabitQuote } from "@/components/HabitQuote";
import { QuoteBlock } from "@/components/QuoteBlock";
import { Services } from "@/components/Services";
import React, { Suspense } from "react";

import { Approach } from "@/components/Approach";
import { PromoBanner } from "@/components/PromoBanner";

import { StatsSection } from "@/components/StatsSection";
import { Programs } from "@/components/Programs";
import { Education } from "@/components/Education";
import { Faq } from "@/components/Faq";

const Gallery = React.lazy(() => import("@/components/Gallery"));

import { Footer } from "@/components/Footer";
import { BookingProvider } from "@/components/BookingModal";
import { buildSEOHead } from "@/components/SEOHead";

export const Route = createFileRoute("/")({
  head: () =>
    buildSEOHead({
      title: "Седьмое небо — массаж и оздоровительные практики в Трудовом",
      description:
        "Массаж и оздоровительные практики в посёлке Трудовое рядом с Владивостоком и Артёмом. Классический, вакуумный, лимфодренажный и векторный массаж, запись.",
      canonicalPath: "/",
      ogTitle: "Седьмое небо — массаж и оздоровительные практики в Трудовом",
      ogDescription:
        "Массаж, вакуумный массаж, гирудотерапия в кабинете Седьмое небо. Место, где можно замедлиться и вернуться к себе без спешки.",
      ogImage: "https://7heavenmassage.ru/images/hero-portrait-solid.webp",
      jsonLd: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "LocalBusiness",
            "@id": "https://7heavenmassage.ru/#business",
            name: "Седьмое небо",
            description: "Кабинет оздоровительных практик в посёлке Трудовое, Приморский край.",
            url: "https://7heavenmassage.ru/",
            image: "https://7heavenmassage.ru/images/hero-portrait-solid.webp",
            telephone: "+7 924 232 46 11",
            address: {
              "@type": "PostalAddress",
              streetAddress: "ул. Лермонтова, 46",
              addressLocality: "посёлок Трудовое",
              addressRegion: "Приморский край",
              addressCountry: "RU",
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                opens: "09:00",
                closes: "22:00",
              },
            ],
            areaServed: ["Трудовое", "Владивосток", "Артём"],
          },
        ],
      },
    }),
  component: Index,
});

function Index() {
  return (
    <BookingProvider>
      <div className="accent-noto-serif relative min-h-screen bg-[#EFF6FF] pt-20 xl:pt-[100px]">
        <Header />
        <Hero />
        <HabitQuote />
        <Services />
        <PromoBanner />

        <StatsSection />
        <Approach />

        <Programs />
        <PromoBanner
          title={
            <>
              <span className="xl:hidden">Успейте записаться по&nbsp;старой цене</span>
              <span className="hidden xl:inline">
                С&nbsp;1&nbsp;сентября часть курсов подорожает, а&nbsp;пока
                <br />
                можно купить их по&nbsp;прежней цене
              </span>
            </>
          }
          subtitle={
            <>
              <span className="xl:hidden">
                До&nbsp;повышения цен можно купить курс сейчас, а&nbsp;сеансы пройти в&nbsp;удобное
                время.
              </span>
              <span className="hidden xl:inline">
                До этой даты действует прежняя цена: можно купить курс сейчас
                <br />и приходить на сеансы позже.
              </span>
            </>
          }
        />
        <Education />

        <Suspense fallback={<div className="h-[400px] animate-pulse bg-[#DAEBFF]/20" />}>
          <Gallery />
        </Suspense>

        <Faq />
        <Footer />
      </div>
    </BookingProvider>
  );
}
