import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";

export default function BlurredTabBarBackground() {
  return (
    <BlurView
      tint="systemChromeMaterial"
      intensity={100}
      style={StyleSheet.absoluteFill}
    />
  );
}
