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
import { Textarea } from "./ui/textarea";
import {
  Sparkles,
  Image as ImageIcon,
  FileText,
  Video,
  Wand2,
  RotateCcw,
  Download,
  Copy,
  Camera,
  Upload,
  CheckCircle,
  Clock,
  Palette,
  Type,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  LanguageSelector,
  VoiceInputButton,
  useVoiceRecognition,
} from "./LanguageVoiceInput";

interface AssetFactoryProps {
  user: any;
  campaignData?: any;
  onAssetsGenerated?: (assets: GeneratedAssets) => void;
}

interface GeneratedAssets {
  caption: string;
  image: string;
  reelScript: string;
  altText: string;
  brandColors: string[];
  variations: {
    captions: string[];
    images: string[];
    scripts: string[];
  };
}

export function AssetFactory({
  user,
  campaignData,
  onAssetsGenerated,
}: AssetFactoryProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentAssets, setCurrentAssets] = useState<GeneratedAssets | null>(
    null,
  );
  const [brandKit, setBrandKit] = useState({
    logo: "/placeholder-logo.png",
    primaryColor: "#2563eb",
    secondaryColor: "#f8fafc",
    font: "Inter",
    tone: "friendly",
  });

  const [generationPrompt, setGenerationPrompt] = useState("");
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  // Voice recognition hook
  const { isListening, speechSupported, toggleVoiceInput, currentLang } =
    useVoiceRecognition(selectedLanguage, (transcript) => {
      setGenerationPrompt((prev) =>
        prev ? `${prev} ${transcript}` : transcript,
      );
    });

  useEffect(() => {
    // Auto-generate initial assets if campaign data provided
    if (campaignData && !currentAssets) {
      generateAssets();
    }
  }, [campaignData]);

  const generateAssets = async () => {
    setIsGenerating(true);

    // Simulate AI asset generation
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const mockAssets: GeneratedAssets = {
      caption:
        "🍰 Fresh baked this morning! Try our signature chocolate birthday cake - made with premium Belgian chocolate and lots of love. Perfect for your special celebration! \n\n✨ Available while stocks last\n📍 Order now or visit us in-store\n\n#BirthdayCake #FreshBaked #ChocolateLovers",
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ0aGRheSUyMGNha2V8ZW58MXx8fHwxNzU3OTM2MzgwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      reelScript:
        "Close-up of chocolate cake being decorated... 'When you want to make birthdays extra special...' Zoom out to show full display... 'Our handcrafted birthday cakes are made fresh daily!' End with shop logo and 'Order yours today!'",
      altText:
        "Chocolate birthday cake with decorative frosting and candles on display at local bakery",
      brandColors: [brandKit.primaryColor, brandKit.secondaryColor],
      variations: {
        captions: [
          "🎂 Birthday coming up? Our chocolate masterpiece is ready! Made with premium ingredients and decorated with care. Visit us today! #BirthdayCake #Chocolate",
          "✨ Celebrate in style with our signature birthday cake! Freshly baked chocolate sponge with rich buttercream. Perfect for any celebration! 🍰",
          "🍫 Nothing says birthday like our chocolate cake! Hand-decorated daily with love. Come taste the difference quality makes! #FreshBaked",
        ],
        images: [
          "https://images.unsplash.com/photo-1578985545062-69928b1d9587?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ0aGRheSUyMGNha2V8ZW58MXx8fHwxNzU3OTM2MzgwfDA&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ0aGRheSUyMGNha2UlMjBjaG9jb2xhdGV8ZW58MXx8fHwxNzU3OTM2MzgwfDA&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ0aGRheSUyMGRlY29yYXRpb258ZW58MXx8fHwxNzU3OTM2MzgwfDA&ixlib=rb-4.1.0&q=80&w=1080",
        ],
        scripts: [
          "Start with hands kneading dough... 'Every birthday deserves something special...' Show cake decorating process... 'Made fresh, just for you!' End with final product.",
          "Time-lapse of cake being assembled... 'From simple ingredients to sweet memories...' Close-up of decorating details... 'Your celebration starts here!'",
          "Behind-the-scenes baking montage... 'Quality you can taste...' Show happy customer receiving cake... 'Making birthdays memorable since day one!'",
        ],
      },
    };

    setCurrentAssets(mockAssets);
    setIsGenerating(false);
    onAssetsGenerated?.(mockAssets);
  };

  const regenerateCaption = async () => {
    if (!currentAssets) return;

    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newCaption =
      currentAssets.variations.captions[
        Math.floor(Math.random() * currentAssets.variations.captions.length)
      ];
    setCurrentAssets((prev) =>
      prev ? { ...prev, caption: newCaption } : null,
    );
    setIsGenerating(false);
  };

  const regenerateScript = async () => {
    if (!currentAssets) return;

    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newScript =
      currentAssets.variations.scripts[
        Math.floor(Math.random() * currentAssets.variations.scripts.length)
      ];
    setCurrentAssets((prev) =>
      prev ? { ...prev, reelScript: newScript } : null,
    );
    setIsGenerating(false);
  };

  const swapImage = async () => {
    if (!currentAssets) return;

    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newImage =
      currentAssets.variations.images[
        Math.floor(Math.random() * currentAssets.variations.images.length)
      ];
    setCurrentAssets((prev) => (prev ? { ...prev, image: newImage } : null));
    setIsGenerating(false);
  };

  const handleCustomImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCustomImage(result);
        if (currentAssets) {
          setCurrentAssets((prev) =>
            prev ? { ...prev, image: result } : null,
          );
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadAssets = () => {
    if (!currentAssets) return;

    const content = `DigMa Generated Assets
    
CAPTION:
${currentAssets.caption}

REEL SCRIPT (≤15 seconds):
${currentAssets.reelScript}

ALT TEXT:
${currentAssets.altText}

BRAND COLORS:
${currentAssets.brandColors.join(", ")}

Generated: ${new Date().toISOString()}`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "digma-generated-assets.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Asset Factory Header */}
      <Card className="shadow-sm border-purple-200 bg-gradient-to-r from-purple-50/50 to-pink-50/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold">
                  AI Asset Factory
                </CardTitle>
                <CardDescription>
                  Automated content creation for your campaigns
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {currentAssets && (
                <Button variant="outline" size="sm" onClick={downloadAssets}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              )}
              <Button
                onClick={generateAssets}
                disabled={isGenerating}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {isGenerating ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generate Assets
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        {generationPrompt && (
          <CardContent>
            <div className="p-3 bg-white/70 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                Generation prompt:
              </p>
              <p className="text-sm font-medium">{generationPrompt}</p>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Language Selector */}
      <LanguageSelector
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
        compact={true}
      />

      {/* Custom Prompt Input */}
      {!currentAssets && (
        <Card className="shadow-sm border-purple-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Custom Generation Prompt
            </CardTitle>
            <CardDescription>
              Describe what you want to create (optional - leave empty for
              auto-generation)
              {speechSupported && " • Use voice input or type"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Textarea
                placeholder="e.g., Summer sale announcement with beach vibes, fresh fruit promotion, grand opening celebration..."
                value={generationPrompt}
                onChange={(e) => setGenerationPrompt(e.target.value)}
                className={`min-h-20 resize-none ${currentLang.rtl ? "text-right" : "text-left"}`}
                dir={currentLang.rtl ? "rtl" : "ltr"}
              />
              <VoiceInputButton
                isListening={isListening}
                onToggle={toggleVoiceInput}
                enabled={speechSupported}
                className="absolute bottom-2 right-2 h-8 px-3"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Brand Kit Configuration */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center">
            <Palette className="w-5 h-5 mr-2" />
            Brand Kit
          </CardTitle>
          <CardDescription>
            Your brand elements are applied to all generated assets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Primary Color</label>
              <div className="flex items-center space-x-2">
                <div
                  className="w-8 h-8 rounded border"
                  style={{ backgroundColor: brandKit.primaryColor }}
                ></div>
                <span className="text-sm font-mono">
                  {brandKit.primaryColor}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Secondary Color</label>
              <div className="flex items-center space-x-2">
                <div
                  className="w-8 h-8 rounded border"
                  style={{ backgroundColor: brandKit.secondaryColor }}
                ></div>
                <span className="text-sm font-mono">
                  {brandKit.secondaryColor}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Font</label>
              <p className="text-sm" style={{ fontFamily: brandKit.font }}>
                {brandKit.font}
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tone</label>
              <Badge variant="outline">{brandKit.tone}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generated Assets */}
      {currentAssets && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Caption */}
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Caption
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(currentAssets.caption)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={regenerateCaption}
                    disabled={isGenerating}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={currentAssets.caption}
                onChange={(e) =>
                  setCurrentAssets((prev) =>
                    prev ? { ...prev, caption: e.target.value } : null,
                  )
                }
                className="min-h-32 resize-none"
                placeholder="Generated caption will appear here..."
              />
              <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                <span>{currentAssets.caption.length}/280 characters</span>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  Optimized
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Image */}
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold flex items-center">
                  <ImageIcon className="w-5 h-5 mr-2" />
                  Visual (1:1)
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <input
                    type="file"
                    id="custom-image"
                    accept="image/*"
                    onChange={handleCustomImage}
                    className="hidden"
                  />
                  <Button variant="ghost" size="sm" asChild>
                    <label htmlFor="custom-image" className="cursor-pointer">
                      <Upload className="w-4 h-4" />
                    </label>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={swapImage}
                    disabled={isGenerating}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="aspect-square rounded-lg overflow-hidden border bg-muted">
                <ImageWithFallback
                  src={currentAssets.image}
                  alt={currentAssets.altText}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    1080×1080px • JPG
                  </span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    Brand colors applied
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Alt text: {currentAssets.altText}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Reel Script */}
          <Card className="shadow-sm lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Video className="w-5 h-5 mr-2" />
                  Reel Script (≤15 seconds)
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(currentAssets.reelScript)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={regenerateScript}
                    disabled={isGenerating}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={currentAssets.reelScript}
                onChange={(e) =>
                  setCurrentAssets((prev) =>
                    prev ? { ...prev, reelScript: e.target.value } : null,
                  )
                }
                className="min-h-24 resize-none"
                placeholder="Generated reel script will appear here..."
              />
              <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                <span>
                  ~{Math.ceil(currentAssets.reelScript.split(" ").length / 3)}{" "}
                  seconds estimated
                </span>
                <Badge
                  variant="outline"
                  className="bg-purple-50 text-purple-700"
                >
                  Conversational tone
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Asset Quality Guidelines */}
      {currentAssets && (
        <Card className="shadow-sm border-green-200 bg-green-50/30">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center text-green-800">
              <CheckCircle className="w-5 h-5 mr-2" />
              Quality Standards Met
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-green-700">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Brand colors applied</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Platform policy compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Optimized for engagement</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Image: 1080×1080px square</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Script: ≤15 second duration</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Accessibility compliant</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
