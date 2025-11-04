import React from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Activity,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Zap,
  Database,
  Cloud,
  Shield,
  Clock,
  BarChart3,
  FileText,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const systemStatus = [
  { service: "API Gateway", status: "operational", uptime: 99.98, latency: 45 },
  {
    service: "Authentication",
    status: "operational",
    uptime: 99.99,
    latency: 32,
  },
  {
    service: "Campaign Engine",
    status: "operational",
    uptime: 99.95,
    latency: 156,
  },
  {
    service: "Facebook/Instagram API",
    status: "operational",
    uptime: 99.87,
    latency: 234,
  },
  {
    service: "Google Business Profile",
    status: "operational",
    uptime: 99.92,
    latency: 187,
  },
  { service: "WhatsApp API", status: "degraded", uptime: 98.45, latency: 423 },
  {
    service: "Database (Primary)",
    status: "operational",
    uptime: 99.99,
    latency: 12,
  },
  {
    service: "Database (Replica)",
    status: "operational",
    uptime: 99.97,
    latency: 18,
  },
  {
    service: "File Storage",
    status: "operational",
    uptime: 99.94,
    latency: 67,
  },
  {
    service: "AI Content Generator",
    status: "operational",
    uptime: 99.89,
    latency: 892,
  },
];

const apiUsage = [
  { hour: "00:00", requests: 1200, errors: 8 },
  { hour: "04:00", requests: 890, errors: 4 },
  { hour: "08:00", requests: 3400, errors: 12 },
  { hour: "12:00", requests: 5600, errors: 23 },
  { hour: "16:00", requests: 4800, errors: 18 },
  { hour: "20:00", requests: 3200, errors: 11 },
  { hour: "24:00", requests: 2100, errors: 9 },
];

const campaignMetrics = [
  { date: "14 Sep", created: 142, scheduled: 128, published: 124, failed: 4 },
  { date: "15 Sep", created: 156, scheduled: 143, published: 139, failed: 4 },
  { date: "16 Sep", created: 168, scheduled: 154, published: 150, failed: 4 },
  { date: "17 Sep", created: 189, scheduled: 176, published: 171, failed: 5 },
  { date: "18 Sep", created: 201, scheduled: 187, published: 182, failed: 5 },
  { date: "19 Sep", created: 224, scheduled: 209, published: 203, failed: 6 },
  { date: "20 Sep", created: 187, scheduled: 172, published: 168, failed: 4 },
];

const errorLogs = [
  {
    timestamp: "2024-09-20 14:32:15",
    level: "error",
    service: "WhatsApp API",
    message: "Rate limit exceeded",
    affected: 12,
  },
  {
    timestamp: "2024-09-20 13:45:22",
    level: "warning",
    service: "Facebook API",
    message: "Slow response time detected",
    affected: 0,
  },
  {
    timestamp: "2024-09-20 12:18:09",
    level: "error",
    service: "Campaign Engine",
    message: "Failed to schedule campaign",
    affected: 3,
  },
  {
    timestamp: "2024-09-20 11:07:41",
    level: "warning",
    service: "AI Generator",
    message: "High queue depth",
    affected: 0,
  },
  {
    timestamp: "2024-09-20 09:23:56",
    level: "error",
    service: "Payment Gateway",
    message: "Transaction timeout",
    affected: 1,
  },
];

const healthKPIs = [
  {
    label: "Overall Uptime",
    value: "99.96%",
    change: "+0.02%",
    icon: Activity,
    color: "green",
  },
  {
    label: "Avg Response Time",
    value: "124ms",
    change: "-8ms",
    icon: Zap,
    color: "blue",
  },
  {
    label: "Active Campaigns",
    value: "3,891",
    change: "+234",
    icon: BarChart3,
    color: "purple",
  },
  {
    label: "Error Rate",
    value: "0.42%",
    change: "-0.08%",
    icon: AlertTriangle,
    color: "orange",
  },
];

