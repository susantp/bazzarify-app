import { DataSchema } from "@/modules/core/schemas/DataSchema";
import fetchDataAndValidate from "@/modules/core/utils/fetchDataAndValidate";
import {
  ProductSearchPayloadSchema,
  TProductSearchPayload,
} from "@/modules/product/schemas/responsePayloads/ProductSearchPayloadSchema";

export default async function getProductByQuery(
  query: string,
): Promise<TProductSearchPayload | null> {
  const endpoint = ["/search/product/", query].join("?filter[name]=");
  const response = await fetchDataAndValidate(
    endpoint,
    DataSchema(ProductSearchPayloadSchema),
    "Unable to product",
  );
  return response.payload;
}
