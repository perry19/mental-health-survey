import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import SurveyTypeSelector from "./survey/SurveyTypeSelector";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { useAuth } from "./auth/AuthProvider";

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { user } = useAuth();

  const handleGetStarted = () => {
    if (!user) {
      navigate("/signup");
      return;
    }
    const element = document.getElementById("survey-selector");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSurveyTypeSelect = (type: "comprehensive" | "quick") => {
    if (!user) {
      navigate("/signup");
      return;
    }
    navigate(`/survey/builder?type=${type}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <HeroSection onCtaClick={handleGetStarted} />

        {/* Product Screenshots */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">{t("features.title")}</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {t("features.subtitle")}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
                  <img
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3"
                    alt="Survey Builder"
                    className="w-full"
                  />
                </div>
                <h3 className="text-2xl font-bold">
                  {t("features.builder.title")}
                </h3>
                <p className="text-gray-600">
                  {t("features.builder.description")}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3"
                    alt="Analytics Dashboard"
                    className="w-full"
                  />
                </div>
                <h3 className="text-2xl font-bold">
                  {t("features.analytics.title")}
                </h3>
                <p className="text-gray-600">
                  {t("features.analytics.description")}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <div id="survey-selector" className="py-16 px-4 sm:px-6 lg:px-8">
          <SurveyTypeSelector onSelect={handleSurveyTypeSelect} />
        </div>

        {/* Trust Indicators Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">{t("trust.title")}</h2>
              <p className="text-xl text-gray-600">{t("trust.subtitle")}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
            >
              {[
                { stat: "1M+", label: t("trust.stats.responses") },
                { stat: "500+", label: t("trust.stats.clients") },
                { stat: "99.9%", label: t("trust.stats.uptime") },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-8 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="text-4xl font-bold text-primary mb-2">
                    {item.stat}
                  </div>
                  <div className="text-gray-600">{item.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="bg-[#225789] py-20 px-4 sm:px-6 lg:px-8 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-6">{t("cta.title")}</h2>
            <p className="text-xl mb-8 opacity-90">{t("cta.subtitle")}</p>
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="bg-white text-[#225789] hover:bg-gray-100 text-lg px-8 py-6 rounded-full"
            >
              {t("cta.button")}
            </Button>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default Home;
