import { randomUUID } from "expo-crypto";
import OrderItem from "@/components/cart/checkout/OrderItem";
import OrderDetailsComponent from "@/components/cart/checkout/OrderDetailsComponent";
import VoucherList from "@/components/cart/checkout/VoucherList";
import CheckoutAddressComponent from "@/components/cart/checkout/CheckoutAddressComponent";
import React from "react";
import { useAtomValue } from "jotai";
import { cartItemsAtom } from "@/atoms/cartScreen/cartAction.atom";

export default function useCheckoutScreenHook() {
  const cartItems = useAtomValue(cartItemsAtom);

  const CARDS = [
    {
      title: "address",
      id: randomUUID(),
      component: <CheckoutAddressComponent />,
    },
    {
      title: "checkoutItems",
      id: randomUUID(),
      component: <OrderItem />,
    },
    {
      title: "vouchers",
      id: randomUUID(),
      component: <VoucherList />,
    },
    {
      title: "orderDetails",
      id: randomUUID(),
      component: <OrderDetailsComponent />,
    },
  ];
  return { CARDS, cartItems };
}
