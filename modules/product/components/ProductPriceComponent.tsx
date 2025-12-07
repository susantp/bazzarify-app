import { Text, View } from "react-native";
import React from "react";
import { TProductWithVariantAndImage } from "@/modules/product/schemas/ProductWithVariantAndImageSchema";
import { TVariantListWithImage } from "@/modules/product/schemas/VariantSchema";

const ProductPriceComponent = ({
  item,
  currency,
  selectedVariant,
}: {
  item: TProductWithVariantAndImage;
  selectedVariant?: TVariantListWithImage;
  currency: { code: string };
}) => {
  const price = selectedVariant ? selectedVariant.price : item.base_price;
  return (
    <View className="border-b-2 border-gray-400 py-2">
      <View className="flex-row items-center justify-between">
        <View id="price" className="flex-row items-end">
          <Text className="text-md text-primary text-2xl font-bold">
            {currency.code.concat(" ").concat(String(price))}
          </Text>
          {/*<Text className="text-sm text-gray-600 line-through">Rs. 3,499</Text>*/}
        </View>
        {/*<View id="discount" className="relative flex items-center">*/}
        {/*  <DiscountBannerIcon />*/}
        {/*  <Text className="absolute inset-x-2.5 inset-y-2.5 flex items-center pl-3 text-sm text-white">*/}
        {/*    -8%*/}
        {/*  </Text>*/}
        {/*</View>*/}
      </View>
      {/*<View>*/}
      {/*  <Text className="text-gray-500">*/}
      {/*    you're saving upto rs. 2,000 don't miss it*/}
      {/*  </Text>*/}
      {/*</View>*/}
    </View>
  );
};

export default ProductPriceComponent;
