import { useBooking } from "@/components/BookingModal";

const educationList = [
  { school: "Школа «Магнат» (Владивосток)", skill: "Классический массаж" },
  { school: "Школа мастеров массажа (Москва)", skill: "Массаж лица" },
  { school: "Школа векторного массажа и соматики (Москва)", skill: "Векторный, лимфатический и лимфадренажный массаж" },
  { school: "Академия гирудотерапии (Челябинск)", skill: "Гирудотерапия" },
  { school: "Академия Бахолдиной (Москва)", skill: "Баночный массаж и акупунктурный кетгут" }
];

export function IntroSection() {
  return (
    <section id="about" className="scroll-mt-[120px] bg-[var(--color-bg-main)] py-[var(--space-8)] xl:py-[var(--space-10)] pb-0 sm:pb-0 xl:pb-0">
      <div className="container-1900">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-20 items-center">
          {/* Photo */}
          <div className="relative aspect-[4/5] sm:aspect-square xl:aspect-[4/5] rounded-[var(--radius-card)] overflow-hidden ds-card border border-[var(--color-border)] shadow-[var(--shadow-card)]">
            <img 
              src="/images/tatyana-photo.webp" 
              alt="Татьяна Злобина — мастер оздоровительных практик" 
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          
          {/* Content */}
          <div className="flex flex-col items-start">
            <span 
              className="inline-flex items-center gap-2 px-4 py-1.5 ds-chip !bg-[var(--color-primary-action)] text-white !border-none !rounded-[var(--radius-sm)]"
            >
              Знакомство
            </span>
            
            <h2 className="font-noto-serif-narrow mt-6 ds-h2 text-[var(--color-primary)] leading-tight font-light">
              Знакомство с кабинетом
            </h2>
            
            <div className="mt-8 space-y-8 text-[var(--color-text-main)] w-full">
              <p>
                Меня зовут Татьяна Злобина. Я — мастер оздоровительных практик с многолетним опытом работы. Мой кабинет — это пространство, где профессионализм встречается с искренней заботой о человеке.
              </p>
              
              <div className="space-y-4">
                <p className="font-medium text-[var(--color-primary)] text-[18px]">Моё образование и специализации:</p>
                <div className="grid gap-3">
                  {educationList.map((item, idx) => (
                    <div key={idx} className="group relative flex flex-col p-4 rounded-[var(--radius-card)] bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-primary-action)]/30 hover:shadow-[var(--shadow-card)] transition-all duration-300">
                      <span className="text-[12px] uppercase tracking-wider text-[var(--color-primary-action)] font-medium mb-1 opacity-70">{item.school}</span>
                      <span className="text-[var(--color-primary)] font-medium leading-snug">{item.skill}</span>
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
