import { Text, TextInput, View } from "react-native";
import React from "react";
import { InputProps } from "@/components/common";
import cn from "@/utils/tailwindHelper";
import { Ionicons } from "@expo/vector-icons";

const UsernameInput = ({
  value,
  onBlur,
  onChange,
  hasError,
  className,
  ...rest
}: InputProps) => (
  <>
    <TextInput
      value={value}
      onBlur={onBlur}
      defaultValue={rest.defaultValue}
      onChangeText={onChange}
      placeholder={rest.placeholder}
      className={cn("rounded-xl", "bg-white", "pl-16", className)}
    />
    <View className="absolute left-4 top-1/2 h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-slate-100">
      <Ionicons name="mail-outline" size={20} color="#64748B" />
    </View>
    {hasError && <Text className="text-red-600">{hasError.message}</Text>}
  </>
);

export default UsernameInput;
