import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Checkbox } from "expo-checkbox";

const LoginFormHelperText = () => {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <View className="w-full flex-row items-center justify-between px-6">
      <View className="flex-row items-center justify-center gap-x-2">
        <Checkbox value={checked} onValueChange={setChecked} color="#f47d58" />
        <Text>Remember me</Text>
      </View>
      <TouchableOpacity>
        <Text>Forget password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginFormHelperText;
