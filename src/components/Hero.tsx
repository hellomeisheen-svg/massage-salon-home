import heroImageAsset from "@/assets/hero-portrait-solid.jpg.asset.json";
import tatyanaPhotoAsset from "@/assets/tatyana-photo.png.asset.json";


function SpecialistBlock() {
  return (
    <div className="flex flex-col items-start gap-3 sm:gap-4">
      <img
        className="h-[90px] w-[70px] rounded-lg border border-[#daebff] object-cover xl:h-[110px] xl:w-[85px]"
        alt="Татьяна Злобина"
        src={tatyanaPhotoAsset.url}
      />
      <div className="flex flex-col gap-1">
        <div className="font-noto-serif-narrow ds-h4 text-[#1c3c8c]">
          Татьяна&nbsp;Злобина
        </div>
        <p className="text-[16px] font-light leading-[26px] text-[#566A93]">
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
      <h1 className="font-noto-serif-narrow ds-h1 text-[#1C3C8C]">
        <span className="inline">Седьмое небо — массаж, гирудотерапия и&nbsp;банки во&nbsp;Владивостоке</span>
        <span className="ml-2 inline-flex items-center rounded-[4px] bg-gradient-to-b from-[#A2CFFE] to-[#88C1FF] px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
          Здесь классно
        </span>
      </h1>
      <p className="mt-4 text-[16px] font-light leading-[26px] text-[#566A93] xl:max-w-[540px]">
        Убираем напряжение, отёки и&nbsp;боли, возвращаем лёгкость движений — первый эффект уже после 1–2 сеансов.
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
