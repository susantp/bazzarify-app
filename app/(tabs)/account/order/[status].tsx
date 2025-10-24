import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import ScreenHeader from "@/components/common/ScreenHeader";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import ContentWrapper from "@/components/common/ContentWrapper";
import { Colors } from "@/constants/Colors";
import { randomUUID } from "expo-crypto";
import DeliveryMileStones from "@/components/account/order/DeliveryMileStones";
import TimelineItem from "@/components/account/order/TimelineItem";
import useOrderTracking from "@/hooks/useOrderTracking";

export default function Page() {
  const orderTrackingData = useOrderTracking();

  return (
    <SafeAreaWrapper>
      <ScreenHeader title="Track Your Product" />
      <ContentWrapper className="gap-y-6 bg-white px-4 py-3">
        <DeliveryMileStones />
        <View className="flex-row items-center justify-between rounded-lg bg-slate-100 p-3">
          <View className="flex-col gap-y-1">
            <Text className={`font-bold`}>Tracking Number</Text>
            <Text>LGS-192927839300763731</Text>
          </View>
          <TouchableOpacity>
            <AntDesign name="copy" color={Colors.light.tint} size={24} />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center gap-x-4 rounded-lg border border-slate-300 bg-slate-100 p-3">
          <FontAwesome5
            name="shipping-fast"
            size={20}
            color={Colors.light.tint}
          />
          <Text>Get your product in 24th - 26th January</Text>
        </View>
        <View className="flex-row items-center justify-between gap-x-2 rounded-lg p-3">
          <View className="flex-1">
            <Text className={`text-green-600`}>
              Attempt to deliver your parcel was not successful
            </Text>
          </View>
          <View className="rounded-lg bg-green-600 px-2 py-1">
            <Text className="text-white">Jan 24, 12:50</Text>
          </View>
        </View>
        <FlatList
          contentContainerClassName="gap-y-4"
          data={orderTrackingData}
          renderItem={({ item, index }) => (
            <TimelineItem key={randomUUID()} item={item} />
          )}
        />
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
