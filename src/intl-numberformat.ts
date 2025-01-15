export type NumberFormatOptionsStyle =
  | "decimal"
  | "percent"
  | "currency"
  | "unit";

export type NumberFormatOptionsCompactDisplay = "short" | "long";

export type NumberFormatOptionsCurrencyDisplay =
  | "symbol"
  | "code"
  | "name"
  | "narrowSymbol";

export type NumberFormatOptionsCurrencySign = "standard" | "accounting";

export type NumberFormatOptionsNotation =
  | "standard"
  | "scientific"
  | "engineering"
  | "compact";

export type NumberFormatOptionsSignDisplay =
  | "auto"
  | "always"
  | "never"
  | "exceptZero"
  | "negative";

export type NumberFormatOptionsUnitDisplay = "long" | "short" | "narrow";

export type NumberFormatOptionsTrailingZeroDisplay = "auto" | "stripIfInteger";

export type NumberFormatOptionsUseGrouping =
  | "min2"
  | "auto"
  | "always"
  | false
  | true;

export type NumberFormatOptionsRoundingPriority =
  | "auto"
  | "morePrecision"
  | "lessPrecision";

export type NumberFormatOptionsRoundingType =
  | "morePrecision"
  | "lessPrecision"
  | "significantDigits"
  | "fractionDigits";

export type NumberFormatOptionsRoundingModeType =
  | "ceil"
  | "floor"
  | "expand"
  | "trunc"
  | "halfCeil"
  | "halfFloor"
  | "halfExpand"
  | "halfTrunc"
  | "halfEven";

export type NumberFormatOptionsUnsignedRoundingModeType =
  | "infinity"
  | "zero"
  | "half-infinity"
  | "half-zero"
  | "half-even";
