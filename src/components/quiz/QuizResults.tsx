import { QuizService } from "@/config/quiz";
import { Check, MessageCircle } from "lucide-react";

export function QuizResults({ 
  services,
  answers,
  onNext 
}: { 
  services: QuizService[]; 
  answers: Record<string, any>;
  onNext: () => void 
}) {
  const isFirstVisit = answers.goal === "unsure" && answers.unsure_direction === "still_unsure";
  const isWellnessMasterChoice = answers.goal === "wellness" && answers.wellness_type?.includes("master_choice");

  // Services resolution debug is removed

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="pr-12">
        <span className="inline-block px-4 py-1.5 rounded-full bg-[#EFF6FF] text-[#1C3C8C] text-[12px] font-medium uppercase tracking-wider mb-4">
          Ваша персональная программа
        </span>
        <h2 className="font-noto-serif-narrow ds-h3 text-[#1c3c8c]">Результаты подбора</h2>
        
        {isFirstVisit && (
          <p className="mt-4 p-4 bg-[#EFF6FF] rounded-lg text-sm text-[#566A93] italic border-l-4 border-[#1C3C8C]">
            «Если вы впервые у нас и пока не знаете, что выбрать, рекомендуем начать с векторного массажа. Это комплексная работа с телом, которая помогает познакомиться с подходом мастера и понять, какой формат подходит именно вам».
          </p>
        )}
        {isWellnessMasterChoice && (
          <p className="mt-4 p-4 bg-[#EFF6FF] rounded-lg text-sm text-[#566A93] italic border-l-4 border-[#1C3C8C]">
            «Подберём подходящую оздоровительную практику после короткой консультации с мастером».
          </p>
        )}
      </div>

      <div className="grid gap-4">
        {services.length === 0 && (
          <div className="p-8 text-center text-[#566A93]">
            Мы не смогли подобрать программу автоматически. Пожалуйста, обсудите ваши пожелания с мастером.
          </div>
        )}
        {services.map((service, idx) => (
          <div key={service.id || idx} className={`p-5 rounded-[0.5rem] border transition-all ${idx === 0 ? "border-[#1C3C8C] bg-white ring-1 ring-[#1C3C8C]/10" : "border-[#daebff] bg-white"}`}>
            <div className="flex justify-between items-start gap-4">
              <div>
                {idx === 0 && (
                  <span className="text-[10px] font-bold text-[#A2CFFE] uppercase tracking-wider mb-1 block">Рекомендуем</span>
                )}
                <h4 className="font-medium text-[#1c3c8c]">{service.name}</h4>
                <p className="text-xs text-[#566A93] mt-1 line-clamp-2">{service.description}</p>
                <div className="flex gap-3 mt-3 text-sm font-medium text-[#1C3C8C]">
                  {service.duration && <span>{service.duration}</span>}
                  <span>{service.price}</span>
                </div>
              </div>
              <div className={`h-8 w-8 rounded-[6px] flex items-center justify-center shrink-0 ${idx === 0 ? "bg-[#1C3C8C] text-white" : "bg-[#EFF6FF] text-[#1C3C8C]"}`}>
                <Check size={16} strokeWidth={3} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 flex flex-col gap-3">
        <button onClick={onNext} className="btn-primary w-full py-4">
          Записаться
        </button>
        <a 
          href="https://t.me/TatianaZlobina" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-secondary w-full py-4 flex items-center justify-center gap-2"
        >
          <MessageCircle size={18} />
          Обсудить с мастером
        </a>
      </div>
    </div>
  );
}
