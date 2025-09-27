import { retrieveStorage } from "@/modules/core/utils/secureStore";
import { AUTH_TOKEN_KEY } from "@/modules/auth/config";
import postDataAndValidate, {
  IPostDataAndValidate,
} from "@/modules/core/utils/postDataAndValidate";
import { CartItem, TCartItem } from "@/modules/order/schemas/orderSchema";
import { AddCartItemPayload } from "@/modules/cart/schemas/responsePayloads/AddCartItemPayload";
import { DataSchema } from "@/modules/core/schemas/DataSchema";

export async function addCartItem(payload: TCartItem) {
  const token = await retrieveStorage(AUTH_TOKEN_KEY);
  if (!token) {
    return new Error("No auth token found");
  }
  const params: IPostDataAndValidate<typeof CartItem, typeof DataSchema> = {
    endpoint: "/cart/items",
    requestPayloadSchema: CartItem,
    responsePayloadSchema: DataSchema(AddCartItemPayload),
    errorMessage: "Unable to add item to cart",
    token,
  };
  const response = await postDataAndValidate(params);
  console.log("response", response);
  return response;
}
