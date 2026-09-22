import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, type Edge } from "react-native-safe-area-context";
import type { StyleProp, ViewStyle } from "react-native";
import { Box } from "@/components/design-system/primitives";
import {
  Screen,
  type ScreenProps,
} from "@/components/design-system/primitives";
import type { BazarifyColorName } from "@/components/design-system/theme";

export type PageShellProps = {
  children: React.ReactNode;
  backgroundColor?: BazarifyColorName;
  contentBackgroundColor?: BazarifyColorName;
  edges?: Edge[];
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
};

export function PageShell({
  children,
  backgroundColor = "primary",
  contentBackgroundColor = "background",
  edges = ["top", "right", "bottom", "left"],
  style,
  contentStyle,
}: PageShellProps) {
  const screenProps: Pick<ScreenProps, "edges"> = { edges };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Screen
          {...screenProps}
          backgroundColor={backgroundColor}
          style={[{ flex: 1 }, style]}
        >
          <Box
            flex={1}
            backgroundColor={contentBackgroundColor}
            style={contentStyle}
          >
            {children}
          </Box>
        </Screen>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
