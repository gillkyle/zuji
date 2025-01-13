import { describe, expect, test } from "bun:test";
import { zuji } from "../src/index";

describe("zuji", () => {
  test("passes through simple numbers when nothing is provided", () => {
    expect(zuji(1_000_000)).toBe("1,000,000");
    expect(zuji(1234)).toBe("1,234");
    expect(zuji(0)).toBe("0");
    expect(zuji(-0)).toBe("-0");
    expect(zuji(-1234)).toBe("-1,234");
    expect(zuji(-1_000_000)).toBe("-1,000,000");
  });

  test("handles notation", () => {
    expect(zuji(1234, { notation: "standard" })).toBe("1,234");

    expect(zuji(1234, { notation: "compact" })).toBe("1.2K");
    expect(zuji(1234, { notation: "compact", compactDisplay: "short" })).toBe(
      "1.2K"
    );
    expect(zuji(1234, { notation: "compact", compactDisplay: "long" })).toBe(
      "1.2 thousand"
    );
    expect(zuji(1234, { notation: "scientific" })).toBe("1.234E3");
    expect(zuji(1234, { notation: "engineering" })).toBe("1.234E3");
  });

  test("handles useGrouping", () => {
    expect(zuji(1234, { useGrouping: "auto" })).toBe("1,234");
    expect(zuji(1234, { useGrouping: "always" })).toBe("1,234");
    expect(zuji(1234, { useGrouping: "min2" })).toBe("1234");
    expect(zuji(12345, { useGrouping: "min2" })).toBe("12,345");
    expect(zuji(12345678, { useGrouping: "min2" })).toBe("12,345,678");
    expect(zuji(12345678, { useGrouping: "always" })).toBe("12,345,678");
    expect(zuji(1234, { useGrouping: true })).toBe("1,234");
    expect(zuji(1234, { useGrouping: false })).toBe("1234");
  });

  test("handles safeMode", () => {
    // safeMode will not throw errors, it will just return the input
    // @ts-expect-error
    expect(zuji([], { safeMode: true })).toBe("");
    // @ts-expect-error
    expect(() => zuji([], { safeMode: false })).toThrow();
  });

  test("fails to format invalid stuff", () => {
    expect(() => zuji("foo")).toThrow();
    // @ts-expect-error
    expect(() => zuji(null)).toThrow();
    // @ts-expect-error
    expect(() => zuji(undefined)).toThrow();
    // @ts-expect-error
    expect(() => zuji({})).toThrow();
    // @ts-expect-error
    expect(() => zuji([])).toThrow();
    // @ts-expect-error
    expect(() => zuji(true)).toThrow();
    // @ts-expect-error
    expect(() => zuji(false)).toThrow();
    // @ts-expect-error
    expect(() => zuji(Symbol())).toThrow();
  });

  test("handles a number that's actually a string", () => {
    expect(zuji("1234")).toBe("1,234");
    expect(zuji("1234.56")).toBe("1,234.56");
  });

  test("formats numbers with commas", () => {
    expect(zuji(1234)).toBe("1,234");
    expect(zuji(1234.56)).toBe("1,234.56");
  });

  test("handles shortcut formats", () => {
    expect(zuji(1234, "short-currency")).toBe("$1,234.00");
    expect(zuji(1234, "short-number")).toBe("1,234");
    expect(zuji(0.1234, "short-percent")).toBe("12.3%");
  });

  test("handles edge cases", () => {
    expect(zuji(0)).toBe("0");
    expect(zuji(-0)).toBe("-0");
    expect(zuji(NaN)).toBe("NaN");
    expect(zuji(Infinity)).toBe("∞");
    expect(zuji(-Infinity)).toBe("-∞");
  });

  test("handles locales", () => {
    expect(zuji(1234, { locale: "es-ES" })).toBe("1234");
    expect(zuji(12345, { locale: "es-ES" })).toBe("12.345");
    expect(zuji(1234, { locale: "fr-FR" })).toBe("1 234");
    expect(zuji(12345, { locale: "fr-FR" })).toBe("12 345");
  });
});

