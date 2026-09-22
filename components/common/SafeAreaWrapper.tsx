import React from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { Box } from "@/components/design-system";
import { PageShell } from "@/components/design-system/compositions";

interface SafeAreaWrapperProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const SafeAreaWrapper = ({ children, style }: SafeAreaWrapperProps) => {
  return (
    <PageShell>
      <Box flex={1} direction="column" style={style}>
        {children ? children : null}
      </Box>
    </PageShell>
  );
};
