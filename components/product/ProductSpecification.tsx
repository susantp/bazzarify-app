import { Text, View } from "react-native";
import React from "react";
import { TProductWithVariantAndImage } from "@/modules/product/schemas/ProductWithVariantAndImageSchema";
import { LexicalContentView } from "@/modules/core/components/LexicalContentView";

const ProductSpecification = ({
  product,
}: {
  product: TProductWithVariantAndImage;
}) => {
  return (
    <View className="p-4">
      <View
        id="voucher-info"
        className="flex-col gap-y-3 rounded-xl border border-gray-400 px-3 py-2"
      >
        <Text className="text-xl font-semibold">Specification</Text>
        <View className="flex-col gap-y-2">
          <LexicalContentView value={product.highlights} />
        </View>
      </View>
    </View>
  );
};
export default ProductSpecification;
