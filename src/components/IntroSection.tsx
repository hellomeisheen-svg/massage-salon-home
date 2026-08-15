import { useBooking } from "@/components/BookingModal";

const educationList = [
  "Школа «Магнат» (Владивосток) — Классический массаж",
  "Школа мастеров массажа (Москва) — Массаж лица",
  "Школа векторного массажа и соматики (Москва) — Векторный, лимфатический и лимфадренажный массаж",
  "Академия гирудотерапии (Челябинск) — Гирудотерапия",
  "Школа Бахолдиной (Москва) — Баночный массаж и акупунктурный кетгут"
];

export function IntroSection() {
  const { openBooking } = useBooking();
  
  return (
    <section id="about" className="scroll-mt-[120px] bg-[#EFF6FF] ds-section pb-0 sm:pb-0 xl:pb-0">
      <div className="container-1900">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-20 items-center">
          {/* Photo */}
          <div className="relative aspect-[4/5] sm:aspect-square xl:aspect-[4/5] rounded-[12px] overflow-hidden ds-card">
            <img 
              src="/images/tatyana-photo.png" 
              alt="Татьяна Злобина — мастер оздоровительных практик" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          
          {/* Content */}
          <div className="flex flex-col items-start">
            <span 
              className="inline-flex items-center px-4 py-1.5 ds-label text-white"
              style={{
                borderRadius: "4px",
                backgroundImage: "linear-gradient(to bottom, #A2CFFE, #88C1FF)",
              }}
            >
              Знакомство
            </span>
            
            <h2 className="font-noto-serif-narrow mt-6 ds-h2 text-[#1C3C8C] leading-tight">
              Знакомство с кабинетом
            </h2>
            
            <div className="mt-8 space-y-6 text-[#566A93] body-text">
              <p>
                Меня зовут Татьяна Злобина. Я — мастер оздоровительных практик с многолетним опытом работы. Мой кабинет — это пространство, где профессионализм встречается с искренней заботой о человеке.
              </p>
              
              <div>
                <p className="font-medium text-[#1C3C8C] mb-3">Моё образование и специализации:</p>
                <ul className="space-y-2 list-none">
                  {educationList.map((item, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                      <span className="text-[#A2CFFE] mt-1.5" aria-hidden="true">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p>
                В своей работе я использую комплексный подход, сочетая классический массаж, работу с банками и гирудотерапию. Каждый сеанс выстраивается индивидуально, исходя из вашего запроса и текущего состояния тела.
              </p>
            </div>
            
            <div className="mt-10 w-full sm:w-auto">
              <button 
                onClick={() => openBooking()}
                className="btn-primary w-full sm:w-[280px]"
              >
                Записаться на сеанс
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
