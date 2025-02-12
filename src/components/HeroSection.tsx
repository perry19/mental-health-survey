import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface HeroSectionProps {
  onCtaClick?: () => void;
}

const companyLogos = [
  {
    name: "Company 1",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png",
  },
  {
    name: "Company 2",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png",
  },
  {
    name: "Company 3",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png",
  },
  {
    name: "Company 4",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
  },
];

const steps = [
  "Assurer l'état de préparation de l'organisation",
  "Comprendre les facteurs et les risques",
  "Déterminer la stratégie d'évaluation",
  "Créer un plan",
  "S'inscrire et lancer une enquête",
  "Examiner les résultats",
  "Agir",
  "Effectuer une évaluation et prévoir les prochaines étapes",
];

const HeroSection: React.FC<HeroSectionProps> = ({ onCtaClick = () => {} }) => {
  const { t } = useTranslation();

  return (
    <div className="relative w-full bg-gradient-to-b from-[#225789]/5 to-white/95 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3')] opacity-5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-gray-600">{t("hero.subtitle")}</p>
            <div className="flex gap-4">
              <Button
                size="lg"
                className="text-lg px-8 py-6 rounded-full bg-[#E26554] hover:bg-[#E26554]/90"
                onClick={onCtaClick}
              >
                {t("hero.cta")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 rounded-full"
              >
                {t("hero.watchDemo")}
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-6">
                {t("hero.trustedBy")}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
                {companyLogos.map((company, index) => (
                  <motion.img
                    key={index}
                    src={company.logo}
                    alt={company.name}
                    className="h-8 object-contain grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 0.5, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - App Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mt-8 lg:mt-0"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              <img
                src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3"
                alt="App preview"
                className="w-full rounded-2xl"
              />
              {/* Floating Elements */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg max-w-xs"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <svg
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">{t("hero.surveyCompleted")}</p>
                    <p className="text-sm text-gray-500">
                      {t("hero.responseRate", { rate: "92%" })}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Steps Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24 pb-20"
        >
          <h2 className="text-3xl font-bold mb-12 text-center">
            Comment utiliser Protégeons la santé mentale au travail
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative pl-12"
              >
                <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-[#E26554] text-white flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <p className="text-lg font-medium">{step}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
