import fetchDataAndValidate from "@/modules/core/utils/fetchDataAndValidate";
import { DataSchema } from "@/modules/core/schemas/DataSchema";
import { ShowCategoryPayloadSchema } from "@/modules/product/schemas/responsePayloads/ShowCategorytPayloadSchema";
import { ProductSearchPayloadSchema } from "@/modules/product/schemas/responsePayloads/ProductSearchPayloadSchema";

async function fetchCategories(vendorUuid: string) {
  const response = await fetchDataAndValidate(
    `vendors/${vendorUuid}/categories`,
    DataSchema(ShowCategoryPayloadSchema),
    "Unable to single category details",
  );
  return response.payload;
}
async function fetchProducts(vendorUuid: string) {
  const response = await fetchDataAndValidate(
    `vendors/${vendorUuid}/products`,
    DataSchema(ProductSearchPayloadSchema),
    "Unable to single category details",
  );
  return response.payload;
}

export { fetchCategories, fetchProducts };
