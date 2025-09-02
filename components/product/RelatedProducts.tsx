import { Text, View } from "react-native";
import React from "react";

const RelatedProducts = () => (
  <View className="p-4">
    <View id="voucher-info" className="flex-col gap-y-3 rounded-xl px-3 py-2">
      <View className="flex-row justify-between">
        <Text className="text-xl font-semibold text-orange-600">
          Related Products
        </Text>
        <Text>See more</Text>
      </View>
      {/*<View className="flex-row">*/}
      {/*  <ProductCard cols={2} item={popularItemsData[0]} />*/}
      {/*  <ProductCard cols={2} item={popularItemsData[0]} />*/}
      {/*</View>*/}
      {/*<View className="flex-row">*/}
      {/*  <ProductCard cols={2} item={popularItemsData[0]} />*/}
      {/*  <ProductCard cols={2} item={popularItemsData[0]} />*/}
      {/*</View>*/}
    </View>
  </View>
);

export default RelatedProducts;
