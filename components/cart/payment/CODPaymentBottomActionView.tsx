import { Box, Button, Text } from "@/components/design-system";
import React from "react";

interface ICODPaymentMethodViewProps {
  totalPrice: number;
  cashPaymentFee: number;
  subTotalPrice: number;
  actionBtn: string;
  action: () => void;
}

const CODPaymentBottomActionView = ({
  totalPrice,
  cashPaymentFee,
  subTotalPrice,
  actionBtn,
  action,
}: ICODPaymentMethodViewProps) => {
  return (
    <Box direction="column" gap="lg" paddingX="lg" paddingY="huge">
      <Box direction="row" justify="space-between">
        <Text variant="bodyCompact">Subtotal</Text>
        <Text variant="bodyMedium">Rs. {subTotalPrice}</Text>
      </Box>
      <Box direction="row" justify="space-between">
        <Text variant="bodyCompact">Cash Payment Fee</Text>
        <Text variant="bodyMedium">Rs. {cashPaymentFee}</Text>
      </Box>
      <Box direction="row" justify="space-between">
        <Text variant="title">Total Amount</Text>
        <Text variant="title" color="primary">
          Rs. {totalPrice}
        </Text>
      </Box>
      <Button label={actionBtn} onPress={action} />
    </Box>
  );
};
export default CODPaymentBottomActionView;
