import { Text, View } from "react-native";
import ProductCard from "@/components/common/ProductCard";
import { popularItemsData } from "@/constants/popularItemsData";
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
      <View className="flex-row">
        <ProductCard
          cols={2}
          item={popularItemsData[0]}
          containerClasses={`w-6/12 h-full py-2 px-1 bg-white`}
        />
        <ProductCard
          cols={2}
          item={popularItemsData[0]}
          containerClasses={`w-6/12 h-full py-2 px-1 bg-white`}
        />
      </View>
      <View className="flex-row">
        <ProductCard
          cols={2}
          item={popularItemsData[0]}
          containerClasses={`w-6/12 h-full py-2 px-1 bg-white`}
        />
        <ProductCard
          cols={2}
          item={popularItemsData[0]}
          containerClasses={`w-6/12 h-full py-2 px-1 bg-white`}
        />
      </View>
    </View>
  </View>
);

export default RelatedProducts;
