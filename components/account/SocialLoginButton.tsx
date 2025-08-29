import { Text, TouchableOpacity, View } from "react-native";
import { LoginProviderLiteral, providerMap } from "@/constants/account";
import React from "react";

const SocialLoginButton = ({
  provider,
  label,
  onPress,
}: {
  provider: LoginProviderLiteral;
  label: string;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex w-full items-center justify-center p-2 px-6"
    >
      <View className="w-full flex-row items-center justify-center rounded-xl border-2 border-gray-300 p-3">
        <View className="w-3/12">{providerMap[provider].icon}</View>
        <View className="w-9/12">
          <Text>
            {label} {providerMap[provider].label}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SocialLoginButton;
