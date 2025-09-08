import { randomUUID } from "expo-crypto";
import OrderItem from "@/components/cart/checkout/OrderItem";
import OrderDetailsComponent from "@/components/cart/checkout/OrderDetailsComponent";
import VoucherList from "@/components/cart/checkout/VoucherList";
import CheckoutAddressComponent from "@/components/cart/checkout/CheckoutAddressComponent";
import React, { useState } from "react";
import { useAtomValue } from "jotai";
import { cartAtom } from "@/modules/cart/atoms";

export default function useCheckoutScreenHook() {
  const cart = useAtomValue(cartAtom);
  const [btnLabel, setBtnLabel] = useState("Place Order");
  const CARDS = [
    {
      title: "address",
      id: randomUUID(),
      component: <CheckoutAddressComponent />,
    },
    {
      title: "checkoutItems",
      id: randomUUID(),
      component: <OrderItem items={cart?.items} />,
    },
    {
      title: "vouchers",
      id: randomUUID(),
      component: <VoucherList />,
    },
    {
      title: "orderDetails",
      id: randomUUID(),
      component: <OrderDetailsComponent cart={cart} />,
    },
  ];
  const handleCheckout = () => {
    setBtnLabel("Creating Order...");
    setTimeout(() => {
      setBtnLabel("Place Order");
      // router.push("/cart/payment");
      console.log(cart);
    }, 3000);
  };
  return { btnLabel, CARDS, cart, handleCheckout };
}
