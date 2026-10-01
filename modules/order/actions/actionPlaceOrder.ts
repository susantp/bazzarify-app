import { getAuthToken } from "@/modules/auth/utils/token";
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
  console.warn("[checkout-submit] action-start");
  console.warn("[checkout-submit] token-read-start");
  const token = await getAuthToken();
  console.warn("[checkout-submit] token-read-complete", {
    hasToken: Boolean(token),
  });
  if (!token) {
    const err = new Error("No auth token found");
    Sentry.captureException(err);
    throw err;
  }
  const payload = {
    shipping_information: shippingInformation,
  };
  console.warn("[checkout-submit] consumer-post-start");
  const response = await postDataAndValidate(
    { module: "consumers", path: "orders/place" },
    payload,
    DataSchema(CreateOrderResponsePayload),
    "Unable to place order",
    token,
  );
  console.warn("[checkout-submit] consumer-post-complete");
  return response.payload;
}
