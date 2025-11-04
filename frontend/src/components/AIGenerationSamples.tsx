import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import {
  Sparkles,
  Target,
  DollarSign,
  Wand2,
  RefreshCw,
  ThumbsUp,
  Camera,
  Upload,
  Image as ImageIcon,
  Zap,
  ArrowLeft,
  Edit3,
  Mic,
  MicOff,
  Globe,
  ChevronsUpDown,
  Check,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CampaignUseModal } from "./CampaignUseModal";
import { LaunchSuccessModal } from "./LaunchSuccessModal";
import { useCurrency } from "./CurrencyContext";

interface AIGenerationSamplesProps {
  onGoToDashboard?: () => void;
  onBack?: () => void;
  onUseContent?: (contentData: any) => void;
}

// Comprehensive language configuration - All major world languages
const LANGUAGES = [
  // Major Global Languages
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇬🇧",
    speechCode: "en-US",
    region: "Global",
  },
  {
    code: "zh",
    name: "Chinese (Mandarin)",
    nativeName: "中文",
    flag: "🇨🇳",
    speechCode: "zh-CN",
    region: "Asia",
  },
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    speechCode: "es-ES",
    region: "Europe/Americas",
  },
  {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    flag: "🇦🇪",
    speechCode: "ar-AE",
    rtl: true,
    region: "Middle East",
  },
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    flag: "🇮🇳",
    speechCode: "hi-IN",
    region: "South Asia",
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    speechCode: "fr-FR",
    region: "Europe/Africa",
  },
  {
    code: "pt",
    name: "Portuguese",
    nativeName: "Português",
    flag: "🇵🇹",
    speechCode: "pt-PT",
    region: "Europe/Americas",
  },
  {
    code: "bn",
    name: "Bengali",
    nativeName: "বাংলা",
    flag: "🇧🇩",
    speechCode: "bn-BD",
    region: "South Asia",
  },
  {
    code: "ru",
    name: "Russian",
    nativeName: "Русский",
    flag: "🇷🇺",
    speechCode: "ru-RU",
    region: "Eastern Europe",
  },
  {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flag: "🇯🇵",
    speechCode: "ja-JP",
    region: "Asia",
  },

  // European Languages
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    speechCode: "de-DE",
    region: "Europe",
  },
  {
    code: "it",
    name: "Italian",
    nativeName: "Italiano",
    flag: "🇮🇹",
    speechCode: "it-IT",
    region: "Europe",
  },
  {
    code: "tr",
    name: "Turkish",
    nativeName: "Türkçe",
    flag: "🇹🇷",
    speechCode: "tr-TR",
    region: "Middle East",
  },
  {
    code: "pl",
    name: "Polish",
    nativeName: "Polski",
    flag: "🇵🇱",
    speechCode: "pl-PL",
    region: "Europe",
  },
  {
    code: "uk",
    name: "Ukrainian",
    nativeName: "Українська",
    flag: "🇺🇦",
    speechCode: "uk-UA",
    region: "Eastern Europe",
  },
  {
    code: "nl",
    name: "Dutch",
    nativeName: "Nederlands",
    flag: "🇳🇱",
    speechCode: "nl-NL",
    region: "Europe",
  },
  {
    code: "ro",
    name: "Romanian",
    nativeName: "Română",
    flag: "🇷🇴",
    speechCode: "ro-RO",
    region: "Europe",
  },
  {
    code: "el",
    name: "Greek",
    nativeName: "Ελληνικά",
    flag: "🇬🇷",
    speechCode: "el-GR",
    region: "Europe",
  },
  {
    code: "cs",
    name: "Czech",
    nativeName: "Čeština",
    flag: "🇨🇿",
    speechCode: "cs-CZ",
    region: "Europe",
  },
  {
    code: "sv",
    name: "Swedish",
    nativeName: "Svenska",
    flag: "🇸🇪",
    speechCode: "sv-SE",
    region: "Europe",
  },
  {
    code: "hu",
    name: "Hungarian",
    nativeName: "Magyar",
    flag: "🇭🇺",
    speechCode: "hu-HU",
    region: "Europe",
  },
  {
    code: "fi",
    name: "Finnish",
    nativeName: "Suomi",
    flag: "🇫🇮",
    speechCode: "fi-FI",
    region: "Europe",
  },
  {
    code: "no",
    name: "Norwegian",
    nativeName: "Norsk",
    flag: "🇳🇴",
    speechCode: "no-NO",
    region: "Europe",
  },
  {
    code: "da",
    name: "Danish",
    nativeName: "Dansk",
    flag: "🇩🇰",
    speechCode: "da-DK",
    region: "Europe",
  },
  {
    code: "bg",
    name: "Bulgarian",
    nativeName: "Български",
    flag: "🇧🇬",
    speechCode: "bg-BG",
    region: "Europe",
  },
  {
    code: "sk",
    name: "Slovak",
    nativeName: "Slovenčina",
    flag: "🇸🇰",
    speechCode: "sk-SK",
    region: "Europe",
  },
  {
    code: "hr",
    name: "Croatian",
    nativeName: "Hrvatski",
    flag: "🇭🇷",
    speechCode: "hr-HR",
    region: "Europe",
  },
  {
    code: "lt",
    name: "Lithuanian",
    nativeName: "Lietuvių",
    flag: "🇱🇹",
    speechCode: "lt-LT",
    region: "Europe",
  },
  {
    code: "sl",
    name: "Slovenian",
    nativeName: "Slovenščina",
    flag: "🇸🇮",
    speechCode: "sl-SI",
    region: "Europe",
  },
  {
    code: "lv",
    name: "Latvian",
    nativeName: "Latviešu",
    flag: "🇱🇻",
    speechCode: "lv-LV",
    region: "Europe",
  },
  {
    code: "et",
    name: "Estonian",
    nativeName: "Eesti",
    flag: "🇪🇪",
    speechCode: "et-EE",
    region: "Europe",
  },
  {
    code: "sr",
    name: "Serbian",
    nativeName: "Српски",
    flag: "🇷🇸",
    speechCode: "sr-RS",
    region: "Europe",
  },

  // Asian Languages
  {
    code: "ko",
    name: "Korean",
    nativeName: "한국어",
    flag: "🇰🇷",
    speechCode: "ko-KR",
    region: "Asia",
  },
  {
    code: "vi",
    name: "Vietnamese",
    nativeName: "Tiếng Việt",
    flag: "🇻🇳",
    speechCode: "vi-VN",
    region: "Asia",
  },
  {
    code: "th",
    name: "Thai",
    nativeName: "ไทย",
    flag: "🇹🇭",
    speechCode: "th-TH",
    region: "Asia",
  },
  {
    code: "id",
    name: "Indonesian",
    nativeName: "Bahasa Indonesia",
    flag: "🇮🇩",
    speechCode: "id-ID",
    region: "Asia",
  },
  {
    code: "ms",
    name: "Malay",
    nativeName: "Bahasa Melayu",
    flag: "🇲🇾",
    speechCode: "ms-MY",
    region: "Asia",
  },
  {
    code: "fil",
    name: "Filipino",
    nativeName: "Filipino",
    flag: "🇵🇭",
    speechCode: "fil-PH",
    region: "Asia",
  },
  {
    code: "ta",
    name: "Tamil",
    nativeName: "தமிழ்",
    flag: "🇮🇳",
    speechCode: "ta-IN",
    region: "South Asia",
  },
  {
    code: "te",
    name: "Telugu",
    nativeName: "తెలుగు",
    flag: "🇮🇳",
    speechCode: "te-IN",
    region: "South Asia",
  },
  {
    code: "mr",
    name: "Marathi",
    nativeName: "मराठी",
    flag: "🇮🇳",
    speechCode: "mr-IN",
    region: "South Asia",
  },
  {
    code: "ur",
    name: "Urdu",
    nativeName: "اردو",
    flag: "🇵🇰",
    speechCode: "ur-PK",
    rtl: true,
    region: "South Asia",
  },
  {
    code: "gu",
    name: "Gujarati",
    nativeName: "ગુજરાતી",
    flag: "🇮🇳",
    speechCode: "gu-IN",
    region: "South Asia",
  },
  {
    code: "kn",
    name: "Kannada",
    nativeName: "ಕನ್ನಡ",
    flag: "🇮🇳",
    speechCode: "kn-IN",
    region: "South Asia",
  },
  {
    code: "ml",
    name: "Malayalam",
    nativeName: "മലയാളം",
    flag: "🇮🇳",
    speechCode: "ml-IN",
    region: "South Asia",
  },
  {
    code: "si",
    name: "Sinhala",
    nativeName: "සිංහල",
    flag: "🇱🇰",
    speechCode: "si-LK",
    region: "South Asia",
  },
  {
    code: "my",
    name: "Burmese",
    nativeName: "မြန်မာ",
    flag: "🇲🇲",
    speechCode: "my-MM",
    region: "Asia",
  },
  {
    code: "km",
    name: "Khmer",
    nativeName: "ខ្មែរ",
    flag: "🇰🇭",
    speechCode: "km-KH",
    region: "Asia",
  },
  {
    code: "lo",
    name: "Lao",
    nativeName: "ລາວ",
    flag: "🇱🇦",
    speechCode: "lo-LA",
    region: "Asia",
  },

  // Middle Eastern Languages
  {
    code: "fa",
    name: "Persian (Farsi)",
    nativeName: "فارسی",
    flag: "🇮🇷",
    speechCode: "fa-IR",
    rtl: true,
    region: "Middle East",
  },
  {
    code: "he",
    name: "Hebrew",
    nativeName: "עברית",
    flag: "🇮🇱",
    speechCode: "he-IL",
    rtl: true,
    region: "Middle East",
  },

  // African Languages
  {
    code: "sw",
    name: "Swahili",
    nativeName: "Kiswahili",
    flag: "🇰🇪",
    speechCode: "sw-KE",
    region: "Africa",
  },
  {
    code: "am",
    name: "Amharic",
    nativeName: "አማርኛ",
    flag: "🇪🇹",
    speechCode: "am-ET",
    region: "Africa",
  },
  {
    code: "zu",
    name: "Zulu",
    nativeName: "isiZulu",
    flag: "🇿🇦",
    speechCode: "zu-ZA",
    region: "Africa",
  },
  {
    code: "af",
    name: "Afrikaans",
    nativeName: "Afrikaans",
    flag: "🇿🇦",
    speechCode: "af-ZA",
    region: "Africa",
  },
  {
    code: "ha",
    name: "Hausa",
    nativeName: "Hausa",
    flag: "🇳🇬",
    speechCode: "ha-NG",
    region: "Africa",
  },
  {
    code: "yo",
    name: "Yoruba",
    nativeName: "Yorùbá",
    flag: "🇳🇬",
    speechCode: "yo-NG",
    region: "Africa",
  },
  {
    code: "ig",
    name: "Igbo",
    nativeName: "Igbo",
    flag: "🇳🇬",
    speechCode: "ig-NG",
    region: "Africa",
  },

  // Americas Languages
  {
    code: "pt-BR",
    name: "Portuguese (Brazil)",
    nativeName: "Português (Brasil)",
    flag: "🇧🇷",
    speechCode: "pt-BR",
    region: "Americas",
  },
  {
    code: "es-MX",
    name: "Spanish (Mexico)",
    nativeName: "Español (México)",
    flag: "🇲🇽",
    speechCode: "es-MX",
    region: "Americas",
  },
  {
    code: "es-AR",
    name: "Spanish (Argentina)",
    nativeName: "Español (Argentina)",
    flag: "🇦🇷",
    speechCode: "es-AR",
    region: "Americas",
  },
  {
    code: "fr-CA",
    name: "French (Canada)",
    nativeName: "Français (Canada)",
    flag: "🇨🇦",
    speechCode: "fr-CA",
    region: "Americas",
  },

  // Additional Regional Languages
  {
    code: "is",
    name: "Icelandic",
    nativeName: "Íslenska",
    flag: "🇮🇸",
    speechCode: "is-IS",
    region: "Europe",
  },
  {
    code: "ga",
    name: "Irish",
    nativeName: "Gaeilge",
    flag: "🇮🇪",
    speechCode: "ga-IE",
    region: "Europe",
  },
  {
    code: "cy",
    name: "Welsh",
    nativeName: "Cymraeg",
    flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
    speechCode: "cy-GB",
    region: "Europe",
  },
  {
    code: "eu",
    name: "Basque",
    nativeName: "Euskara",
    flag: "🇪🇸",
    speechCode: "eu-ES",
    region: "Europe",
  },
  {
    code: "ca",
    name: "Catalan",
    nativeName: "Català",
    flag: "🇪🇸",
    speechCode: "ca-ES",
    region: "Europe",
  },
  {
    code: "gl",
    name: "Galician",
    nativeName: "Galego",
    flag: "🇪🇸",
    speechCode: "gl-ES",
    region: "Europe",
  },
  {
    code: "sq",
    name: "Albanian",
    nativeName: "Shqip",
    flag: "🇦🇱",
    speechCode: "sq-AL",
    region: "Europe",
  },
  {
    code: "mk",
    name: "Macedonian",
    nativeName: "Македонски",
    flag: "🇲🇰",
    speechCode: "mk-MK",
    region: "Europe",
  },
  {
    code: "az",
    name: "Azerbaijani",
    nativeName: "Azərbaycan",
    flag: "🇦🇿",
    speechCode: "az-AZ",
    region: "Central Asia",
  },
  {
    code: "kk",
    name: "Kazakh",
    nativeName: "Қазақ",
    flag: "🇰🇿",
    speechCode: "kk-KZ",
    region: "Central Asia",
  },
  {
    code: "uz",
    name: "Uzbek",
    nativeName: "Oʻzbek",
    flag: "🇺🇿",
    speechCode: "uz-UZ",
    region: "Central Asia",
  },
  {
    code: "hy",
    name: "Armenian",
    nativeName: "Հայերեն",
    flag: "🇦🇲",
    speechCode: "hy-AM",
    region: "Caucasus",
  },
  {
    code: "ka",
    name: "Georgian",
    nativeName: "ქართული",
    flag: "🇬🇪",
    speechCode: "ka-GE",
    region: "Caucasus",
  },
  {
    code: "ne",
    name: "Nepali",
    nativeName: "नेपाली",
    flag: "🇳🇵",
    speechCode: "ne-NP",
    region: "South Asia",
  },
  {
    code: "ps",
    name: "Pashto",
    nativeName: "پښتو",
    flag: "🇦🇫",
    speechCode: "ps-AF",
    rtl: true,
    region: "South Asia",
  },
  {
    code: "mn",
    name: "Mongolian",
    nativeName: "Монгол",
    flag: "🇲🇳",
    speechCode: "mn-MN",
    region: "Asia",
  },
];

