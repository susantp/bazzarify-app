import React, { useEffect, useState } from "react";

interface OrderTrackingItem {
  status: string;
  description: string;
  date: string;
}

function useOrderTracking(): OrderTrackingItem[] {
  const [orderTrackingData, setOrderTrackingData] = useState<
    OrderTrackingItem[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const mockData: OrderTrackingItem[] = [
        {
          status: "Order received by seller",
          date: "21 Jan 18:04",
          description:
            "Your package has been out for delivery by our delivery partner.",
        },
        {
          status: "Processing",
          date: "21 Jan 18:04",
          description: "Your order is processing/confirming by bazzarify team.",
        },
        {
          status: "Packing",
          date: "22 Jan 18:04",
          description: "Your order is been packing by the seller.",
        },
        {
          status: "Packed",
          date: "22 Jan 20:00",
          description: "Your order has been packed by the seller.",
        },
        {
          status: "Parcel to our logistic center",
          date: "23 Jan 04:40",
          description:
            "Your order has been picked by our delivery team and send to our logistic center.",
        },
        {
          status: "Your package is shipped",
          date: "24 Jan 06:19",
          description:
            "Your package has been shipped to our logistic center in your city.",
        },
        {
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

function TimelineItem({ status, date }: { status: string; date: string }) {
  return (
    <div className={`mt-2 flex items-center`}>
      <div className={`mr-2 h-4 w-4 rounded-full bg-blue-500`}></div>
      <div>
        <span>{status}</span>
        <span className={`text-xs text-gray-500`}>{date}</span>
      </div>
    </div>
  );
}

function OrderTracking() {
  const orderTrackingData = useOrderTracking();

  return (
    <div className={`flex flex-col`}>
      <div className={`flex items-center justify-between`}>
        <div className={`mr-4 rounded-full bg-gray-300 p-2`}></div>
        <h2 className={`text-lg font-semibold`}>Track Your Product</h2>
      </div>

      <div className={`mt-4 flex justify-between`}>
        <div className={`w-1/4 text-center`}>Processing</div>
        <div className={`w-1/4 text-center`}>Packed</div>
        <div className={`w-1/4 text-center`}>Shipped</div>
        <div className={`w-1/4 text-center`}>Delivered</div>
      </div>

      <div className={`mt-4`}>
        <span className={`font-bold`}>Tracking Number</span>
        <span>LGS-192927839300763731</span>
      </div>

      <div className={`mt-4`}>
        <div className={`flex items-center`}>
          <span className={`font-bold`}>
            Get your product in 24th - 26th January
          </span>
          <span className={`ml-4 text-red-500`}>
            Attempt to deliver your parcel was not successful
          </span>
        </div>
      </div>

      <div className={`mt-4`}>
        {orderTrackingData.map((item, index) => (
          <TimelineItem key={index} status={item.status} date={item.date} />
        ))}
      </div>
    </div>
  );
}

export default OrderTracking;
