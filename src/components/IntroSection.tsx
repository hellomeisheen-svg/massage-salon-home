import { useBooking } from "@/components/BookingModal";

const educationList = [
  { school: "Школа «Магнат» (Владивосток)", skill: "Классический массаж" },
  { school: "Школа мастеров массажа (Москва)", skill: "Массаж лица" },
  { school: "Школа векторного массажа и соматики (Москва)", skill: "Векторный и лимфодренажный массаж" },
  { school: "Академия гирудотерапии (Челябинск)", skill: "Гирудотерапия" },
  { school: "Академия Бахолдиной (Москва)", skill: "Баночный массаж и акупунктурный кетгут" }
];

export function IntroSection() {
  return (
    <section id="about" className="scroll-mt-[120px] bg-[#EFF6FF] ds-section">
      <div className="container-1900">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-20 items-center">
          {/* Photo */}
          <div className="relative aspect-[4/5] sm:aspect-square xl:aspect-[4/5] rounded-[12px] overflow-hidden ds-card ds-bento-shadow border border-[#DAEBFF]">
            <img 
              src="/images/tatyana-photo-portrait.webp" 
              alt="Татьяна Злобина — мастер оздоровительных практик" 
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          
          {/* Content */}
          <div className="flex flex-col items-start">
            <span 
              className="inline-flex items-center px-4 py-1.5 ds-label text-white"
              style={{
                borderRadius: "12px",
                backgroundImage: "linear-gradient(to bottom, #A2CFFE, #88C1FF)",
              }}
            >
              Знакомство
            </span>
            
            <h2 className="font-noto-serif-narrow mt-6 ds-h2 text-[#1C3C8C] leading-tight">
              Знакомство с кабинетом
            </h2>
            
            <div className="mt-8 space-y-8 text-[#566A93] body-text w-full">
              <p>
                Меня зовут Татьяна Злобина. Я — мастер оздоровительных практик с многолетним опытом работы. Мой кабинет — это пространство, где профессионализм встречается с искренней заботой о человеке.
              </p>
              
              <div className="space-y-4">
                <p className="font-medium text-[#1C3C8C] text-[18px]">Моё образование и специализации:</p>
                <div className="grid gap-3">
                  {educationList.map((item, idx) => (
                    <div key={idx} className="group relative flex flex-col p-4 rounded-[12px] ds-bento-shadow bg-white border border-[#DAEBFF] hover:border-[#A2CFFE] transition-all duration-300">
                      <span className="text-[12px] uppercase tracking-wider text-[#A2CFFE] font-medium mb-1">{item.school}</span>
                      <span className="text-[#1C3C8C] font-medium leading-snug">{item.skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p>
                В своей работе я использую комплексный подход, сочетая классический массаж, работу с банками и гирудотерапию. Каждый сеанс выстраивается индивидуально, исходя из вашего запроса и текущего состояния тела.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
