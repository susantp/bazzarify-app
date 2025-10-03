import { Setter } from "@/modules/core/types";
import { TAddCartPayload } from "@/modules/cart/schemas/responsePayloads/CartResponsePayload";
import { getCart } from "@/modules/cart/actions/cartService";

export default async function hydrateCart(
  setCart: Setter<TAddCartPayload | null>,
): Promise<void> {
  const cart = await getCart();
  setCart(cart);
}
