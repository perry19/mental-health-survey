import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          nav: {
            solutions: "Solutions",
            employeeSurveys: "Employee Surveys",
            employeeSurveysDesc: "Comprehensive workplace assessments",
            pulseSurveys: "Pulse Surveys",
            pulseSurveysDesc: "Quick team temperature checks",
            resources: "Resources",
            documentation: "Documentation",
            documentationDesc: "Learn how to use our platform",
            bestPractices: "Best Practices",
            bestPracticesDesc: "Survey creation guidelines",
            signIn: "Sign In",
            getStarted: "Get Started",
          },
          hero: {
            title: "Transform Workplace Wellbeing",
            subtitle:
              "Create, distribute and analyze psychological health assessments with our professional survey platform designed for HR managers.",
            cta: "Get Started",
            watchDemo: "Watch Demo",
            trustedBy: "Trusted by leading organizations",
            surveyCompleted: "Survey Completed",
            responseRate: "Response rate: {{rate}}",
          },
          features: {
            title: "Powerful Features",
            subtitle:
              "Everything you need to create and manage psychological health surveys",
            builder: {
              title: "Intuitive Survey Builder",
              description: "Drag and drop interface for easy survey creation",
            },
            analytics: {
              title: "Advanced Analytics",
              description: "Comprehensive insights and reporting tools",
            },
            secure: {
              title: "Enterprise Security",
              description: "ISO 45003:2021 compliant with data encryption",
            },
          },
          trust: {
            title: "Trusted by Leading Organizations",
            subtitle:
              "Join thousands of companies improving workplace wellbeing",
            stats: {
              responses: "Survey Responses",
              clients: "Enterprise Clients",
              uptime: "Uptime Guarantee",
            },
          },
          cta: {
            title: "Ready to improve workplace wellbeing?",
            subtitle: "Start creating your psychological health survey today.",
            button: "Get Started Now",
          },
        },
      },
      fr: {
        translation: {
          nav: {
            solutions: "Solutions",
            employeeSurveys: "Sondages employés",
            employeeSurveysDesc: "Évaluations complètes du milieu de travail",
            pulseSurveys: "Sondages rapides",
            pulseSurveysDesc: "Vérifications rapides d'équipe",
            resources: "Ressources",
            documentation: "Documentation",
            documentationDesc: "Apprenez à utiliser notre plateforme",
            bestPractices: "Meilleures pratiques",
            bestPracticesDesc: "Guides de création de sondages",
            signIn: "Connexion",
            getStarted: "Commencer",
          },
          hero: {
            title: "Évaluer et assurer la santé et la sécurité psychologiques",
            subtitle:
              "Bienvenue dans le site Protégeons la santé mentale au travail, une vaste ressource qui a pour but de vous aider à évaluer la santé et la sécurité psychologiques dans votre milieu de travail et à y veiller.",
            cta: "Commencer",
            watchDemo: "Voir la démo",
            trustedBy: "Fait confiance par les organisations leaders",
            surveyCompleted: "Sondage complété",
            responseRate: "Taux de réponse : {{rate}}",
          },
          features: {
            title: "Fonctionnalités puissantes",
            subtitle:
              "Tout ce dont vous avez besoin pour créer et gérer des sondages de santé psychologique",
            builder: {
              title: "Créateur de sondage intuitif",
              description: "Interface glisser-déposer pour une création facile",
            },
            analytics: {
              title: "Analyses avancées",
              description: "Aperçus complets et outils de rapport",
            },
            secure: {
              title: "Sécurité entreprise",
              description:
                "Conforme à ISO 45003:2021 avec cryptage des données",
            },
          },
          trust: {
            title: "Approuvé par les organisations leaders",
            subtitle:
              "Rejoignez des milliers d'entreprises améliorant le bien-être au travail",
            stats: {
              responses: "Réponses aux sondages",
              clients: "Clients entreprises",
              uptime: "Garantie de disponibilité",
            },
          },
          cta: {
            title: "Prêt à améliorer le bien-être au travail ?",
            subtitle:
              "Commencez à créer votre sondage de santé psychologique aujourd'hui.",
            button: "Commencer maintenant",
          },
        },
      },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
