import { Text, TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { PaymentMethodType } from "@/hooks/usePaymentScreenHook";
import { Href, Link } from "expo-router";
import { ConnectIPSIcon, ImePayIcon } from "@/components/common/icons";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export interface PaymentMethodViewProps {
  method: PaymentMethodType;
  pathName: Href;
}

const PaymentMethodView = ({ method, pathName }: PaymentMethodViewProps) => {
  return (
    <Link href={pathName} asChild={true}>
      <TouchableOpacity className="flex-row items-center justify-between border-b border-b-gray-300 px-2 py-3">
        <View className="flex-row items-center gap-x-2">
          {method.id === "imePay" && <ImePayIcon />}
          {method.id === "cod" && (
            <Ionicons name="cash-outline" size={18} color={Colors.light.tint} />
          )}
          {method.id === "connectIPS" && <ConnectIPSIcon />}
          {method.id === "card" && (
            <MaterialCommunityIcons
              name="credit-card-outline"
              size={18}
              color={Colors.light.tint}
            />
          )}

          <Text>{method.name}</Text>
        </View>
        <View>
          <Ionicons name="chevron-forward" size={20} color="black" />
        </View>
      </TouchableOpacity>
    </Link>
  );
};
export default PaymentMethodView;
