import { Image, TouchableOpacity } from "react-native";
import React from "react";
import getFirstImageSource from "@/modules/core/utils/getFirstImageSource";
import { TCategoryWithImage } from "@/modules/product/schemas/CategorySchema";
import { ThemedText } from "@/components/ThemedText";

export type CategoryCardProps = {
  item: TCategoryWithImage;
  index?: number;
  cols: 2 | 3 | 4;
  hasImages: boolean;
  onPress: () => void;
};

const CategoryCard = ({
  item,
  cols,
  hasImages = false,
  onPress,
}: CategoryCardProps) => {
  return (
    item && (
      <TouchableOpacity
        className={`flex w-${(12 / cols).toString()}/12 flex-col items-center gap-y-2 p-2`}
        onPress={onPress}
      >
        <Image
          source={getFirstImageSource({
            images: item.images,
            baseUrl: item.icon_base_url,
          })}
          style={{
            height: 100,
            width: 100,
          }}
        />
        <ThemedText
          darkColor="#0000"
          ellipsizeMode={"tail"}
          numberOfLines={1}
          type="defaultSemiBold"
        >
          {item.name}
        </ThemedText>
      </TouchableOpacity>
    )
  );
};
export default CategoryCard;
