import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Loader2, Check } from "lucide-react";
import { QUIZ_CONFIG } from "@/config/quiz";

export function QuizModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0); // 0 is intro
  const [answers, setAnswers] = useState<Record<number, any[]>>({});

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < QUIZ_CONFIG.steps.length) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1c3c8c]/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl p-6 md:p-10 shadow-xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#566A93] hover:text-[#1c3c8c]">
          <X size={24} />
        </button>

        {step === 0 ? (
          <div className="text-center py-10">
            <h2 className="font-noto-serif-narrow ds-h2 text-[#1c3c8c]">{QUIZ_CONFIG.title}</h2>
            <p className="mt-4 text-[#566A93] text-lg">{QUIZ_CONFIG.subtitle}</p>
            <button onClick={handleNext} className="btn-primary mt-8">Подобрать программу</button>
          </div>
        ) : (
          <div className="py-6">
            <div className="text-sm font-medium text-[#566A93] mb-4">Вопрос {step} из 7</div>
            <h3 className="ds-h3 text-[#1c3c8c] mb-6">{QUIZ_CONFIG.steps[step - 1].question}</h3>
            
            <div className="space-y-3 mb-8">
              {QUIZ_CONFIG.steps[step - 1].options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    const current = answers[step] || [];
                    if (QUIZ_CONFIG.steps[step - 1].type === "single") {
                      setAnswers({ ...answers, [step]: [opt.id] });
                    } else {
                      const exists = current.includes(opt.id);
                      setAnswers({ 
                        ...answers, 
                        [step]: exists ? current.filter(id => id !== opt.id) : [...current, opt.id] 
                      });
                    }
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    (answers[step] || []).includes(opt.id) 
                      ? "border-[#5DAAFD] bg-[#EFF6FF]" 
                      : "border-[#DAEBFF] hover:border-[#A2CFFE]"
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <button onClick={handleBack} className="btn-secondary">Назад</button>
              <button onClick={handleNext} className="btn-primary">Далее</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
