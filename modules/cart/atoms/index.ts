import { TCartItem } from "@/modules/order/schemas/orderSchema";
import { atom } from "jotai"; // 🧱 Raw storage (private)

// 🧱 Raw storage (private)
const _cartItemsBaseAtom = atom<TCartItem[]>([]);

// 🧠 Smart writer: handles merging items
export const cartItemsAtom = atom<TCartItem[], [TCartItem], void>(
  (get) => get(_cartItemsBaseAtom),
  (get, set, newItem) => {
    const items = get(_cartItemsBaseAtom);
    const i = items.findIndex(
      (item) =>
        item.uuid === newItem.uuid &&
        item.variant_attrs?.uuid === newItem.variant_attrs?.uuid,
    );

    if (i !== -1) {
      const updated = [...items];
      const existing = updated[i];
      const qty = existing.qty_ordered + newItem.qty_ordered;
      updated[i] = {
        ...existing,
        qty_ordered: qty,
        row_total: qty * existing.unit_price,
      };
      set(_cartItemsBaseAtom, updated);
    } else {
      set(_cartItemsBaseAtom, [...items, newItem]);
    }
  },
);

// ➕ Quantity +1
export const incrementCartItemAtom = atom(
  null,
  (get, set, { uuid, variantUuid }: { uuid: string; variantUuid?: string }) => {
    const items = get(_cartItemsBaseAtom).map((item) =>
      item.uuid === uuid && item.variant_attrs?.uuid === variantUuid
        ? {
            ...item,
            qty_ordered: item.qty_ordered + 1,
            row_total: (item.qty_ordered + 1) * item.unit_price,
          }
        : item,
    );
    set(_cartItemsBaseAtom, items);
  },
);

// ➖ Quantity -1 (removes if 0)
export const decrementCartItemAtom = atom(
  null,
  (get, set, { uuid, variantUuid }: { uuid: string; variantUuid?: string }) => {
    const items = get(_cartItemsBaseAtom)
      .map((item) =>
        item.uuid === uuid && item.variant_attrs?.uuid === variantUuid
          ? {
              ...item,
              qty_ordered: item.qty_ordered - 1,
              row_total: (item.qty_ordered - 1) * item.unit_price,
            }
          : item,
      )
      .filter((item) => item.qty_ordered > 0);
    set(_cartItemsBaseAtom, items);
  },
);

// ❌ Remove item completely
export const removeCartItemAtom = atom(
  null,
  (get, set, { uuid, variantUuid }: { uuid: string; variantUuid?: string }) => {
    const filtered = get(_cartItemsBaseAtom).filter(
      (item) =>
        !(item.uuid === uuid && item.variant_attrs?.uuid === variantUuid),
    );
    set(_cartItemsBaseAtom, filtered);
  },
);

// 🧼 Clear all
export const clearCartAtom = atom(null, (_, set) =>
  set(_cartItemsBaseAtom, []),
);

// 💰 Subtotal derived
export const cartSubTotalAtom = atom((get) =>
  get(_cartItemsBaseAtom).reduce((sum, item) => sum + item.row_total, 0),
);

// 🧾 Full cart object (readonly + write support)
export const cartAtom = atom(
  (get) => ({
    sub_total: get(cartSubTotalAtom),
    items: get(_cartItemsBaseAtom),
  }),
  (_, set, next: { items?: TCartItem[] }) => {
    if (next.items) set(_cartItemsBaseAtom, next.items);
  },
);
