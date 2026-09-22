import React from "react";
import { LexicalContentView } from "@/modules/core/components/LexicalContentView";
import { TProductWithVariantAndImage } from "@/modules/product/schemas/ProductWithVariantAndImageSchema";
import { Box, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";

const ProductDescription = ({
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
        <Text variant="title">Description</Text>
        <LexicalContentView value={product.description} />
        <Box align="center">
          <Text variant="body" color="primary">
            See more
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDescription;
