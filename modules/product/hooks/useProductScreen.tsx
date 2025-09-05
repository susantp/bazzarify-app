import { useQuery } from "@tanstack/react-query";
import getProductByUUID from "@/modules/product/services/product/getProductByUUID";
import { useEffect, useState } from "react";
import { TVariantListWithImage } from "@/modules/product/schemas/VariantSchema";

export interface IProductVariantSelectorProps {
  variants: TVariantListWithImage[];
  onPress: (variant: TVariantListWithImage) => void;
  selectedVariant: TVariantListWithImage | undefined;
}

export default function useProductScreen(uuid: string) {
  const { data, isSuccess, isLoading, isError, error } = useQuery({
    queryFn: () => getProductByUUID(uuid.toString()),
    queryKey: ["product", uuid],
  });
  const [selectedVariant, setSelectedVariant] = useState<
    TVariantListWithImage | undefined
  >();
  const handleVariantChange = (variant: TVariantListWithImage) => {
    setSelectedVariant(variant);
  };
  useEffect(() => {
    setSelectedVariant(data?.product?.variants?.at(0) || undefined);
  }, [data?.product, isSuccess]);

  return {
    isSuccess,
    isLoading,
    isError,
    error,
    product: data?.product,
    currency: data?.currency,
    handleVariantChange,
    selectedVariant,
  };
}
