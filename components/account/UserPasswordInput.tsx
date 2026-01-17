import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import {
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  LockOpenIcon,
} from "react-native-heroicons/outline";
import { InputProps } from "@/components/common";
import cn from "@/utils/tailwindHelper";

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
          <LockClosedIcon size={20} strokeWidth={1.5} color="#64748B" />
        ) : (
          <LockOpenIcon size={20} strokeWidth={1.5} color="#64748B" />
        )}
      </View>
      <TouchableOpacity
        className="absolute right-4 top-1/2 -translate-y-1/2"
        onPress={() => setShowPassword(!showPassword)}
      >
        <View className="h-9 w-9 items-center justify-center rounded-full bg-slate-100">
          {showPassword ? (
            <EyeSlashIcon size={20} strokeWidth={1.5} color="#64748B" />
          ) : (
            <EyeIcon size={20} strokeWidth={1.5} color="#64748B" />
          )}
        </View>
      </TouchableOpacity>
      {hasError && <Text className="text-red-600">{hasError.message}</Text>}
    </>
  );
};

export default UserPasswordInput;
