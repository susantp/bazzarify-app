import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { CreditCardIcon } from "react-native-heroicons/outline";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ContentWrapper from "@/components/common/ContentWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import { Colors } from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import usePaymentScreenHook, {
  PaymentMethodType,
} from "@/hooks/usePaymentScreenHook";
import React from "react";
import { InformationCircleIcon } from "react-native-heroicons/solid";

export default function PaymentConfirmationScreen() {
  const { id } = useLocalSearchParams();
  const { paymentMethodById } = usePaymentScreenHook(id.toString());
  const componentMap: Record<PaymentMethodType["id"], React.ReactNode> = {
    card: <CardPaymentComponent btnLabel={"Pay"} />,
    cod: <CODPaymentComponent btnLabel={"Pay"} />,
  };
  return (
    <SafeAreaWrapper>
      <ScreenHeader title={paymentMethodById?.name} />
      <ContentWrapper>
        {paymentMethodById?.voucherMsg && (
          <View className="flex-row gap-x-2 bg-blue-200 p-2">
            <View className="w-1/12 items-end">
              <InformationCircleIcon color={"blue"} size={15} />
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
const CODPaymentComponent = ({ btnLabel }: { btnLabel: string }) => {
  return <View></View>;
};
const CardPaymentComponent = ({ btnLabel }: { btnLabel: string }) => (
  <View className="flex-col gap-y-4">
    <View className="relative flex-row items-center gap-x-2 rounded-md border border-gray-300 px-2">
      <View className="border border-white py-2">
        <CreditCardIcon color={Colors.light.tint} size={20} />
      </View>
      <View className="flex-1 py-2">
        <TextInput
          placeholder="Card number"
          keyboardType="number-pad"
          textContentType="creditCardNumber"
        />
      </View>
    </View>
    <View className="flex-row gap-x-4">
      <TextInput
        keyboardType="number-pad"
        placeholder="MM/YY"
        textContentType="creditCardExpiration"
        className="w-20 rounded-md border border-gray-300 px-2 py-2 text-center"
      />
      <TextInput
        keyboardType="number-pad"
        keyboardAppearance="dark"
        placeholder="CVV"
        textContentType="creditCardSecurityCode"
        className="w-16 rounded-md border border-gray-300 px-2 py-2 text-center"
      />
    </View>
    <TouchableOpacity
      activeOpacity={0.7}
      className="w-full items-center rounded-md bg-orange-600 px-3 py-2"
    >
      <Text className="text-xl font-semibold text-white">{btnLabel}</Text>
    </TouchableOpacity>
  </View>
);
