import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { IProductVariantSelectorProps } from "@/modules/product/hooks/useProductScreen";
import getFirstImageSource from "@/modules/core/utils/getFirstImageSource";

const ProductVariantSelector = ({
  variants,
  onPress,
  selectedVariant,
}: IProductVariantSelectorProps) => {
  return (
    <View className="flex-col gap-y-3 border-b-2 border-gray-400 px-4 py-2">
      <View>
        <Text className="text-xl font-semibold">
          Option:{" "}
          {selectedVariant?.name || (
            <Text className="text-red-600">Select the option</Text>
          )}
        </Text>
      </View>
      <View className="flex-row items-center justify-items-center gap-x-3">
        {variants.map((variant) => (
          <TouchableOpacity
            key={variant.uuid}
            onPress={() => onPress(variant)}
            className="h-10 w-10 rounded-full border-2 border-orange-600 p-0.5"
          >
            <View className="h-full w-full rounded-full bg-black">
              <Image
                source={getFirstImageSource({
                  images: variant.images,
                  baseUrl: variant.image_base_url,
                })}
                className="h-full w-full rounded-full"
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
export default ProductVariantSelector;
