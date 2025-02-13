import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, FileText, Settings, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SurveyList from "./SurveyList";
import ProfileSection from "./ProfileSection";
import { useAuth } from "../auth/AuthProvider";
import { supabase } from "@/lib/supabase";

const mockSurveys = [
  {
    id: "1",
    name: "Enquête Organisationnelle MIRS - Session 2",
    type: "comprehensive" as const,
    createdAt: "2023-10-23",
    endDate: "2023-12-04",
    completedResponses: 38,
    status: "closed" as const,
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("surveys");

  const handleReopenSurvey = async (id: string) => {
    // Implement reopen survey logic
  };

  const handleGenerateReport = async (id: string) => {
    // Implement report generation logic
  };

  const handleUpdateProfile = async (data: any) => {
    const { error } = await supabase.auth.updateUser({
      data: {
        first_name: data.firstName,
        last_name: data.lastName,
        job_title: data.jobTitle,
      },
    });

    if (error) throw error;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <Button
            onClick={() => navigate("/survey/create")}
            className="flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            Nouvelle enquête
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Enquêtes actives</h3>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Total des répondants</h3>
                <p className="text-2xl font-bold">38</p>
              </div>
            </div>
          </Card>

          <Card
            className="p-6 space-y-4 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setActiveTab("profile")}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Settings className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Configuration</h3>
                <p className="text-sm text-gray-500">Gérer les paramètres</p>
              </div>
            </div>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="surveys">Enquêtes</TabsTrigger>
            <TabsTrigger value="profile">Profil</TabsTrigger>
          </TabsList>

          <TabsContent value="surveys" className="space-y-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Enquêtes en cours
                </h2>
                <SurveyList
                  surveys={[]}
                  type="active"
                  onGenerateReport={handleGenerateReport}
                />
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Enquêtes fermées</h2>
                <SurveyList
                  surveys={mockSurveys}
                  type="closed"
                  onReopenSurvey={handleReopenSurvey}
                  onGenerateReport={handleGenerateReport}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <ProfileSection
              initialData={{
                firstName: user?.user_metadata?.first_name,
                lastName: user?.user_metadata?.last_name,
                email: user?.email,
                jobTitle: user?.user_metadata?.job_title,
              }}
              onSave={handleUpdateProfile}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
