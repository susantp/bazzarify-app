import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import { FlatList } from "react-native";
import React from "react";
import ContentWrapper from "@/components/common/ContentWrapper";
import { useRecoilValue } from "recoil";
import { cartItemsTotalAtom } from "@/atoms/cartScreen/cartAction.atom";
import CheckoutBottomActionView from "@/components/cart/checkout/CheckoutBottomActionView";
import BottomActionView from "@/components/common/BottomActionView";
import useCheckoutScreenHook from "@/hooks/useCheckoutScreenHook";

export default function CheckoutScreen() {
  const totalCartPrice = useRecoilValue(cartItemsTotalAtom);
  const { CARDS, cartItems } = useCheckoutScreenHook();
  return (
    <SafeAreaWrapper>
      <ScreenHeader title="Checkout" />
      <ContentWrapper>
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
            btnLabel="Place Order"
            deliveryPrice={110}
            actionLink={{ pathname: "/cart/payment" }}
          />
        </BottomActionView>
      )}
    </SafeAreaWrapper>
  );
}
