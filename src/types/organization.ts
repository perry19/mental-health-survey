export interface Department {
  id: string;
  name: string;
  size: number;
  subDepartments?: Department[];
}

export interface Organization {
  name: string;
  employeeCount: string;
  surveyEmployeeCount: string;
  type: string;
  sector: string;
  unionStatus: string;
  industry: string;
  departments: Department[];
}

export const employeeCountOptions = [
  "1-49",
  "50-99",
  "100-499",
  "500-999",
  "1000+",
];

export const organizationTypes = [
  "À but lucratif",
  "Sans but lucratif",
  "Pas de réponse",
];

export const sectorTypes = [
  "Secteur privé",
  "Secteur public",
  "Pas de réponse",
];

export const unionStatus = [
  "Syndicat",
  "Non syndiqué",
  "Un mélange des deux",
  "Pas de réponse",
];

export const industries = [
  "Agriculture, foresterie, pêche et chasse",
  "Extraction minière, exploitation en carrière, et extraction de pétrole et de gaz",
  "Services publics",
  "Construction",
  "Fabrication",
  "Commerce de gros",
  "Commerce de détail",
  "Transport et entreposage",
  "Industrie de l'information et industrie culturelle",
  "Finance et assurances",
  "Services immobiliers et services de location et de location à bail",
  "Services professionnels, scientifiques et techniques",
  "Gestion de sociétés et d'entreprises",
  "Services administratifs, services de soutien, services de gestion des déchets et services d'assainissement",
  "Services d'enseignement",
  "Soins de santé et assistance sociale",
  "Arts, spectacles et loisirs",
  "Services d'hébergement et de restauration",
  "Autres services (sauf les administrations publiques)",
  "Administrations publiques",
];
