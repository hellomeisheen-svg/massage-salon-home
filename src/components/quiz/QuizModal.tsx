import { useState, useEffect } from "react";
import { X, ChevronLeft, Loader2, Check } from "lucide-react";
import { QUIZ_CONFIG, calculateResult } from "@/config/quiz";
import { submitQuizLead } from "@/lib/quiz.functions";
import { QuizResults } from "./QuizResults";
import { QuizContactForm } from "./QuizContactForm";

export function QuizModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0); 
  const [answers, setAnswers] = useState<Record<number, any[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resultScenarioIds, setResultScenarioIds] = useState<string[]>([]);

  useEffect(() => {
    if (!isOpen) {
      // Reset state when closing
      setTimeout(() => {
        setStep(0);
        setAnswers({});
        setIsSuccess(false);
      }, 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentStep = QUIZ_CONFIG.steps[step - 1];
  const isLastQuestion = step === QUIZ_CONFIG.steps.length;
  const isResultsStep = step === QUIZ_CONFIG.steps.length + 1;
  const isContactStep = step === QUIZ_CONFIG.steps.length + 2;

  const handleNext = () => {
    if (isLastQuestion) {
      const results = calculateResult(answers);
      setResultScenarioIds(results);
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const onContactSubmit = async (contact: { name: string; phone: string; method: string }) => {
    setIsSubmitting(true);
    try {
      await submitQuizLead({
        data: {
          name: contact.name,
          phone: contact.phone,
          method: contact.method,
          answers: QUIZ_CONFIG.steps.map(s => ({
            question: s.question,
            answer: answers[s.id] || []
          })),
          results: resultScenarioIds
        }
      });
      setIsSuccess(true);
    } catch (e) {
      console.error(e);
      alert("Что-то пошло не так, попробуйте ещё раз или напишите нам в Telegram.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1c3c8c]/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 md:p-10 shadow-2xl overflow-y-auto max-h-[90vh] transition-transform duration-300 scale-100">
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2 rounded-full text-[#566A93] hover:text-[#1c3c8c] hover:bg-[#EFF6FF] transition-all"
          aria-label="Закрыть"
        >
          <X size={20} />
        </button>

        {isSuccess ? (
          <div className="text-center py-12 animate-in zoom-in-95 duration-500">
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-[#A2CFFE] blur-2xl opacity-40 animate-pulse" />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-[#DAEBFF] bg-white shadow-lg">
                  <Check className="h-10 w-10 text-[#5DAAFD]" />
                </div>
              </div>
            </div>
            <h2 className="font-noto-serif-narrow ds-h2 text-[#1c3c8c]">Спасибо!</h2>
            <p className="mt-4 text-[#566A93] text-lg max-w-[400px] mx-auto">
              Ваша программа уже у нас. Менеджер свяжется в течение 15 минут, чтобы согласовать время.
            </p>
            <button onClick={onClose} className="btn-primary mt-10 w-full sm:w-auto px-12">
              Вернуться на сайт
            </button>
          </div>
        ) : step === 0 ? (
          <div className="text-center py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="font-noto-serif-narrow ds-h2 text-[#1c3c8c] leading-tight">{QUIZ_CONFIG.title}</h2>
            <p className="mt-5 text-[#566A93] text-lg leading-relaxed">{QUIZ_CONFIG.subtitle}</p>
            <div className="mt-10 p-6 rounded-2xl bg-[#EFF6FF]/50 border border-[#DAEBFF] text-left">
              <h4 className="text-sm font-semibold text-[#1c3c8c] uppercase tracking-wider mb-3">Что вы получите:</h4>
              <ul className="space-y-2 text-[#566A93] text-sm">
                <li className="flex gap-2 items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#5DAAFD]" />
                  Персональный список процедур
                </li>
                <li className="flex gap-2 items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#5DAAFD]" />
                  Расчет стоимости и длительности
                </li>
                <li className="flex gap-2 items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#5DAAFD]" />
                  Скидка на первый визит
                </li>
              </ul>
            </div>
            <button onClick={handleNext} className="btn-primary mt-10 w-full">
              Подобрать программу
            </button>
          </div>
        ) : isResultsStep ? (
          <QuizResults scenarioIds={resultScenarioIds} onNext={handleNext} />
        ) : isContactStep ? (
          <QuizContactForm onSubmit={onContactSubmit} isSubmitting={isSubmitting} />
        ) : (
          <div className="py-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-center justify-between mb-8">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-[#A2CFFE] uppercase tracking-[0.2em]">Вопрос {step} из {QUIZ_CONFIG.steps.length}</span>
                <div className="h-1.5 w-48 bg-[#EFF6FF] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#A2CFFE] to-[#5DAAFD] transition-all duration-500 ease-out"
                    style={{ width: `${(step / QUIZ_CONFIG.steps.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            
            <h3 className="font-noto-serif-narrow ds-h3 text-[#1c3c8c] mb-8 leading-tight">{currentStep.question}</h3>
            
            <div className="grid gap-3 mb-10">
              {currentStep.options.map((opt) => {
                const isSelected = (answers[currentStep.id] || []).includes(opt.text);
                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      const current = answers[currentStep.id] || [];
                      if (currentStep.type === "single") {
                        setAnswers({ ...answers, [currentStep.id]: [opt.text] });
                        // Auto next for single choice
                        setTimeout(handleNext, 300);
                      } else {
                        const exists = current.includes(opt.text);
                        setAnswers({ 
                          ...answers, 
                          [currentStep.id]: exists 
                            ? current.filter(t => t !== opt.text) 
                            : [...current, opt.text] 
                        });
                      }
                    }}
                    className={`w-full text-left p-4 md:p-5 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between group ${
                      isSelected 
                        ? "border-[#5DAAFD] bg-[#EFF6FF] text-[#1c3c8c] shadow-md shadow-[#5DAAFD]/10" 
                        : "border-[#DAEBFF] bg-white text-[#566A93] hover:border-[#A2CFFE] hover:bg-[#EFF6FF]/30"
                    }`}
                  >
                    <span className="font-medium text-base md:text-lg">{opt.text}</span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isSelected ? "bg-[#5DAAFD] border-[#5DAAFD]" : "bg-white border-[#DAEBFF] group-hover:border-[#A2CFFE]"
                    }`}>
                      {isSelected && <Check size={14} className="text-white" strokeWidth={3} />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex gap-4">
              <button 
                onClick={handleBack} 
                className="btn-secondary flex-1 h-14 flex items-center justify-center gap-2"
              >
                <ChevronLeft size={20} />
                Назад
              </button>
              {currentStep.type === "multiple" && (
                <button 
                  disabled={!(answers[currentStep.id]?.length)}
                  onClick={handleNext} 
                  className="btn-primary flex-[2] h-14"
                >
                  Далее
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
