export interface DemographicQuestion {
  id: string;
  text: string;
  type: "select" | "radio";
  required?: boolean;
  options?: string[];
  description?: string;
}

export const demographicQuestions: DemographicQuestion[] = [
  {
    id: "age",
    text: "Quel âge avez-vous?",
    type: "select",
    options: ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"],
  },
  {
    id: "education",
    text: "Quel est le plus haut niveau de scolarité que vous avez atteint?",
    type: "select",
    options: [
      "Diplôme d'études secondaires",
      "Diplôme d'études collégiales",
      "Baccalauréat",
      "Maîtrise",
      "Doctorat",
    ],
  },
  {
    id: "seniority",
    text: "Quelle réponse parmi les suivantes décrit le mieux votre niveau d'ancienneté au sein de l'entreprise ou de l'organisation?",
    type: "select",
    options: ["0-2 ans", "3-5 ans", "6-10 ans", "11-15 ans", "16+ ans"],
  },
  {
    id: "current_tenure",
    text: "Depuis combien de temps approximativement occupez-vous votre poste actuel avec cet employeur?",
    type: "select",
    options: ["Moins d'un an", "1-2 ans", "3-5 ans", "6-10 ans", "10+ ans"],
  },
  {
    id: "hours",
    text: "En moyenne, combien d'heures de travail totales faites-vous par semaine?",
    type: "select",
    options: ["Moins de 20h", "20-29h", "30-39h", "40-49h", "50h+"],
  },
  {
    id: "department",
    text: "De quel service ou de quelle direction faites-vous partie?",
    type: "select",
    description:
      "Pour activer cette question, vous devez sélectionner vos services à l'Étape 1.",
  },
  {
    id: "location",
    text: "Où résidez-vous actuellement?",
    type: "select",
    options: ["Quebec", "Ontario", "British Columbia", "Alberta", "Other"],
  },
  {
    id: "gender",
    text: "Quel est votre genre?",
    type: "select",
    options: ["Homme", "Femme", "Non-binaire", "Préfère ne pas répondre"],
  },
  {
    id: "union",
    text: "Êtes-vous membre d'un syndicat?",
    type: "radio",
    options: ["Oui", "Non", "Préfère ne pas répondre"],
  },
  {
    id: "work_style",
    text: "Travaillez-vous surtout en compagnie d'autres employés, ou travaillez-vous surtout en solo?",
    type: "radio",
    options: ["En équipe", "En solo", "Les deux"],
  },
  {
    id: "manager",
    text: "Dans votre poste, avez-vous une responsabilité de gestionnaire envers d'autres personnes?",
    type: "radio",
    options: ["Oui", "Non"],
  },
  {
    id: "shift_work",
    text: "Faites-vous des quarts de travail?",
    type: "radio",
    options: ["Oui", "Non"],
  },
  {
    id: "employment_status",
    text: "Quelle catégorie parmi les suivantes décrit le mieux votre statut d'emploi actuel?",
    type: "select",
    options: ["Temps plein", "Temps partiel", "Contractuel", "Temporaire"],
  },
  {
    id: "indigenous",
    text: "Êtes-vous un Autochtone ou un membre d'une minorité visible (un groupe racialisé)?",
    type: "radio",
    options: ["Oui", "Non", "Préfère ne pas répondre"],
  },
  {
    id: "lgbtq",
    text: "Êtes-vous un membre de la communauté 2ELGBTQI+?",
    type: "radio",
    options: ["Oui", "Non", "Préfère ne pas répondre"],
  },
  {
    id: "immigrant",
    text: "Êtes-vous un immigré dans ce pays?",
    type: "radio",
    options: ["Oui", "Non", "Préfère ne pas répondre"],
  },
  {
    id: "disability",
    text: "Vivez-vous avec un handicap physique ou mental (invisible ou visible)?",
    type: "radio",
    options: ["Oui", "Non", "Préfère ne pas répondre"],
  },
  {
    id: "caregiver",
    text: "Êtes-vous un aidant naturel d'enfants ou d'adultes?",
    type: "radio",
    options: ["Oui", "Non", "Préfère ne pas répondre"],
  },
];
