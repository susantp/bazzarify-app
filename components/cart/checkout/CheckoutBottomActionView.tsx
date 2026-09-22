import React from "react";
import { Box, Button, Text } from "@/components/design-system";

interface ICheckoutBottomActionViewProps {
  totalPrice: number | undefined;
  btnLabel: string;
  deliveryPrice?: number;
  handlePress: () => void | undefined;
  disabled?: boolean;
  helperText?: string | null;
}

const CheckoutBottomActionView = ({
  totalPrice,
  btnLabel,
  deliveryPrice,
  handlePress,
  disabled = false,
  helperText = null,
}: ICheckoutBottomActionViewProps) => {
  return (
    <Box direction="column" gap="md" paddingX="lg" paddingY="huge">
      <Box direction="row" align="center" justify="space-between">
        <Box direction="column" gap="sm">
          <Text variant="title">
            Total:
            <Text variant="title" color="primary">{` Rs. ${totalPrice}`}</Text>
          </Text>
          <Text variant="caption">
            Delivery fee:
            <Text
              variant="caption"
              color="primary"
            >{` Rs. ${deliveryPrice}`}</Text>
          </Text>
        </Box>
        <Button
          variant="primary"
          size="sm"
          onPress={handlePress}
          disabled={disabled}
          label={btnLabel}
        />
      </Box>
      {helperText ? (
        <Text variant="caption" color="danger">
          {helperText}
        </Text>
      ) : null}
    </Box>
  );
};

export default CheckoutBottomActionView;
