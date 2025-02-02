import { Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import cn from "@/utils/tailwindHelper";

interface ScreenHeaderProps {
  title?: string;
  iconColor?: string;
  textClassname?: string;
}

const ScreenHeader = ({
  title,
  iconColor,
  textClassname,
}: ScreenHeaderProps) => {
  const canGoBack = router.canGoBack();
  return (
    <View
      className={cn(
        "z-10",
        "flex-row",
        "items-center",
        "justify-between",
        "px-1",
      )}
    >
      <TouchableOpacity
        activeOpacity={0.4}
        className="flex-row items-center gap-x-2 py-4"
        onPress={() => (canGoBack ? router.back() : router.dismissTo("/"))}
      >
        {canGoBack ? (
          <AntDesign size={18} name="left" color={iconColor ?? "white"} />
        ) : undefined}
        <Text
          className={cn(
            "text-xl",
            "font-semibold",
            "text-white",
            textClassname,
          )}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default ScreenHeader;
