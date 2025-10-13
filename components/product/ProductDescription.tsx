import { Text, View } from "react-native";
import React from "react";
import { LexicalContentView } from "@/modules/core/components/LexicalContentView";
import { TProductWithVariantAndImage } from "@/modules/product/schemas/ProductWithVariantAndImageSchema";

const ProductDescription = ({
  product,
}: {
  product: TProductWithVariantAndImage;
}) => (
  <View className="p-4">
    <View
      id="voucher-info"
      className="flex-col gap-y-3 rounded-xl border border-gray-400 px-3 py-2"
    >
      <Text className="text-xl font-semibold">Description</Text>
      <LexicalContentView value={product.description} />
      <View className="flex items-center justify-items-center">
        <Text className="text-md text-orange-600">See more</Text>
      </View>
    </View>
  </View>
);

export default ProductDescription;
