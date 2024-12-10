import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { ItemProps } from "@/components";
import { StarIcon } from "react-native-heroicons/solid";

export type ProductCardProps = {
  item: ItemProps;
  containerClasses?: string;
  cols: 2 | 3 | 4;
};
const ProductCard = ({ item, containerClasses, cols }: ProductCardProps) => {
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/(tabs)/products/[slug]",
          params: { slug: item.id },
        })
      }
      className={`flex w-${(12 / cols).toString()}/12 p-2`}
    >
      <View className="flex-col items-center justify-items-center rounded-lg border border-gray-200">
        <Image
          source={require("@/assets/products/product.png")}
          className="h-32 w-32 rounded-lg md:h-64 md:w-64"
        />
        <View id="content" className="flex-col items-start gap-y-2 p-2">
          <View>
            <Text className="text-md">
              {item.name.substring(0, 45).concat("...")}
            </Text>
          </View>
          <View className="flex flex-row">
            <View className="w-8/12">
              <ThemedText type={"subtitle"}>Rs {item.price}</ThemedText>
            </View>
            <View className="w-4/12 flex-row items-center justify-center gap-x-2">
              <StarIcon size={12} color={"#f47d58"} />
              <Text className="text-2md text-orange-600">{item.rating}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default ProductCard;
