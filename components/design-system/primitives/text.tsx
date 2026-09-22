import React from "react";
import {
  Text as NativeText,
  type TextProps,
  type TextStyle,
  type StyleProp,
} from "react-native";
import { useBazarifyTheme } from "@/components/design-system/theme";
import type {
  BazarifyColorName,
  BazarifyTheme,
} from "@/components/design-system/theme";

export type TextVariant = keyof BazarifyTheme["typography"];

export type BazarifyTextProps = Omit<TextProps, "style"> & {
  variant?: TextVariant;
  color?: BazarifyColorName;
  align?: TextStyle["textAlign"];
  style?: StyleProp<TextStyle>;
};

export function Text({
  variant = "body",
  color = "text",
  align,
  style,
  ...props
}: BazarifyTextProps) {
  const theme = useBazarifyTheme();

  return (
    <NativeText
      {...props}
      style={[
        theme.typography[variant],
        { color: theme.colors[color] },
        align ? { textAlign: align } : null,
        style,
      ]}
    />
  );
}
