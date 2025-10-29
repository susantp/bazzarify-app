import { OrderStatus } from "@/modules/order/enums/OrderStatus";
import { WalletIcon } from "react-native-heroicons/solid";
import { Colors } from "@/constants/Colors";
import {
  ToReceiveIcon,
  ToReturnIcon,
  ToReviewIcon,
  ToShipIcon,
} from "@/components/common/icons";
import React from "react";
import { ProfileMenuBoxType } from "@/modules/order/types";

export default function useOrderStatusBox() {
  const orderStatusBoxes: ProfileMenuBoxType[] = [
    {
      id: "toPay",
      status: OrderStatus.DRAFT,
      label: "To Pay",
      icon: <WalletIcon size={44} color={Colors.light.tint} />,
      action: {
        label: "Cancel",
        route: "/account/order/[id]/return",
      },
    },
    {
      id: "toShip",
      status: OrderStatus.CONFIRMED,
      label: "To Ship",
      icon: <ToShipIcon />,
      action: {
        label: "Cancel",
        route: "/account/order/[id]/return",
      },
    },
    {
      id: "toReceive",
      label: "To Receive",
      status: OrderStatus.DELIVERED,
      icon: <ToReceiveIcon />,
    },
    {
      id: "toReview",
      label: "To Review",
      status: OrderStatus.COMPLETED,
      icon: <ToReviewIcon />,
      action: {
        label: "Review",
      },
    },
    {
      id: "toReturn",
      label: "To Return",
      status: OrderStatus.CANCELED,
      icon: <ToReturnIcon />,
    },
  ];
  // const otherMenus: ProfileMenuBoxType[] = [
  //   {
  //     id: "toMessage",
  //     label: "Message",
  //     routeTo: "/account/message",
  //     icon: <FontAwesome6 name="inbox" size={44} color={Colors.light.tint} />,
  //   },
  //   {
  //     id: "vouchers",
  //     label: "Collect Vouchers",
  //     routeTo: "/account/voucherCenter",
  //     icon: (
  //       <MaterialIcons name="discount" size={44} color={Colors.light.tint} />
  //     ),
  //   },
  // ];
  return {
    orderStatusBoxes,
  };
}
