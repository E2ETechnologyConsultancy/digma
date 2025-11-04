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
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Calendar,
  Eye,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle,
  Play,
  MoreHorizontal,
  Facebook,
  Instagram,
  MapPin,
  DollarSign,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function PlanView() {
  const [selectedWeek, setSelectedWeek] = useState("current");

  const planData = {
    current: {
      week: "Sep 15-21, 2025",
      status: "active",
      theme: "Spring Menu Launch",
      approvedAt: "2025-09-14T10:30:00",
      budget: { allocated: 75, spent: 62, remaining: 13 },
      items: [
        {
          id: 1,
          title: "Spring Coffee Special",
          type: "boosted_post",
          channel: "facebook",
          scheduledFor: "2025-09-15T07:00:00",
          status: "published",
          budget: { daily: 8, spent: 12 },
          metrics: { reach: 1240, clicks: 45, conversions: 3 },
          content: {
            caption:
              "☕ Introducing our new Spring Blend! Made with locally sourced beans and a hint of vanilla. Perfect for the warming weather. Visit us today! #SpringBlend #LocalCoffee",
            image:
              "https://images.unsplash.com/photo-1755689910361-4793707c160f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBjb2ZmZWUlMjBzaG9wfGVufDF8fHx8MTc1NzkzNjM4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          },
        },
        {
          id: 2,
          title: "Birthday Cake Collection",
          type: "organic_post",
          channel: "instagram",
          scheduledFor: "2025-09-16T11:00:00",
          status: "published",
          metrics: { reach: 890, likes: 67, comments: 12 },
          content: {
            caption:
              "🎂 Custom birthday cakes that make every celebration special! Book your order 48 hours in advance. What's your dream cake flavor? #BirthdayCakes #CustomCakes #Celebration",
            image:
              "https://images.unsplash.com/photo-1755689910361-4793707c160f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBjb2ZmZWUlMjBzaG9wfGVufDF8fHx8MTc1NzkzNjM4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          },
        },
        {
          id: 3,
          title: "Weekend Pastry Special",
          type: "gbp_offer",
          channel: "google",
          scheduledFor: "2025-09-16T06:00:00",
          status: "active",
          metrics: { views: 234, redemptions: 8 },
          content: {
            title: "20% off Weekend Pastries",
            description:
              "Fresh croissants, danishes, and muffins every Saturday and Sunday morning. Show this offer at checkout.",
            terms: "Valid weekends only. Cannot be combined with other offers.",
          },
        },
        {
          id: 4,
          title: "Coffee Combo Deal",
          type: "boosted_post",
          channel: "facebook",
          scheduledFor: "2025-09-17T08:00:00",
          status: "paused",
          budget: { daily: 6, spent: 8 },
          metrics: { reach: 456, clicks: 8, conversions: 0 },
          content: {
            caption:
              "☕🥐 Morning combo: Any coffee + pastry for just $12! Perfect start to your day. Available until 11 AM daily.",
            image:
              "https://images.unsplash.com/photo-1755689910361-4793707c160f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBjb2ZmZWUlMjBzaG9wfGVufDF8fHx8MTc1NzkzNjM4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          },
        },
        {
          id: 5,
          title: "Fresh Bread Daily",
          type: "organic_post",
          channel: "instagram",
          scheduledFor: "2025-09-18T16:00:00",
          status: "scheduled",
          content: {
            caption:
              "🍞 Freshly baked bread every day! From sourdough to multigrain, we've got your daily bread covered. What's your favorite? #FreshBread #Artisan #Daily",
            image:
              "https://images.unsplash.com/photo-1755689910361-4793707c160f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBjb2ZmZWUlMjBzaG9wfGVufDF8fHx8MTc1NzkzNjM4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          },
        },
        {
          id: 6,
          title: "WhatsApp Orders",
          type: "whatsapp_campaign",
          channel: "whatsapp",
          scheduledFor: "2025-09-19T09:00:00",
          status: "scheduled",
          content: {
            message:
              "Skip the queue! 📱 Order your favorites via WhatsApp. Just message us with your order and pickup time. Quick, easy, convenient!",
          },
        },
      ],
    },
    next: {
      week: "Sep 22-28, 2025",
      status: "draft",
      theme: "Autumn Flavors Preview",
      items: [],
    },
  };

  const currentPlan = planData[selectedWeek as keyof typeof planData];

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "facebook":
        return <Facebook className="w-4 h-4 text-blue-600" />;
      case "instagram":
        return <Instagram className="w-4 h-4 text-pink-600" />;
      case "google":
        return <MapPin className="w-4 h-4 text-red-600" />;
      case "whatsapp":
        return <MessageSquare className="w-4 h-4 text-green-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-800">Published</Badge>;
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>;
      case "active":
        return <Badge className="bg-purple-100 text-purple-800">Active</Badge>;
      case "paused":
        return <Badge className="bg-orange-100 text-orange-800">Paused</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-AU", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* Plan header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Marketing Plan</CardTitle>
              <CardDescription>
                AI-generated content plan for local engagement
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Week View
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedWeek} onValueChange={setSelectedWeek}>
            <TabsList>
              <TabsTrigger value="current">
                Current Week ({planData.current.week})
              </TabsTrigger>
              <TabsTrigger value="next">
                Next Week ({planData.next.week})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="mt-6">
              {/* Plan summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Budget Used
                        </p>
                        <p className="text-xl">AU${currentPlan.budget.spent}</p>
                        <p className="text-xs text-muted-foreground">
                          of AU${currentPlan.budget.allocated}
                        </p>
                      </div>
                      <DollarSign className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <Progress
                      value={
                        (currentPlan.budget.spent /
                          currentPlan.budget.allocated) *
                        100
                      }
                      className="mt-2"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Content Items
                        </p>
                        <p className="text-xl">{currentPlan.items.length}</p>
                        <p className="text-xs text-muted-foreground">
                          across 4 channels
                        </p>
                      </div>
                      <Eye className="w-6 h-6 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Theme</p>
                        <p className="text-lg">{currentPlan.theme}</p>
                        <p className="text-xs text-green-600">
                          <CheckCircle className="w-3 h-3 inline mr-1" />
                          Approved
                        </p>
                      </div>
                      <TrendingUp className="w-6 h-6 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Content items */}
              <div className="space-y-4">
                <h3 className="text-lg">Content Schedule</h3>
                {currentPlan.items.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          {getChannelIcon(item.channel)}
                          <div>
                            <h4 className="text-base">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(item.scheduledFor)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(item.status)}
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Content preview */}
                        <div>
                          <h5 className="text-sm mb-2">Content</h5>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            {item.content.image && (
                              <ImageWithFallback
                                src={item.content.image}
                                alt={item.title}
                                className="w-full h-32 object-cover rounded mb-3"
                              />
                            )}
                            {item.content.caption && (
                              <p className="text-sm text-gray-700 mb-2">
                                {item.content.caption}
                              </p>
                            )}
                            {item.content.title && (
                              <div>
                                <h6 className="text-sm mb-1">
                                  {item.content.title}
                                </h6>
                                <p className="text-xs text-muted-foreground">
                                  {item.content.description}
                                </p>
                              </div>
                            )}
                            {item.content.message && (
                              <p className="text-sm text-gray-700">
                                {item.content.message}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Metrics */}
                        {item.metrics && (
                          <div>
                            <h5 className="text-sm mb-2">Performance</h5>
                            <div className="grid grid-cols-2 gap-3">
                              {item.metrics.reach && (
                                <div className="text-center p-2 bg-blue-50 rounded">
                                  <p className="text-lg">
                                    {item.metrics.reach.toLocaleString()}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Reach
                                  </p>
                                </div>
                              )}
                              {item.metrics.clicks && (
                                <div className="text-center p-2 bg-green-50 rounded">
                                  <p className="text-lg">
                                    {item.metrics.clicks}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Clicks
                                  </p>
                                </div>
                              )}
                              {item.metrics.conversions !== undefined && (
                                <div className="text-center p-2 bg-purple-50 rounded">
                                  <p className="text-lg">
                                    {item.metrics.conversions}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Conversions
                                  </p>
                                </div>
                              )}
                              {item.metrics.redemptions && (
                                <div className="text-center p-2 bg-orange-50 rounded">
                                  <p className="text-lg">
                                    {item.metrics.redemptions}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Redemptions
                                  </p>
                                </div>
                              )}
                              {item.budget && (
                                <div className="text-center p-2 bg-gray-50 rounded">
                                  <p className="text-lg">
                                    AU${item.budget.spent}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Spent
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="next" className="mt-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg mb-2">Next Week's Plan</h3>
                  <p className="text-muted-foreground mb-4">
                    Your plan for {planData.next.week} will be generated
                    automatically on Sunday evening
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Preview theme: <strong>{planData.next.theme}</strong>
                  </p>
                  <Button variant="outline">Generate Early Preview</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
