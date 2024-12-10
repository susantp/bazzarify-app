import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const ChildCategoryHorizontal = (props: { onPress: () => void; item: any }) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View className="px-2">
        <View className="w-full flex-col items-center px-1">
          <Image
            source={require("@/assets/products/cat-img.png")}
            className={`h-28 w-20`}
          />
          <Text className="w-20 text-sm">{props.item.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChildCategoryHorizontal;
