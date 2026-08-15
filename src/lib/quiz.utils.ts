import { QUIZ_CONFIG, QuizService } from "@/config/quiz";

export function calculateResult(answers: Record<string, any>): QuizService[] {
  const goal = answers.goal;
  const getService = (id: string) => QUIZ_CONFIG.services.find(s => s.id === id);
  
  let serviceIds: string[] = [];
  
  // Ветка 6: Не знаю (unsure) -> перенаправление в другие ветки или основная рекомендация
  if (goal === "unsure") {
    const dir = answers.unsure_direction;
    if (dir === "relax") return calculateResult({ ...answers, goal: "relax" });
    if (dir === "back_neck") return calculateResult({ ...answers, goal: "back_neck" });
    if (dir === "lightness") return calculateResult({ ...answers, goal: "lightness" });
    if (dir === "face") return calculateResult({ ...answers, goal: "face" });
    if (dir === "wellness") return calculateResult({ ...answers, goal: "wellness" });
    
    // Если все еще неясно (still_unsure) - рекомендация для первого визита
    return [getService("vector"), getService("classic-full")].filter((s): s is QuizService => !!s);
  }

  // Ветка 4: Лицо (face) - изолирована
  const isFacePath = goal === "face" || (goal === "lightness" && answers.lightness_area?.length === 1 && answers.lightness_area.includes("face"));
  if (isFacePath) {
    const format = answers.face_format;
    if (format === "classic_face") serviceIds = ["classic_face"];
    else if (format === "lymph_face") serviceIds = ["lymph-face"];
    else if (format === "cosmetic_hirudo") serviceIds = ["girudo-cosm"];
    else serviceIds = ["lymph-face", "classic-face", "girudo-cosm"];
    
    return serviceIds.map(id => getService(id)).filter((s): s is QuizService => !!s).slice(0, 3);
  }

  // Ветка 1: Глубокое расслабление (relax)
  if (goal === "relax") {
    const area = answers.relax_area;
    if (area === "whole_body") serviceIds = ["vector"];
    else if (area === "back_neck") serviceIds = ["vector", "classic-spine"];
    else if (area === "head") serviceIds = ["classic-head", "vector"];
    else if (area === "legs") serviceIds = ["classic-legs", "vector"];
    else serviceIds = ["vector"];
  }

  // Ветка 2: Спина, шея и плечи (back_neck)
  else if (goal === "back_neck") {
    const res = answers.back_result;
    const areas = answers.back_tension_area || [];
    const isUpper = areas.includes("neck") || areas.includes("shoulders") || areas.includes("upper_back");
    
    if (res === "quick_relief" && isUpper) serviceIds = ["classic-spine"];
    else if (res === "deep_work") serviceIds = ["vector"];
    else if (res === "relaxation") serviceIds = ["classic-full", "vector"];
    else serviceIds = ["classic-spine", "vector"];
  }

  // Ветка 3: Лёгкость и отёчность (lightness)
  else if (goal === "lightness") {
    const areas = answers.lightness_area || [];
    if (areas.includes("legs") || areas.includes("feet")) serviceIds = ["classic-legs", "lymph", "lymphatic"];
    else if (areas.includes("whole_body")) serviceIds = ["lymph", "lymphatic", "vector"];
    else serviceIds = ["lymph", "lymphatic"];
  }

  // Ветка 5: Оздоровительные практики (wellness)
  else if (goal === "wellness") {
    const practiceMapping: Record<string, string> = {
      cups_air: "cups-air",
      cups_fire: "cups-fire",
      hirudo_medical: "girudo-med",
      hirudo_cosmetic: "girudo-cosm",
      ketgut: "ketgut"
    };
    
    const selectedPractices = (answers.wellness_type || []).map((id: string) => practiceMapping[id]).filter(Boolean);
    const massageType = answers.wellness_massage;
    
    let massageIds: string[] = [];
    if (massageType === "add_relax_massage") massageIds = ["vector", "classic-full"];
    else if (massageType === "add_back_neck_massage") massageIds = ["classic-spine"];
    
    // Массажи перед практиками
    serviceIds = [...massageIds, ...selectedPractices];
  }

  // Дедупликация и лимит 3
  return Array.from(new Set(serviceIds))
    .map(id => getService(id))
    .filter((s): s is QuizService => !!s)
    .slice(0, 3);
}
