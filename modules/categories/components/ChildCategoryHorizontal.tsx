import { TouchableOpacity, View } from "react-native";
import React from "react";
import { TCategoryWithImage } from "@/modules/product/schemas/CategorySchema";
import { ThemedText } from "@/components/ThemedText";
import CategoryAvatar from "@/modules/categories/components/CategoryAvatar";

const ChildCategoryHorizontal = (props: {
  onPress: () => void;
  item: TCategoryWithImage;
}) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View className="w-full flex-col items-center py-5">
        <CategoryAvatar item={props.item} size={100} />
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
