import React from "react";
import { Text, TextInput, View } from "react-native";
import { InputProps } from "@/components/common";
import cn from "@/utils/tailwindHelper";

const NumberInput = ({
  value,
  onBlur,
  onChange,
  hasError,
  icon,
  className,
  ...props
}: InputProps) => (
  <>
    <TextInput
      keyboardType="number-pad"
      value={value}
      defaultValue={props.defaultValue}
      onBlur={onBlur}
      onChangeText={onChange}
      placeholder={props.placeholder}
      className={cn("rounded-md", "bg-white", "pl-14", className)}
    />
    {icon && <View className="absolute inset-x-9 inset-y-4">{icon}</View>}
    {hasError && <Text className="text-red-600">{hasError.message}</Text>}
  </>
);

export default NumberInput;
