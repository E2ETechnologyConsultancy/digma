import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import {
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Settings,
  Pause,
  Play,
} from "lucide-react";

interface BudgetManagerProps {
  user: any;
  onCapUpdate?: (newCap: number) => void;
}

export function BudgetManager({ user, onCapUpdate }: BudgetManagerProps) {
  const [weeklySpend, setWeeklySpend] = useState({
    current: 62,
    cap: 75,
    remaining: 13,
    forecasted: 68,
    campaigns: [
      {
        id: 1,
        name: "Birthday Cakes Boost",
        spent: 28,
        allocated: 30,
        status: "active",
      },
      {
        id: 2,
        name: "Coffee Combo Ad",
        spent: 12,
        allocated: 20,
        status: "paused",
      },
      {
        id: 3,
        name: "Weekend Special",
        spent: 22,
        allocated: 25,
        status: "active",
      },
    ],
  });

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "warning",
      message: "Approaching weekly cap (83% used)",
      action: "Consider pausing low-performing campaigns",
    },
  ]);

  const usagePercentage = (weeklySpend.current / weeklySpend.cap) * 100;

  const handleCapAdjustment = (newCap: number) => {
    setWeeklySpend((prev) => ({
      ...prev,
      cap: newCap,
      remaining: newCap - prev.current,
    }));
    onCapUpdate?.(newCap);
  };

  const handleCampaignToggle = (campaignId: number) => {
    setWeeklySpend((prev) => ({
      ...prev,
      campaigns: prev.campaigns.map((campaign) =>
        campaign.id === campaignId
          ? {
              ...campaign,
              status: campaign.status === "active" ? "paused" : "active",
            }
          : campaign,
      ),
    }));
  };

  return (
    <div className="space-y-6">
      {/* Budget Overview Card */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-primary" />
                Weekly Budget
              </CardTitle>
              <CardDescription>Monday to Sunday spend tracking</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Adjust Cap
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Main Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                <h3 className="text-3xl font-bold text-blue-700">
                  AU${weeklySpend.current}
                </h3>
                <p className="text-sm text-blue-600">Spent This Week</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                <h3 className="text-3xl font-bold text-green-700">
                  AU${weeklySpend.remaining}
                </h3>
                <p className="text-sm text-green-600">Remaining</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Budget Usage</span>
                <span className="text-sm text-muted-foreground">
                  {usagePercentage.toFixed(1)}%
                </span>
              </div>
              <Progress
                value={usagePercentage}
                className="h-3"
                aria-label={`${usagePercentage.toFixed(1)}% of weekly budget used`}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>AU$0</span>
                <span>AU${weeklySpend.cap}</span>
              </div>
            </div>

            {/* Forecast */}
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium">
                  Forecasted Week Total
                </span>
              </div>
              <span className="font-semibold text-foreground">
                AU${weeklySpend.forecasted}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-3">
          {alerts.map((alert) => (
            <Alert key={alert.id} className="border-orange-200 bg-orange-50">
              <AlertTriangle className="w-4 h-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                <strong>{alert.message}</strong>
                <br />
                <span className="text-sm">{alert.action}</span>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* Campaign Breakdown */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Campaign Spend Breakdown
          </CardTitle>
          <CardDescription>
            Individual campaign performance this week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklySpend.campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="flex items-center justify-between p-4 bg-muted/20 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-medium text-foreground">
                      {campaign.name}
                    </h4>
                    <Badge
                      variant={
                        campaign.status === "active" ? "default" : "secondary"
                      }
                      className={
                        campaign.status === "active"
                          ? "bg-green-100 text-green-700"
                          : ""
                      }
                    >
                      {campaign.status}
                    </Badge>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm text-muted-foreground mb-1">
                      <span>
                        AU${campaign.spent} / AU${campaign.allocated}
                      </span>
                      <span>
                        {((campaign.spent / campaign.allocated) * 100).toFixed(
                          0,
                        )}
                        %
                      </span>
                    </div>
                    <Progress
                      value={(campaign.spent / campaign.allocated) * 100}
                      className="h-2"
                    />
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCampaignToggle(campaign.id)}
                  className="ml-4"
                >
                  {campaign.status === "active" ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cap Enforcement Rules */}
      <Card className="shadow-sm border-green-200 bg-green-50/30">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center text-green-800">
            <CheckCircle className="w-5 h-5 mr-2" />
            Budget Protection Active
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-green-700">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Automatic spending pause at 100% of weekly cap</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Budget reallocation from poor performers to winners</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>
                All ad spend billed directly by Meta/Google (non-custodial)
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
