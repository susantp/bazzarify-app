import { Text, TextInput, View } from "react-native";
import { EnvelopeIcon } from "react-native-heroicons/outline";
import React from "react";
import { InputProps } from "@/components/common";
import cn from "@/utils/tailwindHelper";

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
      <EnvelopeIcon size={20} strokeWidth={1.5} color="#64748B" />
    </View>
    {hasError && <Text className="text-red-600">{hasError.message}</Text>}
  </>
);

export default UsernameInput;
