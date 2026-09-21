import { describe, expect, it } from "bun:test";
import resolveOrderStatusSelection from "@/modules/order/utils/resolveOrderStatusSelection";

describe("resolveOrderStatusSelection", () => {
  it("uses the route status when it is valid", () => {
    expect(
      resolveOrderStatusSelection({
        routeStatusId: "shipped",
        currentStatus: "pending",
        availableStatuses: ["pending", "shipped", "completed"],
      }),
    ).toBe("shipped");
  });

  it("preserves the current selection when no route status is provided", () => {
    expect(
      resolveOrderStatusSelection({
        routeStatusId: undefined,
        currentStatus: "completed",
        availableStatuses: ["pending", "completed", "returned"],
      }),
    ).toBe("completed");
  });

  it("falls back to the first available status when current selection is invalid", () => {
    expect(
      resolveOrderStatusSelection({
        routeStatusId: undefined,
        currentStatus: "missing",
        availableStatuses: ["pending", "completed", "returned"],
      }),
    ).toBe("pending");
  });
});
