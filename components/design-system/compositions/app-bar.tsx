import React from "react";
import {
  Pressable,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Box } from "@/components/design-system/primitives/box";
import { Icon } from "@/components/design-system/media/icon";
import { Text } from "@/components/design-system/primitives/text";
import { useBazarifyTheme } from "@/components/design-system/theme";

export type AppBarProps = {
  title?: string;
  canGoBack?: boolean;
  interactive?: boolean;
  onBackPress?: () => void;
  iconColor?: string;
  titleColor?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export function AppBar({
  title,
  canGoBack = false,
  interactive = true,
  onBackPress,
  iconColor,
  titleColor,
  style,
  testID,
}: AppBarProps) {
  const theme = useBazarifyTheme();
  const foregroundColor = iconColor ?? theme.colors.textInverted;

  return (
    <Box
      testID={testID}
      direction="row"
      align="center"
      justify="space-between"
      paddingX="sm"
      backgroundColor="primary"
      style={[styles.bar, { minHeight: theme.dimensions.controlLg }, style]}
    >
      <Pressable
        accessibilityRole={interactive ? "button" : undefined}
        accessibilityLabel={interactive ? "Go back" : undefined}
        disabled={!interactive}
        onPress={onBackPress}
        style={({ pressed }) => [
          styles.back,
          { gap: theme.spacing.sm, paddingVertical: theme.spacing.lg },
          pressed && styles.pressed,
        ]}
      >
        {interactive && canGoBack ? (
          <Icon size={18}>
            <AntDesign name="left" size={18} color={foregroundColor} />
          </Icon>
        ) : null}
        <Text
          variant="bodyMedium"
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ color: titleColor ?? foregroundColor }}
        >
          {title}
        </Text>
      </Pressable>
    </Box>
  );
}

const styles = StyleSheet.create({
  bar: { zIndex: 10 },
  back: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
  },
  pressed: { opacity: 0.72 },
});
