import { describe, it, expect } from "vitest";
import { formatCurrency, slugify } from "./utils";

describe("Utility Functions", () => {
  it("formats currency correctly in INR", () => {
    const result = formatCurrency(14999);
    expect(result).toContain("14,999");
  });

  it("slugifies product titles correctly", () => {
    const slug = slugify("Kanjeevaram Pure Silk Saree");
    expect(slug).toBe("kanjeevaram-pure-silk-saree");
  });
});
