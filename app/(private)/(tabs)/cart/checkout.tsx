import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import { FlatList } from "react-native";
import { PageContent } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";
import React from "react";
import CheckoutBottomActionView from "@/components/cart/checkout/CheckoutBottomActionView";
import BottomActionView from "@/modules/core/components/BottomActionView";
import useCheckoutScreenHook from "@/modules/checkout/hooks/useCheckoutScreenHook";

export default function CheckoutScreen() {
  const theme = useBazarifyTheme();
  const { btnLabel, CARDS, handleCheckout, cartState, inventoryState } =
    useCheckoutScreenHook();
  return (
    <SafeAreaWrapper>
      <ScreenHeader title="Checkout" />
      <PageContent backgroundColor="surface">
        <FlatList
          contentContainerStyle={{
            rowGap: 15,
          }}
          showsVerticalScrollIndicator={false}
          style={{ padding: theme.spacing.sm }}
          data={CARDS}
          renderItem={({ item }) => item.component}
        />
      </PageContent>
      {cartState?.cart?.items.length! > 0 ? (
        <BottomActionView>
          <CheckoutBottomActionView
            totalPrice={cartState?.cart?.totals.grand_total}
            btnLabel={btnLabel}
            deliveryPrice={cartState?.cart?.totals.shipping_total}
            handlePress={handleCheckout}
            disabled={inventoryState.hasBlockingIssue}
            helperText={
              inventoryState.hasBlockingIssue
                ? "Remove unavailable items before continuing to payment."
                : null
            }
          />
        </BottomActionView>
      ) : null}
    </SafeAreaWrapper>
  );
}
