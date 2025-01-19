import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import { Text, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import useProfileScreen from "@/hooks/useProfileScreen";
import React, { useEffect, useState } from "react";
import ContentWrapper from "@/components/common/ContentWrapper";
import OrderedItem from "@/components/account/order/OrderedItem";

export default function Page() {
  const { statusId } = useLocalSearchParams();
  const [status, setStatus] = useState(statusId.toString());
  useEffect(() => {
    setStatus(statusId.toString());
  }, [statusId]);
  const { orderStatusBoxes } = useProfileScreen();
  const statusItem = orderStatusBoxes.find(
    (orderStatus) => orderStatus.id === status,
  );
  return (
    <SafeAreaWrapper>
      <ScreenHeader title="Your Order" />
      <ContentWrapper className="gap-y-6 px-3 py-2">
        <View className="flex-row flex-wrap gap-2">
          {orderStatusBoxes.map((orderStatus) => (
            <TouchableOpacity
              key={orderStatus.id}
              onPress={() => setStatus(orderStatus.id)}
              className="flex-row rounded-lg border border-slate-400 px-2 py-1"
            >
              <Text
                className={`${status === orderStatus.id ? "text-orange-600" : undefined} text-md`}
              >
                {orderStatus.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <OrderedItem statusItem={statusItem} />
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
