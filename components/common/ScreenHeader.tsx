import { TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import cn from "@/utils/tailwindHelper";
import { ThemedText } from "@/components/ThemedText";

interface ScreenHeaderProps {
  title?: string;
  iconColor?: string;
  textClassname?: string;
  containerClassname?: string;
}

const ScreenHeader = ({
  title,
  iconColor,
  textClassname,
  containerClassname,
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
        "bg-orange-600",
        containerClassname,
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
        <View style={{ flex: 1 }}>
          <ThemedText
            darkColor="#ffff"
            lightColor="#ffff"
            ellipsizeMode={"tail"}
            numberOfLines={1}
            type="defaultSemiBold"
          >
            {title}
          </ThemedText>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default ScreenHeader;
