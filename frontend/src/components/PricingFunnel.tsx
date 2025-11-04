import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowLeft, Sparkles } from "lucide-react";
import {
  getPricingTiers,
  getCurrentCurrency,
  formatPrice,
  formatWeeklyBudget,
} from "./pricing-config";
import { PricingCard } from "./PricingCard";

interface PricingFunnelProps {
  onBack?: () => void;
  onSelectPlan?: (planId: string) => void;
}

export default function PricingFunnel({
  onBack,
  onSelectPlan,
}: PricingFunnelProps) {
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [isAnnual, setIsAnnual] = useState(false);

  // Get pricing tiers for current currency
  const currentCurrency = getCurrentCurrency();
  const plans = getPricingTiers(currentCurrency);
  const countryName =
    currentCurrency.code === "AED" ? "United Arab Emirates" : "International";
  const marketDescription =
    currentCurrency.code === "AED" ? "UAE businesses" : "international markets";

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    if (onSelectPlan) {
      onSelectPlan(planId);
    }
  };

  const selectedTier = plans.find((t) => t.id === selectedPlan);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-6xl mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          {onBack && (
            <Button variant="ghost" size="sm" onClick={onBack} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Plans
            </Button>
          )}

          <h1 className="text-3xl mb-2">Choose Your DigMa Plan</h1>
          <p className="text-muted-foreground mb-4">
            AI-powered marketing automation for {marketDescription}
          </p>

          {/* Market Indicator */}
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Badge className="bg-primary/10 text-primary border-primary/20">
              📍 {countryName} Pricing ({currentCurrency.code})
            </Badge>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Button
              variant={!isAnnual ? "default" : "outline"}
              size="sm"
              onClick={() => setIsAnnual(false)}
            >
              Monthly
            </Button>
            <Button
              variant={isAnnual ? "default" : "outline"}
              size="sm"
              onClick={() => setIsAnnual(true)}
            >
              Annual
              <Badge variant="secondary" className="ml-2 text-xs">
                Save ~15%
              </Badge>
            </Button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {plans.map((tier) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              isAnnual={isAnnual}
              selected={selectedPlan === tier.id}
              onSelect={handleSelectPlan}
            />
          ))}
        </div>

        {/* Selection Summary */}
        {selectedPlan && selectedTier && (
          <div className="text-center bg-white rounded-lg p-6 shadow-md border border-primary/20">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="text-lg">
                Perfect! You selected the{" "}
                <span className="font-semibold text-primary">
                  {selectedTier.name}
                </span>{" "}
                plan
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4 text-left">
              <div className="bg-slate-50 rounded-lg p-4">
                <h4 className="font-medium mb-2">Your Plan Details:</h4>
                <p className="text-sm">
                  •{" "}
                  {formatPrice(
                    isAnnual
                      ? selectedTier.annualPrice
                      : selectedTier.monthlyPrice,
                    currentCurrency,
                  )}{" "}
                  /{isAnnual ? "year" : "month"}
                </p>
                <p className="text-sm">
                  •{" "}
                  {formatWeeklyBudget(
                    selectedTier.weeklyAdBudget,
                    currentCurrency,
                  )}{" "}
                  ad budget cap
                </p>
                <p className="text-sm">• {selectedTier.support}</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium mb-2">What Happens Next:</h4>
                <p className="text-sm">
                  ✅ 14-day free trial starts immediately
                  <br />
                  ✅ Connect your social accounts
                  <br />
                  ✅ AI generates your first campaigns
                  <br />✅ No payment until trial ends
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="bg-primary hover:bg-blue-700 px-8">
                Start 14-Day Free Trial
              </Button>
              <Button variant="outline" onClick={() => setSelectedPlan("")}>
                Change Plan
              </Button>
            </div>
          </div>
        )}

        {/* Info Footer */}
        <div className="mt-8 text-center space-y-2">
          <p className="text-xs text-muted-foreground">
            💡 14-day free trial • No setup fees • Cancel anytime
          </p>
          <p className="text-xs text-muted-foreground">
            🔒 Ad spend billed directly by platforms • DigMa subscription
            separate
          </p>
          <p className="text-xs text-muted-foreground">
            📍 Optimized for {marketDescription} • All prices in{" "}
            {currentCurrency.code}
          </p>
        </div>
      </div>
    </div>
  );
}
