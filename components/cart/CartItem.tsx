import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Box, Icon, Image, Text } from "@/components/design-system";
import { TCartItem } from "@/modules/order/schemas/orderSchema";
import { shouldDisplayVariantLabel } from "@/modules/product/utils/selection";

export type CartItemProps = {
  item: TCartItem;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
  incrementDisabled?: boolean;
};

const CartItem = ({
  item,
  onIncrement,
  onDecrement,
  onRemove,
  incrementDisabled = false,
}: CartItemProps) => {
  const inventoryMessage =
    item.inventory?.available_to_sell === 0
      ? "Out of stock"
      : item.inventory && !item.inventory.can_increment
        ? `Maximum ${item.inventory.max_quantity} in cart`
        : item.inventory && item.inventory.available_to_sell <= 3
          ? `${item.inventory.available_to_sell} item(s) available`
          : null;

  const decrementDisabled = item.qty_ordered <= 0;

  return (
    <Box direction="row" align="center" paddingY="sm">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Remove ${item.name}`}
        onPress={onRemove}
        style={styles.remove}
      >
        <Icon size={30} color="primary">
          {({ color, size }) => (
            <Ionicons name="close-circle" size={size} color={color} />
          )}
        </Icon>
      </Pressable>

      <Box align="center" style={styles.thumbnail}>
        <Image
          source={require("@/assets/products/product.png")}
          size={128}
          radius="none"
        />
      </Box>

      <Box
        direction="column"
        align="flex-start"
        gap="xs"
        style={styles.content}
      >
        <Text>{item.name}</Text>
        {shouldDisplayVariantLabel(item.name, item.variant_attrs?.name) ? (
          <Text>{item.variant_attrs?.name.replace("|", "-")}</Text>
        ) : null}
        <Text variant="caption">item.vendor</Text>
        <Text variant="caption">item.deliveryDate</Text>

        <Box direction="row" style={styles.priceAction}>
          <Box direction="column" style={styles.priceColumn}>
            <Text color="primary">Rs {item.unit_price}</Text>
            <Text variant="caption" color="textMuted" style={styles.discount}>
              {item.row_discount ? `Rs ${item.row_discount}` : null}
            </Text>
            {inventoryMessage ? (
              <Text
                variant="caption"
                color={
                  item.inventory?.available_to_sell === 0 ? "danger" : "primary"
                }
                style={styles.inventory}
              >
                {inventoryMessage}
              </Text>
            ) : null}
          </Box>

          <Box direction="row" align="center" gap="sm" style={styles.quantity}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Increase ${item.name}`}
              accessibilityState={{ disabled: incrementDisabled }}
              disabled={incrementDisabled}
              onPress={onIncrement}
            >
              <Icon
                size={30}
                color={incrementDisabled ? "textMuted" : "primary"}
              >
                {({ color, size }) => (
                  <Ionicons
                    name="add-circle-outline"
                    size={size}
                    color={color}
                  />
                )}
              </Icon>
            </Pressable>
            <Box paddingX="sm" paddingY="sm">
              <Text>{item.qty_ordered}</Text>
            </Box>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Decrease ${item.name}`}
              accessibilityState={{ disabled: decrementDisabled }}
              disabled={decrementDisabled}
              onPress={onDecrement}
            >
              <Icon
                size={30}
                color={decrementDisabled ? "textMuted" : "primary"}
              >
                {({ color, size }) => (
                  <Ionicons
                    name="remove-circle-outline"
                    size={size}
                    color={color}
                  />
                )}
              </Icon>
            </Pressable>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  remove: { width: "8.333%" },
  thumbnail: { width: "33.333%" },
  content: { width: "58.333%" },
  priceAction: { width: "100%" },
  priceColumn: { width: "50%" },
  quantity: { width: "50%" },
  discount: { textDecorationLine: "line-through" },
  inventory: { marginTop: 4 },
});

export default CartItem;
