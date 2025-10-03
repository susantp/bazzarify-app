import { retrieveStorage } from "@/modules/core/utils/secureStore";
import { AUTH_TOKEN_KEY } from "@/modules/auth/config";
import * as Sentry from "@sentry/react-native";
import { DataSchema } from "@/modules/core/schemas/DataSchema";
import { UserAddressesPayloadSchema } from "@/modules/user/schemas/responsePayloads/UserAddressesPayloadSchema";
import postDataAndValidate from "@/modules/core/utils/postDataAndValidate";
import { TUserAddressCreate } from "@/modules/user/schemas/UserAddress";

export default async function actionCreateAddress(payload: TUserAddressCreate) {
  const token = await retrieveStorage(AUTH_TOKEN_KEY);
  if (!token) {
    const err = new Error("No auth token found");
    Sentry.captureException(err);
    throw err;
  }
  console.log("creating address with payload: ", payload);
  const response = await postDataAndValidate(
    { module: "consumers", path: "addresses" },
    payload,
    DataSchema(UserAddressesPayloadSchema),
    "Unable to update address",
    token,
  );
  return response.payload;
}
