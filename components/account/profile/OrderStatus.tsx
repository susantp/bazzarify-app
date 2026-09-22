import React from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import { Box, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";
import { ProfileMenuBoxType } from "@/modules/order/types";
import { getProfileOrderStatusPreview } from "@/components/account/profile/getProfileOrderStatusPreview";

interface OrderStatusProps {
  orderStatuses: ProfileMenuBoxType[];
  aggregates: Record<string, { count: number }> | undefined;
  onStatusPress: (id: string) => void;
  onViewAllPress: () => void;
}

const OrderStatus = ({
  orderStatuses,
  aggregates,
  onStatusPress,
  onViewAllPress,
}: OrderStatusProps) => {
  const theme = useBazarifyTheme();
  const previewStatuses = getProfileOrderStatusPreview(orderStatuses);

  const getStatusCount = (status: string | string[] | undefined) => {
    if (!aggregates || !status) {
      return 0;
    }
    if (Array.isArray(status)) {
      return status.reduce(
        (sum, item) => sum + (aggregates[item]?.count || 0),
        0,
      );
    }
    return aggregates[status]?.count || 0;
  };

  return (
    <Box direction="column" gap="lg" paddingY="sm">
      <Box direction="row" align="center" justify="space-between" paddingX="sm">
        <Text variant="title">My Orders</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="View all orders"
          onPress={onViewAllPress}
        >
          <Text variant="label" color="primary">
            View all
          </Text>
        </Pressable>
      </Box>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {previewStatuses.map(({ id, label, status, icon }) => (
          <Pressable
            key={id}
            accessibilityRole="button"
            accessibilityLabel={`${label} orders`}
            onPress={() => onStatusPress(id)}
            style={({ pressed }) => [
              styles.card,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.borderStrong,
                opacity: pressed ? 0.76 : 1,
              },
            ]}
          >
            <Box
              align="center"
              justify="center"
              gap="xs"
              style={styles.cardContent}
            >
              <Box
                style={styles.badge}
                backgroundColor="primary"
                borderRadius="pill"
                paddingX="xs"
              >
                {getStatusCount(status) ? (
                  <Text
                    variant="bodyCompactMedium"
                    color="textInverted"
                    style={styles.badgeText}
                  >
                    {getStatusCount(status)}
                  </Text>
                ) : null}
              </Box>
              {icon}
              <Text variant="bodyCompactMedium" align="center">
                {label}
              </Text>
            </Box>
          </Pressable>
        ))}
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  list: { columnGap: 12, paddingHorizontal: 8 },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    width: 96,
  },
  cardContent: { minHeight: 80 },
  badge: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  badgeText: { minWidth: 16, textAlign: "center" },
});

export default OrderStatus;
