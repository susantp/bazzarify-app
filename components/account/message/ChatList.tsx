import React from "react";
import { Pressable, StyleSheet } from "react-native";
import {
  Box,
  Image,
  Stack,
  Text,
  type ImageProps,
} from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";

export type ChatListItemData = {
  id: string;
  body: string;
  title: string;
  iconSource: ImageProps["source"];
};

export type ChatListProps = {
  items: readonly ChatListItemData[];
  onItemPress?: (item: ChatListItemData) => void;
  testID?: string;
};

export function ChatList({ items, onItemPress, testID }: ChatListProps) {
  const theme = useBazarifyTheme();

  return (
    <Box gap="lg" paddingX="sm" testID={testID}>
      {items.map((item, index) => (
        <Pressable
          key={item.id}
          testID={testID ? `${testID}-item-${index}` : undefined}
          accessibilityRole="button"
          onPress={() => onItemPress?.(item)}
          style={({ pressed }) => [
            styles.item,
            {
              borderBottomColor: theme.colors.border,
              paddingVertical: theme.spacing.sm,
              gap: theme.spacing.lg,
            },
            pressed && styles.pressed,
          ]}
        >
          <Image size={30} radius="pill" source={item.iconSource} />
          <Stack flex={1} space="xs">
            <Text variant="bodyMedium">{item.title}</Text>
            <Text variant="caption" color="textMuted">
              {item.body}
            </Text>
          </Stack>
        </Pressable>
      ))}
    </Box>
  );
}

const styles = StyleSheet.create({
  item: {
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
  },
  pressed: { opacity: 0.6 },
});
