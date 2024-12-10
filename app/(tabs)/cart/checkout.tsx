import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import { FlatList } from "react-native";
import React from "react";
import ContentWrapper from "@/components/common/ContentWrapper";
import { useRecoilValue } from "recoil";
import { cartItemsTotalAtom } from "@/atoms/cartScreen/cartAction.atom";
import CheckoutBottomActionView from "@/components/cart/CheckoutBottomActionView";
import BottomActionView from "@/components/cart/BottomActionView";
import useBottomViewHook from "@/hooks/useBottomViewHook";
import useCheckoutScreenHook from "@/hooks/useCheckoutScreenHook";

export default function CheckoutScreen() {
  const totalCartPrice = useRecoilValue(cartItemsTotalAtom);
  const { CARDS, cartItems } = useCheckoutScreenHook();
  const { handleBottomViewLayoutEvent, paddingAfterBottomView } =
    useBottomViewHook();

  return (
    <SafeAreaWrapper>
      <ScreenHeader title="Checkout" />
      <ContentWrapper styles={{ paddingBottom: paddingAfterBottomView }}>
        <FlatList
          contentContainerStyle={{ rowGap: 15 }}
          showsVerticalScrollIndicator={false}
          className="p-2"
          data={CARDS}
          renderItem={({ item }) => item.component}
        />
      </ContentWrapper>
      <BottomActionView
        items={cartItems}
        onLayoutEvent={handleBottomViewLayoutEvent}
      >
        <CheckoutBottomActionView
          totalPrice={totalCartPrice}
          btnLabel="Place Order"
          deliveryPrice={110}
          actionLink={{ pathname: "/cart/payment" }}
        />
      </BottomActionView>
    </SafeAreaWrapper>
  );
}
