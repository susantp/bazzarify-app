import React, { forwardRef } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { useBazarifyTheme } from "@/components/design-system/theme";
import { Text } from "../primitives/text";

export type InputProps = Omit<TextInputProps, "style"> & {
  label?: string;
  helperText?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>;
};

export const Input = forwardRef<TextInput, InputProps>(function Input(
  { label, helperText, error, containerStyle, style, ...props },
  ref,
) {
  const theme = useBazarifyTheme();
  const message = error ?? helperText;

  return (
    <View style={containerStyle}>
      {label ? <Text variant="label">{label}</Text> : null}
      <TextInput
        {...props}
        ref={ref}
        accessibilityLabel={props.accessibilityLabel ?? label}
        placeholderTextColor={
          props.placeholderTextColor ?? theme.colors.textMuted
        }
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.surface,
            borderColor: error ? theme.colors.danger : theme.colors.border,
            borderRadius: theme.radii.md,
            color: theme.colors.text,
            minHeight: theme.dimensions.controlMd,
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.sm,
          },
          style,
        ]}
      />
      {message ? (
        <Text variant="caption" color={error ? "danger" : "textMuted"}>
          {message}
        </Text>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  input: {
    borderWidth: StyleSheet.hairlineWidth,
  },
});
