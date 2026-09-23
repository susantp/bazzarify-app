import React from "react";
import CartHeader from "@/components/cart/CartHeader";
import { FlatList } from "react-native";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import { useBazarifyTheme } from "@/components/design-system/theme";
import BottomActionView from "@/modules/core/components/BottomActionView";
import CheckoutBottomActionView from "@/components/cart/checkout/CheckoutBottomActionView";
import ContentWrapper from "@/components/common/ContentWrapper";
import DemoModalComponent from "@/components/common/DemoModalComponent";
import DeliveryAddressPicker from "@/modules/user/components/DeliveryAddressPicker";
import useCartHook from "@/modules/cart/hooks/useCartHook";
import useCartCardsHook from "@/modules/cart/hooks/useCartCardsHook";

export default function CartScreen() {
  const theme = useBazarifyTheme();
  const {
    cartState,
    showAddressModal,
    handleAddressModal,
    handleCheckoutPress,
  } = useCartHook();
  const { CARDS } = useCartCardsHook();
  return (
    <SafeAreaWrapper>
      <CartHeader onAddressButtonPress={handleAddressModal} />
      <ContentWrapper>
        <FlatList
          style={{ backgroundColor: theme.colors.surface }}
          data={CARDS}
          renderItem={({ item }) => item.component}
        />
      </ContentWrapper>

      <BottomActionView>
        {cartState?.cart?.totals.items_count ? (
          <CheckoutBottomActionView
            handlePress={handleCheckoutPress}
            totalPrice={cartState?.cart?.totals.grand_total}
            btnLabel={
              cartState?.cart?.totals.items_count
                ? `Checkout (${cartState?.cart?.totals.items_count})`
                : "Checkout"
            }
          />
        ) : null}
      </BottomActionView>

      <DemoModalComponent
        type="bottom"
        showModal={showAddressModal}
        handlePress={handleAddressModal}
      >
        <DeliveryAddressPicker onClose={handleAddressModal} />
      </DemoModalComponent>
    </SafeAreaWrapper>
  );
}
