import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const profileSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom de famille est requis"),
  email: z.string().email("L'adresse courriel est invalide"),
  jobTitle: z.string().min(1, "Le poste est requis"),
});

interface ProfileSectionProps {
  initialData?: any;
  onSave?: (data: any) => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  initialData,
  onSave,
}) => {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: any) => {
    try {
      await onSave?.(data);
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été mises à jour avec succès.",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Profil</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Prénom</Label>
            <Input {...form.register("firstName")} />
            {form.formState.errors.firstName && (
              <p className="text-sm text-red-500">
                {form.formState.errors.firstName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Nom de famille</Label>
            <Input {...form.register("lastName")} />
            {form.formState.errors.lastName && (
              <p className="text-sm text-red-500">
                {form.formState.errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Courriel</Label>
          <Input {...form.register("email")} />
          {form.formState.errors.email && (
            <p className="text-sm text-red-500">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Poste</Label>
          <Input {...form.register("jobTitle")} />
          {form.formState.errors.jobTitle && (
            <p className="text-sm text-red-500">
              {form.formState.errors.jobTitle.message}
            </p>
          )}
        </div>

        <Button type="submit">Enregistrer les modifications</Button>
      </form>
    </Card>
  );
};

export default ProfileSection;
