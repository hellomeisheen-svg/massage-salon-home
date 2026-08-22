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
import { formatPrice, pluralize, renderPrice, formatDurationString } from "@/components/Services";




export const Route = createFileRoute("/girudoterapiya")({
  head: () => ({
    meta: [
      { title: "Гирудотерапия во Владивостоке — Седьмое небо" },
      {
        name: "description",
        content:
          "Гирудотерапия в кабинете Седьмое небо в спокойном ритме: медицинские и косметические пиявки, стерильные материалы, бережная постановка. Стоимость от 4 800 ₽, запись онлайн." },
      { property: "og:title", content: "Гирудотерапия — Седьмое небо" },
      {
        property: "og:description",
        content:
          "Медицинские и косметические пиявки в кабинете Седьмое небо: мягкая процедура, стерильные материалы, внимательное сопровождение до и после сеанса." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://7heavenmassage.ru/girudoterapiya" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        property: "og:image",
        content: "https://7heavenmassage.ru/images/uslugi-girudoterapiya-litsa.webp" },
      {
        name: "twitter:image",
        content: "https://7heavenmassage.ru/images/uslugi-girudoterapiya-litsa.webp" }],
    links: [{ rel: "canonical", href: "https://7heavenmassage.ru/girudoterapiya" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "MedicalBusiness",
              "@id": "https://7heavenmassage.ru/girudoterapiya#business",
              name: "Седьмое небо",
              description:
                "Кабинет массажа и гирудотерапии Татьяны Злобиной в посёлке Трудовое между Владивостоком и Артёмом.",
              url: "https://7heavenmassage.ru/",
              image: "https://7heavenmassage.ru/images/uslugi-girudoterapiya-litsa.webp",
              medicalSpecialty: "https://schema.org/PhysicalTherapy",
              telephone: "+7 924 232 46 11",
              address: {
                "@type": "PostalAddress",
                streetAddress: "ул. Лермонтова, 46",
                addressLocality: "посёлок Трудовое",
                addressRegion: "Приморский край",
                addressCountry: "RU" },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 43.3125,
                longitude: 132.0119 },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday"],
                  opens: "09:00",
                  closes: "22:00" }],
              areaServed: [
                { "@type": "Place", name: "Трудовое" },
                { "@type": "Place", name: "Владивосток" },
                { "@type": "Place", name: "Артём" }],
              priceRange: "600–4800 ₽" },
            {
              "@type": "Service",
              name: "Гирудотерапия",
              serviceType: "Гирудотерапия (лечение медицинскими пиявками)",
              url: "https://7heavenmassage.ru/girudoterapiya",
              provider: { "@id": "https://7heavenmassage.ru/girudoterapiya#business" },
              areaServed: [
                { "@type": "Place", name: "Трудовое" },
                { "@type": "Place", name: "Владивосток" },
                { "@type": "Place", name: "Артём" }],
              offers: [
                {
                  "@type": "Offer",
                  name: "Оздоровительный сеанс гирудотерапии",
                  price: "4800",
                  priceCurrency: "RUB",
                  url: "https://7heavenmassage.ru/girudoterapiya#prices" },
                {
                  "@type": "Offer",
                  name: "Косметические пиявки, за пиявку",
                  price: "600",
                  priceCurrency: "RUB",
                  url: "https://7heavenmassage.ru/girudoterapiya#prices" }] },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Главная",
                  item: "https://7heavenmassage.ru/" },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Гирудотерапия",
                  item: "https://7heavenmassage.ru/girudoterapiya" }] },
            {
              "@type": "FAQPage",
              "@id": "https://7heavenmassage.ru/girudoterapiya#faq",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Какой результат после первого сеанса?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Многие отмечают облегчение уже в первые сутки: снижается мышечное напряжение, улучшается сон и общее самочувствие. Эффект от гирудотерапии часто нарастает постепенно в течение нескольких дней." } },
                {
                  "@type": "Question",
                  name: "Остаются ли следы или синяки после процедуры?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Да, на месте укуса остаются небольшие точки, которые заживают от нескольких дней до двух недель. Это нормальная реакция кожи. В первые сутки важно не мочить и не тереть места постановки пиявок." } },
                {
                  "@type": "Question",
                  name: "Сочетается ли гирудотерапия с массажем?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Совмещать их в один день нельзя из-за риска кровотечений. Между процедурами рекомендуется выдержать паузу в 2–3 суток. Я составлю план так, чтобы каждый метод работал максимально эффективно и безопасно для вас." } },
                {
                  "@type": "Question",
                  name: "Что взять с собой?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Возьмите с собой хорошее настроение и удобную одежду. Всё остальное я предоставлю: одноразовые материалы, стерильные инструменты и заботу о вашем комфорте. Если у вас есть вопросы — напишите мне заранее, я с радостью помогу подготовиться." } },
                {
                  "@type": "Question",
                  name: "Можно ли ставить пиявки после простуды?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "В период температуры, озноба или активного кашля процедура противопоказана. После выздоровления важно дождаться полного исчезновения острых симптомов. При сохранении слабости стоит проконсультироваться с врачом перед сеансом." } },
                {
                  "@type": "Question",
                  name: "Где находится кабинет?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Кабинет расположен в посёлке Трудовое. Принимаю по записи. Записаться можно в мессенджере — я уточню удобное время и дам необходимые рекомендации по подготовке к вашему первому сеансу." } },
                {
                  "@type": "Question",
                  name: "Нужен ли курс?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Количество сеансов гирудотерапии зависит от цели, состояния сосудов и реакции организма. Первый визит помогает оценить переносимость ферментов пиявки. Если процедура подходит, я предложу график с интервалом в 3–7 дней." }
                } ] }] }) }] }),
  component: GirudoterapiyaPage });

