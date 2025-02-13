import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/supabase";

const signInSchema = z.object({
  email: z.string().email("L'adresse courriel est invalide"),
  password: z.string().min(1, "Le mot de passe est requis"),
});

const SignInFlow = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté",
      });

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Connexion</h1>
          <p className="mt-2 text-gray-600">
            Connectez-vous à votre compte Protégeons la santé mentale au travail
          </p>
        </div>

        <Card className="p-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label>Courriel</Label>
              <Input type="email" {...form.register("email")} />
              {form.formState.errors.email && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Mot de passe</Label>
              <Input type="password" {...form.register("password")} />
              {form.formState.errors.password && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Se connecter
            </Button>

            <div className="text-center text-sm">
              <Button
                variant="link"
                className="text-primary"
                onClick={() => navigate("/signup")}
              >
                Pas encore de compte ? S'inscrire
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SignInFlow;
