import { useState, useEffect } from "react";
import { X, ChevronLeft, Loader2, Check } from "lucide-react";
import { QUIZ_CONFIG, calculateResult } from "@/config/quiz";
import { submitQuizLead } from "@/lib/quiz.functions";
import { QuizResults } from "./QuizResults";
import { QuizContactForm } from "./QuizContactForm";

export function QuizModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0); 
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resultScenarioIds, setResultScenarioIds] = useState<string[]>([]);

  // Filter steps based on current answers
  const visibleSteps = QUIZ_CONFIG.steps.filter(s => !s.showIf || s.showIf(answers));
  const currentStep = visibleSteps[step - 1];
  const isLastQuestion = step === visibleSteps.length;
  const isResultsStep = step === visibleSteps.length + 1;
  const isContactStep = step === visibleSteps.length + 2;

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
      alert("Что-то пошло не так, попробуйте ещё раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto bg-[#1C3C8C]/40 p-4 backdrop-blur-sm sm:items-center sm:p-6 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      role="presentation"
    >
      <div className="relative my-auto w-full max-w-[640px] ds-card p-5 sm:p-8 xl:p-10 transition-transform duration-300 scale-100">
        <button 
          onClick={onClose} 
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-[0.5rem] border border-[#daebff] bg-[#EFF6FF] text-[#1C3C8C] transition-colors hover:bg-white z-10"
          aria-label="Закрыть"
        >
          <X size={18} />
        </button>

        {isSuccess ? (
          <div className="py-12 text-center animate-in zoom-in-95 duration-500">
            <h2 className="font-noto-serif-narrow ds-h3 text-[#1c3c8c]">Спасибо!</h2>
            <p className="mt-4 text-[#566A93]">Ваша программа принята.</p>
            <button onClick={onClose} className="btn-primary mt-8 w-full">Вернуться на сайт</button>
          </div>
        ) : step === 0 ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="font-noto-serif-narrow ds-h3 text-[#1c3c8c] leading-tight">{QUIZ_CONFIG.title}</h2>
            <p className="mt-3 text-[15px] leading-[1.5] text-[#566A93] sm:text-[16px]">{QUIZ_CONFIG.subtitle}</p>
            <button onClick={handleNext} className="btn-primary mt-8 w-full">Подобрать программу</button>
          </div>
        ) : isResultsStep ? (
          <QuizResults scenarioIds={resultScenarioIds} onNext={handleNext} />
        ) : isContactStep ? (
          <QuizContactForm onSubmit={onContactSubmit} isSubmitting={isSubmitting} />
        ) : (
          <div className="py-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-center justify-between mb-8">
              <span className="text-[10px] font-bold text-[#A2CFFE] uppercase tracking-[0.2em]">Вопрос {step} из {visibleSteps.length}</span>
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
                        setAnswers({ ...answers, [currentStep.id]: [opt.text], goal: currentStep.id === "goal" ? opt.text : answers.goal });
                        setTimeout(handleNext, 300);
                      } else {
                        const exists = current.includes(opt.text);
                        setAnswers({ ...answers, [currentStep.id]: exists ? current.filter(t => t !== opt.text) : [...current, opt.text] });
                      }
                    }}
                    className={`w-full text-left p-4 rounded-[0.5rem] border transition-all ${isSelected ? "border-[#1C3C8C] bg-white" : "bg-[#EFF6FF] text-[#566A93]"}`}
                  >
                    <span className="font-medium text-base">{opt.text}</span>
                  </button>
                );
              })}
            </div>
            <button onClick={handleBack} className="text-[#566A93]">Назад</button>
          </div>
        )}
      </div>
    </div>
  );
}