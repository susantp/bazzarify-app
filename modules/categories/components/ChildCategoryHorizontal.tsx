import { Image, TouchableOpacity, View } from "react-native";
import React from "react";
import { TCategoryWithImage } from "@/modules/product/schemas/CategorySchema";
import getFirstImageSource from "@/modules/core/utils/getFirstImageSource";
import { ThemedText } from "@/components/ThemedText";

const ChildCategoryHorizontal = (props: {
  onPress: () => void;
  item: TCategoryWithImage;
}) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View className="w-full flex-col items-center py-5">
        <Image
          source={getFirstImageSource({
            images: props.item.images,
            baseUrl: props.item.image_base_url,
          })}
          style={{
            width: 100,
            height: 100,
          }}
        />
        <ThemedText
          darkColor="#0000"
          ellipsizeMode={"tail"}
          numberOfLines={1}
          type="defaultSemiBold"
        >
          {props.item.name}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
};

export default ChildCategoryHorizontal;
