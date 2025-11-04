// Centralized pricing configuration for DigMa - Multi-currency support
// Single source of truth for all pricing displays

export interface PricingTier {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  weeklyAdBudget: number; // Weekly ad budget cap
  popular: boolean;
  features: string[];
  platforms: string[];
  support: string;
  color: string;
  borderColor: string;
  buttonColor: string;
  contactSales?: boolean; // For Enterprise tier - hides pricing, shows "Contact Sales"
}

export interface CurrencyConfig {
  code: string;
  symbol: string;
  conversionRate: number; // Rate from AED base prices
}

// Currency configurations
export const CURRENCIES: Record<string, CurrencyConfig> = {
  AED: { code: "AED", symbol: "AED", conversionRate: 1 },
  USD: { code: "USD", symbol: "$", conversionRate: 0.27 }, // 1 AED = ~0.27 USD
};

// Location detection - UAE shows AED, all others show USD
export function detectCurrency(): CurrencyConfig {
  // Try to detect location from browser
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const locale = navigator.language || "en-US";

    // UAE timezones and locales
    const uaeTimezones = ["Asia/Dubai", "Asia/Muscat"];
    const uaeLocales = ["ar-AE", "en-AE"];

    if (uaeTimezones.includes(timezone) || uaeLocales.includes(locale)) {
      return CURRENCIES.AED;
    }
  } catch (error) {
    console.log("Location detection failed, defaulting to USD");
  }

  // Default to USD for all other markets
  return CURRENCIES.USD;
}

// Base pricing tiers in AED (original UAE pricing)
const BASE_PRICING_TIERS: PricingTier[] = [
  {
    id: "lite",
    name: "Lite",
    subtitle: "Perfect Start",
    description:
      "Perfect for small businesses getting started with AI marketing",
    monthlyPrice: 99,
    annualPrice: 999, // ~15% discount
    weeklyAdBudget: 200, // AED 200/week ad spend cap
    popular: false,
    features: [
      "Up to 10 AI-generated campaigns/month",
      "Facebook & Instagram posting",
      "Basic analytics & reporting",
      "QR code tracking",
      "Email support",
    ],
    platforms: ["Facebook", "Instagram"],
    support: "Email support",
    color: "from-green-50 to-emerald-50",
    borderColor: "border-green-200",
    buttonColor: "bg-green-600 hover:bg-green-700",
  },
  {
    id: "starter",
    name: "Starter",
    subtitle: "Most Popular",
    description: "Most popular choice for local businesses with 1-2 outlets",
    monthlyPrice: 199,
    annualPrice: 1999, // ~15% discount
    weeklyAdBudget: 500, // AED 500/week ad spend cap
    popular: true,
    features: [
      "Unlimited AI-generated campaigns",
      "All social platforms",
      "Google Business Profile posting",
      "WhatsApp click-to-chat campaigns",
      "Advanced analytics & attribution",
      "Smart budget optimisation",
      "Custom QR codes",
      "Priority support",
    ],
    platforms: ["Facebook", "Instagram", "Google Business", "WhatsApp"],
    support: "Priority email + chat support",
    color: "from-blue-50 to-indigo-50",
    borderColor: "border-primary",
    buttonColor: "bg-primary hover:bg-blue-700",
  },
  {
    id: "growth",
    name: "Growth",
    subtitle: "Scale Smart",
    description: "For SMEs with multiple locations ready to scale",
    monthlyPrice: 399,
    annualPrice: 3999, // ~15% discount
    weeklyAdBudget: 1200, // AED 1,200/week ad spend cap
    popular: false,
    features: [
      "Everything in Starter",
      "Multi-location management",
      "Competitor monitoring",
      "Advanced AI optimisations",
      "Custom automations",
      "White-label reporting",
      "API access",
      "Dedicated account manager",
    ],
    platforms: ["All platforms", "Custom integrations"],
    support: "Phone + dedicated account manager",
    color: "from-purple-50 to-violet-50",
    borderColor: "border-purple-200",
    buttonColor: "bg-purple-600 hover:bg-purple-700",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    subtitle: "Full Marketing Autopilot",
    description:
      "Best for enterprise SMB groups, agencies, or high-growth brands that want DigMa as their outsourced marketing department",
    monthlyPrice: 1499, // Kept for internal reference but not displayed
    annualPrice: 14990, // Kept for internal reference but not displayed
    weeklyAdBudget: 5000, // AED 5,000+/week ad spend cap (scales with business needs)
    popular: false,
    contactSales: true, // Hide pricing, show "Contact Sales"
    features: [
      "Everything in Growth, plus:",
      "Unlimited social & ad profiles (multi-location, multi-country)",
      "Dedicated strategy manager",
      "Predictive AI ROI modelling (what-if budget scenarios)",
      "End-to-end SEO suite (competitor benchmarks, backlink strategy)",
      "Custom AI content (landing pages, blogs, product catalogues)",
      "Call tracking + proxy numbers for attribution",
      "API & CRM integrations (HubSpot, Zoho, Shopify, POS systems)",
      "White-label reporting (for agencies using DigMa with clients)",
      "Customisable based on ad spend requirements",
    ],
    platforms: ["All platforms", "Multi-country", "Enterprise integrations"],
    support: "24/7 priority support (WhatsApp, phone, Zoom)",
    color: "from-slate-50 to-gray-50",
    borderColor: "border-slate-300",
    buttonColor: "bg-slate-900 hover:bg-slate-800",
  },
];

