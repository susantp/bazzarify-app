import { Setter } from "@/modules/core/types";
import { TAddCartPayload } from "@/modules/cart/schemas/responsePayloads/CartResponsePayload";
import { getCart } from "@/modules/cart/actions/cartService";
import { retrieveStorage } from "@/modules/core/utils/secureStore";
import { AUTH_TOKEN_KEY } from "@/modules/auth/config";

export default async function hydrateCart(
  setCart: Setter<TAddCartPayload | null>,
): Promise<void> {
  const token = await retrieveStorage(AUTH_TOKEN_KEY);
  if (!token) return;

  const cart = await getCart(token);
  setCart(cart);
}
