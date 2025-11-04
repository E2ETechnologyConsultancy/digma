import React from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const mrrData = [
  {
    month: "Apr",
    mrr: 189450,
    newMrr: 12300,
    churnedMrr: 4200,
    netGrowth: 8100,
  },
  {
    month: "May",
    mrr: 203780,
    newMrr: 15800,
    churnedMrr: 3600,
    netGrowth: 12200,
  },
  {
    month: "Jun",
    mrr: 219340,
    newMrr: 18200,
    churnedMrr: 4100,
    netGrowth: 14100,
  },
  {
    month: "Jul",
    mrr: 236890,
    newMrr: 19800,
    churnedMrr: 3800,
    netGrowth: 16000,
  },
  {
    month: "Aug",
    mrr: 251670,
    newMrr: 17200,
    churnedMrr: 4500,
    netGrowth: 12700,
  },
  {
    month: "Sep",
    mrr: 268430,
    newMrr: 20100,
    churnedMrr: 3900,
    netGrowth: 16200,
  },
];

const revenueByTier = [
  {
    month: "Apr",
    Lite: 42800,
    Starter: 89400,
    Growth: 48300,
    Enterprise: 8950,
  },
  {
    month: "May",
    Lite: 44900,
    Starter: 96200,
    Growth: 52800,
    Enterprise: 9880,
  },
  {
    month: "Jun",
    Lite: 47200,
    Starter: 102600,
    Growth: 58400,
    Enterprise: 11140,
  },
  {
    month: "Jul",
    Lite: 49100,
    Starter: 110300,
    Growth: 64200,
    Enterprise: 13290,
  },
  {
    month: "Aug",
    Lite: 50800,
    Starter: 115900,
    Growth: 69800,
    Enterprise: 15170,
  },
  {
    month: "Sep",
    Lite: 52400,
    Starter: 123100,
    Growth: 76600,
    Enterprise: 16330,
  },
];

const churnAnalysis = [
  { month: "Apr", churnRate: 2.8, customers: 892, churned: 25 },
  { month: "May", churnRate: 2.4, customers: 967, churned: 23 },
  { month: "Jun", churnRate: 2.6, customers: 1043, churned: 27 },
  { month: "Jul", churnRate: 2.2, customers: 1128, churned: 25 },
  { month: "Aug", churnRate: 2.5, customers: 1189, churned: 30 },
  { month: "Sep", churnRate: 2.1, customers: 1247, churned: 26 },
];

const paymentMetrics = [
  { status: "Successful", count: 1189, amount: 268430, percentage: 95.3 },
  { status: "Failed", count: 34, amount: 8960, percentage: 2.7 },
  { status: "Pending", count: 24, amount: 6340, percentage: 1.9 },
];

const revenueKPIs = [
  {
    label: "Monthly Recurring Revenue",
    value: "AED 268,430",
    change: "+6.6%",
    trend: "up",
    icon: DollarSign,
    color: "green",
  },
  {
    label: "Average Revenue Per User",
    value: "AED 215",
    change: "+4.2%",
    trend: "up",
    icon: Users,
    color: "blue",
  },
  {
    label: "Net Revenue Growth",
    value: "AED 16,200",
    change: "+27.5%",
    trend: "up",
    icon: TrendingUp,
    color: "purple",
  },
  {
    label: "Payment Success Rate",
    value: "95.3%",
    change: "+1.2%",
    trend: "up",
    icon: CheckCircle,
    color: "orange",
  },
];

