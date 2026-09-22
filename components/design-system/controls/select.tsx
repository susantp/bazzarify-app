import React from "react";
import {
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useBazarifyTheme } from "@/components/design-system/theme";
import { Text } from "../primitives/text";

export type SelectProps = {
  label?: string;
  value?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export function Select({
  label,
  value,
  placeholder = "Select an option",
  error,
  disabled = false,
  onPress,
  style,
  testID,
}: SelectProps) {
  const theme = useBazarifyTheme();

  return (
    <View style={style}>
      {label ? <Text variant="label">{label}</Text> : null}
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        accessibilityLabel={label ?? placeholder}
        disabled={disabled}
        onPress={onPress}
        testID={testID}
        style={({ pressed }) => [
          styles.control,
          {
            backgroundColor: theme.colors.surface,
            borderColor: error ? theme.colors.danger : theme.colors.border,
            borderRadius: theme.radii.md,
            minHeight: theme.dimensions.controlMd,
            opacity: disabled ? 0.5 : pressed ? 0.82 : 1,
            paddingHorizontal: theme.spacing.md,
          },
        ]}
      >
        <Text color={value ? "text" : "textMuted"}>{value ?? placeholder}</Text>
      </Pressable>
      {error ? (
        <Text variant="caption" color="danger">
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  control: {
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
