import { Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const ScreenHeader = ({ title }: { title?: string }) => {
  const canGoBack = router.canGoBack();
  return (
    <View className="flex-row items-center justify-between px-1">
      <TouchableOpacity
        activeOpacity={0.4}
        className="flex-row items-center gap-x-2 py-4"
        onPress={() => (canGoBack ? router.back() : router.dismissTo("/"))}
      >
        {canGoBack ? (
          <AntDesign size={18} name="left" color="white" />
        ) : undefined}
        <Text className="text-xl font-semibold text-white">{title}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ScreenHeader;
