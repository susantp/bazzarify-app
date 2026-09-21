import { Setter } from "@/modules/core/types";
import { TAddCartPayload } from "@/modules/cart/schemas/responsePayloads/CartResponsePayload";
import hydrateCart from "@/modules/cart/utils/hydrateCart";

export function createCartTask(
  setCart: Setter<TAddCartPayload | null>,
  token: string,
) {
  return async () => {
    await hydrateCart(setCart, token);
  };
}
