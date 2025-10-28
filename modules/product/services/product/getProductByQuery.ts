import { DataSchema } from "@/modules/core/schemas/DataSchema";
import fetchDataAndValidate from "@/modules/core/utils/fetchDataAndValidate";
import {
  ProductSearchPayloadSchema,
  TProductSearchPayload,
} from "@/modules/product/schemas/responsePayloads/ProductSearchPayloadSchema";

export default async function getProductByQuery(
  params?: Record<string, string>,
): Promise<TProductSearchPayload | null> {
  // const endpoint = ["/search/product/", query].join("?filter[name]=");
  const response = await fetchDataAndValidate(
    "/search/product",
    DataSchema(ProductSearchPayloadSchema),
    "Unable to just for you products",
    params,
  );
  return response.payload;
}
