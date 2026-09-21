import { DataSchema } from "@/modules/core/schemas/DataSchema";
import {
  IProductShowPayload,
  ShowProductPayloadSchema,
} from "@/modules/product/schemas/responsePayloads/ShowProductPayloadSchema";
import fetchDataAndValidate from "@/modules/core/utils/fetchDataAndValidate";

export default async function getProductByVendorUUID(
  uuid: string,
): Promise<IProductShowPayload | null> {
  const response = await fetchDataAndValidate(
    `/vendors/${uuid}/products`,
    DataSchema(ShowProductPayloadSchema),
    "Unable to product",
  );
  return response.payload;
}
