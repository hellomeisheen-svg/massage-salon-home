import heroImageAsset from "@/assets/hero-portrait-solid.jpg.asset.json";
import tatyanaPhotoAsset from "@/assets/tatyana-photo.png.asset.json";


const heroFont = {
  fontFamily: "'Roslindale Cyrillic Display Condensed', serif",
} as const;


function SpecialistBlock() {
  return (
    <div className="flex flex-col items-start gap-3 sm:gap-4">
      <img
        className="h-[90px] w-[70px] rounded-lg object-cover xl:h-[110px] xl:w-[85px]"
        alt="Татьяна Злобина"
        src={tatyanaPhotoAsset.url}
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

function HeadlineBlock() {
  return (
    <div className="flex flex-col tablet-text-block xl:max-w-[640px]">
      <h1
        className="text-[38px] font-light leading-[1.12] text-[#1C3C8C] sm:text-[58px] sm:leading-[1.15]"
        style={heroFont}
      >
        Место, где&nbsp;можно замедлиться и&nbsp;вернуться к&nbsp;себе без&nbsp;спешки
      </h1>
      <p className="mt-4 text-[16px] font-light leading-[26px] text-[#6B7BA8]">
        Оздоровительные практики для&nbsp;тела: массаж, банки, гирудотерапия.
        Спокойный ритм и&nbsp;внимание к&nbsp;каждому состоянию.
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
  );
}


export function Hero() {
  return (
    <main className="bg-[#EFF6FF] py-4 sm:py-5">
      <section id="hero" className="container-1900 grid grid-cols-1 gap-4 sm:gap-5 xl:min-h-[calc(100vh-160px)] xl:grid-cols-2">
        {/* Content card */}
        <div className="flex min-h-0 flex-col ds-card p-5 sm:min-h-[520px] sm:p-6 xl:min-h-0 xl:p-10">


          <SpecialistBlock />
          <div className="mt-[60px] pt-0 sm:mt-[140px] xl:mt-auto xl:pt-[140px]">
            <HeadlineBlock />
          </div>
        </div>


        {/* Hero image */}
        <div className="relative h-[420px] overflow-hidden rounded-[12px] border border-[#daebff] sm:h-[520px] xl:h-auto xl:min-h-0">
          <img
            className="absolute inset-0 h-full w-full scale-x-[-1] object-cover object-top sm:object-center"
            alt="Оздоровительные процедуры"
            src={heroImageAsset.url}
          />
        </div>

      </section>
    </main>
  );
}
