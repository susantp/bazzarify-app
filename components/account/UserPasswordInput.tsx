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

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className="text-sm" {...props} />
));
AlertDescription.displayName = "AlertDescription";

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
        className={cn("rounded-xl", "bg-white", "pl-14", className)}
      />
      <View className="absolute inset-x-9 inset-y-3">
        {showPassword ? (
          <LockClosedIcon size={28} strokeWidth={1} color="gray" />
        ) : (
          <LockOpenIcon size={28} strokeWidth={1} color="gray" />
        )}
      </View>
      <TouchableOpacity
        className="absolute inset-y-3.5 right-10"
        onPress={() => setShowPassword(!showPassword)}
      >
        <View>
          {showPassword ? (
            <EyeSlashIcon size={28} strokeWidth={1} color="gray" />
          ) : (
            <EyeIcon size={28} strokeWidth={1} color="gray" />
          )}
        </View>
      </TouchableOpacity>
      {hasError && <Text className="text-red-600">{hasError.message}</Text>}
    </>
  );
};

export default UserPasswordInput;
