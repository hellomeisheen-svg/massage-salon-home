import { QUIZ_CONFIG, QuizService } from "@/config/quiz";
import { Check } from "lucide-react";

export function QuizResults({ 
  scenarioIds, 
  onNext 
}: { 
  scenarioIds: string[]; 
  onNext: () => void 
}) {
  const primaryScenario = QUIZ_CONFIG.scenarios.find(s => s.id === scenarioIds[0]) || QUIZ_CONFIG.scenarios[0];
  const secondaryScenario = scenarioIds.length > 1 ? QUIZ_CONFIG.scenarios.find(s => s.id === scenarioIds[1]) : null;

  const getService = (id: string) => QUIZ_CONFIG.services.find(s => s.id === id);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="pr-12">
        <span className="inline-block px-4 py-1.5 rounded-full bg-[#EFF6FF] text-[#1C3C8C] text-[12px] font-medium uppercase tracking-wider mb-4">
          Ваша персональная программа
        </span>
        <h2 className="font-noto-serif-narrow ds-h3 text-[#1c3c8c]">{primaryScenario.title}</h2>
        <p className="mt-3 text-[15px] leading-[1.5] text-[#566A93] sm:text-[16px]">{primaryScenario.description}</p>
      </div>

      <div className="grid gap-4">
        {(() => {
          const services = primaryScenario.recommendedServiceIds
            .map(id => getService(id))
            .filter((s): s is QuizService => !!s);
          
          const massageServices = services.filter(s => !s.tags.includes("wellness"));
          const wellnessServices = services.filter(s => s.tags.includes("wellness"));
          
          return [...massageServices, ...wellnessServices].map(service => (
            <ServiceCard key={service.id} service={service} />
          ));
        })()}
      </div>

      {secondaryScenario && (
        <div className="pt-8 border-t border-[#daebff]">
          <h3 className="ds-h4 text-[#1c3c8c] mb-4">Также вам может подойти</h3>
          <div className="grid gap-4">
            {(() => {
              const services = secondaryScenario.recommendedServiceIds
                .map(id => getService(id))
                .filter((s): s is QuizService => !!s);
              
              const massageServices = services.filter(s => !s.tags.includes("wellness"));
              const wellnessServices = services.filter(s => s.tags.includes("wellness"));
              
              return [...massageServices, ...wellnessServices].slice(0, 1).map(service => (
                <ServiceCard key={service.id} service={service} />
              ));
            })()}
          </div>
        </div>
      )}

      <div className="pt-4 flex flex-col gap-4">
        <p className="text-[14px] text-[#566A93]">
          Почти готово! Остался один шаг — куда отправить вашу программу?
        </p>
        <button onClick={onNext} className="btn-primary w-full flex items-center justify-center">
          Перейти к контактам
        </button>
      </div>
    </div>
  );
}

function ServiceCard({ service }: { service: QuizService }) {
  return (
    <div className="p-5 rounded-[0.5rem] border border-[#daebff] bg-white transition-all group">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h4 className="font-medium text-[#1c3c8c]">{service.name}</h4>
          <div className="flex gap-3 mt-2 text-sm text-[#566A93]">
            {service.duration && <span>{service.duration}</span>}
            <span>{service.price}</span>
          </div>
        </div>
        <div className="h-8 w-8 rounded-[6px] bg-[#EFF6FF] flex items-center justify-center text-[#1C3C8C]">
          <Check size={16} strokeWidth={3} />
        </div>
      </div>
    </div>
  );
}
