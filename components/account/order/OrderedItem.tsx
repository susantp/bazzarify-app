import { Pressable, StyleSheet } from "react-native";
import { Href, router } from "expo-router";
import React from "react";
import { ProfileMenuBoxType } from "@/modules/order/types";
import { TGetOrder } from "@/modules/order/schemas/orderSchema";
import resolveTrackingOrderRef from "@/modules/order/utils/resolveTrackingOrderRef";
import formatOrderDate from "@/modules/order/utils/formatOrderDate";
import { Box, Image, Text, useBazarifyTheme } from "@/components/design-system";

interface OrderedItemProps {
  statusItem: undefined | ProfileMenuBoxType;
  order: TGetOrder;
  item: TGetOrder["items"][number];
}

const OrderedItem = ({ statusItem, order, item }: OrderedItemProps) => {
  const theme = useBazarifyTheme();
  const trackingOrderRef = resolveTrackingOrderRef({
    orderUuid: order.uuid,
    itemOrderUuid: item.order_uuid,
    orderNumber: order.order_number,
  });
  const encodedTrackingOrderRef = trackingOrderRef
    ? encodeURIComponent(trackingOrderRef)
    : "";
  const orderRef = order.uuid || item.order_uuid || order.order_number;
  const encodedOrderRef = encodeURIComponent(orderRef);
  const canShowAction =
    statusItem?.action &&
    (statusItem.action.route !== "/account/order/[id]/tracking" ||
      !!encodedTrackingOrderRef);

  const handleActionPress = () => {
    const route = statusItem?.action?.route;
    if (!route) {
      return;
    }
    if (route === "/account/order/[id]/tracking") {
      if (!encodedTrackingOrderRef) {
        return;
      }
      router.push({
        pathname: "/account/order/[id]/tracking",
        params: { id: encodedTrackingOrderRef },
      });
      return;
    }
    if (route === "/account/order/[id]/return") {
      router.push({
        pathname: "/account/order/[id]/return",
        params: { id: encodedOrderRef },
      });
      return;
    }
    router.push(route as Href);
  };

  return (
    <Box direction="row" align="center" backgroundColor="background">
      <Box id="content-thumbnail" align="center" style={styles.thumbnail}>
        <Image
          source={require("@/assets/products/product.png")}
          size={128}
          radius="md"
        />
      </Box>

      <Box id="content" gap="sm" align="flex-start" style={styles.content}>
        <Text variant="body">{item.name}</Text>
        <Text variant="bodyCompact">{order.order_number}</Text>
        <Box
          direction="row"
          align="center"
          justify="space-between"
          style={styles.footer}
        >
          <Box
            backgroundColor="surfaceMuted"
            borderRadius="md"
            paddingX="lg"
            paddingY="xs"
          >
            <Text variant="bodyCompact">
              {formatOrderDate(order.placed_at, "LLL, d")}
            </Text>
          </Box>
          {canShowAction ? (
            <Pressable
              onPress={handleActionPress}
              accessibilityRole="button"
              style={[styles.action, { borderColor: theme.colors.primary }]}
            >
              <Text variant="label" color="primary">
                {statusItem?.action?.label}
              </Text>
            </Pressable>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  thumbnail: { width: "33.333333%" },
  content: { width: "66.666667%" },
  footer: { width: "100%" },
  action: {
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
});
export default OrderedItem;
