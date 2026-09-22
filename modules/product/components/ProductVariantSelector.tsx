import React from "react";
import { Pressable } from "react-native";
import { Box, Image, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";
import getFirstImageSource from "@/modules/core/utils/getFirstImageSource";
import { IProductVariantSelectorProps } from "@/modules/product/hooks/useProductScreen";

const ProductVariantSelector = ({
  variants,
  onPress,
  selectedVariant,
}: IProductVariantSelectorProps) => {
  const theme = useBazarifyTheme();

  return (
    <Box
      gap="md"
      paddingX="lg"
      paddingY="sm"
      style={{
        borderBottomColor: theme.colors.borderStrong,
        borderBottomWidth: 2,
      }}
    >
      <Box>
        <Text variant="title">
          Option:{" "}
          {selectedVariant?.name.replace("|", " ") || (
            <Text color="danger" variant="title">
              Select an option
            </Text>
          )}
        </Text>
      </Box>
      <Box direction="row" align="center" gap="md">
        {variants.map((variant) => {
          const variantColor = variant.name.split("|")[0];
          const isDisabled =
            !variant.available || variant.available_to_sell <= 0;
          const isSelected = selectedVariant?.uuid === variant.uuid;

          return (
            <Pressable
              key={variant.uuid}
              accessibilityLabel={`Select ${variant.name.replace("|", " ")}`}
              accessibilityRole="button"
              disabled={isDisabled}
              onPress={() => !isDisabled && onPress(variant)}
              testID={variant.uuid}
              style={{
                borderColor: isSelected
                  ? theme.colors.primary
                  : theme.colors.borderStrong,
                borderRadius: theme.radii.pill,
                borderWidth: 2,
                opacity: isDisabled ? 0.4 : 1,
                padding: 2,
              }}
            >
              <Box
                backgroundColor="surfaceMuted"
                borderRadius="pill"
                style={{
                  backgroundColor: variantColor,
                  height: 36,
                  width: 36,
                }}
              >
                <Image
                  source={getFirstImageSource({
                    images: variant.images,
                    baseUrl: variant.image_base_url,
                  })}
                  radius="pill"
                  style={{ height: "100%", width: "100%" }}
                />
              </Box>
            </Pressable>
          );
        })}
      </Box>
    </Box>
  );
};

export default ProductVariantSelector;
