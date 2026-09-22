import React from "react";
import { Box } from "@/components/design-system";

interface ProductScreenContainerProps {
  children: React.ReactNode[] | React.ReactNode;
}

const ProductScreenContainer = ({ children }: ProductScreenContainerProps) => (
  <Box
    id="product-image-box"
    direction="column"
    gap="xxl"
    backgroundColor="background"
  >
    {children}
  </Box>
);
export default ProductScreenContainer;
