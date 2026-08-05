import { useBooking } from "@/components/BookingModal";

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
        <p className="text-[16px] font-light leading-[26px] text-[#8D9DC5]">
          Мастер кабинета, специалист
          <br />
          по&nbsp;оздоровительным практикам
        </p>
      </div>
    </div>
  );
}

function HeadlineBlock() {
  const { openBooking } = useBooking();
  return (
    <div className="flex flex-col tablet-text-block xl:max-w-[640px]">
      <h1
        className="text-[38px] font-light leading-[1.12] text-[#1C3C8C] sm:text-[58px] sm:leading-[1.15]"
        style={heroFont}
      >
        Место, где&nbsp;можно замедлиться и&nbsp;вернуться к&nbsp;себе без&nbsp;спешки
      </h1>
      <p className="mt-4 text-[16px] font-light leading-[26px] text-[#8D9DC5]">
        Оздоровительные практики для&nbsp;тела: массаж, банки, гирудотерапия.
        Спокойный ритм и&nbsp;внимание к&nbsp;каждому состоянию.
      </p>
      <div className="mt-[30px] flex flex-col gap-3 sm:flex-row sm:gap-4">
        <button
          type="button"
          onClick={() => openBooking()}
          className="btn-primary w-full sm:w-[200px] xl:w-[250px]"
        >
          Записаться
        </button>
      </div>
    </div>
  );
}


export function Hero() {
  return (
    <main className="bg-[#EFF6FF] py-4 sm:py-5">
      <section className="container-1900 grid grid-cols-1 gap-4 sm:gap-5 xl:h-[calc(100vh-140px)] xl:grid-cols-2">
        {/* Content card */}
        <div className="flex min-h-0 flex-col overflow-hidden rounded-[12px] border border-[#daebff] bg-white p-5 sm:min-h-[560px] sm:p-6 xl:min-h-0 xl:p-10">
          <SpecialistBlock />
          <div className="mt-[80px] sm:mt-auto xl:mt-auto xl:pt-10">
            <HeadlineBlock />
          </div>
        </div>

        {/* Hero image */}
        <div className="h-[400px] overflow-hidden rounded-[12px] border border-[#daebff] sm:h-[560px] xl:h-auto xl:min-h-0">

          <img
            className="h-full w-full object-cover object-top sm:object-center"
            style={{ transform: "scaleX(-1)" }}
            alt="Оздоровительные процедуры"
            src="/images/massazh-salon-glavnyi-ekran.jpg"
          />
        </div>
      </section>
    </main>
  );
}