const badges = ["Стерильные материалы", "Пиявка используется один раз", "Сопровождение после сеанса"];

const benefits = [
  {
    title: "Мягкое снятие напряжения",
    text: "Процедура помогает почувствовать лёгкость в теле и спокойно отпустить накопленное напряжение." },
  {
    title: "Внимание к состоянию",
    text: "Перед сеансом обсуждаем самочувствие и подбираем количество пиявок и зоны без спешки." },
  {
    title: "Аккуратный эстетический уход",
    text: "Косметическая постановка поддерживает свежий вид и ровный тон кожи без агрессивного воздействия." },
  {
    title: "Спокойная атмосфера",
    text: "Тихий кабинет, свежее выглаженное бельё и тёплый чай после процедуры." }];

const steps = [
  { n: "01", title: "Знакомство", text: "Короткая беседа о самочувствии, ожиданиях и подходящем формате." },
  { n: "02", title: "Подготовка", text: "Выбираем зоны, готовим кожу и стерильные материалы." },
  { n: "03", title: "Как проходит сеанс", text: "Постановка пиявок, комфортное положение тела, тишина и покой." },
  { n: "04", title: "После сеанса", text: "Накладываю стерильную повязку и подробно рассказываю, как ухаживать за зонами." }];

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
    duration: "1,5–2 часа",
    base: 4800,
    perLeech: false,
    leechCounts: [6, 16, 74] },
  {
    zone: "Косметические пиявки",
    subtitle: "Мягкий уход и\u00A0забота о\u00A0коже",
    duration: "1,5–2 часа",

    base: 600,
    perLeech: true,
    leechCounts: [6, 10, 20] }];


const faq = [
  {
    q: "Какой результат после\u00A0первого сеанса?",
    a: "Многие отмечают облегчение уже в первые сутки: снижается мышечное напряжение, улучшается сон и общее самочувствие. Эффект от гирудотерапии часто нарастает постепенно в течение нескольких дней." },
  {
    q: "Остаются ли следы или синяки после\u00A0процедуры?",
    a: "Да, на месте укуса остаются небольшие точки, которые заживают от нескольких дней до двух недель. Это нормальная реакция кожи. В первые сутки важно не мочить и не тереть места постановки пиявок." },
  {
    q: "Сочетается ли гирудотерапия с\u00A0массажем?",
    a: "Совмещать их в один день нельзя из-за риска кровотечений. Между процедурами рекомендуется выдержать паузу в 2–3 суток. Я составлю план так, чтобы каждый метод работал максимально эффективно и безопасно для вас." },
  {
    q: "Нужен ли курс?",
    a: "Количество сеансов гирудотерапии зависит от цели, состояния сосудов и реакции организма. Первый визит помогает оценить переносимость ферментов пиявки. Если процедура подходит, я предложу график с интервалом в 3–7 дней." },
  {
    q: "Можно ли применять процедуру после простуды?",
    a: "В острый период болезни (озноб, кашель, жар) процедура противопоказана. Рекомендуется выдержать паузу в 7–10 дней после выздоровления, чтобы иммунитет восстановился и реакция организма на сеанс была предсказуемой." },
  {
    q: "Где находится кабинет?",
    a: "Кабинет расположен в посёлке Трудовое. Принимаю по записи. Записаться можно в мессенджере Max — я уточню удобное время и дам необходимые рекомендации по подготовке к вашему первому сеансу." }];


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
        <Faq />
        <OtherServices exclude="girudoterapiya" />
        <Footer items={servicePageFooterNav} />
      </div>
    </BookingProvider>
  );
}

