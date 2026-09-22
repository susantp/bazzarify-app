import React, { ReactNode } from "react";
import { Box, Image, Text } from "@/components/design-system";
import { TCartItem } from "@/modules/order/schemas/orderSchema";

interface OrderItemProps {
  items: TCartItem[] | undefined;
}
interface WrapperProps {
  children: ReactNode;
}

const OrderItem = ({ items }: OrderItemProps) => (
  <Box direction="row" align="center" backgroundColor="surface">
    <Box align="center" style={styles.thumbnail}>
      <Image
        source={require("@/assets/products/product.png")}
        size={128}
        radius="none"
      />
    </Box>

    {items?.map((item) => (
      <Wrapper key={item.uuid}>
        <Text>{item.name}</Text>
        <Text variant="caption">item.vendor</Text>
        <Box
          direction="row"
          align="center"
          justify="space-between"
          style={styles.priceAction}
        >
          <Text color="primary">{item.unit_price}</Text>
          <Text color="textMuted">x {item.qty_ordered}</Text>
        </Box>
      </Wrapper>
    ))}
  </Box>
);
export default OrderItem;

const Wrapper = ({ children }: WrapperProps) => (
  <Box direction="column" align="flex-start" gap="sm" style={styles.content}>
    {children}
  </Box>
);

const styles = {
  thumbnail: { width: "33.333%" as const },
  content: { width: "66.667%" as const },
  priceAction: { width: "100%" as const },
};
