import React, { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import ScreenHeader from "@/components/common/ScreenHeader";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ContentWrapper from "@/components/common/ContentWrapper";
import { useLocalSearchParams, router } from "expo-router";
import { Colors } from "@/constants/Colors";

export default function LegacyTrackRoutePage() {
  const params = useLocalSearchParams<{
    order?: string | string[];
    id?: string | string[];
    uuid?: string | string[];
  }>();
  const getFirst = (value?: string | string[]) =>
    Array.isArray(value) ? value[0] : value;
  const orderRefRaw =
    getFirst(params.order) || getFirst(params.id) || getFirst(params.uuid);
  const orderRef = orderRefRaw ? decodeURIComponent(orderRefRaw) : "";

  useEffect(() => {
    if (!orderRef) {
      return;
    }
    router.replace({
      pathname: "/account/order/[id]/tracking",
      params: { id: encodeURIComponent(orderRef) },
    });
  }, [orderRef]);

  return (
    <SafeAreaWrapper>
      <ScreenHeader title="Track Your Product" />
      <ContentWrapper className="bg-white px-4 py-3">
        {orderRef ? (
          <View className="items-center py-6">
            <ActivityIndicator color={Colors.light.tint} size="large" />
          </View>
        ) : (
          <View className="items-center py-6">
            <Text className="text-sm text-gray-500">Order id is missing.</Text>
          </View>
        )}
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
