import { useState, useRef, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PromoBanner } from "@/components/PromoBanner";
import { BookingProvider, useBooking } from "@/components/BookingModal";
import { formatPrice, pluralize, renderPrice } from "@/components/Services";


const heading = "'Roslindale Cyrillic Display Condensed', serif";

export const Route = createFileRoute("/girudoterapiya")({
  head: () => ({
    meta: [
      { title: "Гирудотерапия во Владивостоке — кабинет Татьяны Злобиной" },
      {
        name: "description",
        content:
          "Гирудотерапия в спокойном ритме: медицинские и косметические пиявки, стерильные материалы, бережная постановка. Стоимость от 4 800 ₽, запись онлайн.",
      },
      { property: "og:title", content: "Гирудотерапия — кабинет Татьяны Злобиной" },
      {
        property: "og:description",
        content:
          "Медицинские и косметические пиявки: мягкая процедура, стерильные материалы, внимательное сопровождение до и после сеанса.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GirudoterapiyaPage,
});

const badges = ["Стерильные материалы", "Пиявка используется один раз", "Сопровождение после сеанса"];

const benefits = [
  {
    title: "Мягкое снятие напряжения",
    text: "Процедура помогает почувствовать лёгкость в теле и спокойно отпустить накопленное напряжение.",
  },
  {
    title: "Внимание к состоянию",
    text: "Перед сеансом обсуждаем самочувствие и подбираем количество пиявок и зоны без спешки.",
  },
  {
    title: "Аккуратный эстетический уход",
    text: "Косметическая постановка поддерживает свежий вид и ровный тон кожи без агрессивного воздействия.",
  },
  {
    title: "Спокойная атмосфера",
    text: "Тихий кабинет, свежее выглаженное бельё и тёплый чай после процедуры.",
  },
];

const steps = [
  { n: "01", title: "Знакомство", text: "Короткая беседа о самочувствии, ожиданиях и подходящем формате." },
  { n: "02", title: "Подготовка", text: "Выбираем зоны, готовим кожу и стерильные материалы." },
  { n: "03", title: "Постановка", text: "Бережная постановка пиявок, комфортное положение тела, тишина и покой." },
  { n: "04", title: "После сеанса", text: "Накладываю стерильную повязку и подробно рассказываю, как ухаживать за зонами." },
];

const prices = [
  {
    zone: "Медицинские пиявки",
    subtitle: "Оздоровительная практика",
    duration: "2\u00A0часа",
    base: 4800,
    perLeech: false,
    items: ["6\u00A0пиявок", "16\u00A0пиявок", "74\u00A0пиявки"],
  },
  {
    zone: "Косметические пиявки",
    subtitle: "Мягкий уход и\u00A0забота о\u00A0коже",
    duration: "2\u00A0часа",
    base: 600,
    perLeech: true,
    items: ["6\u00A0пиявок", "10\u00A0пиявок", "20\u00A0пиявок"],
  },
];


const faq = [
  {
    q: "Это больно?",
    a: "Ощущение сравнимо с легким покалыванием в первые секунды. Дальше процедура проходит спокойно, и большинство людей просто отдыхает.",
  },
  {
    q: "Пиявки используются повторно?",
    a: "Нет. Каждая пиявка используется один раз и утилизируется после сеанса, все материалы стерильные.",
  },
  {
    q: "Сколько длится сеанс?",
    a: "Около двух часов вместе с беседой, подготовкой и уходом за зонами после постановки.",
  },
  {
    q: "Как подготовиться?",
    a: "За сутки лучше отказаться от алкоголя и резких ароматов на коже, а перед визитом спокойно поесть.",
  },
];

function GirudoterapiyaPage() {
  return (
    <BookingProvider>
      <div className="relative min-h-screen bg-[#EFF6FF] pt-20 xl:pt-[100px]">
        <Header />
        <PageHero />
        <GirudoterapiyaServices />
        <Prices />
        <PromoBanner />
        <Faq />
        <Footer />
      </div>
    </BookingProvider>
  );
}

const heroFont = {
  fontFamily: "'Roslindale Cyrillic Display Condensed', serif",
} as const;

function SpecialistBlock() {
  return (
    <div className="flex flex-col items-start gap-3 sm:gap-4">
      <img
        className="h-[90px] w-[70px] rounded-lg object-cover xl:h-[110px] xl:w-[85px]"
        alt="Татьяна Злобина"
        src="/images/tatyana-photo.jpg"
      />
      <div className="flex flex-col gap-1">
        <h2
          className="text-[22px] font-light leading-[1.2] text-[#1c3c8c] sm:text-[24px] xl:text-[28px]"
          style={heroFont}
        >
          Татьяна&nbsp;Злобина
        </h2>
        <p className="text-[16px] font-light leading-[26px] text-[#6B7BA8]">
          Мастер кабинета, специалист
          <br />
          по&nbsp;оздоровительным практикам
        </p>
      </div>
    </div>
  );
}

function PageHero() {
  return (
    <main className="bg-[#EFF6FF] py-4 sm:py-5">
      <section className="container-1900 grid grid-cols-1 gap-4 sm:gap-5 xl:min-h-[calc(100vh-160px)] xl:grid-cols-2">
        <div className="flex min-h-0 flex-col ds-card p-5 sm:min-h-[520px] sm:p-6 xl:min-h-0 xl:p-10">
          <nav aria-label="Хлебные крошки" className="text-[14px] text-[#6B7BA8]">
            <Link to="/" className="hover:opacity-70 transition-opacity">
              Главная
            </Link>
            <span className="px-2">/</span>
            <span className="text-[#1C3C8C]">Гирудотерапия</span>
          </nav>

          <div className="mt-6 sm:mt-8">
            <SpecialistBlock />
          </div>

          <div className="mt-[60px] pt-0 sm:mt-[140px] xl:mt-auto xl:pt-[140px]">
            <div className="flex flex-col tablet-text-block xl:max-w-[640px]">
              <h1
                className="text-[38px] font-light leading-[1.12] text-[#1C3C8C] sm:text-[58px] sm:leading-[1.15]"
                style={heroFont}
              >
                Гирудотерапия
              </h1>
              <p className="mt-4 text-[16px] font-light leading-[26px] text-[#6B7BA8]">
                Бережная практика с использованием медицинских пиявок — для поддержки самочувствия, ощущения лёгкости и более внимательного контакта с телом.
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

        <div className="relative h-[420px] overflow-hidden rounded-[12px] border border-[#daebff] sm:h-[520px] xl:h-auto xl:min-h-0">
          <img
            className="absolute inset-0 h-full w-full object-cover object-top sm:object-center"
            alt="Гирудотерапия в кабинете Татьяны Злобиной"
            src="/images/uslugi-girudoterapiya-litsa.jpg"
          />
        </div>
      </section>
    </main>
  );
}


const girudoSections: { label: string; content: React.ReactNode }[] = [
  {
    label: "Об услуге",
    content: (
      <>
        <p>Процедура с использованием медицинских пиявок, которая проводится после предварительной консультации специалиста. На встрече учитываются жалобы, индивидуальные особенности организма, хронические состояния и принимаемые препараты.</p>
        <p>Специалист подбирает зоны постановки, количество пиявок и периодичность сеансов индивидуально. Процедура не заменяет диагностику и лечение, назначенное врачом.</p>
      </>
    ),
  },
  {
    label: "Медицинские пиявки",
    content: (
      <>
        <p>В работе используются только сертифицированные медицинские пиявки, выращенные в специализированных биофабриках в контролируемых условиях. Они применяются однократно: после процедуры пиявки не используются повторно для других пациентов.</p>
        <p>Медицинские пиявки относятся к определённым видам, используемым в медицинской практике, включая <em>Hirudo medicinalis</em>. Не используются пиявки, собранные в природных водоёмах, или пиявки неизвестного происхождения.</p>
      </>
    ),
  },
  {
    label: "Косметические пиявки",
    content: (
      <>
        <p>Косметические пиявки — это небольшие медицинские пиявки, которые применяются в деликатной эстетической работе, в том числе в области лица. Термин описывает формат и область использования, а не отдельный вид пиявок.</p>
        <p>Процедура может быть выбрана как часть бережного ухода при запросе на более свежий вид кожи и уменьшение ощущения отёчности. Возможность проведения и схема процедуры определяются только после консультации.</p>
      </>
    ),
  },
  {
    label: "Когда обращаются",
    content: (
      <>
        <p>Процедура может рассматриваться как дополнительная по рекомендации специалиста:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>При ощущении тяжести и усталости в ногах</li>
          <li>При склонности к отёчности</li>
          <li>В рамках комплексных восстановительных программ</li>
          <li>При эстетических запросах, связанных с уходом за кожей</li>
          <li>При желании добавить бережную процедуру к основной программе заботы о себе</li>
        </ul>
        <p>Список не является самостоятельным назначением. Необходимость процедуры, зоны постановки и количество пиявок определяются индивидуально.</p>
      </>
    ),
  },
  {
    label: "Противопоказания",
    content: (
      <>
        <p>Перед процедурой необходима консультация. Процедура не проводится или требует отдельного согласования с лечащим врачом при следующих состояниях:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Нарушения свёртываемости крови, склонность к кровотечениям, гемофилия</li>
          <li>Выраженная анемия и заболевания крови</li>
          <li>Приём препаратов, влияющих на свёртываемость крови</li>
          <li>Индивидуальная непереносимость или аллергическая реакция</li>
          <li>Беременность и период грудного вскармливания</li>
          <li>Низкое артериальное давление, выраженная слабость</li>
          <li>Острые инфекционные и воспалительные процессы</li>
          <li>Повреждения, воспаления или инфекции кожи в предполагаемой зоне постановки</li>
          <li>Онкологические заболевания — только после согласования с лечащим врачом</li>
        </ul>
        <p>Основные противопоказания включают нарушения свёртываемости, анемию, аллергию, низкое давление, беременность и приём антикоагулянтов.</p>
      </>
    ),
  },
];

function GirudoterapiyaServices() {
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
      {girudoSections.map((s, i) => {
        const isActive = i === active;
        return (
          <button
            key={s.label}
            type="button"
            onClick={() => goTo(i)}
            aria-current={isActive}
            className="flex items-center gap-3 text-left"
          >
            <span
              className={`h-2 w-2 rounded-full transition-colors ${
                isActive ? "bg-[#1C3C8C]" : "bg-[#B7C5E3]"
              }`}
            />
            <span
              className={`text-[16px] transition-colors ${
                isActive ? "text-[#1C3C8C]" : "text-[#6B7BA8]"
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
              borderRadius: "4px",
              backgroundImage: "linear-gradient(to bottom, #A2CFFE, #88C1FF)",
            }}
          >
            Об услуге
          </span>
          <h2
            className="mt-6 ds-h2 text-[#1C3C8C] max-w-[520px] mx-auto xl:mx-0"
            style={{ fontFamily: heading }}
          >
            Перед каждым визитом обсуждаем ваше состояние&nbsp;— и&nbsp;подбираем технику под&nbsp;него
          </h2>

          <div className="mt-8 hidden xl:block w-full max-w-[520px] text-left">{nav}</div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="ds-card p-6 sm:p-8 xl:p-10">
            <div className="flex flex-col gap-10 sm:gap-12">
              {girudoSections.map((s, i) => (
                <div
                  key={s.label}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  className="scroll-mt-[140px]"
                >
                  <h3
                    className="text-[26px] sm:text-[32px] font-light leading-[1.15] text-[#1C3C8C]"
                    style={{ fontFamily: heading }}
                  >
                    {s.label}
                  </h3>
                  <div className="mt-5 text-[#6B7BA8] space-y-4 text-[15px] leading-[1.6]">
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

function PriceCard({ p }: { p: (typeof prices)[number] }) {
  const { openBooking } = useBooking();
  const [active, setActive] = useState(0);

  const leechCount = Number(p.items[active].match(/\d+/)?.[0] ?? 6);
  const discount = discountValues[active];
  const base = p.perLeech ? leechCount * p.base : p.base * sessionCounts[active];
  const originalPrice = formatPrice(base);
  const computedPrice = formatPrice(Math.round(base * (1 - discount)));
  const hasDiscount = discount > 0;

  const sessionWord = pluralize(sessionCounts[active], ["сеанс", "сеанса", "сеансов"]);
  const summary = p.perLeech
    ? `${p.items[active]} · ${p.duration}`
    : `${sessionCounts[active]} ${sessionWord} · ${p.items[active]} · ${p.duration}`;

  return (
    <article className="flex flex-col ds-card p-6 sm:p-8 xl:p-10">
      {/* Tabs */}
      <div className="flex items-stretch gap-1 rounded-[10px] bg-[#EFF6FF] p-1">
        {p.items.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => setActive(i)}
            className={`relative flex flex-1 items-center justify-center rounded-[8px] px-2 py-2.5 transition-all duration-300 ${
              active === i ? "bg-white shadow-[0_2px_8px_rgba(28,60,140,0.08)]" : "bg-transparent"
            }`}
          >
            <span
              className={`whitespace-nowrap text-[13px] tracking-tight transition-colors duration-300 ${
                active === i ? "font-medium text-[#1C3C8C]" : "font-light text-[#6B7BA8]"
              }`}
            >
              {label}
            </span>
            {sessionDiscounts[i] && (
              <span className="absolute -top-1 right-1 rounded-full bg-[#1C3C8C] px-1.5 py-0.5 text-[9px] font-semibold tracking-wide text-white">
                {sessionDiscounts[i]}
              </span>
            )}
          </button>
        ))}
      </div>

      <h3 className="mt-5 ds-h3 text-[#1C3C8C]" style={{ fontFamily: heading }}>
        {p.zone}
      </h3>
      <p className="mt-3 body-text text-[#6B7BA8]">{p.subtitle}</p>

      <p className="mt-6 text-[13px] font-medium leading-[18px] tracking-wide text-[#1C3C8C]">
        {summary}
      </p>

      <div className="mt-6 flex items-center justify-end gap-4 sm:gap-5">
        {hasDiscount && (
          <span
            className="text-[17px] sm:text-[19px] font-light leading-[1.2] text-[#6B7BA8] line-through"
            style={{ fontFamily: heading }}
          >
            {renderPrice(originalPrice)}
          </span>
        )}
        <div className="flex flex-col items-end">
          <span className="ds-price text-[#1C3C8C]" style={{ fontFamily: heading }}>
            {renderPrice(computedPrice)}
          </span>
          <span className="text-[13px] font-light text-[#6B7BA8]">
            {p.perLeech ? `за ${p.items[active]}` : `за ${sessionCounts[active]} ${sessionWord}`}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => openBooking(`Гирудотерапия · ${p.zone}`)}
        className="btn-primary mt-8 w-full"
      >
        Записаться
      </button>
    </article>
  );
}

function Prices() {
  return (
    <section id="programs" className="scroll-mt-[140px] bg-[#EFF6FF] ds-section">
      <div className="container-1900">
        <h2
          className="text-center ds-h2 text-[#1C3C8C]"
          style={{ fontFamily: heading }}
        >
          Форматы и&nbsp;стоимость
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-5 xl:grid-cols-2">
          {prices.map((p) => (
            <PriceCard key={p.zone} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}


function Faq() {
  return (
    <section className="bg-[#EFF6FF] ds-section">
      <div className="container-1900 grid grid-cols-1 gap-4 sm:gap-5 xl:grid-cols-2 xl:items-start">
        <div className="text-center xl:text-left">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 ds-label text-white"
            style={{ borderRadius: "4px", backgroundImage: "linear-gradient(to bottom, #A2CFFE, #88C1FF)" }}
          >
            FAQs
          </span>
          <h2
            className="mx-auto mt-6 max-w-[520px] text-[30px] font-light leading-[1.15] text-[#1C3C8C] sm:text-[38px] xl:mx-0 xl:text-[44px]"
            style={{ fontFamily: heading }}
          >
            Частые вопросы о&nbsp;гирудотерапии
          </h2>
        </div>

        <div className="divide-y divide-[#daebff] overflow-hidden ds-card">
          {faq.map((f) => (
            <div key={f.q} className="p-6 sm:p-7">
              <h3 className="body-text font-medium text-[#1C3C8C]">{f.q}</h3>
              <p className="mt-3 body-text text-[#6B7BA8]">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
