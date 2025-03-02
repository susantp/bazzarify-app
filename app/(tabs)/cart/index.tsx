import React from "react";
import { cartItemsTotalAtom } from "@/atoms/cartScreen/cartAction.atom";
import { useRecoilState, useRecoilValue } from "recoil";
import CartHeader from "@/components/cart/CartHeader";
import { Alert, FlatList } from "react-native";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import BottomActionView from "@/components/common/BottomActionView";
import CheckoutBottomActionView from "@/components/cart/checkout/CheckoutBottomActionView";
import ContentWrapper from "@/components/common/ContentWrapper";
import useCartScreenHook from "@/hooks/useCartScreenHook";
import DemoModalComponent from "@/components/common/DemoModalComponent";
import { addressModalAtom } from "@/atoms/addressModalAtom";
import SelectAddressModalView from "@/components/cart/SelectAddressModalView";
import { router } from "expo-router";

export default function CartScreen() {
  const totalCartPrice = useRecoilValue(cartItemsTotalAtom);
  const { CARDS, cartItems, selectedItemCount } = useCartScreenHook();
  const [showModal, setShowModal] = useRecoilState(addressModalAtom);
  const handlePress = () =>
    selectedItemCount < 1
      ? Alert.alert("Please select item to checkout.")
      : router.push("/cart/checkout");
  const handleAddressPress = () => {
    setShowModal(!showModal);
    router.push(`/account/setting/address/create`);
  };
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
            handlePress={handlePress}
            totalPrice={totalCartPrice}
            btnLabel={
              cartItems.length > 0
                ? `Checkout (${selectedItemCount})`
                : "Checkout"
            }
          />
        </BottomActionView>
      )}
      <DemoModalComponent
        type="bottom"
        showModal={showModal}
        handlePress={() => setShowModal(!showModal)}
      >
        <SelectAddressModalView
          title="Choose delivery address"
          onPress={handleAddressPress}
        />
      </DemoModalComponent>
    </SafeAreaWrapper>
  );
}
