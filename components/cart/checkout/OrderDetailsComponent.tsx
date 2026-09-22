import React from "react";
import { StyleSheet } from "react-native";
import { Box, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";
import { TCart } from "@/modules/order/schemas/orderSchema";
import { getCartInventoryState } from "@/modules/cart/utils/getCartInventoryState";
import { shouldDisplayVariantLabel } from "@/modules/product/utils/selection";

interface Props {
  cart: TCart;
}

const OrderDetailsComponent = ({ cart }: Props) => {
  const theme = useBazarifyTheme();

  if (!cart) return null;

  const inventory = getCartInventoryState(cart);

  return (
    <Box direction="row">
      <Box
        direction="column"
        gap="sm"
        borderRadius="xl"
        padding="lg"
        style={[styles.panel, { borderColor: theme.colors.borderStrong }]}
      >
        <Box
          paddingY="sm"
          style={[styles.heading, { borderColor: theme.colors.borderStrong }]}
        >
          <Text variant="title">Order Details</Text>
        </Box>

        {inventory.hasBlockingIssue ? (
          <Box
            borderRadius="md"
            paddingX="md"
            paddingY="md"
            style={[
              styles.notice,
              {
                backgroundColor: theme.colors.primarySurface,
                borderColor: theme.colors.danger,
              },
            ]}
          >
            <Text variant="bodyMedium" color="danger">
              Some items are no longer available.
            </Text>
            <Text variant="caption" color="danger" style={styles.noticeCopy}>
              Remove or update unavailable items before placing the order.
            </Text>
          </Box>
        ) : inventory.lowStockItems.length > 0 ? (
          <Box
            borderRadius="md"
            paddingX="md"
            paddingY="md"
            style={[
              styles.notice,
              {
                backgroundColor: theme.colors.primarySurface,
                borderColor: theme.colors.warning,
              },
            ]}
          >
            <Text variant="bodyMedium" color="warning">
              Some items are low in stock.
            </Text>
            <Text variant="caption" color="warning" style={styles.noticeCopy}>
              Inventory may change before payment is completed.
            </Text>
          </Box>
        ) : null}

        {cart.items.map((item) => (
          <Box
            key={item.uuid}
            direction="column"
            gap="lg"
            paddingY="lg"
            style={[styles.item, { borderColor: theme.colors.borderStrong }]}
          >
            <Box direction="row" align="center" justify="space-between">
              <Box style={styles.itemName}>
                <Text variant="bodyMedium">{item.name}</Text>
                {shouldDisplayVariantLabel(
                  item.name,
                  item.variant_attrs?.name,
                ) ? (
                  <Text variant="caption" style={styles.variant}>
                    {item.variant_attrs?.name.replace("|", "-")}
                  </Text>
                ) : null}
                {item.inventory?.available_to_sell === 0 ? (
                  <Text
                    variant="caption"
                    color="danger"
                    style={styles.stockCopy}
                  >
                    Out of stock
                  </Text>
                ) : item.inventory && item.inventory.available_to_sell <= 3 ? (
                  <Text
                    variant="caption"
                    color="primary"
                    style={styles.stockCopy}
                  >
                    {item.inventory.available_to_sell} item(s) left
                  </Text>
                ) : null}
              </Box>
              <Text>{`x${item.qty_ordered}`}</Text>
              <Text color="primary">Rs. {item.row_total}</Text>
            </Box>

            <Box direction="row" justify="space-between">
              <Text>Discount</Text>
              <Text>Rs. {item.row_discount}</Text>
            </Box>

            <Box direction="row" justify="space-between">
              <Box direction="column" gap="sm" style={styles.deliveryCopy}>
                <Text>Delivery Charge</Text>
                <Text variant="bodyCompact" color="textMuted">
                  Get By Dec Mon 2nd - Wed 4th
                </Text>
              </Box>
              <Text variant="caption">Rs. {item.row_shipping}</Text>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  panel: { borderWidth: 1 },
  heading: { borderBottomWidth: 1 },
  notice: { borderWidth: 1 },
  noticeCopy: { marginTop: 4 },
  item: { borderBottomWidth: 1 },
  itemName: { width: "58.333%" },
  deliveryCopy: { width: "66.667%" },
  variant: { fontStyle: "italic" },
  stockCopy: { marginTop: 4 },
});

export default OrderDetailsComponent;
