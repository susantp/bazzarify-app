import { DataSchema } from "@/modules/core/schemas/DataSchema";
import { fetchAuthDataAndValidate } from "@/modules/core/utils/fetchAuthDataAndValidate";
import {
  CustomerOrderStatusGroupsSchema,
  TCustomerOrderStatusGroup,
} from "@/modules/order/schemas/CustomerOrderStatusGroupSchema";

export default async function actionGetOrderStatuses(
  token: string,
): Promise<TCustomerOrderStatusGroup[]> {
  const response = await fetchAuthDataAndValidate(
    { module: "consumers", path: "orders/statuses" },
    DataSchema(CustomerOrderStatusGroupsSchema),
    "Unable to get order statuses",
    token,
  );

  return response.payload ?? [];
}
