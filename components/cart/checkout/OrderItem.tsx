import { Image, Text, View } from "react-native";
import React from "react";

const OrderItem = () => (
  <View className="flex-row items-center bg-white">
    <View id="content-thumbnail" className="flex w-4/12 items-center">
      <Image
        source={require("@/assets/products/product.png")}
        className={`h-32 w-32`}
      />
    </View>

    <View id="content" className="flex w-8/12 flex-col items-start gap-y-2">
      <View id="cart-item-title">
        <Text className="text-md">
          Ultima Boom 141 ANC Earbuds (30 dB) | 45Hrs | game mode....
        </Text>
      </View>
      <View id="vendor">
        <Text className="text-sm">ultima lifestyle</Text>
      </View>
      <View
        id="price-action"
        className="w-full flex-row items-center justify-between"
      >
        <View className="flex-col">
          <Text className="text-md text-orange-600">Rs 3999</Text>
          <Text className="text-sm text-gray-600 line-through">Rs 1999</Text>
        </View>

        <View className="gap-x-2">
          <Text className="text-gray-700">Qty 1</Text>
        </View>
      </View>
    </View>
  </View>
);
export default OrderItem;
