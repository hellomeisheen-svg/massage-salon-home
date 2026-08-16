import { useState } from "react";
import { Star } from "lucide-react";
import { QuizModal } from "@/components/quiz/QuizModal";

const YANDEX_MAPS_URL =
  "https://yandex.ru/maps/org/sedmoye_nebo/130811843218/reviews/";

function YandexLogo() {
  return (
    <div
      className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[12px] bg-[#FC3F1D] ds-bento-shadow"
      aria-hidden="true"
    >
      <span className="text-[22px] font-bold leading-none text-white">Я</span>
    </div>
  );
}

function RatingBlock() {
  return (
    <a
      href={YANDEX_MAPS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-full items-center gap-4 rounded-[12px] border border-[#daebff] bg-white ds-bento-shadow px-4 py-4 transition-all hover:-translate-y-0.5 hover:opacity-85 active:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C3C8C] sm:max-w-[320px] sm:px-5 sm:py-5"
    >
      <YandexLogo />
      <div className="flex min-w-0 flex-col gap-2">
        <div className="flex items-center gap-2.5">
          <span className="font-noto-serif-narrow text-[28px] font-semibold leading-none tracking-tight text-[#1C3C8C]">
            4,7
          </span>
          <div className="flex flex-nowrap items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                aria-hidden="true"
                className="h-[16px] w-[16px] shrink-0 fill-[#F26A38] text-[#F26A38]"
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[13px] font-medium uppercase tracking-wider text-[#FC3F1D]">
            Яндекс Карты
          </span>
          <span className="text-[13px] font-light leading-[18px] text-[#566A93]">
            Смотреть отзывы клиентов
          </span>
        </div>
      </div>
    </a>
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
