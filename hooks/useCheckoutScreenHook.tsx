import { randomUUID } from "expo-crypto";
import OrderItem from "@/components/cart/checkout/OrderItem";
import OrderDetailsComponent from "@/components/cart/checkout/OrderDetailsComponent";
import VoucherList from "@/components/cart/checkout/VoucherList";
import CheckoutAddressComponent from "@/components/cart/checkout/CheckoutAddressComponent";
import React from "react";
import { useRecoilValue } from "recoil";
import { cartItemsAtom } from "@/atoms/cartScreen/cartAction.atom";

export default function useCheckoutScreenHook() {
  const cartItems = useRecoilValue(cartItemsAtom);

  const CARDS = [
    {
      title: "checkoutItems",
      id: randomUUID(),
      component: <OrderItem />,
    },
    {
      title: "orderDetails",
      id: randomUUID(),
      component: <OrderDetailsComponent />,
    },
    {
      title: "vouchers",
      id: randomUUID(),
      component: <VoucherList />,
    },
    {
      title: "address",
      id: randomUUID(),
      component: <CheckoutAddressComponent />,
    },
  ];
  return { CARDS, cartItems };
}
