import { Box, Icon, PageContent, Text } from "@/components/design-system";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import { useLocalSearchParams } from "expo-router";
import usePaymentScreenHook from "@/hooks/usePaymentScreenHook";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function PaymentConfirmationScreen() {
  const { id } = useLocalSearchParams();
  const { paymentMethodById, componentMap } = usePaymentScreenHook(
    id.toString(),
  );

  return (
    <SafeAreaWrapper>
      <ScreenHeader title={paymentMethodById?.name} />
      <PageContent backgroundColor="surface">
        {paymentMethodById?.voucherMsg && (
          <Box
            direction="row"
            align="center"
            gap="sm"
            backgroundColor="surfaceMuted"
            padding="sm"
          >
            <Icon
              size={16}
              color="locationBar"
              accessibilityLabel="Information"
            >
              {({ color, size }) => (
                <Ionicons name="information-circle" color={color} size={size} />
              )}
            </Icon>
            <Box flex={1}>
              <Text align="justify">{paymentMethodById.voucherMsg}</Text>
            </Box>
          </Box>
        )}
        {componentMap[id.toString()]}
      </PageContent>
    </SafeAreaWrapper>
  );
}
