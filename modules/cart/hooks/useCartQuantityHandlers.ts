import { useSetAtom } from "jotai";
import {
  decrementCartItemAtom,
  incrementCartItemAtom,
  removeCartItemAtom,
} from "@/modules/cart/atoms";

export const useCartQuantityHandlers = () => {
  const increment = useSetAtom(incrementCartItemAtom);
  const decrement = useSetAtom(decrementCartItemAtom);
  const remove = useSetAtom(removeCartItemAtom);

  return {
    increment: (uuid: string, variantUuid?: string) =>
      increment({ uuid, variantUuid }),
    decrement: (uuid: string, variantUuid?: string) =>
      decrement({ uuid, variantUuid }),
    remove: (uuid: string, variantUuid?: string) =>
      remove({ uuid, variantUuid }),
  };
};
