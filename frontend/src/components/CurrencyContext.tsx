import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  CurrencyConfig,
  detectCurrency,
  formatPrice as formatPriceUtil,
} from "./pricing-config";

interface CurrencyContextType {
  currency: CurrencyConfig;
  formatPrice: (amount: number) => string;
  formatCurrency: (amount: number, showSymbol?: boolean) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined,
);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyConfig>(detectCurrency());

  useEffect(() => {
    // Detect currency on mount
    const detected = detectCurrency();
    setCurrency(detected);
  }, []);

  const formatPrice = (amount: number) => {
    return formatPriceUtil(amount, currency);
  };

  const formatCurrency = (amount: number, showSymbol = true) => {
    if (showSymbol) {
      return `${currency.symbol}${amount.toLocaleString()}`;
    }
    return amount.toLocaleString();
  };

  return (
    <CurrencyContext.Provider value={{ currency, formatPrice, formatCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
