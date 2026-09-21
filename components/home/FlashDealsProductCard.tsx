import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { useAtomValue } from "jotai";
import { screenDimensionAtom } from "@/atoms/screenDimensionAtom";
import getFirstImageSource from "@/modules/core/utils/getFirstImageSource";
import { TOmittedProductWithImages } from "@/modules/product/schemas/ProductSchema";
import { getProductInventorySummary } from "@/modules/product/utils/getProductInventorySummary";

export interface FlashDealsProductCardProps {
  item: TOmittedProductWithImages;
}

function FlashDealsProductCard({ item }: FlashDealsProductCardProps) {
  const { width, height } = useAtomValue(screenDimensionAtom);
  const inventory = getProductInventorySummary(item);

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/products/[uuid]",
          params: { uuid: item.uuid },
        })
      }
      style={{
        alignContent: "center",
        justifyContent: "center",
        width: width * 0.33,
        height: height * 0.16,
        opacity: inventory.canPurchase === false ? 0.7 : 1,
      }}
    >
      <View className={`relative flex items-center`}>
        <Text
          style={{ right: 7 }}
          className="absolute z-10 rounded-bl-lg rounded-tr-lg bg-red-500 px-1 text-white"
        >
          -20%
        </Text>
        <Image
          style={{
            width: width * 0.3,
            height: height * 0.15,
          }}
          source={getFirstImageSource({
            images: item.images,
            baseUrl: item.image_base_url,
          })}
          className="rounded-lg border border-gray-400 p-2"
        />
        {inventory.message ? (
          <Text className="absolute bottom-1 rounded-md bg-black/70 px-2 py-1 text-xs text-white">
            {inventory.message}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(FlashDealsProductCard);
