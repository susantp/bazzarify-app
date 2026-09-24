import { useBottomTabBarHeight } from "expo-router/js-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function useBottomTabOverflow() {
  const tabHeight = useBottomTabBarHeight();
  const { bottom } = useSafeAreaInsets();
  return tabHeight - bottom;
}
