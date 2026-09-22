import React from "react";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { useBazarifyTheme } from "@/components/design-system/theme";

export type DividerProps = {
  orientation?: "horizontal" | "vertical";
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export function Divider({
  orientation = "horizontal",
  style,
  testID,
}: DividerProps) {
  const theme = useBazarifyTheme();

  return (
    <View
      testID={testID}
      style={[
        orientation === "horizontal" ? styles.horizontal : styles.vertical,
        { backgroundColor: theme.colors.border },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  horizontal: { height: StyleSheet.hairlineWidth, width: "100%" },
  vertical: { height: "100%", width: StyleSheet.hairlineWidth },
});
