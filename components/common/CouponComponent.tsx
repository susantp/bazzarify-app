import { Text, View } from "react-native";
import React from "react";

const ShippingCoupon = () => {
  return (
    <View className="h-24 flex-row">
      <View className="h-full flex-col items-center justify-center gap-y-1 rounded-lg border border-gray-200 bg-green-50 px-4 py-1">
        <Text className="text-xl font-bold text-green-600">Rs. 130</Text>
        <Text className="text-[0.7rem] font-light text-green-600">
          Min. Spend Rs. 799
        </Text>
      </View>
      <View className="h-full flex-col justify-center gap-y-1 rounded-lg border border-gray-200 bg-green-50 px-4 py-1">
        <View className="flex-row items-center gap-x-2">
          <Text className="text-xl font-bold text-green-600">
            Free Shipping
          </Text>
          <View className="rounded-full bg-green-200 px-2 py-1">
            <Text className="text-[0.67rem] text-green-600">T&C</Text>
          </View>
        </View>
        <Text className="text-[0.7rem] font-light text-green-600">
          Selected sellers
        </Text>
        <Text className="text-[0.7rem] font-light text-green-600">
          Expires in
        </Text>
        <Text className="text-[0.6rem]">08:15:08</Text>
      </View>
    </View>
  );
};

export default ShippingCoupon;
