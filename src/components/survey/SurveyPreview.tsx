import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Monitor, Smartphone } from "lucide-react";
import { SurveyQuestion } from "@/data/surveyQuestions";

interface PreviewContentProps {
  title?: string;
  description?: string;
  questions?: SurveyQuestion[];
}

const PreviewContent: React.FC<PreviewContentProps> = ({
  title,
  description,
  questions,
}) => (
  <div className="space-y-6 p-6">
    <div className="space-y-2">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-gray-500">{description}</p>
    </div>

    <div className="space-y-8">
      {questions?.map((question, index) => (
        <div key={question.id} className="space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-sm font-medium text-gray-500 mt-1">
              {index + 1}
            </span>
            <p className="font-medium flex-1">{question.text}</p>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {question.options.map((option) => (
              <button
                key={option}
                className="p-2 text-sm border rounded-md hover:bg-gray-50 transition-colors text-center"
                disabled
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

interface SurveyPreviewProps {
  title?: string;
  description?: string;
  questions?: SurveyQuestion[];
}

const SurveyPreview: React.FC<SurveyPreviewProps> = ({
  title = "Évaluation de la santé psychologique",
  description = "Aidez-nous à comprendre votre bien-être psychologique au travail",
  questions = [],
}) => {
  const [activeView, setActiveView] = useState<"desktop" | "mobile">("desktop");

  return (
    <div className="w-full h-full bg-white p-4">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Aperçu</h3>
        <div className="flex space-x-2">
          <Button
            variant={activeView === "desktop" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveView("desktop")}
          >
            <Monitor className="h-4 w-4 mr-2" />
            Bureau
          </Button>
          <Button
            variant={activeView === "mobile" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveView("mobile")}
          >
            <Smartphone className="h-4 w-4 mr-2" />
            Mobile
          </Button>
        </div>
      </div>

      <div className="w-full h-[calc(100%-3rem)] overflow-auto">
        <Card
          className={`mx-auto ${
            activeView === "mobile" ? "max-w-[375px]" : "max-w-[800px]"
          }`}
        >
          <PreviewContent
            title={title}
            description={description}
            questions={questions}
          />
        </Card>
      </div>
    </div>
  );
};

export default SurveyPreview;
