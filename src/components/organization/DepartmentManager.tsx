import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import { Department } from "@/types/organization";

interface DepartmentManagerProps {
  departments: Department[];
  onChange: (departments: Department[]) => void;
}

const DepartmentManager: React.FC<DepartmentManagerProps> = ({
  departments,
  onChange,
}) => {
  const [expandedDepts, setExpandedDepts] = React.useState<string[]>([]);

  const addDepartment = () => {
    onChange([
      ...departments,
      {
        id: Math.random().toString(36).substr(2, 9),
        name: "",
        size: 0,
      },
    ]);
  };

  const removeDepartment = (id: string) => {
    onChange(departments.filter((dept) => dept.id !== id));
  };

  const updateDepartment = (
    id: string,
    field: keyof Department,
    value: any,
  ) => {
    onChange(
      departments.map((dept) =>
        dept.id === id ? { ...dept, [field]: value } : dept,
      ),
    );
  };

  const toggleExpand = (id: string) => {
    setExpandedDepts((prev) =>
      prev.includes(id)
        ? prev.filter((deptId) => deptId !== id)
        : [...prev, id],
    );
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Services de l'organisation</h2>
          <Button onClick={addDepartment} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un département
          </Button>
        </div>

        <div className="space-y-4">
          {departments.map((dept) => (
            <div key={dept.id} className="space-y-2">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleExpand(dept.id)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  {expandedDepts.includes(dept.id) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>

                <div className="flex-1 grid grid-cols-[1fr,100px] gap-4">
                  <Input
                    placeholder="Nom du département"
                    value={dept.name}
                    onChange={(e) =>
                      updateDepartment(dept.id, "name", e.target.value)
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Taille"
                    value={dept.size || ""}
                    onChange={(e) =>
                      updateDepartment(
                        dept.id,
                        "size",
                        parseInt(e.target.value),
                      )
                    }
                  />
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeDepartment(dept.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              {expandedDepts.includes(dept.id) && (
                <div className="ml-8 pl-4 border-l border-gray-200">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary"
                    onClick={() => {
                      const subDepts = dept.subDepartments || [];
                      updateDepartment(dept.id, "subDepartments", [
                        ...subDepts,
                        {
                          id: Math.random().toString(36).substr(2, 9),
                          name: "",
                          size: 0,
                        },
                      ]);
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter une sous-section
                  </Button>

                  {dept.subDepartments?.map((subDept) => (
                    <div
                      key={subDept.id}
                      className="mt-2 flex items-center gap-4"
                    >
                      <div className="flex-1 grid grid-cols-[1fr,100px] gap-4">
                        <Input
                          placeholder="Nom de la sous-section"
                          value={subDept.name}
                          onChange={(e) => {
                            const updatedSubDepts = dept.subDepartments?.map(
                              (sd) =>
                                sd.id === subDept.id
                                  ? { ...sd, name: e.target.value }
                                  : sd,
                            );
                            updateDepartment(
                              dept.id,
                              "subDepartments",
                              updatedSubDepts,
                            );
                          }}
                        />
                        <Input
                          type="number"
                          placeholder="Taille"
                          value={subDept.size || ""}
                          onChange={(e) => {
                            const updatedSubDepts = dept.subDepartments?.map(
                              (sd) =>
                                sd.id === subDept.id
                                  ? { ...sd, size: parseInt(e.target.value) }
                                  : sd,
                            );
                            updateDepartment(
                              dept.id,
                              "subDepartments",
                              updatedSubDepts,
                            );
                          }}
                        />
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const updatedSubDepts = dept.subDepartments?.filter(
                            (sd) => sd.id !== subDept.id,
                          );
                          updateDepartment(
                            dept.id,
                            "subDepartments",
                            updatedSubDepts,
                          );
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default DepartmentManager;
