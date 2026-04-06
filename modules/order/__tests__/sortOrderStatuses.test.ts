import { describe, expect, it } from "bun:test";
import sortOrderStatuses from "@/modules/order/utils/sortOrderStatuses";

describe("sortOrderStatuses", () => {
  it("orders statuses by the standard customer lifecycle", () => {
    expect(
      sortOrderStatuses([
        "returned",
        "completed",
        "confirmed",
        "delivered",
        "draft",
        "shipped",
        "allocated",
      ]),
    ).toEqual([
      "draft",
      "confirmed",
      "allocated",
      "shipped",
      "delivered",
      "completed",
      "returned",
    ]);
  });

  it("places unknown statuses after the standard lifecycle", () => {
    expect(
      sortOrderStatuses([
        "custom_status",
        "completed",
        "awaiting_pickup",
        "confirmed",
      ]),
    ).toEqual([
      "confirmed",
      "completed",
      "awaiting_pickup",
      "custom_status",
    ]);
  });
});
