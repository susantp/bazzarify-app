import { retrieveStorage } from "@/modules/core/utils/secureStore";
import { AUTH_TOKEN_KEY } from "@/modules/auth/config";
import postDataAndValidate from "@/modules/core/utils/postDataAndValidate";
import {
  TCartItem,
  TCartItemToUpdateQuantity,
} from "@/modules/order/schemas/orderSchema";
import { CartResponsePayload } from "@/modules/cart/schemas/responsePayloads/CartResponsePayload";
import { DataSchema } from "@/modules/core/schemas/DataSchema";
import * as Sentry from "@sentry/react-native";
import { fetchAuthDataAndValidate } from "@/modules/core/utils/fetchAuthDataAndValidate";
import { TProductWithVariantAndImage } from "@/modules/product/schemas/ProductWithVariantAndImageSchema";
import { TVariantListWithImage } from "@/modules/product/schemas/VariantSchema";

export async function getCart(token: string) {
  const response = await fetchAuthDataAndValidate(
    { module: "consumers", path: "cart/items" },
    DataSchema(CartResponsePayload),
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
    { module: "consumers", path: "cart/items" },
    validatedPayload,
    DataSchema(CartResponsePayload),
    "Unable to add item to cart",
    token,
  );
  return response.payload;
}

export async function incrementCartItem(
  validatedPayload: TCartItemToUpdateQuantity,
) {
  const token = await retrieveStorage(AUTH_TOKEN_KEY);
  if (!token) {
    const err = new Error("No auth token found");
    Sentry.captureException(err);
    throw err;
  }

  const response = await postDataAndValidate(
    { module: "consumers", path: "cart/items/increment" },
    validatedPayload,
    DataSchema(CartResponsePayload),
    "Unable to add item to cart",
    token,
  );
  return response.payload;
}

export async function decrementCartItem(
  validatedPayload: TCartItemToUpdateQuantity,
) {
  const token = await retrieveStorage(AUTH_TOKEN_KEY);
  if (!token) {
    const err = new Error("No auth token found");
    Sentry.captureException(err);
    throw err;
  }

  const response = await postDataAndValidate(
    { module: "consumers", path: "cart/items/decrement" },
    validatedPayload,
    DataSchema(CartResponsePayload),
    "Unable to add item to cart",
    token,
  );
  return response.payload;
}

export async function removeCartItem(
  validatedPayload: TCartItemToUpdateQuantity,
) {
  const token = await retrieveStorage(AUTH_TOKEN_KEY);
  if (!token) {
    const err = new Error("No auth token found");
    Sentry.captureException(err);
    throw err;
  }

  const response = await postDataAndValidate(
    { module: "consumers", path: "cart/items/remove" },
    validatedPayload,
    DataSchema(CartResponsePayload),
    "Unable to add item to cart",
    token,
  );
  return response.payload;
}

export const makeCartItem = (
  product: TProductWithVariantAndImage,
  selectedVariant?: TVariantListWithImage,
): TCartItem => ({
  name: product.name,
  uuid: product.uuid,
  sku: product.sku,
  variant_attrs: selectedVariant
    ? {
        uuid: selectedVariant.uuid,
        name: selectedVariant.name,
        sku: selectedVariant.sku,
      }
    : null,
  qty_ordered: 1,
  unit_price: selectedVariant?.price ?? product.base_price,
  row_tax: 0,
  row_shipping: 0,
  row_discount: 0,
  row_total: selectedVariant?.price ?? product.base_price,
});
