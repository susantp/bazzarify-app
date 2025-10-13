import { DataSchema } from "@/modules/core/schemas/DataSchema";
import {
  FlashDealsPayloadSchema,
  TFlashDealsPayload,
} from "@/modules/product/schemas/responsePayloads/FlashDealsPayloadSchema";
import {
  HomeCategoriesPayloadSchema,
  THomeCategoriesPayload,
} from "@/modules/product/schemas/responsePayloads/HomeCategoriesPayloadSchema";
import {
  JustForYouProductsPayloadSchema,
  TJustForYouProductsPayload,
} from "@/modules/product/schemas/responsePayloads/JustForYouProductsPayloadSchema";
import {
  PopularProductsPayloadSchema,
  TPopularProductsPayload,
} from "@/modules/product/schemas/responsePayloads/PopularProductsPayloadSchema";
import fetchDataAndValidate from "@/modules/core/utils/fetchDataAndValidate";

export async function getFlashDealProducts(): Promise<TFlashDealsPayload | null> {
  const response = await fetchDataAndValidate(
    "/home/getFlashDealProducts",
    DataSchema(FlashDealsPayloadSchema),
    "Unable to fetch flash deal products",
  );

  console.log("response", response);

  return response.payload;
}

export async function getHomeCategories(): Promise<THomeCategoriesPayload | null> {
  const response = await fetchDataAndValidate(
    "/home/getHomeCategories",
    DataSchema(HomeCategoriesPayloadSchema),
    "Unable to fetch home categories",
  );
  return response.payload;
}

export async function getJustForYouProducts(
  params?: Record<string, string>,
): Promise<TJustForYouProductsPayload | null> {
  const response = await fetchDataAndValidate(
    "/home/getJustForYouProducts",
    DataSchema(JustForYouProductsPayloadSchema),
    "Unable to just for you products",
    params,
  );
  return response.payload;
}

export async function getPopularProducts(): Promise<TPopularProductsPayload | null> {
  const response = await fetchDataAndValidate(
    "/home/getPopularProducts",
    DataSchema(PopularProductsPayloadSchema),
    "Unable to fetch popular products",
  );
  return response.payload;
}

const homeService = {
  getFlashDealProducts,
  getJustForYouProducts,
  getPopularProducts,
  getHomeCategories,
};
export default homeService;
