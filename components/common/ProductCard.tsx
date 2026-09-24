import { router } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import React from "react";
import getFirstImageSource from "@/modules/core/utils/getFirstImageSource";
import { TOmittedProductWithImages } from "@/modules/product/schemas/ProductSchema";
import PolygonFreeDelivery from "@/modules/product/components/PolygonFreeDelivery";
import { getProductInventorySummary } from "@/modules/product/utils/getProductInventorySummary";
import { Box, Image, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";

export type ProductCardProps = {
  item: TOmittedProductWithImages | null;
  cols: 2 | 3 | 4;
};

function getCardWidth(cols: ProductCardProps["cols"]) {
  return `${100 / cols}%` as const;
}

const ProductCard = ({ item, cols }: ProductCardProps) => {
  const theme = useBazarifyTheme();

  if (!item) return null;
  const inventory = getProductInventorySummary(item);

  return (
    <Pressable
      accessibilityLabel={item.name}
      accessibilityRole="button"
      onPress={() =>
        router.push({
          pathname: "/products/[uuid]",
          params: { uuid: item.uuid },
        })
      }
      style={({ pressed }) => [
        styles.cardSlot,
        { width: getCardWidth(cols) },
        pressed && styles.pressed,
      ]}
    >
      <Box
        backgroundColor="surface"
        borderRadius="xl"
        style={[
          styles.card,
          {
            borderColor: theme.colors.border,
            opacity: inventory.canPurchase === false ? 0.7 : 1,
          },
        ]}
      >
        <Box backgroundColor="surfaceMuted" padding="md">
          <Box
            id="image-container"
            backgroundColor="surface"
            borderRadius="xl"
            align="center"
            justify="center"
            style={[styles.imageFrame, styles.overflowHidden]}
          >
            <Image
              source={getFirstImageSource({
                images: item.images,
                baseUrl: item.image_base_url,
              })}
              style={styles.image}
            />
          </Box>
          {"freeDelivery" in item && <PolygonFreeDelivery />}
        </Box>

        <Box id="content" gap="sm" paddingX="md" style={styles.content}>
          <Box style={styles.nameBlock}>
            <Text variant="bodyCompactMedium" numberOfLines={2}>
              {item.name}
            </Text>
          </Box>
          <Box direction="row" align="flex-end">
            {"base_price" in item && (
              <Box>
                <Text variant="title" color="primary">
                  Rs {item?.base_price}
                </Text>
              </Box>
            )}
          </Box>
          {inventory.message ? (
            <Text
              variant="bodyCompactMedium"
              color="primary"
              style={[
                styles.inventory,
                {
                  backgroundColor:
                    inventory.canPurchase === false
                      ? theme.colors.danger
                      : theme.colors.primarySurface,
                  color:
                    inventory.canPurchase === false
                      ? theme.colors.textInverted
                      : theme.colors.primary,
                },
              ]}
            >
              {inventory.message}
            </Text>
          ) : null}
        </Box>
      </Box>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: { borderWidth: StyleSheet.hairlineWidth, overflow: "hidden" },
  cardSlot: {
    paddingHorizontal: 6,
    paddingVertical: 8,
  },
  content: { paddingBottom: 12, paddingTop: 4 },
  imageFrame: {
    aspectRatio: 1,
    width: "100%",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  inventory: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  nameBlock: {
    minHeight: 40,
  },
  overflowHidden: { overflow: "hidden" },
  pressed: { opacity: 0.9 },
});

export default React.memo(ProductCard);
