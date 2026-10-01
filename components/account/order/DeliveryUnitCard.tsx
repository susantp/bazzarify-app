import React from "react";
import { Box, Text } from "@/components/design-system";
import { TDeliveryTrackingUnit } from "@/modules/order/schemas/TrackingSchema";

type DeliveryUnitCardProps = {
  unit: TDeliveryTrackingUnit;
};

export default function DeliveryUnitCard({ unit }: DeliveryUnitCardProps) {
  const total = unit.items.reduce((sum, item) => sum + item.quantity, 0);
  const delivered = unit.items.reduce((sum, item) => sum + item.delivered, 0);
  const canceled = unit.items.reduce((sum, item) => sum + item.canceled, 0);

  return (
    <Box gap="sm" backgroundColor="surfaceMuted" padding="lg" borderRadius="lg">
      <Box direction="row" justify="space-between" gap="md">
        <Text variant="bodyMedium">{unit.store_name || "Store delivery"}</Text>
        <Text color="primary">{unit.status.replaceAll("_", " ")}</Text>
      </Box>
      <Text variant="caption" color="textMuted">
        {delivered} of {total - canceled} items delivered
      </Text>
      <Text variant="caption" color="textMuted">
        {unit.tracking_reference
          ? `Carrier reference: ${unit.tracking_reference}`
          : "Carrier reference not assigned"}
      </Text>
      <Box gap="xs">
        {unit.items.map((item) => (
          <Text key={item.order_item_uuid} variant="caption">
            {item.name || "Item"}: {item.delivered}/
            {item.quantity - item.canceled} delivered
          </Text>
        ))}
      </Box>
      {unit.timeline.length > 0 ? (
        <Box gap="xs">
          {unit.timeline.map((event) => (
            <Text key={event.uuid} variant="caption" color="textMuted">
              {event.type.replaceAll("_", " ")}
            </Text>
          ))}
        </Box>
      ) : null}
    </Box>
  );
}
