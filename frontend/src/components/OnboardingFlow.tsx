import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  Palette,
  MapPin,
  Sparkles,
  CheckCircle,
  HelpCircle,
  DollarSign,
  AlertCircle,
  Target,
  TrendingUp,
  Calculator,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  getBudgetOptions,
  getCurrentCurrency,
  formatPrice,
} from "./pricing-config";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface OnboardingFlowProps {
  user: any;
  onComplete: (businessData: any) => void;
  onBack: () => void;
}

export function OnboardingFlow({
  user,
  onComplete,
  onBack,
}: OnboardingFlowProps) {
  const [step, setStep] = useState(1);
  const [businessData, setBusinessData] = useState({
    name: "",
    category: "",
    suburb: "",
    postcode: "",
    revenueGoal: "",
    timeframe: "3",
    avgCustomerValue: "",
    weeklyMarketingBudget: "",
    openingHours: "",
    website: "",
    logoUrl: "",
    brandColors: ["#3B82F6", "#10B981"],
    tone: "friendly",
  });

  const [budgetError, setBudgetError] = useState("");

  // Get currency-aware pricing options
  const currentCurrency = getCurrentCurrency();
  const budgetOptions = getBudgetOptions(currentCurrency);
  const minBudget = currentCurrency.code === "AED" ? 25 : 7; // $7 USD ≈ AED 25
  const maxBudget = currentCurrency.code === "AED" ? 10000 : 2700; // $2700 USD ≈ AED 10,000

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const businessCategories = [
    "Restaurant & Food",
    "Medical & Healthcare",
    "Pharmacy & Health",
    "Beauty & Nail Salon",
    "Dental Practice",
    "Professional Services",
    "Retail Store",
    "Fitness & Wellness",
    "Automotive",
    "Real Estate",
    "Other",
  ];

  // Validate marketing budget
  const validateBudget = (value: string) => {
    const numValue = parseInt(value);
    if (value && numValue < minBudget) {
      setBudgetError(
        `Minimum weekly budget is ${formatPrice(minBudget, currentCurrency)}`,
      );
      return false;
    } else {
      setBudgetError("");
      return true;
    }
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(businessData);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const updateBusinessData = (key: string, value: any) => {
    setBusinessData((prev) => ({ ...prev, [key]: value }));
  };

  // Calculate recommended budget based on business goals
  const calculateRecommendedBudget = () => {
    if (!businessData.revenueGoal || !businessData.timeframe) return null;

    const revenueGoal = parseFloat(businessData.revenueGoal);
    const timeframeMonths = parseInt(businessData.timeframe);
    const avgCustomerValue = businessData.avgCustomerValue
      ? parseFloat(businessData.avgCustomerValue)
      : revenueGoal * 0.1; // Default assumption: avg customer is 10% of goal

    // Industry benchmarks (simplified)
    const costPerCustomer = avgCustomerValue * 0.5; // Assume 50% CAC:LTV ratio (conservative)
    const customersNeeded = Math.ceil(revenueGoal / avgCustomerValue);
    const totalAdSpend = customersNeeded * costPerCustomer;
    const weeksInPeriod = timeframeMonths * 4.33; // Average weeks per month
    const weeklyBudget = Math.ceil(totalAdSpend / weeksInPeriod);

    // Round to nearest 10 or 25 for cleaner numbers
    const rounded =
      weeklyBudget < 100
        ? Math.ceil(weeklyBudget / 10) * 10
        : Math.ceil(weeklyBudget / 25) * 25;

    return {
      weeklyBudget: rounded,
      customersNeeded,
      totalAdSpend: Math.ceil(totalAdSpend),
      avgCustomerValue: Math.ceil(avgCustomerValue),
    };
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return (
          businessData.name && businessData.category && businessData.suburb
        );
      case 2:
        return businessData.revenueGoal && businessData.timeframe;
      case 3:
        return (
          businessData.weeklyMarketingBudget &&
          parseInt(businessData.weeklyMarketingBudget) >= minBudget &&
          !budgetError
        );
      case 4:
        return true; // Brand kit is optional
      default:
        return false;
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Progress header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl text-gray-900">Quick Setup</h1>
              <span className="text-sm text-muted-foreground">
                Step {step} of {totalSteps}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="mt-2 text-muted-foreground text-center">
              This will take less than 60 seconds
            </p>
          </div>

          <Card>
            <CardHeader>
              {step === 1 && (
                <>
                  <CardTitle>Tell us about your business</CardTitle>
                  <CardDescription>
                    Help us understand your business so we can create the
                    perfect marketing plan
                  </CardDescription>
                </>
              )}
              {step === 2 && (
                <>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    What's Your Business Goal?
                  </CardTitle>
                  <CardDescription>
                    Help us recommend the right budget to achieve your revenue
                    targets
                  </CardDescription>
                </>
              )}
              {step === 3 && (
                <>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    Set Your Weekly Ad Budget
                  </CardTitle>
                  <CardDescription>
                    This is your weekly spending cap across all platforms. We'll
                    never exceed this amount.
                  </CardDescription>
                </>
              )}
              {step === 4 && (
                <>
                  <CardTitle>Brand kit (optional)</CardTitle>
                  <CardDescription>
                    Upload your logo or let us detect your brand colours from
                    your website
                  </CardDescription>
                </>
              )}
            </CardHeader>

            <CardContent className="space-y-6">
              {step === 1 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="business-name">Business name *</Label>
                      <Input
                        id="business-name"
                        placeholder="e.g. Smith Family Dental"
                        value={businessData.name}
                        onChange={(e) =>
                          updateBusinessData("name", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={businessData.category}
                        onValueChange={(value) =>
                          updateBusinessData("category", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {businessCategories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Location *</Label>
                      <Button
                        variant="outline"
                        className="w-full h-12 justify-start text-left border-dashed hover:border-primary/50 hover:bg-primary/5"
                        onClick={() => {
                          // Mock location detection
                          updateBusinessData("suburb", "Current Location");
                          updateBusinessData("postcode", "12345");
                        }}
                      >
                        <MapPin className="w-4 h-4 mr-2 text-primary" />
                        <span className="text-muted-foreground">
                          Use Current Location
                        </span>
                      </Button>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-border" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          or enter manually
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="suburb">City/Area *</Label>
                        <Input
                          id="suburb"
                          placeholder="e.g. Downtown"
                          value={businessData.suburb}
                          onChange={(e) =>
                            updateBusinessData("suburb", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postcode">ZIP/Postal Code</Label>
                        <Input
                          id="postcode"
                          placeholder="e.g. 10001"
                          value={businessData.postcode}
                          onChange={(e) =>
                            updateBusinessData("postcode", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="opening-hours">Opening hours</Label>
                    <Input
                      id="opening-hours"
                      placeholder="e.g. Mon-Fri 9am-5pm, Sat 10am-2pm"
                      value={businessData.openingHours}
                      onChange={(e) =>
                        updateBusinessData("openingHours", e.target.value)
                      }
                    />
                  </div>
                </>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  {/* Business Goal Section */}
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg">
                      <Target className="w-8 h-8 text-white" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl text-gray-900">
                        Let's set your revenue goal
                      </h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        Tell us what you want to achieve so we can recommend the
                        right ad investment
                      </p>
                    </div>
                  </div>

                  {/* Revenue Goal Input */}
                  <div className="space-y-2">
                    <Label htmlFor="revenue-goal">
                      How much new revenue do you want to generate? *
                    </Label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <span className="text-lg font-medium text-slate-600">
                          {currentCurrency.symbol}
                        </span>
                      </div>
                      <Input
                        id="revenue-goal"
                        type="number"
                        placeholder="10000"
                        min="1000"
                        value={businessData.revenueGoal}
                        onChange={(e) =>
                          updateBusinessData("revenueGoal", e.target.value)
                        }
                        className="pl-12 pr-4 h-14 text-lg border-2 border-primary/20 focus-visible:border-primary"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Example: {formatPrice(10000, currentCurrency)} or{" "}
                      {formatPrice(50000, currentCurrency)}
                    </p>
                  </div>

                  {/* Quick Revenue Suggestions */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      {
                        amount: currentCurrency.code === "AED" ? 35000 : 10000,
                        label: "Conservative",
                      },
                      {
                        amount: currentCurrency.code === "AED" ? 90000 : 25000,
                        label: "Moderate",
                      },
                      {
                        amount: currentCurrency.code === "AED" ? 180000 : 50000,
                        label: "Ambitious",
                      },
                    ].map((suggestion) => (
                      <button
                        key={suggestion.amount}
                        onClick={() =>
                          updateBusinessData(
                            "revenueGoal",
                            suggestion.amount.toString(),
                          )
                        }
                        className={`p-3 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                          businessData.revenueGoal ===
                          suggestion.amount.toString()
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-slate-200 hover:border-primary/50"
                        }`}
                      >
                        <div className="text-center space-y-1">
                          <div className="text-base font-semibold text-gray-900">
                            {formatPrice(suggestion.amount, currentCurrency)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {suggestion.label}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Timeframe Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="timeframe">In what timeframe? *</Label>
                    <Select
                      value={businessData.timeframe}
                      onValueChange={(value) =>
                        updateBusinessData("timeframe", value)
                      }
                    >
                      <SelectTrigger className="h-12 border-2 border-primary/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 months</SelectItem>
                        <SelectItem value="6">6 months</SelectItem>
                        <SelectItem value="12">12 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Optional: Average Customer Value */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="avg-customer-value">
                        Average customer value (optional)
                      </Label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>
                            How much does an average customer spend? This helps
                            us calculate how many customers you need.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <span className="text-base font-medium text-slate-600">
                          {currentCurrency.symbol}
                        </span>
                      </div>
                      <Input
                        id="avg-customer-value"
                        type="number"
                        placeholder="100"
                        value={businessData.avgCustomerValue}
                        onChange={(e) =>
                          updateBusinessData("avgCustomerValue", e.target.value)
                        }
                        className="pl-12 pr-4 h-12 border-2 border-slate-200"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Leave blank if unsure - we'll estimate based on your
                      industry
                    </p>
                  </div>

                  {/* Info Card */}
                  <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <TrendingUp className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-medium text-blue-900">
                            Smart Budget Recommendation
                          </h4>
                          <p className="text-sm text-blue-800">
                            Based on your goal, we'll calculate the recommended
                            weekly ad budget in the next step using
                            industry-standard conversion metrics.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  {/* AI Recommendation (if available) */}
                  {(() => {
                    const recommendation = calculateRecommendedBudget();

                    // Auto-fill budget if not already set and we have a recommendation
                    if (recommendation && !businessData.weeklyMarketingBudget) {
                      setTimeout(() => {
                        updateBusinessData(
                          "weeklyMarketingBudget",
                          recommendation.weeklyBudget.toString(),
                        );
                        validateBudget(recommendation.weeklyBudget.toString());
                      }, 0);
                    }

                    return (
                      recommendation && (
                        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                <Calculator className="w-5 h-5 text-green-600" />
                              </div>
                              <div className="flex-1 space-y-3">
                                <div>
                                  <h4 className="font-medium text-green-900 mb-1">
                                    AI Recommendation
                                  </h4>
                                  <p className="text-sm text-green-800">
                                    Based on your goal of{" "}
                                    <span className="font-semibold">
                                      {formatPrice(
                                        parseFloat(businessData.revenueGoal),
                                        currentCurrency,
                                      )}
                                    </span>{" "}
                                    in {businessData.timeframe} months
                                  </p>
                                </div>

                                <div className="bg-white/60 rounded-lg p-4 space-y-2">
                                  <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-semibold text-green-900">
                                      {formatPrice(
                                        recommendation.weeklyBudget,
                                        currentCurrency,
                                      )}
                                    </span>
                                    <span className="text-sm text-green-700">
                                      /week recommended
                                    </span>
                                  </div>

                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <button className="text-xs text-green-700 hover:text-green-900 flex items-center gap-1 group">
                                        <HelpCircle className="w-3 h-3" />
                                        <span className="underline decoration-dotted">
                                          How we calculated this
                                        </span>
                                      </button>
                                    </TooltipTrigger>
                                    <TooltipContent className="max-w-sm bg-slate-900 text-white border-slate-700">
                                      <div className="space-y-2 text-xs">
                                        <p className="font-medium text-white">
                                          Simple breakdown:
                                        </p>
                                        <div className="space-y-1 text-slate-200">
                                          <p>
                                            • You need ~
                                            {recommendation.customersNeeded}{" "}
                                            customers
                                          </p>
                                          <p>
                                            • At avg. value of{" "}
                                            {formatPrice(
                                              recommendation.avgCustomerValue,
                                              currentCurrency,
                                            )}
                                            /customer
                                          </p>
                                          <p>
                                            • Total ad investment:{" "}
                                            {formatPrice(
                                              recommendation.totalAdSpend,
                                              currentCurrency,
                                            )}
                                          </p>
                                          <p>
                                            • Spread over{" "}
                                            {parseInt(businessData.timeframe) *
                                              4}{" "}
                                            weeks
                                          </p>
                                        </div>
                                        <p className="text-xs pt-1 border-t border-slate-600 text-slate-300">
                                          Based on industry-standard conversion
                                          rates for{" "}
                                          {businessData.category ||
                                            "your industry"}
                                        </p>
                                      </div>
                                    </TooltipContent>
                                  </Tooltip>
                                </div>

                                <p className="text-xs text-green-700">
                                  💡 You can adjust this below to match your
                                  comfort zone
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    );
                  })()}

                  {/* Main Budget Input Section */}
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg">
                      <DollarSign className="w-8 h-8 text-white" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl text-gray-900">
                        {calculateRecommendedBudget()
                          ? "Confirm or adjust your weekly ad budget"
                          : "What's your weekly ad budget?"}
                      </h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        Set your comfort zone. Our AI will distribute this
                        across Facebook, Instagram, Google, and WhatsApp
                        campaigns.
                      </p>
                    </div>
                  </div>

                  {/* Budget Input */}
                  <Card className="bg-gradient-to-br from-slate-50 to-blue-50 border-slate-200 shadow-sm">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center">
                            <span className="text-lg font-medium text-slate-600">
                              {currentCurrency.symbol}
                            </span>
                          </div>
                          <Input
                            type="number"
                            placeholder="0"
                            min={minBudget.toString()}
                            max={maxBudget.toString()}
                            value={businessData.weeklyMarketingBudget}
                            onChange={(e) => {
                              const value = e.target.value;
                              updateBusinessData(
                                "weeklyMarketingBudget",
                                value,
                              );
                              validateBudget(value);
                            }}
                            className={`pl-16 pr-20 text-2xl h-16 text-center font-medium border-2 ${
                              budgetError
                                ? "border-destructive focus-visible:ring-destructive"
                                : "border-primary/20 focus-visible:border-primary focus-visible:ring-primary/20"
                            }`}
                          />
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center">
                            <span className="text-lg font-medium text-slate-600">
                              /week
                            </span>
                          </div>
                        </div>

                        {budgetError && (
                          <div className="flex items-center justify-center gap-2 text-destructive">
                            <AlertCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              {budgetError}
                            </span>
                          </div>
                        )}

                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">
                            Minimum {formatPrice(minBudget, currentCurrency)}
                            /week • Maximum{" "}
                            {formatPrice(maxBudget, currentCurrency)}/week
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Budget Suggestions */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      {
                        amount: 100,
                        label: "Starter",
                        desc: "Test the waters",
                      },
                      { amount: 250, label: "Popular", desc: "Most chosen" },
                      { amount: 500, label: "Growth", desc: "Scale fast" },
                    ].map((suggestion) => (
                      <button
                        key={suggestion.amount}
                        onClick={() => {
                          updateBusinessData(
                            "weeklyMarketingBudget",
                            suggestion.amount.toString(),
                          );
                          validateBudget(suggestion.amount.toString());
                        }}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                          businessData.weeklyMarketingBudget ===
                          suggestion.amount.toString()
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-slate-200 hover:border-primary/50"
                        }`}
                      >
                        <div className="text-center space-y-1">
                          <div className="text-lg font-semibold text-gray-900">
                            {formatPrice(suggestion.amount, currentCurrency)}
                          </div>
                          <div className="text-xs font-medium text-primary">
                            {suggestion.label}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {suggestion.desc}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* How it works */}
                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                          <Sparkles className="w-3 h-3 text-green-600" />
                        </div>
                        <h4 className="font-medium text-green-900">
                          Smart Budget Protection
                        </h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-green-800">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                          <span>Auto-distribute across platforms</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                          <span>Pause when limit reached</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                          <span>Never exceed your cap</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                          <span>Change anytime you want</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="website">Website URL (optional)</Label>
                      <Input
                        id="website"
                        placeholder="https://www.yourbusiness.com"
                        value={businessData.website}
                        onChange={(e) =>
                          updateBusinessData("website", e.target.value)
                        }
                      />
                      <p className="text-xs text-muted-foreground">
                        We'll automatically detect your brand colours and tone
                      </p>
                    </div>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary/50 hover:bg-primary/5 transition-colors">
                      {businessData.logoUrl ? (
                        <div className="space-y-3">
                          <div className="w-16 h-16 mx-auto bg-white rounded-lg border border-gray-200 p-2 flex items-center justify-center">
                            <ImageWithFallback
                              src={businessData.logoUrl}
                              alt="Business logo"
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                          <p className="text-sm text-green-700 font-medium">
                            Logo uploaded successfully!
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateBusinessData("logoUrl", "")}
                          >
                            Change logo
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <Upload className="w-8 h-8 mx-auto text-gray-400" />
                          <div>
                            <p className="text-sm font-medium mb-1">
                              Upload your logo
                            </p>
                            <p className="text-xs text-muted-foreground">
                              PNG, JPG or SVG up to 5MB
                            </p>
                          </div>
                          <input
                            type="file"
                            id="logo-upload"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                // In a real app, you'd upload to cloud storage
                                // For demo, we'll use a placeholder URL
                                updateBusinessData(
                                  "logoUrl",
                                  "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&h=100&fit=crop&crop=center",
                                );
                              }
                            }}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              document.getElementById("logo-upload")?.click()
                            }
                          >
                            Choose file
                          </Button>
                        </div>
                      )}
                    </div>

                    {businessData.website && (
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Palette className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-800">
                            Brand colours detected!
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          {businessData.brandColors.map((color, index) => (
                            <div
                              key={index}
                              className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm mb-2">Next steps:</h4>
                    <p className="text-sm text-muted-foreground">
                      After setup, we'll connect your Facebook, Instagram,
                      Google Business Profile, and WhatsApp accounts. Then our
                      AI will generate your first 4-week marketing plan!
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button onClick={handleNext} disabled={!canProceed()}>
              {step === totalSteps ? "Complete Setup" : "Continue"}
              {step < totalSteps && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
