import { atom } from "jotai";

export interface CartItemObject {
  id: string;
  isSelected: boolean;
  name: string;
  quantity: number;
  vendor: string;
  price: number;
  deliveryDate: string;
  discountedPrice: number;
}

const defaultCartItemState: CartItemObject[] = [
  {
    id: "ultima-141",
    isSelected: true,
    name: "Ultima Boom 141 ANC Earbuds (30 dB) | 45Hrs | game mode....",
    quantity: 1,
    vendor: "ultima lifestyle",
    price: 3999,
    discountedPrice: 1999,
    deliveryDate: "Get By Dec Mon 2nd - Wed 4th",
  },
  {
    id: "ultima-142",
    isSelected: false,
    name: "Ultima Boom 142 ANC Earbuds (30 dB) | 45Hrs | game mode....",
    quantity: 1,
    vendor: "ultima lifestyle",
    discountedPrice: 1998,
    price: 3998,
    deliveryDate: "Get By Dec Mon 2nd - Wed 4th",
  },
];

export const cartItemsAtom = atom<CartItemObject[]>(defaultCartItemState);

export const cartItemsTotalAtom = atom<number>((get) => {
  const list = get(cartItemsAtom);
  return list.reduce((a: number, b: CartItemObject) => a + b.price, 0);
});
