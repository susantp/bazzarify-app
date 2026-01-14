import React from "react";
import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import cn from "@/utils/tailwindHelper";

const FullWidthActionBtn = ({
  handleOnPress,
  label,
  disabled,
}: {
  handleOnPress: (event: GestureResponderEvent) => void;
  label: string;
  disabled: boolean;
}) => {
  return (
    <View className="flex w-full px-6">
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.8}
        className={cn(
          `flex items-center justify-center rounded-full bg-primary py-3`,
          disabled && `bg-primary/60`,
        )}
        onPress={handleOnPress}
      >
        <Text className="text-xl font-bold text-white">{label}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default FullWidthActionBtn;
