import { View } from "react-native";
import React from "react";
import cn from "@/utils/tailwindHelper";

interface ProductScreenContainerProps {
  children: React.ReactNode[] | React.ReactNode;
  className?: string;
}

const ProductScreenContainer = ({
  className,
  children,
}: ProductScreenContainerProps) => (
  <View
    id="product-image-box"
    className={cn("flex-col", "gap-y-5", "bg-white", className)}
  >
    {children}
  </View>
);
export default ProductScreenContainer;
