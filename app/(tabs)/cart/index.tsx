import React from "react";
import CartHeader from "@/components/cart/CartHeader";
import { FlatList } from "react-native";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import BottomActionView from "@/components/common/BottomActionView";
import CheckoutBottomActionView from "@/components/cart/checkout/CheckoutBottomActionView";
import ContentWrapper from "@/components/common/ContentWrapper";
import useCartScreenHook from "@/hooks/useCartScreenHook";
import DemoModalComponent from "@/components/common/DemoModalComponent";
import SelectAddressModalView from "@/components/cart/SelectAddressModalView";
import { useAtomValue } from "jotai";
import { tokenAtom } from "@/modules/auth/atoms/tokenAtom";

export default function CartScreen() {
  const {
    CARDS,
    cartData,
    showAddressModal,
    handleAddressModal,
    handleAddressPress,
    handleCheckoutPress,
  } = useCartScreenHook();
  const token = useAtomValue(tokenAtom);
  console.log("token on cart page: ", token);
  return (
    <SafeAreaWrapper>
      <CartHeader onAddressButtonPress={handleAddressModal} />
      <ContentWrapper>
        <FlatList
          className="bg-white"
          data={CARDS}
          renderItem={({ item }) => item.component}
        />
      </ContentWrapper>
      {cartData?.items.length! > 0 && (
        <BottomActionView>
          <CheckoutBottomActionView
            handlePress={handleCheckoutPress}
            totalPrice={cartData?.grand_total ?? 0}
            btnLabel={
              cartData?.items.length! > 0
                ? `Checkout (${cartData?.items.length})`
                : "Checkout"
            }
          />
        </BottomActionView>
      )}
      <DemoModalComponent
        type="bottom"
        showModal={showAddressModal}
        handlePress={handleAddressModal}
      >
        <SelectAddressModalView
          title="Choose delivery address"
          onPress={handleAddressPress}
        />
      </DemoModalComponent>
    </SafeAreaWrapper>
  );
}
