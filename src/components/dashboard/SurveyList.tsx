import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, RefreshCcw, FileText } from "lucide-react";

interface Survey {
  id: string;
  name: string;
  type: "comprehensive" | "quick";
  createdAt: string;
  endDate: string;
  completedResponses: number;
  status: "active" | "closed";
}

interface SurveyListProps {
  surveys: Survey[];
  type: "active" | "closed";
  onReopenSurvey?: (id: string) => void;
  onGenerateReport?: (id: string) => void;
}

const SurveyList: React.FC<SurveyListProps> = ({
  surveys,
  type,
  onReopenSurvey,
  onGenerateReport,
}) => {
  if (surveys.length === 0 && type === "active") {
    return (
      <Card className="p-6">
        <div className="text-center py-8">
          <p className="text-gray-500">
            Vous n'avez aucune enquête en cours.
            <br />
            Choisir l'onglet Créer une nouvelle enquête pour créer une nouvelle
            enquête.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {surveys.map((survey) => (
        <Card key={survey.id} className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{survey.name}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Créée le {new Date(survey.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Date de fin {new Date(survey.endDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {survey.completedResponses} enquêtes complétées
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                {type === "closed" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onReopenSurvey?.(survey.id)}
                  >
                    <RefreshCcw className="w-4 h-4 mr-2" />
                    Rouvrir l'enquête
                  </Button>
                )}
                <Button size="sm" onClick={() => onGenerateReport?.(survey.id)}>
                  <FileText className="w-4 h-4 mr-2" />
                  Générer un rapport
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SurveyList;
