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
  const [method, setMethod] = useState("whatsapp");
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
              { id: "whatsapp", label: "WhatsApp" },
              { id: "telegram", label: "Telegram" },
              { id: "max", label: "Max" },
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
              name="consent"
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
            Нажимая кнопку, вы соглашаетесь с{" "}'''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''
                                        
                                            
                                            Стоп! не нужно никуда вставлять текст! Я прошу тебя провести аудит по плану "Выступи как технический SEO-специалист и проведи полный SEO-аудит текущего проекта.

Цель проекта:

[опиши нишу, услугу или товар]

Целевая аудитория:

[опиши целевую аудиторию]

Основной регион продвижения:

[город, страна или несколько регионов]

Основные ключевые запросы:

[вставь ключевые слова]

Проверь:

1. Структуру страниц и URL.

2. Наличие и уникальность title и meta description.

3. Корректность H1, H2 и иерархии заголовков.

4. Логику размещения ключевых слов.

5. Соответствие текста поисковому намерению пользователя.

6. Дублирование заголовков, мета-тегов и контента.

7. Canonical, robots.txt и sitemap.xml, если они предусмотрены.

8. Индексацию важных страниц.

9. Внутреннюю перелинковку.

10. Alt-тексты изображений.

11. Schema.org и структурированные данные.

12. Open Graph и превью ссылок в социальных сетях.

13. Мобильную версию.

14. Скорость загрузки и возможные проблемы Core Web Vitals.

15. Семантическую HTML-разметку.

16. Доступность элементов для поисковых роботов и пользователей.

17. Локальные SEO-сигналы, если проект ориентирован на конкретный город.

18. Ошибки, которые могут препятствовать индексации.

Правила:

- Сначала только проанализируй проект.

- Не изменяй код, тексты или структуру без моего отдельного подтверждения.

- Если данных недостаточно, укажи, чего именно не хватает.

- Не выдумывай результаты тестов, если ты не можешь их реально выполнить.

- Для каждого обнаруженного нарушения укажи конкретный файл, компонент или блок, если это возможно.

- Разделяй критические, важные и второстепенные проблемы.

После проверки подготовь отчёт в формате:

# SEO-аудит

## 1. Общая оценка

- SEO-состояние проекта: от 0 до 100.

- Краткий вывод.

- Главные риски.

## 2. Таблица проблем

| Приоритет | Проблема | Где обнаружена | Почему это важно | Как исправить |

## 3. Что уже сделано хорошо

- ...

## 4. Технические рекомендации

- ...

## 5. Рекомендации по контенту

- ...

## 6. План исправлений

Раздели задачи на:

- Срочно.

- В течение недели.

- В дальнейшем.

## 7. Итог

Укажи 5 наиболее важных действий в правильном порядке."
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

      {/* Honeypot for spam bots */}
      <div className="absolute opacity-0 -z-10 w-0 h-0 overflow-hidden" aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>
    </form>
  );
}
