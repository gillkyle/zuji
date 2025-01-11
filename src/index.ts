import { ISO417CurrencyCode } from "./currency";
import { OneToTwentyOne, SanctionedCLDRUnit, ZeroToTwenty } from "./units";

/**
 * Options for number formatting using Intl.NumberFormat
 */
export interface ZujiOptions {
  // ------------ General options ------------
  /** The locale to use for formatting (e.g., "en-US", "fr-FR") */
  locale?: string;

  // ------------ Style options ------------
  /** The formatting style to use. Possible values are:
   *
   * - "decimal" (default) - Plain number formatting
   * - "currency" - Currency formatting (requires currency property)
   * - "percent" - Percentage formatting
   * - "unit" - Unit formatting (requires unit property)
   */
  style?: Intl.NumberFormatOptions["style"];

  /** The currency to use in currency formatting. Required when style is "currency".
   * Uses ISO 4217 currency codes (e.g., "USD", "EUR", "JPY")
   */
  currency?: ISO417CurrencyCode;

  /** How to display the currency. Possible values are:
   *
   * - "symbol" (default) - Use currency symbol (e.g., "$")
   * - "narrowSymbol" - Use narrow symbol (e.g., "$" instead of "US$")
   * - "code" - Use currency code (e.g., "USD")
   * - "name" - Use currency name (e.g., "US Dollar")
   */
  currencyDisplay?: Intl.NumberFormatOptions["currencyDisplay"];

  /** How to handle negative currency values. Possible values are:
   *
   * - "standard" (default) - Use minus sign (e.g., -$1.00)
   * - "accounting" - Use accounting notation (e.g., ($1.00))
   */
  currencySign?: "standard" | "accounting";

  /** The unit to use in unit formatting. Required when style is "unit".
   * Uses sanctioned unit identifiers (e.g., "kilometer-per-hour", "percent", "liter")
   */
  unit?: SanctionedCLDRUnit;

  /** How to display the unit. Possible values are:
   *
   * - "short" (default) - Short unit formatting (e.g., "16 l")
   * - "narrow" - Narrow unit formatting (e.g., "16l")
   * - "long" - Long unit formatting (e.g., "16 liters")
   */
  unitDisplay?: Intl.NumberFormatOptions["unitDisplay"];

  // ------------ Digit options ------------
  /** The minimum number of integer digits to use.
   * Value range: 1 - 21
   * Default: 1
   */
  minimumIntegerDigits?: OneToTwentyOne;

  /** The minimum number of fraction digits to display.
   * Value range: 0 - 20
   * Default: 0 for plain number and percent formatting
   * Default for currency: The number of minor unit digits provided by the ISO 4217 currency code list
   */
  minimumFractionDigits?: ZeroToTwenty;

  /** The maximum number of fraction digits to display.
   * Value range: 0 - 20
   * Default for plain number: max(minimumFractionDigits, 3)
   * Default for currency: max(minimumFractionDigits, number of minor unit digits provided by the ISO 4217 currency code list)
   * Default for percent: max(minimumFractionDigits, 0)
   */
  maximumFractionDigits?: ZeroToTwenty;

  /** The minimum number of significant digits to display.
   * Value range: 1 - 21
   * Default: 1
   */
  minimumSignificantDigits?: OneToTwentyOne;

  /** The maximum number of significant digits to display.
   * Value range: 1 - 21
   * Default: 21
   */
  maximumSignificantDigits?: OneToTwentyOne;

  // ------------ Notation options ------------
  /** The formatting that should be displayed for the number. Possible values are:
   *
   * - "standard" (default) - Plain number formatting
   * - "scientific" - Scientific notation (e.g., 1.23E4)
   * - "engineering" - Engineering notation (e.g., 12.3E3)
   * - "compact" - Compact notation (e.g., "12K")
   */
  notation?: Intl.NumberFormatOptions["notation"];

  /** Only used when notation is "compact". Possible values are:
   *
   * - "short" (default) - Short compact notation (e.g., "12K")
   * - "long" - Long compact notation (e.g., "12 thousand")
   */
  compactDisplay?: Intl.NumberFormatOptions["compactDisplay"];

  /** Whether to use grouping separators, such as thousands separators or thousand/lakh/crore separators.

. Possible values are:
   *
   * - "auto" (default if notation is not "compact") - Use locale preferences
   * - "min2" (default if notation is "compact") - ensures grouping separators are used only when there are **at least two digits** in a group. Ex: 3200 -> 3200 but 32000 -> 32,000
   * - "always" - Always use grouping separators
   * - true - Same as "always"
   * - false - Never use grouping separators
   */
  useGrouping?: Intl.NumberFormatOptions["useGrouping"];

  /** When to display the sign. Possible values are:
   *
   * - "auto" (default) - Sign for negative numbers only
   * - "always" - Always show sign
   * - "exceptZero" - Show sign except for zero
   * - "negative" - Show sign for negative numbers only
   * - "never" - Never show sign
   */
  signDisplay?: Intl.NumberFormatOptions["signDisplay"];
}

/**
 * Predefined number formatting shortcuts
 */
const SHORTCUT_FORMATS: Record<string, ZujiOptions> = {
  "small-currency": {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  },
  "short-currency": {
    style: "currency",
    currency: "USD",
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  },
  "long-currency": {
    style: "currency",
    currency: "USD",
    notation: "compact",
    compactDisplay: "long",
    maximumFractionDigits: 0,
  },
  "big-currency": {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: true,
  },
  "small-number": {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: true,
  },
  "short-number": {
    style: "decimal",
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  },
  "long-number": {
    style: "decimal",
    notation: "compact",
    compactDisplay: "long",
    maximumFractionDigits: 0,
  },
  "big-number": {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: true,
  },
  "short-percent": {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  },
} as const;

export type ZujiShortcut = keyof typeof SHORTCUT_FORMATS;

/**
 * Formats a number using Intl.NumberFormat with the specified options
 * @param number - The number to format
 * @param options - a shortcut string or Int.NumberFormatting options
 *
 * @returns The formatted number string
 */
export function zuji(
  number: number | string,
  options: ZujiOptions | ZujiShortcut | null | undefined = {}
): string {
  // Handle special cases
  if (number === Infinity) return "∞";
  if (number === -Infinity) return "-∞";
  if (options === null || options === undefined) return String(number);

  // Convert string numbers to numbers
  if (typeof number === "string") {
    const parsed = Number(number);
    if (isNaN(parsed)) {
      throw new TypeError(`Invalid input: ${number}, expected a valid number`);
    }
    number = parsed;
  }

  // Validate number input
  if (typeof number !== "number") {
    throw new TypeError(`Invalid input: ${number}, expected a number`);
  }

  // Handle shortcut formats
  let formatOptions: ZujiOptions = {};
  if (typeof options === "string") {
    if (options in SHORTCUT_FORMATS) {
      formatOptions = SHORTCUT_FORMATS[options];
    } else {
      throw new Error(`Invalid shortcut format: ${options}`);
    }
  } else {
    formatOptions = options;
  }

  // Create formatter and format the number
  const formatter = new Intl.NumberFormat(
    formatOptions.locale || "en-US",
    formatOptions as Intl.NumberFormatOptions
  );

  return formatter.format(number);
}
