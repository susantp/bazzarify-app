import { Text, TextInput, View } from "react-native";
import React from "react";
import { InputProps } from "@/components/common";
import cn from "@/utils/tailwindHelper";
import { AntDesign } from "@expo/vector-icons";

const NameInput = ({
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
      placeholder="Your name"
      className={cn("rounded-xl", "bg-white", "pl-14", className)}
    />
    <View className="absolute inset-x-9 inset-y-3">
      <AntDesign name="user" size={28} strokeWidth={1} color="gray" />
    </View>
    {hasError && <Text className="text-red-600">This is required.</Text>}
  </>
);

export default NameInput;
