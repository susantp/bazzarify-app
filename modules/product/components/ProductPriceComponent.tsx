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
  const requiresCustomerSelection =
    item.selection?.requires_customer_selection ?? (item.variants?.length || 0) > 1;
  const price = selectedVariant ? selectedVariant.price : item.base_price;
  const availabilityLabel = selectedVariant
    ? !selectedVariant.available
      ? "Unavailable"
      : selectedVariant.available_to_sell > 0
        ? `${selectedVariant.available_to_sell} left`
        : "Out of stock"
    : requiresCustomerSelection
      ? "Select a variant"
      : "Unavailable";

  const availabilityTone = selectedVariant
    ? selectedVariant.available && selectedVariant.available_to_sell > 0
      ? "text-green-700"
      : "text-red-600"
    : "text-red-600";
  return (
    <View className="border-b-2 border-gray-400 py-2">
      <View className="flex-row items-center justify-between">
        <View id="price" className="flex-row items-end">
          <Text className="text-md text-2xl font-bold text-primary">
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
      <View>
        <Text className={`text-sm font-medium ${availabilityTone}`}>
          {availabilityLabel}
        </Text>
      </View>
    </View>
  );
};

export default ProductPriceComponent;
