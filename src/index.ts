import { formatLocale } from "d3-format";
import {
  localeDefinitions,
  SUPPORTED_LOCALES,
  SupportedLocale,
} from "./locales";

/**
 * Predefined number formatting shortcuts for common use cases
 * @property "small-currency" - Format as currency with 2 decimal places (e.g. $1,234.56)
 * @property "short-currency" - Format as currency with SI prefix (e.g. $1.2M)
 * @property "long-currency" - Format as currency with SI prefix, no decimals (e.g. $1M)
 * @property "big-currency" - Format as currency with no decimals (e.g. $1,234)
 * @property "small-number" - Format as number with no decimals and thousands separator (e.g. 1,234)
 * @property "short-number" - Format as number with SI prefix (e.g. 1.2M)
 * @property "long-number" - Format as number with SI prefix, no decimals (e.g. 1M)
 * @property "big-number" - Format as number with no decimals and thousands separator (e.g. 1,234)
 * @property "short-percent" - Format as percentage with 1 decimal place (e.g. 12.3%)
 * @property "short-decimal" - Format with 2 significant digits and SI prefix (e.g. 1.2k)
 */
const SHORTCUT_FORMATS = {
  /** Format as currency with 2 decimal places (e.g. $1,234.56) */
  "small-currency": { format: "$,.2f", value: "small-currency" },
  /** Format as currency with SI prefix (e.g. $1.2M) */
  "short-currency": { format: "$,.2s", value: "short-currency" },
  /** Format as currency with SI prefix, no decimals (e.g. $1M) */
  "long-currency": { format: "$,.0s", value: "long-currency" },
  /** Format as currency with no decimals (e.g. $1,234) */
  "big-currency": { format: "$,.0f", value: "big-currency" },
  /** Format as number with no decimals and thousands separator (e.g. 1,234) */
  "small-number": { format: ",.0f", value: "small-number" },
  /** Format as number with SI prefix (e.g. 1.2M) */
  "short-number": { format: ",.0s", value: "short-number" },
  /** Format as number with SI prefix, no decimals (e.g. 1M) */
  "long-number": { format: ",.0s", value: "long-number" },
  /** Format as number with no decimals and thousands separator (e.g. 1,234) */
  "big-number": { format: ",.0f", value: "big-number" },
  /** Format as percentage with 1 decimal place (e.g. 12.3%) */
  "short-percent": { format: ".1%", value: "short-percent" },
  /** Format with 2 significant digits and SI prefix (e.g. 1.2k) */
  "short-decimal": { format: ".2s", value: "short-decimal" },
} as const;

export type ZujiShortcut = keyof typeof SHORTCUT_FORMATS;

/*
The general form of a specifier is:
`[​[fill]align][sign][symbol][0][width][,][.precision][~][type]

This is the API we are converting into something more heavily typed and well documented.

The available type values are:

e - exponent notation.
f - fixed point notation.
g - either decimal or exponent notation, rounded to significant digits.
r - decimal notation, rounded to significant digits.
s - decimal notation with an SI prefix, rounded to significant digits.
% - multiply by 100, and then decimal notation with a percent sign.
p - multiply by 100, round to significant digits, and then decimal notation with a percent sign.
b - binary notation, rounded to integer.
o - octal notation, rounded to integer.
d - decimal notation, rounded to integer.
x - hexadecimal notation, using lower-case letters, rounded to integer.
X - hexadecimal notation, using upper-case letters, rounded to integer.
c - character data, for a string of text.
*/

/*
The format specifier is a magic string that goes into d3-format.

We take it's specific inputs and type them stronger with nice descriptions to make it easier to use.

This is its code:
// [[fill]align][sign][symbol][0][width][,][.precision][~][type]
var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

export default function formatSpecifier(specifier) {
  if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
  var match;
  return new FormatSpecifier({
    fill: match[1],
    align: match[2],
    sign: match[3],
    symbol: match[4],
    zero: match[5],
    width: match[6],
    comma: match[7],
    precision: match[8] && match[8].slice(1),
    trim: match[9],
    type: match[10]
  });
}

formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

export function FormatSpecifier(specifier) {
  this.fill = specifier.fill === undefined ? " " : specifier.fill + "";
  this.align = specifier.align === undefined ? ">" : specifier.align + "";
  this.sign = specifier.sign === undefined ? "-" : specifier.sign + "";
  this.symbol = specifier.symbol === undefined ? "" : specifier.symbol + "";
  this.zero = !!specifier.zero;
  this.width = specifier.width === undefined ? undefined : +specifier.width;
  this.comma = !!specifier.comma;
  this.precision = specifier.precision === undefined ? undefined : +specifier.precision;
  this.trim = !!specifier.trim;
  this.type = specifier.type === undefined ? "" : specifier.type + "";
}

FormatSpecifier.prototype.toString = function() {
  return this.fill
      + this.align
      + this.sign
      + this.symbol
      + (this.zero ? "0" : "")
      + (this.width === undefined ? "" : Math.max(1, this.width | 0))
      + (this.comma ? "," : "")
      + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0))
      + (this.trim ? "~" : "")
      + this.type;
};
*/

