import { ItemProps, ItemVariant } from "@/components";
import { Text, View } from "react-native";
import React from "react";

const ProductPriceComponent = ({
  item,
  selectedVariant,
}: {
  item: ItemProps;
  selectedVariant?: ItemVariant;
}) => {
  const price = selectedVariant ? selectedVariant.price : item.base_price;
  return (
    <View className="border-b-2 border-gray-400 px-4 py-2">
      <View className="flex-row items-center justify-between">
        <View id="price" className="flex-row items-end gap-x-3">
          <Text className="text-md text-2xl font-bold text-orange-600">
            {Object.values(price).reverse().join(" ")}
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
