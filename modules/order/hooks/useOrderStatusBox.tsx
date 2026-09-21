import { Colors } from "@/constants/Colors";
import {
  ToReceiveIcon,
  ToReturnIcon,
  ToReviewIcon,
  ToShipIcon,
} from "@/components/common/icons";
import React from "react";
import { ProfileMenuBoxType } from "@/modules/order/types";
import { Ionicons } from "@expo/vector-icons";
import { TCustomerOrderStatusGroup } from "@/modules/order/schemas/CustomerOrderStatusGroupSchema";

const getAction = (id: string): ProfileMenuBoxType["action"] => {
  if (id === "to_receive") {
    return {
      label: "Track",
      route: "/account/order/[id]/tracking",
    };
  }
  if (id === "to_ship") {
    return {
      label: "Cancel",
      route: "/account/order/[id]/return",
    };
  }
  if (id === "completed") {
    return {
      label: "Review",
    };
  }
  return undefined;
};

const getIcon = (id: string) => {
  if (id === "returns") {
    return <ToReturnIcon />;
  }
  if (id === "to_receive") {
    return <ToReceiveIcon />;
  }
  if (id === "completed") {
    return <ToReviewIcon />;
  }
  if (id === "to_ship") {
    return <ToShipIcon />;
  }
  return (
    <Ionicons name="receipt-outline" size={44} color={Colors.light.tint} />
  );
};

export default function useOrderStatusBox(
  groups?: TCustomerOrderStatusGroup[],
) {
  const sourceGroups = (groups ?? []).map(({ code, label, statuses }) => ({
    id: code,
    label,
    statuses,
  }));

  const orderStatusBoxes: ProfileMenuBoxType[] = sourceGroups.map(
    ({ id, label, statuses }) => ({
      id,
      status: statuses,
      label,
      icon: getIcon(id),
      action: getAction(id),
    }),
  );

  return {
    orderStatusBoxes,
  };
}
