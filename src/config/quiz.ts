export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizStepConfig {
  id: string;
  question: string;
  type: "single" | "multiple";
  options: QuizOption[];
  showIf?: (answers: Record<string, any>) => boolean;
}

export interface QuizService {
  id: string;
  name: string;
  duration: string;
  price: string;
  tags: string[];
  description?: string;
  isWellness?: boolean;
}

export const QUIZ_CONFIG: {
  title: string;
  subtitle: string;
  steps: QuizStepConfig[];
  services: QuizService[];
} = {
  title: "Подберём идеальную процедуру для вашего тела и настроения",
  subtitle: "Ответьте на несколько коротких вопросов — получите персональную рекомендацию",
  steps: [
    {
      id: "goal",
      question: "Главная цель визита",
      type: "single",
      options: [
        { id: "relax", text: "Глубоко расслабиться и восстановить силы" },
        { id: "back_neck", text: "Снять напряжение и мышечную усталость" },
        { id: "lightness", text: "Убрать отёчность и вернуть лёгкость телу" },
        { id: "face", text: "Улучшить состояние кожи, свежесть и тонус лица" },
        { id: "wellness", text: "Поддержать организм восстановительными практиками" },
        { id: "unsure", text: "Получить рекомендацию специалиста по запросу" },
      ],
    },
    // Ветка 1. Глубокое расслабление
    {
      id: "relax_area",
      question: "Что хочется расслабить в первую очередь?",
      type: "single",
      showIf: (a) => a.goal === "relax",
      options: [
        { id: "whole_body", text: "Всё тело" },
        { id: "back_neck", text: "Спина, плечи и шея" },
        { id: "head", text: "Голова и затылок" },
        { id: "legs", text: "Ноги и стопы" },
        { id: "master_choice", text: "Не знаю, доверюсь мастеру" },
      ],
    },
    {
      id: "intensity",
      question: "Какой формат воздействия вам ближе?",
      type: "single",
      showIf: (a) => a.goal === "relax",
      options: [
        { id: "soft", text: "Мягко и спокойно" },
        { id: "deep", text: "С глубокой проработкой" },
        { id: "master_choice", text: "Не знаю, доверюсь мастеру" },
      ],
    },
    {
      id: "addCups",
      question: "Дополнить массаж постановкой банок для лучшего эффекта?",
      type: "single",
      showIf: (a) => a.goal === "relax" && ["whole_body", "back_neck"].includes(a.relax_area),
      options: [
        { id: "yes", text: "Да" },
        { id: "no", text: "Нет" },
        { id: "master_choice", text: "Не знаю, доверюсь мастеру" },
      ],
    },
    // Ветка 2. Спина, шея и плечи
    {
      id: "back_tension_area",
      question: "Где ощущается основное напряжение?",
      type: "multiple",
      showIf: (a) => a.goal === "back_neck",
      options: [
        { id: "neck", text: "Шея" },
        { id: "shoulders", text: "Плечи" },
        { id: "upper_back", text: "Верх спины" },
        { id: "lower_back", text: "Поясница" },
        { id: "whole_body", text: "Всё тело" },
        { id: "master_choice", text: "Не знаю, доверюсь мастеру" },
      ],
    },
    {
      id: "back_result",
      question: "Какой результат для вас важнее?",
      type: "single",
      showIf: (a) => a.goal === "back_neck",
      options: [
        { id: "quick_relief", text: "Быстро снять напряжение в конкретной зоне" },
        { id: "deep_work", text: "Глубоко проработать тело" },
        { id: "master_choice", text: "Не знаю, хочу рекомендацию мастера" },
      ],
    },
    // Ветка 3. Лёгкость и отёчность
    {
      id: "lightness_area",
      question: "Где ощущается тяжесть или отёчность?",
      type: "multiple",
      showIf: (a) => a.goal === "lightness",
      options: [
        { id: "whole_body", text: "Всё тело" },
        { id: "legs", text: "Ноги" },
        { id: "feet", text: "Стопы" },
        { id: "face", text: "Лицо" },
        { id: "master_choice", text: "Не знаю, доверюсь мастеру" },
      ],
    },
    // Ветка 4. Лицо (изолированная)
    {
      id: "face_goal",
      question: "Чего вы ждете от процедуры для лица?",
      type: "multiple",
      showIf: (a) => a.goal === "face" || (a.goal === "lightness" && Array.isArray(a.lightness_area) && a.lightness_area.length === 1 && a.lightness_area.includes("face")),
      options: [
        { id: "face_swelling", text: "Убрать отёчность" },
        { id: "freshness", text: "Вернуть свежесть и отдохнувший вид" },
        { id: "face_relaxation", text: "Расслабить мышцы лица" },
        { id: "wrinkles", text: "Разгладить морщины" },
        { id: "master_choice", text: "Не знаю, доверюсь мастеру" },
      ],
    },
    // Ветка 5. Оздоровительные практики
    {
      id: "wellness_type",
      question: "Какая практика вам интересна?",
      type: "multiple",
      showIf: (a) => a.goal === "wellness",
      options: [
        { id: "ketgut", text: "Акупунктурный кетгут" },
        { id: "hirudo_medical", text: "Медицинские пиявки" },
        { id: "hirudo_cosmetic", text: "Косметические пиявки" },
        { id: "cups_air", text: "Мягкие банки" },
        { id: "cups_fire", text: "Стеклянные банки" },
        { id: "master_choice", text: "Пока не знаю, хочу консультацию" },
      ],
    },
    // Ветка 6. Не знаю
    {
      id: "unsure_direction",
      question: "Что вам сейчас ближе?",
      type: "single",
      showIf: (a) => a.goal === "unsure",
      options: [
        { id: "relax", text: "Хочу расслабиться" },
        { id: "back_neck", text: "Беспокоит спина и шея" },
        { id: "lightness", text: "Чувствую тяжесть или отёчность" },
        { id: "face", text: "Хочу уход за лицом" },
        { id: "wellness", text: "Интересуют оздоровительные практики" },
        { id: "still_unsure", text: "Пока не могу определить" },
      ],
    },
  ],
  services: [
    { id: "vector", name: "Векторный массаж", duration: "120 мин", price: "5 000 ₽", tags: ["relax", "spine", "lymph", "wellness"], description: "Комплексная работа с телом, восстанавливающая естественный баланс." },
    { id: "lymph", name: "Лимфодренажный массаж", duration: "120 мин", price: "5 000 ₽", tags: ["lymph", "relax"], description: "Стимулирует отток лимфы, уменьшает отёчность и выводит токсины." },
    { id: "lymphatic", name: "Лимфатический массаж тела", duration: "120 мин", price: "5 000 ₽", tags: ["lymph", "relax"], description: "Глубокая проработка лимфатической системы для лёгкости в теле." },
    { id: "classic_full", name: "Классический массаж", duration: "60 мин", price: "2 000 ₽", tags: ["relax", "spine"], description: "Традиционная техника для снятия мышечного напряжения и отдыха." },
    { id: "classic_spine_neck", name: "Классический — спина и шея", duration: "30 мин", price: "1 500 ₽", tags: ["spine"], description: "Акцент на снятие зажимов в шейно-воротниковой зоне и спине." },
    { id: "classic_face", name: "Классический — лицо", duration: "40 мин", price: "2 000 ₽", tags: ["face"], description: "Поддерживает тонус мышц лица и улучшает цвет кожи." },
    { id: "lymph_face", name: "Лимфодренажный — лицо", duration: "40 мин", price: "2 000 ₽", tags: ["face"], description: "Деликатно выводит лишнюю жидкость, возвращая свежесть взгляду." },
    { id: "classic_legs", name: "Классический — ноги/стопы", duration: "60 мин", price: "3 000 ₽", tags: ["legs", "lymph"], description: "Снимает усталость и тяжесть в ногах после долгого дня." },
    { id: "classic_head", name: "Классический — голова", duration: "20 мин", price: "1 000 ₽", tags: ["relax"], description: "Помогает «выключить голову» и избавиться от эмоционального напряжения." },
    { id: "cups_fire", name: "Стихия Огонь (стеклянные банки)", duration: "10-20 мин", price: "2 000 ₽", tags: ["wellness"], isWellness: true, description: "Классическая интенсивная техника с глубоким вакуумным воздействием. Подходит как дополнение к массажу с глубокой проработкой." },
    { id: "cups_air", name: "Стихия Воздух (мягкие банки)", duration: "10-25 мин", price: "1 000-2 000 ₽", tags: ["wellness"], isWellness: true, description: "Мягкая вакуумная техника: мастер регулирует силу воздействия под ваши ощущения. Подходит для деликатного дополнения к расслабляющему массажу." },
    { id: "girudo_med", name: "Гирудотерапия (медицинские пиявки)", duration: "60-90 мин", price: "от 600 ₽ за шт", tags: ["wellness"], isWellness: true, description: "Биологически активное воздействие для комплексного оздоровления." },
    { id: "girudo_cosm", name: "Гирудотерапия (косметические пиявки)", duration: "40-60 мин", price: "от 600 ₽ за шт", tags: ["face", "wellness"], isWellness: true, description: "Природный лифтинг и улучшение микроциркуляции кожи лица." },
    { id: "ketgut", name: "Акупунктурный кетгут", duration: "30-60 мин", price: "по запросу", tags: ["wellness"], isWellness: true, description: "Длительное воздействие на биологически активные точки." },
  ],
};
