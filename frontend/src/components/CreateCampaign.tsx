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
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { useCurrency } from "./CurrencyContext";
import {
  ArrowLeft,
  Camera,
  Image as ImageIcon,
  Zap,
  MapPin,
  MessageSquare,
  Facebook,
  Instagram,
  Sparkles,
  DollarSign,
  Clock,
  Users,
  Target,
  Send,
  Save,
  Wand2,
  CreditCard,
  TrendingUp,
  Video,
  Play,
  Eye,
  TrendingUp as Growth,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AIGenerationSamples } from "./AIGenerationSamples";
import { AIVideoGeneration } from "./AIVideoGeneration";
import { SchedulingModal } from "./SchedulingModal";
import { PostConfirmationModal } from "./PostConfirmationModal";

interface CreateCampaignProps {
  onClose: () => void;
  onSave: (campaign: any) => void;
  onGoToDashboard?: () => void;
}

export function CreateCampaign({
  onClose,
  onSave,
  onGoToDashboard,
}: CreateCampaignProps) {
  const { currency, formatCurrency } = useCurrency();
  const [step, setStep] = useState<
    "type" | "content" | "targeting" | "budget" | "ai_generate" | "ai_video"
  >("type");
  const [campaignType, setCampaignType] = useState<string>("");
  const [showSchedulingModal, setShowSchedulingModal] = useState(false);
  const [showPostConfirmation, setShowPostConfirmation] = useState(false);
  const [confirmationData, setConfirmationData] = useState<any>(null);
  const [campaign, setCampaign] = useState({
    title: "",
    caption: "",
    image: "",
    videoUrl: "",
    contentType: "image" as "image" | "video",
    channels: [] as string[],
    budget: { daily: 10, total: 70 },
    targeting: { location: "5km radius", demographics: "Auto" },
    boost: false,
    scheduling: "now",
  });

  const campaignTypes = [
    {
      id: "organic_post",
      title: "Social Post",
      description: "Share on Facebook & Instagram",
      icon: <Facebook className="w-6 h-6 text-blue-600" />,
      cost: "Free",
      channels: ["facebook", "instagram"],
    },
    {
      id: "boosted_post",
      title: "Boosted Post",
      description: "Post + paid promotion",
      icon: <Zap className="w-6 h-6 text-purple-600" />,
      cost: `${currency.symbol}${currency.code === "AED" ? "20-90" : "5-25"}/day`,
      channels: ["facebook", "instagram"],
    },
    {
      id: "gbp_offer",
      title: "Google Offer",
      description: "Special offer on Google Business",
      icon: <MapPin className="w-6 h-6 text-red-600" />,
      cost: "Free",
      channels: ["google"],
    },
    {
      id: "whatsapp_campaign",
      title: "WhatsApp Campaign",
      description: "Click-to-message ads",
      icon: <MessageSquare className="w-6 h-6 text-green-600" />,
      cost: `${currency.symbol}${currency.code === "AED" ? "0.35" : "0.10"}/click`,
      channels: ["whatsapp"],
    },
  ];

  const quickTemplates = [
    {
      id: "daily_special",
      title: "Today's Special",
      caption:
        "🍰 Fresh baked this morning! Try our [ITEM] - available while stocks last. What's your favorite pastry?",
      image:
        "https://images.unsplash.com/photo-1555507036-ab1f4038808a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0cnklMjBiYWtlcnl8ZW58MXx8fHwxNzU3OTM2MzgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: "weekend_special",
      title: "Weekend Promotion",
      caption:
        "🎉 Weekend Special! 20% off all weekend treats. Perfect for your morning coffee. Tag a friend who needs to try this!",
      image:
        "https://images.unsplash.com/photo-1551024506-0bccd828d307?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wfGVufDF8fHx8MTc1NzkzNjM4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: "new_product",
      title: "New Product Launch",
      caption:
        "✨ Introducing our newest creation! Made with premium ingredients and lots of love. Come try it today and let us know what you think!",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBuZXclMjBwcm9kdWN0fGVufDF8fHx8MTc1NzkzNjM4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  const handleTypeSelect = (type: any) => {
    setCampaignType(type.id);
    setCampaign((prev) => ({
      ...prev,
      channels: type.channels,
      boost: type.id === "boosted_post",
    }));
    setStep("content");
  };

  const handleTemplateSelect = (template: any) => {
    setCampaign((prev) => ({
      ...prev,
      title: template.title,
      caption: template.caption,
      image: template.image,
      contentType: "image",
    }));
  };

  const handleSave = () => {
    if (campaign.scheduling === "schedule") {
      setShowSchedulingModal(true);
    } else {
      // Show confirmation modal for "Post Now"
      const campaignData = {
        ...campaign,
        type: campaignType,
        id: Date.now(),
        status: "live",
        createdAt: new Date().toISOString(),
      };
      setConfirmationData(campaignData);
      setShowPostConfirmation(true);
    }
  };

  const handleSchedule = (scheduleData: any) => {
    // Show confirmation modal for scheduled posts too
    const campaignData = {
      ...campaign,
      type: campaignType,
      id: Date.now(),
      status: "scheduled",
      scheduledFor: scheduleData,
      createdAt: new Date().toISOString(),
    };
    setConfirmationData(campaignData);
    setShowSchedulingModal(false);
    setShowPostConfirmation(true);
  };

  // Handler for when AI video is used in campaign
  const handleVideoUse = (videoData: any) => {
    setCampaign((prev) => ({
      ...prev,
      title: videoData.title,
      caption: videoData.caption,
      image: videoData.thumbnail,
      videoUrl: videoData.videoUrl,
      contentType: "video",
      channels: ["facebook", "instagram"],
    }));
    setCampaignType("organic_post");
    setStep("content");
  };

  // Handler for when AI image content is used
  const handleImageUse = (contentData: any) => {
    setCampaign((prev) => ({
      ...prev,
      title: contentData.title,
      caption: contentData.caption,
      image: contentData.image,
      contentType: "image",
      channels: ["facebook", "instagram"],
    }));
    setCampaignType("organic_post");
    setStep("content");
  };

  const renderTypeSelection = () => (
    <div className="space-y-6">
      <div className="text-center mb-8 pt-4">
        <h2 className="text-2xl font-bold mb-3">Create Campaign</h2>
        <p className="text-muted-foreground">
          Choose what you'd like to create
        </p>
      </div>

      {/* AI Quick Create - Featured at Top */}
      <Card className="relative overflow-hidden border-purple-200 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 via-blue-50/60 to-indigo-50/80"></div>
        <div className="absolute top-3 right-3">
          <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 text-xs font-medium">
            ⭐ Recommended
          </Badge>
        </div>
        <CardContent className="relative p-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl mb-6 shadow-lg">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-3">
            AI Quick Create
          </h3>
          <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
            Let our AI create a complete, optimised campaign for you in under 30
            seconds. Just tell us what you want to promote.
          </p>
          <Button
            className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium text-lg shadow-lg"
            onClick={() => setStep("ai_generate")}
          >
            <Wand2 className="w-5 h-5 mr-3" />
            Generate Campaign
          </Button>
          <p className="text-xs text-muted-foreground mt-3">
            ✨ Creates image, caption, targeting & budget automatically
          </p>
        </CardContent>
      </Card>

      {/* AI Video Generator - New Featured Option */}
      <Card className="relative overflow-hidden border-pink-200 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50/80 via-purple-50/60 to-indigo-50/80"></div>
        <div className="absolute top-3 right-3">
          <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0 text-xs font-medium">
            🔥 New
          </Badge>
        </div>
        <CardContent className="relative p-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl mb-6 shadow-lg">
            <Video className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-3">
            AI Video Generator
          </h3>
          <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
            Create professional video content that performs 1200% better than
            static posts. Perfect for social media.
          </p>
          <Button
            className="w-full h-12 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-all duration-200 font-medium text-lg shadow-lg"
            onClick={() => setStep("ai_video")}
          >
            <Video className="w-5 h-5 mr-3" />
            Create AI Video
          </Button>
          <p className="text-xs text-muted-foreground mt-3">
            🎬 Generate custom videos with AI in under 60 seconds
          </p>
        </CardContent>
      </Card>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-3 text-muted-foreground">
            Or create manually
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {campaignTypes.map((type) => (
          <Card
            key={type.id}
            className="cursor-pointer hover:shadow-md transition-all duration-200 border-border/50 hover:border-primary/30"
            onClick={() => handleTypeSelect(type)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
                  {type.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground">
                    {type.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {type.description}
                  </p>
                </div>
                <div className="text-right">
                  <Badge
                    variant="outline"
                    className="font-medium border-primary/20 text-primary bg-primary/5 text-xs"
                  >
                    {type.cost}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderContentCreation = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6 pt-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setStep("type")}
          className="hover:bg-muted"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h2 className="text-xl font-bold">Create Content</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSave}
          className="hover:bg-muted"
        >
          <Save className="w-4 h-4" />
        </Button>
      </div>

      {/* Video Content Display */}
      {campaign.contentType === "video" && campaign.videoUrl && (
        <Card className="border-pink-200 bg-gradient-to-br from-pink-50 to-purple-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-medium">
                AI Video
              </Badge>
              <span className="text-sm font-medium text-pink-800">
                Video content ready!
              </span>
            </div>

            <div className="relative bg-black rounded-lg overflow-hidden mb-4">
              <video
                className="w-full h-48 object-cover"
                poster={campaign.image}
                controls
              >
                <source src={campaign.videoUrl} type="video/mp4" />
                Your browser does not support video playback.
              </video>
              <div className="absolute top-2 left-2">
                <Badge className="bg-black/50 text-white text-xs">
                  <Play className="w-3 h-3 mr-1" />
                  Video
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-pink-700">
                <strong>Title:</strong> {campaign.title}
              </p>
              <div className="flex items-center space-x-4 text-xs text-pink-600">
                <div className="flex items-center space-x-1">
                  <Eye className="w-3 h-3" />
                  <span>Est. 2,000+ views</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Growth className="w-3 h-3" />
                  <span>1200% better performance</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Templates */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Quick Templates</h3>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {quickTemplates.map((template) => (
            <Card
              key={template.id}
              className="cursor-pointer hover:shadow-md transition-all duration-200 border-border/50 hover:border-primary/30"
              onClick={() => handleTemplateSelect(template)}
            >
              <CardContent className="p-3">
                <ImageWithFallback
                  src={template.image}
                  alt={template.title}
                  className="w-full h-20 object-cover rounded-lg mb-2"
                />
                <p className="text-xs text-center font-medium text-muted-foreground">
                  {template.title}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Image Upload */}
      {campaign.contentType === "image" && (
        <div>
          <h3 className="font-semibold text-foreground mb-3">Add Image</h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Button
              variant="outline"
              className="h-24 flex-col space-y-2 border-dashed hover:border-primary/50 hover:bg-primary/5 transition-colors"
              onClick={() => {
                setCampaign((prev) => ({
                  ...prev,
                  image:
                    "https://images.unsplash.com/photo-1551024506-0bccd828d307?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wfGVufDF8fHx8MTc1NzkzNjM4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                }));
              }}
            >
              <Camera className="w-7 h-7 text-primary" />
              <span className="text-sm font-medium">Take Photo</span>
            </Button>
            <div className="relative">
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setCampaign((prev) => ({
                      ...prev,
                      image:
                        "https://images.unsplash.com/photo-1555507036-ab1f4038808a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0cnklMjBiYWtlcnl8ZW58MXx8fHwxNzU3OTM2MzgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                    }));
                  }
                }}
              />
              <Button
                variant="outline"
                className="h-24 w-full flex-col space-y-2 border-dashed hover:border-primary/50 hover:bg-primary/5 transition-colors"
                onClick={() => document.getElementById("image-upload")?.click()}
              >
                <ImageIcon className="w-7 h-7 text-primary" />
                <span className="text-sm font-medium">Upload Image</span>
              </Button>
            </div>
          </div>
          {campaign.image && (
            <ImageWithFallback
              src={campaign.image}
              alt="Campaign preview"
              className="w-full h-40 object-cover rounded-xl mb-4 border border-border/50"
            />
          )}
        </div>
      )}

      {/* Caption */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Caption</h3>
        <Textarea
          placeholder="Write your caption here... Use emojis and hashtags!"
          value={campaign.caption}
          onChange={(e) =>
            setCampaign((prev) => ({ ...prev, caption: e.target.value }))
          }
          className="min-h-28 mb-3 resize-none border-border/50 focus:border-primary/50"
        />
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {campaign.caption.length}/280 characters
          </span>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-sm h-8 hover:bg-primary/10 text-primary"
              onClick={() => {
                const aiCaptions = [
                  "🍰 Fresh baked this morning! Try our signature pastry - made with love and premium ingredients. What's your favorite treat? #freshbaked #localbusiness",
                  "✨ New week, new flavors! Our baker's special is ready to brighten your day. Come taste the difference quality makes! #newweek #artisanbaking",
                  "☕ Perfect pairing alert! Our fresh pastries go perfectly with your morning coffee. Start your day right with us! #coffeetime #morningtreat",
                ];
                const randomCaption =
                  aiCaptions[Math.floor(Math.random() * aiCaptions.length)];
                setCampaign((prev) => ({ ...prev, caption: randomCaption }));
              }}
            >
              <Wand2 className="w-4 h-4 mr-1" />
              Generate
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-sm h-8 hover:bg-primary/10 text-primary"
              onClick={() => {
                if (campaign.caption) {
                  const improved =
                    campaign.caption + " ✨ #LocalBusiness #QualityFirst";
                  setCampaign((prev) => ({ ...prev, caption: improved }));
                }
              }}
            >
              <Sparkles className="w-4 h-4 mr-1" />
              Improve
            </Button>
          </div>
        </div>
      </div>

      {/* Boost Toggle */}
      {campaignType === "boosted_post" && (
        <Card className="shadow-sm border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-semibold text-foreground">
                  Boost this post
                </h4>
                <p className="text-sm text-muted-foreground">
                  Reach more people in your area
                </p>
              </div>
              <Switch
                checked={campaign.boost}
                onCheckedChange={(checked) =>
                  setCampaign((prev) => ({ ...prev, boost: checked }))
                }
              />
            </div>
            {campaign.boost && (
              <div className="mt-4 space-y-3">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <DollarSign className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="font-medium text-blue-700">
                      Daily Budget: £{campaign.budget.daily}
                    </span>
                  </div>
                  <p className="text-sm text-blue-600">
                    Estimated reach: 800-1,200 people per day
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Channels */}
      <Card className="shadow-sm border-border/50">
        <CardContent className="p-5">
          <h4 className="font-semibold text-foreground mb-4">Post to:</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
              <Facebook className="w-5 h-5 text-blue-600" />
              <div className="flex-1">
                <span className="font-medium text-foreground">
                  Facebook Page
                </span>
                <p className="text-xs text-muted-foreground">
                  Connect to post to Facebook
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                Connect
              </Button>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
              <Instagram className="w-5 h-5 text-pink-600" />
              <div className="flex-1">
                <span className="font-medium text-foreground">Instagram</span>
                <p className="text-xs text-muted-foreground">
                  Connect to post to Instagram
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-pink-600 border-pink-200 hover:bg-pink-50"
              >
                Connect
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scheduling */}
      <Card className="shadow-sm border-border/50">
        <CardContent className="p-5">
          <h4 className="font-semibold text-foreground mb-4">When to post</h4>
          <div className="space-y-3">
            <Button
              variant={campaign.scheduling === "now" ? "default" : "outline"}
              size="sm"
              onClick={() =>
                setCampaign((prev) => ({ ...prev, scheduling: "now" }))
              }
              className={`w-full h-auto p-4 ${campaign.scheduling === "now" ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0" : "hover:bg-green-50 hover:border-green-500 border-2"}`}
            >
              <div className="flex items-center space-x-3 w-full">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${campaign.scheduling === "now" ? "bg-white/20" : "bg-green-100"}`}
                >
                  <Send
                    className={`w-5 h-5 ${campaign.scheduling === "now" ? "text-white" : "text-green-600"}`}
                  />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold">Post Now</p>
                  <p
                    className={`text-xs ${campaign.scheduling === "now" ? "text-white/80" : "text-muted-foreground"}`}
                  >
                    AI optimal time • High engagement expected
                  </p>
                </div>
                {campaign.scheduling === "now" && (
                  <div className="text-right">
                    <Badge className="bg-white/20 text-white border-white/30 text-xs">
                      ⚡ Recommended
                    </Badge>
                  </div>
                )}
              </div>
            </Button>

            <Button
              variant={
                campaign.scheduling === "schedule" ? "default" : "outline"
              }
              size="sm"
              onClick={() =>
                setCampaign((prev) => ({ ...prev, scheduling: "schedule" }))
              }
              className={`w-full h-auto p-4 ${campaign.scheduling === "schedule" ? "bg-primary hover:bg-primary/90" : "hover:bg-primary/10 hover:border-primary/50"}`}
            >
              <div className="flex items-center space-x-3 w-full">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${campaign.scheduling === "schedule" ? "bg-white/20" : "bg-blue-100"}`}
                >
                  <Clock
                    className={`w-5 h-5 ${campaign.scheduling === "schedule" ? "text-white" : "text-blue-600"}`}
                  />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold">Schedule</p>
                  <p
                    className={`text-xs ${campaign.scheduling === "schedule" ? "text-white/80" : "text-muted-foreground"}`}
                  >
                    Choose specific date and time
                  </p>
                </div>
              </div>
            </Button>
          </div>

          {/* AI Insights for Post Now */}
          {campaign.scheduling === "now" && (
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-sm mt-4">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Sparkles className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    AI Timing Insights
                  </span>
                </div>

                <div className="space-y-2 text-xs text-green-700">
                  <div className="flex items-center space-x-2">
                    <Target className="w-3 h-3" />
                    <span>
                      Current time is optimal for your audience (87% confidence)
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-3 h-3" />
                    <span>Coffee shop customers most active right now</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-3 h-3" />
                    <span>Expected: 800-1,200 reach, 60-120 engagements</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4 pt-6">
        <Button
          variant="outline"
          onClick={onClose}
          className="h-12 hover:bg-muted"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          className="h-12 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 font-medium"
        >
          {campaign.scheduling === "now" ? "Post Now" : "Schedule Post"}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
      <div className="min-h-screen p-4">
        <div className="max-w-md mx-auto">
          {step === "type" && renderTypeSelection()}
          {step === "content" && renderContentCreation()}
          {step === "ai_generate" && (
            <AIGenerationSamples
              onBack={() => setStep("type")}
              onUseContent={handleImageUse}
              onGoToDashboard={onGoToDashboard}
            />
          )}
          {step === "ai_video" && (
            <AIVideoGeneration
              onBack={() => setStep("type")}
              onUseVideo={handleVideoUse}
            />
          )}
        </div>
      </div>

      {/* Modals */}
      {showSchedulingModal && (
        <SchedulingModal
          onClose={() => setShowSchedulingModal(false)}
          onSchedule={handleSchedule}
        />
      )}

      {showPostConfirmation && confirmationData && (
        <PostConfirmationModal
          campaign={confirmationData}
          onClose={() => setShowPostConfirmation(false)}
          onSave={(campaign) => {
            onSave(campaign);
            setShowPostConfirmation(false);
            onClose();
          }}
          onGoToDashboard={onGoToDashboard}
        />
      )}
    </div>
  );
}
