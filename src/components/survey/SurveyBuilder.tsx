import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { Card } from "../ui/card";
import { GripVertical } from "lucide-react";
import SurveyPreview from "./SurveyPreview";
import {
  SurveyQuestion,
  fullSurveyQuestions,
  quickSurveyQuestions,
} from "@/data/surveyQuestions";
import { useSearchParams } from "react-router-dom";

interface SurveyBuilderProps {
  onSave?: (questions: SurveyQuestion[]) => void;
}

const SurveyBuilder = ({ onSave = () => {} }: SurveyBuilderProps) => {
  const [searchParams] = useSearchParams();
  const surveyType = searchParams.get("type") || "comprehensive";
  const [questions, setQuestions] = useState<SurveyQuestion[]>(
    surveyType === "comprehensive" ? fullSurveyQuestions : quickSurveyQuestions,
  );

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(questions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setQuestions(items);
    onSave(items);
  };

  return (
    <div className="flex h-full bg-gray-50">
      {/* Questions List */}
      <div className="w-1/2 p-6 overflow-auto">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {surveyType === "comprehensive" ? "61 Questions" : "6 Questions"}
            </h2>
            <p className="text-sm text-gray-500">
              Glisser-déposer pour réorganiser
            </p>
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="questions">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-3"
                >
                  {questions.map((question, index) => (
                    <Draggable
                      key={question.id}
                      draggableId={question.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`bg-white p-4 rounded-lg border ${snapshot.isDragging ? "border-primary shadow-lg" : "border-gray-200"} hover:border-primary/50 transition-colors`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              {...provided.dragHandleProps}
                              className="mt-1 cursor-move"
                            >
                              <GripVertical className="text-gray-400" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-sm">
                                {question.text}
                              </p>
                              <div className="mt-2 flex gap-2 flex-wrap">
                                {question.options.map((option) => (
                                  <span
                                    key={option}
                                    className="px-2 py-1 bg-gray-100 rounded-md text-xs"
                                  >
                                    {option}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Card>
      </div>

      {/* Preview */}
      <div className="w-1/2 border-l border-gray-200 overflow-auto">
        <SurveyPreview questions={questions} />
      </div>
    </div>
  );
};

export default SurveyBuilder;
