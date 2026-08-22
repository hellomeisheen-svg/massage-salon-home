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
                    name: "Какой массаж выбрать для снятия боли в спине?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Для спины хорошо подходит классический оздоровительный массаж в сочетании с вакуумными техниками. Это помогает глубоко проработать мышцы, снять спазмы и улучшить кровообращение в проблемных зонах.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Нужна ли подготовка к гирудотерапии?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Перед процедурой важно принять душ без использования парфюмерии и ароматных гелей. Также рекомендуется не употреблять алкоголь за сутки и плотно не есть непосредственно перед сеансом.",
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
            <span className="xl:hidden">'''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''\n                                        \n                                            \n                                            Выступи как опытный арт-директор и проведи визуальный аудит текущего макета.\n\nЦель проекта:\n\n[опиши задачу сайта]\n\nБренд и позиционирование:\n\n[опиши бренд]\n\nЦелевая аудитория:\n\n[опиши аудиторию]\n\nЖелаемое впечатление:\n\n[например: современный, технологичный, надёжный, премиальный]\n\nПроверь:\n\n1. Визуальную иерархию страницы.\n\n2. Первый экран и качество визуального позиционирования.\n\n3. Фокус внимания пользователя.\n\n4. Композицию и баланс блоков.\n\n5. Сетку, выравнивания и отступы.\n\n6. Единство типографики.\n\n7. Размеры, начертания и контраст шрифтов.\n\n8. Цветовую палитру и контрастность.\n\n9. Согласованность кнопок, карточек, полей и иконок.\n\n10. Качество и уместность изображений.\n\n11. Соответствие визуального стиля целевой аудитории.\n\n12. Визуальное доверие к бренду.\n\n13. Слишком перегруженные или пустые участки.\n\n14. Повторяющиеся и визуально слабые компоненты.\n\n15. Адаптацию дизайна под мобильные устройства.\n\n16. Состояния hover, focus, active, disabled и error.\n\n17. Читаемость текста поверх изображений.\n\n18. Доступность интерфейса, включая контраст и заметность фокуса.\n\n19. Единообразие визуального языка на всех страницах.\n\n20. Возможные проблемы при передаче макета разработчику.\n\nПравила:\n\n- Оценивай не личный вкус, а соответствие цели, бренду и пользовательскому сценарию.\n\n- Отделяй критические проблемы от субъективных пожеланий.\n\n- Не меняй дизайн автоматически.\n\n- Для каждой рекомендации указывай причину и ожидаемый результат.\n\n- Если предлагаешь новый цвет, размер или отступ, укажи конкретное значение.\n\n- Не выдумывай элементы, которых нет в проекте.\n\nПосле проверки подготовь отчёт:\n\n# Арт-дирекционный аудит\n\n## 1. Краткое резюме\n\n- Общее визуальное качество: от 0 до 100.\n\n- Сила брендинга.\n\n- Читаемость.\n\n- Целостность дизайн-системы.\n\n- Главный визуальный риск.\n\n## 2. Таблица проблем\n\n| Приоритет | Экран или компонент | Проблема | Влияние | Рекомендация |\n\n## 3. Визуальная иерархия\n\nОпиши путь взгляда пользователя от первого экрана до целевого действия.\n\n## 4. Дизайн-система\n\nПроверь:\n\n- цвета;\n\n- шрифты;\n\n- отступы;\n\n- радиусы;\n\n- тени;\n\n- кнопки;\n\n- поля;\n\n- карточки;\n\n- иконки.\n\n## 5. Адаптивность\n\nОтдельно оцени desktop, tablet и mobile.\n\n## 6. Топ-10 визуальных улучшений\n\nДля каждого пункта укажи конкретное изменение и его приоритет.\n\n## 7. План внедрения\n\nРаздели рекомендации на:\n\n- быстрые правки;\n\n- средние изменения;\n\n- полноценный редизайн.</span>
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
