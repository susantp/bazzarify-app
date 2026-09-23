import { StyleSheet } from "react-native";
import CartItem from "@/components/cart/CartItem";
import React from "react";
import useCartHook from "@/modules/cart/hooks/useCartHook";
import { Box, Text } from "@/components/design-system";

export default function useCartCardsHook() {
  const {
    cartState,
    handleLineItemRemove,
    handleLineItemDecrement,
    handleLineItemIncrement,
    getLineItemIncrementDisabled,
  } = useCartHook();
  const CARDS = [
    {
      title: "wel",
      component: <Box backgroundColor="surfaceMuted" style={styles.spacer} />,
    },
    {
      title: "cart-items",
      component: cartState?.cart?.totals.items_count ? (
        <Box
          backgroundColor="surface"
          borderRadius="md"
          flex={1}
          style={styles.cartCard}
        >
          {cartState?.cart?.items.map((item) => (
            <CartItem
              key={item.variant_attrs?.uuid ?? item.uuid}
              item={item}
              onIncrement={() => handleLineItemIncrement(item)}
              onDecrement={() => handleLineItemDecrement(item)}
              onRemove={() => handleLineItemRemove(item)}
              incrementDisabled={getLineItemIncrementDisabled(item)}
            />
          ))}
        </Box>
      ) : (
        <Text variant="title" color="textMuted">
          No Items on cart
        </Text>
      ),
    },
  ];
  return {
    CARDS,
  };
}

const styles = StyleSheet.create({
  cartCard: { overflow: "hidden" },
  spacer: { height: 12 },
});
