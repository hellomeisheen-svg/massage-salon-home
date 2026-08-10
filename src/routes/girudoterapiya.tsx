import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PromoBanner } from "@/components/PromoBanner";
import { BookingProvider, useBooking } from "@/components/BookingModal";
import { ServiceCard, serviceTypes } from "@/components/Services";

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
    price: "4 800 ₽",
    session: "1 сеанс — 2 часа",
    items: ["6 пиявок", "16 пиявок", "74 пиявки"],
  },
  {
    zone: "Косметические пиявки",
    subtitle: "Мягкий уход и забота о коже",
    price: "4 800 ₽",
    session: "1 сеанс — 2 часа",
    items: ["6 пиявок", "10 пиявок", "20 пиявок"],
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


function Benefits() {
  return (
    <section className="bg-[#EFF6FF] ds-section">
      <div className="container-1900">
        <div className="text-center sm:text-left">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 ds-label text-white"
            style={{ borderRadius: "4px", backgroundImage: "linear-gradient(to bottom, #A2CFFE, #88C1FF)" }}
          >
            Что даёт процедура
          </span>
          <h2
            className="mx-auto mt-6 max-w-[900px] text-[30px] font-light leading-[1.15] text-[#1C3C8C] sm:mx-0 sm:text-[38px] xl:text-[44px]"
            style={{ fontFamily: heading }}
          >
            Мягкий формат, в&nbsp;котором тело успевает расслабиться
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {benefits.map((b) => (
            <article key={b.title} className="ds-card p-6 sm:p-8">
              <h3
                className="ds-h3 text-[#1C3C8C]"
                style={{ fontFamily: heading }}
              >
                {b.title}
              </h3>
              <p className="mt-4 body-text text-[#6B7BA8]">{b.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Steps() {
  return (
    <section className="bg-[#EFF6FF] ds-section">
      <div className="container-1900 grid grid-cols-1 gap-4 sm:gap-5 xl:grid-cols-2 xl:items-start">
        <div className="text-center xl:text-left">
          <h2
            className="mx-auto max-w-[560px] text-[30px] font-light leading-[1.15] text-[#1C3C8C] sm:text-[38px] xl:mx-0 xl:text-[44px]"
            style={{ fontFamily: heading }}
          >
            Как проходит сеанс
          </h2>
          <p className="mx-auto mt-6 body-text max-w-[520px] text-[#6B7BA8] xl:mx-0">
            Всё по шагам и в понятном темпе&nbsp;— вы всегда знаете, что&nbsp;будет дальше.
          </p>
          <img
            src="/images/uslugi-girudoterapiya-litsa.jpg"
            alt="Подготовка к процедуре гирудотерапии"
            className="mt-8 hidden h-[380px] w-full rounded-[12px] border border-[#daebff] object-cover xl:block"
          />
        </div>

        <ol className="divide-y divide-[#daebff] overflow-hidden ds-card">
          {steps.map((s) => (
            <li key={s.n} className="flex gap-5 p-6 sm:p-8">
              <span
                className="text-[22px] font-light leading-none text-[#88C1FF] sm:text-[26px]"
                style={{ fontFamily: heading }}
              >
                {s.n}
              </span>
              <div>
                <h3
                  className="ds-h4 text-[#1C3C8C]"
                  style={{ fontFamily: heading }}
                >
                  {s.title}
                </h3>
                <p className="mt-3 body-text text-[#6B7BA8]">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Prices() {
  const { openBooking } = useBooking();
  return (
    <section className="bg-[#EFF6FF] ds-section">
      <div className="container-1900">
        <h2
          className="text-center ds-h2 text-[#1C3C8C]"
          style={{ fontFamily: heading }}
        >
          Форматы и&nbsp;стоимость
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-5 xl:grid-cols-2">
          {prices.map((p) => (
            <article
              key={p.zone}
              className="flex flex-col ds-card p-6 sm:p-8 xl:p-10"
            >
              <h3
                className="ds-h3 text-[#1C3C8C]"
                style={{ fontFamily: heading }}
              >
                {p.zone}
              </h3>
              <p className="mt-3 body-text text-[#6B7BA8]">{p.subtitle}</p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {p.items.map((i) => (
                  <li
                    key={i}
                    className="rounded-[8px] border border-[#daebff] bg-[#EFF6FF] px-3 py-2 text-[14px] text-[#1C3C8C]"
                  >
                    {i}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-end justify-between gap-4 border-t border-[#daebff] pt-6">
                <div>
                  <p className="text-[14px] text-[#6B7BA8]">{p.session}</p>
                  <p
                    className="mt-2 ds-price text-[#1C3C8C]"
                    style={{ fontFamily: heading }}
                  >
                    от {p.price}
                  </p>
                </div>
              </div>

              <button type="button" onClick={() => openBooking()} className="btn-primary mt-8 w-full">
                Записаться
              </button>
            </article>
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
