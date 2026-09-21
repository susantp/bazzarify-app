import { TProductWithVariantAndImage } from "@/modules/product/schemas/ProductWithVariantAndImageSchema";
import { TVariantListWithImage } from "@/modules/product/schemas/VariantSchema";

export function getAutoResolvedVariant(
  product?: TProductWithVariantAndImage | null,
): TVariantListWithImage | undefined {
  const variants = product?.variants || [];
  const autoResolvableVariantUuid =
    product?.selection?.auto_resolvable_variant_uuid ||
    (variants.length === 1 ? variants[0]?.uuid : undefined);

  if (!autoResolvableVariantUuid) {
    return undefined;
  }

  return variants.find((variant) => variant.uuid === autoResolvableVariantUuid);
}

export function productRequiresCustomerSelection(
  product?: TProductWithVariantAndImage | null,
): boolean {
  if (!product) {
    return false;
  }

  return (
    product.selection?.requires_customer_selection ??
    (product.variants?.length || 0) > 1
  );
}

export function shouldDisplayVariantLabel(
  productName: string,
  variantName?: string | null,
): boolean {
  return Boolean(variantName && variantName.trim() !== "" && variantName !== productName);
}
