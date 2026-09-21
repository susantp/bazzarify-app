import { Text, View } from "react-native";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ContentWrapper from "@/components/common/ContentWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import { useLocalSearchParams } from "expo-router";
import usePaymentScreenHook from "@/hooks/usePaymentScreenHook";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function PaymentConfirmationScreen() {
  const { id } = useLocalSearchParams();
  const { paymentMethodById, componentMap } = usePaymentScreenHook(
    id.toString(),
  );

  return (
    <SafeAreaWrapper>
      <ScreenHeader title={paymentMethodById?.name} />
      <ContentWrapper className="bg-white">
        {paymentMethodById?.voucherMsg && (
          <View className="flex-row gap-x-2 bg-blue-200 p-2">
            <View className="w-1/12 items-end">
              <Ionicons name="information-circle" color="blue" size={15} />
            </View>
            <View className="w-10/12">
              <Text className="text-justify">
                {paymentMethodById.voucherMsg}
              </Text>
            </View>
          </View>
        )}
        {componentMap[id.toString()]}
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
