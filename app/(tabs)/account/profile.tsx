import { Text, TouchableOpacity, View } from "react-native";
import ProfileInfo from "@/components/account/profile/ProfileInfo";
import AccountHeader from "@/components/account/AccountHeader";
import React from "react";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import OrderStatus from "@/components/account/profile/OrderStatus";
import useProfileScreen from "@/hooks/useProfileScreen";
import { randomUUID } from "expo-crypto";
import { router } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

export default function Page() {
  const { orderStatusBoxes, otherMenus } = useProfileScreen();
  return (
    <SafeAreaWrapper>
      <AccountHeader />
      <View className="flex-1 flex-col bg-white px-2 py-2">
        <ProfileInfo />
        <OrderStatus orderStatuses={orderStatusBoxes} />
        <View className="my-6 h-0.5 bg-slate-200" />
        <View className="flex-row flex-wrap gap-y-6">
          {otherMenus.map(({ id, icon, label }) => (
            <TouchableOpacity
              className="w-1/4 flex-col items-center gap-y-1"
              key={randomUUID()}
              onPress={() => router.push(`/account/order?statusId=${id}`)}
            >
              {icon}
              <Text className="text-sm">{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View className="my-6 h-0.5 bg-slate-200" />
        <View className="flex-col gap-y-4">
          <Text className="text-xl">Earn with Bazzarify</Text>
          <View className="flex-row gap-x-6 rounded-lg border border-slate-400 px-5 py-4">
            <FontAwesome5
              name="rupee-sign"
              size={24}
              color={Colors.light.tint}
            />
            <Text className="text-xl">Earn with bazzarify</Text>
          </View>
        </View>
      </View>
    </SafeAreaWrapper>
  );
}
