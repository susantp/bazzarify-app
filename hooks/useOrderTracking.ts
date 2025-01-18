import { useEffect, useState } from "react";

export interface OrderTrackingItem {
  status: string;
  description: string;
  date: string;
  active: boolean;
}

export default function useOrderTracking(): OrderTrackingItem[] {
  const [orderTrackingData, setOrderTrackingData] = useState<
    OrderTrackingItem[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const mockData: OrderTrackingItem[] = [
        {
          active: true,
          status: "Order received by seller",
          date: "21 Jan 18:04",
          description:
            "Your package has been out for delivery by our delivery partner.",
        },
        {
          active: false,
          status: "Processing",
          date: "21 Jan 18:04",
          description: "Your order is processing/confirming by bazzarify team.",
        },
        {
          active: false,
          status: "Packing",
          date: "22 Jan 18:04",
          description: "Your order is been packing by the seller.",
        },
        {
          active: false,
          status: "Packed",
          date: "22 Jan 20:00",
          description: "Your order has been packed by the seller.",
        },
        {
          active: false,
          status: "Parcel to our logistic center",
          date: "23 Jan 04:40",
          description:
            "Your order has been picked by our delivery team and send to our logistic center.",
        },
        {
          active: false,
          status: "Your package is shipped",
          date: "24 Jan 06:19",
          description:
            "Your package has been shipped to our logistic center in your city.",
        },
        {
          active: false,
          status: "Your package is out for delivery",
          description:
            "Your package has been out for delivery by our delivery partner.",
          date: "24 Jan 12:09",
        },
      ];
      setOrderTrackingData(mockData);
    };

    fetchData().then(() => null);
  }, []);

  return orderTrackingData;
}
