import React from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  DemographicQuestion,
  demographicQuestions,
} from "@/types/demographics";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DemographicsSelectorProps {
  selectedQuestions: string[];
  onChange: (selectedIds: string[]) => void;
}

const DemographicsSelector: React.FC<DemographicsSelectorProps> = ({
  selectedQuestions = [],
  onChange,
}) => {
  const handleToggleAll = () => {
    if (selectedQuestions.length === demographicQuestions.length) {
      onChange([]);
    } else {
      onChange(demographicQuestions.map((q) => q.id));
    }
  };

  const handleToggleQuestion = (id: string) => {
    if (selectedQuestions.includes(id)) {
      onChange(selectedQuestions.filter((qId) => qId !== id));
    } else {
      onChange([...selectedQuestions, id]);
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Questions démographiques</h2>
        <p className="text-gray-500 text-sm">
          Les questions démographiques prolongent le temps requis pour répondre
          à l'enquête. Posez uniquement les questions dont vous avez besoin pour
          brosser un portrait précis de la santé et de la sécurité
          psychologiques.
        </p>
      </div>

      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="select-all"
            checked={selectedQuestions.length === demographicQuestions.length}
            onCheckedChange={handleToggleAll}
          />
          <Label htmlFor="select-all" className="text-sm font-medium">
            Sélectionner/désélectionner tout
          </Label>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs text-xs">
                En raison des restrictions, les questions démographiques sont
                uniquement recommandées si l'enquête est envoyée à au moins 50
                répondants.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {demographicQuestions.map((question) => (
            <div
              key={question.id}
              className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg"
            >
              <Checkbox
                id={question.id}
                checked={selectedQuestions.includes(question.id)}
                onCheckedChange={() => handleToggleQuestion(question.id)}
              />
              <div className="space-y-1">
                <Label
                  htmlFor={question.id}
                  className="text-sm font-medium cursor-pointer"
                >
                  {question.text}
                </Label>
                {question.description && (
                  <p className="text-xs text-gray-500">
                    {question.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="pt-4 border-t">
        <p className="text-sm text-gray-500">
          Le pourcentage de questions avec réponse n'indiquera que le
          pourcentage de répondants qui ont répondu aux questions dans chaque
          catégorie.
        </p>
      </div>
    </Card>
  );
};

export default DemographicsSelector;
