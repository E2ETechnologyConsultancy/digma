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
  Users,
  Sparkles,
  TrendingUp,
  Eye,
  MessageSquare,
  Heart,
  Share2,
  BarChart3,
  Calendar,
  Send,
  Home,
  ExternalLink,
} from "lucide-react";

interface PostConfirmationModalProps {
  campaign: any;
  isScheduled?: boolean;
  onClose: () => void;
  onGoToDashboard: () => void;
}

export function PostConfirmationModal({
  campaign,
  isScheduled = false,
  onClose,
  onGoToDashboard,
}: PostConfirmationModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  // Simulate animation completion
  useState(() => {
    const timer = setTimeout(() => setIsAnimating(false), 2000);
    return () => clearTimeout(timer);
  });

  const expectedMetrics = {
    reach: Math.floor(Math.random() * 400) + 800, // 800-1200
    engagement: Math.floor(Math.random() * 80) + 60, // 60-140
    clicks: Math.floor(Math.random() * 20) + 15, // 15-35
    conversions: Math.floor(Math.random() * 8) + 5, // 5-13
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
              className={`w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4 transition-all duration-1000 ${
                isAnimating ? "scale-0 opacity-0" : "scale-100 opacity-100"
              }`}
            >
              <CheckCircle className="w-10 h-10 text-white" />
            </div>

            <CardTitle className="text-xl text-foreground">
              {isScheduled ? "Campaign Scheduled!" : "Posted Successfully!"}
            </CardTitle>
            <CardDescription className="text-sm mt-2">
              {campaign.title || "Your campaign"}
            </CardDescription>
          </div>

          {/* Status Badge */}
          <Badge
            className={`${
              isScheduled
                ? "bg-blue-100 text-blue-800 border-blue-200"
                : "bg-green-100 text-green-800 border-green-200"
            } font-medium`}
          >
            {isScheduled ? (
              <>
                <Clock className="w-3 h-3 mr-1" />
                Scheduled for {campaign.scheduledFor?.date || "tomorrow"}
              </>
            ) : (
              <>
                <Send className="w-3 h-3 mr-1" />
                Live Now
              </>
            )}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Campaign Preview */}
          <div className="bg-muted/30 rounded-lg p-3">
            {campaign.image && (
              <img
                src={campaign.image}
                alt="Campaign preview"
                className="w-full h-24 object-cover rounded mb-2"
              />
            )}

            {campaign.caption && (
              <p className="text-sm text-foreground line-clamp-2">
                {campaign.caption}
              </p>
            )}
          </div>

          {/* AI Insights */}
          <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">
                  AI Performance Insights
                </span>
              </div>

              <div className="space-y-2 text-xs text-purple-700">
                <div className="flex items-center space-x-2">
                  <Target className="w-3 h-3" />
                  <span>Optimal timing detected for your audience</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-3 h-3" />
                  <span>
                    High engagement expected (coffee shop audience active)
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-3 h-3" />
                  <span>Similar campaigns averaged 4.2× ROAS in your area</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Expected Performance */}
          <div>
            <h4 className="text-sm font-medium mb-3 text-foreground">
              Expected Performance
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-center justify-center mb-1">
                  <Eye className="w-4 h-4 text-blue-600 mr-1" />
                  <span className="text-lg font-bold text-blue-700">
                    {expectedMetrics.reach.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-blue-600">Estimated Reach</p>
              </div>

              <div className="text-center p-3 bg-green-50 rounded-lg border border-green-100">
                <div className="flex items-center justify-center mb-1">
                  <Heart className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-lg font-bold text-green-700">
                    {expectedMetrics.engagement}
                  </span>
                </div>
                <p className="text-xs text-green-600">Likes & Comments</p>
              </div>

              <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-100">
                <div className="flex items-center justify-center mb-1">
                  <Share2 className="w-4 h-4 text-purple-600 mr-1" />
                  <span className="text-lg font-bold text-purple-700">
                    {expectedMetrics.clicks}
                  </span>
                </div>
                <p className="text-xs text-purple-600">Profile Clicks</p>
              </div>

              <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-100">
                <div className="flex items-center justify-center mb-1">
                  <TrendingUp className="w-4 h-4 text-orange-600 mr-1" />
                  <span className="text-lg font-bold text-orange-700">
                    {expectedMetrics.conversions}
                  </span>
                </div>
                <p className="text-xs text-orange-600">Conversions</p>
              </div>
            </div>
          </div>

          {/* Budget & Targeting Summary */}
          {campaign.boost && (
            <>
              <Separator />
              <div className="space-y-3">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">
                        Daily Budget
                      </span>
                    </div>
                    <span className="text-sm font-bold text-green-800">
                      AU${campaign.budget?.daily || 12}
                    </span>
                  </div>
                  <Progress value={45} className="h-2 mb-2" />
                  <p className="text-xs text-green-600">
                    55% of weekly budget remaining (AU$42 available)
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">
                      AI Targeting
                    </span>
                  </div>
                  <div className="text-xs text-blue-700 space-y-1">
                    <p>
                      <strong>Location:</strong> 5km radius from your business
                    </p>
                    <p>
                      <strong>Audience:</strong> Coffee lovers, 25-45, morning
                      commuters
                    </p>
                    <p>
                      <strong>Timing:</strong> Peak engagement hours (7-10 AM)
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Next Steps */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-3">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">
                  What Happens Next
                </span>
              </div>

              <div className="space-y-2 text-xs text-blue-700">
                {isScheduled ? (
                  <>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-3 h-3" />
                      <span>Campaign will go live at scheduled time</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-3 h-3" />
                      <span>AI will monitor and optimize performance</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-2">
                      <Send className="w-3 h-3" />
                      <span>
                        Your post is now live across selected channels
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="w-3 h-3" />
                      <span>Real-time performance tracking has begun</span>
                    </div>
                  </>
                )}
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-3 h-3" />
                  <span>
                    You'll receive updates on performance in your dashboard
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
              onClick={onGoToDashboard}
              className="flex-1 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
            >
              <Home className="w-4 h-4 mr-2" />
              View Dashboard
            </Button>
          </div>

          {/* Bottom Notice */}
          <div className="text-center pt-2">
            <p className="text-xs text-muted-foreground">
              Monitor performance and AI optimizations in your dashboard
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