export function AIGenerationSamples({
  onGoToDashboard,
  onBack,
  onUseContent,
}: AIGenerationSamplesProps) {
  const { currency, formatCurrency } = useCurrency();
  const [campaignPrompt, setCampaignPrompt] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [openLanguagePicker, setOpenLanguagePicker] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [isRegeneratingCaption, setIsRegeneratingCaption] = useState(false);
  const [isRegeneratingImage, setIsRegeneratingImage] = useState(false);
  const [showUseModal, setShowUseModal] = useState(false);
  const [showLaunchSuccess, setShowLaunchSuccess] = useState(false);
  const [isEditingCaption, setIsEditingCaption] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Get current language config
  const currentLang =
    LANGUAGES.find((l) => l.code === selectedLanguage) || LANGUAGES[0];

  // Check if speech recognition is supported
  useEffect(() => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      setSpeechSupported(true);
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setCampaignPrompt((prev) => prev + " " + transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  // Start/stop voice input
  const toggleVoiceInput = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.lang = currentLang.speechCode;
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // Get placeholder text in selected language
  const getPlaceholder = (langCode: string): string => {
    const placeholders: Record<string, string> = {
      en: "E.g., 'Buy a medium coffee and get a coconut biscuit free' or 'New spring menu launching this weekend'",
      ar: "مثال: 'اشتري قهوة متوسطة واحصل على بسكويت جوز الهند مجاناً' أو 'قائمة الربيع الجديدة تُطلق هذا الأسبوع'",
      es: "Ej., 'Compra un café mediano y obtén una galleta de coco gratis' o 'Nuevo menú de primavera lanzado este fin de semana'",
      fr: "Ex., 'Achetez un café moyen et obtenez un biscuit à la noix de coco gratuit' ou 'Nouveau menu de printemps lancé ce week-end'",
      de: "Z.B., 'Kaufen Sie einen mittleren Kaffee und erhalten Sie einen Kokosnusskeks gratis' oder 'Neues Frühlingsmenü startet dieses Wochenende'",
      hi: "उदा., 'एक मध्यम कॉफी खरीदें और नारियल बिस्किट मुफ्त पाएं' या 'इस सप्ताहांत नया स्प्रिंग मेनू लॉन्च'",
      pt: "Ex., 'Compre um café médio e ganhe um biscoito de coco grátis' ou 'Novo cardápio de primavera lançado neste fim de semana'",
      zh: "例如，'购买中杯咖啡免费获得椰子饼干' 或 '本周末推出新春季菜单'",
      ja: "例：「ミディアムコーヒーを購入してココナッツビスケットを無料で入手」または「今週末の新しい春のメニュー」",
      ru: "Напр., 'Купите средний кофе и получите кокосовое печенье бесплатно' или 'Новое весеннее меню в эти выходные'",
      it: "Es., 'Acquista un caffè medio e ottieni un biscotto al cocco gratis' o 'Nuovo menu primaverile lanciato questo weekend'",
      tr: "Örn., 'Orta boy kahve alın ve hindistan cevizi bisküvisi bedava kazanın' veya 'Bu hafta sonu yeni bahar menüsü'",
    };
    return placeholders[langCode] || placeholders.en;
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGeneratedContent((prev) => ({
          ...prev,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle camera photo
  const handleTakePhoto = () => {
    // In a real implementation, this would trigger the device camera
    // For now, we'll use the file input with camera mode
    const input = document.getElementById("camera-input") as HTMLInputElement;
    if (input) {
      input.click();
    }
  };

  // Extract keywords from prompt for image search
  const extractKeywords = (prompt: string): string => {
    // Remove common words and extract main keywords
    const commonWords = [
      "buy",
      "get",
      "free",
      "off",
      "all",
      "the",
      "and",
      "or",
      "a",
      "an",
      "this",
      "that",
      "when",
      "where",
    ];
    const words = prompt
      .toLowerCase()
      .split(" ")
      .filter((word) => !commonWords.includes(word) && word.length > 2);

    // Return first 2-3 meaningful words
    return words.slice(0, 3).join(" ") || "business marketing";
  };

  // Generate campaign content based on prompt
  const generateCampaign = async () => {
    setIsGenerating(true);

    // Simulate AI processing (shorter delay for better UX)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate caption based on prompt
    const caption = generateCaption(campaignPrompt);

    // Generate image search query
    const imageKeywords = extractKeywords(campaignPrompt);

    setGeneratedContent({
      userPrompt: campaignPrompt,
      title: generateTitle(campaignPrompt),
      caption: caption,
      image: `https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&h=600&fit=crop`,
      imageKeywords: imageKeywords,
      targeting: generateTargeting(campaignPrompt),
      budget: generateBudget(campaignPrompt),
      reasoning: generateReasoning(campaignPrompt),
    });

    setIsGenerating(false);
  };

  // Generate a catchy title
  const generateTitle = (prompt: string): string => {
    const titles = [
      `Special Offer: ${prompt.substring(0, 30)}...`,
      `Limited Time: ${prompt.substring(0, 30)}...`,
      `Don't Miss: ${prompt.substring(0, 30)}...`,
      `Exclusive Deal: ${prompt.substring(0, 30)}...`,
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  };

  // Generate marketing caption
  const generateCaption = (prompt: string): string => {
    const emojis = ["🎉", "✨", "🔥", "⭐", "💫", "🌟"];
    const emoji1 = emojis[Math.floor(Math.random() * emojis.length)];
    const emoji2 = emojis[Math.floor(Math.random() * emojis.length)];

    const callsToAction = [
      "Don't miss out!",
      "Limited time only!",
      "Visit us today!",
      "Grab yours now!",
      "Come try it!",
      "Order now!",
    ];

    const engagementHooks = [
      "Tag a friend who needs this!",
      "What would you order? 💬",
      "Who's joining you? 👇",
      "Double tap if you're hungry!",
      "Save this for later! 🔖",
    ];

    const cta = callsToAction[Math.floor(Math.random() * callsToAction.length)];
    const hook =
      engagementHooks[Math.floor(Math.random() * engagementHooks.length)];

    return `${emoji1} ${prompt} ${emoji2}\n\n${cta} ${hook}\n\n#LocalBusiness #SpecialOffer #TreatYourself #CommunityFirst`;
  };

  // Regenerate just the caption
  const regenerateCaption = async () => {
    setIsRegeneratingCaption(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setGeneratedContent((prev) => ({
      ...prev,
      caption: generateCaption(prev.userPrompt),
    }));

    setIsRegeneratingCaption(false);
  };

  // Regenerate just the image
  const regenerateImage = async () => {
    setIsRegeneratingImage(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Cycle through different relevant stock images
    const imageVariations = [
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=600&fit=crop",
    ];

    const currentIndex = imageVariations.indexOf(generatedContent.image);
    const nextIndex = (currentIndex + 1) % imageVariations.length;

    setGeneratedContent((prev) => ({
      ...prev,
      image: imageVariations[nextIndex],
    }));

    setIsRegeneratingImage(false);
  };

  // Generate targeting based on prompt
  const generateTargeting = (prompt: string) => {
    const isFood =
      /coffee|cake|food|pizza|burger|salad|smoothie|dessert|pastry/i.test(
        prompt,
      );
    const isDiscount = /off|discount|sale|deal/i.test(prompt);

    return {
      location: "5km radius",
      demographics: isFood ? "Food lovers, 18-45" : "Local community, 25-55",
      interests: isFood
        ? "Dining out, cafes, local food"
        : "Local shopping, community events",
      timing: isDiscount ? "Peak hours (11am-2pm, 5pm-8pm)" : "All day",
    };
  };

  // Generate budget based on prompt (in local currency)
  const generateBudget = (prompt: string) => {
    const isHighValue = /birthday|wedding|event|catering/i.test(prompt);
    const isBogo = /buy.*get|2.*1|bogo/i.test(prompt);

    // Base amounts in AED, will be converted if needed
    const baseDaily = isHighValue ? 90 : isBogo ? 55 : 35;
    const baseDuration = "7 days";
    const baseTotal = baseDaily * 7;

    // Convert to current currency
    const dailyBudget =
      currency.code === "AED"
        ? baseDaily
        : Math.round(baseDaily * currency.conversionRate);
    const totalBudget =
      currency.code === "AED"
        ? baseTotal
        : Math.round(baseTotal * currency.conversionRate);

    return {
      daily: dailyBudget,
      duration: baseDuration,
      total: totalBudget,
      estimatedReach: isHighValue
        ? "2,000-3,000 people"
        : isBogo
          ? "1,200-2,000 people"
          : "800-1,500 people",
    };
  };

  // Generate AI reasoning
  const generateReasoning = (prompt: string): string => {
    return `Based on your promotion "${prompt}", I've created an attention-grabbing campaign with emojis and clear call-to-action. The targeting focuses on your local area and relevant demographics. Budget is optimized for maximum reach while staying cost-effective.`;
  };

  // Language-specific quick examples
  const getQuickExamples = (langCode: string): string[] => {
    const examples: Record<string, string[]> = {
      en: [
        "Buy a medium coffee and get a coconut biscuit free",
        "New summer salad menu launching this Friday",
        "20% off all birthday cakes when ordered 24hrs in advance",
        "Happy hour: 2-for-1 on all smoothies from 3-5pm",
        "Weekend brunch special: Free mimosa with any main",
      ],
      ar: [
        "اشتري قهوة متوسطة واحصل ��لى بسكويت جوز الهند مجاناً",
        "قائمة السلطات الصيفية الجديدة تُطلق يوم الجمعة",
        "خصم 20٪ على جميع كعكات أعياد الميلاد عند الطلب قبل 24 ساعة",
        "ساعة سعيدة: عرض 2 مقابل 1 على جميع العصائر من 3-5 مساءً",
        "عرض الفطور المتأخر: ميموزا مجانية مع أي طبق رئيسي",
      ],
      es: [
        "Compra un café mediano y obtén una galleta de coco gratis",
        "Nuevo menú de ensaladas de verano lanzado este viernes",
        "20% de descuento en todos los pasteles de cumpleaños al ordenar con 24h de anticipación",
        "Happy hour: 2x1 en todos los batidos de 3-5pm",
        "Especial brunch de fin de semana: Mimosa gratis con cualquier plato principal",
      ],
      fr: [
        "Achetez un café moyen et obtenez un biscuit à la noix de coco gratuit",
        "Nouveau menu de salades d'été lancé ce vendredi",
        "20% de réduction sur tous les gâteaux d'anniversaire commandés 24h à l'avance",
        "Happy hour: 2 pour 1 sur tous les smoothies de 15h à 17h",
        "Spécial brunch du week-end: Mimosa gratuit avec tout plat principal",
      ],
      de: [
        "Kaufen Sie einen mittleren Kaffee und erhalten Sie einen Kokosnusskeks gratis",
        "Neues Sommersalat-Menü startet diesen Freitag",
        "20% Rabatt auf alle Geburtstagskuchen bei Bestellung 24 Stunden im Voraus",
        "Happy Hour: 2 für 1 auf alle Smoothies von 15-17 Uhr",
        "Wochenend-Brunch-Special: Gratis Mimosa zu jedem Hauptgericht",
      ],
      hi: [
        "एक मध्यम कॉफी खरीदें और नारियल बिस्किट मुफ्त पाएं",
        "इस शुक्रवार नया ग्रीष्मकालीन सलाद मेनू लॉन्च",
        "24 घंटे पहले ऑर्डर करने पर सभी जन्मदिन केक पर 20% की छूट",
        "हैप्पी आवर: दोपहर 3-5 बजे सभी स्मूदी पर 2 में से 1",
        "सप्ताहांत ब्रंच विशेष: किसी भी मुख्य पकवान के साथ मुफ्त मिमोसा",
      ],
      pt: [
        "Compre um café médio e ganhe um biscoito de coco grátis",
        "Novo cardápio de saladas de verão lançado nesta sexta-feira",
        "20% de desconto em todos os bolos de aniversário ao encomendar com 24h de antecedência",
        "Happy hour: 2 por 1 em todos os smoothies das 15h às 17h",
        "Especial brunch de fim de semana: Mimosa grátis com qualquer prato principal",
      ],
      zh: [
        "购买中杯咖啡免费获得椰子饼干",
        "本周五推出新夏季沙拉菜单",
        "提前24小时订购的所有生日蛋糕享受20%折扣",
        "欢乐时光：下午3-5点所有冰沙买一送一",
        "周末早午餐特惠：任何主菜免费赠送含羞草",
      ],
      ja: [
        "ミディアムコーヒーを購入してココナッツビスケットを無料で入手",
        "今週金曜日に新しい夏のサラダメニューを発売",
        "24時間前に注文したすべてのバースデーケーキが20％オフ",
        "ハッピーアワー：午後3時から5時まですべてのスムージーが2対1",
        "週末ブランチスペシャル：メインディッシュにミモザ無料",
      ],
      ru: [
        "Купите средний кофе и получите кокосовое печенье бесплатно",
        "Новое летнее меню салатов запускается в эту пятницу",
        "Скидка 20% на все торты на день рождения при заказе за 24 часа",
        "Счастливый час: 2 по цене 1 на все смузи с 15:00 до 17:00",
        "Специальный бранч выходного дня: Бесплатная мимоза с любым основным блюдом",
      ],
      it: [
        "Acquista un caffè medio e ottieni un biscotto al cocco gratis",
        "Nuovo menu di insalate estive lanciato questo venerdì",
        "20% di sconto su tutte le torte di compleanno ordinate con 24 ore di anticipo",
        "Happy hour: 2x1 su tutti i frullati dalle 15 alle 17",
        "Speciale brunch del weekend: Mimosa gratis con qualsiasi piatto principale",
      ],
      tr: [
        "Orta boy kahve alın ve hindistan cevizi bisküvisi bedava kazanın",
        "Bu Cuma yeni yaz salata menüsü başlatılıyor",
        "24 saat önceden sipariş verilen tüm doğum günü pastalarında %20 indirim",
        "Mutlu saat: Saat 15-17 arası tüm smoothielerde 2si 1 arada",
        "Hafta sonu brunch özel: Ana yemek ile birlikte ücretsiz mimosa",
      ],
    };
    return examples[langCode] || examples.en;
  };

  const quickExamples = getQuickExamples(selectedLanguage);

  // Empty state - before generation
  if (!generatedContent) {
    return (
      <div className="space-y-6 pb-6">
        {/* Header */}
        <div className="text-center pt-4">
          <div className="flex items-center justify-between mb-4">
            {onBack && (
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            <div className="flex-1" />
          </div>
          <div className="inline-flex items-center justify-center space-x-2 mb-2">
            <h2 className="text-2xl">AI Campaign Creator</h2>
            <Badge
              variant="outline"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 text-xs font-medium"
            >
              {LANGUAGES.length}+ Languages
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Describe your promotion and get a complete campaign in seconds
          </p>
        </div>

        {/* Language Selector */}
        <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium text-blue-900 mb-2 block">
                  Campaign Language ({LANGUAGES.length} languages available)
                </label>
                <Popover
                  open={openLanguagePicker}
                  onOpenChange={setOpenLanguagePicker}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openLanguagePicker}
                      className="w-full justify-between bg-white border-blue-200 hover:bg-blue-50 h-11"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{currentLang.flag}</span>
                        <span className="font-medium">
                          {currentLang.nativeName}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          ({currentLang.name})
                        </span>
                      </div>
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0" align="start">
                    <Command shouldFilter={true}>
                      <CommandInput
                        placeholder="Search languages... (type to filter)"
                        className="h-10"
                      />
                      <CommandEmpty>No language found.</CommandEmpty>
                      <CommandList className="max-h-[300px] overflow-y-auto">
                        <CommandGroup heading="Popular Languages">
                          {LANGUAGES.slice(0, 10).map((lang) => (
                            <CommandItem
                              key={lang.code}
                              value={`${lang.code} ${lang.name} ${lang.nativeName} ${lang.region}`}
                              onSelect={() => {
                                setSelectedLanguage(lang.code);
                                setOpenLanguagePicker(false);
                              }}
                              className="cursor-pointer"
                            >
                              <Check
                                className={`mr-2 h-4 w-4 ${
                                  selectedLanguage === lang.code
                                    ? "opacity-100"
                                    : "opacity-0"
                                }`}
                              />
                              <span className="text-lg mr-2">{lang.flag}</span>
                              <div className="flex flex-col">
                                <span className="font-medium">
                                  {lang.nativeName}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {lang.name} • {lang.region}
                                </span>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                        <CommandGroup heading="All Languages (A-Z)">
                          {LANGUAGES.slice(10)
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((lang) => (
                              <CommandItem
                                key={lang.code}
                                value={`${lang.code} ${lang.name} ${lang.nativeName} ${lang.region}`}
                                onSelect={() => {
                                  setSelectedLanguage(lang.code);
                                  setOpenLanguagePicker(false);
                                }}
                                className="cursor-pointer"
                              >
                                <Check
                                  className={`mr-2 h-4 w-4 ${
                                    selectedLanguage === lang.code
                                      ? "opacity-100"
                                      : "opacity-0"
                                  }`}
                                />
                                <span className="text-lg mr-2">
                                  {lang.flag}
                                </span>
                                <div className="flex flex-col">
                                  <span className="font-medium">
                                    {lang.nativeName}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {lang.name} • {lang.region}
                                  </span>
                                </div>
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <p className="text-xs text-blue-700 mt-3 ml-13">
              {speechSupported
                ? "💬 Type or use your microphone to describe your campaign"
                : "💬 Type to describe your campaign"}
            </p>
          </CardContent>
        </Card>

        {/* Main Prompt Input */}
        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                <Wand2 className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-foreground">
                What would you like to create?
              </h3>
            </div>

            <div className="relative">
              <Textarea
                value={campaignPrompt}
                onChange={(e) => setCampaignPrompt(e.target.value)}
                placeholder={getPlaceholder(selectedLanguage)}
                className={`min-h-32 p-4 rounded-lg border-2 border-purple-200 focus:border-purple-400 resize-none bg-white text-sm mb-4 ${currentLang.rtl ? "text-right" : "text-left"}`}
                dir={currentLang.rtl ? "rtl" : "ltr"}
              />

              {/* Voice Input Button */}
              {speechSupported && (
                <Button
                  type="button"
                  size="sm"
                  variant={isListening ? "default" : "outline"}
                  className={`absolute bottom-6 right-2 h-8 px-3 ${
                    isListening
                      ? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
                      : "bg-white hover:bg-purple-50 border-purple-200"
                  }`}
                  onClick={toggleVoiceInput}
                >
                  {isListening ? (
                    <>
                      <MicOff className="w-4 h-4 mr-1" />
                      <span className="text-xs">Stop</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-4 h-4 mr-1 text-purple-600" />
                      <span className="text-xs text-purple-600">Speak</span>
                    </>
                  )}
                </Button>
              )}
            </div>

            {isListening && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <span className="w-1 h-3 bg-red-500 rounded-full animate-pulse"></span>
                    <span
                      className="w-1 h-3 bg-red-500 rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></span>
                    <span
                      className="w-1 h-3 bg-red-500 rounded-full animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    ></span>
                  </div>
                  <span className="text-sm text-red-700 font-medium">
                    Listening in {currentLang.nativeName}... Speak now!
                  </span>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                💡 Be specific about your offer, product, or event
              </span>
              <Button
                onClick={generateCampaign}
                disabled={!campaignPrompt.trim() || isGenerating}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 h-11"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Creating Magic...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Campaign
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Examples */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium flex items-center">
                <Zap className="w-4 h-4 mr-2 text-amber-500" />
                Quick Start Examples
              </h4>
              {speechSupported && (
                <Badge
                  variant="outline"
                  className="text-xs bg-purple-50 border-purple-200 text-purple-700"
                >
                  <Mic className="w-3 h-3 mr-1" />
                  Voice ready
                </Badge>
              )}
            </div>
            <div className="space-y-2">
              {quickExamples.map((example, idx) => (
                <button
                  key={idx}
                  onClick={() => setCampaignPrompt(example)}
                  className={`w-full p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-sm ${currentLang.rtl ? "text-right" : "text-left"}`}
                  dir={currentLang.rtl ? "rtl" : "ltr"}
                >
                  "{example}"
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-5">
            <h4 className="text-sm font-medium text-green-900 mb-3">
              What you'll get:
            </h4>
            <div className="space-y-2 text-xs text-green-800">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-3 h-3 text-green-600 flex-shrink-0" />
                <span>
                  AI-optimized marketing caption with emojis & hashtags in{" "}
                  {currentLang.nativeName}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <ImageIcon className="w-3 h-3 text-green-600 flex-shrink-0" />
                <span>Relevant AI-generated image (or upload your own)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-3 h-3 text-green-600 flex-shrink-0" />
                <span>Smart audience targeting for your local area</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="w-3 h-3 text-green-600 flex-shrink-0" />
                <span>Optimized budget recommendation in {currency.code}</span>
              </div>
              {speechSupported && (
                <div className="flex items-center space-x-2">
                  <Mic className="w-3 h-3 text-green-600 flex-shrink-0" />
                  <span>Voice input available - just speak naturally!</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Generated content view
  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="pt-4">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setGeneratedContent(null);
              setCampaignPrompt("");
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Start Over
          </Button>
          <Badge className="bg-green-100 text-green-800 border-green-300">
            <Sparkles className="w-3 h-3 mr-1" />
            Generated
          </Badge>
        </div>
        <h2 className="text-xl mb-2">Your AI Campaign</h2>
        <p className="text-sm text-muted-foreground">
          Review and customize your campaign
        </p>
      </div>

      {/* Language Indicator */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">
                Campaign Language
              </span>
            </div>
            <Badge className="bg-blue-100 text-blue-800 border-blue-300">
              {currentLang.flag} {currentLang.nativeName}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Your Promotion */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">
              Your Promotion
            </span>
          </div>
          <p
            className={`text-sm text-blue-800 font-medium ${currentLang.rtl ? "text-right" : "text-left"}`}
            dir={currentLang.rtl ? "rtl" : "ltr"}
          >
            "{generatedContent.userPrompt}"
          </p>
        </CardContent>
      </Card>

      {/* Generated Image */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold flex items-center">
              <ImageIcon className="w-4 h-4 mr-2 text-purple-600" />
              Campaign Image
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={regenerateImage}
              disabled={isRegeneratingImage}
              className="text-xs h-8"
            >
              {isRegeneratingImage ? (
                <>
                  <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                  Regenerating...
                </>
              ) : (
                <>
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Regenerate
                </>
              )}
            </Button>
          </div>

          {/* Image Preview */}
          <div className="relative mb-4">
            <ImageWithFallback
              src={generatedContent.image}
              alt={generatedContent.title}
              className="w-full h-48 object-cover rounded-lg border border-border"
            />
            {isRegeneratingImage && (
              <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                <RefreshCw className="w-8 h-8 text-white animate-spin" />
              </div>
            )}
          </div>

          {/* Upload Options */}
          <div className="grid grid-cols-2 gap-2">
            <input
              type="file"
              id="camera-input"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleImageUpload}
            />
            <Button
              variant="outline"
              size="sm"
              className="h-10"
              onClick={handleTakePhoto}
            >
              <Camera className="w-4 h-4 mr-2" />
              Take Photo
            </Button>
            <div className="relative">
              <input
                type="file"
                id="upload-image"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <Button
                variant="outline"
                size="sm"
                className="w-full h-10"
                onClick={() => document.getElementById("upload-image")?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Image
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Not happy with the image? Upload your own or take a new photo
          </p>
        </CardContent>
      </Card>

      {/* Generated Caption */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold flex items-center">
              <Wand2 className="w-4 h-4 mr-2 text-purple-600" />
              Campaign Caption
            </h3>
            <div className="flex gap-2">
              {!isEditingCaption && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditingCaption(true)}
                  className="text-xs h-8"
                >
                  <Edit3 className="w-3 h-3 mr-1" />
                  Edit
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={regenerateCaption}
                disabled={isRegeneratingCaption}
                className="text-xs h-8"
              >
                {isRegeneratingCaption ? (
                  <>
                    <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                    Regenerating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-3 h-3 mr-1" />
                    Regenerate
                  </>
                )}
              </Button>
            </div>
          </div>

          {isEditingCaption ? (
            <div className="space-y-3">
              <Textarea
                value={generatedContent.caption}
                onChange={(e) =>
                  setGeneratedContent((prev) => ({
                    ...prev,
                    caption: e.target.value,
                  }))
                }
                className={`min-h-32 resize-none ${currentLang.rtl ? "text-right" : "text-left"}`}
                dir={currentLang.rtl ? "rtl" : "ltr"}
              />
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditingCaption(false)}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={() => setIsEditingCaption(false)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          ) : (
            <div
              className={`bg-gray-50 p-4 rounded-lg border border-border ${currentLang.rtl ? "text-right" : "text-left"}`}
            >
              <p
                className="text-sm whitespace-pre-line"
                dir={currentLang.rtl ? "rtl" : "ltr"}
              >
                {generatedContent.caption}
              </p>
            </div>
          )}

          <div className="mt-2 text-xs text-muted-foreground">
            {generatedContent.caption.length}/280 characters
          </div>
        </CardContent>
      </Card>

      {/* AI Targeting */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="w-4 h-4 text-purple-600" />
            <h3 className="font-semibold">AI Targeting</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Location</p>
              <p className="text-sm font-medium">
                {generatedContent.targeting.location}
              </p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Demographics</p>
              <p className="text-sm font-medium">
                {generatedContent.targeting.demographics}
              </p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Interests</p>
              <p className="text-sm font-medium">
                {generatedContent.targeting.interests}
              </p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Best Time</p>
              <p className="text-sm font-medium">
                {generatedContent.targeting.timing}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Budget */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center space-x-2 mb-4">
            <DollarSign className="w-4 h-4 text-green-600" />
            <h3 className="font-semibold">Recommended Budget</h3>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-xs text-green-700 mb-1">Daily Budget</p>
                <p className="text-xl font-semibold text-green-900">
                  {formatCurrency(generatedContent.budget.daily)}
                </p>
              </div>
              <div>
                <p className="text-xs text-green-700 mb-1">Total (7 days)</p>
                <p className="text-xl font-semibold text-green-900">
                  {formatCurrency(generatedContent.budget.total)}
                </p>
              </div>
            </div>
            <div className="pt-3 border-t border-green-200">
              <p className="text-xs text-green-800">
                <strong>Estimated Reach:</strong>{" "}
                {generatedContent.budget.estimatedReach}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Reasoning */}
      <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-900">
              Why This Works
            </span>
          </div>
          <p className="text-xs text-gray-700">{generatedContent.reasoning}</p>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={() => {
            setGeneratedContent(null);
            setCampaignPrompt("");
          }}
          className="h-12"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Start Over
        </Button>
        <Button
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-12"
          onClick={() => {
            if (onUseContent) {
              // Pass content back to parent (CreateCampaign)
              onUseContent({
                title: generatedContent.title,
                caption: generatedContent.caption,
                image: generatedContent.image,
              });
            } else {
              // Show modal for standalone use
              setShowUseModal(true);
            }
          }}
        >
          <ThumbsUp className="w-4 h-4 mr-2" />
          Use This Campaign
        </Button>
      </div>

      {/* Use Campaign Modal */}
      {showUseModal && (
        <CampaignUseModal
          campaign={{
            trigger: "User-created promotion",
            type: "boosted_post",
            generated: generatedContent,
          }}
          onClose={() => setShowUseModal(false)}
          onConfirm={() => {
            setShowUseModal(false);
            setShowLaunchSuccess(true);
          }}
        />
      )}

      {/* Launch Success Modal */}
      {showLaunchSuccess && (
        <LaunchSuccessModal
          campaign={{
            trigger: "User-created promotion",
            type: "boosted_post",
            generated: generatedContent,
          }}
          onClose={() => setShowLaunchSuccess(false)}
          onGoToDashboard={() => {
            setShowLaunchSuccess(false);
            if (onGoToDashboard) {
              onGoToDashboard();
            }
          }}
        />
      )}
    </div>
  );
}
