import { View } from "react-native";
import ProfileInfo from "@/components/account/profile/ProfileInfo";
import AccountHeader from "@/components/account/AccountHeader";
import React from "react";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import OrderStatus from "@/components/account/profile/OrderStatus";
import useProfileScreen from "@/hooks/useProfileScreen";

export default function Page() {
  const { orderStatusBoxes } = useProfileScreen();
  return (
    <SafeAreaWrapper>
      <AccountHeader />
      <View className="flex-1 flex-col bg-white px-2 py-2">
        <ProfileInfo />
        <OrderStatus orderStatuses={orderStatusBoxes} />
      </View>
    </SafeAreaWrapper>
  );
}
