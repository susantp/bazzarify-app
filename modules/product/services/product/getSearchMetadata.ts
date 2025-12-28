import { DataSchema } from "@/modules/core/schemas/DataSchema";
import fetchDataAndValidate from "@/modules/core/utils/fetchDataAndValidate";
import {
  SearchMetadataPayloadSchema,
  TSearchMetadataPayloadSchema,
} from "@/modules/product/schemas/responsePayloads/SearchMetadataPayloadSchema";

export default async function getSearchMetadata(
  params?: Record<string, string>,
): Promise<TSearchMetadataPayloadSchema | null> {
  const response = await fetchDataAndValidate(
    "/search/metadata",
    DataSchema(SearchMetadataPayloadSchema),
    "Unable to get search metadata",
    params,
  );
  return response.payload;
}
