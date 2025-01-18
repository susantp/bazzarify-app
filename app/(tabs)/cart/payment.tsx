import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ContentWrapper from "@/components/common/ContentWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import { Text, View } from "react-native";
import usePaymentScreenHook from "@/hooks/usePaymentScreenHook";
import { randomUUID } from "expo-crypto";
import React from "react";
import PaymentMethodView from "@/components/cart/payment/PaymentMethodView";

export default function PaymentScreen() {
  const { paymentMethodSections } = usePaymentScreenHook();
  return (
    <SafeAreaWrapper>
      <ScreenHeader title="Payment" />
      <ContentWrapper>
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
    </SafeAreaWrapper>
  );
}
