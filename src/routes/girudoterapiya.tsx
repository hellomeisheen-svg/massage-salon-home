import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PromoBanner } from "@/components/PromoBanner";
import { BookingProvider, useBooking } from "@/components/BookingModal";

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
        <Benefits />
        <Steps />
        <Prices />
        <PromoBanner />
        <Faq />
        <Footer />
      </div>
    </BookingProvider>
  );
}

function PageHero() {
  const { openBooking } = useBooking();
  return (
    <section className="container-1900 grid grid-cols-1 gap-4 sm:gap-5 xl:grid-cols-2 xl:items-stretch">
      <div className="flex flex-col rounded-[12px] border border-[#daebff] bg-white px-6 py-10 sm:px-8 sm:py-12 xl:px-[60px] xl:py-[70px]">
        <nav aria-label="Хлебные крошки" className="text-[14px] text-[#8D9DC5]">
          <Link to="/" className="hover:opacity-70 transition-opacity">
            Главная
          </Link>
          <span className="px-2">/</span>
          <span className="text-[#1C3C8C]">Гирудотерапия</span>
        </nav>

        <span
          className="mt-8 inline-flex w-fit items-center gap-2 px-4 py-1.5 text-[13px] font-medium tracking-wide text-white"
          style={{ borderRadius: "4px", backgroundImage: "linear-gradient(to bottom, #A2CFFE, #88C1FF)" }}
        >
          Услуга
        </span>

        <h1
          className="mt-6 text-[30px] font-light leading-[1.15] text-[#1C3C8C] sm:text-[38px] xl:text-[54px]"
          style={{ fontFamily: heading }}
        >
          Гирудотерапия&nbsp;— спокойная работа с&nbsp;
          <span className="bg-gradient-to-r from-[#4A7FD6] to-[#88C1FF] bg-clip-text text-transparent">
            самочувствием
          </span>
        </h1>

        <p className="mt-6 body-text max-w-[560px] text-[#8D9DC5]">
          Медицинские и&nbsp;косметические пиявки в&nbsp;тихом кабинете: без спешки, с&nbsp;понятным
          объяснением каждого шага и&nbsp;вниманием к&nbsp;вашему состоянию до&nbsp;и&nbsp;после сеанса.
        </p>

        <ul className="mt-8 flex flex-wrap gap-2">
          {badges.map((b) => (
            <li
              key={b}
              className="rounded-[8px] border border-[#daebff] bg-[#EFF6FF] px-3 py-2 text-[14px] text-[#1C3C8C]"
            >
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={() => openBooking()} className="btn-primary sm:w-[250px]">
            Записаться
          </button>
          <a
            href="https://max.ru/u/f9LHodD0cOLS1ZC9ThcQkVLRVzcK-MbYZ7JVAg8PC5Tx9LyihgOVdPnzaxM"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center justify-center sm:w-[250px]"
          >
            Получить консультацию
          </a>
        </div>
      </div>

      <div className="overflow-hidden rounded-[12px] border border-[#daebff] bg-white">
        <img
          src="/images/uslugi-girudoterapiya.jpg"
          alt="Гирудотерапия в кабинете Татьяны Злобиной"
          className="h-[320px] w-full object-cover sm:h-[460px] xl:h-full"
        />
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="bg-[#EFF6FF] py-[60px] sm:py-[70px] xl:pt-[140px] xl:pb-0">
      <div className="container-1900">
        <div className="text-center sm:text-left">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 text-[13px] font-medium tracking-wide text-white"
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
            <article key={b.title} className="rounded-[12px] border border-[#daebff] bg-white p-6 sm:p-8">
              <h3
                className="text-[24px] font-light leading-[1.15] text-[#1C3C8C] sm:text-[28px]"
                style={{ fontFamily: heading }}
              >
                {b.title}
              </h3>
              <p className="mt-4 body-text text-[#8D9DC5]">{b.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Steps() {
  return (
    <section className="bg-[#EFF6FF] py-[60px] sm:py-[70px] xl:pt-[140px] xl:pb-0">
      <div className="container-1900 grid grid-cols-1 gap-4 sm:gap-5 xl:grid-cols-2 xl:items-start">
        <div className="text-center xl:text-left">
          <h2
            className="mx-auto max-w-[560px] text-[30px] font-light leading-[1.15] text-[#1C3C8C] sm:text-[38px] xl:mx-0 xl:text-[44px]"
            style={{ fontFamily: heading }}
          >
            Как проходит сеанс
          </h2>
          <p className="mx-auto mt-6 body-text max-w-[520px] text-[#8D9DC5] xl:mx-0">
            Всё по шагам и в понятном темпе&nbsp;— вы всегда знаете, что&nbsp;будет дальше.
          </p>
          <img
            src="/images/uslugi-girudoterapiya-litsa.jpg"
            alt="Подготовка к процедуре гирудотерапии"
            className="mt-8 hidden h-[380px] w-full rounded-[12px] border border-[#daebff] object-cover xl:block"
          />
        </div>

        <ol className="divide-y divide-[#daebff] overflow-hidden rounded-[12px] border border-[#daebff] bg-white">
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
                  className="text-[22px] font-light leading-[1.15] text-[#1C3C8C] sm:text-[26px]"
                  style={{ fontFamily: heading }}
                >
                  {s.title}
                </h3>
                <p className="mt-3 body-text text-[#8D9DC5]">{s.text}</p>
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
    <section className="bg-[#EFF6FF] py-[60px] sm:py-[70px] xl:pt-[140px] xl:pb-0">
      <div className="container-1900">
        <h2
          className="text-center text-[30px] font-light leading-[1.15] text-[#1C3C8C] sm:text-left sm:text-[38px] xl:text-[44px]"
          style={{ fontFamily: heading }}
        >
          Форматы и&nbsp;стоимость
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-5 xl:grid-cols-2">
          {prices.map((p) => (
            <article
              key={p.zone}
              className="flex flex-col rounded-[12px] border border-[#daebff] bg-white p-6 sm:p-8 xl:p-10"
            >
              <h3
                className="text-[26px] font-light leading-[1.1] text-[#1C3C8C] sm:text-[30px]"
                style={{ fontFamily: heading }}
              >
                {p.zone}
              </h3>
              <p className="mt-3 body-text text-[#8D9DC5]">{p.subtitle}</p>

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
                  <p className="text-[14px] text-[#8D9DC5]">{p.session}</p>
                  <p
                    className="mt-2 text-[28px] font-light leading-none text-[#1C3C8C] sm:text-[32px]"
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
    <section className="bg-[#EFF6FF] py-[60px] sm:py-[70px] xl:pt-[140px] xl:pb-0">
      <div className="container-1900 grid grid-cols-1 gap-4 sm:gap-5 xl:grid-cols-2 xl:items-start">
        <div className="text-center xl:text-left">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 text-[13px] font-medium tracking-wide text-white"
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

        <div className="divide-y divide-[#daebff] overflow-hidden rounded-[12px] border border-[#daebff] bg-white">
          {faq.map((f) => (
            <div key={f.q} className="p-6 sm:p-7">
              <h3 className="body-text font-medium text-[#1C3C8C]">{f.q}</h3>
              <p className="mt-3 body-text text-[#8D9DC5]">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
