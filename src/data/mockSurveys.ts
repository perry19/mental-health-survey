import { SurveyQuestion } from "./surveyQuestions";

export interface Survey {
  id: string;
  name: string;
  type: "comprehensive" | "quick";
  endDate: string;
  organization: {
    name: string;
  };
  selectedDemographics: string[];
  questions: SurveyQuestion[];
}

export const mockSurveys: Record<string, Survey> = {
  "company-a-1234567890": {
    id: "company-a-1234567890",
    name: "Employee Wellbeing Survey Q1 2024",
    type: "comprehensive",
    endDate: "2024-06-30",
    organization: {
      name: "Company A",
    },
    selectedDemographics: ["age", "department", "work_style"],
    questions: [
      {
        id: "1",
        text: "Mon employeur m'encourage à prendre les pauses auxquelles j'ai droit.",
        type: "scale",
        options: ["Toujours", "Souvent", "Parfois", "Rarement", "Jamais"],
        required: true,
      },
      {
        id: "2",
        text: "Je suis en mesure de maintenir un équilibre raisonnable entre mes exigences professionnelles et ma vie personnelle.",
        type: "scale",
        options: ["Toujours", "Souvent", "Parfois", "Rarement", "Jamais"],
        required: true,
      },
      {
        id: "3",
        text: "Les gens se traitent avec respect dans mon milieu de travail.",
        type: "scale",
        options: ["Toujours", "Souvent", "Parfois", "Rarement", "Jamais"],
        required: true,
      },
    ],
  },
  "company-b-0987654321": {
    id: "company-b-0987654321",
    name: "Quick Pulse Check March 2024",
    type: "quick",
    endDate: "2024-04-30",
    organization: {
      name: "Company B",
    },
    selectedDemographics: ["department"],
    questions: [
      {
        id: "q1",
        text: "Les gens se traitent avec respect dans mon milieu de travail.",
        type: "scale",
        options: ["Toujours", "Souvent", "Parfois", "Rarement", "Jamais"],
        required: true,
      },
      {
        id: "q2",
        text: "Je sais ce qu'on attend de moi dans mon travail.",
        type: "scale",
        options: ["Toujours", "Souvent", "Parfois", "Rarement", "Jamais"],
        required: true,
      },
    ],
  },
};
