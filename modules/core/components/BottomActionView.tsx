import { Box, type BoxProps } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";
import React from "react";
import type { StyleProp, ViewStyle } from "react-native";

interface BottomActionViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const BottomActionView = ({ children, style }: BottomActionViewProps) => {
  const theme = useBazarifyTheme();
  const surfaceStyle: BoxProps["style"] = [
    styles.surface,
    {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.borderStrong,
    },
    style,
  ];

  return (
    <Box direction="column-reverse" style={surfaceStyle}>
      {children}
    </Box>
  );
};

const styles = {
  surface: {
    width: "100%" as const,
    borderWidth: 1,
  },
};

export default BottomActionView;
