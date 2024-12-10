import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import {
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  LockOpenIcon,
} from "react-native-heroicons/outline";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className="text-sm" {...props} />
));
AlertDescription.displayName = "AlertDescription";
const UserPasswordInput = ({
  placeholder,
  inputPadding,
  defaultValue,
}: {
  placeholder: string;
  inputPadding: string;
  defaultValue: string;
}) => {
  const [showPassword, setShowPassword] = useState(true);
  return (
    <View className="relative w-full px-6">
      <TextInput
        defaultValue={defaultValue}
        secureTextEntry={showPassword}
        placeholder={placeholder}
        className={`rounded-md bg-white pl-14 ${inputPadding}`}
      />
      <View className="absolute inset-x-9 inset-y-2.5">
        {showPassword ? (
          <LockClosedIcon size={28} strokeWidth={1} color="gray" />
        ) : (
          <LockOpenIcon size={28} strokeWidth={1} color="gray" />
        )}
      </View>
      <TouchableOpacity
        className="absolute bottom-3 right-8"
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
    </View>
  );
};

export default UserPasswordInput;
