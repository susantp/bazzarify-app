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

export default function CartScreen() {
  const {
    CARDS,
    items,
    sub_total,
    showAddressModal,
    handleAddressModal,
    handleAddressPress,
    handleCheckoutPress,
  } = useCartScreenHook();

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
      {items.length > 0 && (
        <BottomActionView>
          <CheckoutBottomActionView
            handlePress={handleCheckoutPress}
            totalPrice={sub_total}
            btnLabel={
              items.length > 0 ? `Checkout (${items.length})` : "Checkout"
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
