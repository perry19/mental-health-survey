import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardList, Zap } from "lucide-react";

interface SurveyOption {
  type: "comprehensive" | "quick";
  title: string;
  description: string;
  questionCount: number;
  estimatedTime: string;
  icon: React.ReactNode;
}

interface SurveyTypeSelectorProps {
  onSelect?: (type: "comprehensive" | "quick") => void;
  selectedType?: "comprehensive" | "quick" | null;
}

const SurveyTypeSelector: React.FC<SurveyTypeSelectorProps> = ({
  onSelect = () => {},
  selectedType = null,
}) => {
  const surveyOptions: SurveyOption[] = [
    {
      type: "comprehensive",
      title: "Comprehensive Assessment",
      description:
        "In-depth psychological health evaluation with detailed insights",
      questionCount: 61,
      estimatedTime: "15-20 minutes",
      icon: <ClipboardList className="h-6 w-6" />,
    },
    {
      type: "quick",
      title: "Quick Pulse Check",
      description: "Brief assessment for rapid psychological health monitoring",
      questionCount: 6,
      estimatedTime: "2-3 minutes",
      icon: <Zap className="h-6 w-6" />,
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Choose Your Survey Type</h2>
        <p className="text-gray-500">
          Select the assessment format that best suits your needs
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {surveyOptions.map((option) => (
          <Card
            key={option.type}
            className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
              selectedType === option.type
                ? "ring-2 ring-primary"
                : "hover:border-primary/50"
            }`}
            onClick={() => onSelect(option.type)}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  {option.icon}
                </div>
                <h3 className="text-xl font-semibold">{option.title}</h3>
              </div>

              <p className="text-gray-500 mb-6">{option.description}</p>

              <div className="mt-auto space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Questions</span>
                  <span className="font-medium">{option.questionCount}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Estimated Time</span>
                  <span className="font-medium">{option.estimatedTime}</span>
                </div>

                <Button
                  variant={selectedType === option.type ? "default" : "outline"}
                  className="w-full"
                  onClick={() => onSelect(option.type)}
                >
                  {selectedType === option.type ? "Selected" : "Select"}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SurveyTypeSelector;
