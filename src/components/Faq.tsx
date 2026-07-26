import { useState } from "react";
import { Plus } from "lucide-react";

const items = [
  {
    q: "С чего начать, если я впервые?",
    a: "Начнём со знакомства с кабинетом: короткая беседа о самочувствии и целях, а затем — мягкий пробный сеанс, чтобы вы почувствовали формат работы.",
  },
  {
    q: "Как выбрать процедуру?",
    a: "Не обязательно выбирать заранее — на первой встрече мы вместе подберём практику под ваше состояние и запрос.",
  },
  {
    q: "Что надеть и как готовиться?",
    a: "Приходите в удобной одежде. Специальной подготовки не требуется — бельё, полотенца и всё необходимое уже подготовлено в кабинете.",
  },
  {
    q: "Есть ли противопоказания?",
    a: "Да, у каждой практики есть свои ограничения. Перед сеансом мы обязательно уточним состояние здоровья и подберём безопасный вариант работы.",
  },
  {
    q: "Можно ли во время беременности?",
    a: "Некоторые практики допустимы, но требуют согласования с врачом. Расскажите о сроке и самочувствии — подберём мягкий вариант.",
  },
  {
    q: "Как часто можно приходить?",
    a: "Ритм подбирается индивидуально: от разовой поддержки до курса из нескольких сеансов с интервалом в неделю.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-[12px] bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 xl:p-7 text-left"
      >
        <span
          className="text-[#1C3C8C] text-[20px] sm:text-[24px] xl:text-[28px] leading-[1.2]"
          style={{ fontFamily: "'Roslindale Cyrillic Display Condensed', serif" }}
        >
          {q}
        </span>
        <span
          className={`shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] bg-[#DAEBFF] flex items-center justify-center transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-[#1C3C8C]" strokeWidth={2} />
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 sm:px-6 xl:px-7 pb-5 sm:pb-6 xl:pb-7 text-[#1C3C8C] text-[15px] sm:text-[16px] leading-[1.5] max-w-[720px]">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  return (
    <section id="faq" className="bg-[#EFF6FF] py-[60px] sm:py-[70px]">
      <div className="container-1900 grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 xl:gap-10 items-start">
        {/* Left column */}
        <div className="flex flex-col gap-6 sm:gap-8">
          <span
            className="self-start inline-flex items-center px-4 py-2 rounded-[12px] bg-[#DAEBFF] text-[#1C3C8C] text-[14px] leading-none"
          >
            FAQs
          </span>
          <h2
            className="text-[30px] sm:text-[44px] xl:text-[56px] leading-[1.1] text-[#1C3C8C] font-light"
            style={{ fontFamily: "'Roslindale Cyrillic Display Condensed', serif" }}
          >
            Отвечаю на&nbsp;самые<br className="hidden sm:block" /> важные вопросы
          </h2>

          <div className="rounded-[12px] bg-white p-5 sm:p-6 xl:p-7 max-w-[420px]">
            <img
              src="/images/tatyana-photo.jpg"
              alt="Татьяна Злобина"
              className="w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] rounded-[12px] object-cover"
            />
            <h3
              className="mt-5 text-[#1C3C8C] text-[24px] sm:text-[28px] leading-[1.1]"
              style={{ fontFamily: "'Roslindale Cyrillic Display Condensed', serif" }}
            >
              Татьяна Злобина
            </h3>
            <p className="mt-2 text-[#8D9DC5] text-[15px] sm:text-[16px] leading-[1.5]">
              Мастер кабинета, специалист<br /> по&nbsp;оздоровительным практикам
            </p>
            <p className="mt-5 text-[#1C3C8C] text-[15px] sm:text-[16px] leading-[1.5]">
              Остались вопросы? Напишите мне&nbsp;— я&nbsp;всё подробно расскажу.
            </p>
            <a
              href="https://n2418813.yclients.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6 w-full inline-flex items-center justify-center"
            >
              Получить консультацию
            </a>
          </div>
        </div>

        {/* Right column: accordion */}
        <div className="flex flex-col gap-3 sm:gap-4">
          {items.map((it) => (
            <FaqItem key={it.q} q={it.q} a={it.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
