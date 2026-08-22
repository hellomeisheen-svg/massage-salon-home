import { useState, useRef } from "react";
import { Loader2, Check } from "lucide-react";
import { extractDigits, formatPhone } from "@/lib/utils";


export function QuizContactForm({ 
  onSubmit, 
  isSubmitting,
  error 
}: { 
  onSubmit: (data: { name: string; phone: string; method: string; website?: string }) => void;
  isSubmitting: boolean;
  error?: string | null;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState("WhatsApp");
  const [consent, setConsent] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [consentError, setConsentError] = useState<string | null>(null);
  
  const handlePhoneInput = (e: React.FormEvent<HTMLInputElement>) => {
    const native = e.nativeEvent as InputEvent;
    const raw = (e.target as HTMLInputElement).value;
    let next = extractDigits(raw);
    const deleting = typeof native?.inputType === "string" && native.inputType.startsWith("delete");
    // при удалении разделителя цифры не меняются — убираем последнюю цифру
    if (deleting && next === phone) next = next.slice(0, -1);
    setPhone(next);
    if (next.length === 10) setPhoneError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let ok = true;
    
    if (!name.trim()) {
      ok = false;
    }

    if (phone.length !== 10) {
      setPhoneError("Пожалуйста, введите телефон");
      ok = false;
    } else {
      setPhoneError(null);
    }
    
    if (!consent) {
      setConsentError("Пожалуйста, отметьте согласие");
      ok = false;
    } else {
      setConsentError(null);
    }
    
    if (!ok) return;
    
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const honeypot = formData.get("website") as string;
    
    onSubmit({ 
      name, 
      phone: formatPhone(phone), 
      method, 
      website: honeypot 
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="pr-12">
        <h3 className="font-noto-serif-narrow ds-h3 text-[#1C3C8C] mb-2">Куда отправить результат?</h3>
        <p className="mt-3 text-[15px] leading-[1.5] text-[#566A93] sm:text-[16px]">Оставьте контакты, чтобы я могла закрепить за вами спецпредложение на первый визит.</p>
      </div>

      <div className="space-y-4">
        <label className="flex flex-col gap-2">
          <span className="text-[14px] leading-[1.5] text-foreground">Ваше имя</span>
          <input 
            name="name"
            required
            autoComplete="name"
            placeholder="Пожалуйста, укажите имя" 
            className="ds-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[14px] leading-[1.5] text-foreground">Номер телефона</span>
          <input 
            name="phone"
            type="tel"
            inputMode="numeric"
            required
            autoComplete="tel"
            placeholder="+7 (___) ___-__-__" 
            className={`ds-input ${phoneError ? "border-[#C0392B]" : ""}`}
            value={formatPhone(phone)}
            onChange={handlePhoneInput}
          />
          {phoneError && <span className="text-[13px] leading-[1.5] text-[#C0392B]">{phoneError}</span>}
        </label>

        <div className="space-y-2">
          <span className="text-[14px] leading-[1.5] text-foreground block">Где вам удобнее ответить?</span>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "WhatsApp", label: "WhatsApp" },
              { id: "Telegram", label: "Telegram" },
              { id: "Max", label: "Max" },
            ].map(m => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMethod(m.id)}
                className={`ds-toggle ${method === m.id ? "ds-toggle-active" : ""}`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
            <input 
              type="checkbox" 
              name="privacy_consent"
              value="Согласие получено"
              checked={consent}
              onChange={(e) => {
                setConsent(e.target.checked);
                if (e.target.checked) setConsentError(null);
              }}
              className="peer h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-[12px] border border-[#A2CFFE] bg-[#EFF6FF] transition-colors hover:border-[#5DAAFD] checked:border-[#88C1FF] checked:bg-[#88C1FF] checked:hover:bg-[#5DAAFD] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5DAAFD]"
            />
            <Check size={14} strokeWidth={3} className="pointer-events-none absolute text-white opacity-0 transition-opacity peer-checked:opacity-100" />
          </span>
          <span className="text-[13px] leading-[1.5] text-[#566A93]">
            Нажимая кнопку, вы соглашаетесь с{" "}
            <a
              href="/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              onClick={(e) => e.stopPropagation()}
            >
              Политикой конфиденциальности
            </a>
            .
          </span>
        </label>
        {consentError && (
          <p className="text-[13px] leading-[1.5] text-[#C0392B]">{consentError}</p>
        )}
      </div>

      {error && <p className="text-[13px] leading-[1.5] text-[#C0392B] text-center">{error}</p>}

      
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="btn-primary w-full h-14 mt-2 flex items-center justify-center gap-3"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            <span>Отправка...</span>
          </>
        ) : (
          "Получить результат"
        )}
      </button>

      <input type="hidden" name="messenger" value={method} />
      <input type="hidden" name="_subject" value="Новая запись (Квиз) с сайта" />
      <div className="absolute opacity-0 -z-10 w-0 h-0 overflow-hidden" aria-hidden="true">
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>
    </form>
  );
}
