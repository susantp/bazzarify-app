import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import { FlatList } from "react-native";
import React from "react";
import ContentWrapper from "@/components/common/ContentWrapper";
import CheckoutBottomActionView from "@/components/cart/checkout/CheckoutBottomActionView";
import BottomActionView from "@/components/common/BottomActionView";
import useCheckoutScreenHook from "@/hooks/useCheckoutScreenHook";

export default function CheckoutScreen() {
  const { btnLabel, CARDS, cart, handleCheckout } = useCheckoutScreenHook();
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
      {cart?.items.length! > 0 && (
        <BottomActionView>
          <CheckoutBottomActionView
            totalPrice={cart?.sub_total}
            btnLabel={btnLabel}
            deliveryPrice={110}
            handlePress={handleCheckout}
          />
        </BottomActionView>
      )}
    </SafeAreaWrapper>
  );
}
