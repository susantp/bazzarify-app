import { Text, View } from "react-native";
import React from "react";

const ProductDescription = () => (
  <View
    id="voucher-info"
    className="flex-col gap-y-3 rounded-xl border border-gray-400 px-3 py-2"
  >
    <Text className="text-xl font-semibold">Description</Text>
    <Text className="text-md font-light">
      Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
      Lorem ipsum Lorem ipsum Lorem ipsum{" "}
    </Text>
    <View className="flex items-center justify-items-center">
      <Text className="text-md text-orange-600">See more</Text>
    </View>
  </View>
);

export default ProductDescription;
