import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import {
  Crown,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Gift,
  Zap,
  TrendingUp,
} from "lucide-react";

interface SubscriptionStatusProps {
  subscription: any;
  onUpgrade?: () => void;
}

export function SubscriptionStatus({
  subscription,
  onUpgrade,
}: SubscriptionStatusProps) {
  if (!subscription) return null;

  const isDemo =
    subscription.status === "trial" && subscription.planId === "demo";
  const daysLeft = isDemo
    ? Math.ceil(
        (new Date(subscription.trialEnd).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24),
      )
    : null;

  const usageStats = isDemo
    ? {
        campaignsUsed: 2,
        campaignsLimit: 5,
        budgetUsed: 45,
        budgetLimit: 20 * 30, // AU$20/day for 30 days
      }
    : null;

  if (isDemo) {
    return (
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Gift className="w-5 h-5 text-purple-600" />
              <div>
                <CardTitle className="text-base">Demo Trial Active</CardTitle>
                <CardDescription className="text-sm">
                  {daysLeft} days remaining
                </CardDescription>
              </div>
            </div>
            <Badge
              variant="secondary"
              className="bg-purple-100 text-purple-700"
            >
              Free Trial
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Usage Progress */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Campaigns Used</span>
                <span>
                  {usageStats.campaignsUsed}/{usageStats.campaignsLimit}
                </span>
              </div>
              <Progress
                value={
                  (usageStats.campaignsUsed / usageStats.campaignsLimit) * 100
                }
                className="h-2"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Budget Used</span>
                <span>
                  AU${usageStats.budgetUsed}/{usageStats.budgetLimit}
                </span>
              </div>
              <Progress
                value={(usageStats.budgetUsed / usageStats.budgetLimit) * 100}
                className="h-2"
              />
            </div>
          </div>

          {/* Demo Limitations */}
          <div className="bg-white/50 p-3 rounded-lg">
            <h4 className="text-sm mb-2 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2 text-orange-500" />
              Demo Limitations
            </h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Limited to Facebook & Instagram</li>
              <li>• Maximum 5 campaigns total</li>
              <li>• AU$20/day budget cap</li>
              <li>• Basic analytics only</li>
            </ul>
          </div>

          {/* Upgrade CTA */}
          <Button
            className="w-full bg-purple-600 hover:bg-purple-700"
            onClick={onUpgrade}
          >
            <Crown className="w-4 h-4 mr-2" />
            Upgrade for Full Access
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Unlock unlimited campaigns, all platforms, and advanced AI features
          </p>
        </CardContent>
      </Card>
    );
  }

  // Regular subscription status
  const statusConfig = {
    active: {
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      badge: {
        variant: "default" as const,
        text: "Active",
        className: "bg-green-100 text-green-700",
      },
      bgClass: "bg-gradient-to-r from-green-50 to-blue-50 border-green-200",
    },
    trial: {
      icon: <Gift className="w-5 h-5 text-blue-600" />,
      badge: {
        variant: "secondary" as const,
        text: "Trial",
        className: "bg-blue-100 text-blue-700",
      },
      bgClass: "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200",
    },
    cancelled: {
      icon: <AlertTriangle className="w-5 h-5 text-orange-600" />,
      badge: {
        variant: "destructive" as const,
        text: "Cancelled",
        className: "bg-orange-100 text-orange-700",
      },
      bgClass: "bg-gradient-to-r from-orange-50 to-red-50 border-orange-200",
    },
  };

  const config = statusConfig[subscription.status] || statusConfig.active;

  return (
    <Card className={`${config.bgClass} mb-6`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {config.icon}
            <div>
              <CardTitle className="text-base">
                {subscription.planName}
              </CardTitle>
              <CardDescription className="text-sm">
                {subscription.billing === "annual" ? "Annual" : "Monthly"}{" "}
                Billing
              </CardDescription>
            </div>
          </div>
          <Badge className={config.badge.className}>{config.badge.text}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span>Next Billing</span>
          <span>{new Date(subscription.nextBilling).toLocaleDateString()}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span>Amount</span>
          <span>
            AU${subscription.price}/
            {subscription.billing === "annual" ? "year" : "month"}
          </span>
        </div>

        {subscription.status === "cancelled" && (
          <div className="bg-white/50 p-3 rounded-lg">
            <p className="text-sm text-orange-700">
              Your subscription will end on{" "}
              {new Date(subscription.nextBilling).toLocaleDateString()}. You'll
              still have access until then.
            </p>
            <Button className="w-full mt-3" onClick={onUpgrade}>
              Reactivate Subscription
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
