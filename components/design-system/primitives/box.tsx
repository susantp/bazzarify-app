import React from "react";
import {
  View,
  type ViewProps,
  type ViewStyle,
  type StyleProp,
} from "react-native";
import { useBazarifyTheme } from "@/components/design-system/theme";
import type {
  BazarifyColorName,
  BazarifyTheme,
} from "@/components/design-system/theme";

type SpacingToken = keyof BazarifyTheme["spacing"];
type RadiusToken = keyof BazarifyTheme["radii"];

export type BoxProps = Omit<ViewProps, "style"> & {
  backgroundColor?: BazarifyColorName;
  padding?: SpacingToken | number;
  paddingX?: SpacingToken | number;
  paddingY?: SpacingToken | number;
  gap?: SpacingToken | number;
  borderRadius?: RadiusToken | number;
  direction?: ViewStyle["flexDirection"];
  align?: ViewStyle["alignItems"];
  justify?: ViewStyle["justifyContent"];
  flex?: ViewStyle["flex"];
  style?: StyleProp<ViewStyle>;
};

function resolveToken(
  value: SpacingToken | number | undefined,
  tokens: BazarifyTheme["spacing"],
) {
  return typeof value === "number" ? value : value ? tokens[value] : undefined;
}

export function Box({
  backgroundColor,
  padding,
  paddingX,
  paddingY,
  gap,
  borderRadius,
  direction,
  align,
  justify,
  flex,
  style,
  ...props
}: BoxProps) {
  const theme = useBazarifyTheme();

  return (
    <View
      {...props}
      style={[
        backgroundColor
          ? { backgroundColor: theme.colors[backgroundColor] }
          : null,
        padding !== undefined
          ? { padding: resolveToken(padding, theme.spacing) }
          : null,
        paddingX !== undefined
          ? { paddingHorizontal: resolveToken(paddingX, theme.spacing) }
          : null,
        paddingY !== undefined
          ? { paddingVertical: resolveToken(paddingY, theme.spacing) }
          : null,
        gap !== undefined ? { gap: resolveToken(gap, theme.spacing) } : null,
        borderRadius !== undefined
          ? {
              borderRadius:
                typeof borderRadius === "number"
                  ? borderRadius
                  : theme.radii[borderRadius],
            }
          : null,
        direction ? { flexDirection: direction } : null,
        align ? { alignItems: align } : null,
        justify ? { justifyContent: justify } : null,
        flex !== undefined ? { flex } : null,
        style,
      ]}
    />
  );
}
