import React from "react";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Clock, Shield, Users } from "lucide-react";

interface SurveySettingsProps {
  onSettingsChange?: (settings: any) => void;
  defaultDemographics?: boolean;
  defaultAnonymity?: boolean;
  estimatedTime?: number;
}

const SurveySettings = ({
  onSettingsChange = () => {},
  defaultDemographics = true,
  defaultAnonymity = true,
  estimatedTime = 15,
}: SurveySettingsProps) => {
  return (
    <div className="w-full max-w-md p-4 space-y-6 bg-white">
      <Card className="p-6 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Survey Settings</h2>
          <p className="text-sm text-gray-500">
            Configure your survey parameters
          </p>
        </div>

        {/* Demographics Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <Label className="text-base font-medium">
                  Demographics Collection
                </Label>
              </div>
              <p className="text-sm text-gray-500">
                Collect basic information about respondents
              </p>
            </div>
            <Switch
              checked={defaultDemographics}
              onCheckedChange={(checked) =>
                onSettingsChange({ demographics: checked })
              }
            />
          </div>

          {defaultDemographics && (
            <div className="space-y-4 pl-6">
              <div className="space-y-2">
                <Label>Required Fields</Label>
                <Select defaultValue="age-gender">
                  <SelectTrigger>
                    <SelectValue placeholder="Select required fields" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="age-gender">Age and Gender</SelectItem>
                    <SelectItem value="comprehensive">Comprehensive</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        {/* Anonymity Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <Label className="text-base font-medium">
                  Anonymous Responses
                </Label>
              </div>
              <p className="text-sm text-gray-500">
                Keep survey responses anonymous
              </p>
            </div>
            <Switch
              checked={defaultAnonymity}
              onCheckedChange={(checked) =>
                onSettingsChange({ anonymity: checked })
              }
            />
          </div>
        </div>

        {/* Estimated Time Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <Label className="text-base font-medium">
              Estimated Completion Time
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={estimatedTime}
              onChange={(e) =>
                onSettingsChange({ estimatedTime: parseInt(e.target.value) })
              }
              className="w-20"
            />
            <span className="text-sm text-gray-500">minutes</span>
          </div>
        </div>

        <Button
          className="w-full"
          onClick={() =>
            onSettingsChange({
              demographics: defaultDemographics,
              anonymity: defaultAnonymity,
              estimatedTime,
            })
          }
        >
          Apply Settings
        </Button>
      </Card>
    </div>
  );
};

export default SurveySettings;
