import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useBazarifyTheme } from "@/components/design-system/theme";
import MessageBanner, { type MessageBannerProps } from "./MessageBanner";

export type MessageTimelineItem = Omit<MessageBannerProps, "testID">;

export type MessageTimelineProps = {
  items: readonly MessageTimelineItem[];
  testID?: string;
};

export function MessageTimeline({ items, testID }: MessageTimelineProps) {
  const theme = useBazarifyTheme();

  return (
    <ScrollView
      testID={testID}
      style={[styles.scroll, { backgroundColor: theme.colors.surfaceMuted }]}
      contentContainerStyle={[
        styles.content,
        {
          gap: theme.spacing.xxl,
          paddingHorizontal: theme.spacing.sm,
          paddingVertical: theme.spacing.sm,
        },
      ]}
    >
      {items.map((item, index) => (
        <MessageBanner
          key={`${item.type}-${item.title}-${index}`}
          testID={testID ? `${testID}-item-${index}` : undefined}
          {...item}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: {},
});
