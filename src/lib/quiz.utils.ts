import { QUIZ_CONFIG } from "@/config/quiz";

export function calculateResult(answers: Record<string, any>): string[] {
  const goal = answers.goal?.[0] || "";
  
  if (goal === "face" || (goal === "lightness" && answers.lightness_area?.includes("face"))) {
    return ["face-care"];
  }
  
  if (goal === "relax") return ["relax-body"];
  if (goal === "back_neck") return ["spine-care"];
  
  return ["vector-recommendation"];
}
