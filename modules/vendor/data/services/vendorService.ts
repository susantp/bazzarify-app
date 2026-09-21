import fetchDataAndValidate from "@/modules/core/utils/fetchDataAndValidate";
import { DataSchema } from "@/modules/core/schemas/DataSchema";
import { ProductSearchPayloadSchema } from "@/modules/product/schemas/responsePayloads/ProductSearchPayloadSchema";
import { HomeCategoriesPayloadSchema } from "@/modules/product/schemas/responsePayloads/HomeCategoriesPayloadSchema";
import { VendorStorePayloadSchema } from "@/modules/vendor/domain/schemas/responsePayloads/VendorStorePayloadSchema";

async function fetchStore(
  vendorUuid: string,
  _params?: Record<string, string>,
) {
  const response = await fetchDataAndValidate(
    `vendors/${vendorUuid}/store`,
    DataSchema(VendorStorePayloadSchema),
    "Unable to fetch vendor store",
  );
  return response.payload;
}

async function fetchCategories(
  vendorUuid: string,
  params?: Record<string, string>,
) {
  const response = await fetchDataAndValidate(
    `vendors/${vendorUuid}/categories`,
    DataSchema(HomeCategoriesPayloadSchema),
    "Unable to fetch vendor categories",
    params,
  );
  return response.payload;
}
async function fetchProducts(
  vendorUuid: string,
  params?: Record<string, string>,
) {
  const response = await fetchDataAndValidate(
    `vendors/${vendorUuid}/products`,
    DataSchema(ProductSearchPayloadSchema),
    "Unable to fetch vendor products",
    params,
  );
  return response.payload;
}

async function fetchTopProducts(
  vendorUuid: string,
  params?: Record<string, string>,
) {
  const response = await fetchDataAndValidate(
    `vendors/${vendorUuid}/topProducts`,
    DataSchema(ProductSearchPayloadSchema),
    "Unable to fetch vendor products",
    params,
  );
  return response.payload;
}

export { fetchStore, fetchCategories, fetchProducts, fetchTopProducts };
