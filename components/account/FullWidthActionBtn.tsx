import React from "react";
import {
  Pressable,
  StyleSheet,
  type GestureResponderEvent,
} from "react-native";
import { Box, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";

const FullWidthActionBtn = ({
  handleOnPress,
  label,
  disabled,
}: {
  handleOnPress: (event: GestureResponderEvent) => void;
  label: string;
  disabled: boolean;
}) => {
  const theme = useBazarifyTheme();

  return (
    <Box paddingX="xxl" style={styles.container}>
      <Pressable
        disabled={disabled}
        onPress={handleOnPress}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ disabled }}
        style={({ pressed }) => [
          styles.action,
          {
            backgroundColor: theme.colors.primary,
            opacity: disabled ? 0.6 : pressed ? 0.8 : 1,
          },
        ]}
      >
        <Text
          variant="title"
          color="textInverted"
          style={styles.label}
          selectable={false}
        >
          {label}
        </Text>
      </Pressable>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%" },
  action: {
    alignItems: "center",
    borderRadius: 999,
    justifyContent: "center",
    paddingVertical: 12,
    width: "100%",
  },
  label: { fontWeight: "700" },
});
export default FullWidthActionBtn;
