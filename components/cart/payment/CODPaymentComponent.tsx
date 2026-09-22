import { Box, Icon, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";

const CODPaymentComponent = () => {
  const theme = useBazarifyTheme();

  return (
    <Box flex={1}>
      <Box
        style={[styles.separator, { backgroundColor: theme.colors.border }]}
      />
      <Box direction="row" gap="sm" padding="sm">
        <Icon size={24} color="primary">
          {({ color, size }) => (
            <Ionicons name="cash-outline" color={color} size={size} />
          )}
        </Icon>
        <Box flex={1} gap="sm">
          <Text variant="body" style={styles.justified}>
            - You may pay in cash to our courier upon receiving your parcel at
            the doorstep
          </Text>
          <Text variant="body" style={styles.justified}>
            - Before agreeing to receive the parcel, check if your delivery
            status has been updated to 'Out for Delivery'
          </Text>
          <Text variant="body" style={styles.justified}>
            - Before receiving, confirm that the airway bill shows that the
            parcel is from Bazzarify.
          </Text>
          <Text variant="body" style={styles.justified}>
            - Before you make payment to the courier, confirm your order number,
            sender information and tracking number on the parcel
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  separator: { height: 16 },
  justified: { textAlign: "justify" },
});

export default CODPaymentComponent;
