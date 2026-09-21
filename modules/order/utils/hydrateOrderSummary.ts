import actionGetOrders from "@/modules/order/actions/actionGetOrders";
import actionGetOrderStatuses from "@/modules/order/actions/actionGetOrderStatuses";
import { Setter } from "@/modules/core/types";
import { TGetOrdersResponsePayload } from "@/modules/order/schemas/responsePayloads/GetOrdersResponsePayload";
import { TCustomerOrderStatusGroup } from "@/modules/order/schemas/CustomerOrderStatusGroupSchema";

export default async function hydrateOrderSummary({
  token,
  setOrders,
  setOrderStatuses,
}: {
  token: string;
  setOrders: Setter<TGetOrdersResponsePayload | null>;
  setOrderStatuses: Setter<TCustomerOrderStatusGroup[]>;
}) {
  const [orders, statuses] = await Promise.all([
    actionGetOrders(token),
    actionGetOrderStatuses(token),
  ]);

  setOrders(orders);
  setOrderStatuses(statuses);
}
