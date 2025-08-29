import { atom } from "jotai";

export type CartType = {
  productUUID: string;
  variantUUID?: string;
  name: string;
  unitPrice: number;
  quantity: number;
  variantAttributeName?: string;
};
export const cartState = atom<CartType[]>([]);

export const cartTotalState = atom((get) => {
  const cart = get(cartState);
  return cart.reduce((total, item) => total + item?.unitPrice, 0);
});
