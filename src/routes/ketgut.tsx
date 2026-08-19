import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { servicePageNav, servicePageFooterNav } from "@/components/ServicePage";
import { Footer } from "@/components/Footer";
import { PromoBanner } from "@/components/PromoBanner";
import { Programs } from "@/components/Programs";
import { Education } from "@/components/Education";
import { OtherServices } from "@/components/OtherServices";
import { BookingProvider } from "@/components/BookingModal";
import { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";
import { formatPrice, pluralize, renderPrice } from "@/components/Services";

export const Route = createFileRoute("/ketgut")({
  head: () => ({
    meta: [
      { title: "Акупунктурный кетгут во Владивостоке — Седьмое небо" },
      {
        name: "description",
        content:
          "Акупунктурный кетгут в кабинете Седьмое небо: постановка 30 саморассасывающихся нитей в акупунктурные точки. Метод пролонгированного действия, деликатная поддержка тела. Стоимость 20 000 ₽, запись онлайн.",
      },
      { property: "og:title", content: "Акупунктурный кетгут — Седьмое небо" },
      {
        property: "og:description",
        content:
          "Постановка 30 саморассасывающихся нитей в акупунктурные точки в кабинете Седьмое небо для мягкой, длительной поддержки тела.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://7heavenmassage.ru/ketgut" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        property: "og:image",
        content: "https://7heavenmassage.ru/images/uslugi-ketgut.webp",
      },
      {
        name: "twitter:image",
        content: "https://7heavenmassage.ru/images/uslugi-ketgut.webp",
      },
    ],
    links: [{ rel: "canonical", href: "https://7heavenmassage.ru/ketgut" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "MedicalBusiness",
              "@id": "https://7heavenmassage.ru/#business",
              name: "Седьмое небо",
              description:
                "Кабинет массажа и гирудотерапии Татьяны Злобиной в посёлке Трудовое между Владивостоком и Артёмом.",
              url: "https://7heavenmassage.ru/",
              image: "https://7heavenmassage.ru/images/uslugi-ketgut.webp",
              medicalSpecialty: "https://schema.org/PhysicalTherapy",
              telephone: "+7 924 232 46 11",
              address: {
                "@type": "PostalAddress",
                streetAddress: "ул. Лермонтова, 46",
                addressLocality: "посёлок Трудовое",
                addressRegion: "Приморский край",
                addressCountry: "RU",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 43.3125,
                longitude: 132.0119,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ],
                  opens: "09:00",
                  closes: "22:00",
                },
              ],
              areaServed: [
                { "@type": "Place", name: "Трудовое" },
                { "@type": "Place", name: "Владивосток" },
                { "@type": "Place", name: "Артём" },
              ],
              priceRange: "20000 ₽",
            },
            {
              "@type": "Service",
              name: "Акупунктурный кетгут",
              serviceType: "Акупунктурное имплантирование рассасывающейся нити",
              url: "https://7heavenmassage.ru/ketgut",
              provider: { "@id": "https://7heavenmassage.ru/#business" },
              areaServed: [
                { "@type": "Place", name: "Трудовое" },
                { "@type": "Place", name: "Владивосток" },
                { "@type": "Place", name: "Артём" },
              ],
              offers: [
                {
                  "@type": "Offer",
                  name: "Акупунктурный кетгут, сеанс",
                  price: "20000",
                  priceCurrency: "RUB",
                  url: "https://7heavenmassage.ru/ketgut#prices",
                },
              ],
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Главная",
                  item: "https://7heavenmassage.ru/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Акупунктурный кетгут",
                  item: "https://7heavenmassage.ru/ketgut",
                },
              ],
            },
            {
              "@type": "FAQPage",
              "@id": "https://7heavenmassage.ru/ketgut#faq",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Как часто нужно делать?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Обычно одна постановка работает в течение нескольких месяцев. Точная периодичность зависит от вашего запроса и состояния и обсуждается на консультации.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Это больно?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Используется местное обезболивание, поэтому ощущения остаются комфортными. О любом дискомфорте можно сказать в любой момент сеанса.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Сколько длится процедура?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Около полутора часов вместе с подготовкой кожи и беседой о вашем состоянии.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Когда виден результат?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Первые изменения заметны в течение нескольких недель, по мере того как уходит реакция тканей на процедуру.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Нужен ли особый уход после?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "В первые дни стоит избегать бани, сауны, активного спорта и массажа в зоне работы. Подробные рекомендации даю после сеанса.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Где находится кабинет и как записаться?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Кабинет находится в посёлке Трудовое — между Владивостоком и Артёмом. Записаться можно через Max.",
                  },
                },
              ],
            },
          ],
        }),
      },
    ],
  }),
  component: KetgutPage,
});

