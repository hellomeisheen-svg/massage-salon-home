import { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { servicePageNav, servicePageFooterNav } from "@/components/ServicePage";
import { Footer } from "@/components/Footer";
import { PromoBanner } from "@/components/PromoBanner";
import { Programs } from "@/components/Programs";
import { Education } from "@/components/Education";
import { OtherServices } from "@/components/OtherServices";
// PriceTable removed as it was replaced by local Prices design
import { BookingProvider, useBooking } from "@/components/BookingModal";
import { formatPrice, pluralize, renderPrice } from "@/components/Services";




export const Route = createFileRoute("/girudoterapiya")({
  head: () => ({
    meta: [
      { title: "Гирудотерапия во Владивостоке — Седьмое небо" },
      {
        name: "description",
        content:
          "Гирудотерапия в кабинете Седьмое небо в спокойном ритме: медицинские и косметические пиявки, стерильные материалы, бережная постановка. Стоимость от 4 800 ₽, запись онлайн.",
      },
      { property: "og:title", content: "Гирудотерапия — Седьмое небо" },
      {
        property: "og:description",
        content:
          "Медицинские и косметические пиявки в кабинете Седьмое небо: мягкая процедура, стерильные материалы, внимательное сопровождение до и после сеанса.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://7heavenmassage.ru/girudoterapiya" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://7heavenmassage.ru/girudoterapiya" }],
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
  { n: "03", title: "Как проходит сеанс", text: "Бережная постановка пиявок, комфортное положение тела, тишина и покой." },
  { n: "04", title: "После сеанса", text: "Накладываю стерильную повязку и подробно рассказываю, как ухаживать за зонами." },
];

type HirudoRow = {
  zone: string;
  subtitle: string;
  duration: string;
  base: number;
  perLeech: boolean;
  leechCounts: number[];
};

const hirudoRows: HirudoRow[] = [
  {
    zone: "Медицинские пиявки",
    subtitle: "Оздоровительная практика",
    duration: "2\u00A0часа",
    base: 4800,
    perLeech: false,
    leechCounts: [6, 16, 74],
  },
  {
    zone: "Косметические пиявки",
    subtitle: "Мягкий уход и\u00A0забота о\u00A0коже",
    duration: "2\u00A0часа",
    base: 600,
    perLeech: true,
    leechCounts: [6, 10, 20],
  },
];


const faq = [
  {
    q: "Пиявки используются повторно?",
    a: "Нет. Для каждого пациента используются только медицинские пиявки однократного применения, выращенные в специализированных условиях. После процедуры они не применяются повторно.",
  },
  {
    q: "Это больно?",
    a: "В момент постановки возможны кратковременные необычные ощущения, которые каждый человек воспринимает индивидуально. Во время процедуры специалист находится рядом, контролирует процесс и помогает сохранить комфортный темп.",
  },
  {
    q: "Сколько длится сеанс?",
    a: "Продолжительность зависит от индивидуальной схемы, количества пиявок и зоны постановки. Точное время специалист сможет сориентировать после консультации.",
  },
  {
    q: "Сколько процедур понадобится?",
    a: "Единой схемы для всех нет. Количество сеансов и интервалы между ними определяются индивидуально — с учётом запроса, самочувствия и реакции организма на процедуру.",
  },
  {
    q: "Как подготовиться к процедуре?",
    a: "Перед визитом важно сообщить специалисту о хронических заболеваниях, беременности, аллергии и всех принимаемых препаратах, особенно тех, которые влияют на свёртываемость крови. В день процедуры не используйте на предполагаемой зоне постановки средства с выраженным запахом — парфюм, кремы или масла.",
  },
  {
    q: "Остаются ли следы?",
    a: "На месте постановки может сохраняться небольшая временная отметка. Специалист даст рекомендации по уходу за кожей после сеанса и расскажет, что считается нормальной реакцией, а в каких случаях нужно связаться с врачом.",
  },
];


function GirudoterapiyaPage() {
  return (
    <BookingProvider>
      <div className="relative min-h-screen bg-[#EFF6FF] pt-20 xl:pt-[100px]">
        <Header items={servicePageNav} />
        <PageHero />
        <GirudoterapiyaServices />
        <Prices />
        <PromoBanner />
        <Programs prioritizeKeys={["hirudoMed", "hirudoCosm"]} />
        <PromoBanner
          title={
            <>
              <span className="xl:hidden">До&nbsp;1&nbsp;сентября покупайте программы по&nbsp;прежней цене</span>
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
        <Faq />
        <OtherServices exclude="girudoterapiya" />
        <Footer items={servicePageFooterNav} />
      </div>
    </BookingProvider>
  );
}

function SpecialistBlock() {
  return (
    <div className="hero-specialist-block flex flex-col items-start gap-3 sm:gap-4">
      <img
        className="h-[90px] w-[70px] rounded-[12px] border border-[#daebff] ds-bento-shadow object-cover xl:h-[110px] xl:w-[85px]"
        alt="Татьяна Злобина"
        src="/images/tatyana-photo.webp"
      />
      <div className="flex flex-col gap-1">
        <h2 className="font-noto-serif-narrow text-[22px] font-light leading-[1.2] text-[#1c3c8c] sm:text-[24px] xl:text-[28px]">
          Татьяна&nbsp;Злобина
        </h2>
        <p className="text-[16px] font-light leading-[26px] text-[#566A93]">
          Мастер кабинета, специалист
          <br />
          по{"\u00A0"}оздоровительным практикам
        </p>
      </div>
    </div>
  );
}

function PageHero() {
  return (
    <main className="bg-[#EFF6FF] py-4 sm:py-5">
      <section id="hero" className="container-1900 grid grid-cols-1 gap-4 sm:gap-5 xl:min-h-[calc(100vh-160px)] xl:grid-cols-2">
        <div className="hero-card flex min-h-0 flex-col ds-card ds-bento-shadow p-5 sm:p-6 xl:p-10 border border-[#DAEBFF]">
          <nav aria-label="Хлебные крошки" className="text-[14px] text-[#566A93]">
            <Link to="/" className="hover:opacity-70 transition-opacity">
              Главная
            </Link>
            <span className="px-2">/</span>
            <span className="text-[#1C3C8C]">Гирудотерапия</span>
          </nav>

          <div className="mt-6 sm:mt-8">
            <SpecialistBlock />
          </div>

          <div className="hero-card__actions mt-auto pt-10">
            <div className="flex flex-col tablet-text-block xl:max-w-[640px]">
              <div className="flex flex-col gap-y-2">
                <div className={`service-badge-slot ${!true ? 'is-empty' : ''}`}>
                  <span className="inline-flex items-center rounded-[12px] bg-[#A2CFFE] px-2 py-0.5 text-[14px] font-medium lowercase tracking-tight text-white">
                    хит
                  </span>
                </div>
                <div className="flex items-center gap-x-3 gap-y-2 flex-wrap">
                  <h1 className="font-noto-serif-narrow text-[30px] font-light leading-[1.12] text-[#1C3C8C] sm:text-[58px] sm:leading-[1.15]">
                    Гирудотерапия
                  </h1>
                </div>
              </div>
              <p className="mt-4 text-[16px] font-light leading-[26px] text-[#566A93]">
                Оздоровительная практика с использованием медицинских пиявок — для поддержки самочувствия, ощущения лёгкости и более внимательного контакта с телом.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
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

        <div className="ds-bento-shadow relative h-[420px] overflow-hidden rounded-[12px] border border-[#daebff] sm:h-[520px] xl:h-auto xl:min-h-0">
          <img
            className="absolute inset-0 h-full w-full object-cover object-top sm:object-center"
            alt="Гирудотерапия в кабинете Татьяны Злобиной"
            src="/images/uslugi-girudoterapiya-litsa.webp"
            loading="eager"
            fetchPriority="high"
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
    label: "Как проходит сеанс",
    content: (
      <>
        <p>Работа строится поэтапно: знакомство и беседа о самочувствии, выбор зон и подготовка кожи, бережная постановка пиявок в спокойном ритме и рекомендации по уходу после сеанса.</p>
        <p>Для каждого пациента используются только стерильные медицинские материалы и одноразовые пиявки, упаковка которых вскрывается при вас.</p>
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
            <span className="xl:hidden">Обсуждаем состояние перед каждым визитом и&nbsp;подбираем технику</span>
            <span className="hidden xl:inline">Перед процедурой обсуждаем ваше состояние&nbsp;— и&nbsp;решаем, подходит ли&nbsp;формат</span>
          </h2>

          <div className="mt-8 hidden xl:block w-full max-w-[520px] text-left">{nav}</div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="ds-bento-shadow ds-card p-6 sm:p-8 xl:p-10">
            <div className="flex flex-col gap-10 sm:gap-12">
              {girudoSections.map((s, i) => (
                <div
                  key={s.label}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  className="scroll-mt-[140px]"
                >
                  <h3 className="font-noto-serif-narrow text-[26px] sm:text-[32px] font-light leading-[1.15] text-[#1C3C8C]">
                    {s.label}
                  </h3>
                  <div className="mt-5 text-[#566A93] space-y-4 text-[15px] leading-[1.6]">
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

function HirudoPriceTable() {
  const { openBooking } = useBooking();
  return (
    <div className="ds-bento-shadow ds-card overflow-hidden bg-white border border-[#daebff]">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#EFF6FF]/50 border-b border-[#daebff]">
              <th className="px-6 py-4 text-[13px] font-medium tracking-wide text-[#1C3C8C] xl:px-8">
                Услуга
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
              <th className="px-6 py-4 text-[13px] font-medium tracking-wide text-[#1C3C8C] xl:px-8">
                {/* Кнопка записи */}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#daebff]">
            {hirudoRows.map((p) => {
              const prices = sessionCounts.map((count, i) => {
                const leeches = p.leechCounts[i];
                const totalBase = p.perLeech ? leeches * p.base : p.base * count;
                const currentPrice = Math.round(totalBase * (1 - discountValues[i]));
                return { totalBase, currentPrice, leeches };
              });

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
                  {prices.map((price, i) => (
                    <td key={i} className="px-6 py-6 xl:px-8">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          {discountValues[i] > 0 && (
                            <span className="font-noto-serif-narrow text-[14px] font-light text-[#566A93]/40 line-through">
                              {renderPrice(formatPrice(price.totalBase))}
                            </span>
                          )}
                          <span className="font-noto-serif-narrow text-[20px] xl:text-[24px] font-light text-[#1C3C8C]">
                            {renderPrice(formatPrice(price.currentPrice))}
                          </span>
                        </div>
                        <div className="text-[12px] font-light text-[#566A93]">
                          {price.leeches} {pluralize(price.leeches, ["пиявка", "пиявки", "пиявок"])}
                        </div>
                      </div>
                    </td>
                  ))}
                    <td className="px-6 py-6 xl:px-8">
                      <button
                        type="button"
                        onClick={() => openBooking(p.zone)}
                        className="btn-primary px-5 py-2 text-[14px]"
                      >
                        Записаться
                      </button>
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

function PriceCard({ p }: { p: HirudoRow }) {
  const { openBooking } = useBooking();
  const [active, setActive] = useState(0);

  const count = sessionCounts[active];
  const discount = discountValues[active];
  
  // Specific data for leech therapy
  const leeches = p.leechCounts[active];
  const totalBase = p.perLeech ? leeches * p.base : p.base * count;
  const currentPrice = Math.round(totalBase * (1 - discount));
  
  const sessionWord = pluralize(count, ["сеанс", "сеанса", "сеансов"]);
  const summary = `${count} ${sessionWord} · ${p.duration}`;

  return (
    <article className="flex flex-col ds-card ds-bento-shadow p-6 sm:p-8 xl:p-10">
      <div className="flex items-stretch gap-1 rounded-[12px] bg-[#EFF6FF] p-1">
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

      <div className="mt-6 flex flex-col gap-1">
        <p className="text-[13px] font-medium leading-[18px] tracking-wide text-[#1C3C8C]">
          {summary}
        </p>
        <p className="text-[12px] font-light text-[#566A93]">
          {leeches} {pluralize(leeches, ["пиявка", "пиявки", "пиявок"])}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-end gap-4 sm:gap-5">
        {discount > 0 && (
          <span className="font-noto-serif-narrow text-[17px] sm:text-[19px] font-light leading-[1.2] text-[#566A93] line-through">
            {renderPrice(formatPrice(totalBase))}
          </span>
        )}
        <div className="flex flex-col items-end">
          <span className="font-noto-serif-narrow ds-price text-[#1C3C8C]">
            {renderPrice(formatPrice(currentPrice))}
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
          Записаться
        </button>
      </div>
    </article>
  );
}

function Prices() {
  return (
    <section id="prices" className="scroll-mt-[140px] bg-[#EFF6FF] ds-section">
      <div className="container-1900">
        <h2 className="font-noto-serif-narrow text-center ds-h2 text-[#1C3C8C]">
          Форматы и&nbsp;стоимость
        </h2>

        {/* Desktop View */}
        <div className="hidden lg:block mt-10">
          <HirudoPriceTable />
        </div>

        {/* Mobile View */}
        <div className="lg:hidden mt-8 grid grid-cols-1 gap-4 sm:gap-5">
          {hirudoRows.map((p) => (
            <PriceCard key={p.zone} p={p} />
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
        <span className="font-noto-serif-narrow text-[#1C3C8C] ds-h4 text-[18px] sm:text-[28px]">
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

function Faq() {
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

          <div className="mt-8 xl:mt-auto ds-card ds-bento-shadow p-6 sm:p-7 w-full xl:w-1/2 mx-auto xl:mx-0 text-left">
            <img
              src="/images/tatyana-photo.webp"
              alt="Татьяна Злобина"
              className="h-[90px] w-[70px] xl:h-[110px] xl:w-[85px] rounded-[12px] border border-[#daebff] ds-bento-shadow object-cover"
            />
            <h3 className="font-noto-serif-narrow mt-6 ds-h4 text-[#1C3C8C]">
              Татьяна Злобина
            </h3>
            <p className="mt-3 body-text text-[#566A93]">
              Мастер кабинета, специалист по&nbsp;оздоровительным практикам
            </p>
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
          {faq.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

