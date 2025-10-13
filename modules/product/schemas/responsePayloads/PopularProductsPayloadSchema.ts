import { z } from "zod";
import { SimplePaginatedSchema } from "@/modules/product/schemas/SimplePaginated";
import { OmittedProductWithImagesSchema } from "@/modules/product/schemas/ProductSchema";

export const PopularProductsPayloadSchema = z
  .object({
    popularProducts: SimplePaginatedSchema(
      OmittedProductWithImagesSchema,
    ).nullable(),
  })
  .strip();

export type TPopularProductsPayload = z.infer<
  typeof PopularProductsPayloadSchema
>;
