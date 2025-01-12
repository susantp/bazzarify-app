import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { CreditCardIcon } from "react-native-heroicons/outline";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ContentWrapper from "@/components/common/ContentWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import { Colors } from "@/constants/Colors";

export default function CardPaymentScreen() {
  return (
    <SafeAreaWrapper>
      <ScreenHeader title="Card Payment" />
      <ContentWrapper className="p-2">
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
            <Text className="text-xl font-semibold text-white">Pay</Text>
          </TouchableOpacity>
        </View>
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
