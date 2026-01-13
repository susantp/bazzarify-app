import React from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const FullWidthActionBtn = ({
  handleOnPress,
  label,
  loading = false,
  disabled = false,
}: {
  handleOnPress: (event: GestureResponderEvent) => void;
  label: string;
  loading?: boolean;
  disabled?: boolean;
}) => {
  const isDisabled = disabled || loading;
  return (
    <View className="flex w-full px-6">
      <TouchableOpacity
        activeOpacity={0.8}
        className={`flex items-center justify-center rounded-full bg-primary py-3 ${isDisabled ? "opacity-60" : ""}`}
        onPress={handleOnPress}
        disabled={isDisabled}
      >
        <View className="flex-row items-center gap-x-2">
          {loading ? <ActivityIndicator color="#FFFFFF" /> : null}
          <Text className="text-xl font-bold text-white">{label}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default FullWidthActionBtn;
