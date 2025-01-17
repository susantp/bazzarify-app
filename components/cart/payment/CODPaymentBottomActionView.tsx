import { Button, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

interface ICODPaymentMethodViewProps {
  totalPrice: number;
  cashPaymentFee: number;
  subTotalPrice: number;
  actionBtn: string;
}

const CODPaymentBottomActionView = ({
  totalPrice,
  cashPaymentFee,
  subTotalPrice,
  actionBtn,
}: ICODPaymentMethodViewProps) => {
  return (
    <View className="w-full px-4 py-9">
      <View className="flex-col gap-y-4">
        <View className="w-full flex-row justify-between">
          <Text className="text-sm font-light">Subtotal</Text>
          <Text className="font-semibold">Rs. {subTotalPrice}</Text>
        </View>
        <View className="w-full flex-row justify-between">
          <Text className="text-sm font-light">Cash Payment Fee</Text>
          <Text className="font-semibold">Rs. {cashPaymentFee}</Text>
        </View>
        <View className="w-full flex-row justify-between">
          <Text className="text-xl">Total Amount</Text>
          <Text className="text-xl font-semibold text-orange-600">
            Rs. {totalPrice}
          </Text>
        </View>
        <Button title={actionBtn} color={Colors.light.tint} />
      </View>
    </View>
  );
};
export default CODPaymentBottomActionView;
