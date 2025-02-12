import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker-with-range";
import { useToast } from "@/components/ui/use-toast";
import SurveyTypeSelector from "./SurveyTypeSelector";
import OrganizationSetup from "../organization/OrganizationSetup";
import DemographicsSelector from "./DemographicsSelector";
import SurveyBuilder from "./SurveyBuilder";
import { Organization } from "@/types/organization";
import { Check, ChevronRight, Copy } from "lucide-react";

type Step = "type" | "organization" | "demographics" | "builder" | "review";

interface SurveyConfig {
  name: string;
  type: "comprehensive" | "quick" | null;
  endDate: Date | null;
  organization: Organization | null;
  selectedDemographics: string[];
  questions?: any[];
}

const SurveyCreationFlow = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = React.useState<Step>("type");
  const [config, setConfig] = React.useState<SurveyConfig>({
    name: "",
    type: null,
    endDate: null,
    organization: null,
    selectedDemographics: [],
  });
  const [surveyId, setSurveyId] = React.useState<string>("");

  const steps: { id: Step; title: string }[] = [
    { id: "type", title: "Type de sondage" },
    { id: "organization", title: "Organisation" },
    { id: "demographics", title: "Démographie" },
    { id: "builder", title: "Questions" },
    { id: "review", title: "Révision" },
  ];

  const handleNext = () => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const handleBack = () => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  const generateSurveyId = () => {
    const id = `${config.organization?.name?.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`;
    setSurveyId(id);
    return id;
  };

  const activateSurvey = () => {
    const id = generateSurveyId();
    // Store survey config in localStorage (in a real app, this would be in a database)
    localStorage.setItem(`survey-${id}`, JSON.stringify(config));
    toast({
      title: "Survey Activated",
      description: "The survey is now live and ready to be shared.",
    });
  };

  const copyLink = () => {
    const link = `${window.location.origin}/survey/${surveyId}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Link Copied",
      description: "Survey link has been copied to clipboard.",
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case "type":
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Nom du sondage</Label>
                <Input
                  placeholder="Ex: Évaluation du bien-être Q2 2024"
                  value={config.name}
                  onChange={(e) =>
                    setConfig((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Date de fin</Label>
                <DatePicker
                  date={config.endDate}
                  setDate={(date) =>
                    setConfig((prev) => ({ ...prev, endDate: date }))
                  }
                />
              </div>
            </div>

            <SurveyTypeSelector
              selectedType={config.type}
              onSelect={(type) => setConfig((prev) => ({ ...prev, type }))}
            />
          </div>
        );

      case "organization":
        return (
          <OrganizationSetup
            onSave={(org) => {
              setConfig((prev) => ({ ...prev, organization: org }));
              handleNext();
            }}
          />
        );

      case "demographics":
        return (
          <DemographicsSelector
            selectedQuestions={config.selectedDemographics}
            onChange={(questions) =>
              setConfig((prev) => ({
                ...prev,
                selectedDemographics: questions,
              }))
            }
          />
        );

      case "builder":
        return (
          <div className="max-w-none w-full">
            <SurveyBuilder
              onSave={(questions) => {
                setConfig((prev) => ({ ...prev, questions }));
                handleNext();
              }}
            />
          </div>
        );

      case "review":
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Résumé du sondage</h3>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm text-gray-500">Nom</dt>
                  <dd className="text-lg">{config.name}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Type</dt>
                  <dd className="text-lg">
                    {config.type === "comprehensive" ? "Complet" : "Rapide"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Date de fin</dt>
                  <dd className="text-lg">
                    {config.endDate?.toLocaleDateString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Organisation</dt>
                  <dd className="text-lg">{config.organization?.name}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">
                    Questions démographiques
                  </dt>
                  <dd className="text-lg">
                    {config.selectedDemographics.length} sélectionnées
                  </dd>
                </div>
              </dl>
            </Card>

            {surveyId && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Lien du sondage</h3>
                <div className="flex items-center gap-4">
                  <Input
                    readOnly
                    value={`${window.location.origin}/survey/${surveyId}`}
                  />
                  <Button onClick={copyLink}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copier
                  </Button>
                </div>
              </Card>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto p-6">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep === step.id ? "bg-primary text-white" : index < steps.findIndex((s) => s.id === currentStep) ? "bg-green-500 text-white" : "bg-gray-200"}`}
                  >
                    {index < steps.findIndex((s) => s.id === currentStep) ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className="ml-2 font-medium">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div
          className={`mx-auto ${currentStep === "builder" ? "w-full" : "max-w-4xl"}`}
        >
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="max-w-4xl mx-auto mt-8 flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === "type"}
          >
            Retour
          </Button>

          {currentStep === "review" ? (
            <Button
              onClick={activateSurvey}
              className="bg-green-600 hover:bg-green-700"
              disabled={!!surveyId}
            >
              Activer le sondage
            </Button>
          ) : (
            <Button onClick={handleNext}>Continuer</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SurveyCreationFlow;
