import React, { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Checkbox } from "expo-checkbox";
import { router } from "expo-router";
import { Box, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";

const LoginFormHelperText = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const theme = useBazarifyTheme();

  return (
    <Box
      direction="row"
      align="center"
      justify="space-between"
      paddingX="xxl"
      style={styles.container}
    >
      <Box direction="row" align="center" justify="center" gap="sm">
        <Checkbox
          value={checked}
          onValueChange={setChecked}
          color={theme.colors.primary}
        />
        <Text>Remember me</Text>
      </Box>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Forget password"
        onPress={() => router.push("/auth/request-password-reset")}
      >
        <Text color="primary">Forget password</Text>
      </Pressable>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%" },
});

export default LoginFormHelperText;
