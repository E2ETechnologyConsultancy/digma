import React, { useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  MapPin,
  Users,
  DollarSign,
  TrendingUp,
  Building2,
  Target,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const regionalData = [
  {
    region: "Dubai",
    customers: 423,
    revenue: 128940,
    growth: 22,
    avgDealSize: 305,
    penetration: 3.2,
    activeCampaigns: 1289,
    topTier: "Growth",
    salesReps: 2,
    color: "#3b82f6",
  },
  {
    region: "Abu Dhabi",
    customers: 318,
    revenue: 94560,
    growth: 18,
    avgDealSize: 297,
    penetration: 2.8,
    activeCampaigns: 956,
    topTier: "Starter",
    salesReps: 1,
    color: "#10b981",
  },
  {
    region: "Sharjah",
    customers: 267,
    revenue: 76410,
    growth: 15,
    avgDealSize: 286,
    penetration: 4.1,
    activeCampaigns: 801,
    topTier: "Starter",
    salesReps: 1,
    color: "#a855f7",
  },
  {
    region: "Ajman",
    customers: 134,
    revenue: 38620,
    growth: 12,
    avgDealSize: 288,
    penetration: 5.6,
    activeCampaigns: 402,
    topTier: "Lite",
    salesReps: 1,
    color: "#f97316",
  },
  {
    region: "Ras Al Khaimah",
    customers: 78,
    revenue: 22230,
    growth: 9,
    avgDealSize: 285,
    penetration: 3.9,
    activeCampaigns: 234,
    topTier: "Lite",
    salesReps: 1,
    color: "#ec4899",
  },
  {
    region: "Fujairah",
    customers: 27,
    revenue: 7830,
    growth: 5,
    avgDealSize: 290,
    penetration: 2.1,
    activeCampaigns: 81,
    topTier: "Lite",
    salesReps: 0,
    color: "#06b6d4",
  },
];

const monthlyTrends = [
  {
    month: "Apr",
    Dubai: 98000,
    "Abu Dhabi": 76000,
    Sharjah: 62000,
    Other: 45000,
  },
  {
    month: "May",
    Dubai: 105000,
    "Abu Dhabi": 81000,
    Sharjah: 67000,
    Other: 48000,
  },
  {
    month: "Jun",
    Dubai: 112000,
    "Abu Dhabi": 86000,
    Sharjah: 71000,
    Other: 51000,
  },
  {
    month: "Jul",
    Dubai: 118000,
    "Abu Dhabi": 89000,
    Sharjah: 74000,
    Other: 54000,
  },
  {
    month: "Aug",
    Dubai: 124000,
    "Abu Dhabi": 92000,
    Sharjah: 75500,
    Other: 56000,
  },
  {
    month: "Sep",
    Dubai: 128940,
    "Abu Dhabi": 94560,
    Sharjah: 76410,
    Other: 57000,
  },
];

const tierByRegion = [
  { region: "Dubai", Lite: 134, Starter: 176, Growth: 98, Enterprise: 15 },
  { region: "Abu Dhabi", Lite: 98, Starter: 145, Growth: 64, Enterprise: 11 },
  { region: "Sharjah", Lite: 112, Starter: 121, Growth: 29, Enterprise: 5 },
  { region: "Ajman", Lite: 67, Starter: 51, Growth: 14, Enterprise: 2 },
  { region: "RAK", Lite: 52, Starter: 21, Growth: 5, Enterprise: 0 },
  { region: "Fujairah", Lite: 24, Starter: 3, Growth: 0, Enterprise: 0 },
];

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#a855f7",
  "#f97316",
  "#ec4899",
  "#06b6d4",
];

export function RegionalAnalytics() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const totalCustomers = regionalData.reduce((sum, r) => sum + r.customers, 0);
  const totalRevenue = regionalData.reduce((sum, r) => sum + r.revenue, 0);

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Active Regions</p>
              <p className="text-slate-900">{regionalData.length}</p>
              <p className="text-xs text-slate-500 mt-1">UAE Coverage</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Total Customers</p>
              <p className="text-slate-900">
                {totalCustomers.toLocaleString()}
              </p>
              <p className="text-xs text-green-600 mt-1">+15.3% growth</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Total Revenue</p>
              <p className="text-slate-900">
                AED {(totalRevenue / 1000).toFixed(0)}K
              </p>
              <p className="text-xs text-green-600 mt-1">+18.7% growth</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Avg Penetration</p>
              <p className="text-slate-900">3.6%</p>
              <p className="text-xs text-slate-500 mt-1">SMB market share</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <Target className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Revenue Trends by Region */}
      <Card className="p-6">
        <h3 className="text-slate-900 mb-4">Regional Revenue Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="Dubai"
              stroke="#3b82f6"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="Abu Dhabi"
              stroke="#10b981"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="Sharjah"
              stroke="#a855f7"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="Other"
              stroke="#f97316"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Customer Distribution & Tier Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-slate-900 mb-4">Customer Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={regionalData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ region, customers }) => `${region}: ${customers}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="customers"
              >
                {regionalData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-slate-900 mb-4">Tier Distribution by Region</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tierByRegion}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="region" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="Lite" stackId="a" fill="#60a5fa" />
              <Bar dataKey="Starter" stackId="a" fill="#34d399" />
              <Bar dataKey="Growth" stackId="a" fill="#a78bfa" />
              <Bar dataKey="Enterprise" stackId="a" fill="#fb923c" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Regional Details */}
      <Card className="p-6">
        <h3 className="text-slate-900 mb-4">Regional Performance Details</h3>
        <div className="space-y-4">
          {regionalData.map((region) => {
            const revenueShare = (
              (region.revenue / totalRevenue) *
              100
            ).toFixed(1);
            const customerShare = (
              (region.customers / totalCustomers) *
              100
            ).toFixed(1);

            return (
              <div
                key={region.region}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  selectedRegion === region.region
                    ? "border-blue-600 bg-blue-50"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
                onClick={() =>
                  setSelectedRegion(
                    selectedRegion === region.region ? null : region.region,
                  )
                }
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${region.color}20` }}
                  >
                    <Building2
                      className="w-6 h-6"
                      style={{ color: region.color }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="text-slate-900">{region.region}</h4>
                        <p className="text-sm text-slate-600">
                          {region.salesReps} Sales Rep
                          {region.salesReps !== 1 ? "s" : ""}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-green-600">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm">+{region.growth}%</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-slate-600">Customers</p>
                        <p className="text-slate-900">{region.customers}</p>
                        <p className="text-xs text-slate-500">
                          {customerShare}% share
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600">Revenue</p>
                        <p className="text-slate-900">
                          AED {(region.revenue / 1000).toFixed(0)}K
                        </p>
                        <p className="text-xs text-slate-500">
                          {revenueShare}% share
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600">Avg Deal</p>
                        <p className="text-slate-900">
                          AED {region.avgDealSize}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600">Penetration</p>
                        <p className="text-slate-900">{region.penetration}%</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {region.activeCampaigns} campaigns
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Top tier: {region.topTier}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
