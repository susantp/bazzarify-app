import { Setter } from "@/modules/core/types";
import { retrieveStorage } from "@/modules/core/utils/secureStore";
import { AUTH_TOKEN_KEY } from "@/modules/auth/config";
import actionGetOrders from "@/modules/order/actions/actionGetOrders";
import { TGetOrdersResponsePayload } from "@/modules/order/schemas/responsePayloads/GetOrdersResponsePayload";

export default async function hydrateOrders(
  setOrders: Setter<TGetOrdersResponsePayload | null>,
): Promise<void> {
  const token = await retrieveStorage(AUTH_TOKEN_KEY);
  if (!token) return;

  const orders = await actionGetOrders(token);
  setOrders(orders);
}
