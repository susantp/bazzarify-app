import { getAuthToken } from "@/modules/auth/utils/token";
import * as Sentry from "@sentry/react-native";
import { DataSchema } from "@/modules/core/schemas/DataSchema";
import { UserAddressesPayloadSchema } from "@/modules/user/schemas/responsePayloads/UserAddressesPayloadSchema";
import postDataAndValidate from "@/modules/core/utils/postDataAndValidate";
import { TUserAddress } from "@/modules/user/schemas/UserAddress";

export default async function actionUpdateAddress(
  payload: Partial<TUserAddress>,
) {
  const token = await getAuthToken();
  if (!token) {
    const err = new Error("No auth token found");
    Sentry.captureException(err);
    throw err;
  }

  const response = await postDataAndValidate(
    { module: "consumers", path: `addresses/${payload.uuid}` },
    payload,
    DataSchema(UserAddressesPayloadSchema),
    "Unable to update address",
    token,
  );
  return response.payload;
}
