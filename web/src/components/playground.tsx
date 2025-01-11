import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCopy } from "@/hooks/use-copy";
import { ClipboardCheckIcon, ClipboardCopyIcon } from "lucide-react";
import { useState } from "react";
import { zuji, type ZujiOptions } from "../../../src/index";
import { ZeroToTwenty } from "../../../src/units";

const STYLE_OPTIONS = [
  { value: "decimal", label: "Decimal" },
  { value: "currency", label: "Currency" },
  { value: "percent", label: "Percent" },
  { value: "unit", label: "Unit" },
] as const;

const CURRENCY_DISPLAY_OPTIONS = [
  { value: "symbol", label: "Symbol ($)" },
  { value: "narrowSymbol", label: "Narrow Symbol" },
  { value: "code", label: "Code (USD)" },
  { value: "name", label: "Name (US Dollar)" },
] as const;

const UNIT_DISPLAY_OPTIONS = [
  { value: "short", label: "Short (16 l)" },
  { value: "narrow", label: "Narrow (16l)" },
  { value: "long", label: "Long (16 liters)" },
] as const;

const NOTATION_OPTIONS = [
  { value: "standard", label: "Standard (1200)" },
  { value: "scientific", label: "Scientific (1.2E3)" },
  { value: "engineering", label: "Engineering (12E2)" },
  { value: "compact", label: "Compact (12K)" },
] as const;

const COMPACT_DISPLAY_OPTIONS = [
  { value: "short", label: "Short (12K)" },
  { value: "long", label: "Long (12 thousand)" },
] as const;

const SIGN_DISPLAY_OPTIONS = [
  { value: "auto", label: "Auto (negative only)" },
  { value: "always", label: "Always" },
  { value: "exceptZero", label: "Except Zero" },
  { value: "negative", label: "Negative Only" },
  { value: "never", label: "Never" },
] as const;

const CURRENCY_SIGN_OPTIONS = [
  { value: "standard", label: "Standard (-$1.00)" },
  { value: "accounting", label: "Accounting (($1.00))" },
] as const;

const COMMON_UNITS = [
  { value: "kilometer", label: "Kilometers" },
  { value: "mile", label: "Miles" },
  { value: "celsius", label: "Celsius" },
  { value: "fahrenheit", label: "Fahrenheit" },
  { value: "liter", label: "Liters" },
  { value: "gallon", label: "Gallons" },
  { value: "kilogram", label: "Kilograms" },
  { value: "pound", label: "Pounds" },
  { value: "byte", label: "Bytes" },
] as const;

const COMMON_CURRENCIES = [
  { value: "USD", label: "US Dollar" },
  { value: "EUR", label: "Euro" },
  { value: "GBP", label: "British Pound" },
  { value: "JPY", label: "Japanese Yen" },
  { value: "CNY", label: "Chinese Yuan" },
] as const;

const COMMON_LOCALES = [
  { value: "en-US", label: "English (US)" },
  { value: "en-GB", label: "English (UK)" },
  { value: "fr-FR", label: "French" },
  { value: "de-DE", label: "German" },
  { value: "ja-JP", label: "Japanese" },
  { value: "zh-CN", label: "Chinese" },
] as const;

interface NumberEntry {
  id: string;
  value: string;
}

const POSSIBLE_NEW_NUMBERS = [
  0.15, 10.33, 150, 1000, 53237, 120000, 250000, 1000000, 1234567890,
];

