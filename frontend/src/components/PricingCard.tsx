import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Check, Crown, Sparkles, Zap, Building2 } from "lucide-react";
import {
  PricingTier,
  formatPrice,
  formatWeeklyBudget,
  getCurrentCurrency,
  CurrencyConfig,
} from "./pricing-config";

interface PricingCardProps {
  tier: PricingTier;
  isAnnual?: boolean;
  selected?: boolean;
  onSelect?: (tierId: string) => void;
  showBudgetCap?: boolean;
  compact?: boolean;
  className?: string;
  currency?: CurrencyConfig;
}

export function PricingCard({
  tier,
  isAnnual = false,
  selected = false,
  onSelect,
  showBudgetCap = true,
  compact = false,
  className = "",
  currency,
}: PricingCardProps) {
  const currentCurrency = currency || getCurrentCurrency();

  const getIcon = (tierId: string) => {
    switch (tierId) {
      case "lite":
        return <Sparkles className="w-6 h-6" />;
      case "starter":
        return <Zap className="w-6 h-6" />;
      case "growth":
        return <Crown className="w-6 h-6" />;
      case "enterprise":
        return <Building2 className="w-6 h-6" />;
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  const price = isAnnual ? tier.annualPrice : tier.monthlyPrice;
  const savings = isAnnual ? tier.monthlyPrice * 12 - tier.annualPrice : 0;

  return (
    <Card
      className={`relative transition-all duration-300 hover:shadow-xl ${
        selected ? "ring-2 ring-primary shadow-xl scale-105" : "hover:scale-102"
      } ${tier.popular ? "ring-2 ring-primary shadow-lg" : ""} ${className}`}
      onClick={() => onSelect?.(tier.id)}
      style={{ cursor: onSelect ? "pointer" : "default" }}
    >
      {/* Popular Badge */}
      {tier.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
          <Badge className="bg-primary text-white px-4 py-1 shadow-md">
            <Crown className="w-3 h-3 mr-1" />
            Most Popular
          </Badge>
        </div>
      )}

      <CardHeader
        className={`text-center bg-gradient-to-br ${tier.color} rounded-t-lg border-b ${tier.borderColor} ${compact ? "p-4" : "p-6"}`}
      >
        <div className="flex items-center justify-center space-x-2 mb-2">
          {getIcon(tier.id)}
          <h3 className={compact ? "text-lg" : "text-xl"}>{tier.name}</h3>
        </div>
        <p
          className={`text-muted-foreground ${compact ? "text-xs mb-2" : "text-sm mb-3"}`}
        >
          {tier.subtitle}
        </p>

        {/* Pricing */}
        <div className="space-y-1">
          {tier.contactSales ? (
            <>
              <div className={compact ? "text-xl" : "text-2xl font-medium"}>
                Contact Sales
              </div>
              <div
                className={`text-muted-foreground ${compact ? "text-xs" : "text-sm"}`}
              >
                Custom pricing based on your needs
              </div>
            </>
          ) : (
            <>
              <div className={compact ? "text-2xl" : "text-3xl"}>
                {formatPrice(price, currentCurrency)}
              </div>
              <div
                className={`text-muted-foreground ${compact ? "text-xs" : "text-sm"}`}
              >
                /{isAnnual ? "year" : "month"}
              </div>
              {isAnnual && savings > 0 && (
                <div
                  className={`text-green-600 ${compact ? "text-xs" : "text-xs"}`}
                >
                  Save {formatPrice(savings, currentCurrency)}
                </div>
              )}
            </>
          )}
        </div>
      </CardHeader>

      <CardContent className={`space-y-4 ${compact ? "p-4" : "p-6"}`}>
        {/* Description */}
        {!compact && (
          <p className="text-sm text-center text-muted-foreground">
            {tier.description}
          </p>
        )}

        {/* Budget Cap */}
        {showBudgetCap && (
          <div className="text-center bg-slate-50 rounded-lg p-3">
            <p className={compact ? "text-xs" : "text-sm"}>
              <strong>Ad Budget Cap:</strong>{" "}
              {tier.contactSales
                ? "Custom budget allocation"
                : formatWeeklyBudget(tier.weeklyAdBudget, currentCurrency)}
            </p>
            <p
              className={`text-muted-foreground mt-1 ${compact ? "text-xs" : "text-xs"}`}
            >
              {tier.contactSales
                ? "Tailored to your marketing objectives"
                : "You control your ad spend"}
            </p>
          </div>
        )}

        {/* Features */}
        <div className="space-y-2">
          <p className={`font-medium ${compact ? "text-xs" : "text-sm"}`}>
            What's Included:
          </p>
          {tier.features
            .slice(0, compact ? 4 : undefined)
            .map((feature, index) => (
              <div key={index} className="flex items-start space-x-2">
                <Check
                  className={`text-green-600 mt-0.5 flex-shrink-0 ${compact ? "w-3 h-3" : "w-4 h-4"}`}
                />
                <span className={compact ? "text-xs" : "text-sm"}>
                  {feature}
                </span>
              </div>
            ))}
          {compact && tier.features.length > 4 && (
            <p className="text-xs text-muted-foreground">
              + {tier.features.length - 4} more features
            </p>
          )}
        </div>

        {/* Platforms */}
        {!compact && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Platforms:</p>
            <div className="flex flex-wrap gap-1">
              {tier.platforms.map((platform, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {platform}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Support */}
        <div
          className={`text-center text-muted-foreground ${compact ? "text-xs" : "text-xs"}`}
        >
          <strong>Support:</strong> {tier.support}
        </div>

        {/* Action Button */}
        {onSelect && (
          <Button
            className={`w-full mt-6 ${tier.buttonColor} text-white`}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(tier.id);
            }}
          >
            {selected ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Selected
              </>
            ) : tier.contactSales ? (
              "Contact Sales"
            ) : (
              "Choose This Plan"
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
