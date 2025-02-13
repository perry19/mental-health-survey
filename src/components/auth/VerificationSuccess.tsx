import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface VerificationSuccessProps {
  email: string;
  onContinue: () => void;
}

const VerificationSuccess = ({
  email,
  onContinue,
}: VerificationSuccessProps) => {
  useEffect(() => {
    // Trigger confetti animation
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50;

      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: randomInRange(0.1, 0.9),
          y: Math.random() - 0.2,
        },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="p-8 max-w-md mx-auto text-center space-y-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="flex justify-center"
      >
        <CheckCircle className="w-16 h-16 text-green-500" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold">Vérification envoyée !</h2>
        <p className="text-gray-600">
          Nous avons envoyé un code de vérification à{" "}
          <span className="font-medium">{email}</span>. Veuillez vérifier votre
          boîte de réception et entrer le code ci-dessous.
        </p>

        <div className="flex flex-col space-y-4 mt-6">
          <Button
            onClick={onContinue}
            className="w-full bg-green-500 hover:bg-green-600"
          >
            Continuer vers le tableau de bord
          </Button>
          <Button variant="outline" className="w-full">
            Renvoyer le code
          </Button>
        </div>
      </motion.div>
    </Card>
  );
};

export default VerificationSuccess;
