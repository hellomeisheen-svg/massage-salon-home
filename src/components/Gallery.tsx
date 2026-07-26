import { RollingGallery } from "@/components/ui/rolling-gallery";

const heading = "'Roslindale Cyrillic', 'Roslindale', Georgia, serif";

export default function Gallery() {
  return (
    <section id="galereya" className="bg-[#EFF6FF] py-[60px] xl:py-[70px]">
      <div className="container-1900">
        <div className="mb-10 sm:mb-14 xl:mb-16 text-center">
          <h2
            className="text-[#1C3C8C] text-[30px] sm:text-[36px] xl:text-[48px] leading-[1.1]"
            style={{ fontFamily: heading }}
          >
            Атмосфера кабинета
          </h2>
          <p className="mt-4 text-[#1C3C8C]/80 text-[15px] sm:text-[16px] leading-[1.5] max-w-[560px] mx-auto">
            Несколько кадров о том, как всё устроено внутри — свет, текстуры и тишина
          </p>
        </div>
      </div>
      <RollingGallery autoplay pauseOnHover />
    </section>
  );
}
