import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import {
  CheckCircle,
  Clock,
  X,
  ArrowRight,
  Target,
  DollarSign,
  Calendar,
  Settings,
  Edit3,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

interface CampaignUseModalProps {
  campaign: any;
  onClose: () => void;
  onConfirm: () => void;
}

export function CampaignUseModal({
  campaign,
  onClose,
  onConfirm,
}: CampaignUseModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const steps = [
    {
      title: "Review Campaign",
      description: "Double-check the campaign details",
    },
    {
      title: "Choose Schedule",
      description: "When should this campaign go live?",
    },
    {
      title: "Final Settings",
      description: "Budget and targeting confirmation",
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleConfirm();
    }
  };

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onConfirm();
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative pb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-2 top-2 h-8 w-8 p-0 hover:bg-muted"
          >
            <X className="w-4 h-4" />
          </Button>

          <div className="pr-8">
            <CardTitle className="text-lg">Use This Campaign</CardTitle>
            <CardDescription className="text-sm">
              {campaign.generated.title}
            </CardDescription>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center space-x-2 mt-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                    index <= currentStep
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index < currentStep ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 h-1 mx-1 rounded transition-colors ${
                      index < currentStep ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-2">
            <h3 className="font-medium text-sm">{steps[currentStep].title}</h3>
            <p className="text-xs text-muted-foreground">
              {steps[currentStep].description}
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Step 1: Review Campaign */}
          {currentStep === 0 && (
            <div className="space-y-4">
              {/* Campaign Preview */}
              <div className="bg-muted/30 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {campaign.type.replace("_", " ").toUpperCase()}
                  </Badge>
                  <Sparkles className="w-4 h-4 text-purple-600" />
                </div>

                {campaign.generated.image && (
                  <img
                    src={campaign.generated.image}
                    alt="Campaign preview"
                    className="w-full h-24 object-cover rounded mb-2"
                  />
                )}

                {campaign.generated.caption && (
                  <p className="text-sm text-foreground mb-2 line-clamp-3">
                    {campaign.generated.caption}
                  </p>
                )}

                {campaign.generated.description && (
                  <p className="text-sm text-foreground">
                    {campaign.generated.description}
                  </p>
                )}
              </div>

              {/* Expected Performance */}
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-2 bg-blue-50 rounded">
                  <p className="text-sm font-semibold text-blue-700">4.2×</p>
                  <p className="text-xs text-blue-600">ROAS</p>
                </div>
                <div className="text-center p-2 bg-green-50 rounded">
                  <p className="text-sm font-semibold text-green-700">12-18</p>
                  <p className="text-xs text-green-600">Conversions</p>
                </div>
                <div className="text-center p-2 bg-purple-50 rounded">
                  <p className="text-sm font-semibold text-purple-700">
                    {campaign.generated.budget?.estimatedReach?.split("-")[0] ||
                      "800"}
                    +
                  </p>
                  <p className="text-xs text-purple-600">Reach</p>
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full">
                <Edit3 className="w-4 h-4 mr-2" />
                Customise Content
              </Button>
            </div>
          )}

          {/* Step 2: Choose Schedule */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-between p-4 h-auto bg-primary/5 border-primary/20"
                >
                  <div className="text-left">
                    <p className="font-medium text-sm">AI Optimal Timing</p>
                    <p className="text-xs text-muted-foreground">
                      Based on your audience activity
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      Recommended
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      Today, 2:30 PM
                    </p>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-between p-4 h-auto"
                >
                  <div className="text-left">
                    <p className="font-medium text-sm">Schedule for Later</p>
                    <p className="text-xs text-muted-foreground">
                      Choose specific date and time
                    </p>
                  </div>
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-between p-4 h-auto"
                >
                  <div className="text-left">
                    <p className="font-medium text-sm">Save as Draft</p>
                    <p className="text-xs text-muted-foreground">
                      Review and publish manually
                    </p>
                  </div>
                  <Settings className="w-4 h-4 text-muted-foreground" />
                </Button>
              </div>

              <Separator />

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">
                    AI Insight
                  </span>
                </div>
                <p className="text-xs text-blue-700">
                  Your audience is most active between 2-4 PM on weekdays.
                  Posting now will maximise reach and engagement.
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Final Settings */}
          {currentStep === 2 && (
            <div className="space-y-4">
              {/* Budget Overview */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">
                      Budget Allocation
                    </span>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    Within Limits
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-700">Daily Spend:</span>
                    <span className="font-medium text-green-800">
                      AU${campaign.generated.budget?.daily || 12}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-700">Duration:</span>
                    <span className="font-medium text-green-800">
                      {campaign.generated.budget?.duration || "3 days"}
                    </span>
                  </div>
                  <Progress value={65} className="h-2" />
                  <p className="text-xs text-green-600">
                    65% of weekly budget remaining (AU$48 available)
                  </p>
                </div>
              </div>

              {/* Targeting Summary */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-800">
                    Target Audience
                  </span>
                </div>
                <div className="space-y-1 text-xs text-purple-700">
                  {campaign.generated.targeting?.location && (
                    <p>
                      <strong>Location:</strong>{" "}
                      {campaign.generated.targeting.location}
                    </p>
                  )}
                  {campaign.generated.targeting?.demographics && (
                    <p>
                      <strong>Audience:</strong>{" "}
                      {campaign.generated.targeting.demographics}
                    </p>
                  )}
                  {campaign.generated.targeting?.timing && (
                    <p>
                      <strong>Best Times:</strong>{" "}
                      {campaign.generated.targeting.timing}
                    </p>
                  )}
                </div>
              </div>

              {/* Final Confirmation */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">
                    Ready to Launch
                  </span>
                </div>
                <p className="text-xs text-blue-700">
                  Your campaign will begin today at 2:30 PM and run for 3 days.
                  You can pause or modify it anytime from your dashboard.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex space-x-3 pt-4">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="flex-1"
                disabled={isProcessing}
              >
                Back
              </Button>
            )}

            <Button
              onClick={handleNext}
              className="flex-1 bg-primary hover:bg-primary/90"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Launching...
                </div>
              ) : currentStep === steps.length - 1 ? (
                <>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Launch Campaign
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>

          {/* Bottom Notice */}
          <div className="text-center pt-2">
            <p className="text-xs text-muted-foreground">
              Campaign will appear in your content pipeline after launch
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
