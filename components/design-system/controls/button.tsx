import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useBazarifyTheme } from "@/components/design-system/theme";
import type {
  BazarifyColorName,
  BazarifyTheme,
} from "@/components/design-system/theme";
import { Text } from "../primitives/text";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = Omit<PressableProps, "children" | "style"> & {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Button({
  label,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  style,
  ...props
}: ButtonProps) {
  const theme = useBazarifyTheme();
  const disabledState = disabled || loading;
  const colors = buttonColors[variant];
  const backgroundColor = theme.colors[colors.background];
  const foregroundColor = theme.colors[colors.foreground];

  return (
    <Pressable
      {...props}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabledState, busy: loading }}
      disabled={disabledState}
      style={({ pressed }) => [
        styles.base,
        buttonSizeStyles(theme, size),
        {
          backgroundColor,
          borderColor: theme.colors[colors.border],
          opacity: disabled ? 0.5 : pressed ? 0.82 : 1,
        },
        variant === "ghost" ? styles.ghost : styles.bordered,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={foregroundColor} />
      ) : (
        <Text variant="label" color={colors.foreground} selectable={false}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}

type ButtonColors = {
  background: BazarifyColorName;
  foreground: BazarifyColorName;
  border: BazarifyColorName;
};

const buttonColors: Record<ButtonVariant, ButtonColors> = {
  primary: {
    background: "primary",
    foreground: "textInverted",
    border: "primary",
  },
  secondary: {
    background: "surface",
    foreground: "text",
    border: "borderStrong",
  },
  ghost: {
    background: "background",
    foreground: "primary",
    border: "background",
  },
  danger: {
    background: "danger",
    foreground: "textInverted",
    border: "danger",
  },
};

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: "center",
  },
  bordered: {},
  ghost: { borderWidth: 0 },
});

function buttonSizeStyles(theme: BazarifyTheme, size: ButtonSize) {
  const sizes = {
    sm: {
      minHeight: theme.dimensions.controlSm,
      paddingHorizontal: theme.spacing.md,
    },
    md: {
      minHeight: theme.dimensions.controlMd,
      paddingHorizontal: theme.spacing.lg,
    },
    lg: {
      minHeight: theme.dimensions.controlLg,
      paddingHorizontal: theme.spacing.xl,
    },
  };

  return [sizes[size], { borderRadius: theme.radii.md }];
}
