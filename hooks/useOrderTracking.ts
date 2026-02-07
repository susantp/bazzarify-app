import { useCallback, useEffect, useState } from "react";
import { getAuthToken } from "@/modules/auth/utils/token";
import actionGetOrderTracking from "@/modules/order/actions/actionGetOrderTracking";
import mapOrderTrackingToTimeline, {
  OrderTrackingItem,
  OrderTrackingViewModel,
} from "@/modules/order/utils/mapOrderTrackingToTimeline";

export type { OrderTrackingItem };

const emptyTracking: OrderTrackingViewModel = {
  orderUuid: "",
  orderNumber: "",
  trackingNumber: "",
  currentStatus: "",
  currentStatusDate: "",
  estimatedDeliveryText: "Estimated delivery window unavailable",
  timeline: [],
};

export default function useOrderTracking(orderId?: string) {
  const [tracking, setTracking] =
    useState<OrderTrackingViewModel>(emptyTracking);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTracking = useCallback(async () => {
    if (!orderId) {
      setTracking(emptyTracking);
      setError("Order id is missing.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const token = await getAuthToken();
      if (!token) {
        throw new Error("Authentication error.");
      }
      const response = await actionGetOrderTracking(token, orderId);
      if (!response?.tracking) {
        setTracking(emptyTracking);
        return;
      }
      setTracking(mapOrderTrackingToTimeline(response.tracking));
    } catch (err) {
      setTracking(emptyTracking);
      setError(err instanceof Error ? err.message : "Unable to load tracking.");
    } finally {
      setIsLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    loadTracking().then(() => null);
  }, [loadTracking]);

  return {
    tracking,
    orderTrackingData: tracking.timeline,
    isLoading,
    error,
    isEmpty: !tracking.timeline.length,
    retry: loadTracking,
  };
}
