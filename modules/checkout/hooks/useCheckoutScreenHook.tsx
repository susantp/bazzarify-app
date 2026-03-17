import { randomUUID } from "expo-crypto";
import OrderDetailsComponent from "@/components/cart/checkout/OrderDetailsComponent";
import VoucherList from "@/components/cart/checkout/VoucherList";
import CheckoutAddressComponent from "@/components/cart/checkout/CheckoutAddressComponent";
import React, { useState } from "react";
import { useAtomValue } from "jotai";
import { cartAtom, selectedDeliveryAddress } from "@/modules/cart/atoms";
import { userAtom } from "@/modules/auth/atoms/userAtom";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { getDefaultAddressAtom } from "@/modules/user/atoms/addresessAtom";
import { getCartInventoryState } from "@/modules/cart/utils/getCartInventoryState";

export default function useCheckoutScreenHook() {
  const cartState = useAtomValue(cartAtom);
  const user = useAtomValue(userAtom);
  const [btnLabel] = useState("Place Order");
  const selectedAddress = useAtomValue(selectedDeliveryAddress);
  const defaultAddress = useAtomValue(getDefaultAddressAtom);
  const displayAddress = selectedAddress || defaultAddress;
  const inventoryState = getCartInventoryState(cartState?.cart ?? null);
  const CARDS = [
    {
      title: "address",
      id: randomUUID(),
      component: (
        <CheckoutAddressComponent
          user={user}
          defaultDeliveryAddress={displayAddress}
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
    if (inventoryState.hasBlockingIssue) {
      Toast.show({
        position: "bottom",
        text1: "Unavailable items in cart",
        text2: "Remove out-of-stock items before continuing to payment.",
        type: "error",
      });
      return;
    }

    if (!displayAddress) {
      Toast.show({
        position: "bottom",
        text1: "Select a delivery address",
        text2: "Please choose a delivery address before checkout.",
        type: "error",
      });
      return;
    }
    router.push("/cart/payment");
  };
  return { btnLabel, CARDS, cartState, handleCheckout, inventoryState };
}
