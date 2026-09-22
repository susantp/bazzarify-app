import { Box, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";
import { StyleSheet } from "react-native";
import React from "react";
import { OrderTrackingItem } from "@/hooks/useOrderTracking";

interface TimelineItemProps {
  item: OrderTrackingItem;
}

export default function TimelineItem({ item }: TimelineItemProps) {
  const { active, description, status, date } = item;
  const theme = useBazarifyTheme();
  const textColor = active ? "text" : "textMuted";

  return (
    <Box direction="row" align="center" justify="space-between">
      <Box style={styles.details}>
        <Text variant="bodyMedium" color={textColor}>
          {status}
        </Text>
        <Text variant="caption" color={textColor}>
          {description}
        </Text>
      </Box>
      <Box direction="row" align="center" gap="sm">
        <Box
          borderRadius="pill"
          style={[
            styles.dot,
            {
              backgroundColor: active
                ? theme.colors.primary
                : theme.colors.textMuted,
            },
          ]}
        />
        <Text variant="caption" color={textColor}>
          {date}
        </Text>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  details: { flex: 1, paddingRight: 48 },
  dot: { height: 16, width: 16 },
});