const faq = [
  {
    q: "Как часто нужно делать?",
    a: "Обычно одна постановка работает в\u00A0течение нескольких месяцев. Точная периодичность зависит от\u00A0вашего запроса и\u00A0состояния и\u00A0обсуждается на\u00A0консультации.",
  },
  {
    q: "Это больно?",
    a: "Используется местное обезболивание, поэтому ощущения остаются комфортными. О\u00A0любом дискомфорте можно сказать в\u00A0любой момент сеанса.",
  },
  {
    q: "Сколько длится процедура?",
    a: "Около полутора часов вместе с\u00A0подготовкой кожи и\u00A0беседой о\u00A0вашем состоянии.",
  },
  {
    q: "Когда виден результат?",
    a: "Первые изменения заметны в\u00A0течение нескольких недель, по\u00A0мере того как уходит реакция тканей на\u00A0процедуру.",
  },
  {
    q: "Нужен ли особый уход после?",
    a: "В\u00A0первые дни стоит избегать бани, сауны, активного спорта и\u00A0массажа в\u00A0зоне работы. Подробные рекомендации даю после\u00A0сеанса.",
  },
  {
    q: "Где находится кабинет и\u00A0как записаться?",
    a: "Кабинет находится в\u00A0посёлке Трудовое\u00A0— между\u00A0Владивостоком и\u00A0Артёмом. Записаться можно через\u00A0Max.",
  },
];

