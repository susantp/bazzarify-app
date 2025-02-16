import { Text, TextInput, View } from "react-native";
import { EnvelopeIcon } from "react-native-heroicons/outline";
import React from "react";
import { InputProps } from "@/components/common";

const UsernameInput = ({ value, onBlur, onChange, hasError }: InputProps) => (
  <>
    <TextInput
      value={value}
      onBlur={onBlur}
      onChangeText={onChange}
      placeholder="Your email/number"
      className={`rounded-md bg-white pl-14`}
    />
    <View className="absolute inset-x-9 inset-y-3">
      <EnvelopeIcon size={28} strokeWidth={1} color="gray" />
    </View>
    {hasError && <Text className="text-red-600">This is required.</Text>}
  </>
);

export default UsernameInput;
