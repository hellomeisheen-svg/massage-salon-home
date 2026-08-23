import { useState, Suspense, lazy } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Star } from "lucide-react";
import { useBooking } from "@/components/BookingModal";

const QuizModal = lazy(() => import("@/components/quiz/QuizModal").then(m => ({ default: m.QuizModal })));

function HeadlineBlock() {
  return (
    <div className="flex flex-col tablet-text-block xl:min-w-[640px] xl:w-[640px] max-w-full">

      <h1 className="font-noto-serif-narrow ds-h1 text-[#1C3C8C] xl:whitespace-pre-line">
        {"Массаж, гирудотерапия и\u00a0вакуум в\u00a0Трудовом"}
      </h1>
      <p className="mt-4 text-[16px] font-light leading-[26px] text-[#566A93] xl:max-w-[540px]">
        Убираю напряжение, отёки и&nbsp;боли, возвращаю лёгкость движений — первый эффект уже после 1–2 сеансов.
      </p>
      <div className="mt-[30px] flex flex-col gap-3 sm:flex-row sm:gap-4">
        <a
          href="https://n2418813.yclients.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full sm:w-[280px] xl:w-[250px] inline-flex items-center justify-center text-center whitespace-nowrap"
        >
          Записаться онлайн
        </a>
        <a
          href="https://max.ru/u/f9LHodD0cOLS1ZC9ThcQkVLRVzcK-MbYZ7JVAg8PC5Tx9LyihgOVdPnzaxM"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary w-full sm:w-[280px] xl:w-[250px] inline-flex items-center justify-center text-center whitespace-nowrap"
        >
          Получить консультацию
        </a>
      </div>
    </div>
  );
}

export function Hero() {


  return (
    <main className="bg-[#EFF6FF] py-4 sm:py-5">
      <section id="hero" className="container-1900 grid grid-cols-1 gap-4 sm:gap-5 xl:min-h-[calc(100vh-160px)] xl:grid-cols-2">
        {/* Content card */}
        <div className="flex flex-col ds-card ds-bento-shadow p-5 min-h-[640px] sm:h-[600px] xl:min-h-0 xl:h-auto sm:p-6 xl:p-10 overflow-hidden">
          <div className="flex items-end text-left gap-4">
            <img loading="eager" decoding="sync" fetchPriority="high" src="/images/tatyana-photo.webp"
              alt="Татьяна Злобина, мастер оздоровительных практик, кабинет Седьмое небо, г. Владивосток"
              width={85}
              height={110}
              className="h-[90px] w-[70px] sm:h-[110px] sm:w-[85px] rounded-[12px] border border-[#daebff] ds-bento-shadow object-cover flex-shrink-0"
            />
            <div className="flex flex-col">
              <h3 className="font-noto-serif-narrow ds-h4 text-[#1C3C8C] text-[24px] sm:text-[28px]">
                Татьяна Злобина
              </h3>
              <p className="mt-1 text-[14px] sm:text-[16px] leading-[1.4] sm:leading-[1.6] body-text text-[#566A93]">
                Мастер кабинета, специалист по{"\u00A0"}оздоровительным практикам
              </p>
            </div>
          </div>
          <div className="mt-auto xl:mt-auto pt-4 sm:pt-12">
            <HeadlineBlock />
          </div>

        </div>

        {/* Hero image */}
        <div className="relative h-[420px] overflow-hidden rounded-[12px] border border-[#daebff] ds-bento-shadow sm:h-[520px] md:h-[600px] xl:h-auto xl:min-h-0">
          <img loading="eager" decoding="sync" className="absolute inset-0 h-full w-full scale-x-[-1] object-cover object-top sm:object-center xl:object-top min-[1400px]:object-center"
            alt="Оздоровительные процедуры в кабинете Седьмое небо (Трудовое)"
            src="/images/hero-portrait-solid.webp"
            fetchPriority="high"
            width={1280}
            height={853}
          />

        </div>
      </section>
      <Suspense fallback={null}>
      </Suspense>


    </main>
  );
}