function SpecialistBlock() {
  return (
    <div className="flex items-end text-left gap-4 sm:flex-col sm:items-start sm:gap-0 xl:flex-col xl:items-start xl:gap-0">
      <img
        src="/images/tatyana-photo.webp"
        alt="Татьяна Злобина — мастер оздоровительных практик в кабинете Седьмое небо"
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
  );
}

function PageHero() {
  return (
    <main className="bg-[#EFF6FF] py-4 sm:py-5">
      <section id="hero" className="container-1900 grid grid-cols-1 gap-4 sm:gap-5 xl:min-h-[calc(100vh-160px)] xl:grid-cols-2">
        <div className="ds-bento-shadow flex flex-col ds-card min-h-[640px] sm:h-[600px] xl:min-h-0 xl:h-auto p-5 sm:p-6 xl:p-10 overflow-hidden">
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

          <div className="mt-auto xl:mt-auto pt-4 sm:pt-12">
            <div className="flex flex-col tablet-text-block xl:max-w-[640px]">
              <div className="flex flex-col gap-y-2">
                <div className="flex sm:hidden">
                  <span className="inline-flex items-center rounded-[12px] bg-[#A2CFFE] px-2 py-0.5 text-[14px] font-medium lowercase tracking-tight text-white">
                    хит
                  </span>
                </div>
                <div className="flex items-center gap-x-3 gap-y-2 flex-wrap">
                  <h1 className="font-noto-serif-narrow text-[30px] font-light leading-[1.12] text-[#1C3C8C] sm:text-[58px] sm:leading-[1.15]">
                    Гирудотерапия
                  </h1>
                  <span className="hidden sm:inline-flex items-center rounded-[12px] bg-[#A2CFFE] px-2 py-0.5 text-[14px] font-medium lowercase tracking-tight text-white">
                    хит
                  </span>
                </div>
              </div>
              <p className="mt-4 text-[16px] font-light leading-[26px] text-[#566A93]">
                <span className="hidden sm:inline">
                  Практика с медицинскими пиявками для поддержания самочувствия и ощущения лёгкости. Кабинет в посёлке Трудовое.
                </span>
                <span className="sm:hidden">
                  Практика с медицинскими пиявками для поддержания самочувствия и ощущения лёгкости. Кабинет в посёлке Трудовое.
                </span>
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
    label: "Что такое гирудотерапия",
    content: (
      <>
        <p>Во время процедуры медицинская пиявка воздействует на кожу и местный кровоток. В её секрете содержатся биологически активные вещества, которые могут влиять на свёртываемость крови.</p>
        <p>После снятия пиявок в местах укусов некоторое время может сохраняться кровоточивость. Это ожидаемая реакция, но её продолжительность зависит от зоны постановки, количества пиявок, состояния здоровья и принимаемых препаратов.</p>
        <p>Гирудотерапия не заменяет обследование, лекарственную терапию и назначения лечащего врача. При хронических и острых заболеваниях возможность процедуры согласовывают с профильным специалистом.</p>
      </>
    ) },
  {
    label: "Материалы",
    content: (
      <>
        <p className="font-semibold text-[#1C3C8C]">Медицинские пиявки</p>
        <p>В работе применяются медицинские пиявки зарегистрированного и подтверждённого происхождения.</p>
        <ul className="list-disc pl-5 space-y-2 mt-4">
          <li>Каждая пиявка используется только для&nbsp;одного пациента;</li>
          <li>После процедуры её не&nbsp;применяют повторно;</li>
          <li>Пиявки из природных водоёмов не используются;</li>
          <li>Перед процедурой кожу подготавливают с учётом требований безопасности;</li>
          <li>Места укусов после сеанса обрабатывают, затем накладывают повязку.</li>
        </ul>
        
        <p className="font-semibold text-[#1C3C8C]">Косметические пиявки</p>
        <p>Постановка небольших медицинских пиявок на лицо и локальные зоны рассматривается отдельно. Процедуру можно проводить только после оценки состояния кожи, общего здоровья, склонности к кровотечениям и принимаемых препаратов.</p>
        
        <div className="mt-6 p-4 bg-[#F2F8FF] text-[#1C3C8C] rounded-lg border border-[#DAEBFF] font-medium">
          Конкретные санитарные процедуры и документы на медицинских пиявок можно уточнить у специалиста перед записью.
        </div>
      </>
    ) },
  {
    label: "Показания",
    content: (
      <>
        <p>Гирудотерапия может рассматриваться как дополнительный метод в составе комплексного лечения при отдельных состояниях. Решение зависит от диагноза, результатов обследований, общего самочувствия и назначенной терапии.</p>

        <p className="mt-4">Возможность процедуры иногда обсуждают при:</p>
        <ul className="list-disc pl-5 space-y-2 mt-4">
          <li>отдельных заболеваниях вен и нарушениях венозного оттока;</li>
          <li>некоторых воспалительных и застойных состояниях;</li>
          <li>заболеваниях суставов и опорно-двигательного аппарата;</li>
          <li>отдельных неврологических и урологических состояниях;</li>
          <li>некоторых гинекологических заболеваниях;</li>
          <li>восстановлении после травм или операций — только после согласования с лечащим врачом.</li>
        </ul>

        <p className="mt-4">Этот список не является назначением. Наличие диагноза само по себе не означает, что гирудотерапия вам показана.</p>
      </>
    ) },
  {
    label: "Противопоказания",
    content: (
      <>
        <p>Гирудотерапия противопоказана или требует обязательного согласования с врачом при:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>нарушениях свёртываемости крови, включая гемофилию и геморрагические диатезы;</li>
          <li>выраженной анемии;</li>
          <li>продолжающихся кровотечениях;</li>
          <li>приёме антикоагулянтов, антиагрегантов и других препаратов, влияющих на свёртываемость крови;</li>
          <li>индивидуальной непереносимости компонентов секрета пиявки;</li>
          <li>беременности;</li>
          <li>выраженном снижении артериального давления;</li>
          <li>острых лихорадочных и инфекционных заболеваниях;</li>
          <li>выраженном истощении организма;</li>
          <li>активных онкологических и других тяжёлых заболеваниях;</li>
          <li>повреждениях или воспалении кожи в предполагаемой зоне постановки;</li>
          <li>состоянии алкогольного опьянения или невозможности выполнять рекомендации специалиста;</li>
          <li>недавних операциях, особенно на головном или спинном мозге.</li>
        </ul>
        <div className="mt-6 p-4 bg-[#F2F8FF] text-[#1C3C8C] rounded-lg border border-[#DAEBFF] font-medium">
          Перечень не заменяет медицинскую консультацию. Перед процедурой обязательно сообщите специалисту о заболеваниях, аллергиях, беременности, недавних операциях и всех принимаемых препаратах. Не отменяйте назначенные лекарства самостоятельно, в том числе препараты, влияющие на свёртываемость крови.
        </div>
      </>
    ) },
  {
    label: "Как проходит сеанс",
    content: (
      <>
        <p>Специалист проводит беседу и уточняет состояние здоровья, проверяет возможные ограничения и задаёт вопросы о лекарствах.</p>
        <ul className="list-disc pl-5 space-y-2 mt-4">
          <li>Определяет зоны постановки и количество пиявок;</li>
          <li>Подготавливает кожу без раздражающих и ароматизированных средств;</li>
          <li>Устанавливает медицинских пиявок;</li>
          <li>После снятия обрабатывает места укусов и накладывает повязку;</li>
          <li>Объясняет правила ухода и признаки, при которых нужно обратиться за помощью.</li>
        </ul>
        <div className="mt-6 p-4 bg-[#F2F8FF] text-[#1C3C8C] rounded-lg border border-[#DAEBFF] font-medium">
          Продолжительность сеанса зависит от количества пиявок, зон постановки и реакции организма. В среднем процедура занимает от 1,5 до 2 часов.
        </div>
      </>
    ) },
  {
    label: "Как подготовиться",
    content: (
      <>
        <p>Перед сеансом:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>примите душ без духов, масел и ароматизированных средств;</li>
          <li>не наносите кремы и косметику на зоны постановки;</li>
          <li>не употребляйте алкоголь;</li>
          <li>не приходите натощак — допускается лёгкий приём пищи;</li>
          <li>сообщите обо всех хронических заболеваниях и аллергиях;</li>
          <li>перечислите все принимаемые препараты;</li>
          <li>заранее скажите, если у вас бывают длительные кровотечения или плохо заживают повреждения кожи.</li>
        </ul>
        <p>Если специалист рекомендует анализы, пройдите их до процедуры. Не отменяйте лекарства без согласования с врачом.</p>
      </>
    ) },
  {
    label: "Что делать после процедуры",
    content: (
      <>
        <p>После сеанса в местах укусов может сохраняться кровоточивость. Повязку нужно менять и снимать только по инструкции специалиста.</p>
        <p>В первые 24–48 часов:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>не срывайте повязку раньше рекомендованного времени;</li>
          <li>не трите и не расчёсывайте места укусов;</li>
          <li>не принимайте горячую ванну;</li>
          <li>временно откажитесь от сауны, бани и солярия;</li>
          <li>избегайте интенсивных тренировок и тяжёлых нагрузок;</li>
          <li>не массируйте зоны постановки;</li>
          <li>не наносите косметику на повреждённую кожу.</li>
        </ul>
        <div className="mt-6 p-4 bg-[#F2F8FF] text-[#1C3C8C] rounded-lg border border-[#DAEBFF] font-medium">
          Обратитесь за медицинской помощью, если кровотечение не уменьшается, усиливаются боль или отёк, повышается температура, появляется гнойное или необычное отделяемое.
        </div>
      </>
    ) }];

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
              backgroundImage: "linear-gradient(to bottom, #A2CFFE, #88C1FF)" }}
          >
            Об услуге
          </span>
          <h2 className="font-noto-serif-narrow mt-6 ds-h2 text-[#1C3C8C] max-w-[520px] mx-auto xl:mx-0">
            Обсуждаем состояние перед каждым визитом и&nbsp;подбираем технику
          </h2>

          <div className="mt-8 hidden xl:block w-full max-w-[520px] text-left">{nav}</div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="ds-bento-shadow ds-card p-6 sm:p-8 xl:p-10 !overflow-visible">
            <div className="flex flex-col gap-10 sm:gap-12">
              {girudoSections.map((s, i) => (
                <div
                  key={s.label}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  className="scroll-mt-[140px] flex flex-col xl:flex-row xl:gap-10"
                >
                  <h3 className="font-noto-serif-narrow text-[26px] sm:text-[36px] font-light leading-[1.15] text-[#1C3C8C] xl:sticky xl:top-[160px] xl:self-start xl:w-[240px] xl:shrink-0">
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
                  {prices.map((price, i) => {
                    const count = sessionCounts[i];
                    return (
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
                            {price.leeches} {pluralize(price.leeches, ["пиявка", "пиявки", "пиявок"])} · {formatDurationString(p.duration, count)}
                          </div>
                        </div>
                      </td>
                    );
                  })}
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
          Форматы и стоимость
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


function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const lines = a.split("\n");
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
          <div className="px-5 sm:px-6 xl:px-7 pb-5 sm:pb-6 xl:pb-7 body-text text-[#566A93] max-w-[720px] space-y-3">
            {lines.map((line, i) =>
              line.startsWith("• ") ? (
                <div key={i} className="flex gap-2">
                  <span className="shrink-0">•</span>
                  <span>{line.slice(2)}</span>
                </div>
              ) : line ? (
                <p key={i}>{line}</p>
              ) : null
            )}
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
              backgroundImage: "linear-gradient(to bottom, #A2CFFE, #88C1FF)" }}
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
          {faq.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