// Convert pricing based on currency
function convertPricing(
  tier: PricingTier,
  currency: CurrencyConfig,
): PricingTier {
  if (currency.code === "AED") {
    return tier; // No conversion needed for AED
  }

  // Convert to target currency and round to reasonable values
  return {
    ...tier,
    monthlyPrice: Math.round(tier.monthlyPrice * currency.conversionRate),
    annualPrice: Math.round(tier.annualPrice * currency.conversionRate),
    weeklyAdBudget: Math.round(tier.weeklyAdBudget * currency.conversionRate),
  };
}

// Get pricing tiers for current currency
export function getPricingTiers(currency?: CurrencyConfig): PricingTier[] {
  const currentCurrency = currency || detectCurrency();
  return BASE_PRICING_TIERS.map((tier) =>
    convertPricing(tier, currentCurrency),
  );
}

// Helper functions
export function formatPrice(price: number, currency?: CurrencyConfig): string {
  const currentCurrency = currency || detectCurrency();
  return `${currentCurrency.symbol}${price.toLocaleString()}`;
}

export function formatWeeklyBudget(
  weeklyBudget: number,
  currency?: CurrencyConfig,
): string {
  const currentCurrency = currency || detectCurrency();
  return `${currentCurrency.symbol}${weeklyBudget}/week`;
}

export function getPricingTier(
  tierId: string,
  currency?: CurrencyConfig,
): PricingTier | undefined {
  return getPricingTiers(currency).find((tier) => tier.id === tierId);
}

export function getPopularTier(currency?: CurrencyConfig): PricingTier {
  const tiers = getPricingTiers(currency);
  return tiers.find((tier) => tier.popular) || tiers[1];
}

// Current currency detection (can be used by components)
export function getCurrentCurrency(): CurrencyConfig {
  return detectCurrency();
}

// Legacy exports for backward compatibility (will use detected currency)
export const UAE_PRICING_TIERS = getPricingTiers(CURRENCIES.AED);
export const CURRENCY = getCurrentCurrency().code;
export const CURRENCY_SYMBOL = getCurrentCurrency().symbol;
export const COUNTRY_NAME =
  getCurrentCurrency().code === "AED"
    ? "United Arab Emirates"
    : "International";

// Plan options for onboarding (will be generated dynamically)
export function getBudgetOptions(currency?: CurrencyConfig) {
  const currentCurrency = currency || detectCurrency();
  const tiers = getPricingTiers(currentCurrency);

  return [
    {
      value: "lite",
      label: `${tiers[0].name}: ${formatPrice(tiers[0].monthlyPrice, currentCurrency)}/month + ${formatWeeklyBudget(tiers[0].weeklyAdBudget, currentCurrency)} ad cap`,
      description: "Perfect for new businesses testing the waters",
      tier: tiers[0],
    },
    {
      value: "starter",
      label: `${tiers[1].name}: ${formatPrice(tiers[1].monthlyPrice, currentCurrency)}/month + ${formatWeeklyBudget(tiers[1].weeklyAdBudget, currentCurrency)} ad cap`,
      description: "Great for established local businesses",
      tier: tiers[1],
    },
    {
      value: "growth",
      label: `${tiers[2].name}: ${formatPrice(tiers[2].monthlyPrice, currentCurrency)}/month + ${formatWeeklyBudget(tiers[2].weeklyAdBudget, currentCurrency)} ad cap`,
      description: "Ideal for businesses ready to scale",
      tier: tiers[2],
    },
    {
      value: "enterprise",
      label: `${tiers[3].name}: Contact Sales for Custom Pricing`,
      description: "For enterprise groups & agencies",
      tier: tiers[3],
    },
  ];
}

// Legacy export
export const BUDGET_OPTIONS = getBudgetOptions();

// Landing page preview tiers (simplified)
export function getLandingPreviewTiers(currency?: CurrencyConfig) {
  const tiers = getPricingTiers(currency);
  return [
    {
      id: tiers[0].id,
      name: tiers[0].name,
      price: tiers[0].monthlyPrice,
      description: tiers[0].subtitle,
      features: tiers[0].features.slice(0, 5), // First 5 features
      popular: false,
    },
    {
      id: tiers[1].id,
      name: tiers[1].name,
      price: tiers[1].monthlyPrice,
      description: tiers[1].subtitle,
      features: tiers[1].features.slice(0, 6), // First 6 features
      popular: true,
    },
  ];
}

// Legacy export
export const LANDING_PREVIEW_TIERS = getLandingPreviewTiers();
