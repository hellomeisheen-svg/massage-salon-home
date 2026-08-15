import { useState } from "react";
import { X, Check, Loader2 } from "lucide-react";
import { QUIZ_CONFIG } from "@/config/quiz";
import { submitQuizLead } from "@/lib/quiz.functions";

export function QuizModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0); 
  const [answers, setAnswers] = useState<Record<number, any[]>>({});
  const [leadData, setLeadData] = useState({ name: "", phone: "", method: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const currentStep = QUIZ_CONFIG.steps[step - 1];

  const handleNext = () => {
    if (step < QUIZ_CONFIG.steps.length) {
      setStep(step + 1);
    } else {
      handleFinalSubmit();
    }
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      await submitQuizLead({
        data: {
          name: leadData.name,
          phone: leadData.phone,
          method: leadData.method,
          answers: QUIZ_CONFIG.steps.map(s => ({
            question: s.question,
            answer: answers[s.id] || []
          })),
          results: ["deep-relax"] // Hardcoded for POC, need logic
        }
      });
      setIsSuccess(true);
    } catch (e) {
      console.error(e);
      alert("Ошибка отправки");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1c3c8c]/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl p-6 md:p-10 shadow-xl overflow-y-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#566A93] hover:text-[#1c3c8c]">
          <X size={24} />
        </button>

        {isSuccess ? (
          <div className="text-center py-10">
            <h2 className="ds-h2 text-[#1c3c8c]">Спасибо!</h2>
            <p className="mt-4 text-[#566A93]">Ваша программа подобрана. Менеджер свяжется с вами.</p>
            <button onClick={onClose} className="btn-primary mt-8">Закрыть</button>
          </div>
        ) : step === 0 ? (
          <div className="text-center py-10">
            <h2 className="font-noto-serif-narrow ds-h2 text-[#1c3c8c]">{QUIZ_CONFIG.title}</h2>
            <p className="mt-4 text-[#566A93] text-lg">{QUIZ_CONFIG.subtitle}</p>
            <button onClick={handleNext} className="btn-primary mt-8">Подобрать программу</button>
          </div>
        ) : step <= QUIZ_CONFIG.steps.length ? (
          <div className="py-6">
            <div className="text-sm font-medium text-[#566A93] mb-4">Вопрос {step} из 7</div>
            <h3 className="ds-h3 text-[#1c3c8c] mb-6">{currentStep.question}</h3>
            
            <div className="space-y-3 mb-8">
              {currentStep.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    const current = answers[currentStep.id] || [];
                    const exists = current.includes(opt.text);
                    setAnswers({ 
                      ...answers, 
                      [currentStep.id]: currentStep.type === "single" 
                        ? [opt.text] 
                        : (exists ? current.filter(id => id !== opt.text) : [...current, opt.text])
                    });
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    (answers[currentStep.id] || []).includes(opt.text) 
                      ? "border-[#5DAAFD] bg-[#EFF6FF]" 
                      : "border-[#DAEBFF] hover:border-[#A2CFFE]"
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <button onClick={() => setStep(step - 1)} className="btn-secondary">Назад</button>
              <button 
                disabled={!(answers[currentStep.id]?.length)}
                onClick={handleNext} 
                className="btn-primary"
              >
                Далее
              </button>
            </div>
          </div>
        ) : (
          <div className="py-6">
            <h3 className="ds-h3 text-[#1c3c8c] mb-6">Ваши данные для связи</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Имя" className="w-full p-4 rounded-xl border" onChange={(e) => setLeadData({...leadData, name: e.target.value})} />
              <input type="tel" placeholder="Телефон" className="w-full p-4 rounded-xl border" onChange={(e) => setLeadData({...leadData, phone: e.target.value})} />
              <button 
                onClick={handleFinalSubmit} 
                disabled={isSubmitting}
                className="btn-primary w-full"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : "Получить рекомендации"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
