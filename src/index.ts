import { ISO417CurrencyCode } from "./currency";
import {
  NumberFormatOptionsCompactDisplay,
  NumberFormatOptionsCurrencyDisplay,
  NumberFormatOptionsCurrencySign,
  NumberFormatOptionsNotation,
  NumberFormatOptionsRoundingModeType,
  NumberFormatOptionsRoundingPriority,
  NumberFormatOptionsSignDisplay,
  NumberFormatOptionsStyle,
  NumberFormatOptionsTrailingZeroDisplay,
  NumberFormatOptionsUnitDisplay,
  NumberFormatOptionsUseGrouping,
} from "./intl-numberformat";
import { SupportedBCP47Locale } from "./locales";
import { OneToTwentyOne, SanctionedCLDRUnit, ZeroToTwenty } from "./units";

/**
 * Options for number formatting using Intl.NumberFormat
 */
export interface ZujiOptions {
  // ------------ General options ------------
  /** The locale to use for formatting (e.g., "en-US", "fr-FR") */
  locale?: SupportedBCP47Locale;

  /** Whether or not to throw an error if there is an issue while parsing */
  safeMode?: boolean;

  // ------------ Style options ------------
  /** The formatting style to use. Possible values are:
   *
   * - "decimal" (default) - Plain number formatting
   * - "currency" - Currency formatting (requires currency property)
   * - "percent" - Percentage formatting
   * - "unit" - Unit formatting (requires unit property)
   */
  style?: NumberFormatOptionsStyle;

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
  currencyDisplay?: NumberFormatOptionsCurrencyDisplay;

  /** How to handle negative currency values. Possible values are:
   *
   * - "standard" (default) - Use minus sign (e.g., -$1.00)
   * - "accounting" - Use accounting notation (e.g., ($1.00))
   */
  currencySign?: NumberFormatOptionsCurrencySign;

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
  unitDisplay?: NumberFormatOptionsUnitDisplay;

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
  notation?: NumberFormatOptionsNotation;

  /** Only used when notation is "compact". Possible values are:
   *
   * - "short" (default) - Short compact notation (e.g., "12K")
   * - "long" - Long compact notation (e.g., "12 thousand")
   */
  compactDisplay?: NumberFormatOptionsCompactDisplay;

  /** Whether to use grouping separators, such as thousands separators or thousand/lakh/crore separators.

. Possible values are:
   *
   * - "auto" (default if notation is not "compact") - Use locale preferences
   * - "min2" (default if notation is "compact") - ensures grouping separators are used only when there are **at least two digits** in a group. Ex: 3200 -> 3200 but 32000 -> 32,000
   * - "always" - Always use grouping separators
   * - true - Same as "always"
   * - false - Never use grouping separators
   */
  useGrouping?: NumberFormatOptionsUseGrouping;

  /** When to display the sign. Possible values are:
   *
   * - "auto" (default) - Sign for negative numbers only
   * - "always" - Always show sign
   * - "exceptZero" - Show sign except for zero
   * - "negative" - Show sign for negative numbers only
   * - "never" - Never show sign
   */
  signDisplay?: NumberFormatOptionsSignDisplay;

  // ------------ Rounding options ------------
  /** How to resolve conflicts between significant digits and fraction digits rounding. Possible values are:
   *
   * - "auto" (default) - Use significant digits if specified, otherwise use fraction digits
   * - "morePrecision" - Use the option that results in more precision
   * - "lessPrecision" - Use the option that results in less precision
   */
  roundingPriority?: NumberFormatOptionsRoundingPriority;

  /** The increment to round to. Possible values are:
   * 1, 2, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000, 2000, 2500, 5000
   * Default: 1
   *
   * Note: Cannot be mixed with significant-digits rounding or roundingPriority other than "auto"
   */
  roundingIncrement?:
    | 1
    | 2
    | 5
    | 10
    | 20
    | 25
    | 50
    | 100
    | 200
    | 250
    | 500
    | 1000
    | 2000
    | 2500
    | 5000;

  /** How numbers should be rounded. Possible values are:
   *
   * - "halfExpand" (default) - Round away from zero at the halfway point
   * - "ceil" - Round toward positive infinity
   * - "floor" - Round toward negative infinity
   * - "expand" - Round away from zero
   * - "trunc" - Round toward zero
   * - "halfCeil" - Round toward positive infinity at halfway point
   * - "halfFloor" - Round toward negative infinity at halfway point
   * - "halfTrunc" - Round toward zero at halfway point
   * - "halfEven" - Round toward nearest even number at halfway point
   */
  roundingMode?: NumberFormatOptionsRoundingModeType;

  /** How trailing zeros in the fraction should be displayed. Possible values are:
   *
   * - "auto" (default) - Show trailing zeros according to minimumFractionDigits and minimumSignificantDigits
   * - "stripIfInteger" - Remove trailing zeros if the number is an integer
   */
  trailingZeroDisplay?: NumberFormatOptionsTrailingZeroDisplay;
}

/**
 * Predefined number formatting shortcuts
 */
