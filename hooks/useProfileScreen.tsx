import { WalletIcon } from "react-native-heroicons/solid";
import { Colors } from "@/constants/Colors";
import {
  ToReceiveIcon,
  ToReturnIcon,
  ToReviewIcon,
  ToShipIcon,
} from "@/components/common/icons";
import React from "react";

export type OrderStatusBoxType = {
  label: string;
  id: string;
  icon: React.ReactNode;
};
export default function useProfileScreen() {
  const orderStatusBoxes: OrderStatusBoxType[] = [
    {
      id: "toPay",
      label: "To Pay",
      icon: <WalletIcon size={26} color={Colors.light.tint} />,
    },
    {
      id: "toShip",
      label: "To Ship",
      icon: <ToShipIcon />,
    },
    {
      id: "toReceive",
      label: "To Receive",
      icon: <ToReceiveIcon />,
    },
    {
      id: "toReview",
      label: "To Review",
      icon: <ToReviewIcon />,
    },
    {
      id: "toReturn",
      label: "To Return",
      icon: <ToReturnIcon />,
    },
  ];

  return { orderStatusBoxes };
}
