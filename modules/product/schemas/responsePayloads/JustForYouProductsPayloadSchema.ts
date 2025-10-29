import { z } from "zod";
import { OmittedProductWithImagesSchema } from "@/modules/product/schemas/ProductSchema";
import { SimplePaginatedSchema } from "@/modules/product/schemas/SimplePaginated";

export const JustForYouProductsPayloadSchema = z
  .object({
    justForYouProducts: SimplePaginatedSchema(
      z.nullable(OmittedProductWithImagesSchema),
    ),
  })
  .strip();

export type TJustForYouProductsPayload = z.infer<
  typeof JustForYouProductsPayloadSchema
>;
