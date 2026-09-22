import React from "react";
import {
  ScrollView,
  type ScrollViewProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import {
  SafeAreaView,
  type Edge,
  type SafeAreaViewProps,
} from "react-native-safe-area-context";
import { useBazarifyTheme } from "@/components/design-system/theme";
import type { BazarifyColorName } from "@/components/design-system/theme";

export type ScreenProps = Omit<SafeAreaViewProps, "style"> & {
  backgroundColor?: BazarifyColorName;
  scrollable?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  scrollViewProps?: Omit<ScrollViewProps, "contentContainerStyle" | "children">;
  style?: StyleProp<ViewStyle>;
};

export function Screen({
  children,
  backgroundColor = "background",
  edges = ["top", "right", "bottom", "left"] as Edge[],
  scrollable = false,
  contentContainerStyle,
  scrollViewProps,
  style,
  ...props
}: ScreenProps) {
  const theme = useBazarifyTheme();
  const background = { backgroundColor: theme.colors[backgroundColor] };

  return (
    <SafeAreaView {...props} edges={edges} style={[background, style]}>
      {scrollable ? (
        <ScrollView
          {...scrollViewProps}
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={contentContainerStyle}
        >
          {children}
        </ScrollView>
      ) : (
        children
      )}
    </SafeAreaView>
  );
}
