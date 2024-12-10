import { View } from "react-native";
import React from "react";

interface ProductScreenContainerProps {
  children: React.ReactNode[] | React.ReactNode;
}

const ProductScreenContainer = ({ children }: ProductScreenContainerProps) => (
  <View
    id="product-image-box"
    className="px-safe-or-4 flex-col gap-y-5 bg-white"
  >
    {children}
  </View>
);
export default ProductScreenContainer;
