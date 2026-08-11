import { createFileRoute, Link } from "@tanstack/react-router";

const headingStyle = {
  fontFamily: "'Roslindale Cyrillic Display Condensed', serif",
  color: "#1c3c8c",
  letterSpacing: "0.01em",
} as const;

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Политика конфиденциальности — Седьмое небо" },
      { name: "robots", content: "noindex, nofollow" },
      {
        name: "description",
        content:
          "Политика конфиденциальности кабинета оздоровительных практик Седьмое небо: какие данные собираются, как они используются и как связаться с нами.",
      },
      { property: "og:title", content: "Политика конфиденциальности — Седьмое небо" },
      {
        property: "og:description",
        content:
          "Какие данные собираются, как они используются и как связаться с нами по вопросам конфиденциальности.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <div className="relative min-h-screen bg-[#EFF6FF] pt-8 pb-16">
      <div className="container-1900 max-w-[760px] mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-[#1c3c8c]/70 hover:text-[#1c3c8c] text-[15px] font-light transition-colors"
        >
          ← На главную
        </Link>

        <h1
          className="mt-8 text-[30px] xl:text-[44px] leading-[1.1]"
          style={headingStyle}
        >
          Политика конфиденциальности
        </h1>

        <p className="mt-4 text-[#1c3c8c]/70 text-[15px] xl:text-base leading-[150%] font-light">
          Эта страница поддерживается владельцем приложения «Седьмое небо» и содержит общие
          сведения о подходе к персональным данным. Конкретные практики обработки данных,
          сроки хранения и используемые интеграции уточняйте непосредственно у владельца.
        </p>

        <section className="mt-10">
          <h2 className="text-[20px] xl:text-[24px] text-[#1c3c8c] font-light" style={headingStyle}>
            1. Какие данные могут собираться
          </h2>
          <p className="mt-3 text-[#1c3c8c]/80 text-[15px] xl:text-base leading-[150%] font-light">
            При записи через онлайн-форму, мессенджеры или по телефону может быть собрана
            информация, необходимая для оказания услуг: имя, номер телефона, предпочтительное
            время и комментарии к записи.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-[20px] xl:text-[24px] text-[#1c3c8c] font-light" style={headingStyle}>
            2. Как используются данные
          </h2>
          <p className="mt-3 text-[#1c3c8c]/80 text-[15px] xl:text-base leading-[150%] font-light">
            Данные используются только для связи с вами, подтверждения записи и оказания
            услуг. Мы не передаём информацию третьим лицам в рекламных или иных коммерческих
            целях без вашего согласия.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-[20px] xl:text-[24px] text-[#1c3c8c] font-light" style={headingStyle}>
            3. Хранение и удаление
          </h2>
          <p className="mt-3 text-[#1c3c8c]/80 text-[15px] xl:text-base leading-[150%] font-light">
            Персональные данные хранятся в течение срока, необходимого для оказания услуг и
            ведения записи. По вашему запросу информация может быть удалена или скорректирована.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-[20px] xl:text-[24px] text-[#1c3c8c] font-light" style={headingStyle}>
            4. Связаться с нами
          </h2>
          <p className="mt-3 text-[#1c3c8c]/80 text-[15px] xl:text-base leading-[150%] font-light">
            По вопросам конфиденциальности и обработки данных пишите на{" "}
            <a
              href="mailto:hello@zlobina.ru"
              className="text-[#1c3c8c] hover:opacity-70 transition-opacity"
            >
              hello@zlobina.ru
            </a>
            .
          </p>
        </section>

        <p className="mt-12 text-[13px] text-[#1c3c8c]/60 font-light">
          Информация на странице не является публичной офертой и может обновляться.
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
