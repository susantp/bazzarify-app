import { DataSchema } from "@/modules/core/schemas/DataSchema";
import {
  IProductShowPayload,
  ShowProductPayloadSchema,
} from "@/modules/product/schemas/responsePayloads/ShowProductPayloadSchema";
import fetchDataAndValidate from "@/modules/core/utils/fetchDataAndValidate";

export default async function getProductByUUID(
  uuid: string,
): Promise<IProductShowPayload | null> {
  const response = await fetchDataAndValidate(
    `/product/${uuid}`,
    DataSchema(ShowProductPayloadSchema),
    "Unable to product",
  );
  return response.payload;
}