export function SystemHealth() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "degraded":
        return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case "down":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Activity className="w-4 h-4 text-slate-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "operational":
        return (
          <Badge className="bg-green-100 text-green-700">Operational</Badge>
        );
      case "degraded":
        return (
          <Badge className="bg-orange-100 text-orange-700">Degraded</Badge>
        );
      case "down":
        return <Badge className="bg-red-100 text-red-700">Down</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getLogLevelBadge = (level: string) => {
    switch (level) {
      case "error":
        return <Badge className="bg-red-100 text-red-700">Error</Badge>;
      case "warning":
        return <Badge className="bg-orange-100 text-orange-700">Warning</Badge>;
      case "info":
        return <Badge className="bg-blue-100 text-blue-700">Info</Badge>;
      default:
        return <Badge variant="secondary">{level}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Health KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {healthKPIs.map((kpi) => {
          const Icon = kpi.icon;

          return (
            <Card key={kpi.label} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-slate-600 mb-1">{kpi.label}</p>
                  <p className="text-slate-900 mb-1">{kpi.value}</p>
                  <p className="text-xs text-green-600">{kpi.change}</p>
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

      {/* System Status */}
      <Card className="p-6">
        <h3 className="text-slate-900 mb-4">Service Status</h3>
        <div className="space-y-3">
          {systemStatus.map((service) => (
            <div
              key={service.service}
              className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
            >
              <div className="flex items-center gap-3 flex-1">
                {getStatusIcon(service.status)}
                <div className="flex-1">
                  <p className="text-sm text-slate-900">{service.service}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <p className="text-xs text-slate-600">
                      Uptime: {service.uptime}%
                    </p>
                    <p className="text-xs text-slate-600">
                      Latency: {service.latency}ms
                    </p>
                  </div>
                </div>
              </div>
              {getStatusBadge(service.status)}
            </div>
          ))}
        </div>
      </Card>

      {/* API Usage & Campaign Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-slate-900 mb-4">API Request Volume (24h)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={apiUsage}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="hour" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="requests" fill="#3b82f6" name="Requests" />
              <Bar dataKey="errors" fill="#ef4444" name="Errors" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-slate-900 mb-4">Campaign Activity (7d)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={campaignMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#64748b" />
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
                dataKey="created"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Created"
              />
              <Line
                type="monotone"
                dataKey="published"
                stroke="#10b981"
                strokeWidth={2}
                name="Published"
              />
              <Line
                type="monotone"
                dataKey="failed"
                stroke="#ef4444"
                strokeWidth={2}
                name="Failed"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Errors */}
      <Card className="p-6">
        <h3 className="text-slate-900 mb-4">Recent System Logs</h3>
        <div className="space-y-3">
          {errorLogs.map((log, index) => (
            <div
              key={index}
              className="p-4 bg-slate-50 rounded-lg border border-slate-200"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getLogLevelBadge(log.level)}
                  <p className="text-sm text-slate-900">{log.service}</p>
                </div>
                <div className="flex items-center gap-1 text-slate-500">
                  <Clock className="w-3 h-3" />
                  <p className="text-xs">{log.timestamp}</p>
                </div>
              </div>
              <p className="text-sm text-slate-700 mb-1">{log.message}</p>
              {log.affected > 0 && (
                <p className="text-xs text-red-600">
                  {log.affected} customer{log.affected !== 1 ? "s" : ""}{" "}
                  affected
                </p>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Infrastructure Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Database className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Database Size</p>
              <p className="text-slate-900">142.8 GB</p>
              <p className="text-xs text-slate-500 mt-1">+2.3 GB this week</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
              <Cloud className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Storage Used</p>
              <p className="text-slate-900">1.2 TB</p>
              <p className="text-xs text-slate-500 mt-1">68% capacity</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Security Events</p>
              <p className="text-slate-900">0 Critical</p>
              <p className="text-xs text-green-600 mt-1">All clear</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Daily Backups</p>
              <p className="text-slate-900">Completed</p>
              <p className="text-xs text-slate-500 mt-1">Last: 2h ago</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
