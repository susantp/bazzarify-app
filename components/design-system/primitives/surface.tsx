import React from "react";
import { StyleSheet } from "react-native";
import { Box, type BoxProps } from "./box";
import { useBazarifyTheme } from "@/components/design-system/theme";
import type { BazarifyTheme } from "@/components/design-system/theme";

type RadiusToken = keyof BazarifyTheme["radii"];

export type SurfaceProps = Omit<
  BoxProps,
  "backgroundColor" | "borderRadius"
> & {
  tone?: "default" | "muted";
  bordered?: boolean;
  radius?: RadiusToken | number;
};

export function Surface({
  tone = "default",
  bordered = false,
  radius = "md",
  padding = "lg",
  style,
  ...props
}: SurfaceProps) {
  const theme = useBazarifyTheme();

  return (
    <Box
      {...props}
      backgroundColor={tone === "muted" ? "surfaceMuted" : "surface"}
      borderRadius={radius}
      padding={padding}
      style={[
        bordered
          ? {
              borderColor: theme.colors.border,
              borderWidth: StyleSheet.hairlineWidth,
            }
          : null,
        style,
      ]}
    />
  );
}
