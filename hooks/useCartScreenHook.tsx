import { FlatList, View } from "react-native";
import CartItem from "@/components/cart/CartItem";
import ContentGridSection from "@/components/home/ContentGridSection";
import { popularItemsData } from "@/constants/popularItemsData";
import React from "react";
import { useRecoilValue } from "recoil";
import { cartItemsAtom } from "@/atoms/cartScreen/cartAction.atom";

export default function useCartScreenHook() {
  const cartItems = useRecoilValue(cartItemsAtom);
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
        <ContentGridSection
          classes="flex-col align-center pl-4"
          title={"Just for you"}
          items={popularItemsData}
          cols={2}
          horizontal={false}
        />
      ),
    },
  ];
  return { CARDS, cartItems };
}
