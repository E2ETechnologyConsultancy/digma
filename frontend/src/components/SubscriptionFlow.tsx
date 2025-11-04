import { useState } from "react";
import * as React from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import {
  Check,
  Zap,
  Shield,
  TrendingUp,
  Clock,
  Users,
  ArrowLeft,
  CreditCard,
  Gift,
  Sparkles,
  AlertCircle,
  Crown,
  DollarSign,
} from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import {
  getPricingTiers,
  getCurrentCurrency,
  formatPrice,
  formatWeeklyBudget,
} from "./pricing-config";
import { PricingCard } from "./PricingCard";

interface SubscriptionFlowProps {
  user: any;
  onComplete: (subscriptionData: any) => void;
  onBack: () => void;
}

export function SubscriptionFlow({
  user,
  onComplete,
  onBack,
}: SubscriptionFlowProps) {
  const [isAnnual, setIsAnnual] = useState(false);
  // Initialize with recommended plan based on budget
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  // Get pricing tiers for current currency
  const currentCurrency = getCurrentCurrency();
  const plans = getPricingTiers(currentCurrency);
  const countryName =
    currentCurrency.code === "AED" ? "United Arab Emirates" : "International";
  const marketDescription =
    currentCurrency.code === "AED" ? "UAE businesses" : "international markets";

  // Check if user stated a marketing budget during onboarding
  const actualWeeklyBudget = parseInt(
    user?.business?.weeklyMarketingBudget || "0",
  );

  // Recommend plan based on budget (budget values are converted to current currency)
  const getRecommendedPlan = () => {
    const liteBudget = plans[0].weeklyAdBudget;
    const starterBudget = plans[1].weeklyAdBudget;
    const growthBudget = plans[2].weeklyAdBudget;

    if (actualWeeklyBudget <= liteBudget) return "lite";
    if (actualWeeklyBudget <= starterBudget) return "starter";
    if (actualWeeklyBudget <= growthBudget) return "growth";
    return "enterprise";
  };

  const recommendedPlanId = actualWeeklyBudget > 0 ? getRecommendedPlan() : "";

  // Initialize with recommended plan if available
  React.useEffect(() => {
    if (recommendedPlanId && !selectedPlan) {
      setSelectedPlan(recommendedPlanId);
    }
  }, [recommendedPlanId, selectedPlan]);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleSubscribe = async () => {
    if (!selectedPlan) return;

    const plan = plans.find((p) => p.id === selectedPlan);

    // Handle Enterprise tier - redirect to contact sales
    if (plan?.contactSales) {
      // In a real app, this would open a contact form or redirect to sales
      const contactData = {
        planId: selectedPlan,
        planName: plan?.name,
        status: "contact_requested",
        contactType: "enterprise_sales",
        requestDate: new Date().toISOString(),
        businessBudget: actualWeeklyBudget,
      };

      onComplete(contactData);
      return;
    }

    setIsProcessing(true);

    // Simulate Stripe payment processing for other plans
    setTimeout(() => {
      const subscriptionData = {
        planId: selectedPlan,
        planName: plan?.name,
        price: isAnnual ? plan?.annualPrice : plan?.monthlyPrice,
        billing: isAnnual ? "annual" : "monthly",
        stripeSubscriptionId: "sub_" + Math.random().toString(36).substr(2, 9),
        status: "active",
        startDate: new Date().toISOString(),
        nextBilling: new Date(
          Date.now() + (isAnnual ? 365 : 30) * 24 * 60 * 60 * 1000,
        ).toISOString(),
      };

      onComplete(subscriptionData);
      setIsProcessing(false);
    }, 2000);
  };

  const handleDemoStart = () => {
    const demoData = {
      planId: "demo",
      planName: "Demo Trial",
      price: 0,
      billing: "demo",
      stripeSubscriptionId: "demo_" + Math.random().toString(36).substr(2, 9),
      status: "trial",
      startDate: new Date().toISOString(),
      trialEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      limitations: {
        maxCampaigns: 5,
        maxBudgetPerDay: 20,
        platformsAllowed: ["facebook", "instagram"],
      },
    };

    onComplete(demoData);
  };

  if (showDemo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="max-w-md mx-auto pt-8">
          <div className="text-center mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDemo(false)}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Plans
            </Button>
            <Gift className="w-16 h-16 mx-auto text-purple-600 mb-4" />
            <h1 className="text-2xl mb-2">Try DigMa Free</h1>
            <p className="text-muted-foreground">
              30-day demo with limited features to get you started
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader className="text-center">
              <CardTitle className="text-lg">Demo Access Includes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-sm">5 AI-generated campaigns</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-sm">Facebook & Instagram posting</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-sm">
                  {formatWeeklyBudget(plans[0].weeklyAdBudget, currentCurrency)}{" "}
                  budget cap
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-sm">Basic analytics</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-sm">Email support</span>
              </div>
            </CardContent>
          </Card>

          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              Demo limitations: No Google Business or WhatsApp campaigns.
              Limited to 5 total campaigns during trial period.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <Button
              className="w-full h-12 bg-purple-600 hover:bg-purple-700"
              onClick={handleDemoStart}
            >
              <Gift className="w-5 h-5 mr-2" />
              Start Free Demo
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              No credit card required • Upgrade anytime during trial
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Button variant="ghost" size="sm" onClick={onBack} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          {actualWeeklyBudget > 0 ? (
            <>
              <h1 className="text-2xl mb-2">Choose Your DigMa Plan</h1>
              <p className="text-muted-foreground mb-2">
                Based on your{" "}
                {formatWeeklyBudget(actualWeeklyBudget, currentCurrency)}{" "}
                marketing budget, we recommend these plans
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl mb-2">Choose Your DigMa Plan</h1>
              <p className="text-muted-foreground mb-2">
                Start your AI-powered marketing autopilot for{" "}
                {marketDescription}
              </p>
            </>
          )}
          <p className="text-sm text-muted-foreground mb-4">
            📍 Pricing for {countryName} ({currentCurrency.code})
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span
              className={`text-sm ${!isAnnual ? "font-medium" : "text-muted-foreground"}`}
            >
              Monthly
            </span>
            <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
            <span
              className={`text-sm ${isAnnual ? "font-medium" : "text-muted-foreground"}`}
            >
              Annual
            </span>
            {isAnnual && (
              <Badge variant="secondary" className="text-xs">
                Save 20%
              </Badge>
            )}
          </div>
        </div>

        {/* Demo Option */}
        {
          <Card className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <Gift className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg">Try Before You Buy</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Not sure yet? Start with a 30-day demo with limited features
              </p>
              <Button
                variant="outline"
                onClick={() => setShowDemo(true)}
                className="border-purple-300 text-purple-700 hover:bg-purple-50"
              >
                <Gift className="w-4 h-4 mr-2" />
                Try Demo for 1 Month
              </Button>
            </CardContent>
          </Card>
        }

        {/* Budget Summary */}
        {actualWeeklyBudget > 0 && (
          <Card className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-center gap-3">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-900">
                  Your Marketing Budget:{" "}
                  {formatWeeklyBudget(actualWeeklyBudget, currentCurrency)}
                </span>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  {recommendedPlanId === "lite" && "Lite Plan Recommended"}
                  {recommendedPlanId === "starter" &&
                    "Starter Plan Recommended"}
                  {recommendedPlanId === "growth" && "Growth Plan Recommended"}
                  {recommendedPlanId === "enterprise" &&
                    "Enterprise Plan Recommended"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {plans.map((plan) => {
            const isRecommended = plan.id === recommendedPlanId;
            const budgetFitsWell =
              actualWeeklyBudget > 0 &&
              actualWeeklyBudget <= plan.weeklyAdBudget;

            return (
              <div key={plan.id} className="relative">
                {isRecommended && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10 bg-green-600 text-white shadow-md">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Recommended
                  </Badge>
                )}
                <PricingCard
                  tier={plan}
                  isAnnual={isAnnual}
                  selected={selectedPlan === plan.id}
                  onSelect={handlePlanSelect}
                  compact={true}
                  className={
                    isRecommended ? "ring-2 ring-green-500 ring-offset-2" : ""
                  }
                />
                {budgetFitsWell && actualWeeklyBudget > 0 && (
                  <div className="mt-2 text-center">
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      ✓ Fits your{" "}
                      {formatWeeklyBudget(actualWeeklyBudget, currentCurrency)}{" "}
                      budget
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        {selectedPlan && (
          <div className="text-center">
            <Button
              className={`w-full md:w-auto px-12 h-12 ${
                plans.find((p) => p.id === selectedPlan)?.contactSales
                  ? "bg-slate-900 hover:bg-slate-800"
                  : "bg-primary hover:bg-blue-700"
              }`}
              onClick={handleSubscribe}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  {plans.find((p) => p.id === selectedPlan)?.contactSales ? (
                    <>
                      <Users className="w-5 h-5 mr-2" />
                      Contact Sales for{" "}
                      {plans.find((p) => p.id === selectedPlan)?.name}
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Subscribe to{" "}
                      {plans.find((p) => p.id === selectedPlan)?.name}
                    </>
                  )}
                </>
              )}
            </Button>

            <div className="mt-4 space-y-2">
              {plans.find((p) => p.id === selectedPlan)?.contactSales ? (
                <>
                  <p className="text-xs text-muted-foreground">
                    📞 Our sales team will contact you within 24 hours
                  </p>
                  <p className="text-xs text-muted-foreground">
                    💼 Custom pricing based on your requirements
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xs text-muted-foreground">
                    🔒 Secure payment powered by Stripe • Cancel anytime
                  </p>
                  <p className="text-xs text-muted-foreground">
                    💡 Platform ads billed directly by Facebook/Google • DigMa
                    subscription separate
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        {/* Non-custodial billing explanation */}
        {selectedPlan &&
          !plans.find((p) => p.id === selectedPlan)?.contactSales && (
            <Card className="mt-8">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h4 className="text-sm mb-2">Non-Custodial Billing</h4>
                    <p className="text-xs text-muted-foreground">
                      Your DigMa subscription (
                      {formatPrice(
                        isAnnual
                          ? plans.find((p) => p.id === selectedPlan)
                              ?.annualPrice || 0
                          : plans.find((p) => p.id === selectedPlan)
                              ?.monthlyPrice || 0,
                      )}
                      {isAnnual ? "/year" : "/month"}) covers the AI platform
                      and management tools. Ad spend is billed directly by
                      Facebook, Google, and WhatsApp to your connected accounts
                      - we never hold your ad budget.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
      </div>
    </div>
  );
}
