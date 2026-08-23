
import { useState, useId } from "react";
import { Plus } from "lucide-react";

const items = [
  {
    q: "Впервые: с чего начать?",
    a: "Начну со\u00A0знакомства с\u00A0кабинетом: короткая беседа о\u00A0самочувствии и\u00A0целях, а\u00A0затем — мягкий пробный сеанс, чтобы вы почувствовали формат работы и\u00A0атмосферу.",
  },
  {
    q: "Как выбрать процедуру?",
    a: "Не\u00A0обязательно выбирать заранее — на\u00A0первой встрече я вместе с вами подберу подходящую практику под\u00A0ваше состояние, пожелания и\u00A0текущий запрос организма.",
  },
  {
    q: "Что взять с собой?",
    a: "Возьмите с собой хорошее настроение и удобную одежду. Всё остальное я предоставлю: одноразовые материалы, стерильные инструменты и заботу о вашем комфорте. Если у вас есть вопросы — напишите мне заранее, я с радостью помогу подготовиться.",
  },
  {
    q: "Есть ли противопоказания?",
    a: "Да, у\u00A0каждой оздоровительной практики есть свои ограничения. Перед\u00A0сеансом я обязательно уточню состояние здоровья и\u00A0подберу самый безопасный вариант работы.",
  },
  {
    q: "Можно при беременности?",
    a: "Некоторые мягкие практики допустимы, но\u00A0требуют обязательного согласования с\u00A0вашим врачом. Расскажите о\u00A0сроке и\u00A0самочувствии — я подберу бережный вариант поддержки.",
  },
  {
    q: "Где находится кабинет?",
    a: "Кабинет расположен в\u00A0посёлке Трудовое. Принимаю по\u00A0записи. Записаться можно в\u00A0мессенджере Max — я уточню удобное время и\u00A0дам рекомендации к\u00A0вашему первому сеансу.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const contentId = useId();

  return (
    <div className="ds-card ds-bento-shadow">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={contentId}
        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 xl:p-7 text-left faq-trigger focus:outline-none"
      >
        <span className="font-heading ds-h4 text-[#1C3C8C] text-[18px] sm:text-[28px] xl:text-[28px] max-sm:!font-body">
          {q}
        </span>
        <span
          className={`shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-[12px] bg-[#EFF6FF] border border-[#daebff] flex items-center justify-center transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-[#1C3C8C]" strokeWidth={2} />
        </span>
      </button>
      <div
        id={contentId}
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 sm:px-6 xl:px-7 pb-5 sm:pb-6 xl:pb-7 body-text text-[#566A93] max-w-[720px]">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-[120px] bg-[#EFF6FF] ds-section">
      <div className="container-1900 grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5 items-stretch">
        {/* Left column */}
        <div className="flex flex-col items-center xl:items-start text-center xl:text-left h-full">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 ds-label text-white"
            style={{
              borderRadius: "12px",
              backgroundImage: "linear-gradient(to bottom, #A2CFFE, #88C1FF)",
            }}
          >
            FAQs
          </span>
          <h2 className="font-heading mt-6 ds-h2 text-[#1C3C8C] max-w-[520px] mx-auto xl:mx-0">
            Отвечаю на&nbsp;самые важные вопросы
          </h2>

          <div className="mt-8 xl:mt-auto ds-card ds-bento-shadow p-5 sm:p-7 w-full xl:w-1/2 mx-auto xl:mx-0 text-left">
            <div className="flex items-end text-left gap-4 xl:flex-col xl:items-start xl:gap-0">
              <img loading="eager" decoding="sync" fetchPriority="high" src="/images/tatyana-photo.webp"
                alt="Татьяна Злобина, мастер оздоровительных практик, кабинет Седьмое небо, г. Владивосток"
                className="h-[90px] w-[70px] sm:h-[110px] sm:w-[85px] xl:h-[110px] xl:w-[85px] rounded-[12px] border border-[#daebff] ds-bento-shadow object-cover flex-shrink-0" />
              <div className="flex flex-col">
                <h3 className="font-noto-serif-narrow mt-0 xl:mt-6 ds-h4 text-[#1C3C8C] sm:text-[28px] xl:text-[28px]">
                  Татьяна Злобина
                </h3>
                <p className="mt-1 xl:mt-3 text-[14px] sm:text-[16px] leading-[1.4] sm:leading-[1.6] body-text text-[#566A93]">
                  Мастер кабинета, специалист<br className="hidden sm:block xl:block" /> по{"\u00A0"}оздоровительным практикам
                </p>
              </div>
            </div>
            <p className="mt-6 body-text text-[#1C3C8C]">
              Остались вопросы? Напишите мне&nbsp;— я&nbsp;всё подробно расскажу.
            </p>
            <a
              href="https://max.ru/u/f9LHodD0cOLS1ZC9ThcQkVLRVzcK-MbYZ7JVAg8PC5Tx9LyihgOVdPnzaxM"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6 w-full inline-flex items-center justify-center"
            >
              Получить консультацию
            </a>
          </div>
        </div>

        {/* Right column: accordion card */}
        <div className="flex flex-col gap-3 sm:gap-4">
          {items.map((it) => (
            <FaqItem key={it.q} q={it.q} a={it.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
