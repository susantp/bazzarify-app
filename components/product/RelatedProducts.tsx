import React from "react";
import { Box, Text } from "@/components/design-system";

const RelatedProducts = () => (
  <Box padding="lg">
    <Box id="voucher-info" gap="md" paddingX="md" paddingY="sm">
      <Box direction="row" justify="space-between">
        <Text variant="title" color="primary">
          Related Products
        </Text>
        <Text variant="body">See more</Text>
      </Box>
    </Box>
  </Box>
);

export default RelatedProducts;
