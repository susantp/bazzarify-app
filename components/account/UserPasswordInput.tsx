import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { InputProps } from "@/components/common";
import { Ionicons } from "@expo/vector-icons";
import { Box, Icon, Input, useBazarifyTheme } from "@/components/design-system";

interface PasswordInputProps extends InputProps {
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  showPassword: boolean;
}

const UserPasswordInput = ({
  value,
  setShowPassword,
  showPassword,
  onBlur,
  onChange,
  hasError,
}: PasswordInputProps) => {
  const theme = useBazarifyTheme();

  return (
    <>
      <Input
        value={value}
        onBlur={onBlur}
        onChangeText={onChange}
        secureTextEntry={showPassword}
        placeholder="Password"
        error={hasError?.message}
        style={styles.input}
      />
      <Box
        align="center"
        justify="center"
        borderRadius="pill"
        style={[
          styles.iconSurface,
          { backgroundColor: theme.colors.surfaceMuted },
        ]}
      >
        <Icon size={20} color="textMuted">
          {({ color, size }) => (
            <Ionicons
              name={showPassword ? "lock-closed-outline" : "lock-open-outline"}
              size={size}
              color={color}
            />
          )}
        </Icon>
      </Box>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={showPassword ? "Hide password" : "Show password"}
        testID="password-visibility-toggle"
        onPress={() => setShowPassword(!showPassword)}
        style={styles.visibilityButton}
      >
        <Box
          align="center"
          justify="center"
          borderRadius="pill"
          style={[
            styles.iconSurface,
            { backgroundColor: theme.colors.surfaceMuted },
          ]}
        >
          <Icon size={20} color="textMuted">
            {({ color, size }) => (
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={size}
                color={color}
              />
            )}
          </Icon>
        </Box>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 64,
  },
  iconSurface: {
    height: 36,
    left: 16,
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -18 }],
    width: 36,
  },
  visibilityButton: {
    position: "absolute",
    right: 16,
    top: "50%",
    transform: [{ translateY: -18 }],
  },
});

export default UserPasswordInput;
