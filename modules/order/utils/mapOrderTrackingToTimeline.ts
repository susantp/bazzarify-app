import { parseISO, format } from "date-fns";
import { TOrderTracking } from "@/modules/order/schemas/TrackingSchema";

export interface OrderTrackingItem {
  status: string;
  description: string;
  date: string;
  active: boolean;
}

export interface OrderTrackingViewModel {
  orderUuid: string;
  orderNumber: string;
  trackingNumber: string;
  currentStatus: string;
  currentStatusDate: string;
  estimatedDeliveryText: string;
  timeline: OrderTrackingItem[];
}

const formatTimelineDate = (raw: string | null) => {
  if (!raw) {
    return "";
  }
  const parsed = parseISO(raw);
  if (Number.isNaN(parsed.getTime())) {
    return "";
  }
  return format(parsed, "d LLL HH:mm");
};

const formatDeliveryDate = (raw: string | null) => {
  if (!raw) {
    return "";
  }
  const parsed = parseISO(raw);
  if (Number.isNaN(parsed.getTime())) {
    return "";
  }
  return format(parsed, "do LLLL");
};

export default function mapOrderTrackingToTimeline(
  tracking: TOrderTracking,
): OrderTrackingViewModel {
  const from = formatDeliveryDate(tracking.estimated_delivery_window.from);
  const to = formatDeliveryDate(tracking.estimated_delivery_window.to);
  const estimatedDeliveryText =
    from && to
      ? `Get your product in ${from} - ${to}`
      : "Estimated delivery window unavailable";
  const currentItem = tracking.timeline.find((item) => item.is_current);

  return {
    orderUuid: tracking.order_uuid,
    orderNumber: tracking.order_number,
    trackingNumber: tracking.tracking_number,
    currentStatus: tracking.current_status || currentItem?.title || "",
    currentStatusDate: formatTimelineDate(currentItem?.changed_at || null),
    estimatedDeliveryText,
    timeline: tracking.timeline.map((item) => ({
      status: item.title || item.status,
      description: item.description || "",
      date: formatTimelineDate(item.changed_at),
      active: item.is_current,
    })),
  };
}
