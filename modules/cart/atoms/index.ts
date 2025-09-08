// atoms/index.ts
import { atom } from "jotai";
import {
  Cart,
  TCart,
  TCartItem,
  TCartMeta,
} from "@/modules/order/schemas/orderSchema";

// 🧱 Raw storage
const _cartItemsBaseAtom = atom<TCartItem[]>([]);
const _cartMetaAtom = atom<TCartMeta>({
  sub_total: 0,
  discount_total: 0,
  tax_total: 0,
  shipping_total: 0,
  grand_total: 0,
});

// 🔒 Cart locked (checkout mode)
export const cartLockedAtom = atom(false);

// 🧠 Smart writer: merges or adds
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
      updated[i] = {
        ...existing,
        qty_ordered: existing.qty_ordered + newItem.qty_ordered,
        row_total:
          (existing.qty_ordered + newItem.qty_ordered) * existing.unit_price,
      };
      set(_cartItemsBaseAtom, updated);
    } else {
      set(_cartItemsBaseAtom, [...items, newItem]);
    }
  },
);

// ➕ Increment
export const incrementCartItemAtom = atom(
  null,
  (get, set, { uuid, variantUuid }: { uuid: string; variantUuid?: string }) => {
    if (get(cartLockedAtom)) return;
    const updated = get(_cartItemsBaseAtom).map((item) => {
      if (item.uuid === uuid && item.variant_attrs?.uuid === variantUuid) {
        return {
          ...item,
          qty_ordered: item.qty_ordered + 1,
          row_total: (item.qty_ordered + 1) * item.unit_price,
        };
      }
      return item;
    });
    set(_cartItemsBaseAtom, updated);
  },
);

// ➖ Decrement
export const decrementCartItemAtom = atom(
  null,
  (get, set, { uuid, variantUuid }: { uuid: string; variantUuid?: string }) => {
    if (get(cartLockedAtom)) return;
    const updated = get(_cartItemsBaseAtom)
      .map((item) => {
        if (item.uuid === uuid && item.variant_attrs?.uuid === variantUuid) {
          return {
            ...item,
            qty_ordered: item.qty_ordered - 1,
            row_total: (item.qty_ordered - 1) * item.unit_price,
          };
        }
        return item;
      })
      .filter((item) => item.qty_ordered > 0);
    set(_cartItemsBaseAtom, updated);
  },
);

// ❌ Remove
export const removeCartItemAtom = atom(
  null,
  (get, set, { uuid, variantUuid }: { uuid: string; variantUuid?: string }) => {
    if (get(cartLockedAtom)) return;
    const filtered = get(_cartItemsBaseAtom).filter(
      (item) =>
        !(item.uuid === uuid && item.variant_attrs?.uuid === variantUuid),
    );
    set(_cartItemsBaseAtom, filtered);
  },
);

// 🧼 Clear all
export const clearCartAtom = atom(null, (get, set) => {
  if (get(cartLockedAtom)) return;
  set(_cartItemsBaseAtom, []);
  set(_cartMetaAtom, {
    sub_total: 0,
    discount_total: 0,
    tax_total: 0,
    shipping_total: 0,
    grand_total: 0,
  });
});

// 🧾 Final cart read/write
export const cartAtom = atom<TCart, [TCart], void>(
  (get) => {
    const base = get(_cartMetaAtom);
    const items = get(_cartItemsBaseAtom);

    return {
      sub_total: base.sub_total ?? 0,
      discount_total: base.discount_total ?? 0,
      tax_total: base.tax_total ?? 0,
      shipping_total: base.shipping_total ?? 0,
      grand_total: base.grand_total ?? 0,
      items: items.length > 0 ? items : [],
    } as TCart;
  },
  (get, set, next) => {
    const result = Cart.safeParse(next);
    if (!result.success) return;

    const data = result.data;
    if (!data || !Array.isArray(data.items)) return;

    set(_cartItemsBaseAtom, data.items);
    const { items: _, ...meta } = data;
    set(_cartMetaAtom, meta);
  },
);

// ✅ API setter util
export const setCartFromApi = atom<null, [TCart], void>(
  null,
  (_, set, payload) => {
    const result = Cart.safeParse(payload);
    if (!result.success) return;

    const data = result.data;
    if (!data || !Array.isArray(data.items)) return;

    set(_cartItemsBaseAtom, data.items);
    const { items: __, ...meta } = data;
    set(_cartMetaAtom, meta);
  },
);
