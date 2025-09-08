import { Text, View } from "react-native";
import React from "react";
import { TCart } from "@/modules/order/schemas/orderSchema";

interface Props {
  cart: TCart;
}
const OrderDetailsComponent = ({ cart }: Props) => {
  return (
    <View className="flex-row">
      <View className="flex-col gap-y-2 rounded-2xl border border-gray-300 p-4">
        <View className="border-b border-b-gray-300 py-2">
          <Text className="text-xl font-bold">Order Details</Text>
        </View>
        <View className="flex-col gap-y-4 border-b border-gray-300 py-4">
          <View className="w-full flex-row items-center justify-between">
            <View className="w-7/12">
              <Text className="text-md">
                Ultima Boom 141 ANC Earbuds (30 dB) | 45Hrs | game mode....
              </Text>
            </View>
            <View className="w-1/12 items-end">
              <Text>x1</Text>
            </View>
            <View className="flex w-4/12 items-end">
              <Text className="text-md text-orange-600">Rs. 1,599</Text>
            </View>
          </View>
          <View className="w-full flex-row items-center justify-between">
            <View className="w-8/12">
              <Text className="text-md">Discount</Text>
            </View>
            <View className="flex w-4/12 items-end">
              <Text className="text-md line-through">Rs. 1,900</Text>
            </View>
          </View>
          <View className="w-full flex-row items-center justify-between">
            <View className="w-8/12">
              <Text className="text-md">Voucher</Text>
            </View>
            <View className="flex w-4/12 items-end">
              <Text className="text-md">Rs. 0</Text>
            </View>
          </View>
          <View className="w-full flex-row items-center justify-between">
            <View className="w-8/12 flex-col gap-y-2">
              <Text className="text-md">Delivery Charge</Text>
              <Text
                style={{ fontSize: 11 }}
                className="font-extralight text-gray-700"
              >
                Get By Dec Mon 2nd - Wed 4th
              </Text>
            </View>
            <View className="flex w-4/12 items-end">
              <Text className="text-sm">Rs. 110</Text>
            </View>
          </View>
        </View>
        <View className="w-full flex-row">
          <View className="w-full items-center">
            <Text className="text-lg text-orange-600">
              You're saving Upto Rs.2000 60% off
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OrderDetailsComponent;
