import React from "react";
import { ActivityIndicator, FlatList, Pressable } from "react-native";
import ScreenHeader from "@/components/common/ScreenHeader";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { Box, Icon, PageContent, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";
import { randomUUID } from "expo-crypto";
import DeliveryMileStones from "@/components/account/order/DeliveryMileStones";
import TimelineItem from "@/components/account/order/TimelineItem";
import useOrderTracking from "@/hooks/useOrderTracking";
import { useLocalSearchParams } from "expo-router";

export default function TrackOrderPage() {
  const theme = useBazarifyTheme();
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const orderIdRaw = Array.isArray(id) ? id[0] : id;
  const orderId = orderIdRaw ? decodeURIComponent(orderIdRaw) : undefined;
  const { tracking, orderTrackingData, isLoading, error, isEmpty, retry } =
    useOrderTracking(orderId);

  return (
    <SafeAreaWrapper>
      <ScreenHeader title="Track Your Product" />
      <PageContent
        backgroundColor="surface"
        gap="lg"
        paddingX="lg"
        paddingY="md"
      >
        <DeliveryMileStones currentStatus={tracking.currentStatus} />
        <Box
          direction="row"
          align="center"
          justify="space-between"
          backgroundColor="surfaceMuted"
          padding="lg"
          borderRadius="lg"
        >
          <Box gap="xs">
            <Text variant="bodyMedium">Tracking Number</Text>
            <Text>{tracking.trackingNumber || "--"}</Text>
          </Box>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Copy tracking number"
          >
            <Icon size={24} color="primary">
              {({ color, size }) => (
                <AntDesign name="copy" color={color} size={size} />
              )}
            </Icon>
          </Pressable>
        </Box>
        <Box
          direction="row"
          align="center"
          gap="lg"
          backgroundColor="surfaceMuted"
          padding="lg"
          borderRadius="lg"
          style={{ borderColor: theme.colors.border, borderWidth: 1 }}
        >
          <Icon size={20} color="primary">
            {({ color, size }) => (
              <FontAwesome5 name="shipping-fast" size={size} color={color} />
            )}
          </Icon>
          <Text>{tracking.estimatedDeliveryText}</Text>
        </Box>
        <Box
          direction="row"
          align="center"
          justify="space-between"
          padding="lg"
        >
          <Box flex={1}>
            <Text color="success">{tracking.currentStatus || "--"}</Text>
          </Box>
          <Box
            backgroundColor="success"
            paddingX="sm"
            paddingY="xs"
            borderRadius="lg"
          >
            <Text color="textInverted">
              {tracking.currentStatusDate || "--"}
            </Text>
          </Box>
        </Box>
        {isLoading ? (
          <Box align="center" paddingY="xxl">
            <ActivityIndicator color={theme.colors.primary} size="large" />
          </Box>
        ) : null}
        {!isLoading && error ? (
          <Box align="center" gap="sm" paddingY="xxl">
            <Text align="center" variant="bodyCompact" color="textMuted">
              {error}
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Try again"
              onPress={() => retry().then(() => null)}
              style={{
                borderColor: theme.colors.primary,
                borderRadius: theme.radii.lg,
                borderWidth: 1,
                paddingHorizontal: theme.spacing.lg,
                paddingVertical: theme.spacing.sm,
              }}
            >
              <Text color="primary">Try again</Text>
            </Pressable>
          </Box>
        ) : null}
        {!isLoading && !error && isEmpty ? (
          <Box align="center" paddingY="xxl">
            <Text variant="bodyCompact" color="textMuted">
              Tracking timeline is empty
            </Text>
          </Box>
        ) : null}
        {!isLoading && !error && !isEmpty ? (
          <FlatList
            contentContainerStyle={{ rowGap: theme.spacing.lg }}
            data={orderTrackingData}
            renderItem={({ item }) => (
              <TimelineItem key={randomUUID()} item={item} />
            )}
          />
        ) : null}
      </PageContent>
    </SafeAreaWrapper>
  );
}
