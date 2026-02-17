import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ScreenHeader from "@/components/common/ScreenHeader";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import ContentWrapper from "@/components/common/ContentWrapper";
import { Colors } from "@/constants/Colors";
import { randomUUID } from "expo-crypto";
import DeliveryMileStones from "@/components/account/order/DeliveryMileStones";
import TimelineItem from "@/components/account/order/TimelineItem";
import useOrderTracking from "@/hooks/useOrderTracking";
import { useLocalSearchParams } from "expo-router";

export default function TrackOrderPage() {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const orderIdRaw = Array.isArray(id) ? id[0] : id;
  const orderId = orderIdRaw ? decodeURIComponent(orderIdRaw) : undefined;
  const { tracking, orderTrackingData, isLoading, error, isEmpty, retry } =
    useOrderTracking(orderId);

  return (
    <SafeAreaWrapper>
      <ScreenHeader title="Track Your Product" />
      <ContentWrapper className="gap-y-6 bg-white px-4 py-3">
        <DeliveryMileStones currentStatus={tracking.currentStatus} />
        <View className="flex-row items-center justify-between rounded-lg bg-slate-100 p-3">
          <View className="flex-col gap-y-1">
            <Text className={`font-bold`}>Tracking Number</Text>
            <Text>{tracking.trackingNumber || "--"}</Text>
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
          <Text>{tracking.estimatedDeliveryText}</Text>
        </View>
        <View className="flex-row items-center justify-between gap-x-2 rounded-lg p-3">
          <View className="flex-1">
            <Text className={`text-green-600`}>
              {tracking.currentStatus || "--"}
            </Text>
          </View>
          <View className="rounded-lg bg-green-600 px-2 py-1">
            <Text className="text-white">
              {tracking.currentStatusDate || "--"}
            </Text>
          </View>
        </View>
        {isLoading ? (
          <View className="items-center py-6">
            <ActivityIndicator color={Colors.light.tint} size="large" />
          </View>
        ) : null}
        {!isLoading && error ? (
          <View className="items-center gap-y-2 py-6">
            <Text className="text-center text-sm text-gray-500">{error}</Text>
            <TouchableOpacity
              onPress={() => retry().then(() => null)}
              className="rounded-lg border border-primary px-4 py-2"
            >
              <Text className="text-primary">Try again</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {!isLoading && !error && isEmpty ? (
          <View className="items-center py-6">
            <Text className="text-sm text-gray-500">
              Tracking timeline is empty
            </Text>
          </View>
        ) : null}
        {!isLoading && !error && !isEmpty ? (
          <FlatList
            contentContainerClassName="gap-y-4"
            data={orderTrackingData}
            renderItem={({ item }) => (
              <TimelineItem key={randomUUID()} item={item} />
            )}
          />
        ) : null}
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
