import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { useAtomValue } from "jotai";
import { screenDimensionAtom } from "@/atoms/screenDimensionAtom";
import getFirstImageSource from "@/modules/core/utils/getFirstImageSource";
import { IProductWithImage } from "@/modules/product/types/product";

export interface FlashDealsProductCardProps {
  item: IProductWithImage;
}

export default function FlashDealsProductCard({
  item,
}: FlashDealsProductCardProps) {
  const { width, height } = useAtomValue(screenDimensionAtom);

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
          source={getFirstImageSource({ item: item })}
          className="rounded-lg border border-gray-400 p-2"
        />
      </View>
    </TouchableOpacity>
  );
}
