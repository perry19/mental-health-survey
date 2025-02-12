import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Organization,
  employeeCountOptions,
  organizationTypes,
  sectorTypes,
  unionStatus,
  industries,
} from "@/types/organization";
import DepartmentManager from "./DepartmentManager";

interface OrganizationSetupProps {
  onSave?: (organization: Organization) => void;
}

const OrganizationSetup: React.FC<OrganizationSetupProps> = ({ onSave }) => {
  const [organization, setOrganization] = React.useState<Organization>({
    name: "",
    employeeCount: "",
    surveyEmployeeCount: "",
    type: "",
    sector: "",
    unionStatus: "",
    industry: "",
    departments: [],
  });

  const handleChange = (field: keyof Organization, value: string) => {
    setOrganization((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">
          Renseignements sur l'organisation
        </h1>
        <p className="text-gray-500">
          Commençons par examiner les renseignements de votre organisation. Il
          faut au minimum 10 répondants à votre enquête pour pouvoir générer un
          rapport.
        </p>
      </div>

      <Card className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Organisation</Label>
            <Input
              placeholder="e.g MIRS"
              value={organization.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nombre d'employés dans votre organisation</Label>
              <Select
                value={organization.employeeCount}
                onValueChange={(value) => handleChange("employeeCount", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une option" />
                </SelectTrigger>
                <SelectContent>
                  {employeeCountOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>
                Nombre d'employés à qui cette enquête sera administrée
              </Label>
              <Select
                value={organization.surveyEmployeeCount}
                onValueChange={(value) =>
                  handleChange("surveyEmployeeCount", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une option" />
                </SelectTrigger>
                <SelectContent>
                  {employeeCountOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Type d'organisation</Label>
              <Select
                value={organization.type}
                onValueChange={(value) => handleChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une option" />
                </SelectTrigger>
                <SelectContent>
                  {organizationTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Secteur privé / Secteur public</Label>
              <Select
                value={organization.sector}
                onValueChange={(value) => handleChange("sector", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une option" />
                </SelectTrigger>
                <SelectContent>
                  {sectorTypes.map((sector) => (
                    <SelectItem key={sector} value={sector}>
                      {sector}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Syndicat / Non syndiqué</Label>
              <Select
                value={organization.unionStatus}
                onValueChange={(value) => handleChange("unionStatus", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une option" />
                </SelectTrigger>
                <SelectContent>
                  {unionStatus.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Secteur d'activité</Label>
              <Select
                value={organization.industry}
                onValueChange={(value) => handleChange("industry", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une option" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      <DepartmentManager
        departments={organization.departments}
        onChange={(departments) => handleChange("departments", departments)}
      />

      <div className="flex justify-end">
        <Button size="lg" onClick={() => onSave?.(organization)}>
          Enregistrer et continuer
        </Button>
      </div>
    </div>
  );
};

export default OrganizationSetup;
