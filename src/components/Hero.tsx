import { useState } from "react";
import { Star } from "lucide-react";
import { QuizModal } from "@/components/quiz/QuizModal";

const YANDEX_MAPS_URL =
  "https://yandex.ru/maps/org/sedmoye_nebo/130811843218/reviews/";

function RatingBlock() {
  return (
    <div className="w-full rounded-[12px] border border-[#daebff] bg-white ds-bento-shadow px-4 py-5 sm:px-5 sm:py-6 sm:max-w-[280px]">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex flex-nowrap items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              aria-hidden="true"
              className="h-[18px] w-[18px] shrink-0 fill-[#F26A38] text-[#F26A38]"
            />
          ))}
        </div>
        <div className="font-noto-serif-narrow ds-h2 whitespace-nowrap leading-none text-[#1C3C8C]">
          4,7
        </div>
        <div className="text-[15px] font-light leading-[22px] text-[#1C3C8C]">
          Рейтинг на&nbsp;Яндекс&nbsp;Картах
        </div>
        <a
          href={YANDEX_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center justify-center rounded-[12px] px-3 text-[15px] font-medium text-[#1C3C8C] underline underline-offset-4 transition-opacity hover:opacity-80 active:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C3C8C]"
        >
          Смотреть отзывы
        </a>
        <div className="text-[14px] font-light leading-[20px] text-[#566A93]">
          Отзывы клиентов
        </div>
      </div>
    </div>
  );
}

function SpecialistBlock() {
  return (
    <div className="flex flex-col items-start gap-3 sm:gap-4">
      <RatingBlock />
      <div className="flex flex-col gap-1">
        <div className="font-noto-serif-narrow ds-h4 text-[#1c3c8c]">
          Татьяна&nbsp;Злобина
        </div>
        <p className="text-[16px] font-light leading-[26px] text-[#566A93]">
          Мастер кабинета, специалист
          <br />
          по&nbsp;оздоровительным практикам
        </p>
      </div>
    </div>
  );
}


function HeadlineBlock({ onOpenQuiz }: { onOpenQuiz: () => void }) {
  return (
    <div className="flex flex-col tablet-text-block xl:min-w-[640px] xl:w-[640px]">
      <h1 className="font-noto-serif-narrow ds-h1 text-[#1C3C8C] xl:whitespace-pre-line">
        {"Массаж, гирудотерапия и\u00a0банки во\u00a0Владивостоке"}
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
          Онлайн запись
        </a>
        <button
          type="button"
          onClick={onOpenQuiz}
          className="btn-secondary w-full sm:w-[280px] xl:w-[250px] whitespace-nowrap"
        >
          Подобрать программу
        </button>
      </div>
    </div>
  );
}

export function Hero() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <main className="bg-[#EFF6FF] py-4 sm:py-5">
      <section id="hero" className="container-1900 grid grid-cols-1 gap-4 sm:gap-5 xl:min-h-[calc(100vh-160px)] xl:grid-cols-2">
        {/* Content card */}
        <div className="flex min-h-0 flex-col ds-card ds-bento-shadow p-5 sm:min-h-[520px] sm:p-6 xl:min-h-0 xl:p-10">
          <SpecialistBlock />
          <div className="mt-[100px] pt-0 sm:mt-[140px] xl:mt-auto xl:pt-[140px]">
            <HeadlineBlock onOpenQuiz={() => setIsQuizOpen(true)} />
          </div>
        </div>

        {/* Hero image */}
        <div className="relative h-[420px] overflow-hidden rounded-[12px] border border-[#daebff] ds-bento-shadow sm:h-[520px] xl:h-auto xl:min-h-0">
          <img
            className="absolute inset-0 h-full w-full scale-x-[-1] object-cover object-top sm:object-center"
            alt="Оздоровительные процедуры"
            src="/images/hero-portrait-solid.webp"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </section>
      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </main>
  );
}
