import formatOrderDate from "@/modules/order/utils/formatOrderDate";

describe("formatOrderDate", () => {
  it("formats ISO datetime string", () => {
    const value = formatOrderDate("2026-02-07T10:11:12Z", "LLL d, yyyy");
    expect(value).not.toBe("--");
  });

  it("formats db-style datetime string", () => {
    const value = formatOrderDate("2026-02-07 10:11:12", "LLL d, yyyy");
    expect(value).not.toBe("--");
  });

  it("returns fallback for invalid datetime string", () => {
    expect(formatOrderDate("not-a-date", "LLL d, yyyy")).toBe("--");
  });

  it("returns fallback for empty values", () => {
    expect(formatOrderDate("", "LLL d, yyyy")).toBe("--");
    expect(formatOrderDate(null, "LLL d, yyyy")).toBe("--");
  });
});
