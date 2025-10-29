import { View } from "react-native";
import { Card } from "react-native-paper";
import CartItem from "@/components/cart/CartItem";
import { ThemedText } from "@/components/ThemedText";
import React from "react";
import useCartHook from "@/modules/cart/hooks/useCartHook";

export default function useCartCardsHook() {
  const {
    cartState,
    handleLineItemRemove,
    handleLineItemDecrement,
    handleLineItemIncrement,
  } = useCartHook();
  const CARDS = [
    {
      title: "wel",
      component: <View className="h-3 bg-gray-100" />,
    },
    {
      title: "cart-items",
      component: cartState?.cart?.totals.items_count ? (
        <Card className="flex-1">
          {cartState?.cart?.items.map((item) => (
            <CartItem
              key={item.variant_attrs?.uuid ?? item.uuid}
              item={item}
              onIncrement={() => handleLineItemIncrement(item)}
              onDecrement={() => handleLineItemDecrement(item)}
              onRemove={() => handleLineItemRemove(item)}
            />
          ))}
        </Card>
      ) : (
        <ThemedText type="title" darkColor="#0000" lightColor="#0000">
          No Items on cart
        </ThemedText>
      ),
    },
    // {
    //   title: "other-products",
    //   component: (
    //     <ThemedText darkColor="#0000" lightColor="#0000">
    //       Popular Items section
    //     </ThemedText>
    //     // <ContentGridSection
    //     //   className="align-center flex-col pl-4"
    //     //   title={"Just for you"}
    //     //   items={popularItemsData}
    //     //   cols={2}
    //     //   horizontal={false}
    //     //   renderItem={(item, index, cols) => (
    //     //     <ProductCard item={item} key={index} cols={cols} />
    //     //   )}
    //     // />
    //   ),
    // },
  ];
  return {
    CARDS,
  };
}
