import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import {
  Brain,
  TrendingUp,
  Pause,
  Play,
  RotateCcw,
  Clock,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Eye,
  Zap,
  Settings,
} from "lucide-react";

interface OptimiserAction {
  id: string;
  timestamp: string;
  type: "pause" | "promote" | "refresh" | "shift_time" | "protect_cap";
  campaignName: string;
  reason: string;
  details: string;
  impact: string;
  status: "completed" | "scheduled" | "failed";
}

interface OptimiserRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  triggerCount: number;
  lastTriggered?: string;
}

interface AIOptimiserProps {
  user: any;
}

export function AIOptimiser({ user }: AIOptimiserProps) {
  const [optimiserEnabled, setOptimiserEnabled] = useState(true);
  const [recentActions, setRecentActions] = useState<OptimiserAction[]>([
    {
      id: "1",
      timestamp: "2024-01-15T16:05:00Z",
      type: "promote",
      campaignName: "Birthday Cakes Special",
      reason: "High performance detected",
      details: "CPA below target; 2 redemptions yesterday",
      impact: "Budget increased +AU$4/day",
      status: "completed",
    },
    {
      id: "2",
      timestamp: "2024-01-15T11:20:00Z",
      type: "pause",
      campaignName: "Coffee Combo Deal",
      reason: "Low engagement performance",
      details: "CTR 0.32% (< median 0.78%), AU$12 spent, 0 chats",
      impact: "Campaign paused, budget reallocated",
      status: "completed",
    },
    {
      id: "3",
      timestamp: "2024-01-15T11:22:00Z",
      type: "refresh",
      campaignName: "Coffee Combo Deal",
      reason: "Creative fatigue detected",
      details: "Engagement dropped 45% week-over-week",
      impact: "New variant queued for tomorrow 07:00",
      status: "scheduled",
    },
    {
      id: "4",
      timestamp: "2024-01-14T14:30:00Z",
      type: "shift_time",
      campaignName: "Lunch Specials",
      reason: "Better time slot identified",
      details: "Evening posts performing 35% better than morning",
      impact: "Next posts scheduled for 17:00-19:00",
      status: "completed",
    },
  ]);

  const [optimiserRules, setOptimiserRules] = useState<OptimiserRule[]>([
    {
      id: "pause_rule",
      name: "Pause Low Performers",
      description:
        "Automatically pause campaigns with CTR < 0.5× median and no conversions",
      enabled: true,
      triggerCount: 3,
      lastTriggered: "2024-01-15T11:20:00Z",
    },
    {
      id: "promote_rule",
      name: "Promote Winners",
      description:
        "Increase budget for campaigns with CPA below target or 2+ redemptions",
      enabled: true,
      triggerCount: 5,
      lastTriggered: "2024-01-15T16:05:00Z",
    },
    {
      id: "fatigue_rule",
      name: "Refresh Fatigued Content",
      description:
        "Generate new creatives when frequency >3.5 and CTR drops 30%+",
      enabled: true,
      triggerCount: 2,
      lastTriggered: "2024-01-15T11:22:00Z",
    },
    {
      id: "time_rule",
      name: "Optimize Post Times",
      description: "Shift posting times based on engagement patterns",
      enabled: true,
      triggerCount: 1,
      lastTriggered: "2024-01-14T14:30:00Z",
    },
    {
      id: "cap_rule",
      name: "Budget Cap Protection",
      description:
        "Prevent overspend by pausing lowest performers when approaching cap",
      enabled: true,
      triggerCount: 0,
    },
  ]);

  const [optimiserStats, setOptimiserStats] = useState({
    campaignsOptimized: 12,
    budgetSaved: 185,
    performanceImprovement: 23,
    automatedActions: 24,
  });

  const toggleRule = (ruleId: string) => {
    setOptimiserRules((prev) =>
      prev.map((rule) =>
        rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule,
      ),
    );
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case "pause":
        return <Pause className="w-4 h-4 text-orange-600" />;
      case "promote":
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "refresh":
        return <RotateCcw className="w-4 h-4 text-blue-600" />;
      case "shift_time":
        return <Clock className="w-4 h-4 text-purple-600" />;
      case "protect_cap":
        return <DollarSign className="w-4 h-4 text-red-600" />;
      default:
        return <Brain className="w-4 h-4 text-gray-600" />;
    }
  };

  const getActionColor = (type: string) => {
    switch (type) {
      case "pause":
        return "bg-orange-100 text-orange-700";
      case "promote":
        return "bg-green-100 text-green-700";
      case "refresh":
        return "bg-blue-100 text-blue-700";
      case "shift_time":
        return "bg-purple-100 text-purple-700";
      case "protect_cap":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-AU", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* AI Optimiser Header */}
      <Card className="shadow-sm border-blue-200 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold">
                  AI Optimiser
                </CardTitle>
                <CardDescription>
                  Automated campaign management and optimization
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge
                className={
                  optimiserEnabled
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }
              >
                {optimiserEnabled ? "Active" : "Paused"}
              </Badge>
              <Switch
                checked={optimiserEnabled}
                onCheckedChange={setOptimiserEnabled}
                aria-label="Toggle AI Optimiser"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white/70 rounded-lg">
              <h3 className="text-2xl font-bold text-blue-700">
                {optimiserStats.campaignsOptimized}
              </h3>
              <p className="text-sm text-blue-600">Campaigns Optimized</p>
            </div>
            <div className="text-center p-3 bg-white/70 rounded-lg">
              <h3 className="text-2xl font-bold text-green-700">
                AU${optimiserStats.budgetSaved}
              </h3>
              <p className="text-sm text-green-600">Budget Saved</p>
            </div>
            <div className="text-center p-3 bg-white/70 rounded-lg">
              <h3 className="text-2xl font-bold text-purple-700">
                {optimiserStats.performanceImprovement}%
              </h3>
              <p className="text-sm text-purple-600">Performance Boost</p>
            </div>
            <div className="text-center p-3 bg-white/70 rounded-lg">
              <h3 className="text-2xl font-bold text-orange-700">
                {optimiserStats.automatedActions}
              </h3>
              <p className="text-sm text-orange-600">Actions Taken</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Optimiser Rules */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Optimization Rules
          </CardTitle>
          <CardDescription>
            Configure automated optimization behaviors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {optimiserRules.map((rule) => (
              <div
                key={rule.id}
                className="flex items-center justify-between p-4 bg-muted/20 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-foreground">{rule.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {rule.triggerCount} triggers
                    </Badge>
                    {rule.lastTriggered && (
                      <Badge variant="secondary" className="text-xs">
                        Last: {formatTimestamp(rule.lastTriggered)}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {rule.description}
                  </p>
                </div>
                <Switch
                  checked={rule.enabled}
                  onCheckedChange={() => toggleRule(rule.id)}
                  disabled={!optimiserEnabled}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Actions */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Recent Actions
          </CardTitle>
          <CardDescription>
            Latest automated optimizations made to your campaigns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActions.map((action) => (
              <div
                key={action.id}
                className="flex items-start space-x-4 p-4 bg-muted/20 rounded-lg"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${getActionColor(action.type)}`}
                >
                  {getActionIcon(action.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-foreground">
                      {action.campaignName}
                    </h4>
                    <Badge
                      variant={
                        action.status === "completed"
                          ? "default"
                          : action.status === "scheduled"
                            ? "secondary"
                            : "destructive"
                      }
                      className="text-xs"
                    >
                      {action.status}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">
                    {action.reason}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    {action.details}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-green-700">
                      {action.impact}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(action.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Explanation Panel */}
      <Card className="shadow-sm border-green-200 bg-green-50/30">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center text-green-800">
            <CheckCircle className="w-5 h-5 mr-2" />
            How AI Optimization Works
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-green-700">
            <div className="flex items-start space-x-2">
              <Zap className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">Daily Analysis:</span> Reviews
                performance metrics every 24 hours
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Eye className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">Smart Decisions:</span> Pauses
                underperformers, promotes winners
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <DollarSign className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">Budget Protection:</span> Never
                exceeds your weekly spending cap
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <RotateCcw className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">Creative Refresh:</span> Generates
                new content when engagement drops
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
