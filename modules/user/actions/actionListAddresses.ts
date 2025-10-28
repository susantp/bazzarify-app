import { fetchAuthDataAndValidate } from "@/modules/core/utils/fetchAuthDataAndValidate";
import { DataSchema } from "@/modules/core/schemas/DataSchema";
import { UserAddressesPayloadSchema } from "@/modules/user/schemas/responsePayloads/UserAddressesPayloadSchema";

export default async function actionListAddresses(token: string) {
  const response = await fetchAuthDataAndValidate(
    { module: "consumers", path: "addresses" },
    DataSchema(UserAddressesPayloadSchema),
    "Unable to list addresses",
    token,
  );
  return response.payload;
}