export function Playground() {
  const [numbers, setNumbers] = useState<NumberEntry[]>([
    { id: crypto.randomUUID(), value: "1234.56" },
  ]);
  const [options, setOptions] = useState<ZujiOptions>({
    style: "decimal",
    notation: "standard",
    signDisplay: "auto",
    locale: "en-US",
    safeMode: true,
  });

  const addNumber = () => {
    // choose a different number than one already present
    const newNumber =
      POSSIBLE_NEW_NUMBERS[numbers.length % POSSIBLE_NEW_NUMBERS.length];
    setNumbers((prev) => [
      ...prev,
      { id: crypto.randomUUID(), value: newNumber.toString() },
    ]);
  };

  const updateNumber = (id: string, value: string) => {
    setNumbers((prev) =>
      prev.map((num) => (num.id === id ? { ...num, value } : num))
    );
  };

  const removeNumber = (id: string) => {
    setNumbers((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((num) => num.id !== id);
    });
  };

  const firstNumber = numbers[0].value;
  const relevantOptions = Object.entries(options).reduce(
    (acc, [key, value]) => {
      if (value !== undefined && value !== "" && key !== "safeMode") {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, any>
  );

  const optionsStr = Object.keys(relevantOptions).length
    ? `, ${JSON.stringify(relevantOptions, null, 2)}`
    : "";

  const generatedCode = `import { zuji } from "zuji";
  
  const formattedNumber = zuji(${firstNumber}${optionsStr});
  // => ${zuji(Number(firstNumber), { ...options, safeMode: true })}`;

  const { copied, handleCopy } = useCopy(generatedCode);
  return (
    <div className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Playground</h3>
        <button
          onClick={addNumber}
          className="px-2 bg-neutral-100 hover:bg-neutral-200 rounded-md flex items-center gap-1"
        >
          <span>Add Number</span>
          <span className="text-lg">+</span>
        </button>
      </div>

      {/* Number inputs and outputs */}
      <div className="space-y-2 mb-4">
        {numbers.map((num, index) => (
          <div key={num.id} className="flex gap-4 items-center">
            <div className="flex-1 flex gap-2">
              <Input
                value={num.value}
                onChange={(e) => updateNumber(num.id, e.target.value)}
                placeholder="Enter a number..."
                className="flex-1 h-9"
              />
              <div className="h-9 flex-1 bg-neutral-100 p-2 border rounded-md font-mono flex items-center justify-end">
                {zuji(Number(num.value), { ...options, safeMode: true })}
              </div>
            </div>
            {index > 0 ? (
              <button
                onClick={() => removeNumber(num.id)}
                className="text-neutral-500 hover:text-red-500 w-4"
              >
                ×
              </button>
            ) : (
              <div className="w-4 h-4" />
            )}
          </div>
        ))}
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Style Options */}
        <div className="space-y-2">
          <Label htmlFor="style">Format Style</Label>
          <Select
            value={options.style}
            onValueChange={(value) =>
              setOptions((prev) => ({
                ...prev,
                style: value as ZujiOptions["style"],
              }))
            }
          >
            <SelectTrigger id="style">
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              {STYLE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Currency/Unit specific options */}
        {options.style === "currency" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={options.currency}
                onValueChange={(value) =>
                  setOptions((prev) => ({
                    ...prev,
                    currency: value as ZujiOptions["currency"],
                  }))
                }
              >
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {COMMON_CURRENCIES.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currencyDisplay">Display</Label>
              <Select
                value={options.currencyDisplay}
                onValueChange={(value) =>
                  setOptions((prev) => ({
                    ...prev,
                    currencyDisplay: value as ZujiOptions["currencyDisplay"],
                  }))
                }
              >
                <SelectTrigger id="currencyDisplay">
                  <SelectValue placeholder="Select display" />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCY_DISPLAY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {options.style === "unit" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Select
                value={options.unit}
                onValueChange={(value) =>
                  setOptions((prev) => ({
                    ...prev,
                    unit: value as ZujiOptions["unit"],
                  }))
                }
              >
                <SelectTrigger id="unit">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {COMMON_UNITS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {/* Common options */}
        <div className="space-y-2">
          <Label htmlFor="notation">Notation</Label>
          <Select
            value={options.notation}
            onValueChange={(value) =>
              setOptions((prev) => ({
                ...prev,
                notation: value as ZujiOptions["notation"],
              }))
            }
          >
            <SelectTrigger id="notation">
              <SelectValue placeholder="Select notation" />
            </SelectTrigger>
            <SelectContent>
              {NOTATION_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="signDisplay">Sign Display</Label>
          <Select
            value={options.signDisplay}
            onValueChange={(value) =>
              setOptions((prev) => ({
                ...prev,
                signDisplay: value as ZujiOptions["signDisplay"],
              }))
            }
          >
            <SelectTrigger id="signDisplay">
              <SelectValue placeholder="Select sign display" />
            </SelectTrigger>
            <SelectContent>
              {SIGN_DISPLAY_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="locale">Locale</Label>
          <Select
            value={options.locale}
            onValueChange={(value) =>
              setOptions((prev) => ({ ...prev, locale: value }))
            }
          >
            <SelectTrigger id="locale">
              <SelectValue placeholder="Select locale" />
            </SelectTrigger>
            <SelectContent>
              {COMMON_LOCALES.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Fraction digits */}
        <div className="space-y-2">
          <Label htmlFor="minimumFractionDigits">Min Fraction Digits</Label>
          <Input
            id="minimumFractionDigits"
            type="number"
            min={0}
            max={20}
            value={options.minimumFractionDigits || ""}
            onChange={(e) =>
              setOptions((prev) => ({
                ...prev,
                minimumFractionDigits: e.target.value
                  ? (Number(e.target.value) as ZeroToTwenty)
                  : undefined,
              }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maximumFractionDigits">Max Fraction Digits</Label>
          <Input
            id="maximumFractionDigits"
            type="number"
            min={0}
            max={20}
            value={options.maximumFractionDigits || ""}
            onChange={(e) =>
              setOptions((prev) => ({
                ...prev,
                maximumFractionDigits: e.target.value
                  ? (Number(e.target.value) as ZeroToTwenty)
                  : undefined,
              }))
            }
          />
        </div>
      </div>

      {/* Code Snippet */}
      <div className="mt-8 space-y-2">
        <div className="flex justify-between items-center">
          <Label>Code Snippet</Label>
          <button
            onClick={handleCopy}
            className={
              "gap-1 flex items-center text-sm text-neutral-500 hover:text-neutral-800" +
              (copied ? "text-green-500 hover:text-green-600" : "")
            }
          >
            {copied ? (
              <ClipboardCheckIcon size={16} />
            ) : (
              <ClipboardCopyIcon size={16} />
            )}
            Copy to Clipboard
          </button>
        </div>
        <pre className="bg-white p-4 rounded-lg border overflow-x-auto">
          <code className="text-sm">{generatedCode}</code>
        </pre>
      </div>
    </div>
  );
}
