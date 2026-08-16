import { QUIZ_CONFIG, QuizService } from "@/config/quiz";

export function calculateResult(answers: Record<string, any>): QuizService[] {
  const goal = answers.goal;
  const getService = (id: string) => QUIZ_CONFIG.services.find(s => s.id === id);
  
  let serviceIds: string[] = [];
  
  // Ветка 6: Не знаю (unsure)
  if (goal === "unsure") {
    const dir = answers.unsure_direction;
    if (dir === "relax") return calculateResult({ ...answers, goal: "relax" });
    if (dir === "back_neck") return calculateResult({ ...answers, goal: "back_neck" });
    if (dir === "lightness") return calculateResult({ ...answers, goal: "lightness" });
    if (dir === "face") return calculateResult({ ...answers, goal: "face" });
    if (dir === "wellness") return calculateResult({ ...answers, goal: "wellness" });
    
    // Векторный массаж первым для первого визита
    return [getService("vector"), getService("classic_full")].filter((s): s is QuizService => !!s);
  }

  // Ветка 4: Лицо (face) - изолирована
  const isFacePath = goal === "face" || (goal === "lightness" && Array.isArray(answers.lightness_area) && answers.lightness_area.length === 1 && answers.lightness_area.includes("face"));
  if (isFacePath) {
    serviceIds = ["lymph_face", "classic_face", "girudo_cosm"];
    const results = serviceIds.map(id => getService(id)).filter((s): s is QuizService => !!s);
    console.log("FACE RECOMMENDATIONS:", results.map(r => r.id));
    return results;
  }

  // Ветка 1: Глубокое расслабление (relax)
  if (goal === "relax") {
    const area = answers.relax_area;
    const intensity = answers.intensity;
    const addCups = answers.addCups;

    // Всё тело: векторный массаж + банки только при явном согласии
    if (area === "whole_body") {
      const services = ["vector"];
      if (addCups === "yes") {
        if (intensity === "soft") {
          services.push("cups_air");
        } else if (intensity === "deep") {
          services.push("cups_fire");
        } else if (intensity === "master_choice") {
          services.push("cups_air");
        }
      }
      return services.map(id => getService(id)).filter((s): s is QuizService => !!s);
    }

    // Спина, шея и плечи: массаж + банки только при явном согласии
    if (area === "back_neck") {
      const services = ["vector", "classic_spine_neck"];
      if (addCups === "yes") {
        if (intensity === "soft") {
          services.push("cups_air");
        } else if (intensity === "deep") {
          services.push("cups_fire");
        } else if (intensity === "master_choice") {
          services.push("cups_air");
        }
      }
      return services.map(id => getService(id)).filter((s): s is QuizService => !!s);
    }

    // Голова: без банок
    if (area === "head") {
      return ["classic_head", "vector"].map(id => getService(id)).filter((s): s is QuizService => !!s);
    }

    // Ноги: без банок
    if (area === "legs") {
      return ["classic_legs", "vector"].map(id => getService(id)).filter((s): s is QuizService => !!s);
    }

    // Не знаю: без банок
    return [getService("vector")].filter((s): s is QuizService => !!s);
  }

  // Ветка 2: Снять напряжение (back_neck)
  else if (goal === "back_neck") {
    const result = getBackNeckRecommendations(answers);
    console.log("BACK_NECK RECOMMENDATIONS:", result.map(s => s.id));
    return result;
  }

  // Ветка 3: Убрать отёчность (lightness)
  else if (goal === "lightness") {
    const area = 
      answers.lightnessArea ?? 
      answers.lightness_area ?? 
      answers.area ?? 
      answers.selectedArea ?? 
      answers.relaxArea;

    console.log("LIGHTNESS DEBUG", {
      goal: answers.goal,
      lightnessArea: answers.lightnessArea,
      area: area,
      recommendedServiceIds: getLightnessRecommendations({ ...answers, lightnessArea: area })
    });

    const recommendedServices = getLightnessRecommendations({ ...answers, lightnessArea: area });
    console.log("LIGHTNESS RESOLVED SERVICES", recommendedServices);
    return recommendedServices;
  }

  // Ветка 5: Оздоровительные практики (wellness)
  else if (goal === "wellness") {
    const wellnessPriority = [
      "ketgut",
      "girudo_med",
      "girudo_cosm",
      "cups_fire",
      "cups_air"
    ];

    const selectedTypes = answers.wellness_type || [];
    
    if (selectedTypes.includes("master_choice")) {
      serviceIds = ["ketgut", "girudo_med", "cups_air"];
    } else {
      const practiceMapping: Record<string, string> = {
        cups_air: "cups_air",
        cups_fire: "cups_fire",
        hirudo_medical: "girudo_med",
        hirudo_cosmetic: "girudo_cosm",
        ketgut: "ketgut"
      };
      
      serviceIds = selectedTypes
        .map((id: string) => practiceMapping[id])
        .filter(Boolean)
        .sort((a: string, b: string) => wellnessPriority.indexOf(a) - wellnessPriority.indexOf(b));
    }
    
    // В велнесе массажи НЕ предлагаются
  }

  // Дедупликация и лимит 3
  // В ветке relax мы не ограничиваем количество, чтобы банки не вытеснили массаж
  const finalIds = Array.from(new Set(serviceIds));
  const result = finalIds
    .map(id => getService(id))
    .filter((s): s is QuizService => !!s);

  const isSpecialBranch = goal === "relax" || goal === "back_neck" || goal === "lightness";
  return isSpecialBranch ? result : result.slice(0, 3);
}

