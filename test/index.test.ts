import { describe, expect, test } from "bun:test";
import { zuji } from "../src/index";

describe("zuji", () => {
  test("passes through simple numbers when nothing is provided", () => {
    expect(zuji(1_000_000)).toBe("1000000");
    expect(zuji(1234)).toBe("1234");
    expect(zuji(0)).toBe("0");
    expect(zuji(-0)).toBe("0");
    expect(zuji(-1234)).toBe("−1234");
    expect(zuji(-1_000_000)).toBe("−1000000");
  });

  test("fails to format invalid stuff", () => {
    // @ts-expect-error
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
    expect(zuji("1234")).toBe("1234");
    expect(zuji("1234.5678")).toBe("1234.5678");
  });

  test("formats numbers with commas", () => {
    expect(zuji(1234, { comma: true })).toBe("1,234");
    expect(zuji(1234.5678, { comma: true })).toBe("1,234.5678");
    expect(zuji(1234.5678, { comma: false })).toBe("1234.5678");
  });

  test("handles shortcut formats", () => {
    expect(zuji(1234, "short-currency")).toBe("$1,234.00");
    expect(zuji(1234, "short-number")).toBe("1,234");
    expect(zuji(0.1234, "short-percent")).toBe("12.3%");
  });

  test("handles custom format strings", () => {
    expect(zuji(1234, { d3format: ".0f" })).toBe("1234");
    expect(zuji(1234, { d3format: ",.2f" })).toBe("1,234.00");
    expect(zuji(0.1234, { d3format: ".2%" })).toBe("12.34%");
    expect(zuji(1234567, { d3format: ".2s" })).toBe("1.2M");
    expect(zuji(-1234, { d3format: "+," })).toBe("-1,234");
  });

  test("handles edge cases", () => {
    expect(zuji(0)).toBe("0");
    expect(zuji(-0)).toBe("0");
    expect(zuji(NaN)).toBe("NaN");
    expect(zuji(Infinity)).toBe("∞");
    expect(zuji(-Infinity)).toBe("-∞");
  });

  test("handles very large and small numbers", () => {
    expect(zuji(1e6, { d3format: ".2s" })).toBe("1.0M");
    expect(zuji(1e-6, { d3format: ".2s" })).toBe("1.0µ");
    expect(zuji(1e9, { d3format: ".2s" })).toBe("1.0G");
  });
});
