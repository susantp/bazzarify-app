import { Box } from "@/components/design-system/primitives";
import type { ViewProps } from "react-native";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  return (
    <Box
      {...otherProps}
      style={[
        lightColor || darkColor
          ? { backgroundColor: lightColor ?? darkColor }
          : undefined,
        style,
      ]}
    />
  );
}
