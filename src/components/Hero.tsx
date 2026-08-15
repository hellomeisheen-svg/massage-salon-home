import { useState } from "react";
import { QuizModal } from "@/components/quiz/QuizModal";

export function Hero() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <main className="bg-[#EFF6FF] py-4 sm:py-5">
      <section id="hero" className="container-1900 grid grid-cols-1 gap-4 sm:gap-5 xl:min-h-[calc(100vh-160px)] xl:grid-cols-2">
        <div className="flex min-h-0 flex-col ds-card p-5 sm:p-6 xl:p-10">
          {/* Content content... */}
          <div className="mt-[100px] pt-0 sm:mt-[140px] xl:mt-auto xl:pt-[140px]">
            <h1 className="font-noto-serif-narrow ds-h1 text-[#1C3C8C] xl:whitespace-pre-line">
              Массаж, гирудотерапия и банки во Владивостоке
            </h1>
            <div className="mt-[30px] flex flex-col gap-3 sm:flex-row sm:gap-4">
              <a href="https://n2418813.yclients.com" className="btn-primary w-full sm:w-[280px] xl:w-[250px] inline-flex items-center justify-center">
                Онлайн запись
              </a>
              <button onClick={() => setIsQuizOpen(true)} className="btn-secondary w-full sm:w-[280px] xl:w-[250px]">
                Подобрать программу
              </button>
            </div>
          </div>
        </div>

        {/* Hero image... */}
      </section>
      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </main>
  );
}
