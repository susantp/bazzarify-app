import { parseISO, format } from "date-fns";
import {
  TDeliveryTrackingUnit,
  TOrderTracking,
} from "@/modules/order/schemas/TrackingSchema";

export interface OrderTrackingItem {
  id: string;
  status: string;
  description: string;
  date: string;
  active: boolean;
}

export interface OrderTrackingViewModel {
  orderUuid: string;
  orderNumber: string;
  trackingNumber: string | null;
  currentStatus: string;
  currentStatusDate: string;
  deliveryUnits: TDeliveryTrackingUnit[];
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

export default function mapOrderTrackingToTimeline(
  tracking: TOrderTracking,
): OrderTrackingViewModel {
  const currentItem = tracking.timeline.find((item) => item.is_current);

  return {
    orderUuid: tracking.order_uuid,
    orderNumber: tracking.order_number,
    trackingNumber: tracking.tracking_number,
    currentStatus: tracking.current_status || currentItem?.title || "",
    currentStatusDate: formatTimelineDate(currentItem?.changed_at || null),
    deliveryUnits: tracking.delivery_units,
    timeline: tracking.timeline.map((item) => ({
      id: item.uuid,
      status: item.title || item.status,
      description: item.description || "",
      date: formatTimelineDate(item.changed_at),
      active: item.is_current,
    })),
  };
}
