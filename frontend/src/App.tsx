import { useState } from "react";
import { AuthFlow } from "./components/AuthFlow";
import { OnboardingFlow } from "./components/OnboardingFlow";
import { SubscriptionFlow } from "./components/SubscriptionFlow";
import { Dashboard } from "./components/Dashboard";
import { CurrencyProvider } from "./components/CurrencyContext";
import { PasscodeProtection } from "./components/PasscodeProtection";

type AppState = "auth" | "onboarding" | "subscription" | "dashboard";

interface User {
  [key: string]: unknown;
}

interface AuthData {
  [key: string]: unknown;
}

interface BusinessData {
  weeklyMarketingBudget?: string;
  [key: string]: unknown;
}

interface SubscriptionData {
  [key: string]: unknown;
}

export default function App() {
  const [currentState, setCurrentState] = useState<AppState>("auth");
  const [user, setUser] = useState<User | null>(null);

  const handleAuthComplete = (userData: AuthData) => {
    setUser(userData);
    setCurrentState("onboarding");
  };

  const handleOnboardingComplete = (businessData: BusinessData) => {
    // Add derived fields for easier access
    const enrichedBusinessData = {
      ...businessData,
      // Calculate actual marketing budget for easy access
      actualWeeklyMarketingBudget: parseInt(
        businessData.weeklyMarketingBudget || "0",
      ),
    };

    setUser((prev) => ({ ...prev, business: enrichedBusinessData }));
    setCurrentState("subscription");
  };

  const handleSubscriptionComplete = (subscriptionData: SubscriptionData) => {
    setUser((prev) => ({ ...prev, subscription: subscriptionData }));
    setCurrentState("dashboard");
  };

  return (
    <PasscodeProtection>
      <CurrencyProvider>
        <div className="min-h-screen bg-background">
          {currentState === "auth" && (
            <AuthFlow onComplete={handleAuthComplete} />
          )}
          {currentState === "onboarding" && (
            <OnboardingFlow
              user={user}
              onComplete={handleOnboardingComplete}
              onBack={() => setCurrentState("auth")}
            />
          )}
          {currentState === "subscription" && (
            <SubscriptionFlow
              user={user}
              onComplete={handleSubscriptionComplete}
              onBack={() => setCurrentState("onboarding")}
            />
          )}
          {currentState === "dashboard" && (
            <Dashboard
              user={user}
              onLogout={() => {
                setUser(null);
                setCurrentState("auth");
              }}
            />
          )}
        </div>
      </CurrencyProvider>
    </PasscodeProtection>
  );
}
