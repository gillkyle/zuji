import { Button } from "@/components/ui/button";
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
import { SelectSeparator } from "@radix-ui/react-select";
import { ClipboardCheckIcon, ClipboardCopyIcon, XIcon } from "lucide-react";
import React, { useState } from "react";
import { zuji, type ZujiOptions } from "../../../src/index";
import { ZeroToTwenty } from "../../../src/units";

const STYLE_OPTIONS = [
  { value: "decimal", label: "Decimal" },
  { value: "currency", label: "Currency" },
  { value: "percent", label: "Percent" },
  { value: "unit", label: "Unit" },
];

const CURRENCY_DISPLAY_OPTIONS = [
  { value: "symbol", label: "Symbol ($)" },
  { value: "narrowSymbol", label: "Narrow Symbol" },
  { value: "code", label: "Code (USD)" },
  { value: "name", label: "Name (US Dollar)" },
];

const UNIT_DISPLAY_OPTIONS = [
  { value: "short", label: "Short (16 l)" },
  { value: "narrow", label: "Narrow (16l)" },
  { value: "long", label: "Long (16 liters)" },
];

const NOTATION_OPTIONS = [
  { value: "standard", label: "Standard (1200)" },
  { value: "scientific", label: "Scientific (1.2E3)" },
  { value: "engineering", label: "Engineering (12E2)" },
  { value: "compact", label: "Compact (12K)" },
];

const COMPACT_DISPLAY_OPTIONS = [
  { value: "short", label: "Short (12K)" },
  { value: "long", label: "Long (12 thousand)" },
];

const SIGN_DISPLAY_OPTIONS = [
  { value: "auto", label: "Auto (negative only)" },
  { value: "always", label: "Always" },
  { value: "exceptZero", label: "Except Zero" },
  { value: "negative", label: "Negative Only" },
  { value: "never", label: "Never" },
];

const CURRENCY_SIGN_OPTIONS = [
  { value: "standard", label: "Standard (-$1.00)" },
  { value: "accounting", label: "Accounting (($1.00))" },
];

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
];

const COMMON_CURRENCIES = [
  { value: "USD", label: "US Dollar" },
  { value: "EUR", label: "Euro" },
  { value: "GBP", label: "British Pound" },
  { value: "JPY", label: "Japanese Yen" },
  { value: "CNY", label: "Chinese Yuan" },
];

const COMMON_LOCALES = [
  { value: "en-US", label: "English (US)" },
  { value: "en-GB", label: "English (UK)" },
  { value: "fr-FR", label: "French" },
  { value: "de-DE", label: "German" },
  { value: "ja-JP", label: "Japanese" },
  { value: "zh-CN", label: "Chinese" },
];

interface NumberEntry {
  id: string;
  value: string;
}

const POSSIBLE_NEW_NUMBERS = [
  0.15, 10.33, 150, 1000, 53237, 120000, 250000, 1000000, 1234567890,
];