/*
The fill can be any character. The presence of a fill character is signaled by the align character following it, which must be one of the following:

> - Forces the field to be right-aligned within the available space. (Default behavior).
< - Forces the field to be left-aligned within the available space.
^ - Forces the field to be centered within the available space.
= - like >, but with any sign and symbol to the left of any padding.
The sign can be:

- - nothing for zero or positive and a minus sign for negative. (Default behavior.)
+ - a plus sign for zero or positive and a minus sign for negative.
( - nothing for zero or positive and parentheses for negative.
  (space) - a space for zero or positive and a minus sign for negative.
The symbol can be:

$ - apply currency symbols per the locale definition.
# - for binary, octal, or hexadecimal notation, prefix by 0b, 0o, or 0x, respectively.
*/

// create an example on all properties based on a simple number that demonstrates it's purpose

type CharString =
  | "!"
  | '"'
  | "#"
  | "$"
  | "%"
  | "&"
  | "'"
  | "("
  | ")"
  | "*"
  | "+"
  | ","
  | "-"
  | "."
  | "/"
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | ":"
  | ";"
  | "<"
  | "="
  | ">"
  | "?"
  | "@"
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z"
  | "["
  | "\\"
  | "]"
  | "^"
  | "_"
  | "`"
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z"
  | "{"
  | "|"
  | "}"
  | "~"
  | " ";

/** Alignment options for number formatting
 * @property `${string}>` - Forces the field to be right-aligned within the available space (Default) "  100"
 * @property `${string}<` - Forces the field to be left-aligned within the available space "100  "
 * @property `${string}^` - Forces the field to be centered within the available space " 100 "
 * @property `${string}=` - Like right-align, but with any sign and symbol to the left of padding "-$100"
 */
type ZujiFillAndAlign =
  | `${CharString}>`
  | `${CharString}<`
  | `${CharString}^`
  | `${CharString}=`;

/** Sign options for number formatting
 * @property "-" - Nothing for zero or positive and a minus sign for negative (Default) "-100" "100"
 * @property "+" - A plus sign for zero or positive and a minus sign for negative "-100" "+100"
 * @property "(" - Nothing for zero or positive and parentheses for negative "(100)" "100"
 * @property " " - A space for zero or positive and a minus sign for negative "-100" "100"
 */
type ZujiSign = "-" | "+" | "(" | " ";

/** Symbol options for number formatting
 * @property "$" - Apply currency symbols per the locale definition
 * @property "#" - For binary, octal, or hexadecimal notation, prefix by 0b, 0o, or 0x, respectively
 */
type ZujiSymbol = "$" | "#";

/** Type options for number formatting
 * @property "e" - Exponent notation
 * @property "f" - Fixed point notation
 * @property "g" - Either decimal or exponent notation, rounded to significant digits
 * @property "r" - Decimal notation, rounded to significant digits
 * @property "s" - Decimal notation with an SI prefix, rounded to significant digits
 * @property "%" - Multiply by 100, and then decimal notation with a percent sign
 * @property "p" - Multiply by 100, round to significant digits, and then decimal notation with a percent sign
 * @property "b" - Binary notation, rounded to integer
 * @property "o" - Octal notation, rounded to integer
 * @property "d" - Decimal notation, rounded to integer
 * @property "x" - Hexadecimal notation, using lower-case letters, rounded to integer
 * @property "X" - Hexadecimal notation, using upper-case letters, rounded to integer
 * @property "c" - Character data, for a string of text
 */
type ZujiType =
  | "e"
  | "f"
  | "g"
  | "r"
  | "s"
  | "%"
  | "p"
  | "b"
  | "o"
  | "d"
  | "x"
  | "X"
  | "c";

