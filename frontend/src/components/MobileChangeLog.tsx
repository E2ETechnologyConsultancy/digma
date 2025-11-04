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
  ChevronDown,
  Zap,
} from "lucide-react";

export function MobileChangeLog() {
  const [expandedEntry, setExpandedEntry] = useState<number | null>(null);
  const [timeFilter, setTimeFilter] = useState("today");

  const changeLogEntries = [
    {
      id: 1,
      timestamp: "2025-09-14T11:20:00",
      type: "pause",
      itemName: "Coffee Combo (Image v2)",
      action: "Paused",
      reason: "Low performance",
      description: "CTR 0.32% (below 0.78% median), AU$12 spent, 0 conversions",
      impact: "negative",
      autoAction: true,
      savings: 12,
    },
    {
      id: 2,
      timestamp: "2025-09-14T11:22:00",
      type: "creative_refresh",
      itemName: "Coffee Combo",
      action: "Creative Refresh",
      reason: "Auto refresh after pause",
      description: "New image v3 and caption v2 scheduled for Tue 7:00 AM",
      impact: "neutral",
      autoAction: true,
    },
    {
      id: 3,
      timestamp: "2025-09-13T16:05:00",
      type: "budget_increase",
      itemName: "Birthday Cakes",
      action: "Budget +AU$4/day",
      reason: "High performance",
      description: "CPA below target, 2 redemptions yesterday",
      impact: "positive",
      autoAction: true,
      increase: 4,
    },
    {
      id: 4,
      timestamp: "2025-09-12T08:15:00",
      type: "time_shift",
      itemName: "Morning Pastries",
      action: "Time Shift",
      reason: "Better performance window",
      description: "Moved from 9:00 AM to 7:00 AM (25% better CTR)",
      impact: "positive",
      autoAction: true,
    },
    {
      id: 5,
      timestamp: "2025-09-11T14:30:00",
      type: "frequency_cap",
      itemName: "Weekend Special",
      action: "Frequency Reduced",
      reason: "Audience fatigue",
      description: "Cap reduced from 3 to 2 (CTR declined 30%)",
      impact: "neutral",
      autoAction: true,
    },
  ];

  const getActionIcon = (type: string) => {
    switch (type) {
      case "budget_increase":
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

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "positive":
        return "text-green-600 bg-green-50";
      case "negative":
        return "text-red-600 bg-red-50";
      case "neutral":
        return "text-blue-600 bg-blue-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    if (diffInHours < 48) return "Yesterday";
    return date.toLocaleDateString("en-AU", { month: "short", day: "numeric" });
  };

  const filteredEntries = changeLogEntries.filter((entry) => {
    const entryDate = new Date(entry.timestamp);
    const now = new Date();

    switch (timeFilter) {
      case "today":
        return entryDate.toDateString() === now.toDateString();
      case "yesterday":
        const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        return entryDate.toDateString() === yesterday.toDateString();
      case "week":
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return entryDate >= weekAgo;
      default:
        return true;
    }
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg">AI Activity</h2>
          <p className="text-sm text-muted-foreground">
            Automatic optimizations
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Quick Filter */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {["today", "yesterday", "week"].map((filter) => (
          <Button
            key={filter}
            variant={timeFilter === filter ? "default" : "outline"}
            size="sm"
            className="text-xs whitespace-nowrap"
            onClick={() => setTimeFilter(filter)}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </Button>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-3 text-center">
            <TrendingUp className="w-5 h-5 mx-auto text-green-500 mb-1" />
            <p className="text-lg">3</p>
            <p className="text-xs text-muted-foreground">Optimizations</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 text-center">
            <DollarSign className="w-5 h-5 mx-auto text-blue-500 mb-1" />
            <p className="text-lg">AU$12</p>
            <p className="text-xs text-muted-foreground">Saved</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 text-center">
            <Zap className="w-5 h-5 mx-auto text-purple-500 mb-1" />
            <p className="text-lg">24h</p>
            <p className="text-xs text-muted-foreground">Auto Mode</p>
          </CardContent>
        </Card>
      </div>

      {/* Change Log Entries */}
      <div className="space-y-3">
        {filteredEntries.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
              <h3 className="text-base mb-1">No changes today</h3>
              <p className="text-sm text-muted-foreground">
                Your campaigns are running smoothly
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredEntries.map((entry) => (
            <Card key={entry.id} className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div
                  className="flex items-start justify-between cursor-pointer"
                  onClick={() =>
                    setExpandedEntry(
                      expandedEntry === entry.id ? null : entry.id,
                    )
                  }
                >
                  <div className="flex items-start space-x-3 flex-1">
                    {getActionIcon(entry.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm truncate">{entry.itemName}</h4>
                        <span className="text-xs text-muted-foreground ml-2">
                          {formatTimestamp(entry.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm">{entry.action}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {entry.description}
                      </p>

                      {/* Impact indicators */}
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge
                          className={`text-xs ${getImpactColor(entry.impact)}`}
                        >
                          {entry.impact === "positive" && "📈 Boost"}
                          {entry.impact === "negative" && "⚠️ Fixed"}
                          {entry.impact === "neutral" && "🔄 Tuned"}
                        </Badge>

                        {entry.savings && (
                          <Badge variant="outline" className="text-xs">
                            -AU${entry.savings}
                          </Badge>
                        )}

                        {entry.increase && (
                          <Badge variant="outline" className="text-xs">
                            +AU${entry.increase}/day
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground transition-transform ${expandedEntry === entry.id ? "rotate-180" : ""}`}
                  />
                </div>

                {/* Expanded Details */}
                {expandedEntry === entry.id && (
                  <div className="mt-4 pt-3 border-t space-y-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h5 className="text-xs mb-2">Why this happened:</h5>
                      <p className="text-xs text-muted-foreground">
                        {entry.reason === "Low performance" &&
                          "AI detected click-through rate below benchmark with no conversions after sufficient spend."}
                        {entry.reason === "High performance" &&
                          "Cost per acquisition below target with confirmed conversions."}
                        {entry.reason === "Better performance window" &&
                          "Historical data shows significantly better engagement at this time."}
                        {entry.reason === "Auto refresh after pause" &&
                          "Automatically generating new creative variants for underperforming content."}
                        {entry.reason === "Audience fatigue" &&
                          "Frequency above threshold with declining click-through rates."}
                      </p>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        View Post
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Undo
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Action Button */}
      <Card>
        <CardContent className="p-4 text-center">
          <h3 className="text-sm mb-2">AI Autopilot is Active</h3>
          <p className="text-xs text-muted-foreground mb-3">
            Monitoring performance and optimizing within your AU$75 weekly
            budget
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Pause Autopilot
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
