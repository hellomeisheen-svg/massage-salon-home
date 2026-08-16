import { useState } from "react";
import { Star } from "lucide-react";
import { QuizModal } from "@/components/quiz/QuizModal";

const YANDEX_MAPS_URL =
  "https://yandex.ru/maps/org/sedmoye_nebo/130811843218/reviews/";

function RatingBlock() {
  return (
    <div className="flex flex-col gap-8">
      {/* Variant 1: Minimalist Underline */}
      <a
        href={YANDEX_MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 border-b border-[#daebff] pb-2 transition-all hover:border-[#A2CFFE] w-fit"
      >
        <span className="font-noto-serif-narrow text-[24px] font-bold text-[#1C3C8C]">4,7</span>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-[#A2CFFE] text-[#A2CFFE]" />
          ))}
        </div>
        <span className="text-[12px] uppercase tracking-wider text-[#566A93] ml-2">Яндекс Карты</span>
      </a>

      {/* Variant 2: Floating Glass Pill */}
      <a
        href={YANDEX_MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 rounded-full border border-[#daebff] bg-white/50 backdrop-blur-sm px-4 py-2 transition-all hover:bg-white w-fit ds-bento-shadow"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#A2CFFE] text-white font-bold text-[14px]">Я</div>
        <span className="font-semibold text-[#1C3C8C]">4,7</span>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-[#A2CFFE] text-[#A2CFFE]" />
          ))}
        </div>
      </a>

      {/* Variant 3: Vertical Serif Elegance */}
      <a
        href={YANDEX_MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col gap-1 transition-all hover:opacity-80 w-fit"
      >
        <div className="flex items-baseline gap-2">
          <span className="font-noto-serif-narrow text-[36px] font-bold leading-none text-[#1C3C8C]">4,7</span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#566A93]">Рейтинг</span>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-[#A2CFFE] text-[#A2CFFE]" />
          ))}
        </div>
      </a>
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
          <RatingBlock />
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
