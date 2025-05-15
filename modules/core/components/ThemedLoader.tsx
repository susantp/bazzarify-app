import { ActivityIndicator, View } from "react-native";
import { Colors } from "@/constants/Colors";

export default function ThemedLoader() {
  return (
    <View className="flex h-screen items-center justify-center bg-white">
      <ActivityIndicator color={Colors.light.tint} size="large" />
    </View>
  );
}
