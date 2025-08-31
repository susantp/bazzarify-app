import { router } from "expo-router";
import { Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ICategory } from "@/modules/product/types/category";

export type CategoryCardProps = {
  item: ICategory;
  index?: number;
  cols: 2 | 3 | 4;
};

const CategoryCard = ({ item, cols }: CategoryCardProps) => (
  <TouchableOpacity
    className={`flex w-${(12 / cols).toString()}/12 items-center px-2 py-2`}
    onPress={() =>
      router.push({
        pathname: "/categories/[id]",
        params: { id: item.uuid },
      })
    }
  >
    <Image
      source={require("@/assets/products/cat-img.png")}
      className={`h-28 w-24 md:h-56 md:w-48`}
    />
    <Text>{item.name.substring(0, 10)}</Text>
  </TouchableOpacity>
);
export default CategoryCard;
