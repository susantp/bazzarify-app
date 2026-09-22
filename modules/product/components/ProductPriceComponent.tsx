import React from "react";
import { TProductWithVariantAndImage } from "@/modules/product/schemas/ProductWithVariantAndImageSchema";
import { TVariantListWithImage } from "@/modules/product/schemas/VariantSchema";
import { Box, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";

const ProductPriceComponent = ({
  item,
  currency,
  selectedVariant,
}: {
  item: TProductWithVariantAndImage;
  selectedVariant?: TVariantListWithImage;
  currency: { code: string };
}) => {
  const theme = useBazarifyTheme();
  const requiresCustomerSelection =
    item.selection?.requires_customer_selection ??
    (item.variants?.length || 0) > 1;
  const price = selectedVariant ? selectedVariant.price : item.base_price;
  const availabilityLabel = selectedVariant
    ? !selectedVariant.available
      ? "Unavailable"
      : selectedVariant.available_to_sell > 0
        ? `${selectedVariant.available_to_sell} left`
        : "Out of stock"
    : requiresCustomerSelection
      ? "Select a variant"
      : "Unavailable";

  const availabilityColor =
    selectedVariant?.available && selectedVariant.available_to_sell > 0
      ? "success"
      : "danger";
  return (
    <Box
      paddingY="sm"
      style={{
        borderBottomColor: theme.colors.borderStrong,
        borderBottomWidth: 2,
      }}
    >
      <Box direction="row" align="flex-end" justify="space-between">
        <Box id="price" direction="row" align="flex-end">
          <Text variant="heading" color="primary">
            {currency.code.concat(" ").concat(String(price))}
          </Text>
        </Box>
      </Box>
      <Text variant="bodyCompactMedium" color={availabilityColor}>
        {availabilityLabel}
      </Text>
    </Box>
  );
};

export default ProductPriceComponent;