export function RevenueMetrics() {
  return (
    <div className="space-y-6">
      {/* Revenue KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {revenueKPIs.map((kpi) => {
          const Icon = kpi.icon;
          const TrendIcon = kpi.trend === "up" ? TrendingUp : TrendingDown;

          return (
            <Card key={kpi.label} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-slate-600 mb-1">{kpi.label}</p>
                  <p className="text-slate-900 mb-1">{kpi.value}</p>
                  <div className="flex items-center gap-1">
                    <TrendIcon
                      className={`w-3 h-3 ${kpi.trend === "up" ? "text-green-600" : "text-red-600"}`}
                    />
                    <span
                      className={`text-xs ${kpi.trend === "up" ? "text-green-600" : "text-red-600"}`}
                    >
                      {kpi.change}
                    </span>
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

      {/* MRR Growth & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-slate-900 mb-4">MRR Growth Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={mrrData}>
              <defs>
                <linearGradient id="colorMrr" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
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
              <Area
                type="monotone"
                dataKey="mrr"
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorMrr)"
                name="MRR (AED)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-slate-900 mb-4">MRR Components</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mrrData}>
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
              <Bar dataKey="newMrr" fill="#10b981" name="New MRR" />
              <Bar dataKey="churnedMrr" fill="#ef4444" name="Churned MRR" />
              <Bar dataKey="netGrowth" fill="#3b82f6" name="Net Growth" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Revenue by Tier */}
      <Card className="p-6">
        <h3 className="text-slate-900 mb-4">Revenue by Pricing Tier</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={revenueByTier}>
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
            <Area
              type="monotone"
              dataKey="Lite"
              stackId="1"
              stroke="#60a5fa"
              fill="#60a5fa"
            />
            <Area
              type="monotone"
              dataKey="Starter"
              stackId="1"
              stroke="#34d399"
              fill="#34d399"
            />
            <Area
              type="monotone"
              dataKey="Growth"
              stackId="1"
              stroke="#a78bfa"
              fill="#a78bfa"
            />
            <Area
              type="monotone"
              dataKey="Enterprise"
              stackId="1"
              stroke="#fb923c"
              fill="#fb923c"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Churn Analysis & Payment Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-slate-900 mb-4">Churn Rate Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={churnAnalysis}>
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
                dataKey="churnRate"
                stroke="#ef4444"
                strokeWidth={2}
                name="Churn Rate (%)"
              />
              <Line
                type="monotone"
                dataKey="churned"
                stroke="#f97316"
                strokeWidth={2}
                name="Churned Customers"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-slate-900 mb-4">
            Payment Status (Current Month)
          </h3>
          <div className="space-y-4">
            {paymentMetrics.map((metric) => {
              let icon, colorClass;

              switch (metric.status) {
                case "Successful":
                  icon = <CheckCircle className="w-5 h-5 text-green-600" />;
                  colorClass = "bg-green-50 border-green-200";
                  break;
                case "Failed":
                  icon = <AlertCircle className="w-5 h-5 text-red-600" />;
                  colorClass = "bg-red-50 border-red-200";
                  break;
                case "Pending":
                  icon = <Clock className="w-5 h-5 text-orange-600" />;
                  colorClass = "bg-orange-50 border-orange-200";
                  break;
                default:
                  icon = <CreditCard className="w-5 h-5 text-slate-600" />;
                  colorClass = "bg-slate-50 border-slate-200";
              }

              return (
                <div
                  key={metric.status}
                  className={`p-4 rounded-lg border ${colorClass}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {icon}
                      <div>
                        <p className="text-slate-900">{metric.status}</p>
                        <p className="text-sm text-slate-600">
                          {metric.count} transactions
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">{metric.percentage}%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-600">Total Amount</p>
                    <p className="text-slate-900">
                      AED {metric.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-slate-900 mb-1">
                  Total Revenue This Month
                </p>
                <p className="text-slate-900">
                  AED{" "}
                  {paymentMetrics
                    .reduce((sum, m) => sum + m.amount, 0)
                    .toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Revenue Insights */}
      <Card className="p-6">
        <h3 className="text-slate-900 mb-4">Revenue Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <p className="text-sm text-slate-900">Highest Growth</p>
            </div>
            <p className="text-slate-900 mb-1">Growth Tier</p>
            <p className="text-sm text-slate-600">+58.5% revenue increase</p>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-blue-600" />
              <p className="text-sm text-slate-900">Best Retention</p>
            </div>
            <p className="text-slate-900 mb-1">Enterprise Tier</p>
            <p className="text-sm text-slate-600">0.8% churn rate</p>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-purple-600" />
              <p className="text-sm text-slate-900">Largest Revenue</p>
            </div>
            <p className="text-slate-900 mb-1">Starter Tier</p>
            <p className="text-sm text-slate-600">AED 123K monthly</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
