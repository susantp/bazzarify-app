import { retrieveStorage } from "@/modules/core/utils/secureStore";
import { AUTH_TOKEN_KEY } from "@/modules/auth/config";
import * as Sentry from "@sentry/react-native";
import { fetchAuthDataAndValidate } from "@/modules/core/utils/fetchAuthDataAndValidate";
import { DataSchema } from "@/modules/core/schemas/DataSchema";
import { UserAddressesPayloadSchema } from "@/modules/user/schemas/responsePayloads/UserAddressesPayloadSchema";

export default async function actionListAddresses() {
  const token = await retrieveStorage(AUTH_TOKEN_KEY);
  if (!token) {
    const err = new Error("No auth token found");
    Sentry.captureException(err);
    throw err;
  }

  const response = await fetchAuthDataAndValidate(
    { module: "consumers", path: "addresses" },
    DataSchema(UserAddressesPayloadSchema),
    "Unable to fetch cart",
    token,
  );
  return response.payload;
}
