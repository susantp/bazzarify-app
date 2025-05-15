import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { useRecoilValue } from "recoil";
import { screenDimensionAtom } from "@/atoms/screenDimensionAtom";
import { ItemProps } from "@/components";
import getImageSrc from "@/modules/core/utils/getImageSrc";

export interface FlashDealsProductCardProps {
  item: ItemProps;
}

function FlashDealsProductCard({ item }: FlashDealsProductCardProps) {
  const { width, height } = useRecoilValue(screenDimensionAtom);
  let imageSrc = undefined;
  if (item.images.length) {
    imageSrc = { uri: item.images[0].s3_path_url };
  } else {
    imageSrc = require("@/assets/products/product.png");
  }
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/products/[slug]",
          params: { slug: item.slug },
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
          source={getImageSrc({ item })}
          className="rounded-lg border border-gray-400 p-2"
        />
      </View>
    </TouchableOpacity>
  );
}

export default FlashDealsProductCard;
