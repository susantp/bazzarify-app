import { Setter } from "@/modules/core/types";
import { TAddCartPayload } from "@/modules/cart/schemas/responsePayloads/AddCartResponsePayload";
import { getCart } from "@/modules/cart/actions/cartService";

export default async function hydrateCart(
  setCart: Setter<TAddCartPayload | null>,
): Promise<void> {
  const cart = await getCart();
  console.log("Hydrated cart:", cart?.cart);

  setCart(cart);
}
