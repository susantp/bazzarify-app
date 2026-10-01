import fetchDataAndValidate from "@/modules/core/utils/fetchDataAndValidate";
import { DataSchema } from "@/modules/core/schemas/DataSchema";
import { ProductSearchPayloadSchema } from "@/modules/product/schemas/responsePayloads/ProductSearchPayloadSchema";
import { HomeCategoriesPayloadSchema } from "@/modules/product/schemas/responsePayloads/HomeCategoriesPayloadSchema";
import { StorefrontStorePayloadSchema } from "@/modules/storefront/domain/schemas/responsePayloads/StorefrontStorePayloadSchema";

async function fetchStore(storeUuid: string, _params?: Record<string, string>) {
  const response = await fetchDataAndValidate(
    `stores/${storeUuid}/store`,
    DataSchema(StorefrontStorePayloadSchema),
    "Unable to fetch store",
  );
  return response.payload;
}

async function fetchCategories(
  storeUuid: string,
  params?: Record<string, string>,
) {
  const response = await fetchDataAndValidate(
    `stores/${storeUuid}/categories`,
    DataSchema(HomeCategoriesPayloadSchema),
    "Unable to fetch store categories",
    params,
  );
  return response.payload;
}
async function fetchProducts(
  storeUuid: string,
  params?: Record<string, string>,
) {
  const response = await fetchDataAndValidate(
    `stores/${storeUuid}/products`,
    DataSchema(ProductSearchPayloadSchema),
    "Unable to fetch store products",
    params,
  );
  return response.payload;
}

async function fetchTopProducts(
  storeUuid: string,
  params?: Record<string, string>,
) {
  const response = await fetchDataAndValidate(
    `stores/${storeUuid}/topProducts`,
    DataSchema(ProductSearchPayloadSchema),
    "Unable to fetch store products",
    params,
  );
  return response.payload;
}

export { fetchStore, fetchCategories, fetchProducts, fetchTopProducts };
