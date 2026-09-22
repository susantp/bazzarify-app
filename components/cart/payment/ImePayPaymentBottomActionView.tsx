import { Box, Button, Text } from "@/components/design-system";
import React from "react";

interface IImePayPaymentBottomActionViewProps {
  totalPrice: number;
  subTotalPrice: number;
  actionBtn: string;
}

const ImePayPaymentBottomActionView = ({
  totalPrice,
  subTotalPrice,
  actionBtn,
}: IImePayPaymentBottomActionViewProps) => {
  return (
    <Box direction="column" gap="lg" paddingX="lg" paddingY="huge">
      <Box direction="row" justify="space-between">
        <Text variant="bodyCompact">Subtotal</Text>
        <Text variant="bodyMedium">Rs. {subTotalPrice}</Text>
      </Box>
      <Box direction="row" justify="space-between">
        <Text variant="title">Total Amount</Text>
        <Text variant="title" color="primary">
          Rs. {totalPrice}
        </Text>
      </Box>
      <Button label={actionBtn} />
    </Box>
  );
};
export default ImePayPaymentBottomActionView;
