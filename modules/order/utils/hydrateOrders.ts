import { Setter } from "@/modules/core/types";
import { getAuthToken } from "@/modules/auth/utils/token";
import actionGetOrders from "@/modules/order/actions/actionGetOrders";
import { TGetOrdersResponsePayload } from "@/modules/order/schemas/responsePayloads/GetOrdersResponsePayload";

export default async function hydrateOrders(
  setOrders: Setter<TGetOrdersResponsePayload | null>,
): Promise<void> {
  const token = await getAuthToken();
  if (!token) return;

  const orders = await actionGetOrders(token);
  setOrders(orders);
}
