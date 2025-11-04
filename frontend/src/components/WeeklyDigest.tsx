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
  Calendar,
  Mail,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Clock,
  Eye,
  RotateCcw,
  Pause,
  Play,
  Download,
} from "lucide-react";

interface WeeklyDigestProps {
  user: any;
}

interface DigestData {
  weekOf: string;
  spend: {
    total: number;
    cap: number;
    utilization: number;
  };
  performance: {
    redemptions: number;
    whatsappChats: number;
    estimatedRevenue: number;
    roas: number;
  };
  optimiserActions: {
    paused: number;
    promoted: number;
    refreshed: number;
    rescheduled: number;
  };
  insights: {
    whatWorked: string[];
    whatDidntWork: string[];
    changes: string[];
    tip: string;
  };
}

export function WeeklyDigest({ user }: WeeklyDigestProps) {
  const [digestEnabled, setDigestEnabled] = useState(true);
  const [deliveryMethod, setDeliveryMethod] = useState<
    "email" | "whatsapp" | "both"
  >("email");
  const [deliveryTime, setDeliveryTime] = useState("08:00");

  const [currentDigest, setCurrentDigest] = useState<DigestData>({
    weekOf: "Jan 15-21, 2024",
    spend: {
      total: 62,
      cap: 75,
      utilization: 83,
    },
    performance: {
      redemptions: 17,
      whatsappChats: 23,
      estimatedRevenue: 680,
      roas: 4.2,
    },
    optimiserActions: {
      paused: 1,
      promoted: 2,
      refreshed: 1,
      rescheduled: 1,
    },
    insights: {
      whatWorked: [
        "Birthday cake posts getting 3x more engagement than average",
        "Weekend morning time slots performing best (2.1% CTR)",
        "WhatsApp CTA driving 40% more inquiries",
      ],
      whatDidntWork: [
        "Coffee combo ad paused due to 0.3% CTR (below 0.8% median)",
        "Weekday evening posts underperforming by 45%",
      ],
      changes: [
        "Moved AU$12 budget from coffee combo to birthday cake campaign",
        "Generated new creative variant for fatigued lunch special",
        "Shifted breakfast posts to 7-8am window for better reach",
      ],
      tip: "Try adding photos of your staff serving customers—personal touch increases trust and engagement by 25%",
    },
  });

  const [previousDigests, setPreviousDigests] = useState([
    {
      date: "Jan 8-14, 2024",
      spend: 58,
      revenue: 520,
      roas: 3.8,
      status: "sent",
    },
    {
      date: "Jan 1-7, 2024",
      spend: 45,
      revenue: 390,
      roas: 4.1,
      status: "sent",
    },
    {
      date: "Dec 25-31, 2023",
      spend: 72,
      revenue: 850,
      roas: 5.2,
      status: "sent",
    },
  ]);

  const generateDigestPreview = () => {
    return `🎯 Your DigMa Weekly Summary

Week: ${currentDigest.weekOf}

💰 BUDGET & SPEND
• Spent: AU$${currentDigest.spend.total} of AU$${currentDigest.spend.cap} cap (${currentDigest.spend.utilization}%)
• ${currentDigest.spend.utilization >= 90 ? "Almost at weekly limit" : currentDigest.spend.utilization >= 80 ? "Approaching weekly limit" : "Good budget utilization"}

📊 PERFORMANCE
• ${currentDigest.performance.redemptions} redemptions worth ~AU$${currentDigest.performance.estimatedRevenue}
• ${currentDigest.performance.whatsappChats} WhatsApp chats started
• Return on ad spend: ${currentDigest.performance.roas}x

✅ WHAT WORKED
${currentDigest.insights.whatWorked.map((item) => `• ${item}`).join("\n")}

❌ WHAT DIDN'T WORK
${currentDigest.insights.whatDidntWork.map((item) => `• ${item}`).join("\n")}

🔧 WHAT WE CHANGED
${currentDigest.insights.changes.map((item) => `• ${item}`).join("\n")}

💡 THIS WEEK'S TIP
${currentDigest.insights.tip}

Questions? Reply to this email or open DigMa app.`;
  };

  const downloadDigest = () => {
    const content = generateDigestPreview();
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `digma-digest-${currentDigest.weekOf.replace(/[^\w]/g, "-")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatDeliveryMethod = (method: string) => {
    switch (method) {
      case "email":
        return "Email only";
      case "whatsapp":
        return "WhatsApp only";
      case "both":
        return "Email + WhatsApp";
      default:
        return method;
    }
  };

  return (
    <div className="space-y-6">
      {/* Digest Settings */}
      <Card className="shadow-sm border-blue-200 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold">
                  Weekly Digest
                </CardTitle>
                <CardDescription>
                  Automated Monday morning summaries
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge
                className={
                  digestEnabled
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }
              >
                {digestEnabled ? "Enabled" : "Disabled"}
              </Badge>
              <Switch
                checked={digestEnabled}
                onCheckedChange={setDigestEnabled}
                aria-label="Toggle Weekly Digest"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Delivery Method</label>
              <select
                value={deliveryMethod}
                onChange={(e) => setDeliveryMethod(e.target.value as any)}
                className="w-full p-2 border rounded-lg bg-white"
                disabled={!digestEnabled}
              >
                <option value="email">Email</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="both">Email + WhatsApp</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Delivery Time</label>
              <select
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
                className="w-full p-2 border rounded-lg bg-white"
                disabled={!digestEnabled}
              >
                <option value="07:00">7:00 AM</option>
                <option value="08:00">8:00 AM</option>
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Next Delivery</label>
              <div className="p-2 bg-white rounded-lg border">
                <p className="text-sm font-medium">Monday {deliveryTime}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDeliveryMethod(deliveryMethod)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Week Preview */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">
                This Week's Digest Preview
              </CardTitle>
              <CardDescription>Week of {currentDigest.weekOf}</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={downloadDigest}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Performance Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <DollarSign className="w-6 h-6 mx-auto text-blue-600 mb-1" />
                <h3 className="text-xl font-bold text-blue-700">
                  AU${currentDigest.spend.total}
                </h3>
                <p className="text-xs text-blue-600">
                  Spent ({currentDigest.spend.utilization}%)
                </p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-6 h-6 mx-auto text-green-600 mb-1" />
                <h3 className="text-xl font-bold text-green-700">
                  {currentDigest.performance.redemptions}
                </h3>
                <p className="text-xs text-green-600">Redemptions</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <MessageSquare className="w-6 h-6 mx-auto text-purple-600 mb-1" />
                <h3 className="text-xl font-bold text-purple-700">
                  {currentDigest.performance.whatsappChats}
                </h3>
                <p className="text-xs text-purple-600">WhatsApp Chats</p>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <TrendingUp className="w-6 h-6 mx-auto text-orange-600 mb-1" />
                <h3 className="text-xl font-bold text-orange-700">
                  {currentDigest.performance.roas}×
                </h3>
                <p className="text-xs text-orange-600">ROAS</p>
              </div>
            </div>

            {/* What Worked */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center text-green-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                What Worked Well
              </h4>
              <ul className="space-y-2">
                {currentDigest.insights.whatWorked.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start space-x-2 text-sm"
                  >
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What Didn't Work */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center text-orange-700">
                <AlertTriangle className="w-4 h-4 mr-2" />
                What Didn't Work
              </h4>
              <ul className="space-y-2">
                {currentDigest.insights.whatDidntWork.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start space-x-2 text-sm"
                  >
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Changes Made */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center text-blue-700">
                <RotateCcw className="w-4 h-4 mr-2" />
                Changes We Made
              </h4>
              <ul className="space-y-2">
                {currentDigest.insights.changes.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start space-x-2 text-sm"
                  >
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tip */}
            <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
              <h4 className="font-semibold flex items-center text-yellow-800 mb-2">
                <Lightbulb className="w-4 h-4 mr-2" />
                This Week's Tip
              </h4>
              <p className="text-sm text-yellow-700">
                {currentDigest.insights.tip}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Previous Digests */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Previous Digests
          </CardTitle>
          <CardDescription>Access your weekly summary history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {previousDigests.map((digest, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted/20 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <h5 className="font-medium">{digest.date}</h5>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>AU${digest.spend} spent</span>
                      <span>AU${digest.revenue} revenue</span>
                      <span>{digest.roas}× ROAS</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700"
                  >
                    {digest.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
