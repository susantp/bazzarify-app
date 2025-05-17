import { atom, selector } from "recoil";

export type CartType = {
  productUUID: string;
  variantUUID?: string;
  name: string;
  unitPrice: number;
  quantity: number;
  variantAttributeName?: string;
};
export const cartState = atom<CartType[]>({
  key: "cartState",
  default: [],
});

export const cartTotalState = selector({
  key: "cartTotalState",
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.reduce((total, item) => total + item?.unitPrice, 0);
  },
});
