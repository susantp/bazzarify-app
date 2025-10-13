import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import { FlatList } from "react-native";
import React from "react";
import ContentWrapper from "@/components/common/ContentWrapper";
import CheckoutBottomActionView from "@/components/cart/checkout/CheckoutBottomActionView";
import BottomActionView from "@/components/common/BottomActionView";
import useCheckoutScreenHook from "@/modules/checkout/hooks/useCheckoutScreenHook";

export default function CheckoutScreen() {
  const { btnLabel, CARDS, handleCheckout, cartState } =
    useCheckoutScreenHook();
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
      {cartState?.cart?.items.length! > 0 && (
        <BottomActionView>
          <CheckoutBottomActionView
            totalPrice={cartState?.cart?.totals.grand_total}
            btnLabel={btnLabel}
            deliveryPrice={cartState?.cart?.totals.shipping_total}
            handlePress={handleCheckout}
          />
        </BottomActionView>
      )}
    </SafeAreaWrapper>
  );
}
