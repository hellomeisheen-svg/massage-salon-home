export interface QuizOption {
  id: number;
  text: string;
}

export interface QuizStepConfig {
  id: number;
  question: string;
  type: "single" | "multiple";
  options: QuizOption[];
}

export interface QuizService {
  id: string;
  name: string;
  duration: string;
  price: string;
  tags: string[];
  description?: string;
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
  subtitle: "Ответьте на 6 коротких вопросов — получите персональную рекомендацию и спецпредложение на первый визит",
  steps: [
    {
      id: 1,
      question: "Главная цель визита",
      type: "single",
      options: [
        { id: 1, text: "Глубоко расслабиться, «выключить голову» и отпустить тело" },
        { id: 2, text: "Снять напряжение в спине, шее, плечах (после работы/за рулём)" },
        { id: 3, text: "Убрать отёчность, ощущение тяжести в теле" },
        { id: 4, text: "Улучшить состояние кожи лица, свежесть, тонус" },
        { id: 5, text: "Оздоровиться, поддержать организм (включая восточные/восстановительные техники)" },
        { id: 6, text: "Не знаю, хочу рекомендацию специалиста" },
      ],
    },
    {
      id: 2,
      question: "Что вас беспокоит прямо сейчас?",
      type: "multiple",
      options: [
        { id: 1, text: "Усталость, ощущение «выжатости», трудно расслабиться" },
        { id: 2, text: "Боль/зажимы в спине, шее, плечах" },
        { id: 3, text: "Отёчность, тяжесть в ногах, ощущение «ватного» тела" },
        { id: 4, text: "Усталый вид лица, отёки после работы/перелётов" },
        { id: 5, text: "Тяжёлая голова, шум, трудно отключиться от мыслей" },
        { id: 6, text: "Хочу комплексно поработать с телом" },
        { id: 7, text: "Ничего конкретного, просто хочу отдохнуть" },
      ],
    },
    {
      id: 3,
      question: "Какой формат вам ближе?",
      type: "single",
      options: [
        { id: 1, text: "Быстро (20–40 минут)" },
        { id: 2, text: "Стандарт (60 минут)" },
        { id: 3, text: "Полноценный сеанс (120 минут)" },
        { id: 4, text: "Мне важна не длительность, а эффект" },
      ],
    },
    {
      id: 4,
      question: "Интенсивность воздействия",
      type: "single",
      options: [
        { id: 1, text: "Мягко, деликатно, без давления" },
        { id: 2, text: "Средне: приятно, но с проработкой мышц" },
        { id: 3, text: "Интенсивно, глубоко" },
        { id: 4, text: "Не знаю, доверюсь мастеру" },
      ],
    },
    {
      id: 5,
      question: "Зоны, на которые хочется сделать акцент",
      type: "multiple",
      options: [
        { id: 1, text: "Спина, шея, плечи" },
        { id: 2, text: "Голова, затылок" },
        { id: 3, text: "Лицо" },
        { id: 4, text: "Ноги (бёдра, голени, стопы)" },
        { id: 5, text: "Всё тело (комплексно)" },
        { id: 6, text: "Без акцента, доверюсь мастеру" },
      ],
    },
    {
      id: 6,
      question: "Интересуют ли вас оздоровительные техники?",
      type: "multiple",
      options: [
        { id: 1, text: "Банки (вакуумная терапия)" },
        { id: 2, text: "Гирудотерапия (медицинские пиявки)" },
        { id: 3, text: "Космитеческие пиявки для лица/кожи" },
        { id: 4, text: "Акупунктурный кетгут (восстановительная медицина)" },
        { id: 5, text: "Пока не интересно, хочу только массаж/лимфодренаж" },
      ],
    },
  ],
  services: [
    { id: "vector", name: "Векторный", duration: "120 мин", price: "5 000 ₽", tags: ["relax", "lymph", "wellness"] },
    { id: "lymph", name: "Лимфодренажный", duration: "120 мин", price: "5 000 ₽", tags: ["relax", "lymph"] },
    { id: "lymphatic", name: "Лимфатический", duration: "120 мин", price: "5 000 ₽", tags: ["relax", "lymph"] },
    { id: "classic-full", name: "Классический", duration: "60 мин", price: "2 000 ₽", tags: ["relax", "spine"] },
    { id: "classic-spine", name: "Классический — спина и шея", duration: "30 мин", price: "1 500 ₽", tags: ["spine"] },
    { id: "classic-face", name: "Классический — лицо", duration: "40 мин", price: "2 000 ₽", tags: ["face"] },
    { id: "classic-legs", name: "Классический — ноги/стопы", duration: "60 мин", price: "3 000 ₽", tags: ["legs"] },
    { id: "classic-head", name: "Классический — голова", duration: "20 мин", price: "1 000 ₽", tags: ["relax"] },
    { id: "cups-fire", name: "Стихия Огонь (стеклянные банки)", duration: "10 мин", price: "2 000 ₽", tags: ["cups", "wellness"] },
    { id: "cups-air", name: "Стихия Воздух (мягкие банки)", duration: "10-25 мин", price: "1 000-2 000 ₽", tags: ["cups", "wellness"] },
    { id: "girudo-med", name: "Гирудотерапия (медицинские пиявки)", duration: "", price: "пакеты 6/16/74", tags: ["hirudo", "wellness"] },
    { id: "girudo-cosm", name: "Гирудотерапия (косметические пиявки)", duration: "", price: "пакеты 6/10/20", tags: ["hirudo", "face", "wellness"] },
    { id: "ketgut", name: "Акупунктурный кетгут", duration: "", price: "по запросу", tags: ["ketgut", "wellness"] },
  ],
  scenarios: [
    {
      id: "deep-relax",
      title: "Глубокое расслабление и перезагрузка",
      description: "Вам подойдёт формат глубокой работы с телом, когда внимание уделяется не отдельной зоне, а всему состоянию. Это помогает «выключить голову», отпустить накопленное напряжение и почувствовать настоящий отдых.",
      recommendedServiceIds: ["vector", "lymph", "lymphatic"],
    },
    {
      id: "spine-tension",
      title: "Спина, шея, плечи: снять зажимы после работы",
      description: "Ваш запрос — сфокусированная работа с верхней частью тела. Это помогает выдохнуть после рабочего дня, убрать зажимы от статичной позы и вернуть лёгкость движениям.",
      recommendedServiceIds: ["classic-spine", "classic-full", "vector"],
    },
    {
      id: "body-lightness",
      title: "Лёгкость в теле: лимфодренаж и снятие отёчности",
      description: "Вам подойдут лимфодренажные техники: они поддерживают естественный отток жидкости, уменьшают отёчность и ощущение «ватного» тела. После сеансов обычно появляется ощущение лёгкости и спокойствия.",
      recommendedServiceIds: ["lymph", "lymphatic", "classic-legs"],
    },
    {
      id: "face-refresh",
      title: "Лицо: свежесть, тонус, отдых",
      description: "Для лица мы предлагаем деликатные техники: работа с лимфотоком, мимическими мышцами и общим тонусом кожи. Это помогает убрать отёчность, вернуть свежесть и ощущение отдыха.",
      recommendedServiceIds: ["classic-face", "girudo-cosm"],
    },
    {
      id: "wellness-practices",
      title: "Оздоровительные техники: банки, пиявки, кетгут",
      description: "Помимо массажа, у нас есть оздоровительные практики: вакуумная терапия (банки), гирудотерапия (медицинские и косметические пиявки) и акупунктурный кетгут. Они используются в рамках восстановительных программ для поддержки самочувствия и тонуса.",
      recommendedServiceIds: ["cups-fire", "cups-air", "girudo-med", "girudo-cosm", "ketgut"],
    },
    {
      id: "first-visit",
      title: "Первый визит: познакомиться с кабинетом",
      description: "Если вы впервые у нас, лучше начать с универсального формата. Это поможет познакомиться с кабинетом, мастером и понять, что вам ближе, а затем спокойно выбрать более специализированную программу.",
      recommendedServiceIds: ["classic-full", "classic-spine", "classic-head"],
    },
  ],
};

