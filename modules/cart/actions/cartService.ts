import { retrieveStorage } from "@/modules/core/utils/secureStore";
import { AUTH_TOKEN_KEY } from "@/modules/auth/config";
import postDataAndValidate from "@/modules/core/utils/postDataAndValidate";
import { TCartItem } from "@/modules/order/schemas/orderSchema";
import { AddCartResponsePayload } from "@/modules/cart/schemas/responsePayloads/AddCartResponsePayload";
import { DataSchema } from "@/modules/core/schemas/DataSchema";
import * as Sentry from "@sentry/react-native";
import { fetchAuthDataAndValidate } from "@/modules/core/utils/fetchAuthDataAndValidate";

export async function getCart() {
  const token = await retrieveStorage(AUTH_TOKEN_KEY);
  if (!token) {
    const err = new Error("No auth token found");
    Sentry.captureException(err);
    throw err;
  }

  const response = await fetchAuthDataAndValidate(
    { module: "consumers", path: "cart" },
    DataSchema(AddCartResponsePayload),
    "Unable to fetch cart",
    token,
  );
  return response.payload;
}

export async function addCartItem(validatedPayload: TCartItem) {
  const token = await retrieveStorage(AUTH_TOKEN_KEY);
  if (!token) {
    const err = new Error("No auth token found");
    Sentry.captureException(err);
    throw err;
  }

  const response = await postDataAndValidate(
    { module: "consumers", path: "cart" },
    validatedPayload,
    DataSchema(AddCartResponsePayload),
    "Unable to add item to cart",
    token,
  );
  return response.payload;
}
