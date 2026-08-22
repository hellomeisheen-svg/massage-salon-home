import { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PromoBanner } from "@/components/PromoBanner";
import { Programs } from "@/components/Programs";
import { Education } from "@/components/Education";
import { OtherServices } from "@/components/OtherServices";

import { BookingProvider, useBooking } from "@/components/BookingModal";
import { formatPrice, pluralize, renderPrice, formatDurationString } from "@/components/Services";
export type ServicePrice = {
  zone: string;
  subtitle: string;
  duration: string;
  base: number;
};


export type ServiceSection = { label: string; content: React.ReactNode };

export const servicePageNav = [
  { label: "Об услуге", href: "#services" },
  { label: "Стоимость", href: "#prices" },
  { label: "Программы", href: "#programs" },
  { label: "Обо мне", href: "#obrazovanie" },
  { label: "Вопросы", href: "#faq" },
  { label: "Контакты", href: "#contacts" },
];

export const servicePageFooterNav = [
  { label: "Главная", to: "/" },
  ...servicePageNav.filter((i) => i.label !== "Контакты"),
];



export type ServicePageContent = {
  slug: string;
  breadcrumb: string;
  title: string;
  hit?: boolean;
  heroText: React.ReactNode;
  heroImage: string;
  heroImageAlt: string;
  aboutHeadingMobile?: React.ReactNode;
  aboutHeading: React.ReactNode;
  sections: ServiceSection[];
  prices: ServicePrice[];
  faq: { q: string; a: React.ReactNode }[];
  bookingPrefix: string;
  /** Ключи программ, которые нужно показать первыми */
  prioritizeKeys?: string[];
  /** Вид отображения прайса: карточки (по умолчанию) или таблица */
  pricesStyle?: "cards" | "table";
};

export function ServicePage({ content }: { content: ServicePageContent }) {
  return (
    <BookingProvider>
      <div className="relative min-h-screen bg-[#EFF6FF] pt-20 xl:pt-[100px]">
        <Header items={servicePageNav} />
        <PageHero content={content} />
        <AboutService content={content} />
        <Prices content={content} />
        <PromoBanner />
        <Programs prioritizeKeys={content.prioritizeKeys} />
        <PromoBanner
          title={
            <>
              <span className="xl:hidden">До повышения цен осталось немного времени</span>
              <span className="hidden xl:inline">
                С&nbsp;1&nbsp;сентября часть курсов подорожает, а&nbsp;пока
                <br />
                можно купить их по&nbsp;прежней цене
              </span>
            </>
          }
          subtitle={
            <>
              До этой даты действует прежняя цена: можно купить курс сейчас
              <br />
              и приходить на сеансы позже.
            </>
          }
        />
        <Education />
        <Faq content={content} />
        <OtherServices exclude={content.slug} />
        <Footer items={servicePageFooterNav} />
      </div>
    </BookingProvider>
  );
}


