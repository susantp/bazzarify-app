import { useQuery } from "@tanstack/react-query";
import getProductByUUID from "@/modules/product/services/product/getProductByUUID";
import { useEffect, useState } from "react";
import { ItemVariant } from "@/components";

export interface IProductVariantSelectorProps {
  variants: ItemVariant[];
  onPress: (variant: ItemVariant) => void;
  selectedVariant: ItemVariant | undefined;
}

export default function useProductScreen(uuid: string) {
  const { data: product, isSuccess } = useQuery({
    queryFn: () => getProductByUUID(uuid.toString()),
    queryKey: ["product", uuid],
  });
  const [selectedVariant, setSelectedVariant] = useState<
    ItemVariant | undefined
  >();
  const handleVariantChange = (variant: ItemVariant) => {
    setSelectedVariant(variant);
  };
  useEffect(() => {
    setSelectedVariant(product?.variants?.at(0) || undefined);
  }, [product, isSuccess]);

  return {
    product,
    handleVariantChange,
    selectedVariant,
  };
}
