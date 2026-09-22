import React from "react";
import { TProductWithVariantAndImage } from "@/modules/product/schemas/ProductWithVariantAndImageSchema";
import { LexicalContentView } from "@/modules/core/components/LexicalContentView";
import { Box, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";

const ProductSpecification = ({
  product,
}: {
  product: TProductWithVariantAndImage;
}) => {
  const theme = useBazarifyTheme();

  return (
    <Box padding="lg">
      <Box
        id="voucher-info"
        gap="md"
        borderRadius="xl"
        paddingX="md"
        paddingY="sm"
        style={{ borderColor: theme.colors.borderStrong, borderWidth: 1 }}
      >
        <Text variant="title">Specification</Text>
        <Box gap="sm">
          <LexicalContentView value={product.highlights} />
        </Box>
      </Box>
    </Box>
  );
};
export default ProductSpecification;
