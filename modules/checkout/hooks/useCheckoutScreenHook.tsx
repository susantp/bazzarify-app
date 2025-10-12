import { randomUUID } from "expo-crypto";
import OrderDetailsComponent from "@/components/cart/checkout/OrderDetailsComponent";
import VoucherList from "@/components/cart/checkout/VoucherList";
import CheckoutAddressComponent from "@/components/cart/checkout/CheckoutAddressComponent";
import React, { useState } from "react";
import { useAtomValue } from "jotai";
import { cartAtom } from "@/modules/cart/atoms";
import Toast from "react-native-toast-message";
import { userAtom } from "@/modules/auth/atoms/userAtom";
import { getDefaultAddressAtom } from "@/modules/user/atoms/addresessAtom";
import { router } from "expo-router";

export default function useCheckoutScreenHook() {
  const cartState = useAtomValue(cartAtom);
  const user = useAtomValue(userAtom);
  const defaultDeliveryAddress = useAtomValue(getDefaultAddressAtom);
  const [btnLabel, setBtnLabel] = useState("Place Order");

  const CARDS = [
    {
      title: "address",
      id: randomUUID(),
      component: (
        <CheckoutAddressComponent
          user={user}
          defaultDeliveryAddress={defaultDeliveryAddress}
        />
      ),
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
    router.push("/cart/payment");
  };
  return { btnLabel, CARDS, cartState, handleCheckout };
}
