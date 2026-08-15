import { QUIZ_CONFIG, QuizService } from "@/config/quiz";
import { Check, MessageCircle } from "lucide-react";

export function QuizResults({ 
  scenarioIds, 
  answers,
  onNext 
}: { 
  scenarioIds: string[]; 
  answers: Record<string, any>;
  onNext: () => void 
}) {
  const primaryScenario = QUIZ_CONFIG.scenarios.find(s => s.id === scenarioIds[0]) || QUIZ_CONFIG.scenarios[0];
  const getService = (id: string) => QUIZ_CONFIG.services.find(s => s.id === id);

  const getRecommendedServices = () => {
    let serviceIds = [...primaryScenario.recommendedServiceIds];
    
    // Branch-specific logic overrides
    const goal = answers.goal?.[0] || "";
    
    if (goal.includes("расслабиться")) {
      const area = answers.relax_area?.[0] || "";
      if (area.includes("Всё тело")) serviceIds = ["vector"];
      else if (area.includes("Спина")) serviceIds = ["vector", "classic-spine"];
      else if (area.includes("Голова")) serviceIds = ["classic-head", "vector"];
      else if (area.includes("Ноги")) serviceIds = ["classic-legs", "vector"];
      else serviceIds = ["vector"];
    }
    
    else if (goal.includes("спине, шее")) {
      const res = answers.back_result?.[0] || "";
      if (res.includes("Быстро")) serviceIds = ["classic-spine"];
      else if (res.includes("Глубоко")) serviceIds = ["vector"];
      else if (res.includes("расслабиться")) serviceIds = ["classic-full", "vector"];
    }

    else if (goal.includes("отёчность")) {
      const area = answers.lightness_area || [];
      if (area.includes("Ноги") || area.includes("Стопы")) serviceIds = ["classic-legs", "lymph", "lymphatic"];
      else if (area.includes("Всё тело")) serviceIds = ["lymph", "lymphatic", "vector"];
      else if (area.includes("Лицо")) serviceIds = ["lymph-face", "classic-face"];
    }

    else if (goal.includes("кожи лица")) {
      const format = answers.face_format?.[0] || "";
      if (format.includes("Массаж лица")) serviceIds = ["classic-face"];
      else if (format.includes("Лимфодренаж")) serviceIds = ["lymph-face"];
      else if (format.includes("пиявки")) serviceIds = ["girudo-cosm"];
      else serviceIds = ["lymph-face", "classic-face", "girudo-cosm"];
    }

    else if (goal.includes("Оздоровиться")) {
      const selectedPractices = answers.wellness_type || [];
      const mapping: Record<string, string> = {
        "Мягкие банки": "cups-air",
        "Стеклянные банки": "cups-fire",
        "Медицинские пиявки": "girudo-med",
        "Косметические пиявки": "girudo-cosm",
        "Акупунктурный кетгут": "ketgut"
      };
      
      const practiceIds = selectedPractices.map((p: string) => mapping[p]).filter(Boolean);
      const massage = answers.wellness_massage?.[0] || "";
      
      let massageIds: string[] = [];
      if (massage.includes("расслабляющий")) massageIds = ["vector", "classic-full"];
      else if (massage.includes("спины и шеи")) massageIds = ["classic-spine"];
      
      // Filter out vector if it's already a practice or if we want to prioritize massage first
      serviceIds = [...massageIds, ...practiceIds];
    }

    else if (goal.includes("Не знаю")) {
      const direction = answers.unsure_direction?.[0] || "";
      if (!direction || direction.includes("не могу")) {
        serviceIds = ["vector", "classic-full"];
      }
    }

    // Deduplicate and filter
    return Array.from(new Set(serviceIds))
      .map(id => getService(id))
      .filter((s): s is QuizService => !!s)
      .slice(0, 3);
  };


  const services = getRecommendedServices();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="pr-12">
        <span className="inline-block px-4 py-1.5 rounded-full bg-[#EFF6FF] text-[#1C3C8C] text-[12px] font-medium uppercase tracking-wider mb-4">
          Ваша персональная программа
        </span>
        <h2 className="font-noto-serif-narrow ds-h3 text-[#1c3c8c]">{primaryScenario.title}</h2>
        <p className="mt-3 text-[15px] leading-[1.5] text-[#566A93] sm:text-[16px]">{primaryScenario.description}</p>
        
        {primaryScenario.id === "first-visit" && (
          <p className="mt-4 p-4 bg-[#EFF6FF] rounded-lg text-sm text-[#566A93] italic">
            Если вы впервые у нас и пока не знаете, что выбрать, рекомендуем начать с векторного массажа. Это комплексная работа с телом, которая помогает познакомиться с подходом мастера.
          </p>
        )}
      </div>

      <div className="grid gap-4">
        {services.map((service, idx) => (
          <ServiceCard key={service.id} service={service} isPrimary={idx === 0} />
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

function ServiceCard({ service, isPrimary }: { service: QuizService; isPrimary: boolean }) {
  return (
    <div className={`p-5 rounded-[0.5rem] border transition-all ${isPrimary ? "border-[#1C3C8C] bg-white ring-1 ring-[#1C3C8C]/10" : "border-[#daebff] bg-white"}`}>
      <div className="flex justify-between items-start gap-4">
        <div>
          {isPrimary && (
            <span className="text-[10px] font-bold text-[#A2CFFE] uppercase tracking-wider mb-1 block">Рекомендуем</span>
          )}
          <h4 className="font-medium text-[#1c3c8c]">{service.name}</h4>
          <p className="text-xs text-[#566A93] mt-1 line-clamp-2">{service.description}</p>
          <div className="flex gap-3 mt-3 text-sm font-medium text-[#1C3C8C]">
            {service.duration && <span>{service.duration}</span>}
            <span>{service.price}</span>
          </div>
        </div>
        <div className={`h-8 w-8 rounded-[6px] flex items-center justify-center ${isPrimary ? "bg-[#1C3C8C] text-white" : "bg-[#EFF6FF] text-[#1C3C8C]"}`}>
          <Check size={16} strokeWidth={3} />
        </div>
      </div>
    </div>
  );
}
