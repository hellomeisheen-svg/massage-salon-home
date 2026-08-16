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
  const isFacePath = goal === "face" || (goal === "lightness" && answers.lightness_area?.length === 1 && answers.lightness_area.includes("face"));
  if (isFacePath) {
    serviceIds = ["lymph_face", "classic_face", "girudo_cosm"];
    return serviceIds.map(id => getService(id)).filter((s): s is QuizService => !!s);
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
    const res = answers.back_result;
    const areas = answers.back_tension_area || [];
    const isUpper = areas.includes("neck") || areas.includes("shoulders") || areas.includes("upper_back");
    const isLower = areas.includes("lower_back");
    
    if (isUpper && isLower) {
      serviceIds = ["vector", "classic_full", "classic_spine_neck"];
    } else if (isLower) {
      serviceIds = ["classic_full", "vector", "classic_spine_neck"];
    } else if (isUpper) {
      if (res === "deep_work") {
        serviceIds = ["classic_spine_neck", "classic_full", "vector"];
      } else {
        serviceIds = ["classic_spine_neck", "classic_full"];
      }
    } else {
      serviceIds = ["classic_spine_neck", "vector"];
    }
  }

  // Ветка 3: Убрать отёчность (lightness)
  else if (goal === "lightness") {
    const areas = answers.lightness_area || [];
    if (areas.includes("legs") || areas.includes("feet")) serviceIds = ["classic_legs", "lymph", "lymphatic"];
    else if (areas.includes("whole_body")) serviceIds = ["lymph", "lymphatic", "vector"];
    else serviceIds = ["lymph", "lymphatic"];
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

  return goal === "relax" ? result : result.slice(0, 3);
}
