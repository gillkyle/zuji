import { describe, expect, test } from "bun:test";
import { zuji } from "../src/index";

describe("zuji", () => {
  test("formats numbers with default options", () => {
    expect(zuji(1234)).toBe("1,234");
    expect(zuji(1234.5678)).toBe("1,234.5678");
  });

  test("handles shortcut formats", () => {
    expect(zuji(1234, "short-currency")).toBe("$1,234.00");
    expect(zuji(1234, "short-number")).toBe("1,234");
    expect(zuji(0.1234, "short-percent")).toBe("12.3%");
  });

  test("handles custom format strings", () => {
    expect(zuji(1234, { format: ".0f" })).toBe("1234");
    expect(zuji(1234, { format: ",.2f" })).toBe("1,234.00");
    expect(zuji(0.1234, { format: ".2%" })).toBe("12.34%");
    expect(zuji(1234567, { format: ".2s" })).toBe("1.2M");
    expect(zuji(-1234, { format: "+," })).toBe("-1,234");
  });

  test("handles edge cases", () => {
    expect(zuji(0)).toBe("0");
    expect(zuji(-0)).toBe("0");
    expect(zuji(NaN)).toBe("NaN");
    expect(zuji(Infinity)).toBe("∞");
    expect(zuji(-Infinity)).toBe("-∞");
  });

  test("handles very large and small numbers", () => {
    expect(zuji(1e6, { format: ".2s" })).toBe("1.0M");
    expect(zuji(1e-6, { format: ".2s" })).toBe("1.0µ");
    expect(zuji(1e9, { format: ".2s" })).toBe("1.0G");
  });
});
