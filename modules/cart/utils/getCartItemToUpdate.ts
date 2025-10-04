import {
  TCartItem,
  TCartItemToUpdateQuantity,
} from "@/modules/order/schemas/orderSchema";

export default function getCartItemToUpdate(
  item: TCartItem,
): TCartItemToUpdateQuantity {
  return {
    line_id: item.line_id,
    uuid: item.uuid,
    variant_attrs: item.variant_attrs
      ? {
          uuid: item.variant_attrs.uuid,
          name: item.variant_attrs.name,
          sku: item.variant_attrs.sku,
        }
      : null,
    qty_ordered: item.qty_ordered,
  };
}
