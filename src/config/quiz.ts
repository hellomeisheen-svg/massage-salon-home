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
  title: "Подберу идеальную процедуру для вашего тела и настроения",
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
      question: "Дополнить массаж вакуумной техникой для лучшего эффекта?",
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
        { id: "cups_air", text: "Вакуумный массаж — мягкие инструменты" },
        { id: "cups_fire", text: "Вакуумный массаж — стеклянные инструменты" },
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
    { id: "vector", name: "Векторный массаж", duration: "2 часа", price: "5 000 ₽", tags: ["relax", "spine", "lymph", "wellness"], description: "Точная ручная работа с мышцами и фасциями по линиям тела: снимает глубокие зажимы и возвращает движениям свободу." },
    { id: "classic_full", name: "Классический массаж — всё тело", duration: "1 час", price: "3 000 ₽", tags: ["relax", "spine"], description: "Последовательная проработка спины, шеи, рук и ног в спокойном ритме для глубокого расслабления." },
    { id: "classic_spine_neck", name: "Классический массаж — спина и шея", duration: "30 минут", price: "1 500 ₽", tags: ["spine"], description: "Целенаправленная работа с наиболее нагруженными зонами: снимает зажимы и возвращает подвижность." },
    { id: "classic_face", name: "Классический массаж — лицо", duration: "40 минут", price: "2 000 ₽", tags: ["face"], description: "Бережная ручная работа с мимическими мышцами: расслабляет зажимы и освежает вид." },
    { id: "lymph_face", name: "Лимфодренажный массаж — лицо", duration: "40 минут", price: "2 000 ₽", tags: ["face"], description: "Деликатная работа с оттоком жидкости: уменьшает отёчность и поддерживает чёткий овал." },
    { id: "classic_legs", name: "Классический массаж — ноги и стопы", duration: "1 час", price: "3 000 ₽", tags: ["legs", "lymph"], description: "Точная работа с зонами ежедневной нагрузки: снимает усталость и тяжесть в ногах." },
    { id: "classic_head", name: "Классический массаж — голова", duration: "20 минут", price: "1 000 ₽", tags: ["relax"], description: "Мягкая работа с областью, где собирается стресс: помогает переключиться и отдохнуть." },
    { id: "cups_fire", name: "Вакуумный массаж — стеклянные инструменты", duration: "10 минут", price: "2 000 ₽", tags: ["wellness"], isWellness: true, description: "Глубокое вакуумное воздействие: прогревает зоны, снимает скованность и расслабляет мышцы." },
    { id: "cups_air", name: "Вакуумный массаж — мягкие инструменты", duration: "10–25 минут", price: "1 000 ₽", tags: ["wellness"], isWellness: true, description: "Деликатное вакуумное воздействие: уменьшает чувство тяжести и возвращает тканям подвижность." },
    { id: "girudo_med", name: "Гирудотерапия — медицинские пиявки", duration: "1,5–2 часа", price: "4 800 ₽", tags: ["wellness"], isWellness: true, description: "Постановка пиявок на выбранные зоны тела: поддержка микроциркуляции и общего самочувствия." },
    { id: "girudo_cosm", name: "Гирудотерапия — косметические пиявки", duration: "1,5–2 часа", price: "4 800 ₽", tags: ["face", "wellness"], isWellness: true, description: "Точная постановка пиявок на лицо и локальные зоны для свежего и отдохнувшего вида кожи." },
    { id: "ketgut", name: "Акупунктурный кетгут", duration: "1,5 часа", price: "20 000 ₽", tags: ["wellness"], isWellness: true, description: "30 саморассасывающихся нитей в акупунктурные точки: работает 2–3 месяца, поддерживая внутренний баланс." },
    { id: "lymphatic", name: "Лимфодренажный массаж — всё тело", duration: "2 часа", price: "5 000 ₽", tags: ["lymph", "relax"], description: "Мягкая работа с естественными путями оттока жидкости: уменьшает отёчность и возвращает лёгкость." },
  ],
};
