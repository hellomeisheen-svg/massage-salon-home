import { useState, useRef } from "react";
import { Loader2, Check } from "lucide-react";

// Из любого ввода достаём до 10 «абонентских» цифр (без кода страны 7/8)
function extractDigits(raw: string) {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("7") || digits.startsWith("8")) {
    digits = digits.slice(1);
  }
  return digits.slice(0, 10);
}

function formatPhone(rest: string) {
  if (!rest) return "";
  let out = `+7 (${rest.slice(0, 3)}`;
  if (rest.length >= 3) out += ")";
  if (rest.length > 3) out += ` ${rest.slice(3, 6)}`;
  if (rest.length > 6) out += `-${rest.slice(6, 8)}`;
  if (rest.length > 8) out += `-${rest.slice(8, 10)}`;
  return out;
}

export function QuizContactForm({ 
  onSubmit, 
  isSubmitting 
}: { 
  onSubmit: (data: { name: string; phone: string; method: string; website?: string }) => void;
  isSubmitting: boolean;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState("whatsapp");
  const [consent, setConsent] = useState(true);
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
    
    if (phone.length !== 10) {
      setPhoneError("Введите номер телефона полностью");
      ok = false;
    } else {
      setPhoneError(null);
    }
    
    if (!consent) {
      setConsentError("Отметьте согласие с политикой конфиденциальности");
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
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="pr-12">
        <h3 className="font-noto-serif-narrow ds-h3 text-[#1C3C8C] mb-2">Куда отправить результат?</h3>
        <p className="mt-3 text-[15px] leading-[1.5] text-[#566A93] sm:text-[16px]">Оставьте контакты, чтобы мы могли закрепить за вами спецпредложение на первый визит.</p>
      </div>

      <div className="space-y-4">
        <label className="flex flex-col gap-2">
          <span className="text-[14px] leading-[1.5] text-foreground">Ваше имя</span>
          <input 
            name="name"
            required
            autoComplete="name"
            placeholder="Как к вам обращаться" 
            className="h-[52px] w-full rounded-[0.5rem] border border-[#daebff] bg-[#EFF6FF] px-4 text-[16px] text-foreground outline-none transition-colors placeholder:text-[#566A93] focus:border-[#1C3C8C] focus:bg-white"
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
            className={`h-[52px] w-full rounded-[0.5rem] border bg-[#EFF6FF] px-4 text-[16px] text-foreground outline-none transition-colors placeholder:text-[#566A93] focus:border-[#1C3C8C] focus:bg-white ${
              phoneError ? "border-[#C0392B]" : "border-[#daebff]"
            }`}
            value={formatPhone(phone)}
            onChange={handlePhoneInput}
          />
          {phoneError && <span className="text-[13px] leading-[1.5] text-[#C0392B]">{phoneError}</span>}
        </label>

        <div className="space-y-2">
          <span className="text-[14px] leading-[1.5] text-foreground block">Удобный способ связи</span>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "whatsapp", label: "WhatsApp" },
              { id: "telegram", label: "Telegram" },
              { id: "max", label: "MAX" },
            ].map(m => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMethod(m.id)}
                className={`h-[48px] rounded-[0.5rem] border text-xs font-medium transition-all ${
                  method === m.id ? "bg-white border-[#1C3C8C] text-[#1C3C8C]" : "bg-[#EFF6FF] border-[#daebff] text-[#566A93]"
                }`}
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
              name="consent"
              checked={consent}
              onChange={(e) => {
                setConsent(e.target.checked);
                if (e.target.checked) setConsentError(null);
              }}
              className="peer h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-[6px] border border-[#A2CFFE] bg-[#EFF6FF] transition-colors hover:border-[#5DAAFD] checked:border-[#88C1FF] checked:bg-[#88C1FF] checked:hover:bg-[#5DAAFD] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5DAAFD]"
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
              политикой конфиденциальности
            </a>
            .
          </span>
        </label>
        {consentError && <p className="text-[13px] leading-[1.5] text-[#C0392B]">{consentError}</p>}
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="btn-primary w-full h-14 flex items-center justify-center gap-3"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            <span>Отправка...</span>
          </>
        ) : (
          "Получить рекомендации"
        )}
      </button>

      {/* Honeypot for spam bots */}
      <div className="absolute opacity-0 -z-10 w-0 h-0 overflow-hidden" aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>
    </form>
  );
}
