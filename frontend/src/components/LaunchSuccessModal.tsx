import { useState, useEffect } from "react";
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
import {
  CheckCircle,
  X,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Eye,
  Heart,
  Share2,
  Calendar,
  Home,
  BarChart3,
  Zap,
  Target,
  Users,
  DollarSign,
  Clock,
} from "lucide-react";

interface LaunchSuccessModalProps {
  campaign: any;
  onClose: () => void;
  onGoToDashboard?: () => void;
}

export function LaunchSuccessModal({
  campaign,
  onClose,
  onGoToDashboard,
}: LaunchSuccessModalProps) {
  const [showAnimation, setShowAnimation] = useState(true);
  const [progressValue, setProgressValue] = useState(0);

  // Animation effects
  useEffect(() => {
    // Success animation
    const animTimer = setTimeout(() => setShowAnimation(false), 1500);

    // Progress bar animation
    const progressTimer = setTimeout(() => {
      const interval = setInterval(() => {
        setProgressValue((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
    }, 1000);

    return () => {
      clearTimeout(animTimer);
      clearTimeout(progressTimer);
    };
  }, []);

  const expectedMetrics = {
    reach: campaign.generated.budget?.estimatedReach?.split("-")[0] || "800",
    conversions: "12-18",
    roas: "4.2×",
    goLiveTime: "2:30 PM today",
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative pb-4 text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-2 top-2 h-8 w-8 p-0 hover:bg-muted"
          >
            <X className="w-4 h-4" />
          </Button>

          {/* Success Animation */}
          <div className="flex flex-col items-center mb-4">
            <div
              className={`relative w-24 h-24 mb-4 transition-all duration-1000 ${
                showAnimation ? "scale-0 opacity-0" : "scale-100 opacity-100"
              }`}
            >
              {/* Outer ring animation */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full animate-pulse"></div>

              {/* Inner success circle */}
              <div className="absolute inset-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>

              {/* Sparkle effects */}
              <div className="absolute -top-1 -right-1">
                <Sparkles className="w-6 h-6 text-yellow-400 animate-bounce" />
              </div>
              <div className="absolute -bottom-1 -left-1">
                <Zap className="w-5 h-5 text-blue-400 animate-pulse" />
              </div>
            </div>

            <CardTitle className="text-xl text-foreground mb-2">
              🚀 Campaign Launched Successfully!
            </CardTitle>
            <CardDescription className="text-sm">
              "{campaign.generated.title}"
            </CardDescription>
          </div>

          {/* Status Badge */}
          <Badge className="bg-green-100 text-green-800 border-green-200 font-medium">
            <Calendar className="w-3 h-3 mr-1" />
            Going live at {expectedMetrics.goLiveTime}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Launch Progress */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">
                    Campaign Setup
                  </span>
                </div>
                <span className="text-xs text-blue-600">{progressValue}%</span>
              </div>

              <Progress value={progressValue} className="h-2 mb-3" />

              <div className="space-y-1 text-xs text-blue-700">
                <div className="flex items-center justify-between">
                  <span>✓ Content optimized</span>
                  <span>✓ Targeting configured</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>✓ Budget allocated</span>
                  <span>✓ Schedule set</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Campaign Preview */}
          <div className="bg-muted/30 rounded-lg p-3">
            {campaign.generated.image && (
              <img
                src={campaign.generated.image}
                alt="Campaign preview"
                className="w-full h-20 object-cover rounded mb-2"
              />
            )}

            {campaign.generated.caption && (
              <p className="text-sm text-foreground line-clamp-2">
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
          <div>
            <h4 className="text-sm font-medium mb-3 text-foreground">
              Expected Performance
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100">
                <div className="flex items-center justify-center mb-1">
                  <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-lg font-bold text-green-700">
                    {expectedMetrics.roas}
                  </span>
                </div>
                <p className="text-xs text-green-600">Expected ROAS</p>
              </div>

              <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                <div className="flex items-center justify-center mb-1">
                  <Eye className="w-4 h-4 text-blue-600 mr-1" />
                  <span className="text-lg font-bold text-blue-700">
                    {expectedMetrics.reach}+
                  </span>
                </div>
                <p className="text-xs text-blue-600">People Reached</p>
              </div>

              <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                <div className="flex items-center justify-center mb-1">
                  <Heart className="w-4 h-4 text-purple-600 mr-1" />
                  <span className="text-lg font-bold text-purple-700">
                    60-120
                  </span>
                </div>
                <p className="text-xs text-purple-600">Engagements</p>
              </div>

              <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg border border-orange-100">
                <div className="flex items-center justify-center mb-1">
                  <Share2 className="w-4 h-4 text-orange-600 mr-1" />
                  <span className="text-lg font-bold text-orange-700">
                    {expectedMetrics.conversions}
                  </span>
                </div>
                <p className="text-xs text-orange-600">Conversions</p>
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">
                  AI Optimization Active
                </span>
              </div>

              <div className="space-y-2 text-xs text-purple-700">
                <div className="flex items-center space-x-2">
                  <Target className="w-3 h-3" />
                  <span>
                    Targeting optimized for{" "}
                    {campaign.generated.targeting?.demographics ||
                      "your audience"}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-3 h-3" />
                  <span>Scheduled for peak engagement time</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-3 h-3" />
                  <span>Budget allocation within your weekly limits</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-4">
              <h4 className="text-sm font-medium text-blue-800 mb-3">
                What Happens Next?
              </h4>

              <div className="space-y-2 text-xs text-blue-700">
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></div>
                  <span>
                    Campaign will automatically go live at{" "}
                    {expectedMetrics.goLiveTime}
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></div>
                  <span>
                    AI will monitor performance and optimize in real-time
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></div>
                  <span>
                    You'll receive performance updates in your dashboard
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></div>
                  <span>
                    Budget will be automatically managed within your limits
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>

            <Button
              onClick={() => {
                if (onGoToDashboard) {
                  onGoToDashboard();
                } else {
                  onClose();
                }
              }}
              className="flex-1 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
            >
              <Home className="w-4 h-4 mr-2" />
              View Dashboard
            </Button>
          </div>

          {/* Bottom Notice */}
          <div className="text-center pt-2">
            <p className="text-xs text-muted-foreground">
              Campaign is now in your content pipeline and will be monitored by
              AI
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
