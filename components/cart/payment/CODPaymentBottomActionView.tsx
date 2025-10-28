import { Pressable, Text, View } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";

interface ICODPaymentMethodViewProps {
  totalPrice: number;
  cashPaymentFee: number;
  subTotalPrice: number;
  actionBtn: string;
  action: () => void;
}

const CODPaymentBottomActionView = ({
  totalPrice,
  cashPaymentFee,
  subTotalPrice,
  actionBtn,
  action,
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
        <Pressable
          className="w-full flex-row items-center justify-center rounded-md bg-orange-600 p-4"
          onPress={action}
        >
          <ThemedText
            type="subtitle"
            style={{
              color: "#ffffff",
              textAlign: "center",
            }}
          >
            {actionBtn}
          </ThemedText>
        </Pressable>
      </View>
    </View>
  );
};
export default CODPaymentBottomActionView;
