import { DataSchema } from "@/modules/core/schemas/DataSchema";
import {
  GetOrdersResponsePayload,
  TGetOrdersResponsePayload,
} from "@/modules/order/schemas/responsePayloads/GetOrdersResponsePayload";
import { fetchAuthDataAndValidate } from "@/modules/core/utils/fetchAuthDataAndValidate";

export default async function actionGetOrders(
  token: string,
): Promise<TGetOrdersResponsePayload | null> {
  const response = await fetchAuthDataAndValidate(
    { module: "consumers", path: "orders" },
    DataSchema(GetOrdersResponsePayload),
    "Unable to get orders",
    token,
  );
  return response.payload;
}
