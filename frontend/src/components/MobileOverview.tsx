import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import {
  DollarSign,
  Eye,
  TrendingUp,
  CheckCircle,
  Pause,
  RotateCcw,
  ArrowRight,
  Zap,
  Plus,
  Play,
} from "lucide-react";
import { SubscriptionStatus } from "./SubscriptionStatus";

interface MobileOverviewProps {
  weeklyStats: any;
  currentPlan: any;
  recentActions: any[];
  user?: any;
  campaigns?: any[];
}

export function MobileOverview({
  weeklyStats,
  currentPlan,
  recentActions,
  user,
  campaigns = [],
}: MobileOverviewProps) {
  return (
    <div className="space-y-4">
      {/* Subscription Status */}
      {user?.subscription && (
        <SubscriptionStatus
          subscription={user.subscription}
          onUpgrade={() => {
            /* Handle upgrade */
          }}
        />
      )}

      {/* Hero Stats */}
      <Card className="relative overflow-hidden border-0 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-blue-50/50 to-purple-50/30"></div>
        <CardContent className="relative p-8 text-center">
          <div className="space-y-3">
            <div className="inline-flex items-center px-3 py-1 bg-primary/10 rounded-full mb-2">
              <DollarSign className="w-4 h-4 text-primary mr-1" />
              <span className="text-sm font-medium text-primary">
                Weekly Spend
              </span>
            </div>
            <h2 className="text-4xl font-bold text-foreground">
              ${weeklyStats.spent}
            </h2>
            <p className="text-muted-foreground">
              of ${weeklyStats.budget} budget
            </p>
            <div className="flex items-center justify-center space-x-6 pt-2">
              <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full">
                <TrendingUp className="w-4 h-4 mr-2" />
                <span className="font-semibold">{weeklyStats.roas}× ROAS</span>
              </div>
              <div className="flex items-center text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span className="font-semibold">
                  {weeklyStats.redemptions} sales
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <Progress
              value={(weeklyStats.spent / weeklyStats.budget) * 100}
              className="h-3 bg-muted"
            />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                ${weeklyStats.spent} spent
              </span>
              <span className="font-medium text-primary">
                ${weeklyStats.budget - weeklyStats.spent} remaining
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          className="h-20 flex-col space-y-2 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 hover:from-orange-100 hover:to-red-100 transition-all duration-200"
          variant="outline"
        >
          <Zap className="w-6 h-6 text-orange-600" />
          <span className="text-sm font-medium text-orange-700">
            Quick Boost
          </span>
        </Button>
        <Button
          className="h-20 flex-col space-y-2 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200"
          variant="outline"
        >
          <Eye className="w-6 h-6 text-blue-600" />
          <span className="text-sm font-medium text-blue-700">
            Preview Posts
          </span>
        </Button>
      </div>

      {/* Quick Create Tip */}
      <Card className="relative overflow-hidden border-purple-200 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-50/80 via-blue-50/60 to-indigo-50/80"></div>
        <CardContent className="relative p-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full mb-3">
            <Plus className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">
            Create New Campaign +
          </h3>
          <p className="text-sm text-muted-foreground">
            Tap the floating + button to create posts, offers, or boosted
            content with AI assistance
          </p>
        </CardContent>
      </Card>

      {/* Recent Campaigns */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">
                Recent Campaigns
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground mt-1">
                Your latest posts and campaigns
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-sm text-primary hover:bg-primary/10"
            >
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {campaigns.length > 0 ? (
              <>
                {/* Most Recent User Campaign */}
                <Card className="border border-primary/20 bg-gradient-to-br from-primary/5 to-blue-50">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex-shrink-0 overflow-hidden relative">
                        <img
                          src={
                            campaigns[0].thumbnail ||
                            campaigns[0].image ||
                            "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=48&h=48&fit=crop&crop=center"
                          }
                          alt="Campaign"
                          className="w-full h-full object-cover"
                        />
                        {campaigns[0].type === "ai_video" && (
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <Play className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-foreground truncate">
                            {campaigns[0].title}
                          </h4>
                          <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                            {campaigns[0].status === "live"
                              ? "Live"
                              : campaigns[0].status}
                          </Badge>
                          {campaigns[0].type === "ai_video" && (
                            <Badge className="bg-purple-100 text-purple-700 border-purple-200 text-xs">
                              AI Video
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Posted{" "}
                          {new Date(
                            campaigns[0].createdAt,
                          ).toLocaleDateString()}
                        </p>
                        <div className="flex items-center space-x-4 text-xs">
                          <span className="flex items-center text-blue-600">
                            <Eye className="w-3 h-3 mr-1" />
                            {campaigns[0].performance?.views || 0} views
                          </span>
                          <span className="flex items-center text-green-600">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            {campaigns[0].performance?.clicks || 0} clicks
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Additional User Campaigns */}
                <div className="space-y-2">
                  {campaigns.slice(1, 3).map((campaign, index) => (
                    <Card key={campaign.id} className="border-border/50">
                      <CardContent className="p-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex-shrink-0 overflow-hidden">
                            <img
                              src={
                                campaign.thumbnail ||
                                campaign.image ||
                                "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=40&h=40&fit=crop&crop=center"
                              }
                              alt="Campaign"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h5 className="font-medium text-sm text-foreground truncate">
                                {campaign.title}
                              </h5>
                              {campaign.type === "ai_video" && (
                                <Badge className="bg-purple-100 text-purple-700 border-purple-200 text-xs">
                                  Video
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {new Date(
                                campaign.createdAt,
                              ).toLocaleDateString()}{" "}
                              • {campaign.performance?.views || 0} views •{" "}
                              {campaign.performance?.clicks || 0} clicks
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className="text-xs bg-gray-50"
                          >
                            {campaign.status === "live"
                              ? "Live"
                              : campaign.status}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              /* Default campaigns when user hasn't created any yet */
              <>
                <Card className="border border-primary/20 bg-gradient-to-br from-primary/5 to-blue-50">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex-shrink-0 overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=48&h=48&fit=crop&crop=center"
                          alt="Campaign"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-foreground truncate">
                            Fresh Pastry Special
                          </h4>
                          <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                            Sample
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Create your first campaign to see real data
                        </p>
                        <div className="flex items-center space-x-4 text-xs">
                          <span className="flex items-center text-blue-600">
                            <Eye className="w-3 h-3 mr-1" />
                            542 views
                          </span>
                          <span className="flex items-center text-green-600">
                            <TrendingUp className="w-3 h-3 mr-1" />8 clicks
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Current Plan Status */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">
                This Week's Plan
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground mt-1">
                {currentPlan.theme}
              </CardDescription>
            </div>
            <Badge className="bg-green-100 text-green-700 border-green-200 font-medium">
              Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <h4 className="text-2xl font-bold text-blue-700">
                {currentPlan.posts}
              </h4>
              <p className="text-sm text-blue-600 font-medium">Posts Planned</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
              <h4 className="text-2xl font-bold text-green-700">
                {currentPlan.boostedPosts}
              </h4>
              <p className="text-sm text-green-600 font-medium">Boosted</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full hover:bg-muted transition-colors"
            size="sm"
          >
            <span className="font-medium">View Full Plan</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>

      {/* Recent AI Actions - Mobile Optimized */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">
            Latest AI Changes
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            What happened in the last 24 hours
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {recentActions.slice(0, 2).map((action) => (
              <div
                key={action.id}
                className="flex items-center space-x-4 p-4 bg-muted/30 rounded-xl border border-border/50 hover:bg-muted/50 transition-colors"
              >
                <div className="flex-shrink-0">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      action.type === "budget_increase"
                        ? "bg-green-100 text-green-600"
                        : action.type === "pause"
                          ? "bg-orange-100 text-orange-600"
                          : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {action.type === "budget_increase" && (
                      <TrendingUp className="w-5 h-5" />
                    )}
                    {action.type === "pause" && <Pause className="w-5 h-5" />}
                    {action.type === "creative_refresh" && (
                      <RotateCcw className="w-5 h-5" />
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">
                    {action.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {action.type === "budget_increase" &&
                      "Budget increased for better performance"}
                    {action.type === "pause" &&
                      "Paused underperforming content"}
                    {action.type === "creative_refresh" &&
                      "Creative content refreshed"}
                  </p>
                </div>
                <Badge
                  variant={
                    action.status === "completed" ? "default" : "secondary"
                  }
                  className={`${action.status === "completed" ? "bg-green-100 text-green-700 border-green-200" : ""}`}
                >
                  {action.status === "completed" ? "✓" : "⏳"}
                </Badge>
              </div>
            ))}
          </div>
          <Button
            variant="ghost"
            className="w-full mt-4 hover:bg-muted"
            size="sm"
          >
            <span className="font-medium">View All Changes</span>
          </Button>
        </CardContent>
      </Card>

      {/* Performance Summary */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-foreground">
              {weeklyStats.reach.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground font-medium">
              Total Reach
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-foreground">
              {weeklyStats.redemptions}
            </p>
            <p className="text-sm text-muted-foreground font-medium">
              Redemptions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Digest Preview - Mobile Optimized */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">
            This Week's Performance
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Your Monday summary preview
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/70 rounded-lg">
                <span className="text-sm text-muted-foreground">Spent</span>
                <span className="font-bold text-foreground">
                  ${weeklyStats.spent}
                </span>
              </div>
              <div className="flex items-center justify-center">
                <ArrowRight className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-white/70 rounded-lg">
                <span className="text-sm text-muted-foreground">Revenue</span>
                <span className="font-bold text-green-600">
                  ${weeklyStats.revenue}
                </span>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">
                    What's working:
                  </span>{" "}
                  Health services getting great engagement
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <Zap className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Tip:</span>{" "}
                  Weekend mornings are your golden hours
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
