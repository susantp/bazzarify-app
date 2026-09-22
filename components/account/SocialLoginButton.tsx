import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Box, Icon, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";
import { LoginProviderLiteral, providerMap } from "@/constants/account";

const SocialLoginButton = ({
  provider,
  label,
  onPress,
}: {
  provider: LoginProviderLiteral;
  label: string;
  onPress?: () => void;
}) => {
  const theme = useBazarifyTheme();
  const providerConfig = providerMap[provider];
  const accessibilityLabel = `${label} ${providerConfig.label}`;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={styles.outer}
    >
      <Box
        direction="row"
        align="center"
        justify="center"
        borderRadius="xl"
        gap="sm"
        style={[styles.inner, { borderColor: theme.colors.borderStrong }]}
      >
        <Box style={styles.iconColumn}>
          <Icon size={26}>{providerConfig.icon}</Icon>
        </Box>
        <Box style={styles.labelColumn}>
          <Text>{accessibilityLabel}</Text>
        </Box>
      </Box>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  outer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 8,
    width: "100%",
  },
  inner: {
    borderWidth: 2,
    padding: 12,
    width: "100%",
  },
  iconColumn: { flex: 0.25 },
  labelColumn: { flex: 0.75 },
});

export default SocialLoginButton;
