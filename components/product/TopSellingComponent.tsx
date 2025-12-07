import { Image, Text, View } from "react-native";
import React from "react";

const TopSellingComponent = () => (
  <View className="p-4">
    <View
      id="top-selling-info"
      className="flex-col gap-y-3 rounded-xl border border-gray-400 px-3 py-2"
    >
      <Text className="text-xl font-semibold">Top Selling Products</Text>
      <View className="flex-row items-center justify-between justify-items-center">
        <View className="flex-row items-center justify-items-center gap-x-3">
          <View>
            <Image
              source={require("@/assets/products/product.png")}
              className="h-10 w-10 rounded-lg"
            />
          </View>
          <View>
            <Text>Ultima watch circle 2.0 smartwatch</Text>
          </View>
        </View>
        <View>
          <Text className="text-primary font-semibold">Rs. 3,499</Text>
        </View>
      </View>
      <View className="flex-row items-center justify-between justify-items-center">
        <View className="flex-row items-center justify-items-center gap-x-3">
          <View>
            <Image
              source={require("@/assets/products/product.png")}
              className="h-10 w-10 rounded-lg"
            />
          </View>
          <View>
            <Text>Ultima watch circle 2.0 smartwatch</Text>
          </View>
        </View>
        <View>
          <Text className="text-primary font-semibold">Rs. 3,499</Text>
        </View>
      </View>
      <View className="flex-row items-center justify-between justify-items-center">
        <View className="flex-row items-center justify-items-center gap-x-3">
          <View>
            <Image
              source={require("@/assets/products/product.png")}
              className="h-10 w-10 rounded-lg"
            />
          </View>
          <View>
            <Text>Ultima watch circle 2.0 smartwatch</Text>
          </View>
        </View>
        <View>
          <Text className="text-primary font-semibold">Rs. 3,499</Text>
        </View>
      </View>
    </View>
  </View>
);

export default TopSellingComponent;
