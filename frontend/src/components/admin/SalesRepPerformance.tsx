import React, { useState } from "react";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  Trophy,
  Users,
  DollarSign,
  Target,
  Award,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const salesReps = [
  {
    id: 1,
    name: "Sarah Ahmed",
    initials: "SA",
    region: "Dubai",
    customers: 187,
    revenue: 54320,
    target: 50000,
    conversionRate: 68,
    avgDealSize: 290,
    trend: "up",
    growth: 24,
    rank: 1,
    color: "bg-blue-600",
  },
  {
    id: 2,
    name: "Mohammed Al-Hassan",
    initials: "MH",
    region: "Abu Dhabi",
    customers: 164,
    revenue: 48750,
    target: 50000,
    conversionRate: 64,
    avgDealSize: 297,
    trend: "up",
    growth: 18,
    rank: 2,
    color: "bg-green-600",
  },
  {
    id: 3,
    name: "Fatima Al-Mansoori",
    initials: "FM",
    region: "Sharjah",
    customers: 143,
    revenue: 41890,
    target: 45000,
    conversionRate: 61,
    avgDealSize: 293,
    trend: "up",
    growth: 15,
    rank: 3,
    color: "bg-purple-600",
  },
  {
    id: 4,
    name: "Khalid Rahman",
    initials: "KR",
    region: "Dubai",
    customers: 129,
    revenue: 38670,
    target: 40000,
    conversionRate: 59,
    avgDealSize: 300,
    trend: "up",
    growth: 12,
    rank: 4,
    color: "bg-orange-600",
  },
  {
    id: 5,
    name: "Layla Hassan",
    initials: "LH",
    region: "Ajman",
    customers: 118,
    revenue: 34220,
    target: 40000,
    conversionRate: 57,
    avgDealSize: 290,
    trend: "down",
    growth: -3,
    rank: 5,
    color: "bg-pink-600",
  },
  {
    id: 6,
    name: "Omar Khalifa",
    initials: "OK",
    region: "Ras Al Khaimah",
    customers: 96,
    revenue: 28480,
    target: 35000,
    conversionRate: 54,
    avgDealSize: 297,
    trend: "up",
    growth: 8,
    rank: 6,
    color: "bg-cyan-600",
  },
];

const performanceData = [
  { month: "Apr", Sarah: 42000, Mohammed: 39000, Fatima: 35000, Khalid: 32000 },
  { month: "May", Sarah: 45000, Mohammed: 41000, Fatima: 37000, Khalid: 34000 },
  { month: "Jun", Sarah: 48000, Mohammed: 43500, Fatima: 38500, Khalid: 36000 },
  { month: "Jul", Sarah: 51000, Mohammed: 46000, Fatima: 40000, Khalid: 37500 },
  { month: "Aug", Sarah: 52500, Mohammed: 47500, Fatima: 40500, Khalid: 38000 },
  { month: "Sep", Sarah: 54320, Mohammed: 48750, Fatima: 41890, Khalid: 38670 },
];

const teamStats = [
  { label: "Total Customers", value: "837", icon: Users, color: "blue" },
  {
    label: "Total Revenue",
    value: "AED 246K",
    icon: DollarSign,
    color: "green",
  },
  { label: "Avg Conversion", value: "60.5%", icon: Target, color: "purple" },
  { label: "Team Target", value: "92%", icon: Award, color: "orange" },
];

export function SalesRepPerformance() {
  const [selectedRep, setSelectedRep] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* Team Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {teamStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                  <p className="text-slate-900">{stat.value}</p>
                </div>
                <div
                  className={`w-10 h-10 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}
                >
                  <Icon className={`w-5 h-5 text-${stat.color}-600`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Performance Trends */}
      <Card className="p-6">
        <h3 className="text-slate-900 mb-4">Top Performers - Revenue Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceData}>
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
              dataKey="Sarah"
              stroke="#3b82f6"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="Mohammed"
              stroke="#10b981"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="Fatima"
              stroke="#a855f7"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="Khalid"
              stroke="#f97316"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Sales Rep Leaderboard */}
      <Card className="p-6">
        <h3 className="text-slate-900 mb-4">Sales Rep Leaderboard</h3>
        <div className="space-y-4">
          {salesReps.map((rep, index) => {
            const targetProgress = (rep.revenue / rep.target) * 100;
            const isTop3 = index < 3;

            return (
              <div
                key={rep.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedRep === rep.id
                    ? "border-blue-600 bg-blue-50"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
                onClick={() =>
                  setSelectedRep(selectedRep === rep.id ? null : rep.id)
                }
              >
                <div className="flex items-start gap-4">
                  {/* Rank Badge */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      isTop3 ? "bg-yellow-100" : "bg-slate-100"
                    }`}
                  >
                    {isTop3 ? (
                      <Trophy
                        className={`w-4 h-4 ${
                          rep.rank === 1
                            ? "text-yellow-600"
                            : rep.rank === 2
                              ? "text-slate-400"
                              : "text-orange-600"
                        }`}
                      />
                    ) : (
                      <span className="text-sm text-slate-600">
                        #{rep.rank}
                      </span>
                    )}
                  </div>

                  {/* Avatar & Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar>
                        <AvatarFallback className={rep.color}>
                          {rep.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-slate-900">{rep.name}</p>
                          {rep.trend === "up" ? (
                            <div className="flex items-center gap-1 text-green-600">
                              <ArrowUpRight className="w-3 h-3" />
                              <span className="text-xs">+{rep.growth}%</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-red-600">
                              <ArrowDownRight className="w-3 h-3" />
                              <span className="text-xs">{rep.growth}%</span>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-slate-600">{rep.region}</p>
                      </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-slate-600">Customers</p>
                        <p className="text-slate-900">{rep.customers}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600">Revenue</p>
                        <p className="text-slate-900">
                          AED {(rep.revenue / 1000).toFixed(1)}K
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600">Conversion</p>
                        <p className="text-slate-900">{rep.conversionRate}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600">Avg Deal</p>
                        <p className="text-slate-900">AED {rep.avgDealSize}</p>
                      </div>
                    </div>

                    {/* Target Progress */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs text-slate-600">
                          Target Progress
                        </p>
                        <p className="text-xs text-slate-900">
                          {targetProgress.toFixed(0)}%
                        </p>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            targetProgress >= 100
                              ? "bg-green-600"
                              : targetProgress >= 80
                                ? "bg-blue-600"
                                : "bg-orange-600"
                          }`}
                          style={{ width: `${Math.min(targetProgress, 100)}%` }}
                        />
                      </div>
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