describe("style options", () => {
  test("handles decimal style", () => {
    expect(zuji(1234.56, { style: "decimal" })).toBe("1,234.56");
  });

  test("handles currency style", () => {
    expect(zuji(1234.56, { style: "currency", currency: "USD" })).toBe(
      "$1,234.56"
    );
    expect(zuji(1234.56, { style: "currency", currency: "JPY" })).toBe(
      "¥1,235"
    );
    expect(zuji(1234.56, { style: "currency", currency: "EUR" })).toBe(
      "€1,234.56"
    );
    expect(
      zuji(1234.56, {
        style: "currency",
        currency: "USD",
        currencyDisplay: "code",
      })
    ).toBe("USD 1,234.56");
    expect(
      zuji(1234.56, {
        style: "currency",
        currency: "USD",
        currencyDisplay: "name",
      })
    ).toBe("1,234.56 US dollars");
  });

  test("handles currency sign", () => {
    expect(
      zuji(-1234.56, {
        style: "currency",
        currency: "USD",
        currencySign: "standard",
      })
    ).toBe("-$1,234.56");
    expect(
      zuji(-1234.56, {
        style: "currency",
        currency: "USD",
        currencySign: "accounting",
      })
    ).toBe("($1,234.56)");
  });

  test("handles percent style", () => {
    expect(zuji(0.1234, { style: "percent" })).toBe("12%");
    expect(zuji(0.1234, { style: "percent", minimumFractionDigits: 2 })).toBe(
      "12.34%"
    );
    expect(zuji(1.234, { style: "percent" })).toBe("123%");
    expect(zuji(1.234, { style: "percent", maximumFractionDigits: 1 })).toBe(
      "123.4%"
    );
    expect(zuji(1.234, { style: "percent", minimumFractionDigits: 2 })).toBe(
      "123.40%"
    );
  });

  test("handles unit style", () => {
    // Speed
    expect(zuji(123, { style: "unit", unit: "kilometer" })).toBe("123 km");
    expect(zuji(60, { style: "unit", unit: "mile" })).toBe("60 mi");

    // Volume
    expect(
      zuji(123, { style: "unit", unit: "liter", unitDisplay: "long" })
    ).toBe("123 liters");
    expect(
      zuji(123, { style: "unit", unit: "liter", unitDisplay: "narrow" })
    ).toBe("123L");
    expect(
      zuji(123, { style: "unit", unit: "liter", unitDisplay: "short" })
    ).toBe("123 L");
    expect(zuji(2, { style: "unit", unit: "gallon" })).toBe("2 gal");
    expect(zuji(8, { style: "unit", unit: "fluid-ounce" })).toBe("8 fl oz");
    expect(zuji(240, { style: "unit", unit: "milliliter" })).toBe("240 mL");

    // Weight/Mass
    expect(zuji(500, { style: "unit", unit: "gram" })).toBe("500 g");
    expect(zuji(2.5, { style: "unit", unit: "kilogram" })).toBe("2.5 kg");
    expect(zuji(1, { style: "unit", unit: "pound" })).toBe("1 lb");
    expect(zuji(4, { style: "unit", unit: "ounce" })).toBe("4 oz");

    // Temperature
    expect(zuji(21, { style: "unit", unit: "celsius" })).toBe("21°C");
    expect(zuji(70, { style: "unit", unit: "fahrenheit" })).toBe("70°F");

    // Length
    expect(zuji(5.2, { style: "unit", unit: "meter" })).toBe("5.2 m");
    expect(zuji(12, { style: "unit", unit: "inch" })).toBe("12 in");
    expect(zuji(3.5, { style: "unit", unit: "foot" })).toBe("3.5 ft");

    // Storage
    expect(zuji(1, { style: "unit", unit: "byte" })).toBe("1 byte");
    expect(zuji(1024, { style: "unit", unit: "kilobyte" })).toBe("1,024 kB");
    expect(zuji(1024 * 1024, { style: "unit", unit: "megabyte" })).toBe(
      "1,048,576 MB"
    );
    expect(zuji(1024 * 1024 * 1024, { style: "unit", unit: "gigabyte" })).toBe(
      "1,073,741,824 GB"
    );
    expect(
      zuji(1024 * 1024 * 1024 * 1024, { style: "unit", unit: "terabyte" })
    ).toBe("1,099,511,627,776 TB");
    // short storage
    expect(
      zuji(10000, { style: "unit", unit: "byte", unitDisplay: "short" })
    ).toBe("10,000 byte");
    expect(
      zuji(10000, { style: "unit", unit: "byte", unitDisplay: "narrow" })
    ).toBe("10,000B");
    expect(
      zuji(10000, {
        style: "unit",
        unit: "byte",
        unitDisplay: "narrow",
        notation: "compact",
      })
    ).toBe("10KB");
    expect(
      zuji(100_000_000, {
        style: "unit",
        unit: "byte",
        unitDisplay: "narrow",
        notation: "compact",
        compactDisplay: "short",
      })
    ).toBe("100MB");
    expect(
      zuji(1000, {
        style: "unit",
        unit: "gigabyte",
        notation: "standard",
      })
    ).toBe("1,000 GB");
  });
});

describe("digit options", () => {
  test("handles minimum integer digits", () => {
    expect(zuji(1.23, { minimumIntegerDigits: 3 })).toBe("001.23");
    expect(zuji(1234.5, { minimumIntegerDigits: 5 })).toBe("01,234.5");
    expect(zuji(1234.5, { minimumIntegerDigits: 1 })).toBe("1,234.5");
  });

  test("handles fraction digits", () => {
    expect(zuji(1.2, { minimumFractionDigits: 3 })).toBe("1.200");
    expect(zuji(1.23456, { maximumFractionDigits: 3 })).toBe("1.235");
    expect(
      zuji(1.23, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 3,
      })
    ).toBe("1.23");
  });

  test("handles significant digits", () => {
    expect(zuji(1234.5, { minimumSignificantDigits: 6 })).toBe("1,234.50");
    expect(zuji(1234.5678, { maximumSignificantDigits: 3 })).toBe("1,230");
    expect(
      zuji(1234.5678, {
        minimumSignificantDigits: 3,
        maximumSignificantDigits: 5,
      })
    ).toBe("1,234.6");
  });
});

