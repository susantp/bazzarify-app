import React from "react";
import CartHeader from "@/components/cart/CartHeader";
import { FlatList } from "react-native";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import BottomActionView from "@/components/common/BottomActionView";
import CheckoutBottomActionView from "@/components/cart/checkout/CheckoutBottomActionView";
import ContentWrapper from "@/components/common/ContentWrapper";
import useCartScreenHook from "@/hooks/useCartScreenHook";
import DemoModalComponent from "@/components/common/DemoModalComponent";
import AddressSettingScreen from "@/modules/account/components/settings/addressSettingScreen";

export default function CartScreen() {
  const {
    CARDS,
    cartData,
    showAddressModal,
    handleAddressModal,
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
      {cartData?.cart?.totals.items_count && (
        <BottomActionView>
          <CheckoutBottomActionView
            handlePress={handleCheckoutPress}
            totalPrice={cartData?.cart?.totals.grand_total}
            btnLabel={
              cartData?.cart?.totals.items_count
                ? `Checkout (${cartData?.cart?.totals.items_count})`
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
        <AddressSettingScreen />
      </DemoModalComponent>
    </SafeAreaWrapper>
  );
}
