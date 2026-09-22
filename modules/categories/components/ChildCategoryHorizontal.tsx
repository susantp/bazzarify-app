import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { TCategoryWithImage } from "@/modules/product/schemas/CategorySchema";
import CategoryAvatar from "@/modules/categories/components/CategoryAvatar";
import { Box, Text } from "@/components/design-system";

const ChildCategoryHorizontal = (props: {
  onPress: () => void;
  item: TCategoryWithImage;
}) => {
  return (
    <Pressable
      accessibilityLabel={props.item.name}
      accessibilityRole="button"
      onPress={props.onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <Box align="center" paddingY="xl" gap="sm" style={styles.content}>
        <CategoryAvatar item={props.item} size={100} />
        <Text variant="bodyCompactMedium" numberOfLines={1}>
          {props.item.name}
        </Text>
      </Box>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: { width: "100%" },
  content: { width: "100%" },
  pressed: { opacity: 0.8 },
});

export default ChildCategoryHorizontal;
