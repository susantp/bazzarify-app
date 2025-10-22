import { retrieveStorage } from "@/modules/core/utils/secureStore";
import { AUTH_TOKEN_KEY } from "@/modules/auth/config";
import * as Sentry from "@sentry/react-native";
import { DataSchema } from "@/modules/core/schemas/DataSchema";
import {
  GetOrdersResponsePayload,
  TGetOrdersResponsePayload,
} from "@/modules/order/schemas/responsePayloads/GetOrdersResponsePayload";
import { fetchAuthDataAndValidate } from "@/modules/core/utils/fetchAuthDataAndValidate";

export default async function actionGetOrders(): Promise<TGetOrdersResponsePayload | null> {
  const token = await retrieveStorage(AUTH_TOKEN_KEY);
  if (!token) {
    const err = new Error("No auth token found");
    Sentry.captureException(err);
    throw err;
  }
  const response = await fetchAuthDataAndValidate(
    { module: "consumers", path: "orders" },
    DataSchema(GetOrdersResponsePayload),
    "Unable to fetch cart",
    token,
  );
  return response.payload;
}
