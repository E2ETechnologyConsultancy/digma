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
import { Separator } from "./ui/separator";
import { Progress } from "./ui/progress";
import {
  Play,
  Download,
  Wand2,
  RefreshCw,
  Check,
  Clock,
  Video,
  Sparkles,
  Target,
  Users,
  DollarSign,
  TrendingUp,
  Palette,
  Music,
  Type,
  Zap,
  Eye,
  Share2,
  ChevronRight,
  Volume2,
  Settings,
  ImageIcon,
  User,
  Briefcase,
  Coffee,
  Heart,
  Pause,
  X,
  Maximize,
  Dumbbell,
  ArrowLeft,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  LanguageSelector,
  VoiceInputButton,
  useVoiceRecognition,
} from "./LanguageVoiceInput";

interface AIVideoGenerationProps {
  onBack?: () => void;
  onUseVideo?: (videoData: any) => void;
  onGoToDashboard?: () => void;
  onSave?: (videoData: any) => void;
}

export function AIVideoGeneration({
  onBack,
  onUseVideo,
  onGoToDashboard,
  onSave,
}: AIVideoGenerationProps) {
  const [currentStep, setCurrentStep] = useState<
    "input" | "generating" | "preview" | "customise"
  >("input");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [promptText, setPromptText] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("professional");
  const [selectedDuration, setSelectedDuration] = useState(15);
  const [selectedContentType, setSelectedContentType] = useState<
    "video" | "image"
  >("video");
  const [businessContext, setBusinessContext] = useState("");
  const [generatedVideo, setGeneratedVideo] = useState<any>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  // Voice recognition hook
  const { isListening, speechSupported, toggleVoiceInput, currentLang } =
    useVoiceRecognition(selectedLanguage, (transcript) => {
      setPromptText((prev) => (prev ? `${prev} ${transcript}` : transcript));
    });

  const videoStyles = [
    {
      id: "professional",
      name: "Professional",
      description: "Clean, business-appropriate style",
      preview:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByZXNlbnRhdGlvbnxlbnwxfHx8fDE3NTc5MzYzODB8MA&ixlib=rb-4.1.0&q=80&w=400",
      color: "blue",
    },
    {
      id: "dynamic",
      name: "Dynamic",
      description: "Energetic with motion graphics",
      preview:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkeW5hbWljJTIwbW90aW9uJTIwZ3JhcGhpY3N8ZW58MXx8fHwxNzU3OTM2MzgwfDA&ixlib=rb-4.1.0&q=80&w=400",
      color: "purple",
    },
    {
      id: "minimalist",
      name: "Minimalist",
      description: "Simple, elegant, and clean",
      preview:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZGVzaWdufGVufDF8fHx8MTc1NzkzNjM4MHww&ixlib=rb-4.1.0&q=80&w=400",
      color: "green",
    },
    {
      id: "local_business",
      name: "Local Business",
      description: "Warm, community-focused feel",
      preview:
        "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2NhbCUyMGJ1c2luZXNzJTIwY29mZmVlJTIwc2hvcHxlbnwxfHx8fDE3NTc5MzYzODB8MA&ixlib=rb-4.1.0&q=80&w=400",
      color: "orange",
    },
  ];

  const durations = [
    { seconds: 15, label: "15s", description: "Perfect for Instagram Stories" },
    { seconds: 30, label: "30s", description: "Standard social media video" },
    { seconds: 60, label: "60s", description: "Detailed product showcase" },
  ];

  const contentTypes = [
    {
      id: "video",
      name: "AI Video",
      description: "Animated video with transitions",
      icon: <Video className="w-5 h-5" />,
      performance: "1200% better engagement",
    },
    {
      id: "image",
      name: "AI Image",
      description: "High-quality static visual",
      icon: <ImageIcon className="w-5 h-5" />,
      performance: "Quick creation, proven results",
    },
  ];

  const businessScenarios = [
    {
      category: "Healthcare",
      prompts: [
        "New dentist joined our team - she's an expert in root canal treatment",
        "Introducing our new dental hygienist specializing in preventive care",
        "Meet our orthodontist who can help you achieve the perfect smile",
        "Our physiotherapist helps patients recover from sports injuries",
      ],
    },
    {
      category: "Food & Dining",
      prompts: [
        "Fresh morning pastries baked daily with premium ingredients",
        "New chef brings Mediterranean flavors to our restaurant menu",
        "Weekend special - 20% off all brunch items this Saturday",
        "Farm-to-table ingredients sourced from local organic farmers",
      ],
    },
    {
      category: "Beauty & Wellness",
      prompts: [
        "New nail technician specializing in artistic nail designs",
        "Introducing our certified massage therapist for relaxation",
        "Hair stylist expert in modern color and cutting techniques",
        "Aesthetician offering advanced anti-aging facial treatments",
      ],
    },
    {
      category: "Professional Services",
      prompts: [
        "New lawyer joins our family law practice team",
        "Certified accountant helping with tax season preparation",
        "Real estate agent with 10+ years local market experience",
        "Financial advisor specializing in retirement planning services",
      ],
    },
    {
      category: "Fitness & Sports",
      prompts: [
        "Personal fitness trainer specializing in strength conditioning",
        "New yoga instructor brings mindful movement classes",
        "Sports massage therapist helps athletes recover faster",
        "Nutritionist creates custom meal plans for fitness goals",
      ],
    },
  ];

  const generateVideo = async () => {
    setIsGenerating(true);
    setCurrentStep("generating");
    setGenerationProgress(0);

    // Simulate AI content generation process
    const steps =
      selectedContentType === "video"
        ? [
            { progress: 15, message: "Analyzing your business context..." },
            { progress: 30, message: "Creating visual storyboard..." },
            { progress: 50, message: "Generating video frames..." },
            { progress: 70, message: "Adding professional transitions..." },
            { progress: 85, message: "Optimizing for social platforms..." },
            { progress: 100, message: "Video generation complete!" },
          ]
        : [
            { progress: 20, message: "Understanding your business needs..." },
            { progress: 40, message: "Designing visual composition..." },
            { progress: 70, message: "Generating high-quality image..." },
            { progress: 90, message: "Applying professional styling..." },
            { progress: 100, message: "Image generation complete!" },
          ];

    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setGenerationProgress(step.progress);
    }

    // Generate contextual content based on business prompt
    const getContextualContent = () => {
      const prompt = promptText.toLowerCase();

      if (
        prompt.includes("dentist") ||
        prompt.includes("dental") ||
        prompt.includes("root canal")
      ) {
        return {
          title: "Meet Our New Dental Expert",
          thumbnail:
            "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBjbGluaWN8ZW58MXx8fHwxNzU3OTM2MzgwfDA&ixlib=rb-4.1.0&q=80&w=600",
          caption:
            "🦷 Introducing Dr. Sarah Chen, our new root canal specialist! With 8+ years of experience and gentle approach, she's here to provide painless, expert dental care. Book your consultation today!",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          estimatedViews: Math.floor(Math.random() * 1000) + 2000,
          estimatedEngagement: Math.floor(Math.random() * 200) + 300,
        };
      } else if (
        prompt.includes("coffee") ||
        prompt.includes("pastry") ||
        prompt.includes("bakery")
      ) {
        return {
          title: "Fresh Daily Delights",
          thumbnail:
            "https://images.unsplash.com/photo-1551024506-0bccd828d307?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wfGVufDF8fHx8MTc1NzkzNjM4MHww&ixlib=rb-4.1.0&q=80&w=600",
          caption:
            "☕ Fresh pastries baked every morning with premium ingredients! Our artisan coffee pairs perfectly. Come experience the difference quality makes. #FreshBaked #LocalCoffee",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
          estimatedViews: Math.floor(Math.random() * 800) + 1200,
          estimatedEngagement: Math.floor(Math.random() * 150) + 180,
        };
      } else if (
        prompt.includes("nail") ||
        prompt.includes("beauty") ||
        prompt.includes("massage")
      ) {
        return {
          title: "Expert Beauty Services",
          thumbnail:
            "https://images.unsplash.com/photo-1560066984-138dadb4c035?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzYWxvbnxlbnwxfHx8fDE3NTc5MzYzODB8MA&ixlib=rb-4.1.0&q=80&w=600",
          caption:
            "✨ Meet our certified nail artist specializing in creative designs! From classic elegance to bold artistic expressions. Book your appointment for stunning results! #NailArt #BeautyExpert",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
          estimatedViews: Math.floor(Math.random() * 900) + 1500,
          estimatedEngagement: Math.floor(Math.random() * 180) + 220,
        };
      } else if (
        prompt.includes("restaurant") ||
        prompt.includes("food") ||
        prompt.includes("chef")
      ) {
        return {
          title: "Culinary Excellence",
          thumbnail:
            "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZHxlbnwxfHx8fDE3NTc5MzYzODB8MA&ixlib=rb-4.1.0&q=80&w=600",
          caption:
            "👨‍🍳 Experience our new chef's Mediterranean fusion cuisine! Fresh ingredients, authentic flavors, and culinary artistry in every dish. Reserve your table now!",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
          estimatedViews: Math.floor(Math.random() * 1200) + 1800,
          estimatedEngagement: Math.floor(Math.random() * 200) + 250,
        };
      } else if (
        prompt.includes("fitness") ||
        prompt.includes("gym") ||
        prompt.includes("trainer")
      ) {
        return {
          title: "Fitness Excellence",
          thumbnail:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwZ3ltfGVufDF8fHx8MTc1NzkzNjM4MHww&ixlib=rb-4.1.0&q=80&w=600",
          caption:
            "💪 Meet our certified personal trainer specializing in strength and conditioning! Transform your fitness journey with personalized training programs. Start today!",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
          estimatedViews: Math.floor(Math.random() * 800) + 1400,
          estimatedEngagement: Math.floor(Math.random() * 170) + 200,
        };
      }

      return {
        title: promptText || "Professional Business Content",
        thumbnail:
          "https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHRodW1ibmFpbHxlbnwxfHx8fDE3NTc5MzYzODB8MA&ixlib=rb-4.1.0&q=80&w=600",
        caption:
          "🚀 Professional content created with AI to showcase your business expertise and connect with your community!",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        estimatedViews: Math.floor(Math.random() * 1000) + 1000,
        estimatedEngagement: Math.floor(Math.random() * 150) + 150,
      };
    };

    const contextualContent = getContextualContent();

    // Mock generated content data
    const mockContent = {
      id: Date.now(),
      type: selectedContentType,
      title: contextualContent.title,
      caption: contextualContent.caption,
      thumbnail: contextualContent.thumbnail,
      duration: selectedContentType === "video" ? selectedDuration : null,
      style: selectedStyle,
      videoUrl:
        selectedContentType === "video" ? contextualContent.videoUrl : null,
      specs: {
        resolution: "1920×1080",
        format: selectedContentType === "video" ? "MP4" : "JPG",
        fileSize: selectedContentType === "video" ? "2.4 MB" : "1.2 MB",
        aspectRatio: "16:9",
      },
      performance: {
        estimatedViews: contextualContent.estimatedViews,
        estimatedEngagement: contextualContent.estimatedEngagement,
        completionRate:
          selectedContentType === "video"
            ? Math.floor(Math.random() * 20) + 75
            : null,
      },
    };

    setGeneratedVideo(mockContent);
    setIsGenerating(false);
    setCurrentStep("preview");
  };

  const handleUseVideo = () => {
    if (onUseVideo && generatedVideo) {
      onUseVideo(generatedVideo);
    }
  };

  const renderInput = () => (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between mb-6 pt-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="hover:bg-muted"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h2 className="text-xl font-bold">AI Video Generator</h2>
        <div className="w-16" />
      </div>

      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4">
          {selectedContentType === "video" ? (
            <Video className="w-8 h-8 text-white" />
          ) : (
            <ImageIcon className="w-8 h-8 text-white" />
          )}
        </div>
        <h3 className="text-lg font-bold mb-2">AI Content Generator</h3>
        <p className="text-sm text-muted-foreground">
          Create engaging visual content for your business in minutes
        </p>
      </div>

      {/* Content Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Choose Content Type</CardTitle>
          <CardDescription>
            Select what type of content you'd like to create
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {contentTypes.map((type) => (
              <Button
                key={type.id}
                variant={
                  selectedContentType === type.id ? "default" : "outline"
                }
                className="h-auto p-4 flex-col space-y-2"
                onClick={() =>
                  setSelectedContentType(type.id as "video" | "image")
                }
              >
                <div className="flex items-center space-x-2">
                  {type.icon}
                  <span className="font-medium">{type.name}</span>
                </div>
                <div className="text-center">
                  <p className="text-xs opacity-80">{type.description}</p>
                  <p className="text-xs font-medium mt-1">{type.performance}</p>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Language Selector */}
      <LanguageSelector
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
      />

      {/* Business Context & Prompt */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            What would you like to create?
          </CardTitle>
          <CardDescription>
            Describe your content idea, product, service, or message
            {speechSupported && " • Use voice input or type"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Textarea
              placeholder="e.g., New dentist joined our team - she's an expert in root canal treatment and gentle patient care. Show her expertise and caring approach..."
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              className={`min-h-24 resize-none ${currentLang.rtl ? "text-right" : "text-left"}`}
              dir={currentLang.rtl ? "rtl" : "ltr"}
            />
            <VoiceInputButton
              isListening={isListening}
              onToggle={toggleVoiceInput}
              enabled={speechSupported}
              className="absolute bottom-2 right-2 h-8 px-3"
            />
          </div>

          {/* Business Scenario Suggestions */}
          <div className="space-y-3">
            {businessScenarios.map((scenario) => (
              <div key={scenario.category}>
                <div className="flex items-center space-x-2 mb-2">
                  {scenario.category === "Healthcare" && (
                    <Heart className="w-4 h-4 text-red-500" />
                  )}
                  {scenario.category === "Food & Dining" && (
                    <Coffee className="w-4 h-4 text-orange-500" />
                  )}
                  {scenario.category === "Beauty & Wellness" && (
                    <Sparkles className="w-4 h-4 text-purple-500" />
                  )}
                  {scenario.category === "Professional Services" && (
                    <Briefcase className="w-4 h-4 text-blue-500" />
                  )}
                  {scenario.category === "Fitness & Sports" && (
                    <Dumbbell className="w-4 h-4 text-green-500" />
                  )}
                  <span className="text-xs font-medium text-muted-foreground">
                    {scenario.category}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {scenario.prompts.slice(0, 2).map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs h-7 text-left justify-start"
                      onClick={() => setPromptText(prompt)}
                    >
                      {prompt.length > 35
                        ? prompt.substring(0, 35) + "..."
                        : prompt}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Video Style */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Choose Video Style</CardTitle>
          <CardDescription>
            Select the visual style that matches your brand
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {videoStyles.map((style) => (
              <Card
                key={style.id}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedStyle === style.id
                    ? "ring-2 ring-primary shadow-md"
                    : "hover:shadow-md"
                }`}
                onClick={() => setSelectedStyle(style.id)}
              >
                <CardContent className="p-3">
                  <ImageWithFallback
                    src={style.preview}
                    alt={style.name}
                    className="w-full h-20 object-cover rounded-lg mb-2"
                  />
                  <div className="text-center">
                    <p className="font-medium text-sm">{style.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {style.description}
                    </p>
                  </div>
                  {selectedStyle === style.id && (
                    <div className="flex justify-center mt-2">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Duration - Only show for videos */}
      {selectedContentType === "video" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Video Duration</CardTitle>
            <CardDescription>
              Choose length based on where you'll share it
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {durations.map((duration) => (
                <Button
                  key={duration.seconds}
                  variant={
                    selectedDuration === duration.seconds
                      ? "default"
                      : "outline"
                  }
                  className="h-auto p-3 flex-col space-y-1"
                  onClick={() => setSelectedDuration(duration.seconds)}
                >
                  <span className="font-bold">{duration.label}</span>
                  <span className="text-xs opacity-80">
                    {duration.description}
                  </span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Generate Button */}
      <Button
        onClick={generateVideo}
        disabled={!promptText.trim() || isGenerating}
        className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
      >
        <Wand2 className="w-5 h-5 mr-2" />
        Generate AI {selectedContentType === "video" ? "Video" : "Image"}
      </Button>

      <div className="text-center text-xs text-muted-foreground">
        ⚡ Generation typically takes 30-60 seconds
      </div>
    </div>
  );

  const renderGenerating = () => (
    <div className="space-y-6 text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 animate-pulse">
        <Sparkles className="w-10 h-10 text-white" />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">
          Creating Your {selectedContentType === "video" ? "Video" : "Image"}
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Our AI is crafting professional {selectedContentType} content tailored
          to your business
        </p>
      </div>

      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span>Generation Progress</span>
              <span className="font-medium">{generationProgress}%</span>
            </div>

            <Progress value={generationProgress} className="h-2" />

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="flex items-center space-x-2">
                <Palette className="w-4 h-4 text-purple-600" />
                <span>Visual Style: {selectedStyle}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-purple-600" />
                <span>Duration: {selectedDuration}s</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-xs text-muted-foreground">
        💡 While you wait: Videos perform 1200% better than static posts
      </div>
    </div>
  );

  const renderPreview = () => (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between mb-6 pt-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentStep("input")}
          className="hover:bg-muted"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h2 className="text-xl font-bold">Video Preview</h2>
        <div className="w-16" />
      </div>

      <div className="text-center">
        <h3 className="text-lg font-bold mb-2">
          Your AI {selectedContentType === "video" ? "Video" : "Image"} is
          Ready!
        </h3>
        <p className="text-sm text-muted-foreground">
          Review your generated {selectedContentType} and customize if needed
        </p>
      </div>

      {/* Content Preview */}
      <Card>
        <CardContent className="p-0">
          <div className="relative">
            {selectedContentType === "video" && !isVideoPlaying ? (
              <>
                <ImageWithFallback
                  src={generatedVideo?.thumbnail}
                  alt="Video preview"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black/20 rounded-t-lg flex items-center justify-center">
                  <Button
                    size="lg"
                    className="rounded-full w-16 h-16 bg-white/90 hover:bg-white text-black transition-transform hover:scale-105"
                    onClick={() => {
                      setVideoLoading(true);
                      setIsVideoPlaying(true);
                    }}
                    disabled={videoLoading}
                  >
                    {videoLoading ? (
                      <RefreshCw className="w-6 h-6 animate-spin" />
                    ) : (
                      <Play className="w-6 h-6 ml-1" />
                    )}
                  </Button>
                </div>
                <div className="absolute bottom-3 right-3">
                  <Badge className="bg-black/70 text-white">
                    {generatedVideo?.duration}s
                  </Badge>
                </div>
                <div className="absolute top-3 left-3">
                  <Badge className="bg-purple-600 text-white">
                    <Video className="w-3 h-3 mr-1" />
                    AI Video
                  </Badge>
                </div>
              </>
            ) : selectedContentType === "video" && isVideoPlaying ? (
              <div className="relative">
                <video
                  className="w-full h-48 object-cover rounded-t-lg"
                  controls
                  autoPlay
                  onLoadStart={() => setVideoLoading(true)}
                  onCanPlay={() => setVideoLoading(false)}
                  onError={() => {
                    setVideoError(true);
                    setVideoLoading(false);
                    setIsVideoPlaying(false);
                  }}
                  onEnded={() => setIsVideoPlaying(false)}
                >
                  <source src={generatedVideo?.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                {videoLoading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-lg">
                    <div className="bg-white/90 rounded-lg p-3 flex items-center space-x-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-primary" />
                      <span className="text-sm font-medium">Loading...</span>
                    </div>
                  </div>
                )}
                {videoError && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-lg">
                    <div className="bg-white/90 rounded-lg p-3 text-center">
                      <p className="text-sm font-medium text-red-600">
                        Preview Unavailable
                      </p>
                    </div>
                  </div>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
                  onClick={() => setIsVideoPlaying(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <>
                <ImageWithFallback
                  src={generatedVideo?.thumbnail}
                  alt="Image preview"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-green-600 text-white">
                    <ImageIcon className="w-3 h-3 mr-1" />
                    AI Generated
                  </Badge>
                </div>
              </>
            )}
          </div>
          <div className="p-4 space-y-3">
            <h3 className="font-semibold">{generatedVideo?.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {generatedVideo?.caption}
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>Style: {selectedStyle}</span>
                <span>•</span>
                <span>{generatedVideo?.specs.resolution}</span>
                <span>•</span>
                <span>{generatedVideo?.specs.fileSize}</span>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-800">
                    AI Performance Insights
                  </span>
                </div>

                <div className="space-y-2 text-xs text-purple-700">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-3 h-3" />
                    <span>
                      Expected Views:{" "}
                      {generatedVideo?.performance.estimatedViews?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-3 h-3" />
                    <span>
                      Engagement:{" "}
                      {generatedVideo?.performance.estimatedEngagement?.toLocaleString()}{" "}
                      interactions
                    </span>
                  </div>
                  {selectedContentType === "video" && (
                    <div className="flex items-center space-x-2">
                      <Play className="w-3 h-3" />
                      <span>
                        Completion Rate:{" "}
                        {generatedVideo?.performance.completionRate}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4 pt-4">
        <Button
          variant="outline"
          onClick={() => setCurrentStep("input")}
          className="h-12 hover:bg-muted"
        >
          Regenerate
        </Button>
        <Button
          onClick={handleUseVideo}
          className="h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-medium"
        >
          <Check className="w-4 h-4 mr-2" />
          Use This {selectedContentType === "video" ? "Video" : "Image"}
        </Button>
      </div>

      {/* AI Disclaimer */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4 text-blue-600" />
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-blue-900">AI Preview Notice</h4>
              <p className="text-sm text-blue-700 leading-relaxed">
                This is an AI-generated preview showing the style and concept.
                The final {selectedContentType} will be custom-created with your
                specific business details, branding, and messaging for optimal
                results.
              </p>
              <div className="text-xs text-blue-600">
                ✨ Final content will include your business logo, colors, and
                personalized messaging
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Video Modal for Full Screen Playback
  const VideoModal = () =>
    showVideoModal && (
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-4xl max-h-full">
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white"
            onClick={() => setShowVideoModal(false)}
          >
            <X className="w-4 h-4" />
          </Button>
          <div className="relative bg-black rounded-lg overflow-hidden">
            <video
              className="w-full h-full object-contain rounded-lg"
              controls
              autoPlay
              onLoadStart={() => setVideoLoading(true)}
              onCanPlay={() => setVideoLoading(false)}
              onError={() => {
                setVideoError(true);
                setVideoLoading(false);
              }}
              onEnded={() => setShowVideoModal(false)}
            >
              <source src={generatedVideo.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {videoLoading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                <div className="bg-white/90 rounded-lg p-4 flex items-center space-x-3">
                  <RefreshCw className="w-5 h-5 animate-spin text-primary" />
                  <span className="font-medium">Loading video...</span>
                </div>
              </div>
            )}

            {videoError && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                <div className="bg-white/90 rounded-lg p-4 text-center max-w-sm">
                  <p className="font-medium text-red-600 mb-2">
                    Video Preview Unavailable
                  </p>
                  <p className="text-sm text-muted-foreground">
                    The video preview couldn't load, but your AI-generated
                    content will work perfectly in production.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
      <div className="min-h-screen p-4">
        <div className="max-w-md mx-auto">
          {currentStep === "input" && renderInput()}
          {currentStep === "generating" && renderGenerating()}
          {currentStep === "preview" && renderPreview()}
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal />
    </div>
  );
}
