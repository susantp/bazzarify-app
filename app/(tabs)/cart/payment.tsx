import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ContentWrapper from "@/components/common/ContentWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import { Text, View } from "react-native";
import usePaymentScreenHook from "@/hooks/usePaymentScreenHook";
import { randomUUID } from "expo-crypto";
import PaymentMethodView from "@/components/cart/checkout/paymentMethodView";

export default function PaymentScreen() {
  const { paymentTypes } = usePaymentScreenHook();
  const handleMethodPress = () => 1;
  return (
    <SafeAreaWrapper>
      <ScreenHeader title="Payment" />
      <ContentWrapper>
        {paymentTypes.map((type, index) => (
          <View key={randomUUID()} className="flex-col">
            <View className="bg-gray-300 px-2 py-1.5">
              <Text>{type.sectionTitle}</Text>
            </View>
            {type.methods.map((method) => (
              <PaymentMethodView
                method={method}
                key={randomUUID()}
                onMethodPress={handleMethodPress}
              />
            ))}
          </View>
        ))}
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
