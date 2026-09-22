import React, { type ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { useBazarifyTheme } from "@/components/design-system/theme";
import type { BazarifyColorName } from "@/components/design-system/theme";

export type IconProps = {
  children: ReactNode | ((props: { color: string; size: number }) => ReactNode);
  size?: number;
  color?: BazarifyColorName;
  accessibilityLabel?: string;
};

export function Icon({
  children,
  size = 24,
  color = "text",
  accessibilityLabel,
}: IconProps) {
  const theme = useBazarifyTheme();

  return (
    <View
      accessible={Boolean(accessibilityLabel)}
      accessibilityLabel={accessibilityLabel}
      style={[styles.base, { height: size, width: size }]}
    >
      {typeof children === "function"
        ? children({ color: theme.colors[color], size })
        : children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: "center", justifyContent: "center" },
});