export type ZujiOptions = {
  // ------ FORMAT SPECIFIER OPTIONS ------
  /** A single fill character to use for padding that is added (default: " ") combined with the alignment character (default: ">" or right-aligned) */
  fill?: ZujiFillAndAlign;
  /** The sign to display for numbers ("+", "-", "(", or " ") */
  sign?: ZujiSign;
  /** The symbol to use for currency formatting ("$" or "#") */
  symbol?: ZujiSymbol;
  /** Whether to pad with zeros instead of spaces, this is identical to setting 0= for the fill character */
  // zero?: boolean;
  /** The minimum field width to ensure */
  width?: number;
  /** Whether to enable the thousands separators, usually ",", but depends on locale */
  comma?: boolean;
  /** The number of digits after the decimal point */
  precision?: number;
  /** Whether to trim insignificant trailing zeros */
  trim?: boolean;
  /** The type of formatting to use (e.g., "f" for fixed-point, "%" for percentage) */
  type?: ZujiType;
  // ------ EXTRA HELPER OPTIONS ------
  /** An option to bail out and use a d3-format specifier that is already assembled */
  d3format?: string;
  /** An option to set the locale for the formatting */
  locale?: SupportedLocale;
};

const ZUJI_DEFAULT_OPTIONS = {
  fill: " >",
  sign: "-",
  symbol: "",
  width: "",
  comma: "",
  precision: "",
  trim: "",
  type: "",
} as const;

/**
 * Generates a format specifier for d3-format from the given ZujiOptions.
 *
 * @param options - The set of options to use for the formatt specifier.
 * @returns The format specifier string to be passed to d3-format.
 */
function generateFormatSpecifier(options: Partial<ZujiOptions>) {
  const specifierFill = options.fill ?? ZUJI_DEFAULT_OPTIONS.fill;
  const specifierSign = options.sign ?? ZUJI_DEFAULT_OPTIONS.sign;
  const specifierSymbol = options.symbol ?? ZUJI_DEFAULT_OPTIONS.symbol;
  const specifierWidth =
    options.width === undefined ? "" : Math.max(1, options.width | 0);
  const specifierComma = options.comma ? "," : ZUJI_DEFAULT_OPTIONS.comma;
  const specifierPrecision =
    options.precision === undefined ? "" : `.${Math.max(0, options.precision)}`;
  const specifierTrim = options.trim ? "~" : ZUJI_DEFAULT_OPTIONS.trim;
  const specifierType = options.type ?? ZUJI_DEFAULT_OPTIONS.type;
  return (
    specifierFill +
    specifierSign +
    specifierSymbol +
    specifierWidth +
    specifierComma +
    specifierPrecision +
    specifierTrim +
    specifierType
  );
}

type NumeralString = `${bigint}` | `${bigint}.${bigint}`;

export function zuji(
  number: number | NumeralString,
  options: null | undefined | ZujiShortcut | ZujiOptions = {}
) {
  let formatSpecifier: string;
  // handle the Infinity edge case
  if (number === Infinity) return "∞";
  if (number === -Infinity) return "-∞";
  // skip if no options are provided
  if (options === null || options === undefined) return number;

  // if the number is a string, attempt to convert it to a number
  if (typeof number === "string") {
    number = Number(number);
    // check to make sure it's a valid number
    if (isNaN(number)) {
      throw new TypeError(
        `Invalid input: ${number}, expected a JavaScript number`
      );
    }
  }

  // throw when an invalid number is provided
  if (typeof number !== "number") {
    throw new TypeError(
      `Invalid input: ${number}, expected a JavaScript number`
    );
  }

  const isStringArg = typeof options === "string";
  const isShortcut = isStringArg && options in SHORTCUT_FORMATS;
  if (isShortcut) {
    formatSpecifier = SHORTCUT_FORMATS[options].format;
  } else if (isStringArg) {
    formatSpecifier = options;
  } else {
    formatSpecifier = generateFormatSpecifier(options);
  }

  // use en-US locale by default
  let locale: SupportedLocale = "en-US";
  if (!isStringArg && options.locale) {
    locale = options.locale;
  }

  // if the locale is not supported, throw an error
  if (!locale || !SUPPORTED_LOCALES.includes(locale)) {
    throw new Error(`Unsupported locale: ${locale}`);
  }

  // set the locale
  const localeDefinition = localeDefinitions[locale];
  const localeObject = formatLocale(localeDefinition as any);

  return localeObject.format(formatSpecifier)(number);
}
