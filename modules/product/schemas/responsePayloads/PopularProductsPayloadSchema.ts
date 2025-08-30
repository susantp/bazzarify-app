import { z } from "zod";
import { ProductWithImageSchema } from "@/modules/product/schemas/ProductWithImageSchema";
import { SimplePaginatedSchema } from "@/modules/product/schemas/SimplePaginated";

export const PopularProductsPayloadSchema = z
  .object({
    popularProducts: SimplePaginatedSchema(ProductWithImageSchema),
  })
  .strip();
