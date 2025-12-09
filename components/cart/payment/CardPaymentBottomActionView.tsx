import { Button, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

interface ICardPaymentMethodViewProps {
  totalPrice: number;
  subTotalPrice: number;
  actionBtn: string;
}

const CardPaymentBottomActionView = ({
  totalPrice,
  subTotalPrice,
  actionBtn,
}: ICardPaymentMethodViewProps) => {
  return (
    <View className="flex-col gap-y-4 px-4 py-9">
      <View className="flex-row justify-between">
        <Text className="text-sm font-light">Subtotal</Text>
        <Text className="font-semibold">Rs. {subTotalPrice}</Text>
      </View>
      <View className="flex-row justify-between">
        <Text className="text-xl">Total Amount</Text>
        <Text className="text-xl font-semibold text-primary">
          Rs. {totalPrice}
        </Text>
      </View>
      <Button title={actionBtn} color={Colors.light.tint} />
    </View>
  );
};
export default CardPaymentBottomActionView;
