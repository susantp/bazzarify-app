import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { router } from "expo-router";
import { useAtomValue } from "jotai";
import { screenDimensionAtom } from "@/atoms/screenDimensionAtom";
import getFirstImageSource from "@/modules/core/utils/getFirstImageSource";
import { TOmittedProductWithImages } from "@/modules/product/schemas/ProductSchema";
import { getProductInventorySummary } from "@/modules/product/utils/getProductInventorySummary";
import { Box, Image, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";

export interface FlashDealsProductCardProps {
  item: TOmittedProductWithImages;
}

function FlashDealsProductCard({ item }: FlashDealsProductCardProps) {
  const { width, height } = useAtomValue(screenDimensionAtom);
  const inventory = getProductInventorySummary(item);
  const theme = useBazarifyTheme();

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
        styles.card,
        {
          width: width * 0.33,
          height: height * 0.16,
          opacity: inventory.canPurchase === false ? 0.7 : pressed ? 0.82 : 1,
        },
      ]}
    >
      <Box align="center" justify="center" style={styles.mediaFrame}>
        <Text
          variant="bodyCompactMedium"
          color="textInverted"
          style={[
            styles.discount,
            {
              backgroundColor: theme.colors.danger,
              borderBottomLeftRadius: theme.radii.lg,
              borderTopRightRadius: theme.radii.lg,
            },
          ]}
        >
          -20%
        </Text>
        <Image
          radius="lg"
          style={{
            width: width * 0.3,
            height: height * 0.15,
            borderColor: theme.colors.borderStrong,
            borderWidth: StyleSheet.hairlineWidth,
            padding: theme.spacing.sm,
          }}
          source={getFirstImageSource({
            images: item.images,
            baseUrl: item.image_base_url,
          })}
        />
        {inventory.message ? (
          <Text
            variant="bodyCompact"
            color="textInverted"
            style={[
              styles.inventory,
              {
                backgroundColor: theme.colors.overlay,
                borderRadius: theme.radii.sm,
              },
            ]}
          >
            {inventory.message}
          </Text>
        ) : null}
      </Box>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { alignContent: "center", justifyContent: "center" },
  discount: {
    paddingHorizontal: 4,
    position: "absolute",
    right: 7,
    top: 0,
    zIndex: 10,
  },
  inventory: {
    bottom: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    position: "absolute",
  },
  mediaFrame: { flex: 1, width: "100%" },
});

export default React.memo(FlashDealsProductCard);
