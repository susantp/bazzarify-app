import React, { type ReactNode } from "react";
import { View } from "react-native";
import { useBazarifyTheme } from "@/components/design-system/theme";

export type FeedbackContainerProps = {
  children: ReactNode;
  accessibilityLabel?: string;
  testID?: string;
};

export function FeedbackContainer({
  children,
  accessibilityLabel,
  testID,
}: FeedbackContainerProps) {
  const theme = useBazarifyTheme();

  return (
    <View
      accessible={Boolean(accessibilityLabel)}
      accessibilityLabel={accessibilityLabel}
      style={{
        alignItems: "center",
        gap: theme.spacing.md,
        justifyContent: "center",
        padding: theme.spacing.xxl,
      }}
      testID={testID}
    >
      {children}
    </View>
  );
}
