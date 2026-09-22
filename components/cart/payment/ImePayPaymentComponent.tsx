import { Box, Icon, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";
import { ImePayIcon } from "@/components/common/icons";
import React from "react";
import { StyleSheet } from "react-native";

const ImePayPaymentComponent = () => {
  const theme = useBazarifyTheme();

  return (
    <Box flex={1}>
      <Box
        direction="row"
        gap="sm"
        paddingX="sm"
        paddingY="sm"
        style={styles.introduction}
      >
        <Icon size={24}>
          <ImePayIcon />
        </Icon>
        <Box flex={1}>
          <Text variant="body" style={styles.justified}>
            Pay with your IME Pay Account. Please make sure you have enough
            balance in your account.
          </Text>
        </Box>
      </Box>
      <Box
        gap="sm"
        paddingX="md"
        paddingY="huge"
        style={{ backgroundColor: theme.colors.surfaceMuted }}
      >
        <Text variant="body" color="textMuted">
          "You will be redirected to you IME Pay account to complete payment:"
        </Text>
        <Text variant="body" color="textMuted">
          1. Login to your IME Pay account using your IME Pay ID and your PIN.
        </Text>
        <Text variant="body" color="textMuted">
          2. Ensure your IME Pay account is activate and has sufficient balance.
        </Text>
        <Text variant="body" color="textMuted">
          3. Enter OTP (one time password) sent to your registered mobile
          number.
        </Text>
        <Text variant="body" color="textMuted">
          ***Login with your IME Pay mobile and PIN.***
        </Text>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  introduction: { paddingBottom: 40 },
  justified: { textAlign: "justify" },
});

export default ImePayPaymentComponent;
