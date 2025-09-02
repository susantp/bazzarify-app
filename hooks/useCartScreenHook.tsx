import { FlatList, View } from "react-native";
import CartItem from "@/components/cart/CartItem";
import React from "react";
import { cartItemsAtom } from "@/atoms/cartScreen/cartAction.atom";
import { useAtomValue } from "jotai";
import ThemedLoader from "@/modules/core/components/ThemedLoader";

export default function useCartScreenHook() {
  const cartItems = useAtomValue(cartItemsAtom);
  const selectedItemCount = cartItems.filter((item) => item.isSelected).length;
  const CARDS = [
    {
      title: "wel",
      component: <View className="h-3 bg-gray-100" />,
    },
    {
      title: "cart-items",
      component: (
        <FlatList
          className="px-2"
          data={cartItems}
          renderItem={({ item }) => <CartItem key={item.id} item={item} />}
        />
      ),
    },
    {
      title: "other-products",
      component: (
        <ThemedLoader />
        // <ContentGridSection
        //   className="align-center flex-col pl-4"
        //   title={"Just for you"}
        //   items={popularItemsData}
        //   cols={2}
        //   horizontal={false}
        //   renderItem={(item, index, cols) => (
        //     <ProductCard item={item} key={index} cols={cols} />
        //   )}
        // />
      ),
    },
  ];
  return { CARDS, cartItems, selectedItemCount };
}
