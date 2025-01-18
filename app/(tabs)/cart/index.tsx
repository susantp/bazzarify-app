import React from "react";
import { cartItemsTotalAtom } from "@/atoms/cartScreen/cartAction.atom";
import { useRecoilState, useRecoilValue } from "recoil";
import CartHeader from "@/components/cart/CartHeader";
import { FlatList } from "react-native";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import BottomActionView from "@/components/common/BottomActionView";
import CheckoutBottomActionView from "@/components/cart/checkout/CheckoutBottomActionView";
import ContentWrapper from "@/components/common/ContentWrapper";
import useCartScreenHook from "@/hooks/useCartScreenHook";
import DemoModalComponent from "@/components/common/DemoModalComponent";
import { addressModalAtom } from "@/atoms/addressModalAtom";
import SelectAddressModalView from "@/components/cart/SelectAddressModalView";

export default function CartScreen() {
  const totalCartPrice = useRecoilValue(cartItemsTotalAtom);
  const { CARDS, cartItems } = useCartScreenHook();
  const [showModal, setShowModal] = useRecoilState(addressModalAtom);

  return (
    <SafeAreaWrapper>
      <CartHeader />
      <ContentWrapper>
        <FlatList
          className="bg-white"
          data={CARDS}
          renderItem={({ item }) => item.component}
        />
      </ContentWrapper>
      {cartItems.length > 0 && (
        <BottomActionView>
          <CheckoutBottomActionView
            totalPrice={totalCartPrice}
            btnLabel="Checkout"
            actionLink={{ pathname: "/cart/checkout" }}
          />
        </BottomActionView>
      )}
      <DemoModalComponent
        showModal={showModal}
        handlePress={() => setShowModal(!showModal)}
      >
        <SelectAddressModalView />
      </DemoModalComponent>
    </SafeAreaWrapper>
  );
}
