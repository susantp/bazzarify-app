import { Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { Colors } from "@/constants/Colors";

interface ICheckoutBottomActionViewProps {
  totalPrice: number | undefined;
  btnLabel: string;
  deliveryPrice?: number;
  handlePress: () => void | undefined;
}

const CheckoutBottomActionView = ({
  totalPrice,
  btnLabel,
  deliveryPrice,
  handlePress,
}: ICheckoutBottomActionViewProps) => {
  return (
    <View className="flex-row items-center justify-between px-4 py-9">
      <View className="flex-col gap-y-2">
        <Text className="text-xl font-bold">
          Total:
          <Text className="text-xl text-primary">{` Rs. ${totalPrice}`}</Text>
        </Text>
        <Text className="text-sm font-light">
          Delivery fee:
          <Text className="text-primary">{` Rs. ${deliveryPrice}`}</Text>
        </Text>
      </View>
      <Button
        icon="cart-arrow-right"
        mode="contained"
        onPress={handlePress}
        style={{
          backgroundColor: Colors.light.tint,
          paddingHorizontal: 1.5,
          paddingVertical: 1,
        }}
      >
        {btnLabel}
      </Button>
    </View>
  );
};

export default CheckoutBottomActionView;
