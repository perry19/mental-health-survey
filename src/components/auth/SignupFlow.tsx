import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/supabase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import VerificationSuccess from "./VerificationSuccess";

type Step = "personal" | "organization" | "account" | "verification";

const personalInfoSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom de famille est requis"),
  jobTitle: z.string().min(1, "Le nom de poste est requis"),
  personalTitle: z.string().optional(),
  department: z.string().optional(),
  phone: z.string().min(1, "Le téléphone est requis"),
  address: z.string().min(1, "L'adresse est requise"),
  city: z.string().min(1, "La ville est requise"),
  country: z.string().min(1, "Le pays est requis"),
  postalCode: z.string().min(1, "Le code postal est requis"),
});

const organizationInfoSchema = z.object({
  organization: z.string().min(1, "Le nom de l'organisation est requis"),
  employeeCount: z.string().min(1, "Le nombre d'employés est requis"),
  surveyEmployeeCount: z
    .string()
    .min(1, "Le nombre d'employés pour l'enquête est requis"),
  organizationType: z.string().min(1, "Le type d'organisation est requis"),
  sector: z.string().min(1, "Le secteur est requis"),
  unionStatus: z.string().min(1, "Le statut syndical est requis"),
  industry: z.string().min(1, "Le secteur d'activité est requis"),
});

