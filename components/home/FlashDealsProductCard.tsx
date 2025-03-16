import { ItemProps } from "@/components";
import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { useRecoilValue } from "recoil";
import { screenDimensionAtom } from "@/atoms/screenDimensionAtom";
import { CategoriesItemData } from "@/constants/categoriesItemData";

export type FlashDealsProductCardProps = {
  item: ItemProps | CategoriesItemData;
};

const FlashDealsProductCard = ({ item }: FlashDealsProductCardProps) => {
  const { width, height } = useRecoilValue(screenDimensionAtom);
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({ pathname: "/products/[slug]", params: { slug: item.id } })
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
          source={require("@/assets/products/product.png")}
          className="rounded-lg border border-gray-400 p-2"
        />
      </View>
    </TouchableOpacity>
  );
};

export default FlashDealsProductCard;