describe("sign display", () => {
  test("handles different sign display options", () => {
    const number = 123;
    const negNumber = -123;
    const zero = 0;

    expect(zuji(number, { signDisplay: "auto" })).toBe("123");
    expect(zuji(negNumber, { signDisplay: "auto" })).toBe("-123");
    expect(zuji(zero, { signDisplay: "auto" })).toBe("0");

    expect(zuji(number, { signDisplay: "always" })).toBe("+123");
    expect(zuji(negNumber, { signDisplay: "always" })).toBe("-123");
    expect(zuji(zero, { signDisplay: "always" })).toBe("+0");

    expect(zuji(number, { signDisplay: "exceptZero" })).toBe("+123");
    expect(zuji(negNumber, { signDisplay: "exceptZero" })).toBe("-123");
    expect(zuji(zero, { signDisplay: "exceptZero" })).toBe("0");

    expect(zuji(number, { signDisplay: "negative" })).toBe("123");
    expect(zuji(negNumber, { signDisplay: "negative" })).toBe("-123");
    expect(zuji(zero, { signDisplay: "negative" })).toBe("0");

    expect(zuji(number, { signDisplay: "never" })).toBe("123");
    expect(zuji(negNumber, { signDisplay: "never" })).toBe("123");
    expect(zuji(zero, { signDisplay: "never" })).toBe("0");
  });
});

describe("locale handling", () => {
  test("formats numbers according to locale", () => {
    const number = 1234567.89;

    expect(zuji(number, { locale: "en-US" })).toBe("1,234,567.89");
    expect(zuji(number, { locale: "de-DE" })).toBe("1.234.567,89");
    expect(zuji(number, { locale: "fr-FR" })).toBe("1 234 567,89");
    expect(zuji(number, { locale: "zh-CN" })).toBe("1,234,567.89");

    // Currency with locale
    expect(
      zuji(number, {
        locale: "ja-JP",
        style: "currency",
        currency: "JPY",
      })
    ).toBe("¥1,234,568");
  });
});

describe("rounding options", () => {
  test("roundingMode", () => {
    // small numbers won't round
    expect(zuji(2.5, { notation: "compact", roundingMode: "ceil" })).toBe(
      "2.5"
    );
    expect(zuji(25.75, { notation: "compact", roundingMode: "ceil" })).toBe(
      "26"
    );
    expect(zuji(2.5, { notation: "compact", roundingMode: "floor" })).toBe(
      "2.5"
    );
    expect(zuji(25.75, { notation: "compact", roundingMode: "floor" })).toBe(
      "25"
    );
    expect(zuji(2.5, { notation: "compact", roundingMode: "halfExpand" })).toBe(
      "2.5"
    );
    expect(
      zuji(25.75, { notation: "compact", roundingMode: "halfExpand" })
    ).toBe("26");
    expect(zuji(2.5, { notation: "compact", roundingMode: "trunc" })).toBe(
      "2.5"
    );
    expect(zuji(25.75, { notation: "compact", roundingMode: "trunc" })).toBe(
      "25"
    );
  });

  test("roundingIncrement", () => {
    expect(zuji(1.23, { roundingIncrement: 5, maximumFractionDigits: 2 })).toBe(
      "1.25"
    );
    expect(zuji(1.22, { roundingIncrement: 5, maximumFractionDigits: 2 })).toBe(
      "1.20"
    );
    expect(zuji(1.27, { roundingIncrement: 5, maximumFractionDigits: 2 })).toBe(
      "1.25"
    );
  });

  test("roundingPriority", () => {
    expect(
      zuji(1.234, {
        maximumSignificantDigits: 3,
        maximumFractionDigits: 2,
        roundingPriority: "morePrecision",
      })
    ).toBe("1.23");
    expect(
      zuji(1.234, {
        maximumSignificantDigits: 3,
        maximumFractionDigits: 2,
        roundingPriority: "lessPrecision",
      })
    ).toBe("1.23");
  });

  test("trailingZeroDisplay", () => {
    expect(zuji(100.0, { trailingZeroDisplay: "stripIfInteger" })).toBe("100");
    expect(zuji(100.1, { trailingZeroDisplay: "stripIfInteger" })).toBe(
      "100.1"
    );
    expect(
      zuji(100.0, { trailingZeroDisplay: "auto", minimumFractionDigits: 2 })
    ).toBe("100.00");
  });
});
