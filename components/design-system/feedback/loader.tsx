import React from "react";
import { ActivityIndicator } from "react-native";
import { useBazarifyTheme } from "@/components/design-system/theme";
import { Text } from "../primitives/text";
import { FeedbackContainer } from "./feedback-container";

export type LoaderProps = {
  label?: string;
  testID?: string;
};

export function Loader({ label = "Loading", testID }: LoaderProps) {
  const theme = useBazarifyTheme();

  return (
    <FeedbackContainer accessibilityLabel={label} testID={testID}>
      <ActivityIndicator color={theme.colors.primary} />
      <Text variant="caption" color="textMuted">
        {label}
      </Text>
    </FeedbackContainer>
  );
}
