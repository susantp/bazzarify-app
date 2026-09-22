import { Box, Icon, Input } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

const CardPaymentComponent = () => {
  const theme = useBazarifyTheme();

  return (
    <Box flex={1} direction="column" gap="xl" padding="sm">
      <Box
        direction="row"
        align="center"
        gap="sm"
        borderRadius="md"
        paddingX="sm"
        style={[styles.cardNumber, { borderColor: theme.colors.border }]}
      >
        <Icon size={24} color="primary">
          {({ color, size }) => (
            <MaterialCommunityIcons
              name="credit-card-outline"
              color={color}
              size={size}
            />
          )}
        </Icon>
        <Input
          containerStyle={styles.cardNumberInputContainer}
          style={styles.cardNumberInput}
          placeholder="Card number"
          keyboardType="number-pad"
          textContentType="creditCardNumber"
        />
      </Box>
      <Box direction="row" gap="lg">
        <Input
          containerStyle={styles.expiryInputContainer}
          style={styles.centeredInput}
          keyboardType="number-pad"
          placeholder="MM/YY"
          textContentType="creditCardExpiration"
        />
        <Input
          containerStyle={styles.cvvInputContainer}
          style={styles.centeredInput}
          keyboardType="number-pad"
          keyboardAppearance="dark"
          placeholder="CVV"
          textContentType="creditCardSecurityCode"
        />
      </Box>
      <Input
        placeholder="Name on card"
        containerStyle={styles.nameInputContainer}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  cardNumber: { borderWidth: 1 },
  cardNumberInputContainer: { flex: 1 },
  cardNumberInput: {
    borderWidth: 0,
    minHeight: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  expiryInputContainer: { width: 96 },
  cvvInputContainer: { width: 80 },
  centeredInput: { textAlign: "center" },
  nameInputContainer: { width: "100%" },
});

export default CardPaymentComponent;
