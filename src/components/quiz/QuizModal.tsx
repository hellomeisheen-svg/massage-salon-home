import { useState, useEffect } from "react";
import { X, ChevronLeft, Check } from "lucide-react";
import { QUIZ_CONFIG } from "@/config/quiz";
import { calculateResult } from "@/lib/quiz.utils";
import { submitQuizLead } from "@/lib/quiz.functions";
import { QuizResults } from "./QuizResults";
import { QuizContactForm } from "./QuizContactForm";

export function QuizModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0); 
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [recommendedServices, setRecommendedServices] = useState<any[]>([]);

  // Filter steps based on current answers
  const visibleSteps = QUIZ_CONFIG.steps.filter(s => !s.showIf || s.showIf(answers));
  
  const currentStep = visibleSteps[step - 1];
  const isLastQuestion = step === visibleSteps.length;
  const isResultsStep = step === visibleSteps.length + 1;
  const isContactStep = step === visibleSteps.length + 2;

  useEffect(() => {
    if (isResultsStep && recommendedServices.length === 0) {
       const services = calculateResult(answers);
       setRecommendedServices(services);
    }
  }, [isResultsStep, answers, recommendedServices.length]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(0);
        setAnswers({});
        setIsSuccess(false);
      }, 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNext = (currentAnswers = answers) => {
    if (step === visibleSteps.length) {
      const services = calculateResult(currentAnswers);
      setRecommendedServices(services);
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const onContactSubmit = async (contact: { name: string; phone: string; method: string; website?: string }) => {
    setIsSubmitting(true);
    try {
      await submitQuizLead({
        data: {
          name: contact.name,
          phone: contact.phone,
          method: contact.method,
          website: contact.website,
          answers: visibleSteps.map(s => ({
            question: s.question,
            answer: answers[s.id] || (s.type === "multiple" ? [] : "")
          })),
          results: recommendedServices.map(s => s.name)
        }
      });
      setIsSuccess(true);
    } catch (e) {
      console.error(e);
      alert("Что-то пошло не так, попробуйте ещё раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto bg-[var(--color-overlay)] p-4 backdrop-blur-sm sm:items-center sm:p-6 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      role="presentation"
    >
      <div className="relative my-auto w-full max-w-[640px] ds-card p-5 sm:p-8 xl:p-10 transition-transform duration-300 scale-100 shadow-[var(--shadow-modal)] rounded-[var(--radius-modal)]">
        <button 
          onClick={onClose} 
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-[var(--radius-button)] border border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-primary)] transition-colors hover:bg-white z-10"
          aria-label="Закрыть"
        >
          <X size={18} />
        </button>

        {isSuccess ? (
          <div className="relative flex flex-col items-center px-2 pt-6 pb-2 text-center sm:px-4 sm:pt-8 animate-in zoom-in-95 duration-500">
            <div className="relative mb-8">
              <div className="absolute inset-0 rounded-full bg-[#A2CFFE] blur-2xl opacity-40 animate-pulse" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-[#DAEBFF] bg-white shadow-lg shadow-[#A2CFFE]/25">
                <Check size={40} className="text-[#1C3C8C]" strokeWidth={1.5} />
              </div>
            </div>
            <h2 className="font-noto-serif-narrow ds-h3 text-[#1c3c8c]">Спасибо!</h2>
            <p className="mt-4 max-w-[360px] text-[15px] leading-[1.6] text-[#566A93] sm:text-[16px]">
              Ваша программа уже у&nbsp;нас. Администратор свяжется с&nbsp;вами в&nbsp;течение 15&nbsp;минут.
            </p>
            <button onClick={onClose} className="ds-button-primary mt-8 w-full">Вернуться на сайт</button>
          </div>
        ) : step === 0 ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="pr-12">
              <h2 className="font-noto-serif-narrow ds-h3 text-[#1c3c8c] leading-tight">{QUIZ_CONFIG.title}</h2>
              <p className="mt-3 text-[15px] leading-[1.5] text-[#566A93] sm:text-[16px]">{QUIZ_CONFIG.subtitle}</p>
            </div>
            <div className="mt-8 space-y-3">
              <span className="text-[14px] sm:text-[15px] leading-tight text-[#566A93] block mb-4">Что вы получите:</span>
              <div className="grid gap-3">
                {[
                  { text: "Персональный список процедур", icon: "1" },
                  { text: "Расчет стоимости и длительности", icon: "2" },
                  { text: "Скидка на первый визит", icon: "3" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-card)] group">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-[var(--radius-button)] bg-[var(--color-bg-main)] text-[13px] font-bold text-[var(--color-primary)] transition-colors">
                      {item.icon}
                    </span>
                    <span className="text-[14px] sm:text-[15px] leading-tight text-[#1C3C8C] font-semibold">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={handleNext} className="ds-button-primary mt-8 w-full">Подобрать программу</button>
          </div>
        ) : isResultsStep ? (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            {recommendedServices.length > 0 ? (
              <QuizResults services={recommendedServices} answers={answers} onNext={handleNext} />
            ) : (
              <div className="py-12 text-center space-y-4">
                <p className="text-[#566A93]">Программа подбирается...</p>
                <button 
                  onClick={() => setRecommendedServices(calculateResult(answers))}
                  className="btn-secondary px-4 py-2"
                >
                  Показать результат
                </button>
              </div>
            )}
            <button onClick={handleBack} className="ds-button-secondary mt-4 w-full h-12 flex items-center justify-center gap-2 rounded-[var(--radius-button)] border border-[var(--color-border)] bg-white text-[var(--color-primary)] font-medium">
              <ChevronLeft size={20} /> Назад к вопросам
            </button>
          </div>
        ) : isContactStep ? (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <QuizContactForm onSubmit={onContactSubmit} isSubmitting={isSubmitting} />
            <button onClick={handleBack} className="ds-button-secondary mt-4 w-full h-12 flex items-center justify-center gap-2 rounded-[var(--radius-button)] border border-[var(--color-border)] bg-white text-[var(--color-primary)] font-medium text-sm">
              <ChevronLeft size={18} /> Вернуться к результатам
            </button>
          </div>
        ) : (
          <div className="py-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex flex-col gap-1 w-full mb-8">
              <span className="text-[10px] font-bold text-[#A2CFFE] uppercase tracking-[0.2em] mb-2">Вопрос {step} из {visibleSteps.length}</span>
              <div className="h-1.5 w-full bg-[#EFF6FF] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#A2CFFE] to-[#5DAAFD] transition-all duration-500 ease-out"
                  style={{ width: `${(step / visibleSteps.length) * 100}%` }}
                />
              </div>
            </div>
            
            <h3 className="font-noto-serif-narrow ds-h3 text-[#1c3c8c] mb-8 leading-tight">{currentStep.question}</h3>
            
            <div className="grid gap-3 mb-10">
              {currentStep.options.map((opt) => {
                const isSelected = currentStep.type === "single" 
                  ? answers[currentStep.id] === opt.id
                  : (answers[currentStep.id] || []).includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      if (currentStep.type === "single") {
                        const newAnswers = { ...answers, [currentStep.id]: opt.id };
                        
                        // Сброс ответа о банках, если зона изменилась на неподходящую
                        if (currentStep.id === "relax_area" && !["whole_body", "back_neck"].includes(opt.id)) {
                          delete newAnswers.addCups;
                        }

                        setAnswers(newAnswers);
                        
                        setTimeout(() => handleNext(newAnswers), 300);
                      } else {
                        const current = answers[currentStep.id] || [];
                        const exists = current.includes(opt.id);
                        const nextSelection = exists 
                          ? current.filter((id: string) => id !== opt.id) 
                          : [...current, opt.id];
                        
                        setAnswers({ 
                          ...answers, 
                          [currentStep.id]: nextSelection
                        });
                      }
                    }}
                    className={`quiz-option w-full text-left p-4 md:p-5 rounded-[var(--radius-button)] border transition-all duration-300 flex items-center justify-between group ${
                      isSelected 
                        ? "border-[var(--color-primary)] bg-white text-[var(--color-primary)]" 
                        : "border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-text-main)] hover:bg-white"
                    }`}
                  >
                    <span className="quiz-option__label font-medium text-base md:text-lg">
                      {opt.text}
                    </span>
                    <div className={`w-6 h-6 rounded-[6px] border flex items-center justify-center transition-colors ${
                      isSelected ? "bg-[#88C1FF] border-[#88C1FF]" : "bg-white border-[#DAEBFF] group-hover:border-[#A2CFFE]"
                    }`}>
                      {isSelected && <Check size={14} className="text-white" strokeWidth={3} />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex gap-4">
              <button onClick={handleBack} className="ds-button-secondary flex-1 h-14 flex items-center justify-center gap-2 rounded-[var(--radius-button)] border border-[var(--color-border)] bg-white text-[var(--color-primary)] font-medium">
                <ChevronLeft size={20} /> Назад
              </button>
              {currentStep.type === "multiple" && (
                <button 
                  disabled={!(answers[currentStep.id]?.length)}
                  onClick={handleNext} 
                  className="ds-button-primary flex-[2] h-14"
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