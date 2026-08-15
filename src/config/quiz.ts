export interface QuizOption {
  id: string | number;
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

export interface QuizScenario {
  id: string;
  title: string;
  description: string;
  recommendedServiceIds: string[];
}

export const QUIZ_CONFIG: {
  title: string;
  subtitle: string;
  steps: QuizStepConfig[];
  services: QuizService[];
  scenarios: QuizScenario[];
} = {
  title: "Подберём идеальную процедуру для вашего тела и настроения",
  subtitle: "Ответьте на несколько коротких вопросов — получите персональную рекомендацию",
  steps: [
    {
      id: "goal",
      question: "Главная цель визита",
      type: "single",
      options: [
        { id: "relax", text: "Глубоко расслабиться, «выключить голову» и отпустить тело" },
        { id: "back_neck", text: "Снять напряжение в спине, шее, плечах" },
        { id: "lightness", text: "Убрать отёчность и ощущение тяжести в теле" },
        { id: "face", text: "Улучшить состояние кожи лица, свежесть и тонус" },
        { id: "wellness", text: "Оздоровиться с помощью восстановительных практик" },
        { id: "unsure", text: "Не знаю, хочу рекомендацию специалиста" },
      ],
    },
    // Branch 1: Relax
    {
      id: "relax_area",
      question: "Что хочется расслабить в первую очередь?",
      type: "single",
      showIf: (a) => a.goal?.includes("Глубоко расслабиться"),
      options: [
        { id: "whole_body", text: "Всё тело" },
        { id: "back_neck", text: "Спина, плечи и шея" },
        { id: "head", text: "Голова и затылок" },
        { id: "legs", text: "Ноги и стопы" },
        { id: "master_choice", text: "Не знаю, доверюсь мастеру" },
      ],
    },
    {
      id: "relax_intensity",
      question: "Какой формат воздействия вам ближе?",
      type: "single",
      showIf: (a) => a.goal?.includes("Глубоко расслабиться"),
      options: [
        { id: "soft", text: "Мягко и спокойно" },
        { id: "deep", text: "С глубокой проработкой" },
        { id: "master_choice", text: "Не знаю, доверюсь мастеру" },
      ],
    },
    // Branch 2: Back/Neck
    {
      id: "back_tension_area",
      question: "Где ощущается основное напряжение?",
      type: "multiple",
      showIf: (a) => a.goal?.includes("Снять напряжение в спине"),
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
      showIf: (a) => a.goal?.includes("Снять напряжение в спине"),
      options: [
        { id: "quick_relief", text: "Быстро снять напряжение в конкретной зоне" },
        { id: "deep_work", text: "Глубоко проработать тело" },
        { id: "relaxation", text: "Просто расслабиться после работы" },
        { id: "master_choice", text: "Не знаю, хочу рекомендацию мастера" },
      ],
    },
    // Branch 3: Lightness
    {
      id: "lightness_area",
      question: "Где ощущается тяжесть или отёчность?",
      type: "multiple",
      showIf: (a) => a.goal?.includes("Убрать отёчность"),
      options: [
        { id: "whole_body", text: "Всё тело" },
        { id: "legs", text: "Ноги" },
        { id: "feet", text: "Стопы" },
        { id: "face", text: "Лицо" },
        { id: "master_choice", text: "Не знаю, доверюсь мастеру" },
      ],
    },
    // Branch 4: Face
    {
      id: "face_goal",
      question: "Что хочется получить от процедуры для лица?",
      type: "multiple",
      showIf: (a) => a.goal?.includes("Улучшить состояние кожи лица") || (a.goal?.includes("Убрать отёчность") && a.lightness_area?.includes("Лицо") && a.lightness_area?.length === 1),
      options: [
        { id: "face_swelling", text: "Убрать отёчность" },
        { id: "freshness", text: "Вернуть свежесть и отдохнувший вид" },
        { id: "face_relaxation", text: "Расслабить мышцы лица" },
        { id: "mimic_zones", text: "Поработать с мимическими зонами" },
        { id: "delicate_care", text: "Хочу деликатный уход" },
        { id: "master_choice", text: "Не знаю, доверюсь мастеру" },
      ],
    },
    {
      id: "face_format",
      question: "Какой формат ухода вам ближе?",
      type: "single",
      showIf: (a) => a.goal?.includes("Улучшить состояние кожи лица") || (a.goal?.includes("Убрать отёчность") && a.lightness_area?.includes("Лицо") && a.lightness_area?.length === 1),
      options: [
        { id: "classic_face", text: "Массаж лица" },
        { id: "lymph_face", text: "Лимфодренаж лица" },
        { id: "cosmetic_hirudo", text: "Косметические пиявки" },
        { id: "master_choice", text: "Не знаю, хочу рекомендацию специалиста" },
      ],
    },
    // Branch 5: Wellness
    {
      id: "wellness_type",
      question: "Какая практика вам интересна?",
      type: "multiple",
      showIf: (a) => a.goal?.includes("Оздоровиться с помощью восстановительных практик"),
      options: [
        { id: "cups_air", text: "Мягкие банки" },
        { id: "cups_fire", text: "Стеклянные банки" },
        { id: "hirudo_medical", text: "Медицинские пиявки" },
        { id: "hirudo_cosmetic", text: "Косметические пиявки" },
        { id: "ketgut", text: "Акупунктурный кетгут" },
        { id: "master_choice", text: "Пока не знаю, хочу консультацию" },
      ],
    },
    {
      id: "wellness_massage",
      question: "Нужно ли дополнить практику массажем?",
      type: "single",
      showIf: (a) => a.goal?.includes("Оздоровиться с помощью восстановительных практик"),
      options: [
        { id: "add_relax_massage", text: "Да, хочу расслабляющий массаж" },
        { id: "add_back_neck_massage", text: "Да, хочу массаж спины и шеи" },
        { id: "wellness_only", text: "Нет, интересует только практика" },
        { id: "master_choice", text: "Не знаю, пусть подскажет мастер" },
      ],
    },
    // Branch 6: Unsure
    {
      id: "unsure_direction",
      question: "Что вам сейчас ближе?",
      type: "single",
      showIf: (a) => a.goal?.includes("Не знаю, хочу рекомендацию"),
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
    { id: "classic-full", name: "Классический массаж", duration: "60 мин", price: "2 000 ₽", tags: ["relax", "spine"], description: "Традиционная техника для снятия мышечного напряжения и отдыха." },
    { id: "classic-spine", name: "Классический — спина и шея", duration: "30 мин", price: "1 500 ₽", tags: ["spine"], description: "Акцент на снятие зажимов в шейно-воротниковой зоне и спине." },
    { id: "classic-face", name: "Классический — лицо", duration: "40 мин", price: "2 000 ₽", tags: ["face"], description: "Поддерживает тонус мышц лица и улучшает цвет кожи." },
    { id: "lymph-face", name: "Лимфодренажный — лицо", duration: "40 мин", price: "2 000 ₽", tags: ["face"], description: "Деликатно выводит лишнюю жидкость, возвращая свежесть взгляду." },
    { id: "classic-legs", name: "Классический — ноги/стопы", duration: "60 мин", price: "3 000 ₽", tags: ["legs", "lymph"], description: "Снимает усталость и тяжесть в ногах после долгого дня." },
    { id: "classic-head", name: "Классический — голова", duration: "20 мин", price: "1 000 ₽", tags: ["relax"], description: "Помогает «выключить голову» и избавиться от эмоционального напряжения." },
    { id: "cups-fire", name: "Стихия Огонь (стеклянные банки)", duration: "10-20 мин", price: "2 000 ₽", tags: ["wellness"], isWellness: true, description: "Древняя техника для улучшения кровообращения и снятия болей." },
    { id: "cups-air", name: "Стихия Воздух (мягкие банки)", duration: "10-25 мин", price: "1 000-2 000 ₽", tags: ["wellness"], isWellness: true, description: "Бережная вакуумная терапия для расслабления и лимфодренажа." },
    { id: "girudo-med", name: "Гирудотерапия (медицинские пиявки)", duration: "60-90 мин", price: "от 600 ₽ за шт", tags: ["wellness"], isWellness: true, description: "Биологически активное воздействие для комплексного оздоровления." },
    { id: "girudo-cosm", name: "Гирудотерапия (косметические пиявки)", duration: "40-60 мин", price: "от 600 ₽ за шт", tags: ["face", "wellness"], isWellness: true, description: "Природный лифтинг и улучшение микроциркуляции кожи лица." },
    { id: "ketgut", name: "Акупунктурный кетгут", duration: "30-60 мин", price: "по запросу", tags: ["wellness"], isWellness: true, description: "Длительное воздействие на биологически активные точки." },
  ],
  scenarios: [
    { id: "relax", title: "Глубокое расслабление", description: "Вам подойдёт формат глубокой работы с телом для восстановления сил.", recommendedServiceIds: ["vector"] },
    { id: "back_neck", title: "Снятие напряжения: спина и шея", description: "Фокус на работу с зажимами в верхней части тела.", recommendedServiceIds: ["classic-spine", "vector"] },
    { id: "lightness", title: "Лёгкость и лимфодренаж", description: "Техники, направленные на снятие отёчности и тяжести.", recommendedServiceIds: ["lymph", "lymphatic"] },
    { id: "face", title: "Уход за лицом", description: "Деликатные техники для свежести и тонуса кожи.", recommendedServiceIds: ["lymph-face", "classic-face", "girudo-cosm"] },
    { id: "wellness", title: "Оздоровительные практики", description: "Восстановительные техники для поддержки организма.", recommendedServiceIds: [] },
    { id: "first-visit", title: "Первый визит", description: "Если вы впервые у нас, рекомендуем начать с векторного массажа.", recommendedServiceIds: ["vector", "classic-full"] },
  ],
};

export function calculateResult(answers: Record<string, any>): string[] {
  const goal = answers.goal?.[0] || "";
  
  // Rule 4: Isolated Face branch
  if (goal.includes("кожи лица") || (goal.includes("Убрать отёчность") && answers.lightness_area?.includes("Лицо") && answers.lightness_area?.length === 1)) {
    return ["face"];
  }

  if (goal.includes("расслабиться")) return ["relax"];
  if (goal.includes("спине, шее")) return ["back_neck"];
  if (goal.includes("отёчность")) return ["lightness"];
  if (goal.includes("Оздоровиться")) return ["wellness"];
  
  // Unsure with sub-selection
  if (goal.includes("Не знаю")) {
    const dir = answers.unsure_direction?.[0] || "";
    if (dir.includes("расслабиться")) return ["relax"];
    if (dir.includes("спина")) return ["back_neck"];
    if (dir.includes("отёчность")) return ["lightness"];
    if (dir.includes("лицом")) return ["face"];
    if (dir.includes("практики")) return ["wellness"];
    return ["first-visit"];
  }

  return ["first-visit"];
}