export function calculateResult(answers: Record<number, any[]>): string[] {
  const q1 = answers[1]?.[0] || "";
  const q2 = answers[2] || [];
  const q3 = answers[3]?.[0] || "";
  const q4 = answers[4]?.[0] || "";
  const q5 = answers[5] || [];
  const q6 = answers[6] || [];

  const results: string[] = [];

  // Logic 1: Wellness techniques
  const wellnessSelected = q6.some((a: string) => 
    ["Банки (вакуумная терапия)", "Гирудотерапия (медицинские пиявки)", "Космитеческие пиявки для лица/кожи", "Акупунктурный кетгут (восстановительная медицина)"].includes(a)
  );
  if (wellnessSelected || q1 === "Оздоровиться, поддержать организм (включая восточные/восстановительные техники)") {
    results.push("wellness-practices");
  }

  // Logic 2: Deep Relax
  if (q1 === "Глубоко расслабиться, «выключить голову» и отпустить тело" || q1 === "Хочу комплексно поработать с телом") {
    results.push("deep-relax");
  }

  // Logic 3: Spine
  if (q1 === "Снять напряжение в спине, шее, плечах (после работы/за рулём)" || q5.includes("Спина, шея, плечи")) {
    results.push("spine-tension");
  }

  // Logic 4: Edema/Lymph
  if (q1 === "Убрать отёчность, ощущение тяжести в теле" || q2.includes("Отёчность, тяжесть в ногах, ощущение «ватного» тела")) {
    results.push("body-lightness");
  }

  // Logic 5: Face
  if (q1 === "Улучшить состояние кожи лица, свежесть, тонус" || q5.includes("Лицо")) {
    results.push("face-refresh");
  }

  // Logic 6: First visit
  if (results.length === 0 || (q1 === "Не знаю, хочу рекомендацию специалиста" && q4 === "Не знаю, доверюсь мастеру")) {
    results.push("first-visit");
  }

  return Array.from(new Set(results)).slice(0, 2);
}
