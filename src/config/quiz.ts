// ============= Full file contents =============
// src/config/quiz.ts

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
  title: "Подберём идеальную процедуру",
  subtitle: "Ответьте на несколько вопросов — подберем лучшее для вас",
  steps: [
    {
      id: "goal",
      question: "Главная цель визита",
      type: "single",
      options: [
        { id: "relax", text: "Глубоко расслабиться" },
        { id: "back_neck", text: "Снять напряжение (спина, шея)" },
        { id: "lightness", text: "Убрать отёчность, тяжесть" },
        { id: "face", text: "Уход за лицом" },
        { id: "wellness", text: "Оздоровительные практики" },
        { id: "unsure", text: "Не знаю, нужна рекомендация" },
      ],
    },
    // Branch Relax
    {
      id: "relax_area",
      question: "Что хочется расслабить?",
      type: "single",
      showIf: (a) => a.goal === "relax",
      options: [
        { id: "whole_body", text: "Всё тело" },
        { id: "back_neck", text: "Спина, плечи, шея" },
        { id: "head", text: "Голова" },
        { id: "legs", text: "Ноги" },
      ],
    },
    {
      id: "relax_intensity",
      question: "Какой формат воздействия?",
      type: "single",
      showIf: (a) => a.goal === "relax",
      options: [
        { id: "soft", text: "Мягко и спокойно" },
        { id: "deep", text: "Глубокая проработка" },
      ],
    },
    // Branch Back/Neck
    {
      id: "back_area",
      question: "Где напряжение?",
      type: "multiple",
      showIf: (a) => a.goal === "back_neck",
      options: [
        { id: "neck", text: "Шея" },
        { id: "shoulders", text: "Плечи" },
        { id: "upper_back", text: "Верх спины" },
        { id: "lower_back", text: "Поясница" },
      ],
    },
    {
      id: "back_result",
      question: "Какой результат?",
      type: "single",
      showIf: (a) => a.goal === "back_neck",
      options: [
        { id: "quick_relief", text: "Снять напряжение" },
        { id: "deep_work", text: "Глубокая работа" },
      ],
    },
    // Branch Lightness
    {
      id: "lightness_area",
      question: "Где тяжесть?",
      type: "multiple",
      showIf: (a) => a.goal === "lightness",
      options: [
        { id: "whole_body", text: "Всё тело" },
        { id: "legs", text: "Ноги" },
        { id: "face", text: "Лицо" },
      ],
    },
    // Branch Face
    {
      id: "face_goal",
      question: "Что получить?",
      type: "multiple",
      showIf: (a) => a.goal === "face" || (a.goal === "lightness" && a.lightness_area?.includes("face")),
      options: [
        { id: "swelling", text: "Убрать отёчность" },
        { id: "freshness", text: "Свежесть" },
      ],
    },
    {
      id: "face_format",
      question: "Какой формат?",
      type: "single",
      showIf: (a) => a.goal === "face" || (a.goal === "lightness" && a.lightness_area?.includes("face")),
      options: [
        { id: "classic_face", text: "Массаж лица" },
        { id: "lymph_face", text: "Лимфодренаж лица" },
        { id: "hirudo_cosm", text: "Косметические пиявки" },
      ],
    },
    // Branch Wellness
    {
      id: "wellness_type",
      question: "Какая практика?",
      type: "multiple",
      showIf: (a) => a.goal === "wellness",
      options: [
        { id: "cups", text: "Банки" },
        { id: "hirudo", text: "Пиявки" },
        { id: "ketgut", text: "Кетгут" },
      ],
    },
    {
      id: "wellness_add",
      question: "Нужен массаж?",
      type: "single",
      showIf: (a) => a.goal === "wellness",
      options: [
        { id: "yes", text: "Да, массаж" },
        { id: "no", text: "Только практика" },
      ],
    },
    // Branch Unsure
    {
      id: "unsure_direction",
      question: "Что ближе?",
      type: "single",
      showIf: (a) => a.goal === "unsure",
      options: [
        { id: "relax", text: "Расслабиться" },
        { id: "wellness", text: "Практики" },
      ],
    },
  ],
  services: [
    { id: "vector", name: "Векторный массаж", duration: "120 мин", price: "5 000 ₽", tags: ["relax", "spine"], description: "Комплексная работа с телом." },
    { id: "classic-spine", name: "Классический — спина/шея", duration: "30 мин", price: "1 500 ₽", tags: ["spine"], description: "Акцент на зажимы." },
    { id: "lymph-face", name: "Лимфодренажный — лицо", duration: "40 мин", price: "2 000 ₽", tags: ["face"], description: "Свежесть и тонус." },
    { id: "girudo-cosm", name: "Косметические пиявки", duration: "40 мин", price: "от 600 ₽", tags: ["face"], isWellness: true, description: "Природный лифтинг." },
  ],
};
