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
    <div className="py-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-[#EFF6FF] text-[#1C3C8C] text-sm font-medium mb-4">
          Ваша персональная программа
        </span>
        <h2 className="font-noto-serif-narrow ds-h2 text-[#1c3c8c]">{primaryScenario.title}</h2>
        <p className="mt-4 text-[#566A93] leading-relaxed">{primaryScenario.description}</p>
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
        <div className="pt-8 border-t border-[#DAEBFF]">
          <h3 className="ds-h4 text-[#1c3c8c] mb-4 text-center">Также вам может подойти</h3>
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

      <div className="pt-4">
        <p className="text-center text-[#566A93] text-sm mb-6">
          Почти готово! Остался один шаг — куда отправить вашу программу?
        </p>
        <button onClick={onNext} className="btn-primary w-full">
          Перейти к контактам
        </button>
      </div>
    </div>
  );
}

function ServiceCard({ service }: { service: QuizService }) {
  return (
    <div className="p-5 rounded-2xl border border-[#DAEBFF] bg-white hover:border-[#A2CFFE] transition-all group">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h4 className="font-medium text-[#1c3c8c] group-hover:text-[#5DAAFD] transition-colors">{service.name}</h4>
          <div className="flex gap-3 mt-2 text-sm text-[#566A93]">
            {service.duration && <span>{service.duration}</span>}
            <span>{service.price}</span>
          </div>
        </div>
        <div className="h-8 w-8 rounded-full bg-[#EFF6FF] flex items-center justify-center text-[#A2CFFE]">
          <Check size={16} />
        </div>
      </div>
    </div>
  );
}
