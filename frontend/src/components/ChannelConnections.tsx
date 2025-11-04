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
} from "lucide-react";

export function ChannelConnections() {
  const [channels, setChannels] = useState({
    facebook: {
      connected: true,
      status: "healthy",
      account: "Joe's Coffee & Pastries",
      pageId: "123456789",
      permissions: ["pages_manage_posts", "pages_manage_ads", "ads_management"],
      billingHealth: "healthy",
      lastSync: "2025-09-15T10:30:00",
      monthlySpend: 245,
      issues: [],
    },
    instagram: {
      connected: true,
      status: "healthy",
      account: "@joescoffeepastries",
      connectedVia: "facebook",
      permissions: ["instagram_basic", "instagram_content_publish"],
      lastSync: "2025-09-15T10:30:00",
      followers: 1240,
      issues: [],
    },
    google: {
      connected: true,
      status: "needs_attention",
      account: "Joe's Coffee & Pastries",
      businessId: "ChIJXXXXXXXXXXXXXX",
      permissions: ["business_profile_management"],
      lastSync: "2025-09-14T15:22:00",
      monthlyViews: 1560,
      issues: ["verification_pending"],
    },
    whatsapp: {
      connected: false,
      status: "disconnected",
      phoneNumber: null,
      businessId: null,
      permissions: [],
      lastSync: null,
      issues: ["not_connected"],
    },
  });

  const handleChannelToggle = (channelKey: string) => {
    // In a real app, this would trigger OAuth flow or disconnection
    console.log(`Toggle ${channelKey}`);
  };

  const handleReconnect = (channelKey: string) => {
    // In a real app, this would re-initiate OAuth
    console.log(`Reconnect ${channelKey}`);
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "healthy":
        return <Badge className="bg-green-100 text-green-800">Connected</Badge>;
      case "needs_attention":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            Needs Attention
          </Badge>
        );
      case "disconnected":
        return <Badge className="bg-red-100 text-red-800">Disconnected</Badge>;
      case "error":
        return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getIssueDescription = (issue: string) => {
    const issueMap = {
      verification_pending: "Business verification pending with Google",
      billing_issue: "Payment method needs updating",
      permissions_revoked: "Some permissions have been revoked",
      not_connected: "Channel not connected",
      api_error: "API connection error",
    };
    return issueMap[issue as keyof typeof issueMap] || issue;
  };

  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Channel Connections</CardTitle>
          <CardDescription>
            Manage your social media accounts and advertising channels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="w-8 h-8 mx-auto text-green-600 mb-2" />
              <p className="text-lg">3</p>
              <p className="text-sm text-muted-foreground">Connected</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <AlertTriangle className="w-8 h-8 mx-auto text-yellow-600 mb-2" />
              <p className="text-lg">1</p>
              <p className="text-sm text-muted-foreground">Needs Attention</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Shield className="w-8 h-8 mx-auto text-blue-600 mb-2" />
              <p className="text-lg">Healthy</p>
              <p className="text-sm text-muted-foreground">Billing Status</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <RefreshCw className="w-8 h-8 mx-auto text-purple-600 mb-2" />
              <p className="text-lg">2min</p>
              <p className="text-sm text-muted-foreground">Last Sync</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Channel details */}
      <div className="space-y-4">
        {Object.entries(channels).map(([key, channel]) => (
          <Card key={key}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  {getChannelIcon(key)}
                  <div>
                    <h3 className="text-lg capitalize">
                      {key} {key === "google" && "Business Profile"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {channel.connected ? channel.account : "Not connected"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {getStatusBadge(channel.status)}
                  <Switch
                    checked={channel.connected}
                    onCheckedChange={() => handleChannelToggle(key)}
                  />
                </div>
              </div>

              {channel.connected && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {/* Connection details */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="text-sm mb-2">Connection Details</h4>
                    <div className="text-xs space-y-1">
                      {channel.pageId && <div>Page ID: {channel.pageId}</div>}
                      {channel.businessId && (
                        <div>
                          Business ID: {channel.businessId.slice(0, 10)}...
                        </div>
                      )}
                      {channel.connectedVia && (
                        <div>Connected via: {channel.connectedVia}</div>
                      )}
                      {channel.lastSync && (
                        <div>
                          Last sync:{" "}
                          {new Date(channel.lastSync).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Permissions */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="text-sm mb-2">Permissions</h4>
                    <div className="space-y-1">
                      {channel.permissions.map((permission) => (
                        <div
                          key={permission}
                          className="flex items-center text-xs"
                        >
                          <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                          {permission.replace(/_/g, " ")}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="text-sm mb-2">Stats</h4>
                    <div className="text-xs space-y-1">
                      {channel.monthlySpend && (
                        <div>Monthly spend: AU${channel.monthlySpend}</div>
                      )}
                      {channel.monthlyViews && (
                        <div>
                          Monthly views: {channel.monthlyViews.toLocaleString()}
                        </div>
                      )}
                      {channel.followers && (
                        <div>
                          Followers: {channel.followers.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Issues */}
              {channel.issues.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm mb-2 text-orange-700">Issues</h4>
                  <div className="space-y-2">
                    {channel.issues.map((issue, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-orange-50 rounded border border-orange-200"
                      >
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="w-4 h-4 text-orange-600" />
                          <span className="text-sm text-orange-800">
                            {getIssueDescription(issue)}
                          </span>
                        </div>
                        <Button size="sm" variant="outline" className="text-xs">
                          Fix Issue
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Billing info for Facebook */}
              {key === "facebook" && channel.connected && (
                <div className="bg-blue-50 p-3 rounded-lg mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CreditCard className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-blue-800">
                        Billing Status: Healthy
                      </span>
                    </div>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View in Meta
                    </Button>
                  </div>
                  <p className="text-xs text-blue-700 mt-1">
                    Your Meta billing account is active. Platform bills are
                    handled directly by Meta.
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center space-x-2">
                  {channel.connected ? (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReconnect(key)}
                      >
                        <RefreshCw className="w-3 h-3 mr-1" />
                        Refresh
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="w-3 h-3 mr-1" />
                        Settings
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" onClick={() => handleChannelToggle(key)}>
                      Connect {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Button>
                  )}
                </div>
                {channel.connected && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-600 hover:text-red-700"
                  >
                    Disconnect
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Help section */}
      <Card>
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
          <CardDescription>
            Common issues and how to resolve them
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <h4 className="text-sm mb-1">
                Facebook/Instagram connection issues
              </h4>
              <p className="text-xs text-muted-foreground mb-2">
                Make sure you're an admin of your Facebook Page and have the
                necessary permissions.
              </p>
              <Button size="sm" variant="outline">
                View Guide
              </Button>
            </div>

            <div className="p-3 border rounded-lg">
              <h4 className="text-sm mb-1">
                Google Business Profile verification
              </h4>
              <p className="text-xs text-muted-foreground mb-2">
                Complete business verification to unlock all posting features
                and insights.
              </p>
              <Button size="sm" variant="outline">
                Check Status
              </Button>
            </div>

            <div className="p-3 border rounded-lg">
              <h4 className="text-sm mb-1">WhatsApp Business setup</h4>
              <p className="text-xs text-muted-foreground mb-2">
                Connect your WhatsApp Business account to enable
                click-to-message campaigns.
              </p>
              <Button size="sm" variant="outline">
                Setup Guide
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
