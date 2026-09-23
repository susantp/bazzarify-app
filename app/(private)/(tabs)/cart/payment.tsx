import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import { Box, PageContent, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";
import usePaymentScreenHook from "@/hooks/usePaymentScreenHook";
import React from "react";
import PaymentMethodView from "@/components/cart/payment/PaymentMethodView";
import BottomActionView from "@/modules/core/components/BottomActionView";

export default function PaymentScreen() {
  const theme = useBazarifyTheme();
  const { paymentMethodSections, cartState, inventoryState } =
    usePaymentScreenHook();

  return (
    <SafeAreaWrapper>
      <ScreenHeader title="Payment" />
      <PageContent backgroundColor="surface">
        {inventoryState.hasBlockingIssue ? (
          <Box
            backgroundColor="surfaceMuted"
            paddingX="lg"
            paddingY="md"
            style={{
              marginHorizontal: theme.spacing.lg,
              marginBottom: theme.spacing.lg,
              borderColor: theme.colors.danger,
              borderWidth: 1,
              borderRadius: theme.radii.lg,
            }}
          >
            <Text variant="bodyMedium" color="danger">
              Some items became unavailable.
            </Text>
            <Text
              variant="bodyCompact"
              color="danger"
              style={{ marginTop: theme.spacing.xs }}
            >
              Go back to checkout and update your cart before payment.
            </Text>
          </Box>
        ) : null}
        {paymentMethodSections.map((methodSection) => (
          <Box key={methodSection.sectionTitle}>
            <Box backgroundColor="surfaceMuted" paddingX="sm" paddingY="xs">
              <Text variant="label">{methodSection.sectionTitle}</Text>
            </Box>
            {methodSection.methods.map((methodType) => (
              <PaymentMethodView
                method={methodType}
                key={String(methodType.pathname)}
                pathName={methodType.pathname}
              />
            ))}
          </Box>
        ))}
      </PageContent>
      <BottomActionView>
        <Box gap="lg" paddingX="lg" paddingY="huge">
          <Box direction="row" justify="space-between">
            <Text variant="bodyCompact">Subtotal</Text>
            <Text variant="bodyMedium">{`Rs. ${cartState?.cart?.totals.sub_total}`}</Text>
          </Box>
          <Box direction="row" justify="space-between">
            <Text variant="title">Total Amount</Text>
            <Text variant="title" color="primary">
              {`Rs. ${cartState?.cart?.totals.grand_total}`}
            </Text>
          </Box>
        </Box>
      </BottomActionView>
    </SafeAreaWrapper>
  );
}
