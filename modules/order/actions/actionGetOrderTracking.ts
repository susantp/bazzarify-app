import { DataSchema } from "@/modules/core/schemas/DataSchema";
import { fetchAuthDataAndValidate } from "@/modules/core/utils/fetchAuthDataAndValidate";
import {
  GetOrderTrackingResponsePayload,
  TGetOrderTrackingResponsePayload,
} from "@/modules/order/schemas/responsePayloads/GetOrderTrackingResponsePayload";

export default async function actionGetOrderTracking(
  token: string,
  order: string,
): Promise<TGetOrderTrackingResponsePayload | null> {
  const response = await fetchAuthDataAndValidate(
    { module: "consumers", path: `orders/${order}/tracking` },
    DataSchema(GetOrderTrackingResponsePayload),
    "Unable to get order tracking",
    token,
  );
  return response.payload;
}
