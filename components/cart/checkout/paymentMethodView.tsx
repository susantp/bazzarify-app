import { Text, TouchableOpacity, View } from "react-native";
import { CreditCardIcon } from "react-native-heroicons/outline";
import { Colors } from "@/constants/Colors";
import { ChevronRightIcon } from "react-native-heroicons/solid";
import { PaymentMethodType } from "@/hooks/usePaymentScreenHook";
import { router } from "expo-router";

export interface PaymentMethodViewProps {
  method: PaymentMethodType;
  onMethodPress: () => void;
}

const PaymentMethodView = ({
  method,
  onMethodPress,
}: PaymentMethodViewProps) => (
  <TouchableOpacity
    className="flex-row items-center justify-between border-b border-b-gray-300 px-2 py-3"
    onPress={() => {
      method.id === "card" && router.push("/cart/cardPayment");
    }}
  >
    <View className="flex-row items-center gap-x-2">
      <CreditCardIcon size={18} color={Colors.light.tint} />
      <Text>{method.name}</Text>
    </View>
    <View>
      <ChevronRightIcon size={20} color="black" />
    </View>
  </TouchableOpacity>
);
export default PaymentMethodView;
