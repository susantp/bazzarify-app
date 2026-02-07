import resolveTrackingOrderRef, {
  isUuid,
} from "@/modules/order/utils/resolveTrackingOrderRef";

describe("resolveTrackingOrderRef", () => {
  it("uses order uuid first when present", () => {
    const result = resolveTrackingOrderRef({
      orderUuid: "019bf642-c317-7253-a8fc-85d11fcb2a49",
      itemOrderUuid: "019bf642-c317-7253-a8fc-85d11fcb2a00",
      orderNumber: "ORD-20260125-233029-723eacb3",
    });

    expect(result).toBe("019bf642-c317-7253-a8fc-85d11fcb2a49");
  });

  it("falls back to item order uuid when top-level uuid is missing", () => {
    const result = resolveTrackingOrderRef({
      itemOrderUuid: "019bf642-c317-7253-a8fc-85d11fcb2a00",
      orderNumber: "ORD-20260125-233029-723eacb3",
    });

    expect(result).toBe("019bf642-c317-7253-a8fc-85d11fcb2a00");
  });

  it("uses order number only when uuid values are missing", () => {
    const result = resolveTrackingOrderRef({
      orderNumber: "ORD-20260125-233029-723eacb3",
      routeOrderId: "legacy-value",
    });

    expect(result).toBe("ORD-20260125-233029-723eacb3");
  });

  it("allows details->track flow when route id is uuid", () => {
    const result = resolveTrackingOrderRef({
      orderNumber: "ORD-20260125-233029-723eacb3",
      routeOrderId: "019bf642-c317-7253-a8fc-85d11fcb2a49",
    });

    expect(result).toBe("019bf642-c317-7253-a8fc-85d11fcb2a49");
  });
});

describe("isUuid", () => {
  it("validates uuid-like order refs", () => {
    expect(isUuid("019bf642-c317-7253-a8fc-85d11fcb2a49")).toBe(true);
    expect(isUuid("ORD-20260125-233029-723eacb3")).toBe(false);
  });
});
