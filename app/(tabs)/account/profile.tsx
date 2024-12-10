import { Text, TouchableOpacity, View } from "react-native";
import ProfileInfo from "@/components/account/profile/ProfileInfo";
import AccountHeader from "@/components/account/AccountHeader";
import { WalletIcon } from "react-native-heroicons/solid";
import { Colors } from "@/constants/Colors";
import React from "react";
import {
  ToReceiveIcon,
  ToReturnIcon,
  ToReviewIcon,
  ToShipIcon,
} from "@/components/common/icons";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";

const ProfileScreen = () => {
  return (
    <SafeAreaWrapper>
      <AccountHeader />
      <View className="h-screen flex-col bg-white px-2 py-2">
        <ProfileInfo />
        <MyOrders />
      </View>
    </SafeAreaWrapper>
  );
};

export default ProfileScreen;

type MyOrdersViewBoxMapKeyLiteral =
  | "toPay"
  | "toShip"
  | "toReceive"
  | "toReview"
  | "toReturn";
type MyOrdersViewBoxMapKeyType = {
  [key in MyOrdersViewBoxMapKeyLiteral]: {
    label: string;
    icon: React.ReactNode;
  };
};
const myOrdersViewBoxMap: MyOrdersViewBoxMapKeyType = {
  toPay: {
    label: "To Pay",
    icon: <WalletIcon size={26} color={Colors.light.tint} />,
  },
  toShip: {
    label: "To Ship",
    icon: <ToShipIcon />,
  },
  toReceive: {
    label: "To Receive",
    icon: <ToReceiveIcon />,
  },
  toReview: {
    label: "To Review",
    icon: <ToReviewIcon />,
  },
  toReturn: {
    label: "To Return",
    icon: <ToReturnIcon />,
  },
};

export const MyOrders = () => (
  <View className="flex-col gap-y-4 px-2 py-2">
    <Text className="text-md">My Order</Text>
    <View className="flex-row">
      {Object.entries(myOrdersViewBoxMap).map(
        ([key, value]: [string, { label: string; icon: React.ReactNode }]) => (
          <TouchableOpacity
            className="w-1/5 flex-col items-center gap-y-1"
            key={key}
          >
            {value.icon}
            <Text className="text-sm">{value.label}</Text>
          </TouchableOpacity>
        ),
      )}
    </View>
  </View>
);
