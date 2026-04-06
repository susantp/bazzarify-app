import { Colors } from "@/constants/Colors";
import {
  ToReceiveIcon,
  ToReturnIcon,
  ToReviewIcon,
  ToShipIcon,
} from "@/components/common/icons";
import React from "react";
import { ProfileMenuBoxType } from "@/modules/order/types";
import { toTitleCase } from "@/modules/core/utils";
import { Ionicons } from "@expo/vector-icons";

const normalize = (value: string) => value.toLowerCase();

const getAction = (status: string): ProfileMenuBoxType["action"] => {
  const value = normalize(status);
  if (
    value.includes("shipped") ||
    value.includes("delivery") ||
    value === "delivered"
  ) {
    return {
      label: "Track",
      route: "/account/order/[id]/tracking",
    };
  }
  if (value === "draft" || value === "confirmed" || value === "allocated") {
    return {
      label: "Cancel",
      route: "/account/order/[id]/return",
    };
  }
  if (value === "completed") {
    return {
      label: "Review",
    };
  }
  return undefined;
};

const getIcon = (status: string) => {
  const value = normalize(status);
  if (value.includes("cancel") || value.includes("return")) {
    return <ToReturnIcon />;
  }
  if (
    value.includes("shipped") ||
    value.includes("delivery") ||
    value === "delivered"
  ) {
    return <ToReceiveIcon />;
  }
  if (value === "completed") {
    return <ToReviewIcon />;
  }
  if (value === "confirmed" || value === "allocated") {
    return <ToShipIcon />;
  }
  return <Ionicons name="wallet-outline" size={44} color={Colors.light.tint} />;
};

export default function useOrderStatusBox(availableStatuses?: string[]) {
  const statuses = (availableStatuses || []).filter(Boolean);
  const orderStatusBoxes: ProfileMenuBoxType[] = statuses.map((status) => ({
    id: status,
    status,
    label: toTitleCase(status.replace(/_/g, " ")),
    icon: getIcon(status),
    action: getAction(status),
  }));

  return {
    orderStatusBoxes,
  };
}
