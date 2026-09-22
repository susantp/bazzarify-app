import ShippingCoupon from "@/components/common/CouponComponent";
import { FlatList } from "react-native";
import React from "react";
import { Box, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";

interface VoucherListProps {
  style?: object;
}

const VoucherList = ({ style }: VoucherListProps) => {
  const theme = useBazarifyTheme();
  const VOUCHERS = [
    { id: "shipping-1" },
    { id: "shipping-2" },
    { id: "shipping-3" },
  ];
  return (
    <Box direction="column" style={style}>
      <Box
        direction="column"
        gap="sm"
        borderRadius="xl"
        padding="lg"
        style={{ borderWidth: 1, borderColor: theme.colors.borderStrong }}
      >
        <Text variant="title">Voucher</Text>
        <FlatList
          contentContainerStyle={{ columnGap: 20 }}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={VOUCHERS}
          keyExtractor={(item) => item.id}
          renderItem={() => <ShippingCoupon />}
        />
      </Box>
    </Box>
  );
};

export default VoucherList;
