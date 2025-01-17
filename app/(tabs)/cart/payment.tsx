import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ContentWrapper from "@/components/common/ContentWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import { Text, View } from "react-native";
import usePaymentScreenHook from "@/hooks/usePaymentScreenHook";
import { randomUUID } from "expo-crypto";
import useBottomViewHook from "@/hooks/useBottomViewHook";
import BottomActionView from "@/components/common/BottomActionView";
import React from "react";
import PaymentBottomActionView from "@/components/cart/payment/PaymentBottomActionView";
import PaymentMethodView from "@/components/cart/payment/PaymentMethodView";

export default function PaymentScreen() {
  const { paymentMethodTypes } = usePaymentScreenHook();
  const { handleBottomViewLayoutEvent, paddingAfterBottomView } =
    useBottomViewHook();
  return (
    <SafeAreaWrapper>
      <ScreenHeader title="Payment" />
      <ContentWrapper styles={{ paddingBottom: paddingAfterBottomView }}>
        {paymentMethodTypes.map((methodType, index) => (
          <View key={randomUUID()} className="flex-col">
            <View className="bg-gray-300 px-2 py-1.5">
              <Text>{methodType.sectionTitle}</Text>
            </View>
            {methodType.methods.map((method) => (
              <PaymentMethodView
                method={method}
                key={randomUUID()}
                pathName={method.pathname}
              />
            ))}
          </View>
        ))}
        <BottomActionView onLayoutEvent={handleBottomViewLayoutEvent}>
          <PaymentBottomActionView totalPrice={399} subTotalPrice={399} />
        </BottomActionView>
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
