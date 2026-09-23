import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import ScreenHeader from "@/components/common/ScreenHeader";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import { Box, PageContent, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";
import { useLocalSearchParams, router } from "expo-router";

export default function LegacyTrackRoutePage() {
  const theme = useBazarifyTheme();
  const params = useLocalSearchParams<{
    order?: string | string[];
    id?: string | string[];
    uuid?: string | string[];
  }>();
  const getFirst = (value?: string | string[]) =>
    Array.isArray(value) ? value[0] : value;
  const orderRefRaw =
    getFirst(params.order) || getFirst(params.id) || getFirst(params.uuid);
  const orderRef = orderRefRaw ? decodeURIComponent(orderRefRaw) : "";

  useEffect(() => {
    if (!orderRef) {
      return;
    }
    router.replace({
      pathname: "/account/order/[id]/tracking",
      params: { id: encodeURIComponent(orderRef) },
    });
  }, [orderRef]);

  return (
    <SafeAreaWrapper>
      <ScreenHeader title="Track Your Product" />
      <PageContent backgroundColor="surface" paddingX="lg" paddingY="md">
        {orderRef ? (
          <Box align="center" paddingY="xxl">
            <ActivityIndicator color={theme.colors.primary} size="large" />
          </Box>
        ) : (
          <Box align="center" paddingY="xxl">
            <Text variant="bodyCompact" color="textMuted">
              Order id is missing.
            </Text>
          </Box>
        )}
      </PageContent>
    </SafeAreaWrapper>
  );
}
