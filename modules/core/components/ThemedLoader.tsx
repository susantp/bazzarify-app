import { ActivityIndicator, View } from "react-native";
import { Colors } from "@/constants/Colors";
import cn from "@/utils/tailwindHelper";

export default function ThemedLoader({
  fullPage = false,
}: {
  fullPage?: boolean;
}) {
  let defaultClasses: string = "flex items-center justify-center bg-white";
  if (fullPage) {
    return (
      <View className={cn(defaultClasses, "h-screen")}>
        <ActivityIndicator color={Colors.light.tint} size="large" />
      </View>
    );
  }
  return (
    <View className={cn(defaultClasses)}>
      <ActivityIndicator color={Colors.light.tint} size="large" />
    </View>
  );
}
