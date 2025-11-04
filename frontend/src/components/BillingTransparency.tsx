import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import {
  DollarSign,
  CreditCard,
  FileText,
  ExternalLink,
  Download,
  AlertTriangle,
  CheckCircle,
  Building,
  Calendar,
  Receipt,
} from "lucide-react";

interface BillingTransparencyProps {
  user: any;
}

interface PlatformInvoice {
  id: string;
  platform: "Meta" | "Google";
  period: string;
  amount: number;
  currency: string;
  status: "paid" | "pending" | "overdue";
  dueDate: string;
  campaigns: string[];
}

interface DigMaInvoice {
  id: string;
  period: string;
  amount: number;
  currency: string;
  status: "paid" | "pending" | "overdue";
  dueDate: string;
  plan: string;
  gstAmount: number;
}

export function BillingTransparency({ user }: BillingTransparencyProps) {
  const [platformInvoices, setPlatformInvoices] = useState<PlatformInvoice[]>([
    {
      id: "meta_001",
      platform: "Meta",
      period: "Jan 1-31, 2024",
      amount: 287.5,
      currency: "USD",
      status: "paid",
      dueDate: "2024-02-15",
      campaigns: [
        "Back Pain Relief Boost",
        "Prescription Delivery Ad",
        "Weekend Wellness",
      ],
    },
    {
      id: "google_001",
      platform: "Google",
      period: "Jan 1-31, 2024",
      amount: 156.8,
      currency: "USD",
      status: "pending",
      dueDate: "2024-02-20",
      campaigns: ["Local Healthcare Profile Boost"],
    },
  ]);

  const [digmaInvoices, setDigmaInvoices] = useState<DigMaInvoice[]>([
    {
      id: "digma_001",
      period: "Jan 2024",
      amount: 10.0,
      currency: "USD",
      status: "paid",
      dueDate: "2024-02-01",
      plan: "Essential",
      gstAmount: 0.0,
    },
    {
      id: "digma_002",
      period: "Feb 2024",
      amount: 10.0,
      currency: "USD",
      status: "pending",
      dueDate: "2024-03-01",
      plan: "Essential",
      gstAmount: 0.0,
    },
  ]);

  const [billingHealth, setBillingHealth] = useState({
    meta: { status: "healthy", lastCheck: "2024-01-15T10:30:00Z" },
    google: { status: "healthy", lastCheck: "2024-01-15T10:30:00Z" },
    digma: { status: "healthy", nextBilling: "2024-03-01" },
  });

  const totalPlatformSpend = platformInvoices.reduce(
    (sum, inv) => sum + inv.amount,
    0,
  );
  const totalDigmaFees = digmaInvoices.reduce(
    (sum, inv) => sum + inv.amount,
    0,
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "overdue":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const openPlatformBilling = (platform: string) => {
    const urls = {
      Meta: "https://business.facebook.com/billing",
      Google: "https://ads.google.com/aw/billing",
    };
    window.open(urls[platform as keyof typeof urls], "_blank");
  };

  const downloadInvoice = (invoiceId: string, type: "platform" | "digma") => {
    // Mock download functionality
    console.log(`Downloading ${type} invoice ${invoiceId}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-AU", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Billing Overview */}
      <Card className="shadow-sm border-blue-200 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center">
            <Receipt className="w-6 h-6 mr-2 text-blue-600" />
            Billing Overview
          </CardTitle>
          <CardDescription>
            Transparent separation of platform and DigMa billing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-white/70 rounded-lg">
              <Building className="w-8 h-8 mx-auto text-purple-600 mb-2" />
              <h3 className="text-2xl font-bold text-purple-700">
                ${totalPlatformSpend}
              </h3>
              <p className="text-sm text-purple-600">Platform Ad Spend</p>
              <p className="text-xs text-muted-foreground mt-1">
                Billed by Meta/Google
              </p>
            </div>
            <div className="text-center p-4 bg-white/70 rounded-lg">
              <CreditCard className="w-8 h-8 mx-auto text-blue-600 mb-2" />
              <h3 className="text-2xl font-bold text-blue-700">
                ${totalDigmaFees}
              </h3>
              <p className="text-sm text-blue-600">DigMa Subscription</p>
              <p className="text-xs text-muted-foreground mt-1">
                Billed by DigMa
              </p>
            </div>
            <div className="text-center p-4 bg-white/70 rounded-lg">
              <CheckCircle className="w-8 h-8 mx-auto text-green-600 mb-2" />
              <h3 className="text-2xl font-bold text-green-700">100%</h3>
              <p className="text-sm text-green-600">Non-Custodial</p>
              <p className="text-xs text-muted-foreground mt-1">
                No card handling
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Important Notice */}
      <Card className="shadow-sm border-orange-200 bg-orange-50/30">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-orange-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-orange-800 mb-2">
                Non-Custodial Billing
              </h3>
              <div className="space-y-1 text-sm text-orange-700">
                <p>
                  • <strong>Ad spend</strong> is billed directly by Meta and
                  Google to your business
                </p>
                <p>
                  • <strong>DigMa subscription</strong> is billed separately by
                  DigMa
                </p>
                <p>
                  • DigMa never handles your advertising payments or credit card
                  details
                </p>
                <p>
                  • This ensures maximum transparency and security for your
                  business
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Platform Invoices */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">
                Platform Ad Spend Invoices
              </CardTitle>
              <CardDescription>
                Invoices from Meta and Google for your ad campaigns
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-purple-50 text-purple-700">
              Billed by Platforms
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {platformInvoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between p-4 bg-muted/20 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Building className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-foreground">
                        {invoice.platform} Ads
                      </h4>
                      <Badge className={getStatusColor(invoice.status)}>
                        {invoice.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {invoice.period}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {invoice.campaigns.length} campaigns • Due{" "}
                      {formatDate(invoice.dueDate)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <h5 className="text-lg font-bold text-foreground">
                    {invoice.currency} ${invoice.amount}
                  </h5>
                  <div className="flex items-center space-x-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openPlatformBilling(invoice.platform)}
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View in {invoice.platform}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>
              Platform invoices are managed directly by Meta and Google
            </span>
            <span>Total: ${totalPlatformSpend}</span>
          </div>
        </CardContent>
      </Card>

      {/* DigMa Subscription Invoices */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">
                DigMa Subscription Invoices
              </CardTitle>
              <CardDescription>
                Your monthly DigMa service subscription
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              Billed by DigMa
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {digmaInvoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between p-4 bg-muted/20 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-foreground">
                        DigMa {invoice.plan}
                      </h4>
                      <Badge className={getStatusColor(invoice.status)}>
                        {invoice.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {invoice.period}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Due {formatDate(invoice.dueDate)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <h5 className="text-lg font-bold text-foreground">
                    {invoice.currency} ${invoice.amount}
                  </h5>
                  <div className="flex items-center space-x-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadInvoice(invoice.id, "digma")}
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>DigMa invoices are managed by DigMa</span>
            <span>Total: ${totalDigmaFees}</span>
          </div>
        </CardContent>
      </Card>

      {/* Billing Health Status */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Billing Health Status
          </CardTitle>
          <CardDescription>
            Real-time status of connected billing accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-800">Meta Ads</span>
              </div>
              <p className="text-sm text-green-700">Payment method active</p>
              <p className="text-xs text-green-600 mt-1">
                Last checked: {formatDate(billingHealth.meta.lastCheck)}
              </p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-800">Google Ads</span>
              </div>
              <p className="text-sm text-green-700">Billing account healthy</p>
              <p className="text-xs text-green-600 mt-1">
                Last checked: {formatDate(billingHealth.google.lastCheck)}
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-800">
                  DigMa Subscription
                </span>
              </div>
              <p className="text-sm text-blue-700">Active subscription</p>
              <p className="text-xs text-blue-600 mt-1">
                Next billing: {formatDate(billingHealth.digma.nextBilling)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
