import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { TCategoryWithImage } from "@/modules/product/schemas/CategorySchema";
import CategoryAvatar from "@/modules/categories/components/CategoryAvatar";
import { Box, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";

export type CategoryCardProps = {
  item: TCategoryWithImage;
  index?: number;
  cols: 2 | 3 | 4;
  hasImages: boolean;
  onPress: () => void;
};

const CategoryCard = ({
  item,
  cols,
  hasImages = false,
  onPress,
}: CategoryCardProps) => {
  const theme = useBazarifyTheme();

  return (
    item && (
      <Pressable
        accessibilityLabel={item.name}
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [
          styles.card,
          {
            padding: theme.spacing.sm,
            width: `${100 / cols}%`,
          },
          pressed && styles.pressed,
        ]}
      >
        <CategoryAvatar item={item} size={100} />
        <Box align="center" style={styles.label}>
          <Text variant="bodyCompactMedium" numberOfLines={1}>
            {item.name}
          </Text>
        </Box>
      </Pressable>
    )
  );
};

const styles = StyleSheet.create({
  card: { alignItems: "center", gap: 8 },
  label: { maxWidth: "100%" },
  pressed: { opacity: 0.8 },
});
export default CategoryCard;
