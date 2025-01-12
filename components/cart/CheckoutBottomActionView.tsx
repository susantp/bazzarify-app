import { Text, View } from "react-native";
import { Link, LinkProps } from "expo-router";
import React from "react";

interface CheckoutBottomActionViewProps {
  totalPrice: number;
  btnLabel: string;
  deliveryPrice?: number;
  actionLink: LinkProps["href"];
}

const CheckoutBottomActionView = ({
  totalPrice,
  btnLabel,
  deliveryPrice,
  actionLink,
}: CheckoutBottomActionViewProps) => {
  return (
    <View className="flex-row items-center justify-between px-4 py-9">
      <View className="flex-col gap-y-2">
        <Text className="text-xl font-bold">
          Total:
          <Text className="text-xl text-orange-600"> Rs. {totalPrice}</Text>
        </Text>
        {deliveryPrice && (
          <Text className="text-sm font-light">
            Delivery fee:{" "}
            <Text className="text-orange-600">Rs. {deliveryPrice}</Text>
          </Text>
        )}
      </View>
      <Link
        href={actionLink}
        className="flex-row items-end rounded-full bg-orange-600 px-6 py-4"
      >
        <Text className="text-md text-white">{btnLabel}</Text>
      </Link>
    </View>
  );
};

export default CheckoutBottomActionView;
