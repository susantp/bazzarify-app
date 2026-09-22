import React from "react";
import { Box, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";
import type { StyleProp, ViewStyle } from "react-native";

interface ShippingCouponProps {
  style?: StyleProp<ViewStyle>;
}

const ShippingCoupon = ({ style }: ShippingCouponProps) => {
  const theme = useBazarifyTheme();

  return (
    <Box direction="row" paddingY="sm" style={[styles.container, style]}>
      <Box
        align="center"
        justify="center"
        gap="xs"
        borderRadius="md"
        paddingX="lg"
        paddingY="xs"
        backgroundColor="primarySurface"
        style={[styles.amount, { borderColor: theme.colors.border }]}
      >
        <Text variant="title" color="success">
          Rs. 130
        </Text>
        <Text variant="bodyCompact" color="success">
          Min. Spend Rs. 799
        </Text>
      </Box>
      <Box
        direction="column"
        justify="center"
        gap="xs"
        borderRadius="md"
        paddingX="lg"
        paddingY="sm"
        backgroundColor="primarySurface"
        style={[styles.details, { borderColor: theme.colors.border }]}
      >
        <Box direction="row" align="center" gap="sm">
          <Text variant="title" color="success">
            Free Shipping
          </Text>
          <Box
            borderRadius="pill"
            paddingX="sm"
            paddingY="xs"
            style={{ backgroundColor: theme.colors.primarySurface }}
          >
            <Text variant="bodyCompact" color="success">
              T&C
            </Text>
          </Box>
        </Box>
        <Text variant="bodyCompact" color="success">
          Selected sellers
        </Text>
        <Text variant="bodyCompact" color="success">
          Expires in
        </Text>
        <Box direction="row" align="center" justify="space-between" gap="sm">
          <Text variant="bodyCompact">08:15:08</Text>
          <Box
            borderRadius="md"
            paddingX="md"
            paddingY="xs"
            backgroundColor="danger"
          >
            <Text variant="bodyCompact" color="textInverted">
              Collect
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const styles = {
  container: { height: 128 },
  amount: { borderWidth: 1, height: "100%" as const },
  details: { borderWidth: 1, flex: 1, height: "100%" as const },
};

export default ShippingCoupon;
