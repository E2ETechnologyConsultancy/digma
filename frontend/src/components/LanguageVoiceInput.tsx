import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Globe, ChevronsUpDown, Check, Mic, MicOff } from "lucide-react";

// Comprehensive language configuration - All major world languages
export const LANGUAGES = [
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

interface LanguageVoiceInputProps {
  selectedLanguage: string;
  onLanguageChange: (languageCode: string) => void;
  isListening: boolean;
  onToggleVoice: () => void;
  speechSupported: boolean;
  showVoiceButton?: boolean;
  compact?: boolean;
}

export function LanguageSelector({
  selectedLanguage,
  onLanguageChange,
  compact = false,
}: {
  selectedLanguage: string;
  onLanguageChange: (code: string) => void;
  compact?: boolean;
}) {
  const [openLanguagePicker, setOpenLanguagePicker] = useState(false);
  const currentLang =
    LANGUAGES.find((l) => l.code === selectedLanguage) || LANGUAGES[0];

  return (
    <Card
      className={
        compact
          ? ""
          : "border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50"
      }
    >
      <CardContent className={compact ? "p-3" : "p-4"}>
        <div className="flex items-center space-x-3">
          {!compact && (
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Globe className="w-5 h-5 text-blue-600" />
            </div>
          )}
          <div className="flex-1">
            <label
              className={`text-sm font-medium text-blue-900 mb-2 block ${compact ? "text-xs" : ""}`}
            >
              {compact
                ? "Language"
                : `Content Language (${LANGUAGES.length} languages available)`}
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
                  className={`w-full justify-between bg-white border-blue-200 hover:bg-blue-50 ${compact ? "h-9" : "h-11"}`}
                >
                  <div className="flex items-center space-x-2">
                    <span className={compact ? "text-base" : "text-lg"}>
                      {currentLang.flag}
                    </span>
                    <span className="font-medium">
                      {currentLang.nativeName}
                    </span>
                    {!compact && (
                      <span className="text-muted-foreground text-xs">
                        ({currentLang.name})
                      </span>
                    )}
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
                            onLanguageChange(lang.code);
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
                              onLanguageChange(lang.code);
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
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function VoiceInputButton({
  isListening,
  onToggle,
  enabled = true,
  className = "",
}: {
  isListening: boolean;
  onToggle: () => void;
  enabled?: boolean;
  className?: string;
}) {
  if (!enabled) return null;

  return (
    <Button
      type="button"
      size="sm"
      variant={isListening ? "default" : "outline"}
      className={`${className} ${
        isListening
          ? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
          : "bg-white hover:bg-purple-50 border-purple-200"
      }`}
      onClick={onToggle}
    >
      {isListening ? (
        <>
          <MicOff className="w-4 h-4 mr-1" />
          <span className="text-xs">Stop</span>
        </>
      ) : (
        <>
          <Mic className="w-4 h-4 mr-1" />
          <span className="text-xs">Voice</span>
        </>
      )}
    </Button>
  );
}

// Hook for voice recognition
export function useVoiceRecognition(
  languageCode: string,
  onTranscript: (text: string) => void,
) {
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef<any>(null);

  const currentLang =
    LANGUAGES.find((l) => l.code === languageCode) || LANGUAGES[0];

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
        onTranscript(transcript);
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

  return {
    isListening,
    speechSupported,
    toggleVoiceInput,
    currentLang,
  };
}
