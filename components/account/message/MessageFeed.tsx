import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import MessageBanner, { type MessageBannerProps } from "./MessageBanner";

export type MessageFeedItem = Omit<MessageBannerProps, "type" | "testID">;

export type MessageFeedProps = {
  items: readonly MessageFeedItem[];
  type: MessageBannerProps["type"];
  testID?: string;
};

export function MessageFeed({ items, type, testID }: MessageFeedProps) {
  return (
    <ScrollView
      testID={testID}
      style={styles.scroll}
      contentContainerStyle={styles.content}
    >
      {items.map((item, index) => (
        <MessageBanner
          key={`${type}-${item.title}-${index}`}
          testID={testID ? `${testID}-item-${index}` : undefined}
          type={type}
          {...item}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: "#e5e7eb" },
  content: { gap: 24, paddingHorizontal: 8, paddingVertical: 10 },
});
