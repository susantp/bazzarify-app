import { ActivityIndicator, FlatList, Pressable } from "react-native";
import ScreenHeader from "@/components/common/ScreenHeader";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import { Box, PageContent, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";
import DeliveryMileStones from "@/components/account/order/DeliveryMileStones";
import DeliveryUnitCard from "@/components/account/order/DeliveryUnitCard";
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
            <Text variant="bodyMedium">Order number</Text>
            <Text>{tracking.orderNumber || "--"}</Text>
          </Box>
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
        {!isLoading && !error && tracking.deliveryUnits.length > 0 ? (
          <Box gap="md">
            <Text variant="title">Store deliveries</Text>
            {tracking.deliveryUnits.map((unit) => (
              <DeliveryUnitCard key={unit.uuid} unit={unit} />
            ))}
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
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TimelineItem item={item} />}
          />
        ) : null}
      </PageContent>
    </SafeAreaWrapper>
  );
}
