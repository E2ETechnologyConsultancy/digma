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
import { Input } from "./ui/input";
import {
  QrCode,
  MessageSquare,
  DollarSign,
  TrendingUp,
  Scan,
  Copy,
  Download,
  Eye,
  Calculator,
  CheckCircle,
} from "lucide-react";

interface AttributionTrackerProps {
  user: any;
}

interface Campaign {
  id: string;
  name: string;
  qrCode: string;
  keyword: string;
  redemptions: number;
  whatsappChats: number;
  estimatedRevenue: number;
  adSpend: number;
  roas: number;
  status: "active" | "paused" | "completed";
}

export function AttributionTracker({ user }: AttributionTrackerProps) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "1",
      name: "Birthday Cakes Special",
      qrCode: "BIRTHDAY20",
      keyword: "BIRTHDAY20",
      redemptions: 17,
      whatsappChats: 23,
      estimatedRevenue: 680,
      adSpend: 120,
      roas: 5.7,
      status: "active",
    },
    {
      id: "2",
      name: "Coffee Combo Deal",
      qrCode: "COFFEE15",
      keyword: "COFFEE15",
      redemptions: 8,
      whatsappChats: 12,
      estimatedRevenue: 240,
      adSpend: 85,
      roas: 2.8,
      status: "active",
    },
    {
      id: "3",
      name: "Weekend Special",
      qrCode: "WEEKEND25",
      keyword: "WEEKEND25",
      redemptions: 12,
      whatsappChats: 18,
      estimatedRevenue: 480,
      adSpend: 95,
      roas: 5.1,
      status: "completed",
    },
  ]);

  const [averageBasketSize, setAverageBasketSize] = useState(40);
  const [manualRedemption, setManualRedemption] = useState("");

  const totalRedemptions = campaigns.reduce((sum, c) => sum + c.redemptions, 0);
  const totalChats = campaigns.reduce((sum, c) => sum + c.whatsappChats, 0);
  const totalRevenue = campaigns.reduce(
    (sum, c) => sum + c.estimatedRevenue,
    0,
  );
  const totalSpend = campaigns.reduce((sum, c) => sum + c.adSpend, 0);
  const overallRoas = totalSpend > 0 ? totalRevenue / totalSpend : 0;

  const handleManualRedemption = (campaignId: string) => {
    if (!manualRedemption.trim()) return;

    setCampaigns((prev) =>
      prev.map((campaign) =>
        campaign.id === campaignId
          ? {
              ...campaign,
              redemptions: campaign.redemptions + 1,
              estimatedRevenue: campaign.estimatedRevenue + averageBasketSize,
            }
          : campaign,
      ),
    );
    setManualRedemption("");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const generateQRCodeData = (keyword: string) => {
    return `digma://redeem/${keyword}`;
  };

  return (
    <div className="space-y-6">
      {/* Overall Attribution Stats */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-primary" />
            Attribution Overview
          </CardTitle>
          <CardDescription>
            Track redemptions and measure campaign ROI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
              <QrCode className="w-8 h-8 mx-auto text-blue-600 mb-2" />
              <h3 className="text-2xl font-bold text-blue-700">
                {totalRedemptions}
              </h3>
              <p className="text-sm text-blue-600">QR & Keyword</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
              <MessageSquare className="w-8 h-8 mx-auto text-green-600 mb-2" />
              <h3 className="text-2xl font-bold text-green-700">
                {totalChats}
              </h3>
              <p className="text-sm text-green-600">WhatsApp Chats</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
              <DollarSign className="w-8 h-8 mx-auto text-purple-600 mb-2" />
              <h3 className="text-2xl font-bold text-purple-700">
                AU${totalRevenue}
              </h3>
              <p className="text-sm text-purple-600">Est. Revenue</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
              <TrendingUp className="w-8 h-8 mx-auto text-orange-600 mb-2" />
              <h3 className="text-2xl font-bold text-orange-700">
                {overallRoas.toFixed(1)}×
              </h3>
              <p className="text-sm text-orange-600">Overall ROAS</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basket Size Configuration */}
      <Card className="shadow-sm border-blue-200 bg-blue-50/30">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Revenue Calculation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Average Basket Size (AU$)
              </label>
              <Input
                type="number"
                value={averageBasketSize}
                onChange={(e) =>
                  setAverageBasketSize(Number(e.target.value) || 0)
                }
                className="w-32"
                min="0"
                step="0.01"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Each redemption is worth AU${averageBasketSize}</p>
              <p>ROAS = Estimated Revenue ÷ Ad Spend</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Campaign Attribution Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Campaign Tracking</h3>
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">
                    {campaign.name}
                  </CardTitle>
                  <CardDescription>
                    Track redemptions and WhatsApp engagement
                  </CardDescription>
                </div>
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
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* QR Code and Keyword */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium flex items-center">
                        <QrCode className="w-4 h-4 mr-2" />
                        QR Code
                      </h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(generateQRCodeData(campaign.qrCode))
                        }
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <div className="w-24 h-24 bg-white rounded-lg border border-border flex items-center justify-center mb-2">
                      <QrCode className="w-16 h-16 text-foreground" />
                    </div>
                    <p className="text-sm font-mono text-muted-foreground">
                      {campaign.qrCode}
                    </p>
                  </div>

                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-medium mb-3">Keyword Code</h4>
                    <div className="flex items-center space-x-2 mb-4">
                      <code className="px-3 py-2 bg-white rounded border text-lg font-mono">
                        {campaign.keyword}
                      </code>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(campaign.keyword)}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Manual entry"
                        value={manualRedemption}
                        onChange={(e) => setManualRedemption(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        size="sm"
                        onClick={() => handleManualRedemption(campaign.id)}
                        disabled={!manualRedemption.trim()}
                      >
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <h5 className="text-xl font-bold text-blue-700">
                      {campaign.redemptions}
                    </h5>
                    <p className="text-xs text-blue-600">Redemptions</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <h5 className="text-xl font-bold text-green-700">
                      {campaign.whatsappChats}
                    </h5>
                    <p className="text-xs text-green-600">WhatsApp Chats</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <h5 className="text-xl font-bold text-purple-700">
                      AU${campaign.estimatedRevenue}
                    </h5>
                    <p className="text-xs text-purple-600">Est. Revenue</p>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <h5 className="text-xl font-bold text-orange-700">
                      {campaign.roas.toFixed(1)}×
                    </h5>
                    <p className="text-xs text-orange-600">ROAS</p>
                  </div>
                </div>

                {/* Revenue Calculation Breakdown */}
                <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                  <h5 className="font-medium mb-2">Revenue Calculation</h5>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>
                      {campaign.redemptions} redemptions × AU$
                      {averageBasketSize} = AU${campaign.estimatedRevenue}
                    </p>
                    <p>
                      ROAS: AU${campaign.estimatedRevenue} ÷ AU$
                      {campaign.adSpend} = {campaign.roas.toFixed(1)}×
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
