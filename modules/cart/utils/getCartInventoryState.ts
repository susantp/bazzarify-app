import { TCart } from "@/modules/order/schemas/orderSchema";

export function getCartInventoryState(cart: TCart) {
  const items = cart?.items ?? [];

  const blockedItems = items.filter(
    (item) => item.inventory && item.inventory.available_to_sell === 0,
  );
  const maxedItems = items.filter(
    (item) =>
      item.inventory &&
      item.inventory.available_to_sell > 0 &&
      !item.inventory.can_increment,
  );
  const lowStockItems = items.filter(
    (item) =>
      item.inventory &&
      item.inventory.available_to_sell > 0 &&
      item.inventory.available_to_sell <= 3,
  );

  return {
    blockedItems,
    maxedItems,
    lowStockItems,
    hasBlockingIssue: blockedItems.length > 0,
  };
}
