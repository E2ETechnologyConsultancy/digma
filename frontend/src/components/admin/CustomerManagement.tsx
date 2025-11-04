import React, { useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Search,
  Filter,
  MoreVertical,
  Eye,
  Pause,
  Play,
  MessageSquare,
  TrendingUp,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const customers = [
  {
    id: "C001",
    businessName: "Al Barsha Café",
    owner: "Ahmed Al-Mansouri",
    region: "Dubai",
    tier: "Growth",
    status: "active",
    mrr: 399,
    campaigns: 12,
    performance: "excellent",
    signupDate: "2024-03-15",
    lastActive: "2 hours ago",
    salesRep: "Sarah Ahmed",
  },
  {
    id: "C002",
    businessName: "Sharjah Auto Parts",
    owner: "Mohammed Hassan",
    region: "Sharjah",
    tier: "Starter",
    status: "active",
    mrr: 199,
    campaigns: 8,
    performance: "good",
    signupDate: "2024-04-22",
    lastActive: "5 hours ago",
    salesRep: "Fatima Al-Mansoori",
  },
  {
    id: "C003",
    businessName: "Marina Dental Clinic",
    owner: "Dr. Fatima Al-Zaabi",
    region: "Abu Dhabi",
    tier: "Enterprise",
    status: "active",
    mrr: 899,
    campaigns: 24,
    performance: "excellent",
    signupDate: "2024-02-10",
    lastActive: "1 hour ago",
    salesRep: "Mohammed Al-Hassan",
  },
  {
    id: "C004",
    businessName: "Jumeirah Beauty Salon",
    owner: "Layla Rahman",
    region: "Dubai",
    tier: "Starter",
    status: "active",
    mrr: 199,
    campaigns: 6,
    performance: "good",
    signupDate: "2024-05-18",
    lastActive: "3 hours ago",
    salesRep: "Sarah Ahmed",
  },
  {
    id: "C005",
    businessName: "RAK Hardware Store",
    owner: "Khalid Omar",
    region: "Ras Al Khaimah",
    tier: "Lite",
    status: "paused",
    mrr: 0,
    campaigns: 3,
    performance: "poor",
    signupDate: "2024-06-05",
    lastActive: "2 days ago",
    salesRep: "Omar Khalifa",
  },
  {
    id: "C006",
    businessName: "Ajman Fresh Bakery",
    owner: "Sarah Al-Mazrouei",
    region: "Ajman",
    tier: "Starter",
    status: "active",
    mrr: 199,
    campaigns: 9,
    performance: "good",
    signupDate: "2024-04-30",
    lastActive: "4 hours ago",
    salesRep: "Layla Hassan",
  },
  {
    id: "C007",
    businessName: "Dubai Fitness Hub",
    owner: "Omar Abdullah",
    region: "Dubai",
    tier: "Growth",
    status: "active",
    mrr: 399,
    campaigns: 15,
    performance: "excellent",
    signupDate: "2024-03-28",
    lastActive: "30 min ago",
    salesRep: "Sarah Ahmed",
  },
  {
    id: "C008",
    businessName: "Abu Dhabi Tailors",
    owner: "Hassan Al-Blooshi",
    region: "Abu Dhabi",
    tier: "Lite",
    status: "active",
    mrr: 99,
    campaigns: 4,
    performance: "average",
    signupDate: "2024-07-12",
    lastActive: "6 hours ago",
    salesRep: "Mohammed Al-Hassan",
  },
  {
    id: "C009",
    businessName: "Sharjah Mobile Repair",
    owner: "Ali Mohammed",
    region: "Sharjah",
    tier: "Starter",
    status: "active",
    mrr: 199,
    campaigns: 7,
    performance: "good",
    signupDate: "2024-05-20",
    lastActive: "1 hour ago",
    salesRep: "Fatima Al-Mansoori",
  },
  {
    id: "C010",
    businessName: "Marina Restaurant & Grill",
    owner: "Fatima Ahmed",
    region: "Dubai",
    tier: "Growth",
    status: "active",
    mrr: 399,
    campaigns: 18,
    performance: "excellent",
    signupDate: "2024-02-25",
    lastActive: "45 min ago",
    salesRep: "Sarah Ahmed",
  },
];

const stats = [
  { label: "Total Customers", value: "1,247", change: "+12.5%" },
  { label: "Active", value: "1,189", change: "+10.2%" },
  { label: "Paused", value: "58", change: "-5.3%" },
  { label: "Avg MRR", value: "AED 195", change: "+8.7%" },
];

export function CustomerManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "paused">(
    "all",
  );
  const [filterTier, setFilterTier] = useState<
    "all" | "Lite" | "Starter" | "Growth" | "Enterprise"
  >("all");

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || customer.status === filterStatus;
    const matchesTier = filterTier === "all" || customer.tier === filterTier;

    return matchesSearch && matchesStatus && matchesTier;
  });

  const getPerformanceBadge = (performance: string) => {
    switch (performance) {
      case "excellent":
        return <Badge className="bg-green-100 text-green-700">Excellent</Badge>;
      case "good":
        return <Badge className="bg-blue-100 text-blue-700">Good</Badge>;
      case "average":
        return <Badge className="bg-yellow-100 text-yellow-700">Average</Badge>;
      case "poor":
        return <Badge className="bg-red-100 text-red-700">Poor</Badge>;
      default:
        return <Badge variant="secondary">{performance}</Badge>;
    }
  };

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case "Lite":
        return <Badge variant="outline">{tier}</Badge>;
      case "Starter":
        return <Badge className="bg-blue-100 text-blue-700">{tier}</Badge>;
      case "Growth":
        return <Badge className="bg-purple-100 text-purple-700">{tier}</Badge>;
      case "Enterprise":
        return <Badge className="bg-orange-100 text-orange-700">{tier}</Badge>;
      default:
        return <Badge variant="secondary">{tier}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6">
            <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
            <p className="text-slate-900 mb-1">{stat.value}</p>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-600" />
              <span className="text-xs text-green-600">{stat.change}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Search & Filters */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search by business name, owner, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Status: {filterStatus}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterStatus("all")}>
                  All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("active")}>
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("paused")}>
                  Paused
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Tier: {filterTier}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterTier("all")}>
                  All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterTier("Lite")}>
                  Lite
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterTier("Starter")}>
                  Starter
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterTier("Growth")}>
                  Growth
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterTier("Enterprise")}>
                  Enterprise
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Card>

      {/* Customer Table */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Business</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>MRR</TableHead>
                <TableHead>Campaigns</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Sales Rep</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="text-slate-900">
                    {customer.id}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-slate-900">{customer.businessName}</p>
                      <p className="text-sm text-slate-600">{customer.owner}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-700">
                    {customer.region}
                  </TableCell>
                  <TableCell>{getTierBadge(customer.tier)}</TableCell>
                  <TableCell>
                    {customer.status === "active" ? (
                      <Badge className="bg-green-100 text-green-700">
                        Active
                      </Badge>
                    ) : (
                      <Badge className="bg-slate-100 text-slate-700">
                        Paused
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-slate-900">
                    AED {customer.mrr}
                  </TableCell>
                  <TableCell className="text-slate-700">
                    {customer.campaigns}
                  </TableCell>
                  <TableCell>
                    {getPerformanceBadge(customer.performance)}
                  </TableCell>
                  <TableCell className="text-sm text-slate-600">
                    {customer.salesRep}
                  </TableCell>
                  <TableCell className="text-sm text-slate-600">
                    {customer.lastActive}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2">
                          <Eye className="w-4 h-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <MessageSquare className="w-4 h-4" />
                          Contact Customer
                        </DropdownMenuItem>
                        {customer.status === "active" ? (
                          <DropdownMenuItem className="gap-2 text-orange-600">
                            <Pause className="w-4 h-4" />
                            Pause Account
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem className="gap-2 text-green-600">
                            <Play className="w-4 h-4" />
                            Activate Account
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-600">
            No customers found matching your filters.
          </p>
        </div>
      )}
    </div>
  );
}
