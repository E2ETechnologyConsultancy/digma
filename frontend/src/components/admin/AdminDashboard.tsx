import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { OverviewMetrics } from "./OverviewMetrics";
import { SalesRepPerformance } from "./SalesRepPerformance";
import { RegionalAnalytics } from "./RegionalAnalytics";
import { CustomerManagement } from "./CustomerManagement";
import { RevenueMetrics } from "./RevenueMetrics";
import { SystemHealth } from "./SystemHealth";
import { LogOut, LayoutDashboard } from "lucide-react";

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-slate-900">DigMa Admin</h1>
                <p className="text-xs text-slate-600">Stakeholder Dashboard</p>
              </div>
            </div>
            <Button variant="ghost" onClick={onLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 gap-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sales">Sales Reps</TabsTrigger>
            <TabsTrigger value="regional">Regional</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <OverviewMetrics />
          </TabsContent>

          <TabsContent value="sales" className="space-y-6">
            <SalesRepPerformance />
          </TabsContent>

          <TabsContent value="regional" className="space-y-6">
            <RegionalAnalytics />
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            <CustomerManagement />
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <RevenueMetrics />
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <SystemHealth />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
