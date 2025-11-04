import { useState, useEffect, useRef } from "react";
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
  Home,
  Calendar,
  DollarSign,
  Eye,
  MessageCircle,
  Settings,
  TrendingUp,
  Users,
  Bell,
  LogOut,
  CheckCircle,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  Menu,
  Link2,
  Plus,
  Crown,
  MoreHorizontal,
  Brain,
  Sparkles,
  Receipt,
} from "lucide-react";
import { MobilePlanView } from "./MobilePlanView";
import { MobileChangeLog } from "./MobileChangeLog";
import { MobileChannelConnections } from "./MobileChannelConnections";
import { MobileOverview } from "./MobileOverview";
import { CreateCampaign } from "./CreateCampaign";
import { BudgetManager } from "./BudgetManager";
import { AttributionTracker } from "./AttributionTracker";
import { AIOptimiser } from "./AIOptimiser";
import { WeeklyDigest } from "./WeeklyDigest";
import { AssetFactory } from "./AssetFactory";
import { BillingTransparency } from "./BillingTransparency";

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  // Close more menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        moreMenuRef.current &&
        !moreMenuRef.current.contains(event.target as Node)
      ) {
        setShowMoreMenu(false);
      }
    }

    if (showMoreMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showMoreMenu]);

  // Mock data for the dashboard
  const weeklyStats = {
    spent: 62,
    budget: 75,
    redemptions: 17,
    revenue: 260,
    roas: 4.2,
    reach: 2840,
    clicks: 156,
    messages: 23,
  };

  const recentActions = [
    {
      id: 1,
      type: "budget_increase",
      title: "Back Pain Relief (Post)",
      description:
        "Budget +$4/day — CPA below target; 2 appointments yesterday",
      timestamp: "13 Sep 16:05",
      status: "completed",
    },
    {
      id: 2,
      type: "pause",
      title: "Nail Art Special (Image v2)",
      description: "Paused — CTR 0.32% (< median 0.78%), $12 spent, 0 chats",
      timestamp: "14 Sep 11:20",
      status: "completed",
    },
    {
      id: 3,
      type: "creative_refresh",
      title: "Prescription Delivery (New variant)",
      description: "New variant queued for Tue 07:00 (Image v3, caption v2)",
      timestamp: "14 Sep 11:22",
      status: "scheduled",
    },
  ];

  const currentPlan = {
    week: "Sep 15-21, 2025",
    status: "active",
    theme: "Health & Wellness Week",
    posts: 6,
    offers: 2,
    boostedPosts: 4,
  };

  const handleSaveCampaign = (campaignData: any) => {
    console.log("New campaign created:", campaignData);

    // Add the new campaign to our campaigns list
    const newCampaign = {
      ...campaignData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: "live",
      type: campaignData.type || "ai_video", // Mark as AI video if it has videoUrl
      performance: {
        views: Math.floor(Math.random() * 500) + 100,
        clicks: Math.floor(Math.random() * 50) + 5,
        engagement: Math.floor(Math.random() * 30) + 10,
      },
    };

    setCampaigns((prev) => [newCampaign, ...prev]);

    // Here you would typically save to your backend
    setShowCreateCampaign(false);

    // Show a success message or navigate to overview
    setActiveTab("overview");
  };

  return (
    <div className="min-h-screen bg-secondary pb-20 md:pb-0">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">D</span>
                </div>
                <h1 className="text-xl font-semibold text-foreground">DigMa</h1>
              </div>
              <div className="hidden sm:block">
                <div className="px-3 py-1 bg-muted rounded-full">
                  <span className="text-sm font-medium text-muted-foreground">
                    {user.business?.name || "Your Business"}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                className="relative hover:bg-muted"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full animate-pulse"></span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden hover:bg-muted"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div className="hidden md:flex space-x-2">
                <Button variant="ghost" size="sm" className="hover:bg-muted">
                  <Settings className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                  className="hover:bg-muted"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu dropdown */}
      {showMobileMenu && (
        <div className="absolute top-16 right-4 z-50 bg-white rounded-xl shadow-xl border border-border p-3 md:hidden min-w-48">
          <div className="space-y-1">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start hover:bg-muted"
            >
              <Settings className="w-4 h-4 mr-3" />
              Settings
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start hover:bg-muted text-destructive hover:text-destructive"
              onClick={onLogout}
            >
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="px-4 py-6 md:px-8 md:py-8 max-w-7xl mx-auto">
        {activeTab === "overview" && (
          <MobileOverview
            weeklyStats={weeklyStats}
            currentPlan={currentPlan}
            recentActions={recentActions}
            user={user}
            campaigns={campaigns}
          />
        )}
        {activeTab === "plan" && <MobilePlanView />}
        {activeTab === "activity" && <MobileChangeLog />}
        {activeTab === "channels" && <MobileChannelConnections />}
        {activeTab === "budget" && <BudgetManager user={user} />}
        {activeTab === "attribution" && <AttributionTracker user={user} />}
        {activeTab === "optimiser" && <AIOptimiser user={user} />}
        {activeTab === "digest" && <WeeklyDigest user={user} />}
        {activeTab === "assets" && <AssetFactory user={user} />}
        {activeTab === "billing" && <BillingTransparency user={user} />}
      </div>

      {/* Bottom Navigation - Fixed 5 tabs */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-border md:hidden z-40 shadow-lg">
        <div className="grid grid-cols-5 px-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex flex-col items-center py-3 px-2 text-xs transition-colors rounded-lg ${
              activeTab === "overview"
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <Home className="w-5 h-5 mb-1" />
            <span className="font-medium">Home</span>
          </button>
          <button
            onClick={() => setActiveTab("plan")}
            className={`flex flex-col items-center py-3 px-2 text-xs transition-colors rounded-lg ${
              activeTab === "plan"
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <Calendar className="w-5 h-5 mb-1" />
            <span className="font-medium">Plan</span>
          </button>
          <button
            onClick={() => setActiveTab("budget")}
            className={`flex flex-col items-center py-3 px-2 text-xs transition-colors rounded-lg ${
              activeTab === "budget"
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <DollarSign className="w-5 h-5 mb-1" />
            <span className="font-medium">Budget</span>
          </button>
          <button
            onClick={() => setActiveTab("attribution")}
            className={`flex flex-col items-center py-3 px-2 text-xs transition-colors rounded-lg ${
              activeTab === "attribution"
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <TrendingUp className="w-5 h-5 mb-1" />
            <span className="font-medium">Stats</span>
          </button>
          <button
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className={`flex flex-col items-center py-3 px-2 text-xs transition-colors rounded-lg relative ${
              ["optimiser", "assets", "billing", "channels", "digest"].includes(
                activeTab,
              )
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <MoreHorizontal className="w-5 h-5 mb-1" />
            <span className="font-medium">More</span>
            {["optimiser", "assets", "billing", "channels", "digest"].includes(
              activeTab,
            ) && (
              <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></div>
            )}
          </button>
        </div>
      </nav>

      {/* More Menu */}
      {showMoreMenu && (
        <div
          ref={moreMenuRef}
          className="fixed bottom-20 right-4 z-50 bg-white rounded-xl shadow-xl border border-border p-3 md:hidden min-w-56"
        >
          <div className="space-y-1">
            <button
              onClick={() => {
                setActiveTab("optimiser");
                setShowMoreMenu(false);
              }}
              className={`w-full flex items-center justify-start py-2 px-3 text-sm transition-colors rounded-lg ${
                activeTab === "optimiser"
                  ? "text-primary bg-primary/10"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <Brain className="w-4 h-4 mr-3" />
              AI Optimizer
            </button>
            <button
              onClick={() => {
                setActiveTab("assets");
                setShowMoreMenu(false);
              }}
              className={`w-full flex items-center justify-start py-2 px-3 text-sm transition-colors rounded-lg ${
                activeTab === "assets"
                  ? "text-primary bg-primary/10"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <Sparkles className="w-4 h-4 mr-3" />
              Asset Factory
            </button>
            <button
              onClick={() => {
                setActiveTab("digest");
                setShowMoreMenu(false);
              }}
              className={`w-full flex items-center justify-start py-2 px-3 text-sm transition-colors rounded-lg ${
                activeTab === "digest"
                  ? "text-primary bg-primary/10"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <Bell className="w-4 h-4 mr-3" />
              Weekly Digest
            </button>
            <button
              onClick={() => {
                setActiveTab("billing");
                setShowMoreMenu(false);
              }}
              className={`w-full flex items-center justify-start py-2 px-3 text-sm transition-colors rounded-lg ${
                activeTab === "billing"
                  ? "text-primary bg-primary/10"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <Receipt className="w-4 h-4 mr-3" />
              Billing
            </button>
            <button
              onClick={() => {
                setActiveTab("channels");
                setShowMoreMenu(false);
              }}
              className={`w-full flex items-center justify-start py-2 px-3 text-sm transition-colors rounded-lg ${
                activeTab === "channels"
                  ? "text-primary bg-primary/10"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <Link2 className="w-4 h-4 mr-3" />
              Channels
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button - Only show if user has active subscription */}
      {user?.subscription?.status === "active" ||
      user?.subscription?.status === "trial" ? (
        <Button
          className="fixed bottom-24 right-6 h-14 w-14 rounded-full shadow-xl bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 md:bottom-6 z-30 transition-all duration-200 hover:scale-105"
          onClick={() => setShowCreateCampaign(true)}
        >
          <Plus className="w-6 h-6 text-white" />
        </Button>
      ) : (
        <Button
          className="fixed bottom-24 right-6 h-12 px-4 rounded-full shadow-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-600/90 hover:to-pink-600/90 md:bottom-6 z-30 transition-all duration-200 hover:scale-105"
          onClick={() => {
            /* Navigate to subscription */
          }}
        >
          <Crown className="w-4 h-4 mr-2 text-white" />
          <span className="text-white font-medium">Upgrade</span>
        </Button>
      )}

      {/* Create Campaign Modal */}
      {showCreateCampaign && (
        <CreateCampaign
          onClose={() => setShowCreateCampaign(false)}
          onSave={handleSaveCampaign}
          onGoToDashboard={() => {
            setShowCreateCampaign(false);
            setActiveTab("overview"); // Navigate to dashboard overview
          }}
        />
      )}

      {/* Desktop Sidebar (hidden on mobile) */}
      <div className="hidden md:block">
        {/* Add desktop navigation here if needed */}
      </div>
    </div>
  );
}