function PageHero({ content }: { content: ServicePageContent }) {
  return (
    <main className="bg-[#EFF6FF] py-4 sm:py-5">
      <section id="hero" className="container-1900 grid grid-cols-1 gap-4 sm:gap-5 xl:min-h-[calc(100vh-160px)] xl:grid-cols-2">
        <div className="ds-bento-shadow flex flex-col ds-card min-h-[640px] sm:h-[600px] xl:min-h-0 xl:h-auto p-5 sm:p-6 xl:p-10 overflow-hidden">
          <nav aria-label="Хлебные крошки" className="text-[14px] text-[#566A93]">
            <Link to="/" className="hover:opacity-70 transition-opacity">
              Главная
            </Link>
            <span className="px-2">/</span>
            <span className="text-[#1C3C8C]">{content.breadcrumb}</span>
          </nav>

          <div className="mt-6 sm:mt-8 mb-4 flex items-end text-left gap-4 sm:flex-col sm:items-start sm:gap-0 xl:flex-col xl:items-start xl:gap-0">
            <img
              src="/images/tatyana-photo.webp"
              alt="Татьяна Злобина"
              className="h-[90px] w-[70px] sm:h-[110px] sm:w-[85px] xl:h-[110px] xl:w-[85px] rounded-[12px] border border-[#daebff] ds-bento-shadow object-cover flex-shrink-0"
            />
            <div className="flex flex-col">
              <h3 className="font-noto-serif-narrow mt-0 sm:mt-6 xl:mt-6 ds-h4 text-[#1C3C8C] sm:text-[28px] xl:text-[28px]">
                Татьяна Злобина
              </h3>
              <p className="mt-1 sm:mt-3 xl:mt-3 text-[14px] sm:text-[16px] leading-[1.4] sm:leading-[1.6] body-text text-[#566A93]">
                Мастер кабинета, специалист<br className="hidden sm:block xl:block" /> по{"\u00A0"}оздоровительным практикам
              </p>
            </div>
          </div>

          <div className="mt-auto xl:mt-auto pt-4 sm:pt-12">
            <div className="flex flex-col tablet-text-block xl:max-w-[640px]">
              <div className="flex flex-col gap-y-2">
                {content.hit && (
                  <div className="flex sm:hidden">
                    <span className="inline-flex items-center rounded-[12px] bg-[#A2CFFE] px-2 py-0.5 text-[14px] font-medium lowercase tracking-tight text-white">
                      хит
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-x-3 gap-y-2 flex-wrap">
                  <h1 className="font-noto-serif-narrow text-[30px] font-light leading-[1.12] text-[#1C3C8C] sm:text-[58px] sm:leading-[1.15]">
                    {content.title}
                  </h1>
                  {content.hit && (
                    <span className="hidden sm:inline-flex items-center rounded-[12px] bg-[#A2CFFE] px-2 py-0.5 text-[14px] font-medium lowercase tracking-tight text-white">
                      хит
                    </span>
                  )}
                </div>
              </div>
              <p className="mt-4 text-[16px] font-light leading-[26px] text-[#566A93]">
                {content.heroText}
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
                <button
                  type="button"
                  onClick={() =>
                    window.open(
                      "https://max.ru/u/f9LHodD0cOLS1ZC9ThcQkVLRVzcK-MbYZ7JVAg8PC5Tx9LyihgOVdPnzaxM",
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                  className="btn-secondary w-full sm:w-[280px] xl:w-[250px] whitespace-nowrap"
                >
                  Получить консультацию
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="ds-bento-shadow relative h-[420px] overflow-hidden rounded-[12px] border border-[#daebff] sm:h-[520px] md:h-[600px] xl:h-auto xl:min-h-0">
          <img
            className="absolute inset-0 h-full w-full object-cover object-top sm:object-center xl:object-top"
            alt={content.heroImageAlt}
            src={content.heroImage}
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </section>
    </main>
  );
}

function AboutService({ content }: { content: ServicePageContent }) {
  const sections = content.sections;
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => {
      const anchor = window.innerHeight * 0.35;
      let current = 0;
      refs.current.forEach((el: HTMLDivElement | null, i: number) => {
        if (el && el.getBoundingClientRect().top <= anchor) current = i;
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (i: number) => {
    const el = refs.current[i];
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 140;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const nav = (
    <nav className="flex w-full flex-col gap-3 items-start">
      {sections.map((s, i) => {
        const isActive = i === active;
        return (
          <button
            key={s.label}
            type="button"
            onClick={() => goTo(i)}
            aria-current={isActive}
            className="flex items-center gap-3 text-left group/nav"

          >
            <span
              className={`h-2 w-2 rounded-[12px] transition-colors ${
                isActive ? "bg-[#1C3C8C]" : "bg-[#B7C5E3] group-hover/nav:bg-[#1C3C8C]/50"

              }`}
            />
            <span
              className={`text-[16px] transition-colors ${
                isActive ? "text-[#1C3C8C]" : "text-[#566A93] group-hover/nav:text-[#1C3C8C]"

              }`}
            >
              {s.label}
            </span>
          </button>
        );
      })}
    </nav>
  );

  return (
    <section id="services" className="scroll-mt-[140px] bg-[#EFF6FF] ds-section">
      <div className="container-1900 grid grid-cols-1 xl:grid-cols-2 gap-8 sm:gap-5 items-start">
        <div className="self-start xl:sticky xl:top-[140px] flex flex-col items-center xl:items-start text-center xl:text-left">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 ds-label text-white"
            style={{
            borderRadius: "12px",
              backgroundImage: "linear-gradient(to bottom, #A2CFFE, #88C1FF)",
            }}
          >
            Об услуге
          </span>
          <h2 className="font-noto-serif-narrow mt-6 ds-h2 text-[#1C3C8C] max-w-[520px] mx-auto xl:mx-0">
            <span className="xl:hidden">
              {content.aboutHeadingMobile || "Обсуждаем состояние перед каждым визитом и\u00A0подбираем технику"}
            </span>
            <span className="hidden xl:inline">{content.aboutHeading}</span>
          </h2>

          <div className="mt-8 hidden xl:block w-full max-w-[520px] text-left">{nav}</div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="ds-bento-shadow ds-card p-6 sm:p-8 xl:p-10 !overflow-visible">
            <div className="flex flex-col gap-10 sm:gap-12">
              {sections.map((s, i) => (
                <div
                  key={s.label}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  className="scroll-mt-[140px] flex flex-col xl:flex-row xl:gap-10"
                >
                  <h3 className="font-noto-serif-narrow text-[26px] sm:text-[36px] font-light leading-[1.15] text-[#1C3C8C] xl:!sticky xl:!top-[160px] xl:!self-start xl:w-[240px] xl:shrink-0">
                    {s.label}
                  </h3>
                  <div className="mt-5 xl:mt-0 text-[#566A93] space-y-4 text-[15px] leading-[1.6] flex-1">
                    {s.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const sessionDiscounts = [null, "-10%", "-15%"] as const;
const discountValues = [0, 0.1, 0.15];
const sessionCounts = [1, 3, 6];
const tabLabels = ["1\u00A0сеанс", "3\u00A0сеанса", "6\u00A0сеансов"];

function PriceCard({ p, prefix }: { p: ServicePrice; prefix: string }) {
  const { openBooking } = useBooking();
  const [active, setActive] = useState(0);

  const count = sessionCounts[active];
  const discount = discountValues[active];
  const base = p.base * count;
  const originalPrice = formatPrice(base);
  const computedPrice = formatPrice(Math.round(base * (1 - discount)));
  const hasDiscount = discount > 0;

  const sessionWord = pluralize(count, ["сеанс", "сеанса", "сеансов"]);
  
  // Увеличиваем длительность в соответствии с количеством сеансов
  const multipliedDuration = formatDurationString(p.duration, count);
  const summary = `${count} ${sessionWord} · ${multipliedDuration}`;

  return (
    <article className="flex flex-col ds-card ds-bento-shadow p-6 sm:p-8 xl:p-10">
      <div className="items-stretch gap-1 rounded-[12px] bg-[#EFF6FF] p-1 flex">
        {tabLabels.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => setActive(i)}
            className={`relative flex flex-1 items-center justify-center rounded-[12px] px-2 py-2.5 transition-all duration-300 ${
              active === i ? "bg-white shadow-tab-active" : "bg-transparent hover:bg-white/40"
            }`}

          >
            <span
              className={`whitespace-nowrap text-[13px] tracking-tight transition-colors duration-300 ${
                active === i ? "font-medium text-[#1C3C8C]" : "font-light text-[#566A93]"
              }`}
            >
              {label}
            </span>
            {sessionDiscounts[i] && (
              <span className="absolute -top-1 right-1 rounded-[12px] bg-[#1C3C8C] px-1.5 py-0.5 text-[9px] font-semibold tracking-wide text-white">
                {sessionDiscounts[i]}
              </span>
            )}
          </button>
        ))}
      </div>

      <h3 className="font-noto-serif-narrow mt-5 text-[24px] sm:text-[32px] font-light leading-[1.1] text-[#1C3C8C]">
        {p.zone}
      </h3>
      <p className="mt-3 text-[15px] font-light leading-[1.5] text-[#566A93]">{p.subtitle}</p>

      <p className="mt-6 text-[13px] font-medium leading-[18px] tracking-wide text-[#1C3C8C]">
        {summary}
      </p>
      
      <div className="mt-6 flex items-center justify-end gap-4 sm:gap-5">
        {hasDiscount && (
          <span className="font-noto-serif-narrow text-[17px] sm:text-[19px] font-light leading-[1.2] text-[#566A93] line-through">
            {renderPrice(originalPrice)}
          </span>
        )}
        <div className="flex flex-col items-end">
          <span className="font-noto-serif-narrow ds-price text-[#1C3C8C]">
            {renderPrice(computedPrice)}
          </span>
          <span className="text-[13px] font-light text-[#566A93]">
            за {count} {sessionWord}
          </span>
        </div>
      </div>
      <div className="mt-8">
        <button
          type="button"
          onClick={() => openBooking(p.zone)}
          className="btn-primary w-full py-3 text-[15px]"
        >
          Записаться онлайн
        </button>
      </div>
    </article>
  );
}


function PriceTable({ content }: { content: ServicePageContent }) {
  return (
    <div className="ds-bento-shadow ds-card overflow-hidden bg-white border border-[#daebff] rounded-[12px]">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#EFF6FF]/50 border-b border-[#daebff]">
              <th className="px-6 py-4 text-[13px] font-medium tracking-wide text-[#1C3C8C] xl:px-8">
                Зона
              </th>
              <th className="px-6 py-4 text-[13px] font-medium tracking-wide text-[#1C3C8C] xl:px-8">
                Длительность
              </th>
              <th className="px-6 py-4 text-[13px] font-medium tracking-wide text-[#1C3C8C] xl:px-8">
                1 сеанс
              </th>
              <th className="px-6 py-4 text-[13px] font-medium tracking-wide text-[#1C3C8C] xl:px-8">
                <span className="flex items-center gap-2">
                  3 сеанса
                  <span className="rounded-[12px] bg-[#1C3C8C] px-2 py-0.5 text-[10px] font-semibold text-white">
                    -10%
                  </span>
                </span>
              </th>
              <th className="px-6 py-4 text-[13px] font-medium tracking-wide text-[#1C3C8C] xl:px-8">
                <span className="flex items-center gap-2">
                  6 сеансов
                  <span className="rounded-[12px] bg-[#1C3C8C] px-2 py-0.5 text-[10px] font-semibold text-white">
                    -15%
                  </span>
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#daebff]">
            {content.prices.map((p) => {
              const base = p.base;
              const p3 = Math.round(base * 3 * 0.9);
              const p6 = Math.round(base * 6 * 0.85);

              return (
                <tr key={p.zone} className="group transition-colors hover:bg-[#F7FBFF]">
                  <td className="px-6 py-6 xl:px-8">
                    <div className="font-noto-serif-narrow text-[20px] xl:text-[24px] font-light leading-tight text-[#1C3C8C]">
                      {p.zone}
                    </div>
                    <div className="mt-1 text-[13px] font-light text-[#566A93]">
                      {p.subtitle}
                    </div>
                  </td>
                  <td className="px-6 py-6 text-[16px] font-light text-[#566A93] xl:px-8">
                    {p.duration}
                  </td>
                  <td className="px-6 py-6 xl:px-8">
                    <span className="font-noto-serif-narrow text-[20px] xl:text-[24px] font-light text-[#1C3C8C]">
                      {renderPrice(formatPrice(base))}
                    </span>
                  </td>
                  <td className="px-6 py-6 xl:px-8">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-noto-serif-narrow text-[14px] font-light text-[#566A93]/40 line-through">
                          {renderPrice(formatPrice(base * 3))}
                        </span>
                        <span className="font-noto-serif-narrow text-[20px] xl:text-[24px] font-light text-[#1C3C8C]">
                          {renderPrice(formatPrice(p3))}
                        </span>
                      </div>
                      <div className="text-[12px] font-light text-[#566A93]">
                        {formatDurationString(p.duration, 3)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 xl:px-8">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-noto-serif-narrow text-[14px] font-light text-[#566A93]/40 line-through">
                          {renderPrice(formatPrice(base * 6))}
                        </span>
                        <span className="font-noto-serif-narrow text-[20px] xl:text-[24px] font-light text-[#1C3C8C]">
                          {renderPrice(formatPrice(p6))}
                        </span>
                      </div>
                      <div className="text-[12px] font-light text-[#566A93]">
                        {formatDurationString(p.duration, 6)}
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Prices({ content }: { content: ServicePageContent }) {
  return (
    <section id="prices" className="scroll-mt-[140px] bg-[#EFF6FF] ds-section">
      <div className="container-1900">
        <h2 className="font-noto-serif-narrow text-center ds-h2 text-[#1C3C8C]">
          Форматы и&nbsp;стоимость
        </h2>

        {/* Desktop View */}
        <div className="hidden lg:block mt-10">
          <PriceTable content={content} />
        </div>

        {/* Mobile View */}
        <div className="lg:hidden mt-8 grid grid-cols-1 gap-4 sm:gap-5">
          {content.prices.map((p) => (
            <PriceCard key={p.zone} p={p} prefix={content.bookingPrefix} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ q, a }: { q: string; a: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="ds-card ds-bento-shadow">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 xl:p-7 text-left"
      >
        <span className="font-noto-serif-narrow text-[#1C3C8C] ds-h4 text-[18px] sm:text-[28px] max-sm:!font-body">
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
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden px-2 -mx-2 py-3 -my-3">
          <div className="px-5 sm:px-6 xl:px-7 pb-5 sm:pb-6 xl:pb-7 body-text text-[#566A93] max-w-[720px]">
            {a}
          </div>
        </div>
      </div>
    </div>
  );
}

function Faq({ content }: { content: ServicePageContent }) {
  return (
    <section id="faq" className="scroll-mt-[120px] bg-[#EFF6FF] ds-section">
      <div className="container-1900 grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5 items-stretch">
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
          <h2 className="font-noto-serif-narrow mt-6 ds-h2 text-[#1C3C8C] max-w-[520px] mx-auto xl:mx-0">
            Отвечаю на&nbsp;самые важные вопросы
          </h2>

          <div className="mt-8 xl:mt-auto ds-card ds-bento-shadow p-5 sm:p-7 w-full xl:w-1/2 mx-auto xl:mx-0 text-left">
            <div className="flex items-end text-left gap-4 xl:flex-col xl:items-start xl:gap-0">
              <img
                src="/images/tatyana-photo.webp"
                alt="Татьяна Злобина"
                className="h-[90px] w-[70px] sm:h-[110px] sm:w-[85px] xl:h-[110px] xl:w-[85px] rounded-[12px] border border-[#daebff] ds-bento-shadow object-cover flex-shrink-0"
              />
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

        <div className="flex flex-col gap-3 sm:gap-4">
          {content.faq.map((it) => (
            <FaqItem key={it.q} q={it.q} a={it.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

