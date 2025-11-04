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
import {
  Calendar,
  Eye,
  Heart,
  MessageSquare,
  DollarSign,
  CheckCircle,
  Clock,
  Play,
  Pause,
  MoreHorizontal,
  Facebook,
  Instagram,
  MapPin,
  ThumbsUp,
  Share2,
  Zap,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function MobilePlanView() {
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  const planData = {
    week: "Sep 15-21, 2025",
    status: "active",
    theme: "Spring Menu Launch",
    budget: { allocated: 75, spent: 62, remaining: 13 },
    items: [
      {
        id: 1,
        title: "Spring Coffee Special",
        type: "boosted_post",
        channel: "facebook",
        scheduledFor: "2025-09-15T07:00:00",
        status: "live",
        budget: { daily: 8, spent: 12 },
        metrics: { reach: 1240, likes: 45, comments: 8, clicks: 32 },
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
        status: "live",
        metrics: { reach: 890, likes: 67, comments: 12, saves: 23 },
        content: {
          caption:
            "🎂 Custom birthday cakes that make every celebration special! Book your order 48 hours in advance. What's your dream cake flavor? #BirthdayCakes #CustomCakes",
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
            "Fresh croissants, danishes, and muffins every Saturday and Sunday morning.",
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
        metrics: { reach: 456, likes: 3, comments: 0, clicks: 2 },
        content: {
          caption:
            "☕🥐 Morning combo: Any coffee + pastry for just $12! Perfect start to your day. Available until 11 AM daily.",
        },
      },
    ],
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "facebook":
        return <Facebook className="w-4 h-4 text-blue-600" />;
      case "instagram":
        return <Instagram className="w-4 h-4 text-pink-600" />;
      case "google":
        return <MapPin className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "live":
        return (
          <Badge className="bg-green-100 text-green-800 text-xs">Live</Badge>
        );
      case "scheduled":
        return (
          <Badge className="bg-blue-100 text-blue-800 text-xs">Scheduled</Badge>
        );
      case "active":
        return (
          <Badge className="bg-purple-100 text-purple-800 text-xs">
            Active
          </Badge>
        );
      case "paused":
        return (
          <Badge className="bg-orange-100 text-orange-800 text-xs">
            Paused
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="text-xs">
            {status}
          </Badge>
        );
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const isTomorrow =
      date.toDateString() ===
      new Date(now.getTime() + 24 * 60 * 60 * 1000).toDateString();

    if (isToday)
      return `Today ${date.toLocaleTimeString("en-AU", { hour: "numeric", minute: "2-digit" })}`;
    if (isTomorrow)
      return `Tomorrow ${date.toLocaleTimeString("en-AU", { hour: "numeric", minute: "2-digit" })}`;

    return date.toLocaleDateString("en-AU", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-4">
      {/* Week Summary */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-lg">This Week's Plan</h2>
              <p className="text-sm text-muted-foreground">{planData.theme}</p>
            </div>
            <Badge className="bg-green-100 text-green-800">Active</Badge>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center p-2 bg-white/60 rounded-lg">
              <p className="text-lg">{planData.items.length}</p>
              <p className="text-xs text-muted-foreground">Content Items</p>
            </div>
            <div className="text-center p-2 bg-white/60 rounded-lg">
              <p className="text-lg">AU${planData.budget.spent}</p>
              <p className="text-xs text-muted-foreground">Spent</p>
            </div>
            <div className="text-center p-2 bg-white/60 rounded-lg">
              <p className="text-lg">4</p>
              <p className="text-xs text-muted-foreground">Channels</p>
            </div>
          </div>

          <Progress
            value={(planData.budget.spent / planData.budget.allocated) * 100}
            className="mb-2"
          />
          <p className="text-xs text-center text-muted-foreground">
            AU${planData.budget.remaining} budget remaining
          </p>
        </CardContent>
      </Card>

      {/* Content Items */}
      <div className="space-y-3">
        <h3 className="text-base px-1">Content Schedule</h3>
        {planData.items.map((item) => (
          <Card
            key={item.id}
            className={`cursor-pointer transition-all ${selectedPost === item.id ? "ring-2 ring-blue-500" : ""}`}
            onClick={() =>
              setSelectedPost(selectedPost === item.id ? null : item.id)
            }
          >
            <CardContent className="p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {getChannelIcon(item.channel)}
                  <span className="text-sm truncate">{item.title}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(item.status)}
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <MoreHorizontal className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-center space-x-2 mb-3">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {formatDate(item.scheduledFor)}
                </span>
              </div>

              {/* Content Preview */}
              {item.content.image && (
                <div className="mb-3">
                  <ImageWithFallback
                    src={item.content.image}
                    alt={item.title}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
              )}

              {item.content.caption && (
                <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                  {item.content.caption}
                </p>
              )}

              {item.content.title && (
                <div className="mb-3">
                  <h4 className="text-sm">{item.content.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {item.content.description}
                  </p>
                </div>
              )}

              {/* Metrics */}
              {item.metrics && (
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {item.metrics.reach && (
                    <div className="text-center p-2 bg-blue-50 rounded">
                      <p className="text-sm">
                        {item.metrics.reach.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">Reach</p>
                    </div>
                  )}
                  {item.metrics.likes && (
                    <div className="text-center p-2 bg-red-50 rounded">
                      <p className="text-sm">{item.metrics.likes}</p>
                      <p className="text-xs text-muted-foreground">Likes</p>
                    </div>
                  )}
                  {item.metrics.comments && (
                    <div className="text-center p-2 bg-green-50 rounded">
                      <p className="text-sm">{item.metrics.comments}</p>
                      <p className="text-xs text-muted-foreground">Comments</p>
                    </div>
                  )}
                  {item.metrics.clicks && (
                    <div className="text-center p-2 bg-purple-50 rounded">
                      <p className="text-sm">{item.metrics.clicks}</p>
                      <p className="text-xs text-muted-foreground">Clicks</p>
                    </div>
                  )}
                  {item.metrics.redemptions && (
                    <div className="text-center p-2 bg-orange-50 rounded">
                      <p className="text-sm">{item.metrics.redemptions}</p>
                      <p className="text-xs text-muted-foreground">Redeemed</p>
                    </div>
                  )}
                </div>
              )}

              {/* Budget info for boosted posts */}
              {item.budget && (
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <span>Daily: AU${item.budget.daily}</span>
                  <span>Spent: AU${item.budget.spent}</span>
                </div>
              )}

              {/* Quick actions */}
              <div className="flex space-x-2">
                {item.status === "paused" ? (
                  <Button size="sm" className="flex-1" variant="outline">
                    <Play className="w-3 h-3 mr-1" />
                    Resume
                  </Button>
                ) : (
                  <Button size="sm" className="flex-1" variant="outline">
                    <Pause className="w-3 h-3 mr-1" />
                    Pause
                  </Button>
                )}
                {item.type === "boosted_post" && (
                  <Button size="sm" className="flex-1" variant="outline">
                    <Zap className="w-3 h-3 mr-1" />
                    Boost More
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Next Week Preview */}
      <Card>
        <CardContent className="p-4 text-center">
          <Clock className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
          <h3 className="text-base mb-1">Next Week Preview</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Plan for Sep 22-28 will be ready Sunday evening
          </p>
          <p className="text-sm mb-4">
            <strong>Preview theme:</strong> Autumn Flavors Launch
          </p>
          <Button variant="outline" size="sm">
            Generate Early Preview
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
