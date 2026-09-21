import mapOrderTrackingToTimeline from "@/modules/order/utils/mapOrderTrackingToTimeline";
import { TOrderTracking } from "@/modules/order/schemas/TrackingSchema";

describe("mapOrderTrackingToTimeline", () => {
  it("maps ISO changed_at values into display-safe timeline items", () => {
    const payload: TOrderTracking = {
      order_uuid: "019bf642-c317-7253-a8fc-85d11fcb2a49",
      order_number: "ORD-20260125-233029-723eacb3",
      tracking_number: "TRK-123",
      current_status: "shipped",
      estimated_delivery_window: {
        from: "2026-02-08",
        to: "2026-02-10",
      },
      timeline: [
        {
          status: "confirmed",
          title: "Confirmed",
          description: "Order confirmed",
          changed_at: "2026-02-07T10:11:12Z",
          is_current: false,
        },
        {
          status: "shipped",
          title: "Shipped",
          description: "Order shipped",
          changed_at: "2026-02-08T11:12:13+00:00",
          is_current: true,
        },
      ],
    };

    const vm = mapOrderTrackingToTimeline(payload);

    expect(vm.orderUuid).toBe(payload.order_uuid);
    expect(vm.timeline).toHaveLength(2);
    expect(vm.timeline[0].date.length).toBeGreaterThan(0);
    expect(vm.timeline[1].date.length).toBeGreaterThan(0);
    expect(vm.currentStatusDate.length).toBeGreaterThan(0);
  });

  it("gracefully handles null changed_at", () => {
    const payload: TOrderTracking = {
      order_uuid: "019bf642-c317-7253-a8fc-85d11fcb2a49",
      order_number: "ORD-20260125-233029-723eacb3",
      tracking_number: "TRK-123",
      current_status: null,
      estimated_delivery_window: {
        from: null,
        to: null,
      },
      timeline: [
        {
          status: "confirmed",
          title: "Confirmed",
          description: null,
          changed_at: null,
          is_current: true,
        },
      ],
    };

    const vm = mapOrderTrackingToTimeline(payload);

    expect(vm.timeline[0].date).toBe("");
    expect(vm.currentStatusDate).toBe("");
    expect(vm.timeline[0].description).toBe("");
    expect(vm.estimatedDeliveryText).toBe(
      "Estimated delivery window unavailable",
    );
  });
});
