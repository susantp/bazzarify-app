import { Setter } from "@/modules/core/types";
import hydrateOrders from "@/modules/order/utils/hydrateOrders";
import { TGetOrdersResponsePayload } from "@/modules/order/schemas/responsePayloads/GetOrdersResponsePayload";

export function createOrderTask(
  setOrders: Setter<TGetOrdersResponsePayload | null>,
) {
  return async () => {
    await hydrateOrders(setOrders);
  };
}
