import { Text, View } from "react-native";
import React from "react";

interface ICardPaymentMethodViewProps {
  totalPrice: number;
  subTotalPrice: number;
}

const CardPaymentBottomActionView = ({
  totalPrice,
  subTotalPrice,
}: ICardPaymentMethodViewProps) => {
  return (
    <View className="w-full px-4 py-9">
      <View className="flex-col gap-y-4">
        <View className="w-full flex-row justify-between">
          <Text className="text-sm font-light">Subtotal</Text>
          <Text className="font-semibold">Rs. {subTotalPrice}</Text>
        </View>
        <View className="w-full flex-row justify-between">
          <Text className="text-xl">Total Amount</Text>
          <Text className="text-xl font-semibold text-orange-600">
            {" "}
            Rs. {totalPrice}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default CardPaymentBottomActionView;
