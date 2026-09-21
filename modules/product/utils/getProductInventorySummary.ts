import { TOmittedProductWithImages } from "@/modules/product/schemas/ProductSchema";

export function getProductInventorySummary(item: TOmittedProductWithImages) {
  const availableToSell = item.available_to_sell ?? null;
  const canPurchase = item.can_purchase ?? null;
  const lowStock = item.low_stock ?? null;

  if (availableToSell === null || canPurchase === null) {
    return {
      availableToSell,
      canPurchase,
      lowStock,
      message: "Unavailable" as string | null,
    };
  }

  if (!canPurchase || availableToSell === 0) {
    return {
      availableToSell,
      canPurchase,
      lowStock,
      message: "Out of stock",
    };
  }

  if (lowStock || availableToSell <= 3) {
    return {
      availableToSell,
      canPurchase,
      lowStock,
      message: `${availableToSell} left`,
    };
  }

  return {
    availableToSell,
    canPurchase,
    lowStock,
    message: null,
  };
}
