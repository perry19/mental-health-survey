import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { mockSurveys, Survey } from "@/data/mockSurveys";

const SurveyResponse = () => {
  const { surveyId } = useParams();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    if (surveyId && mockSurveys[surveyId]) {
      setSurvey(mockSurveys[surveyId]);
    }
  }, [surveyId]);

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmit = () => {
    // In a real app, submit to backend
    console.log("Submitted answers:", answers);
    alert("Thank you for completing the survey!");
  };

  if (!survey) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Card className="p-6">
            <h1 className="text-2xl font-bold text-red-600">
              Survey Not Found
            </h1>
            <p className="mt-2 text-gray-500">
              The survey you're looking for doesn't exist or has expired.
            </p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">{survey.name}</h1>
              <p className="text-gray-500">
                Please answer all questions honestly. Your responses are
                anonymous.
              </p>
            </div>

            <div className="space-y-8">
              {survey.questions.map((question, index) => (
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
                        onClick={() => handleAnswer(question.id, option)}
                        className={`p-2 text-sm border rounded-md transition-colors ${answers[question.id] === option ? "bg-primary text-white" : "hover:bg-gray-50"}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={Object.keys(answers).length !== survey.questions.length}
            >
              Submit Survey
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SurveyResponse;
