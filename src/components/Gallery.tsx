import { RollingGallery } from "@/components/ui/rolling-gallery";
import { ClientOnly } from "@/components/ClientOnly";


const heading = "'Noto Serif Display', Georgia, serif";

export default function Gallery() {
  return (
    <section id="galereya" className="scroll-mt-[120px] bg-[#EFF6FF] ds-section">
      <div className="container-1900 mb-8 sm:mb-10 xl:mb-[140px] flex flex-col items-center text-center">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="mb-8 sm:mb-10 xl:mb-12 h-6 w-6 sm:h-7 sm:w-7 text-[#1C3C8C]"
        >
          <path d="M12 0 L13.2 10.8 L24 12 L13.2 13.2 L12 24 L10.8 13.2 L0 12 L10.8 10.8 Z" />
        </svg>
        <h2 className="font-noto-serif-narrow max-w-none sm:max-w-[900px] xl:max-w-[1100px] ds-h1 text-[#1C3C8C]">
          Атмосфера кабинета
        </h2>
        <p className="mt-6 text-[18px] sm:text-[20px] text-[#566A93] font-light max-w-[600px] mx-auto">
          Несколько кадров о&nbsp;том, как&nbsp;всё устроено внутри&nbsp;— свет, текстуры и&nbsp;тишина
        </p>

      </div>

      <div className="xl:pt-0">
        <ClientOnly>
          <RollingGallery autoplay pauseOnHover />
        </ClientOnly>

      </div>
    </section>
  );
}
