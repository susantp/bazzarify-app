import React from "react";
import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const FullWidthActionBtn = ({
  handleOnPress,
  label,
}: {
  handleOnPress: (event: GestureResponderEvent) => void;
  label: string;
}) => {
  return (
    <View className="flex w-full px-6">
      <TouchableOpacity
        activeOpacity={0.8}
        className="bg-primary flex items-center justify-center rounded-full py-3"
        onPress={handleOnPress}
      >
        <Text className="text-xl font-bold text-white">{label}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default FullWidthActionBtn;
