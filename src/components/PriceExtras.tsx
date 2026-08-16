import { useBooking } from "@/components/BookingModal";
import { Coffee, Sparkles, ShieldCheck } from "lucide-react";

export function PriceInclusions() {
  return (
    <section className="ds-section py-10 sm:py-16">
      <div className="container-1900">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white/40 backdrop-blur-sm p-6 rounded-[12px] border border-[#daebff]/50 flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-[12px] bg-[#1C3C8C]/5 flex items-center justify-center text-[#1C3C8C]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-noto-serif-narrow text-lg text-[#1C3C8C]">Безопасность</h4>
            <p className="text-sm font-light text-[#566A93] leading-relaxed">
              Используем только одноразовые расходные материалы и стерильные инструменты для каждой процедуры.
            </p>
          </div>
          
          <div className="bg-white/40 backdrop-blur-sm p-6 rounded-[12px] border border-[#daebff]/50 flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-[12px] bg-[#1C3C8C]/5 flex items-center justify-center text-[#1C3C8C]">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="font-noto-serif-narrow text-lg text-[#1C3C8C]">Атмосфера</h4>
            <p className="text-sm font-light text-[#566A93] leading-relaxed">
              Мягкий свет, расслабляющая музыка и ароматерапия помогут вам полностью отключиться от городской суеты.
            </p>
          </div>

          <div className="bg-white/40 backdrop-blur-sm p-6 rounded-[12px] border border-[#daebff]/50 flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-[12px] bg-[#1C3C8C]/5 flex items-center justify-center text-[#1C3C8C]">
              <Coffee className="w-6 h-6" />
            </div>
            <h4 className="font-noto-serif-narrow text-lg text-[#1C3C8C]">Забота</h4>
            <p className="text-sm font-light text-[#566A93] leading-relaxed">
              После сеанса мы предложим вам чашку травяного чая, чтобы плавного вернуться в ритм дня.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  const { openBooking } = useBooking();
  
  return (
    <section className="ds-section py-20 sm:py-32">
      <div className="container-1900">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="ds-h2 font-noto-serif-narrow text-[#1C3C8C]">Не знаете, что выбрать?</h2>
          <p className="text-lg font-light text-[#566A93] leading-relaxed">
            Запишитесь на первичную консультацию, и мы вместе подберем идеальную программу восстановления, исходя из вашего состояния и запроса.
          </p>
          <div className="pt-4">
            <button 
              onClick={() => openBooking()}
              className="ds-button-primary px-12 py-5 text-lg"
            >
              Записаться на консультацию
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
