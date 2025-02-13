import { Suspense } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./components/auth/AuthProvider";
import Home from "./components/home";
import SignupFlow from "./components/auth/SignupFlow";
import SignInFlow from "./components/auth/SignInFlow";
import OrganizationSetup from "./components/organization/OrganizationSetup";
import SurveyCreationFlow from "./components/survey/SurveyCreationFlow";
import SurveyResponse from "./components/survey/SurveyResponse";
import Dashboard from "./components/dashboard/Dashboard";
import routes from "tempo-routes";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/signup" />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignupFlow />} />
            <Route path="/signin" element={<SignInFlow />} />
            <Route
              path="/organization/setup"
              element={
                <ProtectedRoute>
                  <OrganizationSetup />
                </ProtectedRoute>
              }
            />
            <Route
              path="/survey/create"
              element={
                <ProtectedRoute>
                  <SurveyCreationFlow />
                </ProtectedRoute>
              }
            />
            <Route path="/survey/:surveyId" element={<SurveyResponse />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
