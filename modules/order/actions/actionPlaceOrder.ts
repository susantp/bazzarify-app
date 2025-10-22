import { retrieveStorage } from "@/modules/core/utils/secureStore";
import { AUTH_TOKEN_KEY } from "@/modules/auth/config";
import * as Sentry from "@sentry/react-native";
import { DataSchema } from "@/modules/core/schemas/DataSchema";
import { TShippingInformation } from "@/modules/user/schemas/UserAddress";
import postDataAndValidate from "@/modules/core/utils/postDataAndValidate";
import {
  CreateOrderResponsePayload,
  TCreateOrderResponsePayload,
} from "@/modules/order/schemas/responsePayloads/CreateOrderResponsePayload";

interface Props {
  shippingInformation: TShippingInformation;
}
export default async function actionPlaceOrder({
  shippingInformation,
}: Props): Promise<TCreateOrderResponsePayload | null> {
  const token = await retrieveStorage(AUTH_TOKEN_KEY);
  if (!token) {
    const err = new Error("No auth token found");
    Sentry.captureException(err);
    throw err;
  }
  const payload = {
    shipping_information: shippingInformation,
  };
  const response = await postDataAndValidate(
    { module: "consumers", path: "orders/place" },
    payload,
    DataSchema(CreateOrderResponsePayload),
    "Unable to fetch cart",
    token,
  );
  return response.payload;
}
