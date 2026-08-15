import { useState } from "react";
import { Loader2, Check } from "lucide-react";

export function QuizContactForm({ 
  onSubmit, 
  isSubmitting 
}: { 
  onSubmit: (data: { name: string; phone: string; method: string }) => void;
  isSubmitting: boolean;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState("whatsapp");
  const [consent, setConsent] = useState(true);
  const [phoneError, setPhoneError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      setPhoneError(true);
      return;
    }
    onSubmit({ name, phone, method });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="pr-12">
        <h3 className="font-noto-serif-narrow ds-h3 text-[#1c3c8c] mb-2">Куда отправить результат?</h3>
        <p className="mt-3 text-[15px] leading-[1.5] text-[#566A93] sm:text-[16px]">Оставьте контакты, чтобы мы могли закрепить за вами спецпредложение на первый визит.</p>
      </div>

      <div className="space-y-4">
        <label className="block">
          <span className="text-[14px] leading-[1.5] text-[#1C3C8C]">Ваше имя</span>
          <input 
            required
            type="text" 
            placeholder="Как к вам обращаться" 
            className="h-[52px] w-full rounded-[0.5rem] border border-[#daebff] bg-[#EFF6FF] px-4 text-[16px] text-[#566A93] outline-none transition-colors placeholder:text-[#566A93] focus:border-[#1C3C8C] focus:bg-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="block">
          <span className="text-[14px] leading-[1.5] text-[#1C3C8C]">Номер телефона</span>
          <input 
            required
            type="tel" 
            placeholder="+7 (___) ___-__-__" 
            className={`h-[52px] w-full rounded-[0.5rem] border bg-[#EFF6FF] px-4 text-[16px] text-[#566A93] outline-none transition-colors placeholder:text-[#566A93] focus:border-[#1C3C8C] focus:bg-white ${
              phoneError ? "border-red-400" : "border-[#daebff]"
            }`}
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setPhoneError(false);
            }}
          />
          {phoneError && <span className="text-xs text-red-500 mt-1 block">Введите корректный номер</span>}
        </label>

        <div className="space-y-2">
          <span className="text-[14px] leading-[1.5] text-[#1C3C8C] block">Удобный способ связи</span>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: "whatsapp", label: "WhatsApp" },
              { id: "telegram", label: "Telegram" },
            ].map(m => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMethod(m.id)}
                className={`h-[48px] rounded-[0.5rem] border text-sm font-medium transition-all ${
                  method === m.id ? "bg-white border-[#1C3C8C] text-[#1C3C8C]" : "bg-[#EFF6FF] border-[#daebff] text-[#566A93]"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative mt-1">
            <input 
              type="checkbox" 
              className="peer sr-only" 
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
            <div className="h-5 w-5 rounded-[6px] border border-[#A2CFFE] bg-[#EFF6FF] peer-checked:bg-[#88C1FF] peer-checked:border-[#88C1FF] transition-all" />
            <Check size={14} strokeWidth={3} className="absolute inset-0 m-auto text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
          </div>
          <span className="text-xs text-[#566A93] leading-relaxed group-hover:text-[#1c3c8c] transition-colors">
            Оставляя контакты, вы соглашаетесь с политикой обработки персональных данных. Мы не передаём ваши данные третьим лицам.
          </span>
        </label>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting || !consent}
        className="btn-primary w-full h-14 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
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
