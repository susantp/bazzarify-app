import { randomUUID } from "expo-crypto";
import OrderDetailsComponent from "@/components/cart/checkout/OrderDetailsComponent";
import VoucherList from "@/components/cart/checkout/VoucherList";
import CheckoutAddressComponent from "@/components/cart/checkout/CheckoutAddressComponent";
import React, { useState } from "react";
import { useAtomValue } from "jotai";
import { cartAtom } from "@/modules/cart/atoms";

export default function useCheckoutScreenHook() {
  const cartState = useAtomValue(cartAtom);
  const [btnLabel, setBtnLabel] = useState("Place Order");
  const CARDS = [
    {
      title: "address",
      id: randomUUID(),
      component: <CheckoutAddressComponent />,
    },
    // {
    //   title: "checkoutItems",
    //   id: randomUUID(),
    //   component: <OrderItem items={cart?.items} />,
    // },

    {
      title: "orderDetails",
      id: randomUUID(),
      component: cartState?.cart?.totals.items_count! ? (
        <OrderDetailsComponent cart={cartState?.cart} />
      ) : null,
    },
    {
      title: "vouchers",
      id: randomUUID(),
      component: <VoucherList />,
    },
  ];
  const handleCheckout = () => {
    setBtnLabel("Creating Order...");
    setTimeout(() => {
      setBtnLabel("Place Order");
      // router.push("/cart/payment");
      console.log(cartState?.cart);
    }, 3000);
  };
  return { btnLabel, CARDS, cartState, handleCheckout };
}
