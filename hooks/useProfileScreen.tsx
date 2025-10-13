import { WalletIcon } from "react-native-heroicons/solid";
import { Colors } from "@/constants/Colors";
import {
  ToReceiveIcon,
  ToReturnIcon,
  ToReviewIcon,
  ToShipIcon,
} from "@/components/common/icons";
import React, { useCallback, useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Href, useFocusEffect } from "expo-router";
import { retrieveStorage } from "@/modules/core/utils/secureStore";
import { TUser } from "@/modules/auth/schemas/UserSchema";
import { USER_KEY } from "@/modules/auth/config";

export type ProfileMenuBoxType = {
  label: string;
  id: string;
  icon: React.ReactNode;
  routeTo?: Href;
};
export default function useProfileScreen() {
  const [user, setUser] = useState<TUser | null>(null);
  useFocusEffect(
    useCallback(() => {
      retrieveStorage(USER_KEY).then((response) => {
        if (response) {
          const user = JSON.parse(response);
          setUser(user);
        }
      });
    }, []),
  );
  const orderStatusBoxes: ProfileMenuBoxType[] = [
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
      routeTo: "/account/order/[id]/return",
      icon: <ToReturnIcon />,
    },
  ];
  const otherMenus: ProfileMenuBoxType[] = [
    {
      id: "toMessage",
      label: "Message",
      routeTo: "/account/message",
      icon: <FontAwesome6 name="inbox" size={26} color={Colors.light.tint} />,
    },
    {
      id: "vouchers",
      label: "Collect Vouchers",
      routeTo: "/account/voucherCenter",
      icon: (
        <MaterialIcons name="discount" size={26} color={Colors.light.tint} />
      ),
    },
  ];
  return { orderStatusBoxes, otherMenus, user };
}
