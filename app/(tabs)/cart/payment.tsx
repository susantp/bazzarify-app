import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ContentWrapper from "@/components/common/ContentWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import { Text, View } from "react-native";
import usePaymentScreenHook from "@/hooks/usePaymentScreenHook";
import { randomUUID } from "expo-crypto";
import React from "react";
import PaymentMethodView from "@/components/cart/payment/PaymentMethodView";
import BottomActionView from "@/modules/core/components/BottomActionView";

export default function PaymentScreen() {
  const { paymentMethodSections, cartState } = usePaymentScreenHook();

  return (
    <SafeAreaWrapper>
      <ScreenHeader title="Payment" />
      <ContentWrapper className="bg-white">
        {paymentMethodSections.map((methodSection, index) => (
          <View key={randomUUID()} className="flex-col">
            <View className="bg-gray-300 px-2 py-1.5">
              <Text>{methodSection.sectionTitle}</Text>
            </View>
            {methodSection.methods.map((methodType) => (
              <PaymentMethodView
                method={methodType}
                key={randomUUID()}
                pathName={methodType.pathname}
              />
            ))}
          </View>
        ))}
      </ContentWrapper>
      <BottomActionView>
        <View className="flex-col gap-y-4 px-4 py-9">
          <View className="flex-row justify-between">
            <Text className="text-sm font-light">Subtotal</Text>
            <Text className="font-semibold">{`Rs. ${cartState?.cart?.totals.sub_total}`}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-xl">Total Amount</Text>
            <Text className="text-xl font-semibold text-orange-600">
              {`Rs. ${cartState?.cart?.totals.grand_total}`}
            </Text>
          </View>
        </View>
      </BottomActionView>
    </SafeAreaWrapper>
  );
}