const accountInfoSchema = z
  .object({
    email: z.string().email("L'adresse courriel est invalide"),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    confirmPassword: z.string(),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: "Vous devez accepter les conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

const SignupFlow = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = React.useState<Step>("personal");
  const [formData, setFormData] = React.useState<any>({});

  const personalForm = useForm({
    resolver: zodResolver(personalInfoSchema),
  });

  const organizationForm = useForm({
    resolver: zodResolver(organizationInfoSchema),
  });

  const accountForm = useForm({
    resolver: zodResolver(accountInfoSchema),
  });

  const handleNext = async (data: any) => {
    const newFormData = { ...formData, ...data };
    setFormData(newFormData);

    if (currentStep === "account") {
      try {
        // First create the user
        const { data: signUpData, error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
            data: {
              first_name: formData.firstName,
              last_name: formData.lastName,
              job_title: formData.jobTitle,
              organization_name: formData.organization,
            },
          },
        });

        if (error) throw error;

        setCurrentStep("verification");
        toast({
          title: "Compte créé avec succès",
          description:
            "Veuillez vérifier votre boîte de réception pour confirmer votre email.",
        });
      } catch (error: any) {
        console.error("Signup error:", error);
        toast({
          title: "Erreur",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
    } else {
      setCurrentStep(
        currentStep === "personal"
          ? "organization"
          : currentStep === "organization"
            ? "account"
            : "verification",
      );
    }
  };

  const handleBack = () => {
    setCurrentStep(
      currentStep === "organization"
        ? "personal"
        : currentStep === "account"
          ? "organization"
          : "personal",
    );
  };

  const steps: { id: Step; title: string }[] = [
    { id: "personal", title: "Personnel" },
    { id: "organization", title: "Organisation" },
    { id: "account", title: "Compte" },
    { id: "verification", title: "Vérification" },
  ];

  const renderStep = () => {
    switch (currentStep) {
      case "personal":
        return (
          <form
            onSubmit={personalForm.handleSubmit(handleNext)}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Prénom (obligatoire)</Label>
                <Input {...personalForm.register("firstName")} />
                {personalForm.formState.errors.firstName && (
                  <p className="text-sm text-red-500">
                    {personalForm.formState.errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Nom de famille (obligatoire)</Label>
                <Input {...personalForm.register("lastName")} />
                {personalForm.formState.errors.lastName && (
                  <p className="text-sm text-red-500">
                    {personalForm.formState.errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nom de poste (obligatoire)</Label>
                <Input {...personalForm.register("jobTitle")} />
                {personalForm.formState.errors.jobTitle && (
                  <p className="text-sm text-red-500">
                    {personalForm.formState.errors.jobTitle.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Titre personnel (facultatif)</Label>
                <Input {...personalForm.register("personalTitle")} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Service/Direction (facultatif)</Label>
              <Input {...personalForm.register("department")} />
            </div>

            <div className="space-y-2">
              <Label>Téléphone (obligatoire)</Label>
              <Input {...personalForm.register("phone")} />
              {personalForm.formState.errors.phone && (
                <p className="text-sm text-red-500">
                  {personalForm.formState.errors.phone.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Adresse (obligatoire)</Label>
              <Input {...personalForm.register("address")} />
              {personalForm.formState.errors.address && (
                <p className="text-sm text-red-500">
                  {personalForm.formState.errors.address.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Ville (obligatoire)</Label>
                <Input {...personalForm.register("city")} />
                {personalForm.formState.errors.city && (
                  <p className="text-sm text-red-500">
                    {personalForm.formState.errors.city.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Code postal (obligatoire)</Label>
                <Input {...personalForm.register("postalCode")} />
                {personalForm.formState.errors.postalCode && (
                  <p className="text-sm text-red-500">
                    {personalForm.formState.errors.postalCode.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Pays (obligatoire)</Label>
              <Select
                onValueChange={(value) =>
                  personalForm.setValue("country", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un pays" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CA">Canada</SelectItem>
                  <SelectItem value="FR">France</SelectItem>
                  <SelectItem value="BE">Belgique</SelectItem>
                </SelectContent>
              </Select>
              {personalForm.formState.errors.country && (
                <p className="text-sm text-red-500">
                  {personalForm.formState.errors.country.message}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <Button type="submit">Continuer</Button>
            </div>
          </form>
        );

      case "organization":
        return (
          <form
            onSubmit={organizationForm.handleSubmit(handleNext)}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label>Organisation (obligatoire)</Label>
              <Input
                {...organizationForm.register("organization")}
                placeholder="e.g. MIRS"
              />
              {organizationForm.formState.errors.organization && (
                <p className="text-sm text-red-500">
                  {organizationForm.formState.errors.organization.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nombre d'employés dans votre organisation</Label>
                <Select
                  onValueChange={(value) =>
                    organizationForm.setValue("employeeCount", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une option" />
                  </SelectTrigger>
                  <SelectContent>
                    {["1-49", "50-99", "100-499", "500-999", "1000+"].map(
                      (option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
                {organizationForm.formState.errors.employeeCount && (
                  <p className="text-sm text-red-500">
                    {organizationForm.formState.errors.employeeCount.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Nombre d'employés pour l'enquête</Label>
                <Select
                  onValueChange={(value) =>
                    organizationForm.setValue("surveyEmployeeCount", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une option" />
                  </SelectTrigger>
                  <SelectContent>
                    {["1-49", "50-99", "100-499", "500-999", "1000+"].map(
                      (option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
                {organizationForm.formState.errors.surveyEmployeeCount && (
                  <p className="text-sm text-red-500">
                    {
                      organizationForm.formState.errors.surveyEmployeeCount
                        .message
                    }
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Type d'organisation</Label>
                <Select
                  onValueChange={(value) =>
                    organizationForm.setValue("organizationType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une option" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "À but lucratif",
                      "Sans but lucratif",
                      "Pas de réponse",
                    ].map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {organizationForm.formState.errors.organizationType && (
                  <p className="text-sm text-red-500">
                    {organizationForm.formState.errors.organizationType.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Secteur privé / Secteur public</Label>
                <Select
                  onValueChange={(value) =>
                    organizationForm.setValue("sector", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une option" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Secteur privé", "Secteur public", "Pas de réponse"].map(
                      (option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
                {organizationForm.formState.errors.sector && (
                  <p className="text-sm text-red-500">
                    {organizationForm.formState.errors.sector.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Syndicat / Non syndiqué</Label>
                <Select
                  onValueChange={(value) =>
                    organizationForm.setValue("unionStatus", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une option" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Syndicat",
                      "Non syndiqué",
                      "Un mélange des deux",
                      "Pas de réponse",
                    ].map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {organizationForm.formState.errors.unionStatus && (
                  <p className="text-sm text-red-500">
                    {organizationForm.formState.errors.unionStatus.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Secteur d'activité</Label>
                <Select
                  onValueChange={(value) =>
                    organizationForm.setValue("industry", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une option" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Agriculture, foresterie, pêche et chasse",
                      "Extraction minière, exploitation en carrière, et extraction de pétrole et de gaz",
                      "Services publics",
                      "Construction",
                      "Fabrication",
                      "Commerce de gros",
                      "Commerce de détail",
                      "Transport et entreposage",
                      "Industrie de l'information et industrie culturelle",
                      "Finance et assurances",
                      "Services immobiliers et services de location et de location à bail",
                      "Services professionnels, scientifiques et techniques",
                      "Gestion de sociétés et d'entreprises",
                      "Services administratifs, services de soutien, services de gestion des déchets et services d'assainissement",
                      "Services d'enseignement",
                      "Soins de santé et assistance sociale",
                      "Arts, spectacles et loisirs",
                      "Services d'hébergement et de restauration",
                      "Autres services (sauf les administrations publiques)",
                      "Administrations publiques",
                    ].map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {organizationForm.formState.errors.industry && (
                  <p className="text-sm text-red-500">
                    {organizationForm.formState.errors.industry.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={handleBack}>
                Retour
              </Button>
              <Button type="submit">Continuer</Button>
            </div>
          </form>
        );

      case "account":
        return (
          <form
            onSubmit={accountForm.handleSubmit(handleNext)}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label>Courriel (obligatoire)</Label>
              <Input type="email" {...accountForm.register("email")} />
              {accountForm.formState.errors.email && (
                <p className="text-sm text-red-500">
                  {accountForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Mot de passe (obligatoire)</Label>
              <Input type="password" {...accountForm.register("password")} />
              {accountForm.formState.errors.password && (
                <p className="text-sm text-red-500">
                  {accountForm.formState.errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Retaper le mot de passe (obligatoire)</Label>
              <Input
                type="password"
                {...accountForm.register("confirmPassword")}
              />
              {accountForm.formState.errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {accountForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                onCheckedChange={(checked) =>
                  accountForm.setValue("termsAccepted", checked === true)
                }
              />
              <Label htmlFor="terms" className="text-sm">
                Je me suis familiarisé avec les étapes 1 à 5 et je suis prêt à
                m'inscrire et à lancer un sondage au nom de mon organisation.
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="privacy"
                onCheckedChange={(checked) =>
                  accountForm.setValue("privacyAccepted", checked === true)
                }
              />
              <Label htmlFor="privacy" className="text-sm">
                En m'inscrivant, je consens à ce que mes données soient stockées
                de façon anonyme, sous forme agrégée seulement. Je comprends
                qu'aucune donnée permettant de m'identifier ou d'identifier mon
                organisation ou toute personne interrogée ne sera conservée.
              </Label>
            </div>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={handleBack}>
                Retour
              </Button>
              <Button type="submit">S'inscrire</Button>
            </div>
          </form>
        );

      case "verification":
        return (
          <VerificationSuccess
            email={formData.email}
            onContinue={() => navigate("/dashboard")}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            S'inscrire et lancer une enquête
          </h1>
          <p className="mt-2 text-gray-600">
            Inscrivez-vous pour obtenir votre compte gratuit de Protégeons la
            santé mentale au travail.
          </p>
        </div>

        <Card className="p-6">
          <div className="mb-8">
            <div className="flex justify-between">
              {["personal", "organization", "account", "verification"].map(
                (step, index) => (
                  <div
                    key={step}
                    className={`flex items-center ${index !== 0 ? "ml-4" : ""}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === step ? "bg-primary text-white" : "bg-gray-200"}`}
                    >
                      {index + 1}
                    </div>
                    <div
                      className={`ml-2 text-sm ${currentStep === step ? "text-primary font-medium" : "text-gray-500"}`}
                    >
                      {step === "personal"
                        ? "Personnel"
                        : step === "organization"
                          ? "Organisation"
                          : step === "account"
                            ? "Compte"
                            : "Vérification"}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>

          {renderStep()}
        </Card>
      </div>
    </div>
  );
};

export default SignupFlow;
