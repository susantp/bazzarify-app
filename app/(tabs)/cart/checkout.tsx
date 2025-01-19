import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import { FlatList } from "react-native";
import React, { useState } from "react";
import ContentWrapper from "@/components/common/ContentWrapper";
import { useRecoilValue } from "recoil";
import { cartItemsTotalAtom } from "@/atoms/cartScreen/cartAction.atom";
import CheckoutBottomActionView from "@/components/cart/checkout/CheckoutBottomActionView";
import BottomActionView from "@/components/common/BottomActionView";
import useCheckoutScreenHook from "@/hooks/useCheckoutScreenHook";
import { router } from "expo-router";

export default function CheckoutScreen() {
  const totalCartPrice = useRecoilValue(cartItemsTotalAtom);
  const { CARDS, cartItems } = useCheckoutScreenHook();
  const [buttonLabel, setButtonLabel] = useState("Place Order");
  const handlePress = () => {
    setButtonLabel("Creating Order...");
    setTimeout(() => {
      setButtonLabel("Place Order");
      router.push("/cart/payment");
    }, 3000);
  };
  return (
    <SafeAreaWrapper>
      <ScreenHeader title="Checkout" />
      <ContentWrapper className="bg-white">
        <FlatList
          contentContainerStyle={{
            rowGap: 15,
          }}
          showsVerticalScrollIndicator={false}
          className="p-2"
          data={CARDS}
          renderItem={({ item }) => item.component}
        />
      </ContentWrapper>
      {cartItems.length > 0 && (
        <BottomActionView>
          <CheckoutBottomActionView
            totalPrice={totalCartPrice}
            btnLabel={buttonLabel}
            deliveryPrice={110}
            handlePress={handlePress}
          />
        </BottomActionView>
      )}
    </SafeAreaWrapper>
  );
}
