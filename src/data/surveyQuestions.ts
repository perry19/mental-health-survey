export interface SurveyQuestion {
  id: string;
  text: string;
  type: "scale";
  options: Array<"Toujours" | "Souvent" | "Parfois" | "Rarement" | "Jamais">;
  required?: boolean;
}

export const fullSurveyQuestions: SurveyQuestion[] = [
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
  // Add all 61 questions here...
];

export const quickSurveyQuestions: SurveyQuestion[] = [
  {
    id: "q1",
    text: "Je suis en mesure de maintenir un équilibre raisonnable entre mes exigences professionnelles et ma vie personnelle.",
    type: "scale",
    options: ["Toujours", "Souvent", "Parfois", "Rarement", "Jamais"],
    required: true,
  },
  {
    id: "q2",
    text: "Les gens se traitent avec respect dans mon milieu de travail.",
    type: "scale",
    options: ["Toujours", "Souvent", "Parfois", "Rarement", "Jamais"],
    required: true,
  },
  {
    id: "q3",
    text: "Je sais ce qu'on attend de moi dans mon travail.",
    type: "scale",
    options: ["Toujours", "Souvent", "Parfois", "Rarement", "Jamais"],
    required: true,
  },
  {
    id: "q4",
    text: "Au travail, j'ai le sentiment de faire partie d'une communauté.",
    type: "scale",
    options: ["Toujours", "Souvent", "Parfois", "Rarement", "Jamais"],
    required: true,
  },
  {
    id: "q5",
    text: "Il est sécuritaire de s'exprimer au travail.",
    type: "scale",
    options: ["Toujours", "Souvent", "Parfois", "Rarement", "Jamais"],
    required: true,
  },
  {
    id: "q6",
    text: "La charge de travail que je dois exécuter est raisonnable pour mon poste.",
    type: "scale",
    options: ["Toujours", "Souvent", "Parfois", "Rarement", "Jamais"],
    required: true,
  },
];