export function Playground() {
  const [playgroundNumbers, setPlaygroundNumbers] = useState<NumberEntry[]>([
    { id: crypto.randomUUID(), value: "1234.56" },
  ]);
  const [zujiOptions, setZujiOptions] = useState<Partial<ZujiOptions>>({
    notation: "compact",
    compactDisplay: "short",
    style: undefined,
    signDisplay: undefined,
    locale: undefined,
    safeMode: true,
    // set a couple options that need to be set when a different style is selected so they don't error on us
    currency: "USD",
    unit: "terabyte",
  });

  const addNumber = () => {
    // if we've already got 10 numbers, don't add any more
    if (playgroundNumbers.length >= 10) return;
    // choose a different number than one already present
    const newNumber =
      POSSIBLE_NEW_NUMBERS[
        playgroundNumbers.length % POSSIBLE_NEW_NUMBERS.length
      ];
    setPlaygroundNumbers((prev) => [
      ...prev,
      { id: crypto.randomUUID(), value: newNumber.toString() },
    ]);
  };

  const updateNumber = (id: string, value: string) => {
    setPlaygroundNumbers((prev) =>
      prev.map((num) => (num.id === id ? { ...num, value } : num))
    );
  };

  const removeNumber = (id: string) => {
    setPlaygroundNumbers((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((num) => num.id !== id);
    });
  };

  const unitIsDisabled = zujiOptions.style !== "unit";
  const currencyIsDisabled = zujiOptions.style !== "currency";
  const compactIsDisabled = zujiOptions.notation !== "compact";
  const signDisplayIsDisabled = zujiOptions.signDisplay !== "auto";

  const firstNumber = playgroundNumbers[0].value;
  const relevantOptions = Object.entries(zujiOptions).reduce(
    (acc, [key, value]) => {
      if (
        value !== undefined &&
        // value isn't disabled
        !(unitIsDisabled && key === "unit") &&
        !(currencyIsDisabled && key === "currency") &&
        !(compactIsDisabled && key === "compactDisplay") &&
        !(signDisplayIsDisabled && key === "signDisplay") &&
        key !== "safeMode" &&
        // Don't include style if it's decimal since that's the default
        !(key === "style" && value === "decimal") &&
        // Don't include notation if it's standard since that's the default
        !(key === "notation" && value === "standard") &&
        // Don't include signDisplay if it's auto since that's the default
        !(key === "signDisplay" && value === "auto")
      ) {
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
// => ${zuji(Number(firstNumber), { ...zujiOptions, safeMode: true })}`;

  const { copied, handleCopy } = useCopy(generatedCode);
  return (
    <div className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Playground</h3>
        <button
          onClick={addNumber}
          className="px-2 bg-neutral-100 hover:bg-neutral-200 rounded-md flex items-center gap-1"
        >
          <span>Add Test Case</span>
          <span className="text-lg">+</span>
        </button>
      </div>

      {/* Number inputs and outputs */}
      <div className="space-y-2 mb-4">
        {playgroundNumbers.map((num, index) => (
          <div key={num.id} className="flex gap-4 items-center">
            <div className="flex-1 flex gap-2">
              <Input
                value={num.value}
                onChange={(e) => updateNumber(num.id, e.target.value)}
                placeholder="Enter a number..."
                className="flex-1 h-9"
              />
              <div className="h-9 flex-1 bg-white p-2 border rounded-md flex items-center justify-end relative">
                <span className="text-neutral-300 absolute left-2 top-1/2 -translate-y-1/2">
                  →
                </span>
                {zuji(Number(num.value), { ...zujiOptions, safeMode: true })}
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Style Options */}
        <ClearableSelect
          value={zujiOptions.style}
          onValueChange={(value) =>
            setZujiOptions((prev) => ({
              ...prev,
              style: value as ZujiOptions["style"],
            }))
          }
          apiOptionName="style"
          placeholder="Select style"
          options={STYLE_OPTIONS}
        />

        {/* Unit options */}
        <ClearableSelect
          value={zujiOptions.unit}
          onValueChange={(value) =>
            setZujiOptions((prev) => ({
              ...prev,
              unit: value as ZujiOptions["unit"],
            }))
          }
          apiOptionName="unit"
          placeholder="Select unit"
          options={COMMON_UNITS}
          disabled={unitIsDisabled}
        />

        <ClearableSelect
          value={zujiOptions.unitDisplay}
          onValueChange={(value) =>
            setZujiOptions((prev) => ({
              ...prev,
              unitDisplay: value as ZujiOptions["unitDisplay"],
            }))
          }
          apiOptionName="unitDisplay"
          placeholder="Select display"
          options={UNIT_DISPLAY_OPTIONS}
          disabled={unitIsDisabled}
        />

        {/* Currency options */}
        <ClearableSelect
          value={zujiOptions.currency}
          onValueChange={(value) =>
            setZujiOptions((prev) => ({
              ...prev,
              currency: value as ZujiOptions["currency"],
            }))
          }
          apiOptionName="currency"
          placeholder="Select currency"
          options={COMMON_CURRENCIES}
          disabled={currencyIsDisabled}
        />

        <ClearableSelect
          value={zujiOptions.currencyDisplay}
          onValueChange={(value) =>
            setZujiOptions((prev) => ({
              ...prev,
              currencyDisplay: value as ZujiOptions["currencyDisplay"],
            }))
          }
          apiOptionName="currencyDisplay"
          placeholder="Select display"
          options={CURRENCY_DISPLAY_OPTIONS}
          disabled={currencyIsDisabled}
        />

        {/* Currency Sign */}
        <ClearableSelect
          value={zujiOptions.currencySign}
          onValueChange={(value) =>
            setZujiOptions((prev) => ({
              ...prev,
              currencySign: value as ZujiOptions["currencySign"],
            }))
          }
          apiOptionName="currencySign"
          placeholder="Select sign style"
          options={CURRENCY_SIGN_OPTIONS}
          disabled={currencyIsDisabled}
        />

        {/* Common options */}
        <ClearableSelect
          value={zujiOptions.notation}
          onValueChange={(value) =>
            setZujiOptions((prev) => ({
              ...prev,
              notation: value as ZujiOptions["notation"],
            }))
          }
          apiOptionName="notation"
          placeholder="Select notation"
          options={NOTATION_OPTIONS}
        />

        {/* Compact Display */}
        <ClearableSelect
          value={zujiOptions.compactDisplay}
          onValueChange={(value) =>
            setZujiOptions((prev) => ({
              ...prev,
              compactDisplay: value as ZujiOptions["compactDisplay"],
            }))
          }
          apiOptionName="compactDisplay"
          placeholder="Select compact display"
          options={COMPACT_DISPLAY_OPTIONS}
          disabled={compactIsDisabled}
        />

        <ClearableSelect
          value={zujiOptions.signDisplay}
          onValueChange={(value) =>
            setZujiOptions((prev) => ({
              ...prev,
              signDisplay: value as ZujiOptions["signDisplay"],
            }))
          }
          apiOptionName="signDisplay"
          placeholder="Select sign display"
          options={SIGN_DISPLAY_OPTIONS}
        />

        <ClearableSelect
          value={zujiOptions.locale}
          onValueChange={(value) =>
            setZujiOptions((prev) => ({
              ...prev,
              locale: value as ZujiOptions["locale"],
            }))
          }
          apiOptionName="locale"
          placeholder="Select locale"
          options={COMMON_LOCALES}
        />

        {/* Fraction digits */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="minimumFractionDigits">minimumFractionDigits</Label>
          </div>
          <Input
            id="minimumFractionDigits"
            type="number"
            min={0}
            max={20}
            className="h-9 my-0"
            value={zujiOptions.minimumFractionDigits || ""}
            onChange={(e) =>
              setZujiOptions((prev) => ({
                ...prev,
                minimumFractionDigits: e.target.value
                  ? (Number(e.target.value) as ZeroToTwenty)
                  : undefined,
              }))
            }
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="maximumFractionDigits">maximumFractionDigits</Label>
          </div>
          <Input
            id="maximumFractionDigits"
            type="number"
            min={0}
            max={20}
            className="h-9 my-0"
            value={zujiOptions.maximumFractionDigits || ""}
            onChange={(e) =>
              setZujiOptions((prev) => ({
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
        <pre className="bg-neutral-800 text-white p-4 rounded-lg border overflow-x-auto">
          <code className="text-sm">{generatedCode}</code>
        </pre>
      </div>
    </div>
  );
}

export function ClearableSelect({
  apiOptionName,
  value,
  options,
  onValueChange,
  placeholder,
  disabled = false,
}: {
  apiOptionName: string;
  value: string | undefined;
  options: Array<{ value: string; label: string }>;
  onValueChange: (value: string | undefined) => void;
  placeholder: string;
  disabled?: boolean;
}) {
  const [key, setKey] = React.useState(0);

  return (
    <div className="space-y-2" key={key}>
      <div className="flex items-center gap-2">
        <Label
          htmlFor={apiOptionName}
          className={disabled ? "text-neutral-600" : ""}
        >
          {apiOptionName}
        </Label>
        <a
          href={`#${apiOptionName}-options`}
          className="text-xs text-neutral-400 hover:text-neutral-600"
        >
          docs
        </a>
      </div>
      <div className="flex items-center gap-1">
        <Select value={value} onValueChange={onValueChange} disabled={disabled}>
          <SelectTrigger
            id={apiOptionName}
            // className={disabled ? "opacity-50" : ""}
            className={`
              ${disabled ? "bg-[url('data:image/svg+xml,%3Csvg%20width%3D%276%27%20height%3D%276%27%20viewBox%3D%270%200%206%206%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cg%20fill%3D%27%239C92AC%27%20fill-opacity%3D%270.4%27%20fill-rule%3D%27evenodd%27%3E%3Cpath%20d%3D%27M5%200h1L0%206V5zM6%205v1H5z%27%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')]" : ""}`}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {value && (
          <>
            <SelectSeparator />
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                onValueChange(undefined);
                setKey(key + 1);
              }}
              disabled={disabled}
              className={`
                ${disabled ? "opacity-50" : ""}
                h-9
              `}
            >
              <XIcon size={16} />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