export const SHORTCUT_FORMATS = {
  "compact-currency-usd": {
    style: "currency",
    currency: "USD",
    notation: "compact",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    useGrouping: "always",
  },
  "standard-currency-usd": {
    style: "currency",
    currency: "USD",
    notation: "standard",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: "always",
  },
  "accounting-currency-usd": {
    style: "currency",
    currency: "USD",
    currencySign: "accounting",
    notation: "standard",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: "always",
  },
  "compact-integer": {
    style: "decimal",
    notation: "compact",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  },
  "standard-integer": {
    style: "decimal",
    notation: "standard",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: "always",
  },
  "compact-decimal": {
    style: "decimal",
    notation: "compact",
  },
  "standard-decimal": {
    style: "decimal",
    notation: "standard",
    useGrouping: "always",
  },
  "compact-percent": {
    style: "percent",
    notation: "compact",
    roundingMode: "floor",
  },
  "standard-percent": {
    style: "percent",
    notation: "standard",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    useGrouping: "always",
    roundingMode: "floor",
  },
  "multiple-of-5": {
    roundingIncrement: 5,
  },
  "degrees-celsius": {
    style: "unit",
    unit: "celsius",
    unitDisplay: "short",
  },
  "degrees-fahrenheit": {
    style: "unit",
    unit: "fahrenheit",
    unitDisplay: "short",
  },
  bytes: {
    style: "unit",
    unit: "byte",
    unitDisplay: "short",
  },
  meters: {
    style: "unit",
    unit: "meter",
    unitDisplay: "short",
  },
  kilometers: {
    style: "unit",
    unit: "kilometer",
    unitDisplay: "short",
  },
  inches: {
    style: "unit",
    unit: "inch",
    unitDisplay: "short",
  },
  feet: {
    style: "unit",
    unit: "foot",
    unitDisplay: "short",
  },
} as const;

/**
 * NumeralString is either all digits (e.g. "1234")
 * or digits dot digits (e.g. "1234.5678").
 */
export type NumeralString = `${bigint}` | `${bigint}.${bigint}`;

export type ZujiShortcut = keyof typeof SHORTCUT_FORMATS;

/**
 * Formats a number using Intl.NumberFormat with the specified options
 * @param number - The number to format
 * @param options - a shortcut string or options object
 * @param overrideOptions - (optional) options to override the individual settings when used with a shortcut string, this is for convenience
 *
 * @returns The formatted number string
 */
export function zuji(
  number: number | NumeralString,
  options: ZujiOptions | ZujiShortcut | null | undefined = {},
  overrideOptions: ZujiOptions = {}
): string {
  // Handle special cases
  if (number === Infinity) return "∞";
  if (number === -Infinity) return "-∞";
  if (options === null || options === undefined) return String(number);

  // Convert string numbers to numbers
  if (typeof number === "string") {
    const parsed = Number(number);
    if (isNaN(parsed)) {
      if (typeof options === "object" && options?.safeMode) {
        return String(number);
      }
      throw new TypeError(
        `Invalid input: ${typeof number} ${JSON.stringify(
          number
        )}, expected a valid number`
      );
    }
    number = parsed;
  }

  // Validate number input
  if (typeof number !== "number") {
    if (typeof options === "object" && options?.safeMode) {
      return String(number);
    }
    throw new TypeError(
      `Invalid input: ${typeof number} ${JSON.stringify(
        number
      )}, expected a number`
    );
  }

  const isUsingShortcut = typeof options === "string";
  // Hold onto the OG options so we can revert them for some edge cases
  let originalProvidedOptions: ZujiOptions = {};
  if (isUsingShortcut) {
    originalProvidedOptions = overrideOptions;
  } else {
    originalProvidedOptions = options;
  }

  // Handle shortcut formats
  let formatOptions: ZujiOptions = {};
  if (isUsingShortcut) {
    if (options in SHORTCUT_FORMATS) {
      formatOptions = SHORTCUT_FORMATS[options];
      if (overrideOptions) {
        formatOptions = { ...formatOptions, ...overrideOptions };
      }
    } else {
      throw new Error(`Invalid shortcut format: ${options}`);
    }
  } else {
    formatOptions = options;
  }

  // make sure that maximumFractionDigits and minimumFractionDigits are both set if roundingIncrement is set
  if (
    formatOptions.roundingIncrement &&
    (!formatOptions.maximumFractionDigits ||
      !formatOptions.minimumFractionDigits)
  ) {
    // adjust the empty fraction digit option to match the other one
    if (!formatOptions.maximumFractionDigits) {
      formatOptions.maximumFractionDigits = formatOptions.minimumFractionDigits;
    } else {
      formatOptions.minimumFractionDigits = formatOptions.maximumFractionDigits;
    }
  }
  // make sure that minimumFractionDigits is not greater than maximumFractionDigits, use the value that was passed in if available
  if (
    formatOptions.minimumFractionDigits &&
    formatOptions.maximumFractionDigits &&
    formatOptions.minimumFractionDigits > formatOptions.maximumFractionDigits
  ) {
    formatOptions.minimumFractionDigits =
      originalProvidedOptions.minimumFractionDigits;
    formatOptions.maximumFractionDigits =
      originalProvidedOptions.maximumFractionDigits;
  }

  // make sure the fraction digits are set if roundingIncrement is set
  if (
    formatOptions.roundingIncrement &&
    (!formatOptions.minimumFractionDigits ||
      !formatOptions.maximumFractionDigits)
  ) {
    formatOptions.minimumFractionDigits = 0;
    formatOptions.maximumFractionDigits = 0;
  }

  // Create formatter and format the number
  const formatter = new Intl.NumberFormat(
    formatOptions.locale || "en-US",
    formatOptions as Intl.NumberFormatOptions
  );

  if (formatOptions.safeMode) {
    let result = "";
    try {
      result = formatter.format(number);
    } catch (error) {
      result = String(number);
    }
    return result;
  }

  return formatter.format(number);
}

export type { ISO417CurrencyCode } from "./currency";
export type { SupportedBCP47Locale } from "./locales";
export type { OneToTwentyOne, SanctionedCLDRUnit, ZeroToTwenty } from "./units";
