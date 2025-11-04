import React from "react";
import { Card } from "../ui/card";
import {
  TrendingUp,
  Users,
  DollarSign,
  Zap,
  Globe,
  UserPlus,
  Activity,
  Target,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const kpiData = [
  {
    title: "Total Customers",
    value: "1,247",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "blue",
  },
  {
    title: "Monthly Revenue",
    value: "AED 243K",
    change: "+18.2%",
    trend: "up",
    icon: DollarSign,
    color: "green",
  },
  {
    title: "Active Campaigns",
    value: "3,891",
    change: "+23.4%",
    trend: "up",
    icon: Zap,
    color: "purple",
  },
  {
    title: "Markets Active",
    value: "4",
    change: "+1",
    trend: "up",
    icon: Globe,
    color: "orange",
  },
];

const revenueData = [
  { month: "Apr", revenue: 145000, customers: 892 },
  { month: "May", revenue: 168000, customers: 967 },
  { month: "Jun", revenue: 189000, customers: 1043 },
  { month: "Jul", revenue: 210000, customers: 1128 },
  { month: "Aug", revenue: 227000, customers: 1189 },
  { month: "Sep", revenue: 243000, customers: 1247 },
];

const tierDistribution = [
  { name: "Lite (AED 99)", value: 487, color: "#60a5fa" },
  { name: "Starter (AED 199)", value: 512, color: "#34d399" },
  { name: "Growth (AED 399)", value: 213, color: "#a78bfa" },
  { name: "Enterprise", value: 35, color: "#fb923c" },
];

const COLORS = ["#60a5fa", "#34d399", "#a78bfa", "#fb923c"];

export function OverviewMetrics() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.title} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-slate-600 mb-1">{kpi.title}</p>
                  <p className="text-slate-900 mb-1">{kpi.value}</p>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-xs text-green-600">{kpi.change}</span>
                  </div>
                </div>
                <div
                  className={`w-10 h-10 rounded-lg bg-${kpi.color}-100 flex items-center justify-center`}
                >
                  <Icon className={`w-5 h-5 text-${kpi.color}-600`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Revenue & Customer Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-slate-900 mb-4">Revenue Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
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
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Revenue (AED)"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-slate-900 mb-4">Customer Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
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
              <Bar dataKey="customers" fill="#10b981" name="Total Customers" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Tier Distribution & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-slate-900 mb-4">Customer Distribution by Tier</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={tierDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {tierDistribution.map((entry, index) => (
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
          <h3 className="text-slate-900 mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <UserPlus className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-slate-600">New Sign-ups (30d)</p>
                  <p className="text-slate-900">342</p>
                </div>
              </div>
              <span className="text-sm text-green-600">+28%</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-slate-600">Churn Rate</p>
                  <p className="text-slate-900">2.3%</p>
                </div>
              </div>
              <span className="text-sm text-green-600">-0.5%</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-slate-600">Avg. Customer LTV</p>
                  <p className="text-slate-900">AED 2,847</p>
                </div>
              </div>
              <span className="text-sm text-green-600">+12%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