const tabs = [
  {
    id: "about",
    label: "Об услуге",
    content: (
      <div className="space-y-6">
        <div>
          <h4 className="font-noto-serif-narrow text-[20px] text-[#1C3C8C] mb-3">Что такое акупунктурный кетгут</h4>
          <p className="body-text text-[#566A93]">
            Акупунктурный кетгут, или акупунктурное имплантирование рассасывающейся нити, — инвазивная процедура, при которой небольшой фрагмент рассасывающегося медицинского материала устанавливается в выбранную биологически активную точку или прилегающие ткани.
          </p>
          <p className="body-text text-[#566A93] mt-4">
            Материал остаётся в тканях на определённое время и постепенно рассасывается. Продолжительность его нахождения зависит от состава, характеристик изделия, зоны постановки и индивидуальной реакции организма.
          </p>
          <p className="body-text text-[#566A93] mt-4 italic">
            Процедура не гарантирует снижения веса, «ускорения обмена веществ», очищения организма, омоложения или лечения конкретного заболевания. Возможный эффект и целесообразность метода зависят от цели обращения, состояния здоровья и применяемого протокола.
          </p>
          <p className="body-text text-[#566A93] mt-4">
            Акупунктурный кетгут не заменяет обследование, лекарственную терапию, хируррическое лечение и назначения лечащего врача. При хронических и острых заболеваниях возможность процедуры согласовывают с профильным специалистом.
          </p>
        </div>
        <div>
          <h4 className="font-noto-serif-narrow text-[20px] text-[#1C3C8C] mb-3">Какие материалы используются</h4>
          <p className="body-text text-[#566A93]">
            В работе применяется стерильный рассасывающийся медицинский материал, предназначенный для выбранной методики.
          </p>
          <p className="body-text text-[#566A93] mt-4">
            Для постановки используются стерильные одноразовые иглы или канюли и одноразовые расходные материалы. После процедуры инструменты и острые предметы не применяются повторно и утилизируются в соответствии с установленными правилами.
          </p>
        </div>
        <div>
          <h4 className="font-noto-serif-narrow text-[20px] text-[#1C3C8C] mb-3">Эстетическое применение</h4>
          <p className="body-text text-[#566A93]">
            Акупунктурный кетгут не гарантирует омоложение, лифтинг, устранение отёков, изменение контуров тела или другой конкретный косметический результат.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "indications",
    label: "Когда рассматривают",
    content: (
      <div className="space-y-6">
        <div>
          <h4 className="font-noto-serif-narrow text-[20px] text-[#1C3C8C] mb-3">Когда процедуру можно рассматривать</h4>
          <p className="body-text text-[#566A93]">
            Акупунктурное имплантирование может обсуждаться как дополнительный метод при отдельных запросах, связанных с локальным мышечным напряжением, дискомфортом или необходимостью длительной стимуляции выбранных зон.
          </p>
          <ul className="mt-4 space-y-2">
            {[
              "локальное мышечное напряжение",
              "дискомфорт в отдельных зонах",
              "некоторые болевые синдромы — после определения причины боли",
              "восстановление после физической нагрузки",
              "отдельные эстетические запросы",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[#A2CFFE]" />
                <span className="body-text text-[#566A93]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "contra",
    label: "Противопоказания",
    content: (
      <div className="space-y-6">
        <div>
          <h4 className="font-noto-serif-narrow text-[20px] text-[#1C3C8C] mb-3">Противопоказания</h4>
          <p className="body-text text-[#566A93]">
            Процедура не проводится или требует обязательного согласования с врачом при:
          </p>
          <ul className="mt-4 space-y-2">
            {[
              "нарушениях свёртываемости крови и продолжающихся кровотечениях",
              "приёме антикоагулянтов и антиагрегантов",
              "аллергии на компоненты материала или анестетика",
              "беременности и периоде грудного вскармливания",
              "острых инфекционных и лихорадочных заболеваниях",
              "воспалении или повреждении кожи в зоне постановки",
              "декомпенсированном сахарном диабете",
              "активных онкологических заболеваниях",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-300" />
                <span className="body-text text-[#566A93]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "process",
    label: "Как проходит",
    content: (
      <div className="space-y-6">
        <div>
          <h4 className="font-noto-serif-narrow text-[20px] text-[#1C3C8C] mb-3">Как проходит сеанс</h4>
          <p className="body-text text-[#566A93]">
            Специалист проводит беседу, уточняет жалобы и состояние здоровья. После этого определяется возможность процедуры и зоны постановки.
          </p>
          <p className="body-text text-[#566A93] mt-4">
            Затем подготавливается кожа, вскрываются стерильные упаковки, может применяться местное обезболивание. Материал устанавливается в выбранную зону, накладывается повязка.
          </p>
          <p className="body-text text-[#566A93] mt-4">
            Продолжительность сеанса зависит от количества зон, точное время сообщается перед процедурой.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "preparation",
    label: "Подготовка и уход",
    content: (
      <div className="space-y-6">
        <div>
          <h4 className="font-noto-serif-narrow text-[20px] text-[#1C3C8C] mb-3">Как подготовиться</h4>
          <ul className="mt-4 space-y-2">
            {[
              "примите душ без парфюмированных средств",
              "не наносите кремы на зоны постановки",
              "не употребляйте алкоголь",
              "не приходите натощак",
              "сообщите обо всех заболеваниях и препаратах",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[#A2CFFE]" />
                <span className="body-text text-[#566A93]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-noto-serif-narrow text-[20px] text-[#1C3C8C] mb-3">Что делать после процедуры</h4>
          <p className="body-text text-[#566A93]">
            В первые 24–48 часов не трите место постановки, не посещайте сауну, баню, бассейн. Избегайте интенсивных нагрузок. Наблюдайте за состоянием кожи.
          </p>
        </div>
      </div>
    ),
  },
];

function KetgutPage() {
  return (
    <BookingProvider>
      <div className="relative min-h-screen bg-[#EFF6FF] pt-20 xl:pt-[100px]">
        <Header items={servicePageNav} />
        <PageHero />
        <KetgutServices />
        <Prices />
        <PromoBanner />
        <Programs prioritizeKeys={["ketgut"]} />
        <Education />
        <Faq />
        <OtherServices exclude="ketgut" />
        <Footer items={servicePageFooterNav} />
      </div>
    </BookingProvider>
  );
}

function SpecialistBlock() {
  return (
    <div className="flex flex-col items-start gap-3 sm:gap-4">
      <img
        className="h-[90px] w-[70px] xl:h-[110px] xl:w-[85px] rounded-[12px] border border-[#daebff] ds-bento-shadow object-cover"
        alt="Татьяна Злобина"
        src="/images/tatyana-photo.webp"
      />
      <div className="flex flex-col gap-1">
        <h3 className="font-noto-serif-narrow mt-6 ds-h4 text-[#1C3C8C] sm:text-[28px] xl:text-[28px]">
          Татьяна&nbsp;Злобина
        </h3>
        <p className="mt-3 body-text text-[#566A93]">
          Мастер кабинета, специалист<br />по{"\u00A0"}оздоровительным практикам
        </p>
      </div>
    </div>
  );
}

function PageHero() {
  return (
    <main className="bg-[#EFF6FF] py-4 sm:py-5">
      <section id="hero" className="container-1900 grid grid-cols-1 gap-4 sm:gap-5 xl:min-h-[calc(100vh-160px)] xl:grid-cols-2">
        <div className="ds-bento-shadow flex flex-col ds-card min-h-[720px] sm:h-[600px] xl:min-h-0 xl:h-auto p-5 sm:p-6 xl:p-10 overflow-hidden">
          <nav aria-label="Хлебные крошки" className="text-[14px] text-[#566A93]">
            <Link to="/" className="hover:opacity-70 transition-opacity">
              Главная
            </Link>
            <span className="px-2">/</span>
            <span className="text-[#1C3C8C]">Акупунктурный кетгут</span>
          </nav>

          <div className="mt-6 sm:mt-8">
            <SpecialistBlock />
          </div>

          <div className="mt-auto xl:mt-auto pt-6 sm:pt-12">
            <div className="flex flex-col tablet-text-block xl:max-w-[640px]">
              <div className="flex flex-col gap-y-2">
                <div className="flex sm:hidden">
                  <span className="inline-flex items-center rounded-[12px] bg-[#A2CFFE] px-2 py-0.5 text-[14px] font-medium lowercase tracking-tight text-white">
                    хит
                  </span>
                </div>
                <div className="flex items-center gap-x-3 gap-y-2 flex-wrap">
                  <h1 className="font-noto-serif-narrow text-[30px] font-light leading-[1.12] text-[#1C3C8C] sm:text-[58px] sm:leading-[1.15]">
                    Акупунктурный кетгут
                  </h1>
                  <span className="hidden sm:inline-flex items-center rounded-[12px] bg-[#A2CFFE] px-2 py-0.5 text-[14px] font-medium lowercase tracking-tight text-white">
                    хит
                  </span>
                </div>
                <p className="mt-4 body-text text-[#566A93] sm:mt-6 sm:text-[20px]">
                  <span className="hidden sm:inline">
                    Постановка 30 саморассасывающихся нитей в&nbsp;акупунктурные точки&nbsp;— мягкий метод пролонгированного действия. Кабинет в&nbsp;посёлке Трудовое, рядом с&nbsp;Владивостоком и&nbsp;Артёмом.
                  </span>
                  <span className="sm:hidden">
                    Постановка нитей в&nbsp;акупунктурные точки. Кабинет в&nbsp;посёлке Трудовое, рядом с&nbsp;Владивостоком и&nbsp;Артёмом.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-[480px] sm:h-[600px] xl:h-auto overflow-hidden rounded-[24px]">
          <img
            src="/images/uslugi-ketgut.webp"
            alt="Процедура акупунктурного кетгута"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </section>
    </main>
  );
}

function KetgutServices() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <section id="services" className="container-1900 py-[60px] sm:py-[70px] xl:py-[140px]">
      <div className="grid grid-cols-1 gap-10 xl:grid-cols-[1fr,2fr] xl:gap-20">
        <div>
          <h2 className="font-noto-serif-narrow ds-h2 text-[#1C3C8C]">Об услуге</h2>
          <div className="mt-8 flex flex-wrap gap-2 xl:flex-col">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-[12px] px-4 py-2 text-left text-[14px] transition-all sm:text-[16px] ${
                  activeTab === tab.id ? "bg-white text-[#1C3C8C] shadow-sm" : "text-[#566A93] hover:text-[#1C3C8C]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="ds-card p-6 sm:p-8 xl:p-12">
          {tabs.find((t) => t.id === activeTab)?.content}
        </div>
      </div>
    </section>
  );
}

function Prices() {
  return (
    <section id="prices" className="container-1900 py-[60px] sm:py-[70px] xl:py-[140px]">
      <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:gap-20">
        <div className="xl:w-1/3">
          <h2 className="font-noto-serif-narrow ds-h2 text-[#1C3C8C]">Стоимость</h2>
          <p className="mt-4 body-text text-[#566A93]">
            В стоимость включены все расходные материалы и 30 стерильных нитей.
          </p>
        </div>
        <div className="ds-card flex-1 overflow-hidden">
          <div className="divide-y divide-[#daebff]">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-noto-serif-narrow text-[24px] text-[#1C3C8C]">Акупунктурный кетгут</h3>
                  <p className="text-[14px] text-[#566A93]">30 нитей, все тело</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-[20px] font-medium text-[#1C3C8C]">20 000 ₽</div>
                    <div className="text-[12px] text-[#566A93]">1 час 30 минут</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" className="container-1900 py-[60px] sm:py-[70px] xl:py-[140px]">
      <h2 className="font-noto-serif-narrow ds-h2 mb-10 text-center text-[#1C3C8C]">Частые вопросы</h2>
      <div className="mx-auto max-w-[800px] space-y-4">
        {faq.map((item, i) => (
          <details key={i} className="group ds-card overflow-hidden">
            <summary className="flex cursor-pointer items-center justify-between p-6 text-[#1C3C8C] hover:bg-white/50">
              <span className="font-medium sm:text-[18px]">{item.q}</span>
              <Plus className="h-5 w-5 shrink-0 transition-transform group-open:rotate-45" />
            </summary>
            <div className="p-6 pt-0 body-text text-[#566A93] border-t border-[#daebff]/30">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
