import { Setter } from "@/modules/core/types";
import { TAddCartPayload } from "@/modules/cart/schemas/responsePayloads/CartResponsePayload";
import { getCart } from "@/modules/cart/actions/cartService";
import { getAuthToken } from "@/modules/auth/utils/token";

export default async function hydrateCart(
  setCart: Setter<TAddCartPayload | null>,
): Promise<void> {
  const token = await getAuthToken();
  if (!token) return;

  const cart = await getCart(token);
  setCart(cart);
}
