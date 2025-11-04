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
import { Switch } from "./ui/switch";
import { Progress } from "./ui/progress";
import {
  Facebook,
  Instagram,
  MapPin,
  MessageSquare,
  CheckCircle,
  AlertTriangle,
  Settings,
  CreditCard,
  Shield,
  ExternalLink,
  RefreshCw,
  Plus,
  Wifi,
  WifiOff,
  Info,
} from "lucide-react";

export function MobileChannelConnections() {
  const [channels, setChannels] = useState({
    facebook: {
      connected: true,
      status: "healthy",
      account: "Joe's Coffee & Pastries",
      pageId: "123456789",
      billingHealth: "healthy",
      lastSync: "2 min ago",
      monthlySpend: 245,
      issues: [],
    },
    instagram: {
      connected: true,
      status: "healthy",
      account: "@joescoffeepastries",
      connectedVia: "Facebook",
      lastSync: "2 min ago",
      followers: 1240,
      issues: [],
    },
    google: {
      connected: true,
      status: "needs_attention",
      account: "Joe's Coffee & Pastries",
      businessId: "ChIJXXXXXXXXXXXXXX",
      lastSync: "1 day ago",
      monthlyViews: 1560,
      issues: ["verification_pending"],
    },
    whatsapp: {
      connected: false,
      status: "disconnected",
      phoneNumber: null,
      businessId: null,
      lastSync: null,
      issues: ["not_connected"],
    },
  });

  const [expandedChannel, setExpandedChannel] = useState<string | null>(null);

  const handleChannelToggle = (channelKey: string) => {
    console.log(`Toggle ${channelKey}`);
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "facebook":
        return <Facebook className="w-6 h-6 text-blue-600" />;
      case "instagram":
        return <Instagram className="w-6 h-6 text-pink-600" />;
      case "google":
        return <MapPin className="w-6 h-6 text-red-600" />;
      case "whatsapp":
        return <MessageSquare className="w-6 h-6 text-green-600" />;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <Wifi className="w-4 h-4 text-green-500" />;
      case "needs_attention":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "disconnected":
        return <WifiOff className="w-4 h-4 text-red-500" />;
      default:
        return <WifiOff className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "healthy":
        return "Connected";
      case "needs_attention":
        return "Issues";
      case "disconnected":
        return "Disconnected";
      default:
        return status;
    }
  };

  const connectedChannels = Object.values(channels).filter(
    (c) => c.connected,
  ).length;
  const totalChannels = Object.keys(channels).length;
  const healthyChannels = Object.values(channels).filter(
    (c) => c.status === "healthy",
  ).length;

  return (
    <div className="space-y-4">
      {/* Header Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-3 text-center">
            <CheckCircle className="w-5 h-5 mx-auto text-green-500 mb-1" />
            <p className="text-lg">
              {connectedChannels}/{totalChannels}
            </p>
            <p className="text-xs text-muted-foreground">Connected</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 text-center">
            <Shield className="w-5 h-5 mx-auto text-blue-500 mb-1" />
            <p className="text-lg">{healthyChannels}</p>
            <p className="text-xs text-muted-foreground">Healthy</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 text-center">
            <RefreshCw className="w-5 h-5 mx-auto text-purple-500 mb-1" />
            <p className="text-lg">2m</p>
            <p className="text-xs text-muted-foreground">Last Sync</p>
          </CardContent>
        </Card>
      </div>

      {/* Channel Cards */}
      <div className="space-y-3">
        {Object.entries(channels).map(([key, channel]) => (
          <Card key={key} className="overflow-hidden">
            <CardContent className="p-0">
              {/* Main Channel Row */}
              <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() =>
                  setExpandedChannel(expandedChannel === key ? null : key)
                }
              >
                <div className="flex items-center space-x-3">
                  {getChannelIcon(key)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base capitalize">
                        {key === "google" ? "Google Business" : key}
                      </h3>
                      {getStatusIcon(channel.status)}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {channel.connected ? channel.account : "Tap to connect"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">
                    {getStatusText(channel.status)}
                  </span>
                  <Switch
                    checked={channel.connected}
                    onCheckedChange={() => handleChannelToggle(key)}
                  />
                </div>
              </div>

              {/* Expanded Details */}
              {expandedChannel === key && channel.connected && (
                <div className="border-t bg-gray-50 p-4 space-y-3">
                  {/* Connection Info */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-muted-foreground">Last sync:</span>
                      <p>{channel.lastSync}</p>
                    </div>
                    {channel.monthlySpend && (
                      <div>
                        <span className="text-muted-foreground">
                          Monthly spend:
                        </span>
                        <p>AU${channel.monthlySpend}</p>
                      </div>
                    )}
                    {channel.followers && (
                      <div>
                        <span className="text-muted-foreground">
                          Followers:
                        </span>
                        <p>{channel.followers.toLocaleString()}</p>
                      </div>
                    )}
                    {channel.monthlyViews && (
                      <div>
                        <span className="text-muted-foreground">
                          Monthly views:
                        </span>
                        <p>{channel.monthlyViews.toLocaleString()}</p>
                      </div>
                    )}
                  </div>

                  {/* Issues */}
                  {channel.issues.length > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm text-yellow-800">
                          Action Required
                        </span>
                      </div>
                      {channel.issues.map((issue, index) => (
                        <p key={index} className="text-xs text-yellow-800 mb-2">
                          {issue === "verification_pending" &&
                            "Complete business verification to unlock all features"}
                          {issue === "not_connected" &&
                            "Connect your WhatsApp Business account"}
                        </p>
                      ))}
                      <Button size="sm" variant="outline" className="text-xs">
                        Fix Issue
                      </Button>
                    </div>
                  )}

                  {/* Billing for Facebook */}
                  {key === "facebook" && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <CreditCard className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-blue-800">
                          Billing: Healthy
                        </span>
                      </div>
                      <p className="text-xs text-blue-700">
                        Your Meta ads account has active payment methods
                      </p>
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <RefreshCw className="w-3 h-3 mr-1" />
                      Refresh
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Settings className="w-3 h-3 mr-1" />
                      Settings
                    </Button>
                  </div>
                </div>
              )}

              {/* Connect Button for Disconnected Channels */}
              {expandedChannel === key && !channel.connected && (
                <div className="border-t bg-gray-50 p-4">
                  <Button
                    className="w-full"
                    onClick={() => handleChannelToggle(key)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Connect {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    {key === "whatsapp" && "Enable click-to-message campaigns"}
                    {key === "google" && "Post offers and updates to Google"}
                    {key === "facebook" && "Share posts and run ads"}
                    {key === "instagram" && "Post stories and feed content"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Connection Health */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base">Connection Health</h3>
            <Badge className="bg-green-100 text-green-800 text-xs">
              All Good
            </Badge>
          </div>

          <Progress value={85} className="mb-3" />

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="flex items-center">
                <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                Facebook/Instagram
              </span>
              <span className="text-green-600">Healthy</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center">
                <AlertTriangle className="w-3 h-3 text-yellow-500 mr-1" />
                Google Business
              </span>
              <span className="text-yellow-600">Needs verification</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center">
                <WifiOff className="w-3 h-3 text-gray-500 mr-1" />
                WhatsApp
              </span>
              <span className="text-gray-600">Not connected</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Help Card */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Info className="w-5 h-5 text-blue-500" />
            <h3 className="text-base">Need Help?</h3>
          </div>

          <div className="space-y-2 text-sm">
            <Button variant="ghost" className="w-full justify-start p-2 h-auto">
              <div className="text-left">
                <p className="text-sm">Connection troubleshooting</p>
                <p className="text-xs text-muted-foreground">
                  Fix common connection issues
                </p>
              </div>
            </Button>

            <Button variant="ghost" className="w-full justify-start p-2 h-auto">
              <div className="text-left">
                <p className="text-sm">WhatsApp Business setup</p>
                <p className="text-xs text-muted-foreground">
                  Step-by-step guide
                </p>
              </div>
            </Button>

            <Button variant="ghost" className="w-full justify-start p-2 h-auto">
              <div className="text-left">
                <p className="text-sm">Business verification</p>
                <p className="text-xs text-muted-foreground">
                  Google verification process
                </p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
