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


export const Route = createFileRoute("/")({
    head: () => ({
      meta: [
        { title: "Седьмое небо — массаж и гирудотерапия в Трудовом (Владивосток)" },
        {
          name: "description",
          content:
            "Кабинет оздоровительных практик Седьмое небо в Трудовом: профессиональный массаж, вакуумная терапия, гирудотерапия, акупунктурный кетгут. Запись онлайн, удобный проезд из Владивостока и Артёма.",
        },
        { property: "og:title", content: "Седьмое небо — массаж и гирудотерапия в Трудовом (Владивосток)" },
        {
          property: "og:description",
          content:
            "Массаж, вакуумный массаж, гирудотерапия в кабинете Седьмое небо. Место, где можно замедлиться и вернуться к себе без спешки.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://7heavenmassage.ru/" },
        { property: "og:image", content: "https://7heavenmassage.ru/images/hero-portrait-solid.webp" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: "https://7heavenmassage.ru/images/hero-portrait-solid.webp" },
        { name: "google-site-verification", content: "eaff785ed39953fb" }],
      links: [{ rel: "canonical", href: "https://7heavenmassage.ru/" }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "MedicalBusiness",
                "@id": "https://7heavenmassage.ru/#business",
                name: "Седьмое небо",
                description:
                  "Кабинет оздоровительных практик Татьяны Злобиной: массаж, вакуумный массаж, гирудотерапия, акупунктурный кетгут.",
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
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: 43.306027,
                  longitude: 132.072118,
                },
                openingHoursSpecification: [
                  {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    opens: "09:00",
                    closes: "22:00",
                  }],
                areaServed: ["Трудовое", "Владивосток", "Артём"],
                priceRange: "600–20000 ₽",
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://7heavenmassage.ru/#breadcrumb",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Главная",
                    item: "https://7heavenmassage.ru/"
                  }],
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Главная",
                    item: "https://7heavenmassage.ru/",
                  }],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "Как проходит первый сеанс?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Я начинаю с короткой беседы, чтобы обсудить ваш запрос и самочувствие. Я подбираю техники и силу воздействия индивидуально. Первый сеанс помогает познакомиться с методами и почувствовать начальный эффект расслабления.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Впервые: с чего начать?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Начну со знакомства с кабинетом: короткая беседа о самочувствии и целях, а затем — мягкий пробный сеанс, чтобы вы почувствовали формат работы и атмосферу.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Как выбрать процедуру?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Не обязательно выбирать заранее — на первой встрече я вместе с вами подберу подходящую практику под ваше состояние, пожелания и текущий запрос организма.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Где находится кабинет?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Кабинет расположен по адресу: ул. Лермонтова, 46. Это центр посёлка с удобным подъездом и парковкой. Точную схему проезда я присылаю после подтверждения записи.",
                    },
                  }],
              }],
          }),
        }],
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
            <span className="xl:hidden">До&nbsp;повышения цен можно купить курс сейчас, а&nbsp;сеансы пройти в&nbsp;удобное время.</span>
            <span className="hidden xl:inline">
              До этой даты действует прежняя цена: можно купить курс сейчас
              <br />
              и приходить на сеансы позже.
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
