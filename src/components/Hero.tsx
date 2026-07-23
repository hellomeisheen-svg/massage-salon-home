export function Hero() {
  return (
    <>
      {/* Desktop */}
      <main className="hidden xl:block bg-[#EFF6FF] pb-5 pt-5">
        <section className="container-1900 grid h-[calc(100vh-80px)] grid-cols-2 gap-5">
          {/* Left content column */}
          <div className="rounded-xl border border-[#daebff] bg-white flex flex-col p-10">
            {/* Specialist block at top */}
            <div className="flex flex-col items-start gap-4">
              <img
                className="h-[110px] w-[85px] rounded-lg object-cover"
                alt="Татьяна Злобина"
                src="/images/tatyana-photo.jpg"
              />
              <div className="flex flex-col gap-[4px]">
                <h2
                  className="text-[28px] font-light leading-[1.2] text-[#1c3c8c]"
                  style={{ fontFamily: "'Roslindale Display Condensed', serif" }}
                >
                  Татьяна Злобина
                </h2>
                <p className="text-[15px] font-normal leading-[22px] text-[#8D9DC5]">
                  Мастер кабинета, специалист
                  <br />
                  по оздоровительным практикам
                </p>
              </div>
            </div>

            {/* Text + buttons at bottom */}
            <div className="flex flex-col max-w-[640px]">
              <h1
                className="text-[58px] font-light leading-[1.15] text-[#1C3C8C]"
                style={{ fontFamily: "'Roslindale Display Condensed', serif" }}
              >
                Место, где можно замедлиться и вернуться к себе без спешки
              </h1>
              <p className="mt-4 text-[17px] font-normal leading-[25.5px] text-[#8D9DC5]">
                Оздоровительные практики для тела: массаж, банки,
                гирудотерапия. Спокойный ритм и внимание к каждому состоянию.
              </p>
              <div className="mt-[30px] flex flex-row gap-4">
                <button type="button" className="btn-primary w-[250px]">
                  Записаться
                </button>
                <button type="button" className="btn-secondary w-[250px]">
                  Узнать подробнее
                </button>
              </div>
            </div>
          </div>

          {/* Right image column */}
          <div className="rounded-xl border border-[#daebff] overflow-hidden">
            <img
              className="h-full w-full object-cover"
              style={{ transform: "scaleX(-1)" }}
              alt="Оздоровительные процедуры"
              src="/images/hero-main-01.jpg"
            />
          </div>
        </section>
      </main>

      {/* Tablet (sm–xl) */}
      <main className="hidden sm:block xl:hidden bg-[#EFF6FF] py-5">
        <section className="container-1900 flex flex-col gap-5">
          {/* Single card: specialist + headline + CTA */}
          <div className="rounded-xl border border-[#daebff] bg-white flex flex-col p-6 h-[700px]">
            {/* Specialist block */}
            <div className="flex flex-col items-start gap-4 mb-10">
              <img
                className="h-[90px] w-[70px] rounded-lg object-cover"
                alt="Татьяна Злобина"
                src="/images/tatyana-photo.jpg"
              />
              <div className="flex flex-col gap-[4px]">
                <h2
                  className="text-[24px] font-light leading-[1.2] text-[#1c3c8c]"
                  style={{ fontFamily: "'Roslindale Display Condensed', serif" }}
                >
                  Татьяна Злобина
                </h2>
                <p className="text-[15px] font-normal leading-[22px] text-[#8D9DC5]">
                  Мастер кабинета, специалист
                  <br />
                  по оздоровительным практикам
                </p>
              </div>
            </div>

            {/* Headline + CTA */}
            <div className="flex flex-col mt-auto tablet-text-block">
              <h1
                className="text-[58px] font-light leading-[1.15] text-[#1C3C8C]"
                style={{ fontFamily: "'Roslindale Display Condensed', serif" }}
              >
                Место, где можно замедлиться и вернуться к себе без спешки
              </h1>
              <p className="mt-4 text-[15px] font-normal leading-[22px] text-[#8D9DC5]">
                Оздоровительные практики для тела: массаж, банки,
                гирудотерапия. Спокойный ритм и внимание к каждому состоянию.
              </p>
              <div className="mt-[30px] flex flex-row gap-4">
                <button type="button" className="btn-primary w-[200px]">
                  Записаться
                </button>
                <button type="button" className="btn-secondary w-[200px]">
                  Узнать подробнее
                </button>
              </div>
            </div>
          </div>

          {/* Full-width hero image */}
          <div className="rounded-xl border border-[#daebff] overflow-hidden h-[700px]">
            <img
              className="h-full w-full object-cover"
              style={{ transform: "scaleX(-1)" }}
              alt="Оздоровительные процедуры"
              src="/images/hero-main-01.jpg"
            />
          </div>
        </section>
      </main>

      {/* Mobile (< sm) */}
      <main className="sm:hidden bg-[#EFF6FF] py-4">
        <section className="container-1900 flex flex-col gap-4">
          {/* Single card: specialist + headline + CTA */}
          <div className="rounded-xl border border-[#daebff] bg-white flex flex-col p-5 gap-[80px]">
            {/* Specialist block */}
            <div className="flex flex-col items-start gap-3">
              <img
                className="h-[90px] w-[70px] rounded-lg object-cover"
                alt="Татьяна Злобина"
                src="/images/tatyana-photo.jpg"
              />
              <div className="flex flex-col gap-[4px]">
                <h2
                  className="text-[22px] font-light leading-[1.2] text-[#1c3c8c]"
                  style={{ fontFamily: "'Roslindale Display Condensed', serif" }}
                >
                  Татьяна Злобина
                </h2>
                <p className="text-[14px] font-normal leading-[20px] text-[#8D9DC5]">
                  Мастер кабинета, специалист
                  <br />
                  по оздоровительным практикам
                </p>
              </div>
            </div>

            {/* Hero text + CTA */}
            <div className="flex flex-col">
              <h1
                className="text-[38px] font-light leading-[1.12] text-[#1c3c8c]"
                style={{ fontFamily: "'Roslindale Display Condensed', serif" }}
              >
                Место, где можно замедлиться и вернуться к себе без спешки
              </h1>
              <p className="mt-4 text-[15px] font-normal leading-[22px] text-[#8D9DC5]">
                Оздоровительные практики для тела: массаж, банки,
                гирудотерапия. Спокойный ритм и внимание к каждому состоянию.
              </p>
              <div className="mt-[30px] flex flex-col gap-3">
                <button type="button" className="btn-primary w-full">
                  Записаться
                </button>
                <button type="button" className="btn-secondary w-full">
                  Узнать подробнее
                </button>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="rounded-xl border border-[#daebff] overflow-hidden h-[400px]">
            <img
              className="h-full w-full object-cover object-top"
              style={{ transform: "scaleX(-1)" }}
              alt="Оздоровительные процедуры"
              src="/images/hero-main-01.jpg"
            />
          </div>
        </section>
      </main>
    </>
  );
}
