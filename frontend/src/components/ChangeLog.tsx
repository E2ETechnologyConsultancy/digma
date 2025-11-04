import { useState } from "react";
import { Button } from "./ui/button";
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
import { Badge } from "./ui/badge";
import {
  TrendingUp,
  Pause,
  RotateCcw,
  Play,
  DollarSign,
  Clock,
  AlertTriangle,
  CheckCircle,
  Filter,
} from "lucide-react";

export function ChangeLog() {
  const [timeFilter, setTimeFilter] = useState("this-week");
  const [typeFilter, setTypeFilter] = useState("all");

  const changeLogEntries = [
    {
      id: 1,
      timestamp: "2025-09-14T11:20:00",
      type: "pause",
      itemName: "Coffee Combo (Image v2)",
      action: "Paused",
      reason: "pause.low_ctr_no_conv",
      description:
        "CTR 0.32% (< median 0.78%), AU$12 spent, 0 chats, 0 redemptions",
      beforeState: {
        status: "active",
        daily_budget: 6,
        ctr: 0.32,
        spend: 12,
        conversions: 0,
      },
      afterState: {
        status: "paused",
        daily_budget: 0,
      },
      requiresApproval: false,
      autoAction: true,
      impact: "negative",
    },
    {
      id: 2,
      timestamp: "2025-09-14T11:22:00",
      type: "creative_refresh",
      itemName: "Coffee Combo",
      action: "Creative Refresh",
      reason: "refresh.auto_after_pause",
      description: "New variant queued for Tue 07:00 (Image v3, caption v2)",
      beforeState: {
        variant: "v2",
        creative_id: "img_v2_001",
      },
      afterState: {
        variant: "v3",
        creative_id: "img_v3_001",
        scheduled_for: "2025-09-17T07:00:00",
      },
      requiresApproval: false,
      autoAction: true,
      impact: "neutral",
    },
    {
      id: 3,
      timestamp: "2025-09-13T16:05:00",
      type: "budget_increase",
      itemName: "Birthday Cakes (Post)",
      action: "Budget Increase",
      reason: "reallocate.promote_winner",
      description:
        "Budget +AU$4/day — CPA below target; 2 redemptions yesterday",
      beforeState: {
        daily_budget: 6,
        cpa: 8.5,
        conversions: 2,
      },
      afterState: {
        daily_budget: 10,
      },
      requiresApproval: false,
      autoAction: true,
      impact: "positive",
    },
    {
      id: 4,
      timestamp: "2025-09-12T08:15:00",
      type: "time_shift",
      itemName: "Morning Pastries",
      action: "Time Adjustment",
      reason: "shift.time_of_day",
      description:
        "Moved from 9:00 AM to 7:00 AM — morning posts perform 25% better",
      beforeState: {
        scheduled_time: "09:00",
        performance_score: 0.65,
      },
      afterState: {
        scheduled_time: "07:00",
      },
      requiresApproval: false,
      autoAction: true,
      impact: "positive",
    },
    {
      id: 5,
      timestamp: "2025-09-11T14:30:00",
      type: "frequency_cap",
      itemName: "Weekend Special",
      action: "Frequency Adjustment",
      reason: "protect.frequency_fatigue",
      description:
        "Reduced frequency cap from 3 to 2 — audience showing fatigue signs",
      beforeState: {
        frequency_cap: 3,
        frequency_current: 3.2,
        ctr_decline: 0.3,
      },
      afterState: {
        frequency_cap: 2,
      },
      requiresApproval: false,
      autoAction: true,
      impact: "neutral",
    },
    {
      id: 6,
      timestamp: "2025-09-10T19:45:00",
      type: "budget_reallocation",
      itemName: "Spring Menu Launch",
      action: "Budget Reallocation",
      reason: "protect.cap_exhaustion",
      description:
        "Moved AU$3/day from underperforming breakfast ads to lunch promotion",
      beforeState: {
        breakfast_budget: 8,
        lunch_budget: 5,
        weekly_spent: 68,
        weekly_cap: 75,
      },
      afterState: {
        breakfast_budget: 5,
        lunch_budget: 8,
      },
      requiresApproval: false,
      autoAction: true,
      impact: "neutral",
    },
  ];

  const getActionIcon = (type: string) => {
    switch (type) {
      case "budget_increase":
      case "budget_reallocation":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "pause":
        return <Pause className="w-4 h-4 text-orange-500" />;
      case "creative_refresh":
        return <RotateCcw className="w-4 h-4 text-blue-500" />;
      case "time_shift":
        return <Clock className="w-4 h-4 text-purple-500" />;
      case "frequency_cap":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "positive":
        return <Badge className="bg-green-100 text-green-800">Positive</Badge>;
      case "negative":
        return (
          <Badge className="bg-red-100 text-red-800">Issue Resolved</Badge>
        );
      case "neutral":
        return (
          <Badge className="bg-blue-100 text-blue-800">Optimization</Badge>
        );
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-AU", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
    }
  };

  const getReasonDescription = (reason: string) => {
    const reasonMap = {
      "pause.low_ctr_no_conv": "Low click-through rate with no conversions",
      "refresh.auto_after_pause": "Automatic creative refresh after pause",
      "reallocate.promote_winner": "Promoting high-performing content",
      "shift.time_of_day": "Optimizing for better engagement time",
      "protect.frequency_fatigue": "Preventing audience fatigue",
      "protect.cap_exhaustion": "Budget cap protection",
    };
    return reasonMap[reason as keyof typeof reasonMap] || reason;
  };

  const filteredEntries = changeLogEntries.filter((entry) => {
    if (typeFilter !== "all" && entry.type !== typeFilter) return false;

    const entryDate = new Date(entry.timestamp);
    const now = new Date();

    switch (timeFilter) {
      case "today":
        return entryDate.toDateString() === now.toDateString();
      case "this-week":
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return entryDate >= weekAgo;
      case "this-month":
        return (
          entryDate.getMonth() === now.getMonth() &&
          entryDate.getFullYear() === now.getFullYear()
        );
      default:
        return true;
    }
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>AI Optimization Log</CardTitle>
              <CardDescription>
                Track all automated changes made to your campaigns
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="budget_increase">
                    Budget Changes
                  </SelectItem>
                  <SelectItem value="pause">Paused Items</SelectItem>
                  <SelectItem value="creative_refresh">
                    Creative Updates
                  </SelectItem>
                  <SelectItem value="time_shift">Time Adjustments</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredEntries.length === 0 ? (
            <div className="text-center py-8">
              <Filter className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg mb-2">No changes found</h3>
              <p className="text-muted-foreground">
                No optimization actions match your current filters
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredEntries.map((entry) => (
                <Card key={entry.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {getActionIcon(entry.type)}
                        <div>
                          <h4 className="text-base">{entry.itemName}</h4>
                          <p className="text-sm text-muted-foreground">
                            {formatTimestamp(entry.timestamp)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getImpactBadge(entry.impact)}
                        {entry.autoAction && (
                          <Badge variant="outline" className="text-xs">
                            Auto
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>{entry.action}:</strong> {entry.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Reason: {getReasonDescription(entry.reason)}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="bg-red-50 p-3 rounded-lg">
                        <h5 className="text-xs mb-2 text-red-800">Before</h5>
                        <div className="space-y-1">
                          {Object.entries(entry.beforeState).map(
                            ([key, value]) => (
                              <div key={key} className="flex justify-between">
                                <span className="text-red-700 capitalize">
                                  {key.replace("_", " ")}:
                                </span>
                                <span className="text-red-900">
                                  {typeof value === "number" &&
                                  key.includes("budget")
                                    ? `AU$${value}`
                                    : String(value)}
                                </span>
                              </div>
                            ),
                          )}
                        </div>
                      </div>

                      <div className="bg-green-50 p-3 rounded-lg">
                        <h5 className="text-xs mb-2 text-green-800">After</h5>
                        <div className="space-y-1">
                          {Object.entries(entry.afterState).map(
                            ([key, value]) => (
                              <div key={key} className="flex justify-between">
                                <span className="text-green-700 capitalize">
                                  {key.replace("_", " ")}:
                                </span>
                                <span className="text-green-900">
                                  {typeof value === "number" &&
                                  key.includes("budget")
                                    ? `AU$${value}`
                                    : String(value)}
                                </span>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </div>

                    {entry.requiresApproval && (
                      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-600" />
                            <span className="text-sm text-yellow-800">
                              This action requires your approval
                            </span>
                          </div>
                          <div className="space-x-2">
                            <Button size="sm" variant="outline">
                              Decline
                            </Button>
                            <Button size="sm">Approve</Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-6 h-6 mx-auto text-green-500 mb-2" />
            <p className="text-lg">8</p>
            <p className="text-sm text-muted-foreground">
              Budget Optimizations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <RotateCcw className="w-6 h-6 mx-auto text-blue-500 mb-2" />
            <p className="text-lg">3</p>
            <p className="text-sm text-muted-foreground">Creative Refreshes</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Pause className="w-6 h-6 mx-auto text-orange-500 mb-2" />
            <p className="text-lg">2</p>
            <p className="text-sm text-muted-foreground">Items Paused</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <DollarSign className="w-6 h-6 mx-auto text-purple-500 mb-2" />
            <p className="text-lg">AU$18</p>
            <p className="text-sm text-muted-foreground">Budget Saved</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