function getBackNeckRecommendations(answers: Record<string, any>): QuizService[] {
  const getService = (id: string) => QUIZ_CONFIG.services.find(s => s.id === id);
  const zones = Array.isArray(answers.back_tension_area)
    ? answers.back_tension_area
    : [answers.back_tension_area].filter(Boolean);
  
  const result = answers.back_result;
  
  // Банки обязательны во всех сценариях второй ветки
  const cupsId = result === "deep_work" ? "cups_fire" : "cups_air";
  
  const hasUpperBody = zones.some((zone) =>
    ["neck", "shoulders", "upper_back"].includes(zone)
  );
  const hasLowerBack = zones.includes("lower_back");
  const hasWholeBody = zones.includes("whole_body");
  const isMasterChoice = zones.includes("master_choice");

  let ids: string[] = [];

  // Верх спины + поясница: максимум 3 карточки (включая банки)
  if (zones.includes("upper_back") && hasLowerBack) {
    ids = ["vector", "classic_full", cupsId];
  }
  // Всё тело
  else if (hasWholeBody) {
    ids = ["vector", "classic_full", cupsId];
  }
  // Поясница
  else if (hasLowerBack) {
    ids = ["classic_full", "vector", cupsId];
  }
  // Шея / плечи / верх спины
  else if (hasUpperBody) {
    ids = ["classic_spine_neck", "classic_full", cupsId];
  }
  // Не знаю
  else if (isMasterChoice) {
    ids = ["vector", "classic_spine_neck", cupsId];
  }
  // Fallback
  else {
    ids = ["classic_spine_neck", "classic_full", cupsId];
  }

  return ids.map(id => getService(id)).filter((s): s is QuizService => !!s);
}

function getLightnessRecommendations(answers: Record<string, any>): QuizService[] {
  const getService = (id: string) => QUIZ_CONFIG.services.find(s => s.id === id);
  const area =
    answers.lightnessArea ??
    answers.area ??
    answers.selectedArea ??
    answers.relaxArea;

  let ids: string[] = [];

  if (area === "face") {
    ids = ["lymph_face", "classic_face", "girudo_cosm"];
  } else if (area === "legs" || area === "feet" || (Array.isArray(area) && (area.includes("legs") || area.includes("feet")))) {
    ids = ["lymph", "lymphatic", "classic_legs"];
  } else if (area === "whole_body" || (Array.isArray(area) && area.includes("whole_body"))) {
    ids = ["lymph", "lymphatic", "vector"];
  } else if (area === "master_choice" || (Array.isArray(area) && area.includes("master_choice"))) {
    ids = ["lymph", "lymphatic", "classic_legs"];
  } else {
    // Fallback
    ids = ["lymph", "lymphatic", "classic_legs"];
  }

  return ids.map(id => getService(id)).filter((s): s is QuizService => !!s);
}
