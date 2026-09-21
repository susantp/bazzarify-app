import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { InputProps } from "@/components/common";
import cn from "@/utils/tailwindHelper";
import { Ionicons } from "@expo/vector-icons";

interface PasswordInputProps extends InputProps {
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  showPassword: boolean;
}

const UserPasswordInput = ({
  value,
  setShowPassword,
  showPassword,
  onBlur,
  onChange,
  hasError,
  className,
}: PasswordInputProps) => {
  return (
    <>
      <TextInput
        value={value}
        onBlur={onBlur}
        onChangeText={onChange}
        secureTextEntry={showPassword}
        placeholder="Password"
        className={cn(
          "rounded-xl",
          "bg-white",
          "pl-16",
          "text-black",
          className,
        )}
      />
      <View className="absolute left-4 top-1/2 h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-slate-100">
        {showPassword ? (
          <Ionicons name="lock-closed-outline" size={20} color="#64748B" />
        ) : (
          <Ionicons name="lock-open-outline" size={20} color="#64748B" />
        )}
      </View>
      <TouchableOpacity
        className="absolute right-4 top-1/2 -translate-y-1/2"
        onPress={() => setShowPassword(!showPassword)}
      >
        <View className="h-9 w-9 items-center justify-center rounded-full bg-slate-100">
          {showPassword ? (
            <Ionicons name="eye-off-outline" size={20} color="#64748B" />
          ) : (
            <Ionicons name="eye-outline" size={20} color="#64748B" />
          )}
        </View>
      </TouchableOpacity>
      {hasError && <Text className="text-red-600">{hasError.message}</Text>}
    </>
  );
};

export default UserPasswordInput;
