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
  const getService = (id: string) => QUIZ_CONFIG.services.find(s => s.id === id);

  const getRecommendedServices = () => {
    const goal = answers.goal?.[0] || "";
    let serviceIds: string[] = [];

    if (goal === "face" || (goal === "lightness" && answers.lightness_area?.includes("face"))) {
      serviceIds = ["lymph-face", "girudo-cosm"];
    } else if (goal === "relax") {
      serviceIds = ["vector"];
    } else {
      serviceIds = ["vector", "classic-spine"];
    }

    return serviceIds
      .map(id => getService(id))
      .filter((s): s is QuizService => !!s)
      .slice(0, 3);
  };

  const services = getRecommendedServices();
  const isFirstVisit = answers.goal?.[0] === "unsure";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="pr-12">
        <h2 className="font-noto-serif-narrow ds-h3 text-[#1c3c8c]">Результаты подбора</h2>
        {isFirstVisit && (
          <p className="mt-4 p-4 bg-[#EFF6FF] rounded-lg text-sm text-[#566A93] italic">
            Если вы впервые у нас, рекомендуем начать с векторного массажа.
          </p>
        )}
      </div>

      <div className="grid gap-4">
        {services.map((service, idx) => (
          <div key={service.id} className={`p-5 rounded-[0.5rem] border ${idx === 0 ? "border-[#1C3C8C]" : "border-[#daebff]"} bg-white`}>
            <div className="flex justify-between">
              <div>
                {idx === 0 && <span className="text-[10px] font-bold text-[#A2CFFE] uppercase mb-1 block">Рекомендуем</span>}
                <h4 className="font-medium text-[#1c3c8c]">{service.name}</h4>
                <p className="text-xs text-[#566A93] mt-1">{service.description}</p>
                <div className="mt-3 text-[#1C3C8C] font-medium">{service.price}</div>
              </div>
              <Check className="text-[#1C3C8C]" size={16} />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 flex flex-col gap-3">
        <button onClick={onNext} className="btn-primary w-full py-4">Записаться</button>
        <a href="https://t.me/TatianaZlobina" target="_blank" rel="noopener" className="btn-secondary w-full py-4 flex items-center justify-center gap-2">
          <MessageCircle size={18} /> Обсудить с мастером
        </a>
      </div>
    </div>
  );
}
