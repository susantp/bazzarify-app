import {
  CategoryListPayloadSchema,
  TCategoryListPayloadSchema,
} from "@/modules/product/schemas/responsePayloads/CategoryListPayloadSchema";
import fetchDataAndValidate from "@/modules/core/utils/fetchDataAndValidate";
import { DataSchema } from "@/modules/core/schemas/DataSchema";
import {
  ShowCategoryPayloadSchema,
  TShowCategoryPayloadSchema,
} from "@/modules/product/schemas/responsePayloads/ShowCategorytPayloadSchema";

async function index(
  params?: Record<string, string>,
): Promise<TCategoryListPayloadSchema | null> {
  const response = await fetchDataAndValidate(
    "categories",
    DataSchema(CategoryListPayloadSchema),
    "Unable to fetch home categories",
    params,
  );
  return response.payload;
}
async function find(slug: string): Promise<TShowCategoryPayloadSchema | null> {
  const response = await fetchDataAndValidate(
    `categories/${slug}`,
    DataSchema(ShowCategoryPayloadSchema),
    "Unable to single category details",
  );
  return response.payload;
}
const categoryService = {
  index,
  find,
};
export default categoryService;
